/* ============================================================ WRITE (stroke order + dictation) */
let WRITER = null, STROKES = null, strokesP = null;
function stopWriter() { try { if (WRITER) { WRITER.cancelQuiz && WRITER.cancelQuiz(); WRITER.pauseAnimation && WRITER.pauseAnimation(); } } catch (e) {} WRITER = null; }
function loadStrokes() {
  if (!strokesP) strokesP = fetch('strokes.json').then(r => { if (!r.ok) throw new Error('http'); return r.json(); }).then(j => (STROKES = j)).catch(e => { strokesP = null; throw e; });
  return strokesP;
}
const hwOK = () => typeof window.HanziWriter !== 'undefined';
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const GRID = `<svg class="grid" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
  <line x1="0" y1="0" x2="100" y2="100" style="stroke:var(--grid-2)" stroke-width=".5"/><line x1="100" y1="0" x2="0" y2="100" style="stroke:var(--grid-2)" stroke-width=".5"/>
  <line x1="0" y1="50" x2="100" y2="50" style="stroke:var(--grid)" stroke-width=".6" stroke-dasharray="2.5 2"/><line x1="50" y1="0" x2="50" y2="100" style="stroke:var(--grid)" stroke-width=".6" stroke-dasharray="2.5 2"/></svg>`;
function makeWriter(host, ch, opts = {}) {
  stopWriter();
  host.innerHTML = '';
  const size = Math.round(host.getBoundingClientRect().width) || 280;
  const w = HanziWriter.create(host, ch, Object.assign({
    width: size, height: size, padding: Math.round(size * .07), showOutline: true, showCharacter: false,
    strokeColor: cssVar('--ink'), outlineColor: cssVar('--outline'), drawingColor: cssVar('--pen'), highlightColor: cssVar('--jade'),
    drawingWidth: Math.max(12, Math.round(size / 18)), strokeAnimationSpeed: 1.1, delayBetweenStrokes: 140, strokeHighlightSpeed: 2.2,
    charDataLoader: (c, done, err) => { loadStrokes().then(() => STROKES[c] ? done(STROKES[c]) : err && err(new Error('none'))).catch(e => err && err(e)); },
  }, opts));
  WRITER = w; return w;
}
function charsFor(deck) { return chOf(deckWords(deck)); }
function charInfo(c) {
  const single = H2W[c];
  const ws = WL.filter(w => w.h.includes(c) && w.h !== c && w.lv !== 9).sort((a, b) => (b.ls.length - a.ls.length) || (a.lv - b.lv)).slice(0, 5);
  return `<div class="stack" style="gap:10px">
    <div class="row" style="gap:14px;flex-wrap:nowrap"><span class="han" style="font-size:3.4rem;line-height:1">${c}</span><div>${single ? `<div class="bigpy" style="font-size:1.15rem">${esc(phon(single.p))}</div><div>${esc(single.e)}</div>` : '<div class="small muted">Part of the words below</div>'}
      <div class="small faint nums">${STROKES && STROKES[c] ? STROKES[c].strokes.length + ' strokes' : ''}${S.written[c] ? ' · written ' + S.written[c] + '×' : ''}</div></div></div>
    ${MN[c] ? `<div class="mn"><span class="c">${c}</span><span class="s"><b>${esc(MN[c][0])}</b><br>${esc(MN[c][1])}</span></div>` : ''}
    ${ws.length ? `<div><span class="eyebrow">Words with ${c}</span><div class="stack" style="gap:4px;margin-top:6px">${ws.map(w => `<button class="row btn ghost sm" style="justify-content:flex-start;gap:10px" data-say="${esc(w.h)}"><span class="han" style="font-size:1.25rem">${esc(w.h)}</span><span class="small" style="color:var(--jade)">${esc(phon(w.p))}</span><span class="small muted" style="text-align:left">${esc(w.e)}</span></button>`).join('')}</div></div>` : ''}</div>`;
}
function vWrite(el, p) {
  const mode = p.mode || S.ui.wmode || 'practice';
  const deck = p.deck || S.ui.wdeck || 'L1';
  S.ui.wmode = mode; S.ui.wdeck = deck; saveLocal();
  const decks = DECKS.filter(d => d.id !== 'weak');
  el.innerHTML = `<div class="stack"><div class="sec-head"><div><span class="eyebrow">寫字 · Writing</span><h1>${mode === 'dict' ? 'Dictation: hear it, write it' : 'Stroke order and writing'}</h1></div>
    <div class="seg" id="wmode" style="min-width:min(100%,320px)"><button data-v="practice" aria-pressed="${mode === 'practice'}">練字 Practice</button><button data-v="dict" aria-pressed="${mode === 'dict'}">聽寫 Dictation</button></div></div>
    <div class="deckbar">${decks.map(d => `<button class="chip" data-wd="${d.id}" aria-pressed="${d.id === deck}"><span class="han" style="font-size:1.05rem">${d.zh}</span></button>`).join('')}</div>
    <div id="wbody"></div></div>`;
  $$('#wmode button', el).forEach(b => b.onclick = () => go('write', { mode: b.dataset.v, deck }));
  $$('[data-wd]', el).forEach(b => b.onclick = () => go('write', { mode, deck: b.dataset.wd }));
  const body = $('#wbody', el);
  if (!hwOK()) { body.innerHTML = `<div class="page empty">The writing tool couldn't load. Check your connection and reopen this page.</div>`; return; }
  if (mode === 'dict') return dictation(body, deck);
  const chars = charsFor(deck);
  if (!chars.length) { body.innerHTML = `<div class="page empty">No characters in this deck yet.</div>`; return; }
  let cur = p.c && HAN.test(p.c) ? p.c : (chars.find(c => !S.written[c]) || chars[0]);
  body.innerHTML = `<div class="wwrap">
    <div class="page pad board">
      <div class="hwbox" id="hwbox">${GRID}<div class="hw" id="hw"></div><div class="hwmsg" id="hwmsg">Loading strokes…</div></div>
      <div class="wstate" id="wstate" aria-live="polite"></div>
      <div class="row" style="justify-content:center">
        <button class="btn" id="bWatch">${IC.eye}筆順 Watch</button>
        <button class="btn" id="bTrace">${IC.write}描 Trace</button>
        <button class="btn primary" id="bMem">${IC.brain}默寫 From memory</button>
        <button class="btn ghost" id="bNext">Next ${IC.next}</button></div>
      <p class="tiny faint" style="text-align:center;max-width:46ch">Watch the order once, trace it, then write it with the outline hidden. Draw each stroke in one smooth motion, in the right direction.</p>
    </div>
    <div class="stack">
      <div class="page pad" id="cinfo"></div>
      <div class="page pad"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3>Characters</h3><span class="small faint nums">${chars.filter(c => S.written[c]).length}/${chars.length} written</span></div>
        <div class="charpick">${chars.map(c => `<button class="cbtn ${S.written[c] ? 'done' : ''}" data-c="${c}" aria-pressed="${c === cur}">${c}</button>`).join('')}</div></div>
    </div></div>`;
  const host = $('#hw', body), msg = $('#hwmsg', body), state = $('#wstate', body);
  const setState = (t, color) => { state.textContent = t; state.style.color = color || ''; };
  const sel = c => {
    cur = c;
    $$('.cbtn', body).forEach(b => b.setAttribute('aria-pressed', b.dataset.c === c));
    msg.hidden = false; msg.textContent = 'Loading strokes…';
    loadStrokes().then(() => {
      $('#cinfo', body).innerHTML = charInfo(c);
      if (!STROKES[c]) { msg.textContent = 'No stroke data for this character.'; return; }
      msg.hidden = true;
      makeWriter(host, c, { showCharacter: true });
      setState('');
      speak(H2W[c] ? H2W[c].h : c);
    }).catch(() => { msg.textContent = 'Stroke data could not load. Reopen the page to try again.'; });
    $('#cinfo', body).innerHTML = charInfo(c);
  };
  const quiz = outline => {
    if (!STROKES || !STROKES[cur]) return;
    const c = cur;
    const w = makeWriter(host, c, { showOutline: outline, showCharacter: false });
    let miss = 0;
    setState(outline ? 'Trace each stroke in order' : 'Write it from memory', 'var(--ink-2)');
    w.quiz({
      showHintAfterMisses: outline ? 2 : 3, leniency: 1.15, highlightOnComplete: true,
      onMistake: () => { miss++; setState(miss >= 3 ? 'Hint shown — follow the green stroke' : 'Not that stroke — try again', 'var(--seal)'); },
      onCorrectStroke: d => setState(`${d.strokeNum + 1} / ${d.strokeNum + 1 + d.strokesRemaining}`, 'var(--jade)'),
      onComplete: d => {
        const m = d.totalMistakes;
        S.written[c] = (S.written[c] || 0) + 1;
        addXP(outline ? 3 : (m <= 1 ? 10 : 5));
        if (!outline && m === 0) { stamp('優'); sfx('done'); } else sfx('ok');
        setState(m === 0 ? (outline ? 'Clean trace! Now try it from memory.' : 'Perfect from memory!') : `Done with ${m} mistake${m > 1 ? 's' : ''}${outline ? '' : ' — write it once more'}`, m ? 'var(--gold)' : 'var(--jade)');
        const b = $(`.cbtn[data-c="${c}"]`, body); if (b) b.classList.add('done');
        $('#cinfo', body).innerHTML = charInfo(c);
        save();
      },
    });
  };
  $('#bWatch', body).onclick = () => { if (!STROKES || !STROKES[cur]) return; const w = makeWriter(host, cur, { showCharacter: false }); setState('Watch the stroke order', 'var(--ink-2)'); w.animateCharacter({ onComplete: () => setState('Your turn: trace it') }); speak(cur); };
  $('#bTrace', body).onclick = () => quiz(true);
  $('#bMem', body).onclick = () => quiz(false);
  $('#bNext', body).onclick = () => { const i = chars.indexOf(cur); sel(chars[(i + 1) % chars.length]); };
  $$('.cbtn', body).forEach(b => b.onclick = () => sel(b.dataset.c));
  sel(cur);
}
function dictation(body, deck) {
  const pool = deckWords(deck).filter(w => w.h.length <= 4 && [...w.h].every(c => HAN.test(c)));
  if (!pool.length) { body.innerHTML = `<div class="page empty">No words to dictate in this deck.</div>`; return; }
  body.innerHTML = `<div class="page pad stack" style="align-items:center;text-align:center">
    <div class="han" style="font-size:3rem;line-height:1">聽寫</div>
    <p class="muted" style="max-width:56ch">You'll hear a word and see its meaning. Write each character from memory, stroke by stroke. Stuck? Tap “Show me” to watch it, then write it again. Most written tests look exactly like this.</p>
    <label class="row small"><input type="checkbox" id="dpy" checked> Show pinyin as a hint</label>
    <button class="btn primary big" id="dgo">${IC.play}Start 8 words</button></div>`;
  $('#dgo', body).onclick = () => {
    const showPy = $('#dpy', body).checked;
    const seenFirst = shuffle(pool.filter(w => seen(w.k))).concat(shuffle(pool.filter(w => !seen(w.k))));
    const words = shuffle(seenFirst.slice(0, 8));
    let wi = 0, ci = 0, wordMiss = 0, right = 0;
    const results = [];
    loadStrokes().then(() => step()).catch(() => { body.innerHTML = `<div class="page empty">Stroke data could not load. Reopen the page to try again.</div>`; });
    function step() {
      if (wi >= words.length) return end();
      const w = words[wi]; const chs = [...w.h];
      body.innerHTML = `<div class="runner"><div class="rhead"><button class="iconbtn" id="dq" aria-label="Quit">${IC.x}</button><div class="bar"><i style="width:${wi / words.length * 100}%"></i></div><span class="combo nums">${wi + 1}/${words.length}</span></div>
        <div class="page qcard" style="align-items:center">
          <div class="qprompt">${w.em ? `<div style="font-size:2.4rem">${w.em}</div>` : ''}<div class="qen">${esc(w.e)}</div>${showPy ? `<div class="bigpy" style="font-size:1.2rem">${esc(phon(w.p))}</div>` : ''}
            <button class="btn sm" data-say="${esc(w.h)}">${IC.sound}Hear it again</button></div>
          <div class="tzg sm">${chs.map((c, j) => `<span><i style="color:${j < ci ? 'var(--ink)' : 'transparent'}">${j < ci ? c : '·'}</i></span>`).join('')}</div>
          <div class="hwbox" id="dbox" style="width:min(260px,72vw)">${GRID}<div class="hw" id="dhw"></div></div>
          <div class="wstate" id="dstate" aria-live="polite">Character ${ci + 1} of ${chs.length}</div>
          <div class="row" style="justify-content:center"><button class="btn" id="dshow">${IC.eye}Show me</button><button class="btn ghost" id="dskip">Skip word</button></div>
        </div></div>`;
      $('#dq', body).onclick = () => end();
      if (ci === 0) speak(w.h);
      const c = chs[ci];
      const st = $('#dstate', body);
      if (!STROKES[c]) { ci++; if (ci >= chs.length) { wordDone(w); } else step(); return; }
      const host = $('#dhw', body);
      let miss = 0;
      const start = (outline) => {
        const wr = makeWriter(host, c, { showOutline: outline, showCharacter: false });
        wr.quiz({ showHintAfterMisses: 3, leniency: 1.15,
          onMistake: () => { miss++; st.textContent = miss >= 3 ? 'Hint: follow the green stroke' : 'Not quite — try that stroke again'; st.style.color = 'var(--seal)'; },
          onCorrectStroke: () => { st.style.color = 'var(--jade)'; st.textContent = 'Good — keep going'; },
          onComplete: d => { wordMiss += miss; S.written[c] = (S.written[c] || 0) + 1; sfx(miss ? 'flip' : 'ok'); setTimeout(() => { ci++; if (ci >= chs.length) wordDone(w); else step(); }, 450); } });
      };
      start(false);
      $('#dshow', body).onclick = () => { miss += 3; const wr = makeWriter(host, c, { showCharacter: false }); st.textContent = 'Watch, then write it'; st.style.color = 'var(--ink-2)'; wr.animateCharacter({ onComplete: () => setTimeout(() => start(true), 400) }); };
      $('#dskip', body).onclick = () => { wordMiss += 99; wordDone(w); };
    }
    function wordDone(w) {
      const ok = wordMiss <= [...w.h].length;
      quizSRS(w.k, ok); catAnswer('chars', ok);
      if (ok) { right++; addXP(8); stamp(wordMiss === 0 ? '優' : '好'); } else sfx('no');
      results.push([w, ok, wordMiss]);
      save();
      wi++; ci = 0; wordMiss = 0;
      setTimeout(step, ok ? 650 : 200);
    }
    function end() {
      stopWriter();
      const pct = results.length ? Math.round(right / results.length * 100) : 0;
      if (results.length) { addXP(15); if (pct >= 80) confetti(); }
      body.innerHTML = `<div class="page result"><div class="han" style="font-size:2.4rem">${pct >= 80 ? '寫得很好！' : '再練習一下'}</div><div class="score nums">${right}/${results.length}</div>
        <div class="review">${results.map(([w, ok, m]) => `<div class="rv row" style="justify-content:space-between"><span class="han" style="font-size:1.6rem;color:${ok ? 'var(--jade)' : 'var(--seal)'}">${esc(w.h)}</span><span class="small">${esc(phon(w.p))} · ${esc(w.e)}</span><span class="small ${ok ? 'right' : 'yours'}">${m >= 99 ? 'skipped' : m ? m + ' slips' : 'perfect'}</span></div>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="btn primary" id="dagain">${IC.redo}8 more words</button><button class="btn" data-go="write" data-p='${JSON.stringify({ mode: 'practice', deck })}'>Practice characters</button></div></div>`;
      $('#dagain', body).onclick = () => go('write', { mode: 'dict', deck });
    }
  };
}

/* ============================================================ TUTOR (sample capability) */
let SAMPLE = null, TUT = [], TCTL = null;
const RULES = () => `You are a warm, patient Chinese tutor inside a study website. The student is a beginner who finds characters and grammar hard, and has a Chinese test in ${Math.max(0, daysLeft())} day(s).
Course: 時代華語 Modern Chinese Book 1, Lessons 1–6, Traditional characters as used in Taiwan, Hanyu Pinyin with Taiwan tones (e.g. 星期 xīngqí, 東西 dōngxī).
Lessons studied so far: 預備 (她是誰？這是什麼？ family, titles, classroom objects); 第一課 她是新同學 (是, 嗎, A-not-A, 很+adjective, 呢, 也, 叫/姓, 哪國人, 知道/認識, 喜歡/愛, 請問, countries, fruit, drinks); 第二課 你幾點去學校 (time words before the verb, big-to-small time order, telling time 點/分/半, dates 月/號/星期, 有/沒有/有沒有, 不 vs 沒, 在+place, 去/來/回, 幾, 以後, 要/不要, 好不好, daily routine); 第三課 買生日禮物 (想, measure words 本 個 張 台 枝 朵 件 杯 種, 二 vs 兩, 一些/這些/那些, 和 vs 跟, 一起, 怎麼樣, 多少錢/塊/元, 都, 常常, adjective+的+noun, 送 someone something, 請, 在+verb, 了). 第四課 你要咖啡還是茶？ (A還是B, 好+adjective, 太…了, verb+一點兒, 最, ordering food with 碗/杯/瓶/位, big numbers 百千萬零 and 一共多少錢/找錢, 有的…有的…, 每…都, seasons); 第五課 我的錢包在哪裡？ (thing+在+place+上面/下面/裡面/前面/後面/旁邊, place+有+thing, 哪裡/這裡/那裡, 吧, 有空/沒空, 可是, 幫, 再, rooms and furniture, measure words 間 棟 隻); 第六課 週末去打網球吧！ (會, verb+得+adjective e.g. 跑得很快 and 唱歌唱得很好, 吧, 覺得, 有一點+adjective, 應該/可以, 只, 不要+verb, 幾 = a few, 平常/有時候, 真+adjective, sports, movies, hobbies).
Main characters: 林中明 (Taiwanese), 林友美 (from Japan), 宜文 (birthday Sept 23), 國安.
The teacher's tests use these formats: word-bank fill-in dialogues (choices A–K, characters 小華/小美/中明/友美/宜文), sentence order with numbered chunks (answer like 1/5/3/2/4), measure-word banks, opposite words, short fill-in passages, picture matching (verbs, fruits, drinks, adjectives), and listening (she reads a sentence, students choose picture A, B or C). She writes 甚麼 as well as 什麼. When quizzing the student, use these formats.
How to answer:
- Simple English. Every Chinese word or sentence in Traditional characters followed by pinyin in parentheses. Never use Simplified characters.
- Keep it short: under 140 words unless the student asks for more. Use beginner vocabulary from the lessons above.
- If the student writes a Chinese sentence, first say whether it is correct. If not, give the corrected sentence and explain the one rule that matters.
- When asked to quiz, ask ONE question at a time and wait for the answer, then mark it.
- For remembering characters, break them into parts (radicals) and give a vivid memory story.
- Be encouraging, but honest about mistakes.`;
async function tutorInit() {
  try {
    if (!window.claude || !window.claude.use) return;
    const s = await window.claude.use('sample');
    if (!s) return;
    SAMPLE = s; document.body.classList.add('has-tutor');
    const b = $('#gask'); if (b) b.hidden = false;
  } catch (e) {}
}
function fmtAI(t) { return esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/([一-鿿，。？！、]+)/g, '<span class="hz">$1</span>'); }
function openTutor(prefill) {
  if (!SAMPLE) { toast('The tutor is not available in this view'); return; }
  const chips = [['Check my sentence', 'Is this sentence correct? '], ['不 vs 沒', 'When do I use 不 and when 沒? Give me simple examples.'], ['Quiz me', 'Quiz me on Lesson 2 grammar, one question at a time.'], ['二 vs 兩', 'Explain 二 vs 兩 with examples.'], ['買 vs 賣', 'How can I remember 買 (buy) vs 賣 (sell)?'], ['Time word order', 'Where do time words go in a Chinese sentence? Give me 3 examples.']];
  const d = drawer('<span class="han">問老師</span> · Ask the tutor', `<p class="small muted">Ask about grammar, characters, or paste a sentence you wrote to check it. Answers use your Claude account.</p>
    <div class="row" style="gap:6px">${chips.map(([l, t]) => `<button class="chip" data-chip="${esc(t)}">${esc(l)}</button>`).join('')}</div><div class="msgs" id="msgs"></div>`,
    `<textarea class="input" id="tin" placeholder="Type a question, or a Chinese sentence to check…" aria-label="Message">${esc(prefill || '')}</textarea>
     <div class="row" style="justify-content:flex-end"><button class="btn ghost sm" id="tstop" hidden>${IC.stop}Stop</button><button class="btn primary" id="tsend">Send ${IC.next}</button></div>`);
  const msgs = $('#msgs', d), tin = $('#tin', d);
  const draw = () => { msgs.innerHTML = TUT.map(m => `<div class="msg ${m.role === 'user' ? 'me' : 'ai'}">${m.role === 'user' ? esc(m.content) : fmtAI(m.content)}</div>`).join(''); msgs.parentElement.scrollTop = 1e6; };
  draw();
  $$('[data-chip]', d).forEach(b => b.onclick = () => { tin.value = b.dataset.chip; tin.focus(); if (!/ $/.test(b.dataset.chip)) send(); });
  const busy = on => { $('#tsend', d).disabled = on; $('#tstop', d).hidden = !on; };
  $('#tstop', d).onclick = () => TCTL && TCTL.abort();
  tin.onkeydown = e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };
  $('#tsend', d).onclick = send;
  async function send() {
    const text = tin.value.trim(); if (!text || TCTL) return;
    tin.value = ''; TUT.push({ role: 'user', content: text }); draw();
    const bub = document.createElement('div'); bub.className = 'msg ai think'; bub.textContent = 'Thinking…'; msgs.appendChild(bub); msgs.parentElement.scrollTop = 1e6;
    TCTL = new AbortController(); busy(true);
    try {
      const { text: ans } = await SAMPLE([{ role: 'user', content: RULES() }, ...TUT.slice(-12)], { cache: false, signal: TCTL.signal, onText: ({ text: t }) => { bub.classList.remove('think'); bub.textContent = t; msgs.parentElement.scrollTop = 1e6; } });
      TUT.push({ role: 'assistant', content: ans }); bub.innerHTML = fmtAI(ans); addXP(2);
    } catch (e) {
      bub.classList.remove('think');
      if (e && e.text) { bub.innerHTML = fmtAI(e.text); TUT.push({ role: 'assistant', content: e.text }); }
      const code = e && e.code;
      if (code === 'cancelled') { if (!e.text) bub.remove(); }
      else if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].includes(code)) { bub.textContent = 'The tutor is turned off for this page.'; SAMPLE = null; $('#fab').hidden = true; }
      else if (code === 'rate_limited') bub.textContent = (e.text ? e.text + '\n\n' : '') + 'Too many questions at once. Wait a minute, then ask again.';
      else if (code === 'refused') bub.textContent = 'The tutor could not answer that. Try asking it a different way.';
      else if (!e || !e.text) bub.textContent = 'Could not reach the tutor. Try again.';
    } finally { TCTL = null; busy(false); }
  }
  if (prefill) tin.focus();
}

/* ============================================================ init */
function init() {
  shell();
  const h = (location.hash || '').slice(1);
  go(['learn', 'practice', 'me', 'today', 'lessons', 'cards', 'write', 'grammar', 'drills', 'test'].includes(h) ? h : 'learn');
  cloudInit(); tutorInit();
  document.addEventListener('visibilitychange', () => { if (document.hidden && CLOUD.timer) { clearTimeout(CLOUD.timer); doPush(); } });
  if (!S.updatedAt) { S.start = today(); saveLocal(); }
  if (!S.seenIntro) setTimeout(welcome, 500);
}
