import unittest
import tempfile
import json
from pathlib import Path
from importlib.machinery import SourceFileLoader

reader = SourceFileLoader('reader', 'scripts/read-public-sql.py').load_module()

class SQLReaderTests(unittest.TestCase):
    def test_strings_and_delimiters(self):
        rows = list(reader.values("(1,'a,b; c','O\\'Brien','line\\nnext',NULL),(2,'a\\\\b','doubled ''quote''','',-3);", 0))
        self.assertEqual(rows, [[1, 'a,b; c', "O'Brien", 'line\nnext', None], [2, 'a\\b', "doubled 'quote'", '', -3]])

    def test_no_evaluation(self):
        self.assertEqual(list(reader.values("('DROP TABLE users;','<script>x</script>');", 0)), [['DROP TABLE users;', '<script>x</script>']])

    def test_public_allowlist_excludes_private_content_and_plugin_tables(self):
        schemas = {
            'posts': ['ID', 'post_type', 'post_status', 'post_name', 'post_title', 'post_content', 'post_excerpt', 'post_parent', 'post_date', 'guid'],
            'postmeta': ['post_id', 'meta_key', 'meta_value'],
            'terms': ['term_id', 'name', 'slug'],
            'term_taxonomy': ['term_taxonomy_id', 'term_id', 'taxonomy', 'parent', 'count'],
            'term_relationships': ['object_id', 'term_taxonomy_id'],
            'options': ['option_name', 'option_value'],
            'users': ['user_login', 'user_pass'],
            'plugin_posts': ['record_id', 'private_plugin_value'],
        }
        rows = {
            'posts': [[1, 'product', 'publish', 'public-model', 'Public model', '', '', 0, '2025-01-01', 'https://yaybmt.com/'], [2, 'shop_order', 'publish', 'private-order', 'PRIVATE_MARKER', '', '', 0, '', ''], [3, 'product', 'draft', 'private-draft', 'PRIVATE_MARKER', '', '', 0, '', '']],
            'postmeta': [[1, '_thumbnail_id', '50'], [1, '_price', 'PRIVATE_MARKER']],
            'terms': [[1, 'Public brand', 'public-brand']],
            'term_taxonomy': [[1, 1, 'product_brand', 0, 1]],
            'term_relationships': [[1, 1]],
            'options': [['home', 'https://yaybmt.com'], ['private_setting', 'PRIVATE_MARKER']],
            'users': [['PRIVATE_MARKER', 'PRIVATE_MARKER']],
            'plugin_posts': [[1, 'PRIVATE_MARKER']],
        }
        def quote(value):
            return str(value) if isinstance(value, int) else "'" + value.replace('\\', '\\\\').replace("'", "\\'") + "'"
        sql = ''
        for table, columns in schemas.items():
            sql += 'CREATE TABLE `test_' + table + '` (\n' + ',\n'.join(' `' + col + '` text' for col in columns) + '\n) ENGINE=InnoDB;\n'
            sql += 'INSERT INTO `test_' + table + '` VALUES ' + ','.join('(' + ','.join(quote(v) for v in row) + ')' for row in rows[table]) + ';\n'
        with tempfile.TemporaryDirectory() as temp:
            source = Path(temp) / 'fixture.sql'
            source.write_text(sql)
            public = reader.read_public_tables(source)
        self.assertEqual(len(public['posts']), 1)
        self.assertEqual(public['postmeta'], [{'post_id': 1, 'meta_key': '_thumbnail_id', 'meta_value': '50'}])
        self.assertNotIn('PRIVATE_MARKER', json.dumps(public))
        self.assertNotIn('users', public)
        self.assertNotIn('plugin_posts', public)

if __name__ == '__main__':
    unittest.main()
