"""Archive publicly linked aarya.wtf resources; preserve URLs and SHA256 provenance."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin, urlparse, unquote
from concurrent.futures import ThreadPoolExecutor
import hashlib, json, re, time

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'original'
BASE = 'https://aarya.wtf/'
seen = set()
records = []
extensions = r'(?:js|css|svg|png|jpe?g|webp|gif|mp4|mp3|pdf|woff2?)'

def references(text, url):
    candidates = re.findall(r'''(?:["'`(])([^"'`<>\s()]+\.'''+extensions+r'''(?:\?[^"'`<>\s()]*)?)["'`)]''', text)
    candidates += re.findall(r'''(?:src|href)=["']([^"']+)["']''', text)
    return [urljoin(url, s) for s in candidates if '${' not in s and not s.startswith(('data:', 'mailto:', '#'))]

def get(url):
    p = urlparse(url)
    relative = unquote(p.path).lstrip('/')
    if not relative or relative.endswith('/'): relative += 'index.html'
    dest = OUT / relative
    if '..' in Path(relative).parts: return None
    try:
        if dest.exists() and dest.stat().st_size:
            data = dest.read_bytes(); status = 200
        else:
            with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=45) as r:
                data = r.read(); status = r.status
            dest.parent.mkdir(parents=True, exist_ok=True); dest.write_bytes(data)
        rec = dict(url=url, path=str(dest.relative_to(ROOT)), status=status, bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
        links = references(data.decode('utf-8', errors='replace'), url) if dest.suffix in ['.html','.js','.css','.svg'] else []
        return rec, links
    except Exception as e:
        return dict(url=url, error=str(e)), []

ids = ['goalkeeper','prd-loop','phonepe','ride-through-the-valley','dayro','lamad','transporter','quickmart']
paths = ['', 'minimal/', 'minimal/aarya.jpg','favicon.svg','apple-touch-icon.png','og.jpg','Aarya_Shah_Resume.pdf','clients/title.svg']
paths += [f'work/{i}.html' for i in ids]
paths += [f'stamps/{prefix}{i}.webp' for i in ids for prefix in ['', 'mini/']]
paths += [f'clients/{i}.png' for i in ['byd','cwsr','daixta','lamad','logicbric','rcmo','rysysth','stairs','tidymy','zanride']]
paths += [f'photos/{i}.jpg' for i in range(1,6)]
paths += [f'{i}{s}' for i in ['hero','hero-intro','hero-tall','hero-tall-intro'] for s in ['.mp4','-poster.jpg']]
queue = {urljoin(BASE,p) for p in paths}
for path in OUT.rglob('*'):
    if path.suffix in ['.html','.js','.css']:
        rel = path.relative_to(OUT).as_posix()
        queue.update(references(path.read_text(), urljoin(BASE, rel)))

for batch in range(8):
    current = sorted(u for u in queue-seen if urlparse(u).netloc == 'aarya.wtf')
    if not current: break
    seen.update(current); queue = set()
    with ThreadPoolExecutor(max_workers=10) as pool:
        for result in pool.map(get,current):
            if not result: continue
            rec, links = result; records.append(rec); queue.update(links)
            print(rec.get('status','ERR'),rec['url'], rec.get('bytes',rec.get('error')), flush=True)
    (ROOT/'evidence/manifest.json').write_text(json.dumps(records,indent=2))
print('Saved',len(records),'records')
