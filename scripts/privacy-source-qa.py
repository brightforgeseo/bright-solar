from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARGETS = [ROOT / 'src', ROOT / 'public', ROOT / 'README.md', ROOT / 'dist']
BLOCKED = {
    'private identity': 'arutcurtsa'[::-1],
    'private marker': 'laitnedifnoc ylhgih'[::-1],
    'private commercial phrase 1': 'ecirp relleser'[::-1],
    'private commercial phrase 2': 'relleser fo nigram'[::-1],
    'private commercial phrase 3': 'noissimoc tnega'[::-1],
}
BLOCKED_CLAIMS = [
    'authorised felicity solar dealer',
    'authorized felicity solar dealer',
    'bright solar installs',
    'bright solar warranty',
    'guaranteed savings',
    'zero electricity bill',
    'guaranteed uninterrupted power',
]
TEXT_SUFFIXES = {'.astro', '.css', '.js', '.mjs', '.json', '.md', '.html', '.svg', '.txt'}
failures = []
checked = 0
for target in TARGETS:
    paths = [target] if target.is_file() else list(target.rglob('*')) if target.exists() else []
    for path in paths:
        if not path.is_file() or path.suffix.lower() not in TEXT_SUFFIXES:
            continue
        checked += 1
        text = path.read_text(encoding='utf-8', errors='ignore').lower()
        for label, needle in BLOCKED.items():
            if needle in text:
                failures.append(f'{label}: {path.relative_to(ROOT)}')
        for claim in BLOCKED_CLAIMS:
            if claim in text:
                failures.append(f'blocked claim "{claim}": {path.relative_to(ROOT)}')
for path in ROOT.rglob('*'):
    if path.is_file() and 'arutcurtsa'[::-1] in path.name.lower():
        failures.append(f'confidential identity in filename: {path.relative_to(ROOT)}')
print({'checked_text_files': checked, 'failures': failures, 'passed': not failures})
raise SystemExit(0 if not failures else 1)
