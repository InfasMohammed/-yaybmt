from pathlib import Path
from secrets import token_urlsafe
p = Path(__file__).resolve().parents[1] / '.env'
if not p.exists():
    p.write_text('YAYBMT_DB_PASSWORD=' + token_urlsafe(32) + '\nYAYBMT_DB_ROOT_PASSWORD=' + token_urlsafe(32) + '\n')
    p.chmod(0o600)
print('Local database configuration is present; existing values preserved.')

# Permit the container web server to read only the public theme files.
theme = Path(__file__).resolve().parents[1] / "wp-content/themes/yaybmt"
theme.chmod(0o755)
for item in theme.rglob("*"):
    item.chmod(0o755 if item.is_dir() else 0o644)
