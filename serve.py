"""Local preview with clean /work/<id> routes; never submits to the original backend."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse
import argparse, re
ROOT=Path(__file__).resolve().parent
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT/'local'),**kwargs)
    def do_GET(self):
        if re.fullmatch(r'/work/[^/.]+',urlparse(self.path).path):self.path='/index.html'
        return super().do_GET()
    def end_headers(self):
        self.send_header('Content-Security-Policy',"connect-src 'self'; form-action 'self'")
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--port',type=int,default=8000);a=p.parse_args()
    print(f'Local portfolio: http://localhost:{a.port}',flush=True)
    ThreadingHTTPServer(('0.0.0.0',a.port),Handler).serve_forever()
