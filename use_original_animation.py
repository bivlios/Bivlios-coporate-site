#!/usr/bin/env python3
"""Add the actual school.booksgiant.com entrance animation to Bivlios.

Example: python use_original_animation.py "/path/to/Booksgiant_Intro.mp4"
Supports .mp4, .webm, .ogv, .gif, .png, .apng, .webp, .svg, .json.
For Lottie JSON with external images, provide those associated files too.
"""
from pathlib import Path
import sys
import shutil
import json

allowed = {'.mp4', '.webm', '.ogv', '.gif', '.png', '.apng', '.webp', '.svg', '.json'}
if len(sys.argv) != 2:
    sys.exit('Usage: python use_original_animation.py "/path/to/original_animation.ext"')
source = Path(sys.argv[1]).expanduser()
if not source.is_file() or source.suffix.lower() not in allowed:
    sys.exit('Cannot find file or unsupported format. Expected: ' + ', '.join(sorted(allowed)))
root = Path(__file__).resolve().parent
assets = root / 'assets'
assets.mkdir(exist_ok=True)
name = 'booksgiant-school-entrance' + source.suffix.lower()
dest = assets / name
if source.resolve() != dest.resolve():
    shutil.copyfile(source, dest)
config = {'src': 'assets/' + name}
(root/'animation-config.json').write_text(json.dumps(config, indent=2) + '\n', encoding='utf-8')
print(f'Added original animation to {dest}')
print('Configured animation-config.json. Preview the site with python -m http.server 8000')
if source.suffix.lower() == '.json':
    print('Note: if Lottie JSON references image assets, copy those images in the matching relative paths.')
