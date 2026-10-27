"""Memory & reading upgrades: the long-term review schedule, mix-up tracking (characters you confuse), the 字形診所
mix-up clinic, who/when/where/what and choose-the-reply questions, the midterm redo, the new midterm-style test (different
every time) and its drills, and the memory forecast.
Runs at 320 px (phone) and 1366 px (desktop) and fails on page errors or overlapping elements."""
import asyncio, os, re
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def load(name):
    ns = {'__file__': os.path.join(HERE, name)}
    exec(re.sub(r'^asyncio\.run\(main\(\)\)\s*$', '', open(os.path.join(HERE, name), encoding='utf-8').read(), flags=re.M), ns)  # only the last line
    return ns
tg, ta = load('test_game.py'), load('test_adaptive.py')
SHOTS = os.path.join(HERE, 'shots', 'memory'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []

async def check(p, tag):
    if await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1"): errors.append(f'{tag} horizontal overflow')
    o = await p.evaluate(ta['OVERLAP_JS'])
    if o: errors.append(f'{tag} overlaps: {o}')

async def run_through(p, tag, n=60, smart=True, shot=None):
    """Answer a running session step by step, checking the layout of every question and answer sheet."""
    for step in range(n):
        await p.wait_for_timeout(90)
        if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
        if await p.locator('.modal').count(): await tg['clear_modals'](p); continue
        await check(p, f'{tag} q{step}')
        if shot and step == 0: await p.screenshot(path=f'{SHOTS}/{shot}.png')
        await tg['drive'](p, smart, n=1)
        if await p.locator('.sess-foot.ok, .sess-foot.no').count(): await check(p, f'{tag} sheet{step}')
        if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue': await p.locator('#cta').click()
    await p.wait_for_timeout(1700); await tg['clear_modals'](p)
    return bool(await p.locator('.finish').count())

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for w, h in [(320, 700), (1366, 900)]:
            tag = f'[{w}]'
            ctx = await b.new_context(viewport={'width': w, 'height': h})
            p = await ctx.new_page()
            p.on('pageerror', lambda e: errors.append(f'pageerror {w}: {e}'))
            p.on('console', lambda m: errors.append(f'console {w}: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await p.route('**/*', tg['route']); await p.goto(tg['URL']); await p.wait_for_timeout(800)
            await tg['clear_modals'](p)
            # 1) long-term schedule: intervals grow, and nothing is scheduled after the day before the test
            sched = await p.evaluate("""(() => { S.testDate = ymd(new Date(Date.now() + 40 * 864e5)); const k = H2W['買'].k; delete S.cards[k]; delete S.fs[k];
              const eve = parseYmd(S.testDate).getTime() - 16 * 36e5; let now = Date.now(), late = 0; const gaps = [];
              for (let i = 0; i < 6; i++) { const r = schedule(k, 2, now); if (now < eve - 3 * 36e5 && r.c[1] > eve + 1) late++; S.cards[k] = r.c; S.fs[k] = r.f; gaps.push(+(r.mins / 1440).toFixed(2)); now = r.c[1]; }
              return { gaps, late }; })()""")
            notes.append(f'{tag} review gaps (days) {sched}')
            g = sched['gaps']  # intervals grow, and no review set before the test lands after the day before it
            if not (g[3] > g[2] > 1 and sched['late'] == 0): errors.append(f'{tag} schedule wrong: {sched}')
            # 2) a real wrong click records the right mix-up (the option you clicked, at word and character level)
            await p.evaluate("S.conf = {}; S.cc = {}; runQuiz({ title: 't', adaptive: true, qs: [qContrast(H2W['買'], H2W['賣'])], back: () => go('learn') })"); await p.wait_for_timeout(400)
            i = await p.evaluate("RUN.cur.opts.indexOf('賣')")
            await p.locator(f'.opt[data-i="{i}"]').click(); await p.locator('#cta').click(); await p.wait_for_timeout(500)
            await check(p, f'{tag} mix-up sheet'); await p.screenshot(path=f'{SHOTS}/mixup_sheet_{w}.png')
            mix = await p.evaluate("({ conf: S.conf[H2W['買'].k] || {}, cc: S.cc, want: H2W['賣'].k })")
            notes.append(f'{tag} recorded mix-up {mix}')
            if mix['conf'].get(mix['want']) != 1 or not mix['cc']: errors.append(f'{tag} mix-up not recorded right: {mix}')
            await p.evaluate("go('learn')"); await p.wait_for_timeout(300)
            # 3) mix-up clinic from the Practice hub
            await p.evaluate("go('practice')"); await p.wait_for_timeout(400); await check(p, f'{tag} practice hub')
            await p.locator('#hubClinic').click(); await p.wait_for_timeout(900)
            first = await p.evaluate("RUN && RUN.cur ? RUN.cur.label : null")
            if first != '字形 · Spot the difference': errors.append(f'{tag} clinic did not start with a contrast card: {first}')
            await check(p, f'{tag} contrast card'); await p.screenshot(path=f'{SHOTS}/contrast_{w}.png', full_page=True)
            red = await p.evaluate("document.querySelectorAll('.mixcard svg path[style*=\"--seal\"]').length")
            notes.append(f'{tag} clinic: first={first} red strokes on card={red} pair={await p.evaluate("Object.keys(S.cc)")}')
            if not await run_through(p, f'{tag} clinic', smart=False): errors.append(f'{tag} clinic did not finish')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 4) new drills: who/when/where/what and choose the reply
            for d in ['frame', 'qa', 'look', 'passage', 'halves', 'mwbank']:
                await p.evaluate("go('drills')"); await p.wait_for_timeout(400); await check(p, f'{tag} drills page')
                await p.locator(f'[data-drill="{d}"]').click(); await p.wait_for_timeout(400)
                if not await run_through(p, f'{tag} drill {d}', shot=f'drill_{d}_{w}'): errors.append(f'{tag} drill {d} did not finish')
                if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 5) the midterm redo, all answers right -> 100% recorded
            await p.evaluate("go('test')"); await p.wait_for_timeout(400); await check(p, f'{tag} tests page')
            await p.locator('#mid_go').click(); await p.wait_for_timeout(400)
            if not await run_through(p, f'{tag} midterm', n=80, shot=f'midterm_{w}'): errors.append(f'{tag} midterm did not finish')
            m = await p.evaluate("S.mocks[S.mocks.length - 1]")
            notes.append(f'{tag} midterm result {m}')
            if not m or m['type'] != 'mid' or m['pct'] != 100 or m['n'] != 116: errors.append(f'{tag} midterm score wrong: {m}')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 5b) a new midterm-style test: a different test every time, all answers right -> 100% recorded
            v = await p.evaluate("""(() => { const sig = qs => qs.map(q => q.kind === 'bank' ? q.bank.join('') + JSON.stringify(q.ans) : q.prompt + q.opts.join('')).join('|');
              const a = midStyleTest({ noListen: true }), b = midStyleTest({ noListen: true }), n = qs => qs.reduce((x, q) => x + (q.kind === 'bank' ? q.ans.length : 1), 0);
              return { differ: sig(a) !== sig(b), n: n(a), parts: a.map(q => q.kind === 'bank' ? (q.layout || q.cat) : q.qt).join(' ') }; })()""")
            notes.append(f'{tag} midterm-style test {v}')
            if not v['differ'] or v['n'] < 80: errors.append(f'{tag} midterm-style tests not new each time: {v}')
            await p.evaluate("go('test')"); await p.wait_for_timeout(400)
            await p.locator('#ms_prac').click(); await p.wait_for_timeout(400)
            if not await run_through(p, f'{tag} midterm-style', n=80, shot=f'midstyle_{w}'): errors.append(f'{tag} midterm-style test did not finish')
            m = await p.evaluate("S.mocks[S.mocks.length - 1]")
            notes.append(f'{tag} midterm-style result {m}')
            if not m or m['type'] != 'midstyle' or m['pct'] != 100 or m['n'] < 80: errors.append(f'{tag} midterm-style score wrong: {m}')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 6) a timed test that runs out of time counts the unanswered questions as wrong
            await p.evaluate("runQuiz({ title: 'Mock test', exam: true, mock: true, type: 'mock', minutes: 30, qs: mockQuiz(true), back: () => go('test') })"); await p.wait_for_timeout(300)
            await tg['drive'](p, True, n=2)
            await p.evaluate("RUN.t0 = Date.now() - 31 * 60 * 1000"); await p.wait_for_timeout(1400)
            m = await p.evaluate("S.mocks[S.mocks.length - 1]")
            notes.append(f'{tag} timed-out mock {m["pct"]}% of {m["n"]}')
            if m['n'] < 40 or m['pct'] > 10: errors.append(f'{tag} timed-out mock scored only the answered questions: {m}')
            await tg['clear_modals'](p)
            # 7) memory forecast on the Stats page
            await p.evaluate("go('me', {tab: 'stats'})"); await p.wait_for_timeout(500)
            fc = await p.evaluate("[...document.querySelectorAll('.card h3')].some(h => h.textContent === 'Memory forecast')")
            if not fc: errors.append(f'{tag} no memory forecast on Stats')
            await check(p, f'{tag} stats'); await p.screenshot(path=f'{SHOTS}/stats_{w}.png', full_page=True)
            await ctx.close()
        await b.close()
    print('\n'.join(notes)); print('ERRORS', len(errors)); print('\n'.join(errors[:40]))
    if errors: raise SystemExit(1)
asyncio.run(main())
