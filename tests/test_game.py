import asyncio, json, sys, os
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE)
# Hanzi Writer normally comes from the jsdelivr CDN. If a local copy exists (npm install --no-save hanzi-writer@3.7.2,
# or HW_JS=/path/to/hanzi-writer.min.js) the tests serve it locally so they also work without internet.
_hw = os.environ.get('HW_JS') or os.path.join(ROOT, 'node_modules', 'hanzi-writer', 'dist', 'hanzi-writer.min.js')
HW = open(_hw, encoding='utf-8').read() if os.path.exists(_hw) else None
URL = os.environ.get('TEST_URL', 'http://localhost:8765/index.html')
SHOTS = os.path.join(HERE, 'shots', 'game'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []
async def route(r):
    u = r.request.url
    if HW and 'hanzi-writer' in u and 'jsdelivr' in u: await r.fulfill(status=200, content_type='application/javascript', body=HW)
    elif 'fonts.g' in u: await r.abort()
    else: await r.continue_()

async def clear_modals(p, max_clicks=8):
    for _ in range(max_clicks):
        if not await p.locator('.modal [data-mb="0"]').count(): return
        await p.locator('.modal [data-mb="0"]').first.click(); await p.wait_for_timeout(350)

async def drive(p, smart=True, n=80, shots=None):
    """Answer a running session. smart=True answers correctly where possible."""
    kinds = {}
    for step in range(n):
        await p.wait_for_timeout(120)
        if await p.locator('.finish').count(): return 'finish', kinds
        if await p.locator('.modal').count(): await clear_modals(p); continue
        if not await p.locator('.sess').count(): return 'gone', kinds
        kind = await p.evaluate("RUN && RUN.cur ? RUN.cur.kind : null")
        if not kind: await p.wait_for_timeout(200); continue
        kinds[kind] = kinds.get(kind, 0) + 1
        exam = await p.evaluate("!!document.querySelector('.sess.exam')")
        if kind == 'teach':
            if shots and 'teach' not in shots: shots.add('teach'); await p.screenshot(path=f'{SHOTS}/teach.png')
            await p.locator('#cta').click(); continue
        if kind == 'mc':
            idx = await p.evaluate("RUN.cur.ans[0]") if smart else await p.evaluate("[0,1,2,3].find(i=>!RUN.cur.ans.includes(i))")
            await p.locator(f'.opt[data-i="{idx}"]').click()
            if shots and 'mc' not in shots: shots.add('mc'); await p.screenshot(path=f'{SHOTS}/mc.png')
            if await p.locator('#cta:not([disabled])').count() and (await p.locator('#cta').inner_text()).strip().lower() in ('check', 'next'): await p.locator('#cta').click()
        elif kind == 'order':
            seq = await p.evaluate("seqFor(RUN.cur.tiles, RUN.cur.answers[0]).split(' / ').map(Number)")
            if not smart: seq = list(reversed(seq))
            for i in seq: await p.locator(f'#pool .tile[data-i="{i-1}"]').click()
            if shots and 'order' not in shots: shots.add('order'); await p.screenshot(path=f'{SHOTS}/order.png')
            await p.locator('#cta').click()
        elif kind == 'bank':
            ans = await p.evaluate("RUN.cur.ans.map(a=>RUN.cur.bank.indexOf(a[0]))")
            for k, bi in enumerate(ans):
                await p.locator(f'.blank[data-b="{k}"]').click()
                await p.locator(f'.bchip[data-i="{bi if smart else (bi+1)%len(ans)}"]').click()
            if shots and 'bank' not in shots: shots.add('bank'); await p.screenshot(path=f'{SHOTS}/bank.png')
            await p.locator('#cta').click()
        elif kind == 'write':
            await p.wait_for_timeout(300)
            if shots and 'write' not in shots: shots.add('write'); await p.screenshot(path=f'{SHOTS}/write.png')
            await p.locator('#cta').click()
        await p.wait_for_timeout(250)
        if exam: continue
        if shots is not None and 'sheet_ok' not in shots and await p.locator('.sess-foot.ok').count(): shots.add('sheet_ok'); await p.screenshot(path=f'{SHOTS}/sheet_ok.png')
        if shots is not None and 'sheet_no' not in shots and await p.locator('.sess-foot.no').count(): shots.add('sheet_no'); await p.screenshot(path=f'{SHOTS}/sheet_no.png')
        if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue':
            await p.locator('#cta').click()
    return 'timeout', kinds

async def overflow(p, name, v):
    ov = await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
    if ov:
        wide = await p.evaluate("""[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,5).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right))""")
        errors.append(f'[{name}] horizontal overflow on {v}: {wide}')

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vp, name in [({'width': 1366, 'height': 900}, 'desk'), ({'width': 390, 'height': 844}, 'phone')]:
            ctx = await b.new_context(viewport=vp, device_scale_factor=1 if name == 'desk' else 2)
            p = await ctx.new_page()
            p.on('console', lambda m: errors.append(f'[{name}] console.{m.type}: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            p.on('pageerror', lambda e: errors.append(f'[{name}] pageerror: {e}'))
            await p.route('**/*', route)
            await p.goto(URL); await p.wait_for_timeout(900)
            shots = set()
            # welcome
            if await p.locator('.modal.welcome').count():
                await p.screenshot(path=f'{SHOTS}/{name}_welcome.png')
                await p.fill('#wName', 'Daha'); await clear_modals(p)
            else: errors.append(f'[{name}] no welcome modal')
            nn = await p.locator('.node').count(); notes.append(f'[{name}] nodes={nn}')
            await p.screenshot(path=f'{SHOTS}/{name}_learn.png')
            await overflow(p, name, 'learn')
            # first node via UI
            await p.locator('.node.current').click(); await p.wait_for_timeout(300)
            await p.screenshot(path=f'{SHOTS}/{name}_npop.png')
            await p.locator('#npGo').click(); await p.wait_for_timeout(400)
            r, k = await drive(p, True, shots=shots if name == 'phone' else None)
            notes.append(f'[{name}] node1 {r} {k}')
            await p.wait_for_timeout(700)
            await p.screenshot(path=f'{SHOTS}/{name}_finish.png'); await p.wait_for_timeout(1200)
            await clear_modals(p)
            await p.locator('#fin-go').click(); await p.wait_for_timeout(600)
            st = await p.evaluate("({path:S.path, pearls:S.pearls, xp:S.xp, q:S.quests.items, name:S.name, cards:Object.keys(S.cards).length})")
            notes.append(f'[{name}] after node1 {json.dumps(st, ensure_ascii=False)}')
            if name == 'phone':
                await p.screenshot(path=f'{SHOTS}/phone_learn2.png')
            # every node type in L3 + FIN
            for nid in ['L3-0', 'L3-2', 'L3-3', 'L3-5', 'L3-6', 'L3-7', 'L5-7', 'L0-7', 'L6-7', 'FIN-0', 'FIN-1', 'FIN-2', 'FIN-3', 'FIN-5']:
                await p.evaluate(f"startNode(NODES.find(n=>n.id==='{nid}'))"); await p.wait_for_timeout(400)
                r, k = await drive(p, True, n=120, shots=shots if name == 'phone' else None)
                await p.wait_for_timeout(1800)
                if nid == 'L3-7' and name == 'desk': await p.screenshot(path=f'{SHOTS}/desk_chest.png')
                await clear_modals(p)
                pct = await p.evaluate("S.path")
                notes.append(f'[{name}] {nid}: {r} {k} done={pct.get(nid)}'); print(notes[-1], flush=True)
                if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(500)
            # wrong answers -> out of hearts
            await p.evaluate("startNode(NODES.find(n=>n.id==='L4-0'))"); await p.wait_for_timeout(400)
            r, k = await drive(p, False, n=40)
            oh = await p.locator('#oh-rev').count()
            notes.append(f'[{name}] wrong run: {r} outOfHearts={oh}')
            if name == 'phone' and oh: await p.screenshot(path=f'{SHOTS}/phone_hearts.png')
            if oh: await p.locator('#oh-back').click(); await p.wait_for_timeout(400)
            # quests claim
            await p.evaluate("go('me',{tab:'quests'})"); await p.wait_for_timeout(300)
            await p.evaluate("questsToday().items.forEach(i=>{i.n=QDEF[i.id][2]}); go('me',{tab:'quests'})"); await p.wait_for_timeout(300)
            if await p.locator('[data-claim]').count():
                await p.locator('[data-claim]').first.click(); await p.wait_for_timeout(500)
                await p.locator('.modal [data-mb="0"]').click(); await p.wait_for_timeout(900)
                if name == 'phone': await p.screenshot(path=f'{SHOTS}/phone_chest.png')
                await p.locator('.modal [data-mb="0"]').click(); await p.wait_for_timeout(500)
            else: errors.append(f'[{name}] no claim button')
            await clear_modals(p)
            # me tabs
            await p.evaluate("S.pearls=600; hud()")
            for t in ['quests', 'badges', 'ward', 'plan', 'stats', 'save']:
                await p.evaluate(f"go('me',{{tab:'{t}'}})"); await p.wait_for_timeout(500)
                await overflow(p, name, 'me/' + t)
                if t in ('ward', 'badges') or (t == 'quests'): await p.screenshot(path=f'{SHOTS}/{name}_me_{t}.png', full_page=True)
            await p.evaluate("go('me',{tab:'ward'})"); await p.wait_for_timeout(300)
            await p.locator('[data-fl="taro"]').click(); await p.wait_for_timeout(200); await p.locator('.modal [data-mb="0"]').click(); await p.wait_for_timeout(300)
            await p.locator('[data-ac="crown"]').click(); await p.wait_for_timeout(200); await p.locator('.modal [data-mb="0"]').click(); await p.wait_for_timeout(300)
            w = await p.evaluate("S.ward"); notes.append(f'[{name}] ward {w} pearls={await p.evaluate("S.pearls")}')
            await p.screenshot(path=f'{SHOTS}/{name}_ward2.png')
            # backup round-trip
            code = await p.evaluate("'HZS1:' + btoa(unescape(encodeURIComponent(JSON.stringify(S))))")
            await p.evaluate("go('me',{tab:'save'})"); await p.wait_for_timeout(300)
            await p.fill('#bkIn', code); await p.locator('#bkLoad').click(); await p.wait_for_timeout(300)
            await p.locator('.modal [data-mb="0"]').click(); await p.wait_for_timeout(500)
            notes.append(f'[{name}] restore -> view={await p.evaluate("CUR")} xp={await p.evaluate("S.xp")}')
            # all other views
            for v in ['practice', 'lessons', 'cards', 'grammar', 'drills', 'test', 'today', 'write', 'learn']:
                await p.evaluate(f"go('{v}')"); await p.wait_for_timeout(600); await overflow(p, name, v)
                if v in ('practice', 'test'): await p.screenshot(path=f'{SHOTS}/{name}_{v}.png')
            # level-up overlay
            await p.evaluate("levelUp(5); 0"); await p.wait_for_timeout(700); await p.screenshot(path=f'{SHOTS}/{name}_levelup.png'); await clear_modals(p)
            # reload keeps progress
            before = await p.evaluate("JSON.stringify({x:S.xp,p:S.path})")
            await p.reload(); await p.wait_for_timeout(900)
            after = await p.evaluate("JSON.stringify({x:S.xp,p:S.path})")
            notes.append(f'[{name}] persisted={before==after} welcome_again={await p.locator(".modal.welcome").count()}')
            await ctx.close()
        await b.close()
    print('\n'.join(notes)); print('ERRORS:', len(errors)); print('\n'.join(errors[:40]))
    if errors: raise SystemExit(1)
asyncio.run(main())
