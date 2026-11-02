"""記憶法 memory tricks: a story for every character, the hard-word picker (peeks, wrong answers, mix-ups), the trick card
(parts, story, tone, your own story), the trick session with its checks, the mini trick after a wrong answer, the trick card
inside adaptive practice, the results-screen offer, the Practice tile, the Stats list, the coach and the word pop-up.
Runs at 320 px (phone, light) and 1366 px (desktop, dark) and fails on page errors or overlapping elements."""
import asyncio, os, re
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def load(name):
    ns = {'__file__': os.path.join(HERE, name)}
    exec(re.sub(r'^asyncio\.run\(main\(\)\)\s*$', '', open(os.path.join(HERE, name), encoding='utf-8').read(), flags=re.M), ns)  # only the last line
    return ns
tg, ta = load('test_game.py'), load('test_adaptive.py')
SHOTS = os.path.join(HERE, 'shots', 'tricks'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []

async def check(p, tag):
    if await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1"): errors.append(f'{tag} horizontal overflow')
    o = await p.evaluate(ta['OVERLAP_JS'])
    if o: errors.append(f'{tag} overlaps: {o}')

# a hard word: peeked at and missed; the second one too, so the coach has two
HARD = """(() => { const now = Date.now(), ws = WL.filter(w => w.lv !== 9 && [...w.h].length === 2 && [...w.h].every(c => MN[c]) && sylsOf(w));
  window._w = ws.find(w => w.h === '漂亮') || ws[0]; window._w2 = ws.find(w => w.h === '流行') || ws[1];
  S.pk = {}; S.mt = {}; S.conf = {};
  [_w, _w2].forEach(w => { S.pk[w.k] = [3, 2, now]; S.cards[w.k] = [1, now - 864e5, 4, 3]; });
  save(); return [_w.h, _w2.h, hardScore(_w.k), hardWords(6).map(w => w.h)]; })()"""

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
            # 0) an old save without the new fields still loads; a backup keeps your own stories
            r = await p.evaluate("""(() => { const old = JSON.parse(JSON.stringify(S)); delete old.myMn; delete old.mt; const n = normalize(old);
              const k = normalize(JSON.parse(JSON.stringify(Object.assign({}, S, { myMn: { 學: 'my story' }, mt: { x: [1, 2] } }))));
              return { fresh: !!(n.myMn && n.mt), kept: k.myMn.學 === 'my story' && !!k.mt.x }; })()""")
            if not (r['fresh'] and r['kept']): errors.append(f'{tag} saved progress not repaired/kept: {r}')
            # 1) every character on the site has a memory story, and every word's trick card renders
            r = await p.evaluate("""(() => { const cs = uniq(WL.flatMap(w => [...w.h]).filter(c => HAN.test(c)));
              const bad = []; WL.forEach(w => { try { const t = trickHTML(w, { edit: true }); if (/undefined|NaN|\\[object/.test(t)) bad.push(w.h); } catch (e) { bad.push(w.h + ':' + e.message); } });
              const toneDigits = WL.filter(w => /tk-tone[^<]*<span[^>]*>[^<]*<\\/span><b>[^<]*\\d/.test(trickHTML(w))).map(w => w.h).slice(0, 5);
              return { chars: cs.length, missing: cs.filter(c => !MN[c]).slice(0, 20), bad: bad.slice(0, 10), toneDigits }; })()""")
            notes.append(f'{tag} {r["chars"]} characters on the site')
            if r['missing']: errors.append(f'{tag} characters with no memory story: {r["missing"]}')
            if r['bad']: errors.append(f'{tag} trick cards that do not render: {r["bad"]}')
            if r['toneDigits']: errors.append(f'{tag} tone line shows tone numbers instead of marks: {r["toneDigits"]}')
            await p.evaluate("WL.slice(0, 160).forEach(w => { S.cards[w.k] = [3, Date.now() + 864e5, 3, 0]; }); S.myMn = {}; S.totals.sessions = 2; save()")
            # 2) the hard-word picker: only the peeked-at and missed words, with the reason
            hw = await p.evaluate(HARD)
            notes.append(f'{tag} hard words: {hw}')
            if hw[0] not in hw[3] or hw[1] not in hw[3]: errors.append(f'{tag} peeked and missed words are not picked as hard: {hw}')
            calm = await p.evaluate("WL.slice(0, 160).filter(w => w.k !== _w.k && w.k !== _w2.k && hardScore(w.k) >= 1.2).map(w => w.h).slice(0, 5)")
            if calm: errors.append(f'{tag} words you know well are picked as hard: {calm}')
            why = await p.evaluate("whyHard(_w.k)")
            if 'peeked' not in why or 'missed' not in why: errors.append(f'{tag} reason missing: {why!r}')
            # 3) Stats: the hardest words, a word opens its trick, your own story is saved and shows first
            await p.evaluate("go('me', { tab: 'stats' })"); await p.wait_for_timeout(500)
            n = await p.locator('.hardit').count()
            if n < 2: errors.append(f'{tag} hardest words not listed on Stats ({n})')
            await check(p, f'{tag} stats'); await p.locator('.hardit').first.scroll_into_view_if_needed(); await p.screenshot(path=f'{SHOTS}/stats_{w}.png')
            await p.locator(f'.hardit[data-trick="{await p.evaluate("_w.k")}"]').click(); await p.wait_for_timeout(400)
            if not await p.locator('.modal.trickm .trick').count(): errors.append(f'{tag} trick pop-up did not open')
            else:
                r = await p.evaluate("""(() => { const m = document.querySelector('.modal.trickm'); return { chars: m.querySelectorAll('.tk-char').length, parts: m.querySelectorAll('.tk-part').length,
                  lit: !!m.querySelector('.tk-lit'), tone: m.querySelectorAll('.tk-tone').length, why: !!m.textContent.match(/peeked/) }; })()""")
                if r['chars'] != 2 or r['parts'] < 2 or r['tone'] != 2 or not r['why']: errors.append(f'{tag} trick card incomplete: {r}')
                await check(p, f'{tag} trick pop-up'); await p.screenshot(path=f'{SHOTS}/popup_{w}.png')
                await p.locator('.modal.trickm [data-mine-open]').first.click()
                await p.locator('.modal.trickm textarea[data-mine]').first.fill('a pretty girl washing in the river')
                await p.locator('.modal.trickm textarea[data-mine]').first.press('Enter')  # must not close or skip anything
                await p.locator('.modal.trickm [data-mine-save]').first.click(); await p.wait_for_timeout(200)
                c0 = await p.evaluate("[..._w.h][0]")
                mine = await p.evaluate(f"[S.myMn['{c0}'], JSON.parse(localStorage.getItem(LS_KEY) || '{{}}').myMn]")
                if not mine[0] or 'pretty girl' not in mine[0] or not mine[1] or c0 not in mine[1]: errors.append(f'{tag} your own story was not saved: {mine}')
                await check(p, f'{tag} pop-up after save')
                await p.locator('.modal [data-mb="1"]').click(); await p.wait_for_timeout(250)
            r = await p.evaluate("mnemoHTML(_w.h)")
            if 'Your story' not in r or 'pretty girl' not in r: errors.append(f'{tag} your story does not show on cards')
            # 4) the trick session: card, then a check right away and another at the end; the trick is logged
            await p.evaluate("S.mt = {}; startTricks([_w, _w2], () => go('learn'))"); await p.wait_for_timeout(500)
            first = await p.evaluate("[RUN.cur.kind, !!RUN.cur.trick, document.querySelector('.qlabel').textContent, !!document.querySelector('#qbody .tk-story.mine')]")
            if first[:2] != ['teach', True] or 'TRICK' not in first[2] or not first[3]: errors.append(f'{tag} session does not start with the trick card and your story: {first}')
            await check(p, f'{tag} trick card'); await p.screenshot(path=f'{SHOTS}/card_{w}.png', full_page=True)
            kinds, seen_k = [], []
            for step in range(30):
                await p.wait_for_timeout(110)
                if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
                if await p.locator('.modal').count(): await tg['clear_modals'](p); continue
                cur = await p.evaluate("RUN && RUN.cur ? [RUN.cur.kind, RUN.cur.k || '', RUN.i] : null")
                if cur and (not kinds or kinds[-1] != cur): kinds.append(cur)
                await check(p, f'{tag} trick session step {step}')
                await tg['drive'](p, True, n=1)  # answers one item (a card: just Continue), and moves on
            await p.wait_for_timeout(1500)
            fin = await p.locator('.finish').count()
            ks = [x[0] for x in kinds]
            notes.append(f'{tag} trick session: {ks}')
            if not fin: errors.append(f'{tag} trick session did not finish: {kinds}')
            if ks.count('teach') != 2 or len(ks) < 5: errors.append(f'{tag} trick session should be 2 cards + checks: {ks}')
            mt = await p.evaluate("[S.mt[_w.k] && S.mt[_w.k][0], S.mt[_w2.k] && S.mt[_w2.k][0], hardScore(_w.k) < 1.2]")
            if mt[:2] != [1, 1]: errors.append(f'{tag} trick shown not recorded: {mt}')
            if not mt[2]: errors.append(f'{tag} a word that just had its trick still counts as hard right away: {mt}')
            if await p.locator('#fin-trick').count(): errors.append(f'{tag} the trick session offers itself again on its results screen')
            await check(p, f'{tag} trick results'); await p.screenshot(path=f'{SHOTS}/results_{w}.png', full_page=True)
            await tg['clear_modals'](p)
            # 5) a wrong answer shows the word's memory trick in the answer sheet; the results screen offers the tricks
            await p.evaluate(HARD)
            await p.evaluate("runQuiz({ title: 't', adaptive: true, qs: [qWord(_w, 'mean', 3), qWord(_w2, 'mean', 3)], back: () => go('learn') })"); await p.wait_for_timeout(400)
            wrong = await p.evaluate("[0, 1, 2, 3].find(i => !RUN.cur.ans.includes(i))")
            await p.locator(f'.opt[data-i="{wrong}"]').click(); await p.locator('#cta').click(); await p.wait_for_timeout(400)
            mini = await p.evaluate("[!!document.querySelector('.sess-foot .tk-mini'), (document.querySelector('.sess-foot .tk-mini') || {}).textContent || '']")
            if not mini[0]: errors.append(f'{tag} wrong answer does not show the memory trick')
            elif 'pretty girl' not in mini[1]: errors.append(f'{tag} the mini trick does not show your own story first: {mini[1][:80]}')
            await check(p, f'{tag} wrong-answer sheet'); await p.screenshot(path=f'{SHOTS}/sheet_{w}.png')
            await p.locator('#cta').click(); await p.wait_for_timeout(300)
            for _ in range(8):
                if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
                await tg['drive'](p, True, n=1)
            await p.wait_for_timeout(1500); await tg['clear_modals'](p)
            if not await p.locator('#fin-trick').count(): errors.append(f'{tag} results screen does not offer memory tricks for the missed word')
            else:
                await check(p, f'{tag} results with trick offer'); await p.screenshot(path=f'{SHOTS}/offer_{w}.png', full_page=True)
                await p.locator('#fin-trick').click(); await p.wait_for_timeout(500)
                r = await p.evaluate("RUN ? [RUN.cur.kind, !!RUN.cur.trick] : null")
                if r != ['teach', True]: errors.append(f'{tag} the results-screen button does not start the tricks: {r}')
            await p.evaluate("RUN = null; go('learn')"); await p.wait_for_timeout(300)
            # 6) adaptive practice puts the trick card in front of a hard word (once)
            await p.evaluate(HARD)
            r = await p.evaluate("""(() => { const g = wordGen([_w], { teach: 0 }); const out = []; const R = { i: 0, log: [] };
              for (let i = 0; i < 6; i++) { const q = g(R); R.i++; out.push(q.kind + (q.trick ? '*' : '')); } return out; })()""")
            notes.append(f'{tag} adaptive items for a hard word: {r}')
            if r.count('teach*') != 1 or r[0] != 'teach*': errors.append(f'{tag} adaptive practice does not show the trick card first, once: {r}')
            # 7) the Practice tile, the coach and the word pop-up
            await p.evaluate("go('practice')"); await p.wait_for_timeout(400)
            if not await p.locator('#hubTricks').count(): errors.append(f'{tag} no 記憶法 tile on Practice')
            else:
                t = await p.locator('#hubTricks').inner_text()
                if 'hard word' not in t: errors.append(f'{tag} tile does not say how many words need a trick: {t!r}')
                await check(p, f'{tag} practice hub')
                await p.locator('#hubTricks').click(); await p.wait_for_timeout(500)
                if not await p.evaluate("!!(RUN && RUN.cur && RUN.cur.trick)"): errors.append(f'{tag} the tile does not start the tricks')
            await p.evaluate("RUN = null; go('learn')"); await p.wait_for_timeout(300)
            await p.evaluate(HARD)
            r = await p.evaluate("coachInsights().list.map(i => i.title)")
            if not any("don't stick" in t for t in r): errors.append(f'{tag} coach does not suggest memory tricks: {r}')
            await p.evaluate("wordPop(_w.h, document.querySelector('.topbar'))"); await p.wait_for_timeout(300)
            if not await p.locator('.pop [data-trickpop]').count(): errors.append(f'{tag} word pop-up has no Trick button')
            else:
                await check(p, f'{tag} word pop-up')
                await p.locator('.pop [data-trickpop]').click(); await p.wait_for_timeout(400)
                if not await p.locator('.modal.trickm').count(): errors.append(f'{tag} the Trick button does not open the trick')
                await tg['clear_modals'](p)
            await ctx.close()
        await b.close()
    for n in notes: print('  ', n)
    if errors:
        print('FAIL'); [print('  -', e) for e in errors[:40]]; raise SystemExit(1)
    print('PASS: memory tricks')

asyncio.run(main())
