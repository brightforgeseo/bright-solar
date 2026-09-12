"""Audit every built or live route; keep an exact JSON receipt."""
import argparse, json, re
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
from concurrent.futures import ThreadPoolExecutor
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DOMAIN = 'https://brightsolar.com.ph'
TOKEN = 'CUevn9WJcHia8hcOsRjkPAWfVd_rYEadPVfwDEp7w1U'
p = argparse.ArgumentParser()
p.add_argument('--base'); p.add_argument('--out', required=True)
a = p.parse_args()
routes = sorted('/' + str(f.parent.relative_to(ROOT/'dist')).replace('.', '').strip('/') + '/' for f in (ROOT/'dist').rglob('index.html'))
routes = sorted(set('/' if r=='//' else r for r in routes))

def load(path):
    if a.base:
        r = requests.get(a.base.rstrip('/')+path, timeout=40)
        return r.status_code, r.text, r.url, dict(r.headers)
    f = ROOT/'dist'/path.lstrip('/')
    if path.endswith('/'): f = f/'index.html'
    return (200, f.read_text(), path, {}) if f.exists() else (404, '', path, {})

def audit(route):
    status, text, final, headers = load(route)
    s = BeautifulSoup(text, 'html.parser'); errors=[]
    def check(ok, label):
        if not ok: errors.append(label)
    def meta(key):
        return [t.get('content') for t in s.select(f'meta[name="{key}"],meta[property="{key}"]')]
    title=s.title.get_text() if s.title else ''
    desc=meta('description')
    check(status==200, 'status'); check(not a.base or final==a.base.rstrip('/')+route,'unexpected redirect')
    check(len(s.select('h1'))==1,'h1 count')
    check(len(s.select('head > title'))==1 and bool(title),'title')
    check(len(desc)==1 and bool(desc[0]),'description')
    check([t.get('href') for t in s.select('link[rel="canonical"]')]==[DOMAIN+route],'canonical')
    check(meta('og:url')==[DOMAIN+route],'og:url')
    for key in ['og:title','og:description','og:type','og:image','twitter:card','twitter:title','twitter:description','twitter:image']:
        check(len(meta(key))==1 and bool(meta(key)[0]),key)
    check(not any('noindex' in v for v in meta('robots')),'indexability')
    if route=='/':
        check(meta('google-site-verification')==[TOKEN], 'GSC exact once')
        check(text.count(f'<meta name="google-site-verification" content="{TOKEN}" />')==1,'GSC literal tag once')
    graphs=[]
    for tag in s.select('script[type="application/ld+json"]'):
        try:
            data=json.loads(tag.string or tag.get_text()); graphs.extend(data.get('@graph',[data]))
        except Exception as e: errors.append('JSON parse '+str(e))
    types=[n.get('@type') for n in graphs]
    for t in ['Organization','WebSite','WebPage']: check(t in types or (t=='WebPage' and 'CollectionPage' in types), 'schema '+t)
    if route!='/': check('BreadcrumbList' in types,'breadcrumbs')
    if route.startswith('/news/') and route!='/news/': check('Article' in types,'article schema')
    ids=[n.get('@id') for n in graphs if n.get('@id')]
    check(len(ids)==len(set(ids)),'duplicate schema ids')
    def refs(v):
        if isinstance(v,dict):
            if set(v)=={'@id'}: check(v['@id'] in ids,'unresolved '+v['@id'])
            for x in v.values(): refs(x)
        elif isinstance(v,list):
            for x in v: refs(x)
    refs(graphs)
    for img in s.select('img'):
        check(img.has_attr('alt'),'missing alt '+img.get('src',''))
        check(img.has_attr('width') and img.has_attr('height'),'image dimensions '+img.get('src',''))
    links=[]
    for tag in s.select('a[href],img[src],script[src],link[href]'):
        u=urlsplit(urljoin(DOMAIN+route,tag.get('href') or tag.get('src')))
        if u.netloc=='brightsolar.com.ph': links.append({'path':u.path,'fragment':unquote(u.fragment) if tag.name=='a' else ''})
    return {'route':route,'status':status,'title':title,'description':desc,'canonical':DOMAIN+route,'types':types,'errors':errors,'links':links,'bytes':len(text.encode()),'gsc':meta('google-site-verification')}

with ThreadPoolExecutor(max_workers=8) as pool: rows=list(pool.map(audit,routes))
errors=[{'route':r['route'],'error':e} for r in rows for e in r['errors']]
for key in ['title','description']:
    values=[str(r[key]) for r in rows]
    if len(values)!=len(set(values)): errors.append({'error':'duplicate '+key})
paths=sorted({x['path'] for r in rows for x in r['links']} | {'/og.jpg','/bright-solar-logo-header.svg'})
def target(path):
    if a.base:
        status,text,final,headers=load(path)
    else:
        f=ROOT/'dist'/path.lstrip('/')
        if path.endswith('/'): f=f/'index.html'
        status=200 if f.is_file() else 404
        text=f.read_text() if status==200 and f.suffix=='.html' else ''
    ids=set(t.get('id') for t in BeautifulSoup(text,'html.parser').select('[id]')) if path.endswith('/') else set()
    return path, {'status':status,'ids':sorted(ids)}
with ThreadPoolExecutor(max_workers=8) as pool: targets=dict(pool.map(target,paths))
for path,t in targets.items():
    if t['status']!=200: errors.append({'error':'broken internal target','path':path,'status':t['status']})
for r in rows:
    for x in r['links']:
        if x['fragment'] and x['fragment'] not in targets[x['path']]['ids']: errors.append({'route':r['route'],'error':'missing fragment','target':x})
try:
    status,xml,_,_=load('/sitemap.xml')
    locs=re.findall(r'<loc>(.*?)</loc>',xml)
    if status!=200 or set(locs)!={DOMAIN+r for r in routes}: errors.append({'error':'sitemap exact inventory','locs':locs})
    status,robots,_,_=load('/robots.txt')
    if status!=200 or 'Sitemap: '+DOMAIN+'/sitemap.xml' not in robots or 'Disallow: /\n' in robots: errors.append({'error':'robots'})
    status,html,_,_=load('/404.html')
    if 'noindex' not in html: errors.append({'error':'404 noindex'})
except Exception as e: errors.append({'error':str(e)})
result={'route_count':len(rows),'target_count':len(targets),'rows':rows,'targets':targets,'errors':errors,'passed':not errors}
Path(a.out).write_text(json.dumps(result,indent=2))
print(json.dumps({'routes':len(rows),'targets':len(targets),'errors':errors,'passed':not errors},indent=2))
raise SystemExit(bool(errors))
