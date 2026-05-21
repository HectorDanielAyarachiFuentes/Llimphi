import re
import os

filepath = r"c:\Users\Ramoncito\.antigravity-ide\Llimphi\editor\js\yellow-pencil.js"
with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
    content = f.read()

# Let's find all function definitions like "function abc("
functions = re.findall(r"function\s+([a-zA-Z0-9_$]+)\s*\(", content)
print("Total functions found in yellow-pencil.js:", len(functions))
print("First 50 functions:", functions[:50])

# Let's read all function names exported in YP._compat in modular files
modules_dir = r"c:\Users\Ramoncito\.antigravity-ide\Llimphi\editor\js\modules"
compat_aliases = set()
for filename in os.listdir(modules_dir):
    if filename.endswith(".js"):
        with open(os.path.join(modules_dir, filename), "r", encoding="utf-8", errors="ignore") as mf:
            mcontent = mf.read()
            # Find all aliases in Object.assign(YP._compat, { ... }) or YP._compat.xxx = ...
            matches = re.findall(r"YP\._compat\.([a-zA-Z0-9_$]+)\s*=", mcontent)
            compat_aliases.update(matches)
            matches_assign = re.findall(r"([a-zA-Z0-9_$]+)\s*:\s*[a-zA-Z0-9_$]+", mcontent)
            # Find only inside the YP._compat block if possible, or just parse Object.assign(YP._compat, { ... })
            assign_blocks = re.findall(r"Object\.assign\(\s*YP\._compat\s*,\s*\{([^}]+)\}\)", mcontent)
            for block in assign_blocks:
                aliases = re.findall(r"\b([a-zA-Z0-9_$]+)\s*:", block)
                compat_aliases.update(aliases)

print("Total compat aliases found in modules:", len(compat_aliases))
print("Compat aliases:", sorted(list(compat_aliases)))

# Find which of these compat aliases are STILL defined in yellow-pencil.js
duplicates = [alias for alias in compat_aliases if alias in functions]
print("Compat aliases STILL defined in yellow-pencil.js:", sorted(duplicates))
