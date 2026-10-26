/* ============================================================ TODAY */
function ringSVG(pct, size = 118, stroke = 11, color = 'var(--jade)') {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" style="fill:none;stroke:var(--page-2)" stroke-width="${stroke}"/>
    <circle class="ringv" cx="${size / 2}" cy="${size / 2}" r="${r}" style="fill:none;stroke:${color};transition:stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-off="${c * (1 - pct / 100)}"/></svg>`;
}
function animateRings(el) { requestAnimationFrame(() => requestAnimationFrame(() => $$('.ringv', el).forEach(r => r.style.strokeDashoffset = r.dataset.off))); }
function planDay() { return clamp(dayDiff(S.start, today()) + 1, 1, 3); }
function vToday(el) {
  const d = daysLeft(), R = readiness();
  const pd = S.ui.pday || planDay();
  const lw = lessonWords();
  const dueN = WL.filter(w => due(w.k)).length;
  const goal = 300, dxp = S.day.date === today() ? S.day.xp : 0;
  const best = S.mocks.length ? Math.max(...S.mocks.map(m => m.pct)) : null;
  el.innerHTML = `<div class="stack">
  <div class="hero">
    <div class="count">
      <span class="eyebrow" style="color:inherit;opacity:.85">Chinese test · Units 1–6</span>
      <div class="row" style="align-items:flex-end;gap:16px;flex-wrap:nowrap"><span class="big nums">${d < 0 ? '✓' : d}</span>
        <span class="lbl">${d < 0 ? 'Test day has passed' : d === 0 ? 'Test is today — 加油!' : (d === 1 ? 'day' : 'days') + ' until your test'}<br>
        <span style="font-weight:500;opacity:.85;font-size:.92rem">Day ${planDay()} of your 3-day plan</span></span></div>
      <label class="row small" style="gap:8px;margin-top:4px">Test date <input type="date" id="tdate" value="${S.testDate}" aria-label="Test date"></label>
      <span class="ghost-han" aria-hidden="true">考</span>
    </div>
    <div class="page pad ready">
      <div class="ring">${ringSVG(R.pct)}<div class="val nums">${R.pct}%<small>ready</small></div></div>
      <div class="statgrid">
        <div class="stat"><b class="nums">${lw.filter(w => known(w.k)).length}/${lw.length}</b><span>lesson words known</span></div>
        <div class="stat"><b class="nums">${deckWords('T1').filter(w => seen(w.k)).length + deckWords('T2').filter(w => seen(w.k)).length}/${deckWords('T1').length + deckWords('T2').length}</b><span>vocab-table words seen</span></div>
        <div class="stat"><b class="nums">${coreG().filter(g => (S.gd[g] || 0) >= 2).length}/${coreG().length}</b><span>grammar points practiced</span></div>
        <div class="stat"><b class="nums">${best === null ? '—' : best + '%'}</b><span>best mock test</span></div>
      </div>
    </div>
  </div>
  <div class="quick">
    <button class="qbtn" data-go="cards" data-p='{"deck":"LALL"}'><span class="qh">複習</span><b>Review cards</b><span>${dueN ? dueN + ' due now' : 'Nothing due — learn new words'}</span></button>
    <button class="qbtn" data-go="cards" data-p='{"deck":"T1","mode":"speed"}'><span class="qh">快選</span><b>Speed sweep</b><span>4-choice rounds through the vocab table</span></button>
    <button class="qbtn" data-go="write" data-p='{"mode":"dict"}'><span class="qh">聽寫</span><b>Dictation</b><span>Hear it, write it from memory</span></button>
    <button class="qbtn" data-go="test"><span class="qh">考試</span><b>Practice tests</b><span>Your teacher's format, plus a redo of the last test</span></button>
  </div>
  <section class="page pad">
    <div class="sec-head"><div><span class="eyebrow">Study plan</span><h2>Three days, one step at a time</h2></div>
      <div style="min-width:200px;flex:0 1 260px"><div class="row small" style="justify-content:space-between"><span class="muted">Today's XP</span><b class="nums">${dxp} / ${goal}</b></div><div class="bar gold"><i style="width:${Math.min(100, dxp / goal * 100)}%"></i></div></div></div>
    <div class="daytabs">${[1, 2, 3].map(n => { const items = PLAN.filter(t => t.day === n); const dn = items.filter(taskDone).length; return `<button class="daytab" data-day="${n}" aria-pressed="${n === pd}"><b>Day ${n}${n === planDay() ? ' · today' : ''}</b><span>${['', 'Intro, Lessons 1–2', 'Lessons 3–5', 'Lesson 6 + mock tests'][n]} · ${dn}/${items.length}</span></button>`; }).join('')}</div>
    <div class="plan">${PLAN.filter(t => t.day === pd).map(t => {
      const done = taskDone(t); const m = t.m ? t.m() : null;
      return `<div class="task ${done ? 'done' : ''}"><button class="tick" data-tick="${t.id}" aria-label="Mark done" aria-pressed="${done}">${IC.check}</button>
        <div style="min-width:0"><div class="task-t">${esc(t.t)}</div><div class="task-d">${esc(t.d)}</div>${m ? `<div class="row small faint nums" style="gap:8px;margin-top:4px"><div class="bar" style="flex:1;margin:0"><i style="width:${m[1] ? Math.min(100, m[0] / m[1] * 100) : 0}%"></i></div>${m[0]}/${m[1]}</div>` : ''}</div>
        ${t.go ? `<button class="btn sm ${done ? 'ghost' : 'primary'}" data-go="${t.go[0]}" data-p='${JSON.stringify(t.go[1])}'>${done ? 'Again' : 'Start'}</button>` : '<span></span>'}</div>`; }).join('')}</div>
  </section>
  <section class="page pad">
    <div class="sec-head"><div><span class="eyebrow">Why this works</span><h2>How this site helps you remember</h2></div></div>
    <div class="methods">
      <div class="method"><b>Test yourself, don't reread</b><p>Every card and drill makes you answer before you see it. Pulling a word out of memory is what makes it stick.</p></div>
      <div class="method"><b>Spaced repetition</b><p>Words you miss come back in 1 minute; words you know wait hours. You spend time only on what you don't know yet.</p></div>
      <div class="method"><b>Write to remember</b><p>Stroke order plus writing from memory builds the shape in your hand, which is exactly what a written test asks.</p></div>
      <div class="method"><b>Break characters into parts</b><p>好 = 女 woman + 子 child. Learn the radicals and every new character is a combination of pieces you know.</p></div>
      <div class="method"><b>Listen and shadow</b><p>Play each dialogue line and repeat it out loud. You learn tones, word order and vocabulary at the same time.</p></div>
      <div class="method"><b>Mix it up, then mock</b><p>Drills mix lessons and question types so you can't rely on context. Mock tests show exactly where to focus next.</p></div>
    </div>
  </section>
  </div>`;
  animateRings(el);
  $('#tdate', el).onchange = e => { if (e.target.value) { S.testDate = e.target.value; save(); hud(); go('today'); } };
  $$('.daytab', el).forEach(b => b.onclick = () => { S.ui.pday = +b.dataset.day; saveLocal(); go('today'); });
  $$('[data-tick]', el).forEach(b => b.onclick = () => { const id = b.dataset.tick; S.plan[id] = !S.plan[id]; if (S.plan[id]) { addXP(15); sfx('ok'); } save(); go('today'); });
}

/* ============================================================ LESSONS */
const SPK = { '中明': 'n1', '友美': 'n0', '宜文': 'n2', '媽媽': 'n3', '國安': 'n3', A: 'n1', B: 'n2' };
function vLessons(el, p) {
  const lid = p.l || S.ui.lesson || 'L1';
  const tab = p.tab || 'text';
  S.ui.lesson = lid; saveLocal();
  const list = LES.map(l => { const ws = l.words; const pct = Math.round(ws.filter(k => known(k)).length / ws.length * 100);
    return `<button class="lcard" data-l="${l.id}" aria-pressed="${l.id === lid}"><span class="mini-ring">${ringSVG(pct, 40, 5)}</span><span><span class="num">${l.num}</span><span class="nm">${esc(l.name)}</span><span class="tiny faint">${l.words.length} words · ${pct}% known</span></span></button>`; }).join('') +
    `<button class="lcard" data-l="MY" aria-pressed="${lid === 'MY'}"><span class="mini-ring">${ringSVG(0, 40, 5, 'var(--seal)')}</span><span><span class="num">我的</span><span class="nm">我的生詞</span><span class="tiny faint">Add your own words</span></span></button>`;
  el.innerHTML = `<div class="lesson-list">${list}</div><div id="lbody"></div>`;
  $$('.lcard', el).forEach(b => b.onclick = () => go('lessons', { l: b.dataset.l }));
  animateRings(el);
  if (lid === 'MY' || lid === 'B') return unitsPanel($('#lbody', el));
  const L = LMAP[lid];
  const tabs = [['text', '課文 Texts'], ['words', '生詞 Words'], ['grammar', '語法 Grammar'], ['quiz', '小考 Quiz']];
  const body = $('#lbody', el);
  body.innerHTML = `<section class="page pad">
    <div class="lhead"><div><span class="eyebrow">${L.num} · ${esc(L.src)}</span><div class="han-title">${esc(L.name)}</div><div class="muted">${esc(L.en)}</div></div>
      <div class="row"><button class="btn" id="studyW">${IC.cards}Study these words</button></div></div>
    <div class="tabs" style="margin-top:16px">${tabs.map(([k, l]) => `<button class="chip" data-tab="${k}" aria-pressed="${k === tab}">${l}</button>`).join('')}</div>
    <div id="ltab"></div></section>`;
  $('#studyW', body).onclick = () => go('cards', { deck: lid });
  $$('[data-tab]', body).forEach(b => b.onclick = () => go('lessons', { l: lid, tab: b.dataset.tab }));
  const T = $('#ltab', body);
  if (tab === 'text') {
    T.innerHTML = `<div class="row" style="margin-bottom:10px"><span class="small muted">Tap any word for its meaning. Use the play buttons, then say each line yourself.</span>
      <label class="row small" style="margin-left:auto;gap:6px"><input type="checkbox" id="shadow" ${S.set.shadow ? 'checked' : ''}> Pause after each line (shadowing)</label></div>` +
      L.texts.map((tx, ti) => `<div class="text-block"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h3>${esc(tx.title)}</h3>
        <button class="btn sm" data-playall="${ti}">${IC.play}Play all</button></div>${tx.note ? `<p class="tiny faint" style="margin-bottom:6px">${esc(tx.note)}</p>` : ''}
        <div class="dialog">${tx.lines.map(([sp, toks, en], li) => `<div class="line" data-t="${ti}" data-li="${li}"><div class="who ${SPK[sp] || ''}">${esc(sp)}</div>
          <div style="min-width:0"><div class="zh">${ruby(toks)}</div><div class="en">${esc(en)}</div></div>
          <button class="playbtn" data-line="${ti}:${li}" aria-label="Play line">${IC.sound}</button></div>`).join('')}</div></div>`).join('') +
      (lid === 'L1' || lid === 'L0' ? peopleBlock() : '');
    $('#shadow', T).onchange = e => { S.set.shadow = e.target.checked; save(); };
    $$('[data-line]', T).forEach(b => b.onclick = () => { const [ti, li] = b.dataset.line.split(':').map(Number); playLines(L, ti, li, li); });
    $$('[data-playall]', T).forEach(b => b.onclick = () => { const ti = +b.dataset.playall; playLines(L, ti, 0, L.texts[ti].lines.length - 1); });
    $$('.line .en', T).forEach(e => e.onclick = () => e.classList.toggle('peek'));
  } else if (tab === 'words') {
    const ws = L.words.map(k => W[k]);
    T.innerHTML = `<p class="small muted" style="margin-bottom:12px">${ws.length} words from ${/^L[01236]$/.test(lid) ? 'your class slides and the book\'s word list' : 'the book\'s word list for this lesson'}. Dot color: <span class="dot s1"></span> learning <span class="dot s2"></span> known <span class="dot s3"></span> solid. Tap a word to hear it.</p>
      <div class="wordgrid">${ws.map(w => `<button class="wtile" data-w="${esc(w.k)}">${w.em ? `<span class="em">${w.em}</span>` : ''}<span class="wh">${esc(w.h)}</span><span class="wp">${esc(phon(w.p))}</span><span class="we">${esc(w.e)}</span>${statusDot(w.k).replace('class="dot', 'style="display:block" class="dot')}</button>`).join('')}</div>`;
    $$('.wtile', T).forEach(b => b.onclick = e => { e.stopPropagation(); wordPop(W[b.dataset.w].h, b); });
  } else if (tab === 'grammar') {
    T.innerHTML = `<div class="stack" style="gap:8px">${L.grammar.map(g => gItem(g)).join('')}</div>`;
    $$('.gitem', T).forEach(b => b.onclick = () => go('grammar', { g: b.dataset.g }));
  } else {
    T.innerHTML = `<div class="stack" style="align-items:flex-start"><p class="muted">A short mixed quiz on this lesson: words, grammar, sentence order${L.texts.length ? ' and reading' : ''}. About 12 questions.</p>
      <button class="btn primary big" id="lq">${IC.play}Start the ${esc(L.num)} quiz</button></div>`;
    $('#lq', T).onclick = () => runQuiz({ title: L.num + ' quiz', qs: lessonQuiz(lid), back: () => go('lessons', { l: lid, tab: 'quiz' }) });
  }
}
function peopleBlock() { return `<div class="text-block"><h3 style="margin-bottom:8px">Who's who</h3><div class="grid2">${DATA.people.map(p => `<div class="row" style="gap:12px;flex-wrap:nowrap"><span class="han" style="font-size:1.4rem;white-space:nowrap">${esc(p[0])}</span><span class="small"><b>${esc(p[1])}</b><br><span class="muted">${esc(p[2])}</span></span></div>`).join('')}</div></div>`; }
async function playLines(L, ti, from, to) {
  const lines = L.texts[ti].lines;
  stopSpeak(); const myTok = speakToken;
  for (let i = from; i <= to; i++) {
    const row = $(`.line[data-t="${ti}"][data-li="${i}"]`); if (!row) return;
    $$('.line.playing').forEach(r => r.classList.remove('playing')); row.classList.add('playing');
    row.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const ok = await speak(plainZh(lines[i][1]));
    if (speakToken !== myTok + 1 && speakToken !== myTok) { row.classList.remove('playing'); return; }
    if (!ok && speakToken > myTok + 1) return;
    if (S.set.shadow && to > from) await new Promise(r => setTimeout(r, 900 + plainZh(lines[i][1]).length * 380));
  }
  $$('.line.playing').forEach(r => r.classList.remove('playing'));
}
function unitsPanel(body) {
  const my = WL.filter(w => w.lv === 9);
  body.innerHTML = `<section class="page pad stack">
    <div><span class="eyebrow">My words</span><div class="han-title" style="font:2.2rem var(--f-han)">我的生詞</div><div class="muted">Extra words from class, worksheets or your notes</div></div>
    <div class="stack" style="gap:10px"><h3>Add words</h3>
      <p class="small muted">One word per line. Type the characters, then pinyin and meaning if you know them, separated by spaces, commas or tabs. Words already in the vocab table fill in by themselves. Example: <span class="han">游泳 yóuyǒng to swim</span></p>
      <textarea class="input" id="imp" rows="5" placeholder="游泳 yóuyǒng to swim&#10;週末&#10;運動, yùndòng, sports"></textarea>
      <div class="row"><button class="btn primary" id="impBtn">${IC.plus}Add to “My words”</button><span class="small muted" id="impMsg">${my.length ? my.length + ' words in My words.' : ''}</span>
      ${my.length ? `<button class="btn ghost sm" data-go="cards" data-p='{"deck":"MY"}' style="margin-left:auto">Study My words</button>` : ''}</div>
      ${my.length ? `<div class="wordgrid">${my.map(w => `<div class="wtile"><span class="wh">${esc(w.h)}</span><span class="wp">${esc(phon(w.p))}</span><span class="we">${esc(w.e)}</span></div>`).join('')}</div>` : ''}
    </div></section>`;
  $$('.gitem', body).forEach(b => b.onclick = () => go('grammar', { g: b.dataset.g }));
  $('#impBtn', body).onclick = () => {
    const lines = $('#imp', body).value.split(/\n+/).map(s => s.trim()).filter(Boolean);
    let added = 0;
    lines.forEach(line => {
      const m = line.match(/^([一-鿿]+)[\s,，、|\t]*(.*)$/); if (!m) return;
      const h = m[1]; let rest = m[2].trim();
      let p = '', e = '';
      if (rest) {
        const parts = rest.split(/[,，|\t]+/).map(s => s.trim()).filter(Boolean);
        if (parts.length >= 2) { p = parts[0]; e = parts.slice(1).join(', '); }
        else { const toks = rest.split(/\s+/); const pyT = []; while (toks.length && /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/.test(toks[0])) pyT.push(toks.shift()); p = pyT.join(' '); e = toks.join(' '); }
      }
      const ex = H2W[h];
      if (ex) { p = p || ex.p; e = e || ex.e; }
      if (S.custom.some(c => c[0] === h)) return;
      S.custom.push([h, p, e]); added++;
    });
    loadCustom(); save();
    toast(added ? `Added ${added} word${added > 1 ? 's' : ''} to My words` : 'No new words found — start each line with Chinese characters');
    go('lessons', { l: 'MY' });
  };
}
function gItem(g) {
  const n = Math.min(4, S.gd[g] || 0);
  return `<button class="gitem" data-g="${g}"><div style="min-width:0"><div class="gt">${esc(G[g].t)}</div><div class="gp">${esc(G[g].p)}</div></div><span class="pips" aria-label="${n} of 4">${[0, 1, 2, 3].map(i => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span></button>`;
}

/* ============================================================ GRAMMAR */
function vGrammar(el, p) {
  const gid = p.g || S.ui.g || 'g_shi';
  S.ui.g = gid; saveLocal();
  const groups = [['L0', '預備', 'Intro'], ['L1', '第一課', 'Lesson 1'], ['L2', '第二課', 'Lesson 2'], ['L3', '第三課', 'Lesson 3'], ['L4', '第四課', 'Lesson 4'], ['L5', '第五課', 'Lesson 5'], ['L6', '第六課', 'Lesson 6'], ['B', '之後', 'Later lessons (in the vocab table)']];
  const seenG = new Set();
  const listHTML = groups.map(([id, zh, en]) => {
    const gs = (id === 'B' ? Object.keys(G).filter(g => G[g].later) : LMAP[id].grammar).filter(g => !seenG.has(g));
    gs.forEach(g => seenG.add(g));
    if (!gs.length) return '';
    return `<h3><span class="han">${zh}</span><span class="small faint">${en}</span></h3>` + gs.map(g => gItem(g).replace('class="gitem"', `class="gitem" aria-current="${g === gid}"`)).join('');
  }).join('');
  const g = G[gid];
  const drills = DRILLS.filter(d => d.g === gid);
  el.innerHTML = `<div class="gwrap">
    <div class="glist page pad" id="glist"><div class="row" style="justify-content:space-between"><h2>語法 Grammar</h2>
      <button class="btn sm" id="gmix">${IC.bolt}Mixed practice</button></div>${listHTML}</div>
    <article class="page pad stack" id="gdetail">
      <div><span class="eyebrow">${g.later ? 'Later lessons · in the vocab table' : (LNAME[g.L] || '') + ' · ' + (LEN[g.L] || '')}</span><h1 style="margin-top:6px">${esc(g.t)}</h1></div>
      <div class="pattern">${esc(g.p)}</div>
      <p style="max-width:65ch">${esc(g.x)}</p>
      <div><h3 style="margin-bottom:6px">Examples</h3>${g.ex.map(([toks, en]) => `<div class="ex"><div class="zh">${ruby(toks)}</div><button class="playbtn" style="margin-top:6px" data-say="${esc(plainZh(toks))}" aria-label="Play">${IC.sound}</button><div class="en">${esc(en)}</div></div>`).join('')}</div>
      ${g.wr.length ? `<div><h3 style="margin-bottom:8px">Common mistakes</h3><div class="stack" style="gap:8px">${g.wr.map(([b, r, why]) => `<div class="mistake"><div><span class="mark x">✗</span><span class="bad">${esc(b)}</span></div><div><span class="mark o">✓</span><span class="good">${esc(r)}</span></div><div class="why">${esc(why)}</div></div>`).join('')}</div></div>` : ''}
      ${g.tip ? `<div class="note"><b>Tip:</b> ${esc(g.tip)}</div>` : ''}
      <div class="row">${drills.length ? `<button class="btn primary" id="gprac">${IC.play}Practice this (${drills.length})</button>` : ''}
        <button class="btn" id="gask" ${SAMPLE ? '' : 'hidden'}>${IC.chat}Ask the tutor</button>
        <span class="small muted">${S.gd[gid] ? S.gd[gid] + ' correct so far' : 'Not practiced yet'}</span></div>
    </article></div>`;
  $$('.gitem', el).forEach(b => b.onclick = () => { go('grammar', { g: b.dataset.g }); if (innerWidth < 1040) setTimeout(() => $('#gdetail') && $('#gdetail').scrollIntoView({ behavior: 'smooth' }), 60); });
  if ($('#gprac', el)) $('#gprac', el).onclick = () => runQuiz({ title: g.t, qs: shuffle(drills).map(qFromDrill), back: () => go('grammar', { g: gid }) });
  $('#gmix', el).onclick = () => runQuiz({ title: 'Mixed grammar', qs: sampleN(DRILLS.filter(d => !G[d.g].later), 15).map(qFromDrill), back: () => go('grammar', { g: gid }) });
  $('#gask', el).onclick = () => openTutor(`Explain the grammar point "${g.t}" (${g.p}) for me in simple words, with 3 new example sentences and one common mistake.`);
}

/* ============================================================ CARDS */
function vCards(el, p) {
  const deck = p.deck || S.ui.deck || 'L1';
  const mode = p.mode || S.ui.cmode || 'flip';
  S.ui.deck = deck; S.ui.cmode = mode; saveLocal();
  const deckList = DECKS.concat(deck === 'LALL' ? [{ id: 'LALL', zh: '全部課文', en: 'All lesson words' }] : []);
  el.innerHTML = `<div class="stack">
    <div class="sec-head"><div><span class="eyebrow">生詞 · Vocabulary</span><h1>Learn the words</h1></div>
      <div class="seg" id="cmode" style="min-width:min(100%,430px)">${[['flip', '翻卡 Flip'], ['speed', '快選 Speed'], ['listen', '聽 Listen'], ['list', '詞表 List']].map(([v, l]) => `<button data-v="${v}" aria-pressed="${v === mode}">${l}</button>`).join('')}</div></div>
    <div class="deckbar">${deckList.map(d => { const c = deckCounts(d.id); return `<button class="chip" data-deck="${d.id}" aria-pressed="${d.id === deck}"><span class="han" style="font-size:1.05rem">${d.zh}</span><span class="n nums">${d.id === 'weak' || d.id === 'MY' ? c.total : (c.due ? c.due + ' due' : c.known + '/' + c.total)}</span></button>`; }).join('')}</div>
    <div id="cbody"></div></div>`;
  $$('[data-deck]', el).forEach(b => b.onclick = () => go('cards', { deck: b.dataset.deck, mode }));
  $$('#cmode button', el).forEach(b => b.onclick = () => go('cards', { deck, mode: b.dataset.v }));
  const body = $('#cbody', el);
  const words = deckWords(deck);
  if (!words.length) { body.innerHTML = `<div class="page empty">${deck === 'weak' ? 'No weak words yet. Words you get wrong anywhere on the site show up here.' : deck === 'MY' ? 'No words yet. Add words from your book on the Lessons → 第四～六課 page.' : 'No words in this deck.'}</div>`; return; }
  if (mode === 'list') return wordList(body, words);
  const c = deckCounts(deck);
  const info = `<div class="row small muted" style="justify-content:center;gap:16px;margin-bottom:6px"><span><b class="nums" style="color:var(--ink)">${c.total}</b> words</span><span><b class="nums" style="color:var(--seal)">${c.due}</b> due</span><span><b class="nums" style="color:var(--pen)">${c.fresh}</b> new</span><span><b class="nums" style="color:var(--jade)">${c.known}</b> known</span></div>`;
  if (mode === 'flip') return flipSession(body, words, info, deck);
  const n = Math.min(words.length, 20);
  body.innerHTML = `${info}<div class="page pad stack" style="align-items:center;text-align:center">
    <div class="han" style="font-size:3rem">${mode === 'speed' ? '快選' : '聽'}</div>
    <p class="muted" style="max-width:52ch">${mode === 'speed' ? 'See a word, pick its meaning from four choices. Fast rounds of 20 — the quickest way through a big list like the vocab table.' : 'Hear a word, pick the characters. Trains your ear and your reading at the same time.'}</p>
    ${mode === 'listen' && !ttsOK() ? '<p class="note">This device has no Chinese voice, so listening rounds will be silent. Try a phone or Chrome.</p>' : ''}
    <div class="row" style="justify-content:center">${mode === 'speed' ? `<div class="seg" id="sdir"><button data-v="h2e" aria-pressed="true">字 → English</button><button data-v="e2h" aria-pressed="false">English → 字</button><button data-v="h2p" aria-pressed="false">字 → pinyin</button></div>` : ''}</div>
    <button class="btn primary big" id="go">${IC.play}Start ${n} words</button></div>`;
  let dir = 'h2e';
  $$('#sdir button', body).forEach(b => b.onclick = () => { dir = b.dataset.v; $$('#sdir button', body).forEach(x => x.setAttribute('aria-pressed', x === b)); });
  $('#go', body).onclick = () => {
    const q = buildQueue(words, 20, 20);
    const pool = words.length >= 8 ? words : WL.filter(w => w.lv !== 9);
    runQuiz({ title: mode === 'speed' ? 'Speed sweep' : 'Listening', fast: mode === 'speed', qs: q.map(w => qVocab(w, mode === 'listen' ? 'listen' : dir, pool)), back: () => go('cards', { deck, mode }) });
  };
}
function exampleFor(w) {
  const all = [];
  LES.forEach(L => L.texts.forEach(t => t.lines.forEach(l => all.push([l[1], l[2]]))));
  Object.values(G).forEach(g => g.ex.forEach(e => all.push(e)));
  SENTS.forEach(s => { if (s.src === 'ex') all.push([s.toks, s.en]); });
  const hit = all.filter(([toks]) => plainZh(toks).includes(w.h));
  const whole = hit.filter(([toks]) => toks.some(t => t[0] === w.h)); // the word itself, not part of a longer word
  return (whole.length ? whole : hit).sort((a, b) => plainZh(a[0]).length - plainZh(b[0]).length)[0] || null;
}
function mnemoHTML(h) {
  const cs = uniq([...h].filter(c => HAN.test(c)));
  const rows = cs.map(c => MN[c] ? `<div class="mn"><span class="c">${c}</span><span class="s"><b>${esc(MN[c][0])}</b><br>${esc(MN[c][1])}</span></div>` : '').join('');
  return rows ? `<div class="minis"><span class="eyebrow">Memory trick</span>${rows}</div>` : '';
}
function flipSession(body, words, info, deck) {
  let q = buildQueue(words, 20), i = 0, flipped = false, done = 0, again = 0;
  const front = S.ui.front || 'h';
  const render = () => {
    if (i >= q.length) {
      sfx('done'); if (done && again / done < .3) { stamp('優'); confetti(); }
      addXP(20);
      body.innerHTML = `<div class="page result"><div class="han" style="font-size:3rem">做得好！</div><div class="score nums">${done}</div><p class="muted">cards reviewed · ${again} to see again soon</p>
        <div class="row" style="justify-content:center"><button class="btn primary" id="more">${IC.redo}Next 20</button><button class="btn" data-go="cards" data-p='${JSON.stringify({ deck, mode: 'speed' })}'>${IC.bolt}Speed quiz these</button><button class="btn" data-go="write" data-p='${JSON.stringify({ deck: /^L\d$/.test(deck) ? deck : 'L1', mode: 'dict' })}'>${IC.write}Dictation</button></div></div>`;
      $('#more', body).onclick = () => go('cards', { deck, mode: 'flip' });
      save(); return;
    }
    const w = q[i]; flipped = false;
    const ex = exampleFor(w);
    const hanBoxes = `<div class="tzg ${w.h.length > 3 ? 'sm' : w.h.length > 2 ? 'md' : ''}">${[...w.h].map(c => `<span><i>${esc(c)}</i></span>`).join('')}</div>`;
    const frontHTML = front === 'h' ? `${hanBoxes}<span class="fhint">What does it mean? Say it out loud, then tap to flip.</span>`
      : `<div style="font-size:3rem">${w.em || ''}</div><div class="bigen">${esc(w.e)}</div><span class="fhint">Write the characters on paper (or in the air), then tap to flip.</span>`;
    body.innerHTML = `${info}<div class="sessbar"><span class="small faint nums">${i + 1}/${q.length}</span><div class="bar"><i style="width:${i / q.length * 100}%"></i></div>
      <button class="btn sm ghost" id="swapF" title="Swap which side shows first">${front === 'h' ? '字 first' : 'English first'}</button></div>
      <div class="flash-wrap"><div class="flash" id="fc" tabindex="0" role="button" aria-label="Flip card">
        <div class="face front">${frontHTML}<div class="row tiny faint" style="position:absolute;bottom:14px">${tagsFor(w)}</div></div>
        <div class="face back"><div class="back-top">${hanBoxes.replace('class="tzg', 'class="tzg sm')}<div class="row" style="justify-content:center"><span class="bigpy">${esc(phon(w.p))}</span><button class="playbtn" style="margin:0" data-say="${esc(w.h)}" aria-label="Play">${IC.sound}</button></div>
          <div class="bigen">${w.em ? w.em + ' ' : ''}${esc(w.e)}</div></div>
          ${ex ? `<div class="exline"><div class="zh">${ruby(ex[0])}</div><div class="small muted">${esc(ex[1])}</div></div>` : ''}
          ${mnemoHTML(w.h)}</div></div></div>
      <div class="grades" id="grades" style="visibility:hidden">
        <button class="g0" data-g="0"><span class="zhg">再一次</span>Again<small>${nextIn(w.k, 0)} <span class="kbd kbdhint">1</span></small></button>
        <button data-g="1"><span class="zhg">有點難</span>Hard<small>${nextIn(w.k, 1)} <span class="kbd kbdhint">2</span></small></button>
        <button data-g="2"><span class="zhg">會了</span>Good<small>${nextIn(w.k, 2)} <span class="kbd kbdhint">3</span></small></button>
        <button class="g3" data-g="3"><span class="zhg">太簡單</span>Easy<small>${nextIn(w.k, 3)} <span class="kbd kbdhint">4</span></small></button></div>
      <p class="tiny faint" style="text-align:center;margin-top:8px"><span class="kbdhint"><span class="kbd">Space</span> flip · <span class="kbd">1</span>–<span class="kbd">4</span> grade</span></p>`;
    const fc = $('#fc', body);
    const flip = () => { flipped = !flipped; fc.classList.toggle('flipped', flipped); sfx('flip'); if (flipped) { $('#grades', body).style.visibility = 'visible'; speak(w.h); } };
    fc.onclick = e => { if (e.target.closest('.tok,[data-say],button')) return; flip(); };
    $('#swapF', body).onclick = () => { S.ui.front = front === 'h' ? 'e' : 'h'; saveLocal(); flipSession(body, words, info, deck); };
    $$('#grades button', body).forEach(b => b.onclick = () => doGrade(+b.dataset.g));
    function doGrade(g) {
      grade(w.k, g); done++;
      if (g === 0) { again++; sfx('no'); if (q.length < 40) q.push(w); } else { sfx('ok'); addXP(g >= 2 ? 5 : 3); }
      i++; save(); render();
    }
    KEYH = e => {
      if (e.target.closest('input,textarea')) return;
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      else if (flipped && '1234'.includes(e.key)) doGrade(+e.key - 1);
    };
  };
  render();
}
function wordList(body, words) {
  body.innerHTML = `<div class="page pad stack"><input class="search" id="wq" placeholder="Search: 字, pinyin (no tones needed) or English" aria-label="Search words">
    <div class="row small muted" id="wcount"></div><div class="tablebox"><table class="wordtable"><thead><tr><th>字</th><th>Pinyin</th><th>Meaning</th><th>Where</th><th></th></tr></thead><tbody id="wtb"></tbody></table></div></div>`;
  const draw = () => {
    const qv = $('#wq', body).value.trim().toLowerCase(); const qp = plainPy(qv);
    const res = words.filter(w => !qv || w.h.includes(qv) || (w.alt && w.alt.includes(qv)) || plainPy(w.p).includes(qp) || w.e.toLowerCase().includes(qv));
    $('#wcount', body).textContent = res.length + ' words';
    $('#wtb', body).innerHTML = res.slice(0, 400).map(w => `<tr data-w="${esc(w.k)}"><td class="h">${esc(w.h)}</td><td>${esc(phon(w.p))}</td><td>${w.em ? w.em + ' ' : ''}${esc(w.e)}</td><td><div class="row" style="gap:4px">${tagsFor(w)}</div></td><td>${statusDot(w.k)}</td></tr>`).join('');
    $$('#wtb tr', body).forEach(tr => tr.onclick = e => { e.stopPropagation(); wordPop(W[tr.dataset.w].h, tr.firstElementChild); });
  };
  $('#wq', body).oninput = draw; draw();
}
