#!/usr/bin/env python3
"""Build the installable theme without including the site's private database/media."""
from pathlib import Path
import hashlib
import zipfile

root = Path(__file__).resolve().parents[1]
source = root / 'wp-content/themes/yaybmt'
output = root / 'delivery/yaybmt-wordpress-theme.zip'
output.parent.mkdir(exist_ok=True)
allowed = {'.php', '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.txt'}
files = sorted(path for path in source.rglob('*') if path.is_file())
for path in files:
    if path.suffix.lower() not in allowed or any(part.startswith('.') for part in path.relative_to(source).parts):
        raise SystemExit(f'Unexpected theme file: {path.relative_to(source)}')
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in files:
        archive.write(path, Path('yaybmt-modern') / path.relative_to(source))
with zipfile.ZipFile(output) as archive:
    assert archive.testzip() is None
    assert 'yaybmt-modern/style.css' in archive.namelist()
digest = hashlib.sha256(output.read_bytes()).hexdigest()
(output.parent / 'SHA256SUMS.txt').write_text(f'{digest}  {output.name}\n')
print(f'Built {output.relative_to(root)}: {len(files)} theme files, {output.stat().st_size:,} bytes')
