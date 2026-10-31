"""Read public catalogue fields from an offline MySQL dump. Never execute SQL.
Raw SQL and intermediate rows must stay in ignored work/. No users, orders,
reviews, plugin settings or credentials are emitted by this module.
"""
import re
from pathlib import Path

PUBLIC_TABLES = {'posts', 'postmeta', 'terms', 'term_taxonomy', 'term_relationships', 'options'}
ESCAPES = {'0':'\0', 'n':'\n', 'r':'\r', 't':'\t', 'b':'\b', 'Z':'\x1a'}

def values(source, start):
    """Yield SQL VALUES tuples, decoding MySQL string escapes (not Python eval)."""
    i = start
    while i < len(source):
        while source[i].isspace() or source[i] == ',': i += 1
        if source[i] == ';': return
        if source[i] != '(': raise ValueError('Unsupported SQL VALUES syntax')
        i += 1
        row = []
        while True:
            while source[i].isspace(): i += 1
            if source[i] == "'":
                i += 1; chars = []
                while True:
                    char = source[i]; i += 1
                    if char == '\\':
                        escaped = source[i]; i += 1
                        chars.append(ESCAPES.get(escaped, escaped))
                    elif char == "'":
                        if source[i] == "'": chars.append("'"); i += 1
                        else: break
                    else: chars.append(char)
                value = ''.join(chars)
            else:
                end = i
                while source[end] not in ',)': end += 1
                token = source[i:end].strip(); i = end
                value = None if token.upper() == 'NULL' else int(token) if re.fullmatch(r'-?\d+',token) else token
            row.append(value)
            while source[i].isspace(): i += 1
            if source[i] == ')': i += 1; break
            if source[i] != ',': raise ValueError('Unsupported SQL value separator')
            i += 1
        yield row

def read_public_tables(path):
    source = Path(path).read_bytes().decode('utf-8',errors='replace')
    schemas = {}
    definitions = [(m[1],re.findall(r'^\s*`([^`]+)`',m[2],re.M)) for m in re.finditer(r'CREATE TABLE `([^`]+)`\s*\((.*?)\) ENGINE',source,re.S)]
    prefixes = [name[:-5] for name,cols in definitions if name.endswith('_posts') and 'post_type' in cols and 'post_status' in cols]
    if len(prefixes) != 1: raise ValueError('Expected exactly one WordPress table prefix')
    prefix = prefixes[0]
    for table,columns in definitions:
        if table.startswith(prefix) and table[len(prefix):] in PUBLIC_TABLES:
            schemas[table] = (table[len(prefix):],columns)
    tables = {name:[] for name in PUBLIC_TABLES}
    for match in re.finditer(r'^INSERT INTO `([^`]+)`(?:\s*\(([^;]*?)\))?\s+VALUES\s*',source,re.M):
        if match[1] not in schemas: continue
        short,columns = schemas[match[1]]
        if match[2]: columns = re.findall(r'`([^`]+)`',match[2])
        for row in values(source,match.end()):
            if len(row) != len(columns): raise ValueError('Column mismatch in '+short)
            item = dict(zip(columns,row))
            # Do not retain private posts, plugin metadata or arbitrary options.
            if short == 'posts':
                if item['post_status'] not in ['publish','inherit'] or item['post_type'] not in ['product','page','post','attachment']: continue
                item = {key:item.get(key) for key in ['ID','post_type','post_status','post_name','post_title','post_content','post_excerpt','post_parent','post_date','guid']}
            elif short == 'options':
                if item['option_name'] not in ['home','siteurl','permalink_structure','woocommerce_permalinks','page_on_front','page_for_posts']: continue
                item = {key:item[key] for key in ['option_name','option_value']}
            elif short == 'postmeta':
                if item['meta_key'] not in ['_sku','_thumbnail_id','_product_image_gallery','_wp_attached_file','_wp_attachment_image_alt','_product_attributes','_yoast_wpseo_title','_yoast_wpseo_metadesc','_yoast_wpseo_canonical']: continue
                item = {key:item[key] for key in ['post_id','meta_key','meta_value']}
            tables[short].append(item)
    if not all(tables[name] for name in PUBLIC_TABLES):
        raise ValueError('One or more required public tables are missing or empty')
    return tables
