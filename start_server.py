"""Server lokal opsional. Jalankan: python start_server.py"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path

if __name__ == '__main__':
    root = Path(__file__).resolve().parent
    if (root / 'dist' / 'index.html').exists():
        root = root / 'dist'
    server = ThreadingHTTPServer(('127.0.0.1', 8080), partial(SimpleHTTPRequestHandler, directory=str(root)))
    print('Dashboard: http://127.0.0.1:8080 — hentikan dengan Ctrl+C')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
