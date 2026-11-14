#!/usr/bin/env python3
"""Fix corrupted getSession calls in admin pages."""
import os
import re

files = [
    "src/app/admin/layout.tsx",
    "src/app/admin/dashboard/page.tsx",
    "src/app/admin/activities/page.tsx",
    "src/app/admin/media/[activityId]/page.tsx",
]

for f in files:
    path = f"/opt/data/workspace/{f}"
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the corrupted pattern
    old = "getSession({ cookie: ***` })"
    new = "getSession(`admin_session=${sessionToken}`)"
    
    count = content.count(old)
    if count > 0:
        content = content.replace(old, new)
        with open(path, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Fixed: {f}")
    else:
        print(f"Already OK: {f}")
PYEOF