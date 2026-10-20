"""Make a local copy, download Google font styles and font binaries."""
from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
import hashlib, re, shutil, json
ROOT=Path(__file__).resolve().parents[1]
src=ROOT/'original'; dst=ROOT/'local'
shutil.copytree(src,dst,dirs_exist_ok=True)
fonts=dst/'_fonts';fonts.mkdir(exist_ok=True)
urls=set()
for p in dst.rglob('*.html'):
    urls.update(re.findall(r'https://fonts.googleapis.com/css2[^"<>]+',p.read_text()))
records=[]
def download(url):
    try:
        text=urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=35).read().decode()
        for u in set(re.findall(r'url\((https://[^)]+)\)',text)):
            name=hashlib.sha256(u.encode()).hexdigest()[:20]+Path(u.split('?')[0]).suffix
            target=fonts/name
            if not target.exists():target.write_bytes(urlopen(u,timeout=35).read())
            text=text.replace(u,'/_fonts/'+name)
        name=hashlib.sha256(url.encode()).hexdigest()[:16]+'.css'
        (fonts/name).write_text(text)
        return url,'/_fonts/'+name
    except Exception as e:
        print(url,str(e),flush=True);return url,None
with ThreadPoolExecutor(max_workers=6) as pool:
    mapping=dict(pool.map(download,urls))
for p in dst.rglob('*.html'):
    text=p.read_text()
    for url,target in mapping.items():
        if target:text=text.replace(url,target)
    p.write_text(text)
(ROOT/'evidence/font-map.json').write_text(json.dumps(mapping,indent=2))
print('Localized',len(mapping),'font stylesheet URLs;',len(list(fonts.iterdir())),'font resources',flush=True)
