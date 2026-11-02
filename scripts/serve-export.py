from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import os

EXPORT = Path(__file__).resolve().parents[1] / 'out'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(EXPORT), **kwargs)

    def do_GET(self):
        pathname=self.path.split('?')[0].rstrip('/')
        redirects=json.loads((EXPORT.parent/'data/redirects.json').read_text())
        image_rules=EXPORT.parent/'data/image-redirects.json'
        if image_rules.exists():redirects+=json.loads(image_rules.read_text())
        drawing_rules=EXPORT.parent/'data/drawing-image-redirects.json'
        if drawing_rules.exists():redirects+=json.loads(drawing_rules.read_text())
        match=next((r for r in redirects if r['source'].rstrip('/')==pathname),None)
        if match:
            self.send_response(301)
            self.send_header('Location', match['destination'])
            self.end_headers()
            return
        super().do_GET()

    def send_error(self, code, message=None, explain=None):
        if code == 404 and (EXPORT / '404.html').exists():
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write((EXPORT / '404.html').read_bytes())
        else:
            super().send_error(code, message, explain)

port=int(os.environ.get('PORT','8080'))
print(f'Static export: http://127.0.0.1:{port}', flush=True)
ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
