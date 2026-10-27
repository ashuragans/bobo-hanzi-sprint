"""Learner record: peeking at answer choices and at every Chinese prompt, every answer recorded by question type, sentence
questions teaching the word model, the 錯題本 mistake notebook (and Smart review bringing it back), the coach, and old saves
still loading. Runs at 320 px (phone, light) and 1366 px (desktop, dark) and fails on page errors or overlapping elements."""
import asyncio, os, re
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def load(name):
    ns = {'__file__': os.path.join(HERE, name)}
    exec(re.sub(r'^asyncio\.run\(main\(\)\)\s*$', '', open(os.path.join(HERE, name), encoding='utf-8').read(), flags=re.M), ns)  # only the last line
    return ns
tg, ta = load('test_game.py'), load('test_adaptive.py')
SHOTS = os.path.join(HERE, 'shots', 'record'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []

async def check(p, tag):
    if await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1"): errors.append(f'{tag} horizontal overflow')
    o = await p.evaluate(ta['OVERLAP_JS'])
    if o: errors.append(f'{tag} overlaps: {o}')

async def run_through(p, tag, n=40):
    for step in range(n):
        await p.wait_for_timeout(90)
        if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
        if await p.locator('.modal').count(): await tg['clear_modals'](p); continue
        await check(p, f'{tag} q{step}')
        await tg['drive'](p, True, n=1)
        if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue': await p.locator('#cta').click()
    await p.wait_for_timeout(1700); await tg['clear_modals'](p)
    return bool(await p.locator('.finish').count())

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for w, h, scheme in [(320, 700, 'light'), (1366, 900, 'dark')]:
            tag = f'[{w} {scheme}]'
            ctx = await b.new_context(viewport={'width': w, 'height': h}, color_scheme=scheme)
            p = await ctx.new_page()
            p.on('pageerror', lambda e: errors.append(f'pageerror {w}: {e}'))
            p.on('console', lambda m: errors.append(f'console {w}: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await p.route('**/*', tg['route']); await p.goto(tg['URL']); await p.wait_for_timeout(800)
            await tg['clear_modals'](p)
            # 0) an old save without the new fields still loads, and a backup round trip keeps them
            r = await p.evaluate("""(() => { const old = JSON.parse(JSON.stringify(S)); delete old.qs; delete old.ga; delete old.miss; const n = normalize(old);
              const k = normalize(JSON.parse(JSON.stringify(Object.assign({}, S, { qs: { half: [1, 2, 0, 0, '01', 0] }, miss: { 'x|y': [0, 1, 1, '', 1, 'half'] } }))));
              return { fresh: !!(n.qs && n.ga && n.miss), kept: !!(k.qs.half && k.miss['x|y']) }; })()""")
            if not (r['fresh'] and r['kept']): errors.append(f'{tag} saved progress not repaired/kept: {r}')
            await p.evaluate("WL.slice(0, 160).forEach(w => { S.cards[w.k] = [3, Date.now() + 864e5, 3, 0]; }); S.totals.sessions = 2; save()")
            # 1) a second-halves question: the prompt words can be tapped, a choice can be peeked (拼 then 意), a wrong answer is recorded
            await p.evaluate("S.qs = {}; S.miss = {}; S.pk = {}; window._h = ST.halves[0]; runQuiz({ title: 't', adaptive: true, qs: [genHalves(4, { with: _h })[0]], back: () => go('learn') })")
            await p.wait_for_timeout(400)
            toks = await p.locator('.qprompt .tok').count()
            if toks < 2: errors.append(f'{tag} prompt words are not tappable ({toks})')
            await p.locator('.qprompt .tok').first.click(); await p.wait_for_timeout(120)
            wrong = await p.evaluate("[0, 1, 2, 3].find(i => !RUN.cur.ans.includes(i))")
            for _ in range(2): await p.locator(f'.opeek[data-pi="{wrong}"]').click(); await p.wait_for_timeout(120)
            shown = await p.evaluate(f"[!!document.querySelector('.opt[data-i=\"{wrong}\"] .opy'), !!document.querySelector('.opt[data-i=\"{wrong}\"] .oen')]")
            if shown != [True, True]: errors.append(f'{tag} peeking at a choice did not show pinyin and meaning: {shown}')
            await check(p, f'{tag} peeked choice'); await p.screenshot(path=f'{SHOTS}/peek_{w}.png')
            await p.locator(f'.opt[data-i="{wrong}"]').click(); await p.locator('#cta').click(); await p.wait_for_timeout(400)
            rec = await p.evaluate("""({ qs: S.qs.half, miss: Object.keys(S.miss), pk: Object.keys(S.pk).length,
              soon: Object.keys(S.cards).filter(k => S.cards[k][1] < Date.now() + 15 * 60000).length })""")
            notes.append(f'{tag} after a wrong second half: {rec}')
            if not rec['qs'] or rec['qs'][1] != 1 or rec['qs'][0] != 0 or rec['qs'][2] != 1: errors.append(f'{tag} answer not recorded by type: {rec}')
            if rec['miss'] != ['ch|' + await p.evaluate("_h[0]")]: errors.append(f'{tag} mistake not saved: {rec}')
            if rec['pk'] < 2 or rec['soon'] < 1: errors.append(f'{tag} peeks / sentence words not fed to the word model: {rec}')
            await p.locator('#cta').click(); await p.wait_for_timeout(1500); await tg['clear_modals'](p)
            fin = await p.evaluate("document.querySelector('.finish') ? document.querySelector('.finish').innerText : ''")
            if '錯題本' not in fin: errors.append(f'{tag} results screen does not mention the mistake notebook')
            await check(p, f'{tag} results'); await p.screenshot(path=f'{SHOTS}/results_{w}.png', full_page=True)
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 2) the notebook: the question can be rebuilt; three clean right answers clear it, a helped one does not count
            r = await p.evaluate("""(() => { const s = Object.keys(S.miss)[0], q = missQ(s); const a = !!q && q.sig === s;
              noteMiss(s, true, true, '', 'half'); const helped = S.miss[s][0]; noteMiss(s, true, false, '', 'half'); noteMiss(s, true, false, '', 'half'); const two = S.miss[s][0];
              noteMiss(s, true, false, '', 'half'); return { rebuilt: a, helped, two, gone: !S.miss[s] }; })()""")
            if r != {'rebuilt': True, 'helped': 0, 'two': 2, 'gone': True}: errors.append(f'{tag} notebook boxes wrong: {r}')
            # every kind of saved mistake can be rebuilt
            r = await p.evaluate("""(() => { const sigs = ['dr|' + DRILLS.findIndex(d => d.k === 'choose'), 'dr|' + DRILLS.findIndex(d => d.k === 'order'), 'rd|0', 'ord|' + TT.orders[0].a[0], 'qa|0',
              'ch|' + TT.mid.choice[0].items[0][0], 'ch|A：' + ST.dialogs[0][0] + '　B：＿＿'];
              return sigs.filter(s => { S.miss[s] = [0, 0, 1, '', 1, 'x']; const q = missQ(s); return !q || q.sig !== s; }); })()""")
            if r: errors.append(f'{tag} saved mistakes that cannot be rebuilt: {r}')
            # 3) a word-bank passage records every blank under its own type
            await p.evaluate("window._pg = genPassage({ n: 10 }); runQuiz({ title: 't', qs: [_pg], back: () => go('learn') })"); await p.wait_for_timeout(300)
            await tg['drive'](p, True, n=1); await p.wait_for_timeout(300)
            n = await p.evaluate("(S.qs.passage || [0, 0])[1] === _pg.ans.length")
            if not n: errors.append(f'{tag} passage blanks not recorded as passage')
            await p.evaluate("go('learn')"); await p.wait_for_timeout(300)
            # 4) Smart review brings back a due mistake and the weakest question type
            await p.evaluate("for (const s in S.miss) S.miss[s][1] = Date.now() - 1000; S.qs.time = [1, 7, 0, 0, '1000000', 0]; save()")
            await p.evaluate("startSmart()"); await p.wait_for_timeout(300)
            labels = []
            for step in range(26):
                if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
                if await p.locator('.modal').count(): await tg['clear_modals'](p); continue
                labels.append(await p.evaluate("RUN && RUN.cur ? (RUN.cur.label || '') + ' [' + qtypeOf(RUN.cur) + ']' : ''"))
                await check(p, f'{tag} smart q{step}')
                await tg['drive'](p, True, n=1)
                if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue': await p.locator('#cta').click()
            await p.wait_for_timeout(1700); await tg['clear_modals'](p)
            notes.append(f'{tag} smart review: {labels}')
            if not any(l.startswith('錯題') for l in labels): errors.append(f'{tag} Smart review did not bring back a saved mistake: {labels}')
            if not any(l.endswith('[time]') for l in labels): errors.append(f'{tag} Smart review did not practise the weakest question type: {labels}')
            if not await p.locator('.finish').count(): errors.append(f'{tag} Smart review did not finish')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 5) the coach on the learning path and on Stats, and its button starts the right practice
            await p.evaluate("S.qs.half = [2, 9, 4, 270000, '010010100', 9]; S.ga.g_shi = [0, 4, Date.now()]; save(); go('learn')"); await p.wait_for_timeout(500)
            if not await p.locator('.coach [data-coach]').count(): errors.append(f'{tag} no coach on the learning path')
            await p.evaluate("document.querySelector('.coach').scrollIntoView({ block: 'start' })"); await p.wait_for_timeout(200)
            await check(p, f'{tag} learn coach'); await p.screenshot(path=f'{SHOTS}/coach_{w}.png')
            await p.evaluate("go('me', { tab: 'stats' })"); await p.wait_for_timeout(500)
            st = await p.evaluate("({ coach: document.querySelectorAll('.coach .coach-it').length, types: document.querySelectorAll('.qtrow').length, notebook: [...document.querySelectorAll('.card h3')].some(h => h.textContent.includes('錯題本')), titles: coachInsights().list.map(x => x.title) })")
            notes.append(f'{tag} stats: {st}')
            if st['coach'] < 2 or st['types'] < 3 or not st['notebook']: errors.append(f'{tag} stats page missing coach/types/notebook: {st}')
            if 'Second halves' not in st['titles'] or not any('是' in t for t in st['titles']): errors.append(f'{tag} coach missed a weak type or grammar point: {st["titles"]}')
            await check(p, f'{tag} stats'); await p.screenshot(path=f'{SHOTS}/stats_{w}.png', full_page=True)
            await p.locator('.coach [data-coach]').first.click(); await p.wait_for_timeout(500)
            if not await p.evaluate("!!RUN"): errors.append(f'{tag} coach button did not start practice')
            elif not await run_through(p, f'{tag} coach practice'): errors.append(f'{tag} coach practice did not finish')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 6) the notebook from the Practice hub
            await p.evaluate("S.miss['dr|0'] = [0, Date.now() - 1, 1, 'x', Date.now(), 'grammar']; go('practice')"); await p.wait_for_timeout(400)
            await check(p, f'{tag} practice hub')
            await p.locator('#hubMiss').click(); await p.wait_for_timeout(400)
            if not await run_through(p, f'{tag} notebook'): errors.append(f'{tag} notebook practice did not finish')
            await ctx.close()
        await b.close()
    print('\n'.join(notes)); print('ERRORS', len(errors)); print('\n'.join(errors[:40]))
    if errors: raise SystemExit(1)
asyncio.run(main())
