# -*- coding: utf-8 -*-
"""Put the app together: src/ (code + styles) + generated/data.js -> one web page.

    python scripts/assemble.py              -> public/index.html   (the website Vercel serves)
    python scripts/assemble.py --artifact   -> dist/artifact.html  (single-file version for a claude.ai artifact)

Run this after ANY change in src/. Run scripts/build.py instead after changes in content/ (it calls this at the end).
public/index.html is generated - never edit it by hand.
"""
import glob, os, re, shutil, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")


def rd(*p):
    return open(os.path.join(ROOT, *p), encoding="utf-8").read()


SPANS = []  # (first line, file name) of each src/app*.js inside the bundle, for error messages


def app_code():
    files = sorted(glob.glob(os.path.join(SRC, "app*.js")), key=lambda f: int(re.findall(r"app(\d+)\.js$", f)[0]))
    parts, line = [], 1
    for f in files:
        text = open(f, encoding="utf-8").read() + "\n"
        SPANS.append((line, os.path.basename(f)))
        line += text.count("\n")
        parts.append(text)
    return "".join(parts) + "init();\n"


def where(bundle_line):
    first, name = max((s for s in SPANS if s[0] <= bundle_line), default=(1, "?"))
    return f"src/{name} line {bundle_line - first + 1}"


def syntax_check(code):
    """Fail early on a JavaScript syntax error (needs Node; skipped if Node is not installed)."""
    node = shutil.which("node")
    if not node:
        print("note: node not found, skipped the JavaScript syntax check")
        return
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as t:
        t.write(code)
    try:
        r = subprocess.run([node, "--check", t.name], capture_output=True, text=True)
        if r.returncode:
            err = r.stderr
            m = re.search(re.escape(t.name) + r":(\d+)", err)
            loc = f" (near {where(int(m.group(1)))})" if m else ""
            sys.exit(f"JavaScript syntax error{loc}:\n" + err.replace(t.name, "bundle"))
    finally:
        os.unlink(t.name)


HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="A game for learning Traditional Chinese: 時代華語 1, Lessons 1–7, TOCFL vocabulary, writing, listening and teacher-style tests.">
<meta name="theme-color" content="#F3F6F1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111714" media="(prefers-color-scheme: dark)">
<meta property="og:title" content="Bobo Hanzi Sprint">
<meta property="og:description" content="Learn Traditional Chinese with Bobo: lessons 1–7, smart review, writing and listening.">
<meta property="og:image" content="icon-512.png">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="manifest.webmanifest">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Bobo 中文">
"""


def main():
    artifact = "--artifact" in sys.argv
    shell = rd("src", "shell.html")
    css = rd("src", "style.css")
    data = rd("generated", "data.js")
    app = app_code()
    syntax_check(app)
    for name, text in (("style.css", css), ("data.js", data), ("app code", app)):
        if "</script" in text.lower() and name != "style.css":
            sys.exit(f"{name} contains '</script' which would break the page")
    page = shell.replace("/*CSS*/", css, 1).replace("/*DATA*/", data, 1).replace("/*APP*/", app, 1)

    if artifact:
        os.makedirs(os.path.join(ROOT, "dist"), exist_ok=True)
        out = os.path.join(ROOT, "dist", "artifact.html")
        open(out, "w", encoding="utf-8").write(page)
    else:
        cut = page.index("<header")
        head = page[:cut].replace('<meta name="claude:viewport-fit-sides" content="cover">\n', "")
        body = page[cut:]
        doc = HEAD + head + "</head>\n<body>\n" + body + "\n</body>\n</html>\n"
        out = os.path.join(ROOT, "public", "index.html")
        open(out, "w", encoding="utf-8").write(doc)
    print(f"wrote {os.path.relpath(out, ROOT)} ({os.path.getsize(out) // 1024} KB)")


if __name__ == "__main__":
    main()
