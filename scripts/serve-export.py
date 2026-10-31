from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

EXPORT = Path(__file__).resolve().parents[1] / 'out'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(EXPORT), **kwargs)

    def do_GET(self):
        if self.path.split('?')[0].rstrip('/') == '/product-category/marine-locks':
            self.send_response(301)
            self.send_header('Location', '/brand/marine-locks/')
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

print('Static export: http://127.0.0.1:8080', flush=True)
ThreadingHTTPServer(('127.0.0.1', 8080), Handler).serve_forever()
