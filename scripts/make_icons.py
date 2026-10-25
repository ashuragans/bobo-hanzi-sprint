# -*- coding: utf-8 -*-
"""Draw the app icons from the Bobo mascot in the app itself (optional; needs Playwright + Chromium).

    python scripts/make_icons.py

Writes public/favicon.svg, public/icon-192.png, public/icon-512.png, public/apple-touch-icon.png.
Run it again only if the mascot drawing (mascotSVG in src/app8.js) changes. Build public/index.html first.
"""
import asyncio, os, pathlib
from playwright.async_api import async_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"

TILE = """<!doctype html><html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;background:transparent}
.t{width:{S}px;height:{S}px;display:grid;place-items:center;
   background-color:#F3F6F1;
   background-image:linear-gradient(#DCE9E0 1px,transparent 1px),linear-gradient(90deg,#DCE9E0 1px,transparent 1px);
   background-size:{G}px {G}px;background-position:center center}
.t svg{width:{M}px;height:{M}px;display:block}
</style></head><body><div class="t">{SVG}</div></body></html>"""


async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        p = await b.new_page()
        await p.route("**/*", lambda r: r.abort() if "fonts.g" in r.request.url else r.continue_())
        await p.goto((PUB / "index.html").as_uri())
        await p.wait_for_function("typeof mascotSVG === 'function'")
        svg = await p.evaluate("mascotSVG({ mood: 'happy', size: 120, flavor: 'milk', acc: 'none' })")
        svg = svg.replace('class="', 'data-c="')  # drop app classes (animations) so the icon is static
        if "xmlns=" not in svg:
            svg = svg.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"', 1)
        (PUB / "favicon.svg").write_text(svg, encoding="utf-8")
        for name, size in (("icon-512.png", 512), ("icon-192.png", 192), ("apple-touch-icon.png", 180)):
            html = TILE.replace("{S}", str(size)).replace("{G}", str(round(size / 8))).replace("{M}", str(round(size * 0.66))).replace("{SVG}", svg)
            await p.set_viewport_size({"width": size, "height": size})
            await p.set_content(html)
            await p.locator(".t").screenshot(path=str(PUB / name))
            print("wrote", f"public/{name}")
        await b.close()


asyncio.run(main())
