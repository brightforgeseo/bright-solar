from html.parser import HTMLParser
from pathlib import Path
import re

HTML_PATH = Path(__file__).resolve().parents[1] / 'dist' / 'index.html'
PRIMARY = 'solar panel installation in manila'

class AuditParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_title = False
        self.in_head = False
        self.in_h1 = False
        self.in_body = False
        self.title_parts = []
        self.h1_parts = []
        self.body_parts = []
        self.h1_count = 0
        self.meta = {}
        self.lang = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'html':
            self.lang = attrs.get('lang')
        elif tag == 'head':
            self.in_head = True
        elif tag == 'title' and self.in_head:
            self.in_title = True
        elif tag == 'h1':
            self.in_h1 = True
            self.h1_count += 1
        elif tag == 'body':
            self.in_body = True
        elif tag == 'meta':
            key = attrs.get('name') or attrs.get('property')
            if key:
                self.meta[key] = attrs.get('content', '')

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'head':
            self.in_head = False
        elif tag == 'h1':
            self.in_h1 = False
        elif tag == 'body':
            self.in_body = False

    def handle_data(self, data):
        text = data.strip()
        if not text:
            return
        if self.in_title:
            self.title_parts.append(text)
        if self.in_h1:
            self.h1_parts.append(text)
        if self.in_body:
            self.body_parts.append(text)

html = HTML_PATH.read_text(encoding='utf-8')
parser = AuditParser()
parser.feed(html)

title = ' '.join(parser.title_parts)
description = parser.meta.get('description', '')
h1 = ' '.join(parser.h1_parts)
body_text = re.sub(r'\s+', ' ', ' '.join(parser.body_parts)).lower()
keyword_occurrences = body_text.count(PRIMARY)

checks = {
    'title': title,
    'title_length': len(title),
    'description_length': len(description),
    'h1_count': parser.h1_count,
    'h1': h1,
    'primary_keyword_visible_occurrences': keyword_occurrences,
    'lang': parser.lang,
    'viewport_present': 'viewport' in parser.meta,
    'open_graph_present': all(key in parser.meta for key in ['og:title', 'og:description', 'og:type']),
    'superseded_brand_absent': 'solara' not in html.lower(),
    'private_partner_absent': 'arutcurtsa'[::-1] not in html.lower(),
    'canonical': 'skipped until a live domain is supplied',
}

failures = []
if title != 'Solar Panel Installation Planning Manila | Bright Solar': failures.append('title')
if not 40 <= len(title) <= 60: failures.append('title length')
if not 140 <= len(description) <= 155: failures.append('description length')
if parser.h1_count != 1: failures.append('h1 count')
if not 1 <= keyword_occurrences <= 5: failures.append('keyword occurrence range')
if parser.lang != 'en': failures.append('language')
if not checks['viewport_present']: failures.append('viewport')
if not checks['open_graph_present']: failures.append('Open Graph')
if not checks['superseded_brand_absent']: failures.append('superseded brand')
if not checks['private_partner_absent']: failures.append('private partner')

checks['passed'] = not failures
checks['failed'] = failures
print(checks)
raise SystemExit(0 if checks['passed'] else 1)
