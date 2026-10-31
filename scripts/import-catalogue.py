"""One-off public-content migration from supplied SQL; SQL is never executed.
Usage: python3 scripts/import-catalogue.py /private/path/source.sql
Requires lxml (migration only). Review generated public files before committing.
"""
import sys,re,json,hashlib,collections,html as entities
from pathlib import Path
from urllib.parse import urlsplit,unquote
from importlib.machinery import SourceFileLoader
from lxml import html,etree
reader=SourceFileLoader('public_sql',str(Path(__file__).with_name('read-public-sql.py'))).load_module()
ROOT=Path(__file__).resolve().parents[1]
ALLOWED_TAGS={'p','h2','h3','h4','h5','h6','ul','ol','li','strong','em','b','i','a','br','hr','blockquote','table','thead','tbody','tr','td','th','caption','figure','figcaption'}

def clean_text(value):
 return re.sub(r'\s+',' ',entities.unescape(str(value or ''))).strip()

def text_lines(value):
 value=re.sub(r'<(?:br\s*/?|/p|/li|/h[1-6]|/div|/tr)>','\n',value,flags=re.I)
 try: value=html.fragment_fromstring(value,create_parent='div').text_content()
 except (etree.ParserError,ValueError): pass
 return [clean_text(line) for line in value.splitlines() if clean_text(line)]

def write_ts(file,name,kind,data):
 (ROOT/'data'/file).write_text('import type { '+kind+' } from "./types";\nexport const '+name+': '+kind+'[] = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n')

def migrate(sql):
 tables=reader.read_public_tables(sql)
 posts={p['ID']:p for p in tables['posts']}
 meta=collections.defaultdict(dict)
 for row in tables['postmeta']:
  if row['post_id'] in posts: meta[row['post_id']][row['meta_key']]=row['meta_value']
 terms={t['term_id']:t for t in tables['terms']}
 taxa={t['term_taxonomy_id']:t for t in tables['term_taxonomy']}
 relations=collections.defaultdict(list)
 for row in tables['term_relationships']:
  if row['object_id'] in posts:relations[row['object_id']].append(taxa[row['term_taxonomy_id']])
 options={row['option_name']:row['option_value'] for row in tables['options']}
 if options.get('permalink_structure')!='/%postname%/':raise ValueError('Review the changed source permalink structure before importing.')
 if 's:8:"/product"' not in options.get('woocommerce_permalinks',''):raise ValueError('Review changed product URL base before importing.')
 issues=[];link_repairs=[];media_refs=[]
 def term_slug(t,seen=()):
  ident=t['term_id']
  if ident in seen:raise ValueError('Term parent cycle')
  slug=terms[ident]['slug']
  if t['taxonomy']=='product_cat' and t['parent']:
   parent=next(x for x in taxa.values() if x['term_id']==t['parent'] and x['taxonomy']==t['taxonomy'])
   slug=term_slug(parent,seen+(ident,))+'/'+slug
  return slug
 def taxonomy(kind):
  return sorted([dict(slug=term_slug(t),name=clean_text(terms[t['term_id']]['name']),source='supplied SQL term '+str(t['term_id'])) for t in taxa.values() if t['taxonomy']==kind],key=lambda t:t['name'].lower())
 brands=taxonomy('product_brand');categories=taxonomy('product_cat')
 def safe_html(raw,source_path):
  if not raw.strip():return ''
  # Autop-style breaks for old non-block product descriptions; block HTML stays structured.
  if not re.search(r'<(?:p|ul|ol|table|h[1-6])\b',raw,re.I):raw='<p>'+re.sub(r'\r?\n\s*\r?\n','</p><p>',raw)+'</p>'
  root=html.fragment_fromstring(raw or '<p></p>',create_parent='div')
  for node in list(root.iterdescendants()):
   if not isinstance(node.tag,str):
    node.getparent().remove(node);continue
   tag=node.tag.lower()
   if tag in {'script','style','iframe','object','embed','form','input','button','textarea','select'}:
    node.drop_tree();continue
   if tag=='img':
    ref=node.get('src','');media_refs.append({'page':source_path,'reference':ref})
    node.tag='p';node.attrib.clear();node.text='Original illustration awaiting image files.';continue
   if tag=='h1':tag=node.tag='h2'
   if tag not in ALLOWED_TAGS:
    node.drop_tag();continue
   attrs={}
   if tag=='a':
    href=entities.unescape(node.get('href','')).strip();url=urlsplit(href)
    if url.hostname in ['yaybmt.com','www.yaybmt.com']:
     href=url.path or '/'
     if href.rstrip('/')=='/product-category/marine-locks':
      link_repairs.append({'from':href,'to':'/brand/marine-locks/','page':source_path});href='/brand/marine-locks/'
     if url.query:href+='?'+url.query
     if url.fragment:href+='#'+url.fragment
    elif url.hostname:
     issues.append({'type':'external-link-needs-review','page':source_path,'url':href})
     # Preserve the original anchor text without promoting an unverified competitor destination.
     node.drop_tag();continue
    if (href.startswith('/') and not href.startswith('//')) or href.startswith('#') or url.scheme in ['mailto','tel']:
     attrs['href']=href
    else:
     if href:issues.append({'type':'removed-unsupported-link','page':source_path,'url':href})
     node.drop_tag();continue
   ident=node.get('id')
   if ident and re.fullmatch(r'[A-Za-z][\w:.-]*',ident):attrs['id']=ident
   if tag in ['td','th']:
    for key in ['rowspan','colspan']:
     value=node.get(key,'')
     if value.isdigit() and 1<=int(value)<=20:attrs[key]=value
   node.attrib.clear();node.attrib.update(attrs)
  result=(entities.escape(root.text or '')+''.join(etree.tostring(child,encoding='unicode',method='html') for child in root)).strip()
  result=re.sub(r'\[/?[a-zA-Z_][^\]]*\]','',result)
  return result
 def seo(p):
  m=meta[p['ID']];result={}
  for dest,key in [('title','_yoast_wpseo_title'),('description','_yoast_wpseo_metadesc')]:
   value=clean_text(m.get(key,''))
   if not value:continue
   replacements={'%%title%%':clean_text(p['post_title']),'%%sitename%%':'YAYBMT','%%sep%%':'|','%%page%%':'','%%excerpt%%':' '.join(text_lines(p['post_excerpt']))}
   for token,replacement in replacements.items():value=value.replace(token,replacement)
   if re.search(r'%%[^%]+%%',value):issues.append({'type':'unresolved-seo-template','page':p['post_name']})
   value=re.sub(r'%%[^%]+%%','',value)
   result[dest]=clean_text(value)
  canonical=m.get('_yoast_wpseo_canonical')
  if canonical:issues.append({'type':'source-canonical-review','page':p['post_name'],'canonical':canonical})
  return result
 products=[]
 for p in posts.values():
  if p['post_type']!='product' or p['post_status']!='publish':continue
  source='supplied SQL product '+str(p['ID']);path='/product/'+p['post_name']+'/'
  specs=[]
  for line in text_lines(p['post_content']):
   match=re.match(r'^([^:]{1,80}):\s*(.+)$',line)
   if match and not match[1].lower().startswith(('http','https')):specs.append(dict(label=match[1].strip(),value=match[2].strip(),source=source))
  brand_terms=[t for t in relations[p['ID']] if t['taxonomy']=='product_brand']
  if len(brand_terms)>1:issues.append({'type':'multiple-brands','page':path})
  model=next((s['value'] for s in specs if s['label'].lower() in ['model','model no.','model number','model no']),None)
  refs=[];ids=[]
  for value in [meta[p['ID']].get('_thumbnail_id',''),*str(meta[p['ID']].get('_product_image_gallery','')).split(',')]:
   if str(value).isdigit() and int(value) not in ids:ids.append(int(value))
  for ident in ids:
   file=meta[ident].get('_wp_attached_file')
   if file:refs.append({'attachmentId':ident,'file':str(file),'alt':clean_text(meta[ident].get('_wp_attachment_image_alt')) or clean_text(p['post_title'])})
   else:issues.append({'type':'missing-attachment-file-reference','page':path,'attachmentId':ident})
  body=safe_html(p['post_content'],path)
  products.append(dict(slug=p['post_name'],name=clean_text(p['post_title']),model=model,brand=terms[brand_terms[0]['term_id']]['slug'] if brand_terms else None,categorySlugs=sorted({term_slug(t) for t in relations[p['ID']] if t['taxonomy']=='product_cat'}),description=text_lines(p['post_excerpt']),bodyHtml=body,specifications=specs,source=source,status='imported',images=[],mediaReferences=refs,seo=seo(p)))
 articles=[]
 for p in posts.values():
  if p['post_type']!='post' or p['post_status']!='publish':continue
  path='/'+p['post_name']+'/'
  articles.append(dict(path=path,title=clean_text(p['post_title']),description=seo(p).get('description') or (' '.join(text_lines(p['post_excerpt'])) or ' '.join(text_lines(p['post_content'])))[:160],paragraphs=[],bodyHtml=safe_html(p['post_content'],path),source='supplied SQL article '+str(p['ID']),status='imported',publishedAt=str(p['post_date'])[:10],seo=seo(p)))
 source_pages=[]
 for p in posts.values():
  if p['post_type']!='page' or p['post_status']!='publish':continue
  path='/' if str(p['ID'])==options.get('page_on_front') else '/'+p['post_name']+'/'
  source_pages.append({'sourceId':p['ID'],'path':path,'title':clean_text(p['post_title']),'source':'supplied SQL page '+str(p['ID']),'seo':seo(p),'retired':p['post_name'] in ['cart','checkout','my-account']})
 expected={'products':292,'brands':9,'categories':41,'articles':10,'pages':8}
 actual={'products':len(products),'brands':len(brands),'categories':len(categories),'articles':len(articles),'pages':len(source_pages)}
 if actual!=expected:raise ValueError('Source counts differ from the known restoration; review before overwriting data: '+str(actual))
 for item in products+articles:
  if '\ufffd' in json.dumps(item,ensure_ascii=False):issues.append({'type':'text-encoding-review','page':item.get('slug',item.get('path'))})
 write_ts('products.ts','products','Product',products)
 write_ts('brands.ts','brands','Taxonomy',brands)
 write_ts('categories.ts','categories','Taxonomy',categories)
 write_ts('articles.ts','articles','Article',articles)
 write_ts('source-pages.ts','sourcePages','SourcePage',source_pages)
 report={'source':'Client-supplied softsql.zip / softsql.sql','sha256':hashlib.sha256(Path(sql).read_bytes()).hexdigest(),'counts':actual,'productsWithFewerThan50Words':sum(len(' '.join(p['description']+text_lines(p['bodyHtml'])).split())<50 for p in products),'productsWithSpecifications':sum(bool(p['specifications']) for p in products),'productsWithModel':sum(bool(p['model']) for p in products),'productsWithoutBrand':sum(p['brand'] is None for p in products),'productsWithoutDescriptionOrDetails':sum(not p['description'] and not p['bodyHtml'] for p in products),'productsWithoutLocalImages':sum(not p['images'] for p in products),'attachmentRecords':sum(p['post_type']=='attachment' for p in posts.values()),'productMediaReferences':sum(len(p['mediaReferences']) for p in products),'inlineImageReferences':media_refs,'marineLinkRepairs':link_repairs,'issues':issues,'excluded':['users','customers','orders','credentials','plugin configuration','prices','availability','reviews'],'productionReady':False}
 (ROOT/'docs/migration-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print('Imported public content only:',json.dumps(actual),'; specifications:',report['productsWithSpecifications'],'; unresolved media:',report['productsWithoutLocalImages'])

if __name__=='__main__':
 if len(sys.argv)!=2:raise SystemExit(__doc__)
 migrate(Path(sys.argv[1]))
