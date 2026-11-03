"""打字 type the pinyin: reading and grading pinyin (tone numbers, tone marks, ü, neutral tones, 一/不, the book's spelling,
synonyms on meaning cards), live tone marks while typing, the tone keys, the 打字 page (decks, modes, progress, tones, word
grid, word card), a full session (new-word copy card, right, almost (tones), wrong + type it again, hints, I don't know,
listening and meaning cards), what gets saved (S.ty, S.tt, S.tc, the memory model) and the Practice tile.
Runs at 320 px (phone, light), 390 px (phone, dark) and 1366 px (desktop, dark); fails on page errors or overlapping elements."""
import asyncio, os, re
from playwright.async_api import async_playwright
HERE = os.path.dirname(os.path.abspath(__file__))
def load(name):
    ns = {'__file__': os.path.join(HERE, name)}
    exec(re.sub(r'^asyncio\.run\(main\(\)\)\s*$', '', open(os.path.join(HERE, name), encoding='utf-8').read(), flags=re.M), ns)
    return ns
tg, ta = load('test_game.py'), load('test_adaptive.py')
SHOTS = os.path.join(HERE, 'shots', 'type'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []

async def check(p, tag):
    if await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1"):
        wide = await p.evaluate("""[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,4).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right))""")
        errors.append(f'{tag} horizontal overflow: {wide}')
    o = await p.evaluate(ta['OVERLAP_JS'])
    if o: errors.append(f'{tag} overlaps: {o}')

GRADE = r"""(() => { const t = (s, h, f) => { const w = H2W[h]; const g = tyGrade(s, w, f || 'h', true); return (g.ok ? 'ok' : g.half ? 'half' : 'no') + (g.other ? '+other' : ''); };
  return { 'fang1bian4': t('fang1bian4', '方便'), 'fāngbiàn': t('fāngbiàn', '方便'), 'Fang1 bian4': t('Fang1 bian4', '方便'), 'fangbian': t('fangbian', '方便'),
    'fang1bian3': t('fang1bian3', '方便'), 'fan1bian4': t('fan1bian4', '方便'), 'shu1fu': t('shu1fu', '舒服'), 'shu1fu2': t('shu1fu2', '舒服'),
    'yi2ding4': t('yi2ding4', '一定'), 'yi1ding4': t('yi1ding4', '一定'), 'lv4': t('lv4', '綠'), 'lu4': t('lu4', '綠'), 'lü4': t('lü4', '綠'),
    'mei2guan1xi': t('mei2guan1xi', '沒關係'), 'mei2guan1xi5': t('mei2guan1xi5', '沒關係'), 'che1zi/e': t('che1zi', '汽車', 'e'), 'che1zi/h': t('che1zi', '汽車', 'h'),
    'qu4nian2': t('qu4nian2', '去年'), 'qv4nian2': t('qv4nian2', '去年') }; })()"""
GRADE_WANT = {'fang1bian4': 'ok', 'fāngbiàn': 'ok', 'Fang1 bian4': 'ok', 'fangbian': 'half', 'fang1bian3': 'half', 'fan1bian4': 'no', 'shu1fu': 'ok', 'shu1fu2': 'ok',
              'yi2ding4': 'ok', 'yi1ding4': 'ok', 'lv4': 'ok', 'lu4': 'no', 'lü4': 'ok', 'mei2guan1xi': 'ok', 'mei2guan1xi5': 'ok', 'che1zi/e': 'ok+other',
              'che1zi/h': 'no', 'qu4nian2': 'ok', 'qv4nian2': 'ok'}
FIX = "[['fang1bian4', 10], ['lv4', 3], ['nu:3', 4], ['zhuang4', 7], ['yi1dian3r', 9], ['4', 1], ['xie2zi', 6]].map(([v, c]) => tyFix(v, c)[0])"
FIX_WANT = ['fāngbiàn', 'lǜ', 'nǚ', 'zhuàng', 'yīdiǎnr', '4', 'xiézi']

async def answer_of(p):
    return await p.evaluate("(() => { const u = pyUnits(RUN.cur.w.p); return u.map(x => x.s + (x.t === 5 ? '' : x.t)).join(''); })()")

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for w, h, scheme in [(320, 700, 'light'), (390, 844, 'dark'), (1366, 900, 'dark')]:
            tag = f'[{w} {scheme}]'
            ctx = await b.new_context(viewport={'width': w, 'height': h}, color_scheme=scheme)
            p = await ctx.new_page()
            p.on('pageerror', lambda e: errors.append(f'pageerror {w}: {e}'))
            p.on('console', lambda m: errors.append(f'console {w}: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await p.route('**/*', tg['route']); await p.goto(tg['URL']); await p.wait_for_timeout(800)
            await tg['clear_modals'](p)
            # 0) an old save without the typing fields still loads, and a backup keeps them
            r = await p.evaluate("""(() => { const old = JSON.parse(JSON.stringify(S)); delete old.ty; delete old.tt; delete old.tc; delete old.set.ty; const n = normalize(old);
              const k = normalize(JSON.parse(JSON.stringify(Object.assign({}, S, { ty: { x: [1, 2, 3, 4] }, set: Object.assign({}, S.set, { ty: { deck: 'L7' } }) }))));
              return { fresh: !!(n.ty && n.tt && n.tc && n.set.ty && n.set.ty.deck === 'L78' && n.set.ty.n === 15), kept: k.ty.x[2] === 3 && k.set.ty.deck === 'L7' && k.set.ty.tones === 'strict' }; })()""")
            if not (r['fresh'] and r['kept']): errors.append(f'{tag} saved progress not repaired/kept: {r}')
            # 1) every word of the lessons can be typed, and the grader reads pinyin the way a learner types it
            r = await p.evaluate("""(() => { const ws = uniq(LES.flatMap(l => l.words)).map(k => W[k]).filter(w => [...w.h].every(c => HAN.test(c)));
              return { n: ws.length, bad: ws.filter(w => !tyTypable(w)).map(w => w.h + ':' + w.p).slice(0, 10), l78: tyDeckWords('L78').length,
                variants: ['超級市場', '錶'].filter(h => !tyDeckWords('L7').some(w => w.h === h)),
                missing: ['華語', '年輕人', '難吃', '好聽', '校車', '交通工具', '電線', '抽菸', '穿穿看', '內衣', '舒服', '捷運', '雜誌'].filter(h => !tyDeckWords('L78').some(w => w.h === h)) }; })()""")
            notes.append(f'{tag} {r["n"]} lesson words, {r["l78"]} in Lessons 7–8')
            if r['bad']: errors.append(f'{tag} lesson words that cannot be typed: {r["bad"]}')
            if r['missing']: errors.append(f'{tag} Lesson 7–8 words missing from the typing deck: {r["missing"]}')
            if r['variants']: errors.append(f'{tag} the book spellings have no card: {r["variants"]}')
            g = await p.evaluate(GRADE)
            bad = {k: (v, GRADE_WANT[k]) for k, v in g.items() if v != GRADE_WANT[k]}
            if bad: errors.append(f'{tag} grading (got, want): {bad}')
            fx = await p.evaluate(FIX)
            if fx != FIX_WANT: errors.append(f'{tag} live tone marks: {fx} != {FIX_WANT}')
            r = await p.evaluate("(() => { const out = {}; ['跑', '褲', '樓'].forEach(c => { const w = H2W[c] || WL.find(x => x.h.includes(c)); const u = pyUnits(w.p); const cl = soundClue(c, u[[...w.h].indexOf(c)]); out[c] = cl ? cl.p : null; }); return out; })()")
            if r != {'跑': '包', '褲': '庫', '樓': '婁'}: errors.append(f'{tag} sound clues: {r}')
            r = await p.evaluate("(() => { const bad = []; tyDeckWords('L78').forEach(w => { try { const t = tyRevealHTML(w, { full: true }); if (/undefined|NaN|\\[object/.test(t)) bad.push(w.h); } catch (e) { bad.push(w.h + ':' + e.message); } }); return bad.slice(0, 8); })()")
            if r: errors.append(f'{tag} word cards that do not render: {r}')

            # 2) the 打字 page: nav tab, decks, modes, options, progress, word grid, word card
            await p.evaluate("go('type')"); await p.wait_for_timeout(400)
            if w < 920 and not await p.locator('#tabbar [data-go="type"]').count(): errors.append(f'{tag} no 打字 tab in the tab bar')
            if w >= 920 and not await p.locator('#rail [data-go="type"]').count(): errors.append(f'{tag} no 打字 entry in the side rail')
            for sel in ['[data-tydeck="L78"][aria-pressed="true"]', '[data-tyface="mix"][aria-pressed="true"]', '#tyStart', '.ty-legend', '.ty-grid .ty-w']:
                if not await p.locator(sel).count(): errors.append(f'{tag} 打字 page is missing {sel}')
            n0 = await p.locator('.ty-w').count()
            if n0 > 48: errors.append(f'{tag} word grid shows {n0} words before "Show all"')
            await check(p, f'{tag} type page'); await p.screenshot(path=f'{SHOTS}/page_{w}.png')
            await p.locator('[data-tydeck="L8"]').click(); await p.wait_for_timeout(250)
            if await p.evaluate("S.set.ty.deck") != 'L8': errors.append(f'{tag} deck choice not saved')
            await p.locator('[data-tyface="h"]').click(); await p.locator('[data-tyn="10"]').click(); await p.wait_for_timeout(250)
            if await p.evaluate("[S.set.ty.face, S.set.ty.n].join()") != 'h,10': errors.append(f'{tag} mode/length not saved')
            if await p.locator('#tyAll').count():
                await p.locator('#tyAll').click(); await p.wait_for_timeout(250)
                if await p.locator('.ty-w').count() <= 48: errors.append(f'{tag} "Show all" did not show every word')
            await p.locator('.ty-w').first.click(); await p.wait_for_timeout(300)
            if not await p.locator('.modal.tym .ty-rev').count(): errors.append(f'{tag} word card did not open')
            else:
                await check(p, f'{tag} word card'); await p.screenshot(path=f'{SHOTS}/wordcard_{w}.png')
                await p.locator('.modal.tym [data-mb="1"]').click(); await p.wait_for_timeout(150)
            await p.locator('[data-tydeck="L78"]').click(); await p.locator('[data-tyface="mix"]').click(); await p.locator('[data-tyn="15"]').click(); await p.wait_for_timeout(200)

            # 3) a session from scratch: copy card → right → almost → wrong + retype → hints → I don't know
            await p.evaluate("tyDeckWords('L78').forEach(w => { delete S.cards[w.k]; delete S.wm[w.k]; delete S.ty[w.k]; delete S.fs[w.k]; }); S.tt = {}; S.tc = {}; save()")
            await p.locator('#tyStart').click(); await p.wait_for_timeout(500)
            q = await p.evaluate("[RUN.cur.kind, RUN.cur.face]")
            if q != ['type', 'copy']: errors.append(f'{tag} a session on new words should start with a copy card, got {q}')
            await check(p, f'{tag} copy card'); await p.screenshot(path=f'{SHOTS}/copy_{w}.png')
            focus = await p.evaluate("document.activeElement && document.activeElement.id")
            if focus != 'tyIn': errors.append(f'{tag} the input is not focused ({focus})')
            await p.locator('#tyIn').type('xx'); await p.keyboard.press('Enter'); await p.wait_for_timeout(200)
            if await p.evaluate("RUN.cur.face") != 'copy' or await p.locator('#cta:not([disabled])').count(): errors.append(f'{tag} a wrong copy let you continue')
            await p.locator('#tyIn').fill(''); await p.locator('#tyIn').type(await answer_of(p)); await p.keyboard.press('Enter'); await p.wait_for_timeout(250)
            st = await p.evaluate("[!!S.ty[RUN.cur.k], !!S.cards[RUN.cur.k], document.querySelector('#cta').disabled]")
            if st != [True, True, False]: errors.append(f'{tag} copying a new word did not register it: {st}')
            seen = {'right': 0, 'half': 0, 'wrong': 0, 'idk': 0, 'mc': 0}
            for i in range(30):
                await p.keyboard.press('Enter'); await p.wait_for_timeout(350)
                info = await p.evaluate("RUN && RUN.cur ? [RUN.cur.kind, RUN.cur.face || '', RUN.i] : null")
                if not info: break
                kind, face, ri = info
                if kind == 'type' and face == 'copy':
                    await p.locator('#tyIn').type(await answer_of(p)); await p.keyboard.press('Enter'); await p.wait_for_timeout(200); continue
                if kind != 'type':
                    if await p.locator('.opt').count():
                        await p.locator('.opt').first.click(); await p.wait_for_timeout(100)
                        if await p.locator('#cta:not([disabled])').count(): await p.locator('#cta').click()
                        seen['mc'] += 1
                    else: await p.locator('#cta').click()
                    await p.wait_for_timeout(250); continue
                ans = await answer_of(p)
                pending = [m for m in ['right', 'half', 'wrong', 'idk'] if not seen[m] and not (m == 'half' and not re.search(r'[1-4]', ans))]
                mode = pending[0] if pending else 'right'
                k0 = await p.evaluate("RUN.cur.k")
                t0 = await p.evaluate(f"(S.ty['{k0}'] || [0,0,0,0])[2]")
                if mode == 'idk':
                    await p.locator('[data-tyh="hint"]').click(); await p.wait_for_timeout(100)
                    if not await p.locator('#tyHint:not([hidden])').count(): errors.append(f'{tag} hint did not show')
                    await p.locator('[data-tyh="idk"]').click()
                else:
                    typed = ans if mode == 'right' else re.sub(r'\d', '', ans) if mode == 'half' else 'qqq'
                    if mode == 'right' and w == 390 and re.search(r'[1-4]$', ans):
                        # type the letters, then put the last tone on with a tone key: the input keeps the focus
                        await p.locator('#tyIn').type(ans[:-1]); await p.locator(f'.tykey[data-tone="{ans[-1]}"]').click()
                        if not await p.evaluate("document.activeElement && document.activeElement.id === 'tyIn'"): errors.append(f'{tag} a tone key took the focus from the input')
                    else: await p.locator('#tyIn').type(typed)
                    await p.keyboard.press('Enter')
                await p.wait_for_timeout(300)
                foot = await p.evaluate("document.querySelector('.sess-foot').className")
                t1 = await p.evaluate(f"(S.ty['{k0}'] || [0,0,0,0])[2]")
                if t1 != t0 + 1: errors.append(f'{tag} answer not recorded in S.ty ({mode})')
                if mode == 'right' and 'ok' not in foot: errors.append(f'{tag} a right answer was not accepted: {ans} {foot}')
                if mode != 'right' and 'no' not in foot: errors.append(f'{tag} a {mode} answer was not marked: {foot}')
                if not seen[mode]:
                    await check(p, f'{tag} {mode} answer'); await p.screenshot(path=f'{SHOTS}/{mode}_{w}.png')
                if mode == 'half' and not await p.locator('.ty-tips-box').count(): errors.append(f'{tag} no tone tips after a tone mistake')
                if mode in ('half', 'wrong', 'idk'):
                    if not await p.locator('.ty-mn, .ty-clues').count(): errors.append(f'{tag} no memory trick after a mistake')
                    if not await p.locator('#cta[disabled]').count(): errors.append(f'{tag} could continue without typing it again ({mode})')
                    await p.locator('#tyIn').type(ans); await p.keyboard.press('Enter'); await p.wait_for_timeout(200)
                    if await p.locator('#cta[disabled]').count(): errors.append(f'{tag} typing it again did not unlock Continue ({mode})')
                seen[mode] += 1
            notes.append(f'{tag} session: {seen}')
            if not await p.locator('.finish').count(): errors.append(f'{tag} session did not reach the results screen')
            else: await check(p, f'{tag} results'); await p.screenshot(path=f'{SHOTS}/results_{w}.png')
            for k in ['right', 'half', 'wrong', 'idk']:
                if not seen[k]: errors.append(f'{tag} the session never tried a {k} answer: {seen}')
            r = await p.evaluate("[Object.values(S.tt).reduce((a, x) => a + x[1], 0), Object.keys(S.tc).length, (S.qs.type || [0, 0])[1], !!JSON.parse(localStorage.getItem(LS_KEY)).ty]")
            if not (r[0] > 0 and r[1] > 0 and r[2] > 0 and r[3]): errors.append(f'{tag} tone stats / answer record / save missing: {r}')

            # 4) listening and meaning cards, and a synonym that counts on a meaning card
            if w == 1366:
                await p.evaluate("startType({ words: [tyDeckWords('L7').find(w => w.h === '超級市場')], face: 'e', n: 2, teach: 0 })"); await p.wait_for_timeout(400)
                if await p.evaluate("RUN.cur.w.h") != '超級市場': errors.append(f'{tag} the 超級市場 card did not start')
                await p.locator('#tyIn').type('chao1shi4'); await p.keyboard.press('Enter'); await p.wait_for_timeout(300)
                if not await p.locator('.ty-also').count() or 'ok' not in await p.evaluate("document.querySelector('.sess-foot').className"): errors.append(f'{tag} 超市 not accepted for 超級市場 on a meaning card')
                await check(p, f'{tag} meaning card'); await p.screenshot(path=f'{SHOTS}/meaning_{w}.png')
                await p.evaluate("go('type')")
                await p.evaluate("startType({ words: [H2W['方便']], face: 'a', n: 2, teach: 0 })"); await p.wait_for_timeout(400)
                f = await p.evaluate("RUN.cur.face")
                if f not in ('a', 'h'): errors.append(f'{tag} listening card face {f}')
                if f == 'a' and await p.locator('.qprompt .tzg').count(): errors.append(f'{tag} a listening card shows the characters')
                await check(p, f'{tag} listening card'); await p.screenshot(path=f'{SHOTS}/listen_{w}.png')
                await p.evaluate("go('type')")
            # 5) the Practice tile and Smart review can start typing
            await p.evaluate("go('practice')"); await p.wait_for_timeout(300)
            if not await p.locator('.hubtile[data-go="type"]').count(): errors.append(f'{tag} no 打字 tile on Practice')
            r = await p.evaluate("(() => { const q = TYPE_Q.type(); return q && q.kind; })()")
            if r != 'type': errors.append(f'{tag} Smart review cannot make a typing question: {r}')
            await ctx.close()
        await b.close()
    for n in notes: print('  ', n)
    if errors:
        print('FAIL'); [print(' -', e) for e in errors]; raise SystemExit(1)
    print('OK: typing practice')

asyncio.run(main())
