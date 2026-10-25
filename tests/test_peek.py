import asyncio, json, os
from playwright.async_api import async_playwright
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_game.py'), encoding='utf-8').read().replace('asyncio.run(main())', '')
tg = {'__file__': os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_game.py')}; exec(src, tg)
SHOTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shots', 'peek'); os.makedirs(SHOTS, exist_ok=True)
errors = []
def note(x): print(x, flush=True)

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for vp, name in [({'width': 390, 'height': 844}, 'phone'), ({'width': 1366, 'height': 900}, 'desk')]:
            ctx = await b.new_context(viewport=vp, device_scale_factor=2 if name == 'phone' else 1)
            p = await ctx.new_page()
            p.on('pageerror', lambda e: errors.append(f'[{name}] pageerror: {e}'))
            p.on('console', lambda m: errors.append(f'[{name}] console: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await p.route('**/*', tg['route']); await p.goto(tg['URL']); await p.wait_for_timeout(800)
            await tg['clear_modals'](p)
            note(f'[{name}] default hint mode: {await p.evaluate("S.set.hint")}')
            await p.evaluate("runQuiz({ title: 'Teacher-style test', mock: true, type: 'teacher', qs: teacherTest(), back: () => go('test') })"); await p.wait_for_timeout(500)
            for step in range(30):
                if await p.evaluate("RUN && RUN.cur && RUN.cur.kind === 'bank' && RUN.cur.layout !== 'pics'"): break
                await tg['drive'](p, True, n=1)
            chips = await p.evaluate("[...document.querySelectorAll('.bchip')].map(c => c.className)")
            note(f'[{name}] chips start: {chips}')
            await p.screenshot(path=f'{SHOTS}/{name}_bank_tap.png')
            # peek chip 0 twice, chip 2 once
            w0 = await p.evaluate("RUN.cur.bank[0]"); w2 = await p.evaluate("RUN.cur.bank[2]")
            await p.locator('.bpeek[data-pi="0"]').click(); await p.wait_for_timeout(150)
            await p.locator('.bpeek[data-pi="0"]').click(); await p.wait_for_timeout(150)
            await p.locator('.bpeek[data-pi="2"]').click(); await p.wait_for_timeout(150)
            c0 = await p.evaluate("document.querySelector('.bchip[data-i=\"0\"]').className"); c2 = await p.evaluate("document.querySelector('.bchip[data-i=\"2\"]').className")
            note(f'[{name}] after peeks: chip0={c0} chip2={c2}')
            # tap a dialogue word: pinyin first, meaning second
            tok = p.locator('.bklines .tok').nth(2)
            tw = await tok.get_attribute('data-w')
            await tok.click(); await p.wait_for_timeout(200)
            shown = await p.evaluate("document.querySelectorAll('.bklines .tok.show').length")
            pop1 = await p.locator('.pop').count()
            await tok.click(); await p.wait_for_timeout(250)
            pop2 = await p.locator('.pop').count()
            note(f'[{name}] token {tw}: pinyin shown={shown} pop after 1st tap={pop1}, after 2nd={pop2}')
            await p.screenshot(path=f'{SHOTS}/{name}_bank_peeked.png')
            if await p.locator('.popx').count(): await p.locator('.popx').click()
            pk = await p.evaluate(f"(() => {{ const k0 = wordInfo('{w0}').k, k2 = wordInfo('{w2}').k, kt = H2W['{tw}'] && H2W['{tw}'].k; return {{ k0: S.pk[k0], k2: S.pk[k2], kt: kt && S.pk[kt], run: RUN.peeks }}; }})()")
            note(f'[{name}] recorded peeks: {json.dumps(pk, ensure_ascii=False)}')
            # finish the test, check the peek summary on the results screen
            r, k = await tg['drive'](p, True, n=80); await p.wait_for_timeout(1700)
            summ = await p.evaluate("[...document.querySelectorAll('.wchip.peek')].map(x => x.innerText.replace(/\\n/g,' '))")
            note(f'[{name}] finish={r} peek summary chips: {summ}')
            await p.screenshot(path=f'{SHOTS}/{name}_finish_peeks.png')
            await tg['clear_modals'](p)
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # peeked words should top smart review and get reading/meaning questions
            await p.evaluate("go('learn')"); await p.wait_for_timeout(400)
            chipsTxt = await p.evaluate("document.querySelector('.sc-chips') ? document.querySelector('.sc-chips').innerText : ''")
            note(f'[{name}] smart card: {chipsTxt!r}')
            await p.locator('#smartGo').click(); await p.wait_for_timeout(400)
            seenk, qts = [], []
            for step in range(15):
                if await p.locator('.finish').count(): break
                info = await p.evaluate("RUN && RUN.cur ? [RUN.cur.k ? W[RUN.cur.k].h : '', RUN.cur.qt || RUN.cur.kind, RUN.cur.label] : null")
                if info: seenk.append(info[0]); qts.append(info[1] + ('(re)' if '複習' in (info[2] or '') else ''))
                await tg['drive'](p, True, n=1)
            note(f'[{name}] smart review words: {seenk[:10]} types: {qts[:12]}')
            await p.wait_for_timeout(1500); await tg['clear_modals'](p)
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            await p.evaluate("go('me',{tab:'stats'})"); await p.wait_for_timeout(500)
            await p.screenshot(path=f'{SHOTS}/{name}_stats.png', full_page=True)
            # examples are used: a verb that had no example now yields a usage question
            q = await p.evaluate("(() => { const w = WL.find(x => x.h === '準備'); S.wm[w.k] = [.9,.8,.6,.6,.5,.2]; S.cards[w.k] = [4, Date.now(), 5, 0]; let got = []; for (let i = 0; i < 30; i++) { const q = qFor(w, {lvl: 4}); got.push(q.qt); } return uniq(got); })()")
            note(f'[{name}] question types for 準備 at stage 4: {q}')
            await ctx.close()
        await b.close()
    print('ERRORS', len(errors)); print('\n'.join(errors[:30]))
    if errors: raise SystemExit(1)
asyncio.run(main())
