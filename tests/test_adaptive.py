import asyncio, json, os
from playwright.async_api import async_playwright
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_game.py'), encoding='utf-8').read().replace('asyncio.run(main())', '')
tg = {'__file__': os.path.join(os.path.dirname(os.path.abspath(__file__)), 'test_game.py')}; exec(src, tg)
SHOTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'shots', 'adaptive'); os.makedirs(SHOTS, exist_ok=True)
errors, notes = [], []
class N(list):
    def append(self, x):
        print(x, flush=True); super().append(x)
notes = N()

OVERLAP_JS = r"""(() => {
  const SEL = 'button, a, input, textarea, h1, h2, h3, .pill, .chip3d, .node, .start-tip, .path-mascot, .npop, .smart-card, .ubanner, .opt, .tile, .bchip, .blank, .hubtile, .qbtn, .fstat, .wchip, .dialm, .hearts, .pbar, .peek, .sx, .qlabel, .bkr, .wl-row, .navbtn, .quest, .badge, .item, .gitem, .lcard, .task, .catrow, .skrow, .strow, .pair, .fin-dial, .bktools, .bankbar, .modal, .popup, .toast, .ring, .qprompt, .slot, .hwbox, .sc-dial';
  const vis = e => { const r = e.getBoundingClientRect(); if (r.width < 2 || r.height < 2) return false; const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || +cs.opacity === 0 || cs.display === 'none') return false; if (r.bottom < 0 || r.top > innerHeight) return false; return true; };
  const els = [...document.querySelectorAll(SEL)].filter(e => vis(e) && !e.closest('.bobo,.popup,.toast,#confetti,#stamp,.combo-burst,.pfly,.heart-drop'));
  const out = [];
  const name = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + '.' + [...e.classList].slice(0, 2).join('.') + ' "' + (e.textContent || '').trim().slice(0, 18) + '"';
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
    const a = els[i], b = els[j];
    if (a.contains(b) || b.contains(a)) continue;
    const clip = e => { let r = e.getBoundingClientRect(); r = {left: r.left, top: r.top, right: r.right, bottom: r.bottom};
      for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.overflowY !== 'visible' || cs.overflowX !== 'visible') { const q = n.getBoundingClientRect(); r = {left: Math.max(r.left, q.left), top: Math.max(r.top, q.top), right: Math.min(r.right, q.right), bottom: Math.min(r.bottom, q.bottom)}; } }
      return r; };
    const ra = clip(a), rb = clip(b);
    if (ra.right - ra.left < 2 || ra.bottom - ra.top < 2 || rb.right - rb.left < 2 || rb.bottom - rb.top < 2) continue;
    const w = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left), h = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
    if (w > 3 && h > 3 && w * h > 30) {
      // fixed/sticky layers over scrolled content are expected
      const layered = x => { for (let n = x; n; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === 'fixed' || p === 'sticky') return n; } return null; };
      const la = layered(a), lb = layered(b);
      if ((la || lb) && la !== lb) continue;
      out.push(name(a) + ' X ' + name(b) + ' ' + Math.round(w) + 'x' + Math.round(h));
    }
  }
  return out.slice(0, 12);
})()"""

async def check(p, tag):
    ov = await p.evaluate("document.documentElement.scrollWidth > window.innerWidth + 1")
    if ov:
        wide = await p.evaluate("""[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,4).map(e=>e.tagName+'.'+e.className+' '+Math.round(e.getBoundingClientRect().right))""")
        errors.append(f'{tag} horizontal overflow: {wide}')
    o = await p.evaluate(OVERLAP_JS)
    if o: errors.append(f'{tag} overlaps: {o}')

async def main():
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        # ---------- behaviour at phone size
        if not os.environ.get('SWEEP_ONLY'):
            ctx = await b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
            p = await ctx.new_page()
            p.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
            p.on('console', lambda m: errors.append(f'console: {m.text}') if m.type == 'error' and 'fonts' not in m.text and 'ERR_FAILED' not in m.text else None)
            await p.route('**/*', tg['route'])
            await p.goto(tg['URL']); await p.wait_for_timeout(800)
            await tg['clear_modals'](p)
            d0 = await p.evaluate("S.dial")
            # 1) words node, all correct -> dial up, stages up
            await p.evaluate("startNode(NODES.find(n=>n.id==='L1-0'))"); await p.wait_for_timeout(400)
            r, k = await tg['drive'](p, True, n=60)
            await p.wait_for_timeout(1800); await tg['clear_modals'](p)
            st = await p.evaluate("({dial:S.dial, stages: lessonWordsOf('L1').slice(0,12).map(w=>w.h+':'+stageOf(w.k)), wm: Object.keys(S.wm).length})")
            notes.append(f'L1 words all-correct: {r} {k} dial {d0}->{st["dial"]} {st["stages"]} wm={st["wm"]}')
            await p.screenshot(path=f'{SHOTS}/finish_progress.png');
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(400)
            # 2) a few more rounds to raise stages, record which question types appear
            qtypes = {}
            for rnd in range(4):
                await p.evaluate("startNode(NODES.find(n=>n.id==='L1-0'))"); await p.wait_for_timeout(300)
                for step in range(40):
                    await p.wait_for_timeout(80)
                    if await p.locator('.finish').count(): break
                    if await p.locator('.modal').count(): await tg['clear_modals'](p); continue
                    qt = await p.evaluate("RUN && RUN.cur ? (RUN.cur.qt || RUN.cur.kind) : null")
                    if qt: qtypes[qt] = qtypes.get(qt, 0) + 1
                    if qt == 'cloze' and 'cloze' not in notes[-1]:
                        await p.screenshot(path=f'{SHOTS}/q_cloze.png')
                    if qt in ('read', 'pick', 'fix', 'build', 'hearS') and not os.path.exists(f'{SHOTS}/q_{qt}.png'):
                        await p.screenshot(path=f'{SHOTS}/q_{qt}.png')
                    await check(p, f'[390 session {qt}]')
                    await tg['drive'](p, True, n=1)
                await p.wait_for_timeout(1700); await tg['clear_modals'](p)
                if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            st = await p.evaluate("({dial:S.dial, dl: dialLv(), stages: lessonWordsOf('L1').slice(0,12).map(w=>w.h+':'+stageOf(w.k))})")
            notes.append(f'after 4 more rounds: qtypes={qtypes} dial={st["dial"]} lv={st["dl"]} {st["stages"]}')
            # 3) wrong answers -> dial down, retry appears
            await p.evaluate("startNode(NODES.find(n=>n.id==='L2-0'))"); await p.wait_for_timeout(300)
            again = 0; seen_again_shot = False
            for step in range(30):
                await p.wait_for_timeout(80)
                if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
                if await p.locator('.newbadge.again').count():
                    again += 1
                    if not seen_again_shot: seen_again_shot = True; await p.screenshot(path=f'{SHOTS}/q_again.png')
                if await p.locator('.dialm.down').count() and not os.path.exists(f'{SHOTS}/dial_down.png'): await p.screenshot(path=f'{SHOTS}/dial_down.png')
                isTeach = await p.evaluate("RUN && RUN.cur ? RUN.cur.kind === 'teach' : false")
                wrongCount = locals().get('wrongCount', 0)
                if not isTeach: wrongCount += 1
                await tg['drive'](p, isTeach or wrongCount % 2 == 0, n=1)
            notes.append(f'mixed run: again-shown={again} dial={await p.evaluate("S.dial")} conf={await p.evaluate("Object.keys(S.conf).length")}')
            await p.evaluate("go('learn')"); await p.wait_for_timeout(500)
            # 4) teacher test practice: hints, word list, long-press, later
            await p.evaluate("runQuiz({ title: 'Teacher-style test', mock: true, type: 'teacher', qs: teacherTest(), back: () => go('test') })"); await p.wait_for_timeout(500)
            for step in range(30):
                kind = await p.evaluate("RUN && RUN.cur ? RUN.cur.kind : null")
                if kind == 'bank': break
                if await p.locator('#later').count() and step == 0:
                    before = await p.evaluate("RUN.cur.label"); await p.locator('#later').click(); await p.wait_for_timeout(200)
                    notes.append(f'later moved: {before!r} -> now {await p.evaluate("RUN.cur.label")!r}')
                    continue
                await tg['drive'](p, True, n=1)
            await p.wait_for_timeout(300)
            chips = await p.evaluate("[...document.querySelectorAll('.bchip')].map(c=>c.className.replace('bchip ','')+':'+c.innerText.replace(/\\n/g,'/'))")
            notes.append(f'bank chips (smart): {chips}')
            await p.screenshot(path=f'{SHOTS}/bank_smart.png')
            await check(p, '[390 bank]')
            await p.locator('[data-hm="all"]').click(); await p.wait_for_timeout(200)
            await p.screenshot(path=f'{SHOTS}/bank_all.png')
            await check(p, '[390 bank all]')
            await p.locator('#bkwords').click(); await p.wait_for_timeout(400)
            await p.screenshot(path=f'{SHOTS}/bank_wordlist.png')
            await check(p, '[390 wordlist]')
            await tg['clear_modals'](p)
            box = await p.locator('.bchip').nth(1).bounding_box()
            await p.mouse.move(box['x'] + 10, box['y'] + 10); await p.mouse.down(); await p.wait_for_timeout(650); await p.mouse.up(); await p.wait_for_timeout(300)
            notes.append(f'long-press pop: {await p.locator(".pop").count()} filled-after-longpress: {await p.evaluate("document.querySelectorAll(\'.blank.filled\').length")}')
            await p.screenshot(path=f'{SHOTS}/bank_longpress.png')
            if await p.locator('.popx').count(): await p.locator('.popx').click(); await p.wait_for_timeout(150)
            await p.locator('[data-hm="smart"]').click()
            ans = await p.evaluate("RUN.cur.ans.map(a=>RUN.cur.bank.indexOf(a[0]))")
            for kk, bi in enumerate(ans):
                await p.locator(f'.blank[data-b="{kk}"]').click(); await p.locator(f'.bchip[data-i="{bi if kk % 2 else (bi + 1) % len(ans)}"]').click()
            await p.locator('#cta').click(); await p.wait_for_timeout(500)
            await p.screenshot(path=f'{SHOTS}/bank_review.png')
            await check(p, '[390 bank review]')
            await p.locator('#cta').click(); await p.wait_for_timeout(300)
            # order with tile hints
            for step in range(30):
                kind = await p.evaluate("RUN && RUN.cur ? RUN.cur.kind : null")
                if kind == 'order': break
                await tg['drive'](p, True, n=1)
            await p.screenshot(path=f'{SHOTS}/order_hints.png'); await check(p, '[390 order]')
            r, k = await tg['drive'](p, True, n=80); await p.wait_for_timeout(1800); await tg['clear_modals'](p)
            notes.append(f'teacher test finished: {r}')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            # 5) smart review from the learn card
            await p.evaluate("go('learn')"); await p.wait_for_timeout(500)
            notes.append(f'smart card: {await p.locator("#smartGo").count()}')
            await p.screenshot(path=f'{SHOTS}/learn_smart.png'); await check(p, '[390 learn]')
            await p.locator('#smartGo').click(); await p.wait_for_timeout(400)
            r, k = await tg['drive'](p, True, n=40); await p.wait_for_timeout(1800); await tg['clear_modals'](p)
            notes.append(f'smart review: {r} {k}')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            await p.evaluate("go('me',{tab:'stats'})"); await p.wait_for_timeout(500)
            await p.screenshot(path=f'{SHOTS}/me_stats.png', full_page=True); await check(p, '[390 me stats]')
            state = await p.evaluate("JSON.stringify(S).length")
            notes.append(f'state size {state} bytes')
            saved = await p.evaluate("localStorage.getItem('hanzi-sprint-v1').length")
            notes.append(f'localStorage saved {saved}')
            await ctx.close()
        # ---------- layout sweep across sizes
        for vp in [(320, 640), (360, 740), (390, 844), (768, 1024), (1024, 768), (1366, 900), (1920, 1080)]:
            ctx = await b.new_context(viewport={'width': vp[0], 'height': vp[1]})
            p = await ctx.new_page(); p.on('pageerror', lambda e: errors.append(f'pageerror {vp}: {e}'))
            await p.route('**/*', tg['route']); await p.goto(tg['URL']); await p.wait_for_timeout(700)
            await p.evaluate("S.seenIntro=true; WL.slice(0,120).forEach((w,i)=>{S.cards[w.k]=[i%5,Date.now()-1000,3,i%3]; S.wm[w.k]=[.6,.4,.3,.3,.2,.1]}); S.conf[WL[3].k]={[WL[5].k]:2}; S.look[WL[7].k]=1; S.path['L0-0']=1; S.path['L0-1']=1; save(); go('learn')")
            await tg['clear_modals'](p); await p.wait_for_timeout(400)
            tag = f'[{vp[0]}]'
            for v, prm in [('learn', '{}'), ('practice', '{}'), ('write', '{}'), ('test', '{}'), ('me', "{tab:'quests'}"), ('me', "{tab:'badges'}"), ('me', "{tab:'ward'}"), ('me', "{tab:'plan'}"), ('me', "{tab:'stats'}"), ('me', "{tab:'save'}"), ('lessons', '{}'), ('cards', '{}'), ('grammar', '{}'), ('drills', '{}')]:
                await p.evaluate(f"go('{v}',{prm})"); await p.wait_for_timeout(450)
                await check(p, f'{tag} {v}{prm}')
            # node popover open
            await p.evaluate("go('learn')"); await p.wait_for_timeout(400)
            await p.locator('.node.current').click(); await p.wait_for_timeout(300); await check(p, f'{tag} npop')
            if vp[0] in (320, 1366): await p.screenshot(path=f'{SHOTS}/sweep_{vp[0]}_learn.png')
            # sessions
            await p.evaluate("startNode(NODES.find(n=>n.id==='L3-7'))"); await p.wait_for_timeout(500)
            for step in range(14):
                if await p.locator('.finish').count(): break
                await check(p, f'{tag} check-node q{step}')
                await tg['drive'](p, step % 4 != 1, n=1)
                await check(p, f'{tag} check-node sheet{step}')
                if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue': await p.locator('#cta').click()
            await p.wait_for_timeout(1600); await tg['clear_modals'](p)
            if await p.locator('.finish').count(): await check(p, f'{tag} finish')
            if await p.locator('#fin-go').count(): await p.locator('#fin-go').click(); await p.wait_for_timeout(300)
            for nid, steps in [('L2-3', 6), ('L4-6', 4), ('L2-0', 6)]:
                await p.evaluate(f"startNode(NODES.find(n=>n.id==='{nid}'))"); await p.wait_for_timeout(500)
                for step in range(steps):
                    if await p.locator('.finish').count() or not await p.locator('.sess').count(): break
                    await check(p, f'{tag} {nid} q{step}')
                    await tg['drive'](p, step % 3 != 1, n=1)
                    await check(p, f'{tag} {nid} after{step}')
                    if await p.locator('#cta').count() and (await p.locator('#cta').inner_text()).strip().lower() == 'continue': await p.locator('#cta').click()
                await p.evaluate("go('learn')"); await p.wait_for_timeout(300)
            await p.evaluate("runQuiz({ title: 'Teacher-style test', mock: true, type: 'teacher', qs: teacherTest(), back: () => go('test') })"); await p.wait_for_timeout(500)
            for step in range(12):
                if await p.locator('.finish').count(): break
                kind = await p.evaluate("RUN && RUN.cur ? RUN.cur.kind : null")
                await check(p, f'{tag} teacher q{step} {kind}')
                if kind == 'bank' and vp[0] in (320, 768, 1366) and not os.path.exists(f'{SHOTS}/sweep_{vp[0]}_bank.png'):
                    await p.screenshot(path=f'{SHOTS}/sweep_{vp[0]}_bank.png')
                    await p.locator('#bkwords').click(); await p.wait_for_timeout(300); await check(p, f'{tag} wordlist'); await tg['clear_modals'](p)
                await tg['drive'](p, step % 2 == 0, n=1)
                if kind == 'bank' and vp[0] in (320, 1366) and not os.path.exists(f'{SHOTS}/sweep_{vp[0]}_bankrev.png'):
                    pass
            await p.evaluate("go('learn')"); await p.wait_for_timeout(300)
            for js in ["openChest(20); 0", "levelUp(4); 0", "welcome(); 0", "$('#ltQuests') ? $('#ltQuests').click() : 0"]:
                await p.evaluate("S.seenIntro=false") if 'welcome' in js else None
                await p.evaluate(js); await p.wait_for_timeout(500)
                await check(p, f'{tag} modal {js[:12]}')
                await tg['clear_modals'](p); await p.wait_for_timeout(200)
            await p.evaluate("S.seenIntro=true; startSmart()"); await p.wait_for_timeout(400)
            for step in range(5):
                await check(p, f'{tag} smart q{step}'); await tg['drive'](p, True, n=1)
            if vp[0] in (320, 1366): await p.screenshot(path=f'{SHOTS}/sweep_{vp[0]}_finish.png')
            await ctx.close()
        await b.close()
    print('ERRORS', len(errors)); print('\n'.join(errors[:60]))
    if errors: raise SystemExit(1)
asyncio.run(main())
