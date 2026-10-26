/* ============================================================ SESSION ENGINE (game style, adaptive) */
let RUN = null, KEYH = null;
document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.querySelector('.pop')) { closePop(); return; } if (KEYH) KEYH(e); });
const HEART = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.2 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.1 1.8-1.9 3.3-3.1 5.4-3.1 3.6 0 5.7 3.7 4.2 7.2C19.5 16.4 12 21 12 21z" style="fill:var(--heart)"/><path d="M7 7.5c-1.3.2-2.2 1.3-2.3 2.6" style="fill:none;stroke:#fff;stroke-opacity:.6" stroke-width="1.6" stroke-linecap="round"/></svg>`;
const FLAME = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5c1.2 3.6 5.8 5.6 5.8 11a5.8 5.8 0 0 1-11.6 0c0-2.6 1.2-4.2 2.3-5.3.3 1.9 1.2 3 2.3 3-1.2-3.5 0-6.3 1.2-8.7z" style="fill:var(--flame)"/><path d="M12 12.5c.6 1.6 2.6 2.4 2.6 4.6a2.6 2.6 0 0 1-5.2 0c0-1.3.6-2 1.1-2.5.2.8.6 1.3 1.1 1.3-.5-1.4 0-2.6.4-3.4z" style="fill:var(--gold)"/></svg>`;
const PEARL = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" style="fill:var(--boba)"/><circle cx="9" cy="8.5" r="2.6" style="fill:#fff;fill-opacity:.35"/></svg>`;
const PRAISE = [['很好！', 'Nicely done!'], ['太棒了！', 'Awesome!'], ['對了！', 'Correct!'], ['真厲害！', 'Impressive!'], ['沒錯！', 'Exactly right!'], ['讚！', 'Great!']];
const OOPS = [['沒關係！', 'No worries — here\'s the answer'], ['再試試！', 'Not quite — it will come back'], ['差一點！', 'So close']];
CAT.write = '寫字 Writing';
const SHOW_RIGHT = new Set(['vocab', 'pinyin', 'listen', 'chars', 'usage', 'reading']);
const fmtT = s => Math.floor(s / 60) + ':' + pad2(s % 60);
const shortEn = e => { const s = String(e || '').split(/[;(]/)[0].replace(/^to /, '').trim(); return s.length > 16 ? s.slice(0, 15) + '…' : s; };
/* greedy word split for chunks like 買一本書 → 買 / 一 / 本 / 書 */
function segWords(str) {
  const out = []; let i = 0;
  while (i < str.length) {
    let L = Math.min(5, str.length - i), hit = null;
    for (; L >= 1; L--) { const sub = str.slice(i, i + L); if (H2W[sub] || OVR[sub] || (L === 1 && HAN.test(sub))) { hit = sub; break; } }
    if (!hit) { hit = str[i]; L = 1; }
    out.push(hit); i += L;
  }
  return out;
}
const PHRASE = { 要不要: ['yào bú yào', 'want to or not? (asking)'], 幾月: ['jǐ yuè', 'which month?'], 不是: ['búshì', 'is not'], 有課: ['yǒu kè', 'to have class'], 去不去: ['qù bú qù', 'going or not? (asking)'],
  有沒有: ['yǒu méiyǒu', 'have or not? / is there?'], 每天: ['měitiān', 'every day'], 不好看: ['bù hǎokàn', 'not good-looking'], 幾個: ['jǐ ge', 'how many?'], 太多: ['tài duō', 'too many; too much'],
  太好了: ['tài hǎo le', 'great! wonderful!'], 打網球: ['dǎ wǎngqiú', 'to play tennis'], 打籃球: ['dǎ lánqiú', 'to play basketball'], 踢足球: ['tī zúqiú', 'to play soccer'], 騎腳踏車: ['qí jiǎotàchē', 'to ride a bike'],
  看電影: ['kàn diànyǐng', 'to watch a movie'], 很熱: ['hěn rè', 'very hot'], 很冷: ['hěn lěng', 'very cold'], 去學校: ['qù xuéxiào', 'to go to school'], 幾點: ['jǐ diǎn', 'what time?'], 幾號: ['jǐ hào', 'what date?'], 多少錢: ['duōshǎo qián', 'how much (money)?'] };
/* pinyin + meaning for any word or phrase in a question */
function wordInfo(h) {
  const w = H2W[h];
  if (w && w.h === h) return { p: w.p, e: w.e, k: w.k };
  if (PHRASE[h]) return { p: PHRASE[h][0], e: PHRASE[h][1], k: null };
  if (w) return { p: pyOf(h) || w.p, e: w.e, k: w.k };
  const parts = segWords(h).filter(x => H2W[x]);
  return { p: pyOfText(h), e: parts.length && parts.length <= 3 ? parts.map(x => shortEn(H2W[x].e)).join(' + ') : '', k: null };
}
const pyOfText = str => segWords(str).filter(h => HAN.test(h)).map(h => pyOf(h) || (H2W[h] ? H2W[h].p : '')).join(' ');
/* how much help a word gets in practice: hints fade as you learn the word */
function hintLevel(h) {
  const w = H2W[h]; if (!w) return 1;
  const st = stageOf(w.k);
  if (st === 0) return 2;
  return Math.max(0, (st <= 1 ? 2 : st <= 3 ? 1 : 0) - (dialLv() === 3 ? 1 : 0));
}
function longPress(elm, fn) {
  let t = null, fired = false;
  const start = () => { fired = false; clearTimeout(t); t = setTimeout(() => { fired = true; fn(); }, 480); };
  const stop = () => clearTimeout(t);
  elm.addEventListener('pointerdown', start); ['pointerup', 'pointerleave', 'pointercancel'].forEach(ev => elm.addEventListener(ev, stop));
  elm.addEventListener('contextmenu', e => { e.preventDefault(); });
  elm.addEventListener('click', e => { if (fired) { e.stopImmediatePropagation(); e.preventDefault(); fired = false; } }, true);
}

function modal(html, buttons = [], cls = '') {
  closeModal();
  const sc = document.createElement('div'); sc.className = 'mscrim';
  const m = document.createElement('div'); m.className = 'modal ' + cls; m.setAttribute('role', 'dialog');
  m.innerHTML = `<div class="modal-body">${html}</div><div class="modal-btns">${buttons.map((b, i) => `<button class="btn3d ${b[1] || ''}" data-mb="${i}">${b[0]}</button>`).join('')}</div>`;
  document.body.append(sc, m);
  buttons.forEach((b, i) => { m.querySelector(`[data-mb="${i}"]`).onclick = () => b[2] ? b[2]() : closeModal(); });
  const f = m.querySelector('[data-mb="0"]'); if (f) setTimeout(() => f.focus({ preventScroll: true }), 50);
  return m;
}
function closeModal() { $$('.mscrim,.modal').forEach(x => x.remove()); }
function countUp(el) {
  $$('[data-count]', el).forEach(b => {
    const to = +b.dataset.count, suf = b.dataset.suf || '', t0 = performance.now(), dur = matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 900;
    const step = t => { const k = Math.min(1, (t - t0) / dur); b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  });
}
const dialHTML = () => { const d = dialLv(); return `<div class="dialm" id="dialm" title="Difficulty adapts to you: ${DIAL_N[d][1]}" aria-label="Difficulty ${DIAL_N[d][1]}"><span class="dbars">${[1, 2, 3].map(i => `<i class="${i <= d ? 'on' : ''}"></i>`).join('')}</span><span class="dtxt"></span></div>`; };

function runQuiz(cfg) {
  closePop(); stopSpeak(); stopWriter(); closeModal();
  document.body.classList.add('running');
  const qs = (cfg.qs || []).filter(Boolean);
  const practice = !cfg.exam;
  const R = RUN = { i: 0, right: 0, combo: 0, best: 0, log: [], t0: Date.now(), timer: null, xp: 0, hearts: cfg.hearts || 0, lost: 0,
    total: cfg.gen ? cfg.len : qs.length, extra: 0, later: [], st0: {}, assist: false, qt0: 0, cur: null };
  const el = $('#view');
  const exitTo = () => { RUN = null; clearInterval(R.timer); document.body.classList.remove('running'); (cfg.back || (() => go('learn')))(); };
  let prevPct = 0;
  if (cfg.exam && cfg.minutes) {
    R.timer = setInterval(() => {
      if (RUN !== R) return clearInterval(R.timer);
      const left = cfg.minutes * 60 - Math.floor((Date.now() - R.t0) / 1000);
      const t = $('#timer'); if (t) t.textContent = left > 0 ? fmtT(left) : '0:00';
      if (left <= 0) { clearInterval(R.timer); finish(); }
    }, 1000);
  }
  const topRight = () => (cfg.adaptive ? dialHTML() : '') + (cfg.hearts ? `<div class="hearts ${R.hearts <= 1 ? 'low' : ''}" id="hearts" aria-label="${R.hearts} hearts left">${HEART}<b class="nums">${R.hearts}</b></div>`
    : cfg.exam && cfg.minutes ? `<div class="timer nums" id="timer">${fmtT(cfg.minutes * 60)}</div>`
    : `<div class="combo-pill nums" id="combo">${R.combo >= 2 ? FLAME + R.combo : ''}</div>`);

  function record(q, ok, yours, quiet, o = {}) {
    R.log.push({ q, ok, yours }); R.ansAt = R.i;
    if (q.after) q.after(ok);
    if (q.cat) catAnswer(q.cat, ok);
    const ms = o.ms ?? (R.qt0 ? performance.now() - R.qt0 : null);
    const ad = adaptRecord(q, ok, ms, !!(o.assist ?? R.assist), o.conf);
    if (ok) { R.right++; R.combo++; R.best = Math.max(R.best, R.combo); questEvent('combo', R.combo, true); if (q.cat === 'listen') questEvent('listen'); }
    else {
      R.combo = 0;
      if (cfg.adaptive && q.retry && !q.isRetry && R.extra < 5 && !o.noRetry) {
        const rq = q.retry(); if (rq) { rq.isRetry = true; R.later.push({ at: R.i + 3, q: rq }); R.extra++; R.total++; }
      }
    }
    if (ad.dialChanged && cfg.adaptive && !quiet) dialNote(ad.dialChanged);
    const gain = ok ? 3 + (R.combo >= 10 ? 2 : R.combo >= 5 ? 1 : 0) + (ad.fast && !R.assist ? 1 : 0) : 0;
    R.xp += gain;
    if (quiet) return gain;
    if (!cfg.exam) addXP(gain);
    save();
    return gain;
  }
  function dialNote(dir) {
    const d = $('#dialm', el); if (!d) return;
    d.outerHTML = dialHTML();
    const d2 = $('#dialm', el); d2.classList.add(dir > 0 ? 'up' : 'down');
    d2.querySelector('.dtxt').textContent = dir > 0 ? 'Harder ↑' : 'Easier ↓';
    setTimeout(() => { if (d2.isConnected) { d2.classList.remove('up', 'down'); d2.querySelector('.dtxt').textContent = ''; } }, 2400);
  }
  function loseHeart() {
    if (!cfg.hearts || cfg.exam) return;
    R.hearts = Math.max(0, R.hearts - 1); R.lost++;
    const h = $('#hearts', el);
    if (h) {
      h.querySelector('b').textContent = R.hearts; h.classList.toggle('low', R.hearts <= 1);
      h.classList.remove('hit'); void h.offsetWidth; h.classList.add('hit');
      const p = document.createElement('span'); p.className = 'heart-drop'; p.innerHTML = HEART; h.appendChild(p); setTimeout(() => p.remove(), 1000);
    }
    sfx('heart');
  }
  function comboBurst(n) {
    const b = document.createElement('div'); b.className = 'combo-burst';
    b.innerHTML = `${FLAME}<b>${n}</b><span>${n >= 10 ? '連對！ On fire!' : 'in a row!'}</span>`;
    el.querySelector('.sess').appendChild(b); setTimeout(() => b.remove(), 1500);
    if (n >= 5) stamp(n >= 10 ? '神' : '讚');
  }
  function render() {
    if (RUN !== R) return;
    const di = R.later.findIndex(x => x.at <= R.i);
    if (di >= 0) { const [x] = R.later.splice(di, 1); qs.splice(R.i, 0, x.q); }
    if (cfg.gen && R.i >= qs.length && R.i < R.total) { let q = null; for (let t = 0; t < 3 && !q; t++) { try { q = cfg.gen(R); } catch (e) { console.warn(e); } } if (q) qs.push(q); }
    if (R.i >= qs.length && R.later.length) qs.push(R.later.shift().q);
    if (R.i >= qs.length) return finish();
    stopWriter(); stopSpeak(); KEYH = null; closePop();
    const q = qs[R.i];
    R.cur = q; R.assist = false; R.qt0 = 0;
    if (q.k && !(q.k in R.st0)) R.st0[q.k] = stageOf(q.k);
    const tot = Math.max(R.total, qs.length);
    const pct = R.i / tot * 100;
    const canLater = (cfg.mock || cfg.allowLater) && !q.laterUsed && R.i < qs.length - 1 && q.kind !== 'teach';
    el.innerHTML = `<div class="sess ${cfg.exam ? 'exam' : ''}">
      <div class="sess-top"><button class="sx" id="rquit" aria-label="Quit">${IC.x}</button>
        <div class="pbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(pct)}"><i style="width:${prevPct}%"></i></div>${topRight()}</div>
      <div class="sess-main"><div class="qwrap q-${q.kind} ${q.hidePy ? 'hidepy' : ''}">
        <div class="qhead"><span class="qlabel">${q.kind === 'teach' ? '<span class="newbadge">NEW</span>' : q.isRetry ? '<span class="newbadge again">AGAIN</span>' : ''}${esc(q.label || '')}</span>${q.hidePy ? `<button class="peek" id="peek" aria-label="Show pinyin">${IC.eye}<span>拼音</span></button>` : ''}</div>
        ${q.prompt ? `<div class="qprompt">${q.prompt}</div>` : ''}${q.hidePy && practice ? '<p class="tiny faint hint-line">Tap a word to see its pinyin, tap it again for its meaning.</p>' : ''}<div id="qbody"></div></div></div>
      <div class="sess-foot" id="foot"><div class="foot-in"><div class="foot-msg" id="footMsg"></div>
        <div class="foot-btns">${canLater ? `<button class="btn3d ghost" id="later" title="Move this question to the end">Later</button>` : ''}<button class="btn3d ghost" id="skip" hidden>Skip</button><button class="btn3d big" id="cta" disabled>${cfg.exam ? 'Next' : 'Check'}</button></div></div></div></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => { const b = $('.pbar i', el); if (b) b.style.width = Math.max(pct, 2) + '%'; prevPct = Math.max(pct, 2); }));
    $('#rquit', el).onclick = quit;
    const pk = $('#peek', el); if (pk) pk.onclick = () => { $('.qwrap', el).classList.remove('hidepy'); R.assist = true; pk.remove(); };
    const lt = $('#later', el); if (lt) lt.onclick = () => { q.laterUsed = true; qs.splice(R.i, 1); qs.push(q); sfx('tap'); render(); };
    if (q.say) setTimeout(() => { if (RUN === R && R.cur === q) speak(q.say); }, 300);
    R.qt0 = performance.now() + (q.say ? 1200 : 0);
    ({ mc: renderMC, order: renderOrder, bank: renderBank, teach: renderTeach, write: renderWrite })[q.kind](q);
  }
  function quit() {
    if (!R.log.length) return exitTo();
    modal(`<div class="mm">${mascotSVG({ mood: 'sad', size: 120 })}</div><h2>Wait, don't go!</h2><p class="muted">${cfg.exam ? 'If you quit now, this test won\'t be scored.' : 'Your answers so far are saved, but this level won\'t count as finished.'}</p>`,
      [['Keep going', 'primary', closeModal], [cfg.exam || cfg.node ? 'Quit' : 'End and see results', 'ghost red-text', () => { closeModal(); if (!cfg.exam && !cfg.node) finish(); else exitTo(); }]]);
  }
  function next() {
    if (cfg.hearts && !cfg.exam && R.hearts <= 0) return outOfHearts();
    R.i++; render();
  }
  function sheet(ok, q, detail = '') {
    const foot = $('#foot', el); if (!foot) return;
    foot.classList.add(ok ? 'ok' : 'no');
    const [zh, en] = ok ? pick(PRAISE) : pick(OOPS);
    const extra = (ok ? (SHOW_RIGHT.has(q.cat) ? (q.explain || '') : '') : (q.explain || ''));
    $('#footMsg', el).innerHTML = `<div class="fm-mascot">${mascotSVG({ mood: ok ? 'happy' : 'sad', size: 58 })}</div>
      <div class="fm-text"><b class="fm-title"><span class="han">${zh}</span> ${en}</b>${detail || extra ? `<div class="fm-detail">${detail}${extra}</div>` : ''}</div>`;
    const cta = $('#cta', el); cta.textContent = 'Continue'; cta.disabled = false; cta.classList.toggle('red', !ok); cta.onclick = next;
    $('#skip', el).hidden = true; const lt = $('#later', el); if (lt) lt.remove();
    const pk = $('#peek', el); if (pk) pk.remove(); $('.qwrap', el).classList.remove('hidepy');
    setTimeout(() => cta.focus({ preventScroll: true }), 30);
    KEYH = e => { if (e.key === 'Enter') { e.preventDefault(); next(); } };
    sfx(ok ? 'ok' : 'no');
    if (ok && [3, 5, 10, 15, 20, 30].includes(R.combo)) comboBurst(R.combo);
    const c = $('#combo', el); if (c) c.innerHTML = R.combo >= 2 ? FLAME + R.combo : '';
    if (cfg.fast && ok) setTimeout(() => { if (RUN === R && $('#cta', el) === cta) next(); }, 700);
  }
  const ctaEl = () => $('#cta', el);

  function renderMC(q) {
    const body = $('#qbody', el);
    const twoCol = q.opts.every(o => String(o).length <= 14);
    const KL = q.abc ? 'ABCDEFGHIJKLMNOP' : '123456789';
    body.innerHTML = q.optHTML
      ? `<div class="opts pics">${q.optHTML.map((h, i) => `<button class="opt picopt" data-i="${i}" aria-label="${KL[i]}"><span class="k">${KL[i]}</span><span class="pbox">${h}</span></button>`).join('')}</div>`
      : `<div class="opts ${twoCol ? 'two' : ''} ${q.han && q.opts.some(o => String(o).length > 8) ? 'long' : ''}">${q.opts.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${KL[i]}</span><span class="ot ${q.han ? 'han' : ''}">${esc(o)}</span></button>`).join('')}</div>`;
    let sel = -1, answered = false;
    const btns = $$('.opt', body);
    const choose = i => {
      if (answered) return;
      sel = i; btns.forEach((b, j) => b.classList.toggle('chosen', j === i)); sfx('tap');
      if (cfg.fast) return check();
      ctaEl().disabled = false;
    };
    const check = () => {
      if (answered || sel < 0) return; answered = true;
      const ok = q.ans.includes(sel);
      btns.forEach(b => b.disabled = true);
      record(q, ok, q.opts[sel], false, { conf: q.optK ? q.optK[sel] : null });
      if (cfg.exam) return next();
      btns[sel].classList.remove('chosen'); btns[sel].classList.add(ok ? 'right' : 'wrong');
      if (!ok) { q.ans.forEach(a => btns[a].classList.add('right')); loseHeart(); }
      sheet(ok, q);
      if (q.sayAfter) speak(q.sayAfter);
    };
    btns.forEach(b => b.onclick = () => choose(+b.dataset.i));
    ctaEl().onclick = check;
    KEYH = e => {
      if (e.target.closest('input,textarea')) return;
      let n = +e.key; if (q.abc && /^[a-p]$/i.test(e.key)) n = 'abcdefghijklmnop'.indexOf(e.key.toLowerCase()) + 1;
      if (n >= 1 && n <= q.opts.length && !answered) { e.preventDefault(); choose(n - 1); }
      else if (e.key === 'Enter' && !answered && sel >= 0) { e.preventDefault(); check(); }
    };
  }
  function tileHTML(q, i) {
    const t = q.tiles[i];
    const hm = S.set.hint || 'tap';
    const hl = !practice || !(q.tileHints || q.numbered) || hm === 'tap' ? 0 : hm === 'all' ? 1 : Math.max(...segWords(t).filter(h => HAN.test(h)).map(hintLevel), 0);
    return `<span class="tw han">${esc(t)}</span>${hl ? `<span class="tpy">${esc(phon(pyOfText(t)))}</span>` : ''}${q.numbered ? `<sup class="tn">(${i + 1})</sup>` : ''}`;
  }
  function renderOrder(q) {
    const body = $('#qbody', el);
    const tiles = q.numbered ? q.tiles.map((t, i) => ({ t, i })) : shuffle(q.tiles.map((t, i) => ({ t, i })));
    let picked = [], answered = false;
    body.innerHTML = `<div class="slot" id="slot" data-ph="Tap the words in the right order"></div><div class="tiles" id="pool">${tiles.map(o => `<button class="tile" data-i="${o.i}">${tileHTML(q, o.i)}</button>`).join('')}</div>
      ${q.hint && !cfg.exam ? `<p class="small faint" style="text-align:center">${esc(q.hint)}</p>` : ''}${practice ? '<p class="tiny faint hint-line">Stuck on a word? Press and hold it to see its pinyin and meaning (counts as a peek).</p>' : ''}`;
    const slot = $('#slot', body), poolEl = $('#pool', body);
    const sync = () => {
      slot.innerHTML = picked.map((i, j) => `<button class="tile in" data-j="${j}">${tileHTML(q, i)}</button>`).join(q.sep ? `<span class="faint">→</span>` : '');
      $$('.tile', poolEl).forEach(b => b.classList.toggle('used', picked.includes(+b.dataset.i)));
      ctaEl().disabled = picked.length !== q.tiles.length;
      $$('.tile', slot).forEach(b => b.onclick = () => { if (answered) return; picked.splice(+b.dataset.j, 1); sfx('tap'); sync(); });
    };
    $$('.tile', poolEl).forEach(b => {
      b.onclick = () => { const i = +b.dataset.i; if (!answered && !picked.includes(i)) { picked.push(i); sfx('tap'); sync(); } };
      if (practice) longPress(b, () => { lookText(q.tiles[+b.dataset.i], b); });
    });
    const check = () => {
      if (answered || picked.length !== q.tiles.length) return; answered = true;
      const ok = q.answers.includes(picked.map(i => q.tiles[i]).join(''));
      $$('button', body).forEach(b => b.disabled = true);
      const yours = picked.map(i => q.tiles[i]).join(q.sep || '');
      record(q, ok, yours);
      if (cfg.exam) return next();
      slot.classList.add(ok ? 'right' : 'wrong');
      if (!ok) loseHeart();
      const ansShow = q.sep ? q.tiles.join(q.sep) : q.answers[0] + (q.end || '');
      const nums = q.numbered ? `<div><b>Order:</b> <span class="nums">${esc(seqFor(q.tiles, q.answers[0]))}</span></div>` : '';
      const enLine = q.en || (q.sent && q.sent.en) || q.hint;
      sheet(ok, q, (ok ? '' : `<div class="zh">${esc(ansShow)}</div>`) + (ok && q.answers.length > 1 ? `<div class="small">Also right: <span class="han">${esc(q.answers.filter(a => a !== picked.map(i => q.tiles[i]).join('')).slice(0, 2).join(' · '))}</span></div>` : '') + nums + (enLine && !q.hint ? `<div class="small">${esc(enLine)}</div>` : '') + (q.note ? `<div class="small">${esc(q.note)}</div>` : ''));
      if (!q.sep) speak(q.answers[0]);
    };
    ctaEl().onclick = check;
    KEYH = e => { if (e.key === 'Enter' && !answered) { e.preventDefault(); check(); } else if (e.key === 'Backspace' && !answered && picked.length) { e.preventDefault(); picked.pop(); sync(); } };
    sync();
  }
  /* look up a word or chunk during a question: counts as a hint and schedules the word for review */
  function lookText(t, anchor) {
    const ws = segWords(t).filter(h => H2W[h]);
    ws.forEach(h => notePeek(H2W[h].k, 'm'));
    wordPop(t, anchor, true);
  }
  function renderBank(q) {
    const body = $('#qbody', el);
    const LT = 'ABCDEFGHIJKLMNOP';
    const nB = q.ans.length, fill = Array(nB).fill(-1);
    let act = 0, answered = false, showPy = false;
    let mode = practice ? (S.set.hint || 'tap') : 'off';
    const helped = new Set(), rev = q.bank.map(() => 0);
    const lvlOf = i => mode === 'all' ? 2 : mode === 'off' ? 0 : Math.max(rev[i], mode === 'smart' ? hintLevel(q.bank[i]) : 0);
    const chipHTML = (w, i) => { const x = wordInfo(w); const l = lvlOf(i); if (l >= 2) helped.add(i);
      const isNew = practice && x.k && stageOf(x.k) === 0;
      return `<span class="bcw" data-ci="${i}"><button class="bchip h${l}" data-i="${i}"><b>${LT[i]}</b><span class="bw"><span class="han">${esc(w)}</span><span class="bpy">${esc(phon(x.p))}</span><span class="ben">${esc(shortEn(x.e))}</span></span></button>${practice && mode !== 'all' ? `<button class="bpeek s${l}" data-pi="${i}" aria-label="${l === 0 ? 'Show the pinyin of' : l === 1 ? 'Show the meaning of' : 'Already shown:'} ${esc(w)}" ${l >= 2 ? 'disabled' : ''}>${l === 0 ? '拼' : l === 1 ? '意' : '✓'}</button>` : ''}${isNew ? '<i class="bnew">new</i>' : ''}</span>`; };
    const blank = k => `<button class="blank" data-b="${k}" aria-label="Blank ${k + 1}"><span class="bn">${k + 1}</span><span class="bv"></span></button>`;
    const main = q.layout === 'pics'
      ? `<div class="picgrid">${q.items.map((it, k) => `<div class="picitem"><div class="pic">${picHTML(it)}</div>${blank(k)}</div>`).join('')}</div>`
      : `<div class="bklines hidepy">${q.lines.map(([sp, parts], li) => `<div class="bkl"><span class="bks">${esc(sp)}${sp ? (/^\d+$/.test(sp) ? '.' : '：') : ''}</span><span class="bkt">${parts.map(p => p[0] ? blank(p[1]) : ruby(p[1])).join('')}${q.en && q.en[li] ? `<span class="bken" hidden>${esc(q.en[li])}</span>` : ''}</span></div>`).join('')}</div>`;
    body.innerHTML = `<div class="bankwrap"><div class="bankbar" id="bankbar">${q.bank.map(chipHTML).join('')}</div>
      ${practice ? `<div class="bktools"><span class="tiny faint bkt-l">Hints</span><div class="seg sm" role="group" aria-label="Hints on the word bank">${[['tap', 'Tap to peek'], ['smart', 'Smart'], ['all', 'All']].map(([v, l]) => `<button data-hm="${v}" aria-pressed="${mode === v}">${l}</button>`).join('')}</div>
        <button class="btn sm ghost" id="bkwords">${IC.lessons}<span>Word list</span></button>${q.layout === 'pics' ? '' : `<button class="btn sm ghost" id="bkpy">拼音</button>`}${q.en ? `<button class="btn sm ghost" id="bken">EN</button>` : ''}</div>` : ''}</div>
      ${main}<div class="row" style="justify-content:flex-end"><span class="small faint" id="bkleft"></span></div>
      ${practice ? `<p class="tiny faint hint-line">${mode === 'tap' ? 'Only peek at the words you need: tap <b>拼</b> for pinyin, then <b>意</b> for meaning. Tap a word in the dialogue to see its pinyin. Every peek is remembered, and those words come back until you know them.' : 'Hints fade as you learn each word. Press and hold a word to look it up.'}</p>` : ''}`;
    let blanks = $$('.blank', body), chips = $$('.bchip', body);
    const paint = () => {
      blanks.forEach((b, k) => { b.classList.toggle('act', k === act && !answered); b.querySelector('.bv').innerHTML = fill[k] >= 0 ? `<b>${LT[fill[k]]}</b> ${esc(q.bank[fill[k]])}` : ''; b.classList.toggle('filled', fill[k] >= 0); });
      chips.forEach((c, i) => c.classList.toggle('used', fill.includes(i)));
      const left = fill.filter(f => f < 0).length; $('#bkleft', body).textContent = left ? left + ' blank' + (left > 1 ? 's' : '') + ' left' : 'All filled';
      ctaEl().disabled = !cfg.exam && fill.every(f => f < 0);
    };
    const nextEmpty = from => { for (let j = 1; j <= nB; j++) { const k = (from + j) % nB; if (fill[k] < 0) return k; } return -1; };
    blanks.forEach((b, k) => b.onclick = () => { if (answered) return; if (k === act && fill[k] >= 0) fill[k] = -1; act = k; paint(); });
    const put = i => { if (answered) return; if (act < 0 || act >= nB) act = nextEmpty(-1); if (act < 0) act = 0; fill[act] = i; sfx('tap'); const n = nextEmpty(act); act = n < 0 ? act : n; paint(); };
    const peekChip = i => {
      const l = lvlOf(i); if (l >= 2 || answered) return;
      const x = wordInfo(q.bank[i]);
      rev[i] = l + 1;
      if (x.k) notePeek(x.k, rev[i] === 1 ? 'p' : 'm');
      if (rev[i] === 1) speak(q.bank[i]); else helped.add(i);
      sfx('tap');
      const wrap = $(`.bcw[data-ci="${i}"]`, body); wrap.outerHTML = chipHTML(q.bank[i], i);
      bindChips(); paint();
      const nb = $(`.bcw[data-ci="${i}"] .bpeek`, body); if (nb) nb.focus({ preventScroll: true });
    };
    const bindChips = () => {
      chips = $$('.bchip', body);
      chips.forEach(c => { c.onclick = () => put(+c.dataset.i); if (practice && !c.dataset.lp) { c.dataset.lp = 1; longPress(c, () => { helped.add(+c.dataset.i); lookText(q.bank[+c.dataset.i], c); }); } });
      $$('.bpeek', body).forEach(b => b.onclick = e => { e.stopPropagation(); peekChip(+b.dataset.pi); });
    };
    bindChips();
    $$('[data-hm]', body).forEach(b => b.onclick = () => { mode = b.dataset.hm; S.set.hint = mode; save(); $$('[data-hm]', body).forEach(x => x.setAttribute('aria-pressed', x === b)); $('#bankbar', body).innerHTML = q.bank.map(chipHTML).join(''); bindChips(); paint(); const hl = $('.hint-line', body); if (hl && mode !== 'tap') hl.textContent = 'Hints fade as you learn each word. Press and hold a word to look it up.'; });
    if ($('#bkpy', body)) $('#bkpy', body).onclick = () => { showPy = !showPy; $('.bklines', body).classList.toggle('hidepy', !showPy); $('#bkpy', body).setAttribute('aria-pressed', showPy); };
    if ($('#bken', body)) $('#bken', body).onclick = () => { R.assist = true; q.bank.forEach((_, i) => helped.add(i)); $$('.bken', body).forEach(x => x.hidden = !x.hidden); $('#bken', body).setAttribute('aria-pressed', !$('.bken', body).hidden); };
    if ($('#bkwords', body)) $('#bkwords', body).onclick = () => {
      q.bank.forEach((_, i) => helped.add(i));
      const m = modal(`<h2>Word list</h2><p class="small muted">Looking here counts as a hint — these words will come back in your reviews.</p>
        <div class="wlist">${q.bank.map((w, i) => { const x = wordInfo(w); return `<div class="wl-row"><b class="wl-l">${LT[i]}</b><span class="han wl-h">${esc(w)}</span><span class="wl-m"><span class="wl-p">${esc(phon(x.p))}</span><span class="small">${esc(x.e)}</span></span><button class="playbtn" data-say="${esc(w)}" aria-label="Play ${esc(w)}">${IC.sound}</button></div>`; }).join('')}</div>`,
        [['Back to the question', 'primary', null]], 'wlm');
      q.bank.forEach(w => { const x = wordInfo(w); if (x.k) notePeek(x.k, 'm'); });
    };
    const context = k => {
      if (q.layout === 'pics') return `<div class="pbox" style="justify-content:flex-start">${picHTML(q.items[k])}</div>`;
      const line = q.lines.find(([, parts]) => parts.some(p => p[0] && p[1] === k));
      return `<div class="han" style="font-size:1.15rem">${line[0] && !/^\d+$/.test(line[0]) ? esc(line[0]) + '：' : ''}${line[1].map(p => p[0] ? (p[1] === k ? '<u style="color:var(--pen)">＿＿</u>' : '＿') : esc(plainZh(p[1]))).join('')}</div>`;
    };
    let warned = false;
    const check = () => {
      if (answered) return;
      if (!cfg.exam && !warned && fill.some(f => f < 0)) { warned = true; toast('Some blanks are still empty — tap Check again to submit'); return; }
      answered = true; KEYH = null;
      let gain = 0, right = 0;
      const rows = [];
      fill.forEach((f, k) => {
        const ok = f >= 0 && q.ans[k].includes(q.bank[f]);
        if (ok) right++;
        const aw = q.ans[k][0], ak = H2W[aw] && H2W[aw].k, ai = q.bank.indexOf(aw);
        gain += record({ kind: 'mc', cat: q.cat, label: q.label, opts: q.bank, han: true, abc: true, ans: q.ans[k].map(w => q.bank.indexOf(w)), prompt: context(k), explain: '', after: q.after, k: ak, sk: 'u', noDial: true },
          ok, f >= 0 ? q.bank[f] : '(blank)', true, { assist: helped.has(ai) || R.assist, conf: f >= 0 && H2W[q.bank[f]] ? H2W[q.bank[f]].k : null, noRetry: true });
        rows.push([k, ok, aw, f]);
      });
      dialStep(right / nB >= .8, false, false);
      if (practice && helped.size >= Math.ceil(q.bank.length * .5)) S.dial = clamp(dialVal() - .03, 0, 1);
      save();
      if (cfg.exam) return next();
      addXP(gain);
      blanks.forEach((b, k) => { const ok = fill[k] >= 0 && q.ans[k].includes(q.bank[fill[k]]); b.classList.add(ok ? 'right' : 'wrong'); b.disabled = true;
        if (!ok) b.querySelector('.bv').innerHTML += ` <span class="fix">→ ${q.ans[k].map(w => `<b>${LT[q.bank.indexOf(w)]}</b> ${esc(w)}`).join(' / ')}</span>`; });
      $$('.bchip', body).forEach(c => c.disabled = true);
      $$('.bktools button', body).forEach(c => c.disabled = true); const bw = $('.bankwrap', body); if (bw) bw.classList.add('done');
      const bl = $('.bklines', body); if (bl) bl.classList.remove('hidepy');
      $$('.bken', body).forEach(x => x.hidden = false);
      const pct = right / nB;
      if (right < nB) loseHeart();
      const rev = `<div class="bkrev">${rows.map(([k, ok, aw, f]) => { const x = wordInfo(aw); return `<div class="bkr ${ok ? 'ok' : 'no'}"><span class="bkr-n">${q.layout === 'pics' ? '' : k + 1}</span><b class="han">${esc(aw)}</b><span class="bkr-p">${esc(phon(x.p))}</span><span class="bkr-e">${esc(shortEn(x.e))}</span>${!ok && f >= 0 ? `<span class="bkr-y">not <b class="han">${esc(q.bank[f])}</b></span>` : ''}<button class="playbtn sm" data-say="${esc(aw)}" aria-label="Play">${IC.sound}</button></div>`; }).join('')}</div>`;
      sheet(pct >= .8, q, `<div><b class="nums">${right} / ${nB}</b> right.${right < nB ? ' Missed words will come back in your reviews.' : ''}</div>${rev}`);
      if (pct === 1) stamp('優');
    };
    ctaEl().onclick = check;
    KEYH = e => { if (e.target.closest('input,textarea')) return; const i = LT.toLowerCase().indexOf(e.key.toLowerCase()); if (!answered && e.key.length === 1 && i >= 0 && i < q.bank.length) { e.preventDefault(); put(i); } else if (e.key === 'Enter' && !answered) { e.preventDefault(); check(); } };
    paint();
  }
  function renderTeach(q) {
    const body = $('#qbody', el);
    body.innerHTML = q.html;
    if (q.onShow) q.onShow(body);
    const cta = ctaEl(); cta.textContent = 'Continue'; cta.disabled = false; cta.onclick = () => { sfx('tap'); next(); };
    KEYH = e => { if (e.key === 'Enter') { e.preventDefault(); next(); } };
  }
  function renderWrite(q) {
    const body = $('#qbody', el), ch = q.char;
    body.innerHTML = `<div class="wq"><div class="wq-hint">${q.hint || ''}</div>
      <div class="hwbox" id="wqbox">${GRID}<div class="hw" id="wqhw"></div><div class="hwmsg" id="wqmsg">Loading strokes…</div></div>
      <div class="wstate" id="wqstate" aria-live="polite">${q.mode === 'trace' ? 'Trace each stroke in order' : 'Write it from memory'}</div></div>`;
    const sk = $('#skip', el); sk.hidden = false; sk.textContent = 'Show me';
    const cta = ctaEl(); cta.textContent = 'Can\'t do it'; cta.disabled = false; cta.classList.add('ghosty');
    const state = $('#wqstate', body);
    let helped = false, done = false, gaveUp = false;
    const finishW = (ok, mistakes) => {
      if (done) return; done = true; stopWriter();
      S.written[ch] = (S.written[ch] || 0) + 1; questEvent('write');
      record(q, ok, ok ? '✓' : mistakes + ' mistakes', false, { assist: helped && !gaveUp, noRetry: true });
      sk.hidden = true; cta.classList.remove('ghosty');
      sheet(ok, q, `<div class="row" style="gap:10px"><span class="han" style="font-size:2rem;line-height:1">${ch}</span><span>${gaveUp ? 'Watch how it\'s written — it will come back soon.' : helped ? 'You watched the strokes first — try it again later.' : mistakes ? mistakes + ' wrong stroke' + (mistakes > 1 ? 's' : '') : 'Every stroke right!'}</span></div>${MN[ch] ? `<div class="small">${esc(MN[ch][0])} — ${esc(MN[ch][1])}</div>` : ''}`);
      if (ok && !helped && q.mode === 'memory') stamp('優');
    };
    const start = outline => {
      const w = makeWriter($('#wqhw', body), ch, { showOutline: outline, showCharacter: false });
      w.quiz({ showHintAfterMisses: outline ? 2 : 3, leniency: 1.2, highlightOnComplete: true,
        onMistake: d => { state.textContent = d.mistakesOnStroke >= 3 ? 'Hint: follow the green stroke' : 'Not that stroke — try again'; state.style.color = 'var(--seal)'; },
        onCorrectStroke: d => { state.style.color = 'var(--jade)'; state.textContent = `${d.strokeNum + 1} / ${d.strokeNum + 1 + d.strokesRemaining}`; },
        onComplete: d => { const n = STROKES[ch].strokes.length; setTimeout(() => finishW(!helped && d.totalMistakes <= Math.max(1, Math.floor(n / 4)), d.totalMistakes), 450); } });
    };
    loadStrokes().then(() => {
      if (RUN !== R || R.cur !== q) return;
      if (!STROKES[ch]) { R.i++; return render(); }
      $('#wqmsg', body).hidden = true;
      start(q.mode === 'trace');
    }).catch(() => { $('#wqmsg', body).textContent = 'Stroke data could not load.'; });
    sk.onclick = () => { if (done || !STROKES || !STROKES[ch]) return; helped = true; const w = makeWriter($('#wqhw', body), ch, { showCharacter: false }); state.textContent = 'Watch, then write it'; state.style.color = 'var(--ink-2)'; w.animateCharacter({ onComplete: () => setTimeout(() => { if (!done) start(true); }, 350) }); };
    cta.onclick = () => { if (done) return; helped = gaveUp = true; finishW(false, 0); if (STROKES && STROKES[ch]) { const w = makeWriter($('#wqhw', body), ch, { showCharacter: false }); w.animateCharacter(); } };
  }
  function outOfHearts() {
    RUN = null; clearInterval(R.timer); KEYH = null;
    const wrong = R.log.filter(l => !l.ok && l.q.kind !== 'bank');
    addXP(5); save();
    el.innerHTML = `<div class="finish"><div class="fin-mascot">${mascotSVG({ mood: 'sad', size: 150 })}</div>
      <h1 class="fin-title"><span class="han">沒有愛心了！</span> Out of hearts</h1>
      <p class="muted" style="max-width:42ch;text-align:center">You got ${R.right} right before running out. 波波 made this level a little gentler for next time. Practice your mistakes (no hearts needed), then try again.</p>
      ${stageSummaryHTML(R)}${peekSummaryHTML(R)}
      <div class="fin-btns">${wrong.length ? '<button class="btn3d big" id="oh-rev">Practice my mistakes</button>' : ''}<button class="btn3d ghost" id="oh-back">Back</button></div></div>`;
    sfx('no');
    if ($('#oh-rev', el)) $('#oh-rev', el).onclick = () => runQuiz({ title: 'Mistakes', adaptive: true, qs: wrong.map(l => Object.assign({}, l.q, { isRetry: false })), back: cfg.back });
    $('#oh-back', el).onclick = exitTo;
  }
  function finish() {
    if (RUN !== R) return;
    clearInterval(R.timer); KEYH = null;
    // a test that ends early (time is up, or "End and see results") scores the questions it never reached as wrong
    const reached = R.ansAt === R.i ? R.i + 1 : R.i, early = reached < Math.max(qs.length, cfg.gen ? R.total : 0);
    const skipped = cfg.exam || cfg.mock ? qs.slice(reached).reduce((a, q) => a + (q.kind === 'bank' ? q.ans.length : q.kind === 'teach' ? 0 : 1), 0) : 0;
    const n = R.log.length + skipped, pct = n ? Math.round(R.right / n * 100) : 0, secs = Math.round((Date.now() - R.t0) / 1000);
    const perfect = n >= 4 && R.right === n && !early;
    const lvl0 = levelOf(S.xp);
    const bonus = 5 + (perfect ? 5 : 0) + (pct >= 80 ? 2 : 0);
    if (cfg.exam) addXP(R.xp + bonus); else addXP(bonus);
    const pearls = (cfg.node || cfg.mock ? 5 : 2) + (perfect ? 5 : 0) + (R.best >= 10 ? 3 : 0) + (cfg.mock && pct >= 80 ? 10 : 0);
    const cats = {};
    R.log.forEach(l => { const c = l.q.cat || 'vocab'; cats[c] = cats[c] || [0, 0]; cats[c][1]++; if (l.ok) cats[c][0]++; });
    if (cfg.mock) { S.mocks.push({ date: today(), pct, n, cats, type: cfg.type || 'mock' }); if (S.mocks.length > 30) S.mocks.shift(); questEvent('test'); }
    S.totals.sessions++; if (perfect) S.totals.perfect++;
    S.bestCombo = Math.max(S.bestCombo || 0, R.best);
    if (n) questEvent('lessons'); if (perfect) questEvent('perfect');
    const res = { pct, n, right: R.right, perfect, secs, best: R.best, xp: R.xp + bonus, pearls };
    let after = {};
    if (cfg.onDone) after = cfg.onDone(res) || {};
    addPearls(pearls, false);
    save(); RUN = null;
    const wrong = R.log.filter(l => !l.ok);
    const title = cfg.exam || cfg.mock ? `${pct >= 90 ? '優' : pct >= 80 ? '甲' : pct >= 70 ? '乙' : pct >= 60 ? '丙' : '加油'}` : '';
    const head = perfect ? ['完美！', 'Perfect lesson!'] : pct >= 80 ? ['做得好！', 'Lesson complete!'] : pct >= 50 ? ['完成了！', 'Lesson complete'] : ['加油！', 'Keep practicing'];
    const weakest = Object.entries(cats).filter(([, v]) => v[1] >= 2).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])[0];
    const d = dialLv();
    el.innerHTML = `<div class="finish">
      <div class="fin-mascot">${mascotSVG({ mood: pct >= 60 ? 'cheer' : 'think', size: 150 })}</div>
      <h1 class="fin-title">${cfg.exam || cfg.mock ? `<span class="${HAN.test(cfg.title || '考試') ? 'han' : ''}">${esc(cfg.title || '考試')}</span>` : `<span class="han">${head[0]}</span> ${head[1]}`}</h1>
      <div class="fin-stats">
        <div class="fstat gold"><span>Total XP</span><b class="nums" data-count="${res.xp}">0</b></div>
        <div class="fstat jade"><span>${perfect ? 'Perfect' : 'Accuracy'}</span><b class="nums" data-count="${pct}" data-suf="%">0</b></div>
        <div class="fstat sky"><span>${cfg.exam || cfg.mock ? 'Grade' : 'Time'}</span><b class="nums ${title ? 'han' : ''}">${title || fmtT(secs)}</b></div>
      </div>
      <div class="fin-pearls">${PEARL}<b>+${pearls}</b> pearls${R.best >= 5 ? ` · ${FLAME} best combo ${R.best}` : ''}</div>
      ${skipped ? `<p class="note" style="max-width:520px">${skipped} question${skipped > 1 ? 's were' : ' was'} not answered, so ${skipped > 1 ? 'they count' : 'it counts'} as wrong.</p>` : ''}
      ${stageSummaryHTML(R)}${peekSummaryHTML(R)}
      ${cfg.adaptive ? `<div class="fin-dial"><span class="dbars">${[1, 2, 3].map(i => `<i class="${i <= d ? 'on' : ''}"></i>`).join('')}</span><span><b>Difficulty: ${DIAL_N[d][1]}</b> · <span class="muted">${DIAL_N[d][2]}</span></span></div>` : ''}
      ${weakest && weakest[1][0] / weakest[1][1] < .8 ? `<p class="note" style="max-width:520px">Focus next on <b>${esc(CAT[weakest[0]] || weakest[0])}</b> — ${weakest[1][0]}/${weakest[1][1]} right.</p>` : ''}
      ${cfg.exam || cfg.mock ? `<div class="catrows" style="max-width:520px">${Object.entries(cats).map(([c, [a, b]]) => `<div class="catrow"><span>${esc(CAT[c] || c)}</span><div class="bar ${a / b < .6 ? 'seal' : a / b < .8 ? 'gold' : ''}"><i style="width:${a / b * 100}%"></i></div><span class="nums small" style="text-align:right">${a}/${b}</span></div>`).join('')}</div>` : ''}
      <p class="tiny faint">${IC.check.replace('<svg', '<svg style="width:12px;height:12px;vertical-align:-1px"')} Progress saved${CLOUD.state === 'on' ? ' to your account' : ' on this device'}</p>
      <div class="fin-btns"><button class="btn3d big" id="fin-go">Continue</button>${wrong.length ? `<button class="btn3d ghost" id="fin-rev">Practice ${wrong.length} mistake${wrong.length > 1 ? 's' : ''}</button>` : ''}${!cfg.smart && smartCounts().weak >= 3 ? '<button class="btn3d ghost" id="fin-smart">Smart review</button>' : ''}</div>
      ${(cfg.exam || cfg.mock) && wrong.length ? `<div class="review"><h3>Review</h3>${wrong.map(l => `<div class="rv">${l.q.prompt && !/passage|class="clock|data-say/.test(l.q.prompt) ? `<div class="small muted">${esc(l.q.label)}</div><div class="rv-p">${l.q.prompt}</div>` : `<div class="small muted">${esc(l.q.label)}</div>`}
        <div class="small">Your answer: <span class="yours han" style="font-size:1.1rem">${esc(l.yours)}</span></div><div class="small">Right answer: <span class="right han" style="font-size:1.1rem">${esc(l.q.kind === 'mc' ? l.q.ans.map(a => l.q.opts[a]).join(' / ') : l.q.kind === 'order' ? (l.q.sep ? l.q.tiles.join(l.q.sep) : l.q.answers[0]) : l.q.char || '')}</span></div>
        ${l.q.explain ? `<div class="small" style="margin-top:6px">${l.q.explain}</div>` : ''}</div>`).join('')}</div>` : ''}
    </div>`;
    countUp(el);
    sfx('done'); if (pct >= 80) setTimeout(confetti, 300);
    flyPearls(pearls);
    $('#fin-go', el).onclick = exitTo;
    if ($('#fin-rev', el)) $('#fin-rev', el).onclick = () => runQuiz({ title: 'Mistakes', adaptive: true, qs: wrong.map(l => Object.assign({}, l.q, { isRetry: false })).filter(q => q.kind !== 'bank'), back: cfg.back });
    if ($('#fin-smart', el)) $('#fin-smart', el).onclick = () => startSmart();
    setTimeout(() => afterRewards(after, lvl0), 1500);
  }
  render();
}
