/* ============================================================ icons */
const ic = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const IC = {
  today: ic('<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M9 14.5l2 2 4-4"/>'),
  lessons: ic('<path d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5 2-1.5 5-2 8.5-1.5V5C17 4.5 14 5 12 6.5z"/><path d="M12 6.5v13"/>'),
  cards: ic('<rect x="6" y="3.5" width="13" height="16" rx="2"/><path d="M4 7v12a2 2 0 0 0 2 2h10"/><path d="M10 9h5M10 12.5h5"/>'),
  write: ic('<path d="M14.5 4.5l5 5L9 20H4v-5z"/><path d="M12.5 6.5l5 5"/>'),
  grammar: ic('<path d="M4 6h7M4 12h11M4 18h7"/><circle cx="17" cy="6" r="2"/><circle cx="19" cy="12" r="1.5"/><circle cx="15" cy="18" r="2"/>'),
  drills: ic('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
  test: ic('<path d="M9 4h6v3H9z"/><path d="M8 5.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-2"/><path d="M8.5 12l2 2 4-4M8.5 17.5h7"/>'),
  chat: ic('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4A8 8 0 1 1 20 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/>'),
  gear: ic('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>'),
  play: ic('<path d="M7 4.5v15l12-7.5z" fill="currentColor" stroke="none"/>'),
  stop: ic('<rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" stroke="none"/>'),
  sound: ic('<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12"/>'),
  flame: ic('<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2-4.6.3 1.6 1 2.6 2 2.6-1-3 0-5.5 1-8z"/>'),
  star: ic('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),
  check: ic('<path d="M5 12.5l4.5 4.5L19 7.5" stroke-width="2.6"/>'),
  x: ic('<path d="M6 6l12 12M18 6L6 18"/>'),
  back: ic('<path d="M15 5l-7 7 7 7"/>'),
  next: ic('<path d="M9 5l7 7-7 7"/>'),
  plus: ic('<path d="M12 5v14M5 12h14"/>'),
  redo: ic('<path d="M4 12a8 8 0 0 1 14-5.3L20 9"/><path d="M20 4v5h-5"/><path d="M20 12a8 8 0 0 1-14 5.3L4 15"/>'),
  eye: ic('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
  brain: ic('<path d="M9 4.5a3 3 0 0 0-3 3 3 3 0 0 0-1.5 5.5A3 3 0 0 0 9 18.5V4.5zM15 4.5a3 3 0 0 1 3 3 3 3 0 0 1 1.5 5.5 3 3 0 0 1-4.5 5.5V4.5z"/>'),
  bolt: ic('<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>'),
  cloud: ic('<path d="M7 18.5h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 11a3.75 3.75 0 0 0 1 7.5z"/>'),
};

/* ============================================================ shell */
IC.learn = ic('<path d="M12 21c-3-2.5-7-5.5-7-10a7 7 0 0 1 14 0c0 4.5-4 7.5-7 10z"/><circle cx="12" cy="11" r="2.6"/>');
IC.practice = ic('<path d="M4 15.5l7.5-7.5M7 18.5l-3.5-3.5M8.5 11l4.5 4.5M13 6.5l4.5 4.5M16 5l3 3M12.5 20l7.5-7.5"/>');
IC.me = ic('<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c1.2-4 4-6 7.5-6s6.3 2 7.5 6"/>');
const VIEWS = [
  { id: 'learn', zh: '學習', en: 'Learn' }, { id: 'practice', zh: '練習', en: 'Practice' }, { id: 'write', zh: '寫字', en: 'Write' },
  { id: 'test', zh: '考試', en: 'Tests' }, { id: 'me', zh: '我的', en: 'Me' }];
const SUBVIEWS = [{ id: 'lessons', zh: '課文', en: 'Lessons' }, { id: 'cards', zh: '生詞', en: 'Flashcards' }, { id: 'grammar', zh: '語法', en: 'Grammar' }, { id: 'drills', zh: '題型', en: 'Drills' }];
const NAVOF = { lessons: 'practice', cards: 'practice', grammar: 'practice', drills: 'practice', today: 'me' };
let CUR = 'learn', PARAMS = {};
function shell() {
  $('#rail').innerHTML = VIEWS.map(v => `<button class="navbtn" data-go="${v.id}">${IC[v.id]}<span><span class="nz">${v.zh}</span><span class="ne">${v.en}</span></span></button>`).join('') +
    `<div class="rail-sub">${SUBVIEWS.map(v => `<button class="navbtn sub" data-go="${v.id}">${IC[v.id]}<span><span class="nz">${v.zh}</span><span class="ne">${v.en}</span></span></button>`).join('')}</div>` +
    `<button class="navbtn sub tutor-entry" data-tutor>${IC.chat}<span><span class="nz">問老師</span><span class="ne">Ask the tutor</span></span></button>` +
    `<div class="rail-foot"><span class="rail-m">${mascotSVG({ mood: 'happy', size: 44 })}</span><span><b class="han" style="font-size:1.05rem">加油！</b><br>Lessons 1–6 of 時代華語 1 + the full vocab table.</span></div>`;
  $('#tabbar').innerHTML = VIEWS.map(v => `<button data-go="${v.id}" aria-label="${v.en}">${IC[v.id]}<span>${v.zh}</span></button>`).join('');
  $('#brandM').innerHTML = mascotSVG({ mood: 'happy', size: 30 });
  $('#streakIc').innerHTML = FLAME; $('#pearlIc').innerHTML = PEARL;
  document.addEventListener('click', e => {
    const g = e.target.closest('[data-go]');
    if (g) { e.preventDefault(); go(g.dataset.go, g.dataset.p ? JSON.parse(g.dataset.p) : {}); return; }
    const t = e.target.closest('.tok');
    if (t) {
      e.stopPropagation();
      if (t.closest('.hidepy') && !t.classList.contains('show')) { t.classList.add('show'); const w = H2W[t.dataset.w]; if (w && RUN) notePeek(w.k, 'p'); speak(t.dataset.w); return; }
      wordPop(t.dataset.w, t); return;
    }
    const tu = e.target.closest('[data-tutor]');
    if (tu) { e.preventDefault(); openTutor(); return; }
    const say = e.target.closest('[data-say]');
    if (say) { e.preventDefault(); speak(say.dataset.say); return; }
    if (!e.target.closest('.pop')) closePop();
  });
  $('#settingsBtn').onclick = openSettings;
  $('#brandBtn').onclick = () => go('learn');
  $('#fab').onclick = () => openTutor();
  applyPhonClass(); hud();
}
function hud() {
  const t = today();
  const sn = S.streak.last === t || S.streak.last === ymd(new Date(Date.now() - 86400000)) ? S.streak.n : 0;
  $('#streakN').textContent = sn;
  $('.pill.streak').classList.toggle('lit', S.streak.last === t);
  $('#pearlN').textContent = S.pearls || 0;
  const l = levelOf(S.xp), f0 = levelFloor(l), f1 = levelFloor(l + 1), fr = (S.xp - f0) / (f1 - f0);
  $('#lvN').textContent = l; $('#xpN').textContent = S.xp + ' XP';
  const C = 2 * Math.PI * 15;
  $('#lvRing').innerHTML = `<b class="lv-in nums">${l}</b><svg viewBox="0 0 36 36" width="30" height="30" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="var(--gold)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(C * fr).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 18 18)"/></svg>`;
  $('#xpPill').setAttribute('aria-label', `Level ${l}, ${S.xp} XP`);
  const d = daysLeft();
  $('#daysN').textContent = d < 0 ? '—' : d;
}
function go(id, params = {}) {
  closePop(); stopSpeak(); stopWriter(); closeModal(); KEYH = null; document.body.classList.remove('running');
  if (RUN && RUN.timer) clearInterval(RUN.timer); RUN = null;
  const map = { learn: vLearn, practice: vPractice, me: vMe, today: vToday, lessons: vLessons, cards: vCards, write: vWrite, grammar: vGrammar, drills: vDrills, test: vTest };
  if (!map[id]) id = 'learn';
  CUR = id; PARAMS = params;
  const nav = NAVOF[id] || id;
  $$('[data-go]').forEach(b => { if (b.closest('#rail') || b.closest('#tabbar')) b.setAttribute('aria-current', b.dataset.go === id || (!b.classList.contains('sub') && b.dataset.go === nav) ? 'page' : 'false'); });
  document.body.dataset.view = id;
  try { if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id); } catch (e) {}
  const el = $('#view'); el.onclick = null; el.className = 'view'; void el.offsetWidth; el.className = 'view';
  map[id](el, params);
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}
function renderAll() { hud(); applyPhonClass(); if (!RUN && !document.querySelector('.modal')) go(CUR, PARAMS); }

/* ---- toast, stamp, confetti */
function toast(msg) { $$('.toast').forEach(t => t.remove()); const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2600); }
function stamp(txt) {
  const s = $('#stamp'); const sq = s.firstElementChild;
  sq.textContent = txt; sq.classList.toggle('two', txt.length > 1);
  s.classList.remove('on'); void s.offsetWidth; s.classList.add('on');
}
function confetti() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = $('#confetti'), ctx = c.getContext('2d');
  const dpr = devicePixelRatio || 1; c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
  const cs = getComputedStyle(document.documentElement);
  const cols = ['--seal', '--jade', '--gold', '--pen'].map(v => cs.getPropertyValue(v).trim());
  const P = Array.from({ length: 140 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 160, y: innerHeight * .38, vx: (Math.random() - .5) * 13, vy: -Math.random() * 13 - 4, r: Math.random() * 6 + 4, a: Math.random() * 6, va: (Math.random() - .5) * .3, c: pick(cols), sq: Math.random() < .5 }));
  let f = 0;
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    P.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .38; p.vx *= .99; p.a += p.va; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - f / 110); if (p.sq) ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6); else { ctx.beginPath(); ctx.arc(0, 0, p.r / 2.2, 0, 7); ctx.fill(); } ctx.restore(); });
    if (++f < 115) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}

/* ---- word popover */
function findWord(w) {
  if (H2W[w]) return H2W[w];
  return null;
}
function closePop() { $$('.pop').forEach(p => p.remove()); }
function wordPop(text, anchor, quiet) {
  closePop();
  let w = findWord(text);
  const parts = !w && text.length > 1 ? segWords(text).map(c => H2W[c]).filter(Boolean) : [];
  if (RUN && RUN.cur && !quiet && w) notePeek(w.k, 'm');
  const pop = document.createElement('div'); pop.className = 'pop'; pop.setAttribute('role', 'dialog');
  const name = (DATA.people.find(p => p[0].includes(text)) || null);
  if (w) {
    pop.innerHTML = `<div class="row" style="justify-content:space-between"><span class="ph">${esc(w.h)}</span>${w.em ? `<span style="font-size:1.8rem">${w.em}</span>` : ''}</div>
      <div class="bigpy" style="font-size:1.1rem">${esc(phon(w.p))}</div><div>${esc(w.e)}</div>
      <div class="row">${tagsFor(w)}</div>
      <div class="row"><button class="btn sm" data-say="${esc(w.h)}">${IC.sound}Listen</button>${RUN ? `<span class="tiny faint">${STG[stageOf(w.k)][1]} · counts as a hint</span>` : `<button class="btn sm" data-go="write" data-p='${JSON.stringify({ c: [...w.h].find(c => HAN.test(c)) })}'>${IC.write}Write it</button>`}</div>`;
  } else if (PHRASE[text]) {
    pop.innerHTML = `<span class="ph">${esc(text)}</span><div class="bigpy" style="font-size:1.05rem">${esc(phon(PHRASE[text][0]))}</div><div>${esc(PHRASE[text][1])}</div>${parts.map(p => `<div class="small"><b class="han" style="font-size:1.1rem">${esc(p.h)}</b> ${esc(phon(p.p))} — ${esc(p.e)}</div>`).join('')}<div class="row"><button class="btn sm" data-say="${esc(text)}">${IC.sound}Listen</button></div>`;
  } else if (name) {
    pop.innerHTML = `<span class="ph">${esc(text)}</span><div class="bigpy" style="font-size:1rem">${esc(name[1])}</div><div class="small muted">Name · ${esc(name[2])}</div><div class="row"><button class="btn sm" data-say="${esc(text)}">${IC.sound}Listen</button></div>`;
  } else {
    pop.innerHTML = `<span class="ph">${esc(text)}</span>${parts.map(p => `<div class="small"><b class="han" style="font-size:1.15rem">${esc(p.h)}</b> ${esc(phon(p.p))} — ${esc(p.e)}</div>`).join('') || '<div class="small muted">Name or phrase</div>'}<div class="row"><button class="btn sm" data-say="${esc(text)}">${IC.sound}Listen</button></div>`;
  }
  pop.insertAdjacentHTML('afterbegin', `<button class="popx" aria-label="Close">${IC.x}</button>`);
  pop.querySelector('.popx').onclick = e => { e.stopPropagation(); closePop(); };
  document.body.appendChild(pop);
  const r = anchor.getBoundingClientRect(), pr = pop.getBoundingClientRect();
  let left = clamp(r.left + r.width / 2 - pr.width / 2, 16, innerWidth - pr.width - 16);
  let top = r.bottom + 8; if (top + pr.height > innerHeight - 12) top = Math.max(12, r.top - pr.height - 8);
  pop.style.left = left + 'px'; pop.style.top = top + 'px';
  speak(w ? w.h : text);
}
function tagsFor(w) {
  const t = [];
  w.ls.forEach(l => { if (LNAME[l]) t.push(`<span class="tag ppt">${LNAME[l]}</span>`); else if (l === 'MY') t.push(`<span class="tag">My words</span>`); });
  if (w.lv === 1) t.push(`<span class="tag l1">詞表 1 · #${w.n}</span>`);
  if (w.lv === 2) t.push(`<span class="tag l2">詞表 2 · #${w.n}</span>`);
  if (w.alt) t.push(`<span class="tag">also ${esc(w.alt.replace(/\d/g, ''))}</span>`);
  return t.join('');
}
function statusDot(k) { const b = box(k); return `<span class="dot ${b < 0 ? '' : b < 2 ? 's1' : b < 4 ? 's2' : 's3'}"></span>`; }

/* ---- settings drawer */
function closeDrawer() { $$('.scrim,.drawer').forEach(x => x.remove()); }
function drawer(title, body, foot = '') {
  closeDrawer();
  const sc = document.createElement('div'); sc.className = 'scrim'; sc.onclick = closeDrawer;
  const d = document.createElement('aside'); d.className = 'drawer'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', title.replace(/<[^>]+>/g, ''));
  d.innerHTML = `<div class="drawer-h"><h2 style="flex:1">${title}</h2><button class="iconbtn" aria-label="Close">${IC.x}</button></div><div class="drawer-b">${body}</div>${foot ? `<div class="drawer-f">${foot}</div>` : ''}`;
  d.querySelector('.drawer-h .iconbtn').onclick = closeDrawer;
  document.body.append(sc, d);
  return d;
}
function openSettings() {
  const seg = (id, opts, cur) => `<div class="seg" id="${id}">${opts.map(([v, l]) => `<button data-v="${v}" aria-pressed="${String(cur) === String(v)}">${l}</button>`).join('')}</div>`;
  const d = drawer('Settings', `
    <div class="field"><label>Pronunciation guide above characters</label>${seg('s_ph', [['py', 'Pinyin'], ['zy', '注音 Zhuyin'], ['off', 'Hide']], S.set.ph)}
      <span class="small muted">Hide it when you want to test your reading.</span></div>
    <div class="field"><label>English under sentences</label>${seg('s_en', [[true, 'Show'], [false, 'Blur (tap to peek)']], S.set.en)}</div>
    <div class="field"><label>Speaking speed</label>${seg('s_rate', [[0.65, 'Slow'], [0.85, 'Normal'], [1, 'Fast']], S.set.rate)}
      <span class="small muted" id="voiceNote"></span></div>
    <div class="field"><label>Sound effects</label>${seg('s_sfx', [[true, 'On'], [false, 'Off']], S.set.sfx)}</div>
    <div class="field"><label for="s_date">Test date</label><input id="s_date" class="search" type="date" value="${S.testDate}"></div>
    <div class="field"><label>Your progress</label><span class="small muted" id="syncState"></span>
      <span class="small">${Object.keys(S.cards).length} words practiced · ${S.xp} XP · ${S.mocks.length} mock tests</span></div>
    <div class="field"><button class="btn" id="s_reset" style="color:var(--seal)">Erase all progress</button></div>`);
  const bindSeg = (id, key, cast) => $$('#' + id + ' button', d).forEach(b => b.onclick = () => { S.set[key] = cast(b.dataset.v); $$('#' + id + ' button', d).forEach(x => x.setAttribute('aria-pressed', x === b)); save(); applyPhonClass(); if (key === 'ph' && !RUN) go(CUR, PARAMS); if (key === 'rate') speak('你好，我是你的中文老師。'); });
  bindSeg('s_ph', 'ph', String); bindSeg('s_en', 'en', v => v === 'true'); bindSeg('s_rate', 'rate', Number); bindSeg('s_sfx', 'sfx', v => v === 'true');
  $('#s_date', d).onchange = e => { if (e.target.value) { S.testDate = e.target.value; save(); hud(); if (CUR === 'today' && !RUN) go('today'); } };
  const rb = $('#s_reset', d); let armed = false;
  rb.onclick = () => { if (!armed) { armed = true; rb.textContent = 'Tap again to erase everything'; rb.classList.add('seal'); rb.style.color = ''; return; } const keep = { testDate: S.testDate, set: S.set }; S = Object.assign(defState(), keep); save(); closeDrawer(); renderAll(); toast('Progress erased'); };
  $('#voiceNote', d).textContent = !('speechSynthesis' in window) ? 'This browser cannot speak Chinese aloud.' : (voiceChecked && !VOICE) ? 'No Chinese voice found on this device, so audio may not work. On a phone or Chrome, a Chinese voice is usually built in.' : VOICE ? 'Voice: ' + VOICE.name : '';
  syncChip();
}

/* ============================================================ readiness & plan */
function daysLeft() { return dayDiff(today(), S.testDate); }
function lessonWords() { return uniq(LES.flatMap(l => l.words)).map(k => W[k]); }
const coreG = () => Object.keys(G).filter(g => !G[g].bonus && !G[g].later);
function readiness() {
  const lw = lessonWords(); const t1 = deckWords('T1'); const t2 = deckWords('T2');
  const fr = (a, f) => a.length ? a.filter(f).length / a.length : 0;
  const lk = fr(lw, w => known(w.k)), k1 = fr(t1, w => known(w.k)), k2 = fr(t2, w => seen(w.k) && box(w.k) >= 1);
  const gk = fr(coreG(), g => (S.gd[g] || 0) >= 2);
  const mb = S.mocks.length ? Math.max(...S.mocks.map(m => m.pct)) / 100 : 0;
  return { pct: Math.round((lk * .33 + k1 * .2 + k2 * .07 + gk * .25 + mb * .15) * 100), lk, k1, k2, gk, mb };
}
const chOf = ws => uniq(ws.flatMap(w => [...w.h].filter(c => HAN.test(c))));
const fracDone = (arr, f) => [arr.filter(f).length, arr.length];
const catTotal = cats => cats.reduce((s, c) => s + ((S.cat[c] || [0, 0])[1]), 0);
const gramOf = ids => ids.flatMap(id => LMAP[id].grammar).filter((g, i, a) => a.indexOf(g) === i);
const PLAN = [
  { day: 1, id: 'd1a', t: 'Read and listen: 預備 + 第一課', d: 'Tap any word for its meaning. Play each line and repeat it out loud.', go: ['lessons', { l: 'L1' }] },
  { day: 1, id: 'd1b', t: 'Learn the 預備 + 第一課 words', d: 'Flip cards until every word has been seen once.', go: ['cards', { deck: 'L1' }], m: () => fracDone(deckWords('L0').concat(deckWords('L1')), w => seen(w.k)) },
  { day: 1, id: 'd1c', t: 'Grammar: 是, 嗎, A-not-A, 很+adj, 呢, 也, 叫/姓', d: 'Read each point, then practice it until it has 2 correct answers.', go: ['grammar', { g: 'g_shi' }], m: () => fracDone(gramOf(['L0', 'L1']), g => (S.gd[g] || 0) >= 2) },
  { day: 1, id: 'd1d', t: 'Learn the 第二課 words + read the dialogues', d: 'Time words, days of the week, daily routine.', go: ['cards', { deck: 'L2' }], m: () => fracDone(deckWords('L2'), w => seen(w.k)) },
  { day: 1, id: 'd1e', t: 'Grammar + drills for 第二課', d: 'Time before the verb, 有/沒有, 不 vs 沒, 幾點, dates.', go: ['grammar', { g: 'g_time_pos' }], m: () => fracDone(gramOf(['L2']), g => (S.gd[g] || 0) >= 2) },
  { day: 1, id: 'd1f', t: 'Write 20 characters from 預備–第二課', d: 'Watch the stroke order, trace once, then write from memory.', go: ['write', { deck: 'L1' }], m: () => { const [a] = fracDone(chOf(['L0', 'L1', 'L2'].flatMap(deckWords)), c => S.written[c]); return [Math.min(a, 20), 20]; } },
  { day: 2, id: 'd2a', t: 'Review cards that are due', d: 'Spaced repetition: yesterday\'s words come back now.', go: ['cards', { deck: 'LALL' }], m: () => { const ws = lessonWords().filter(w => seen(w.k)); return [ws.filter(w => !due(w.k)).length, Math.max(1, ws.length)]; } },
  { day: 2, id: 'd2b', t: '第三課 買生日禮物: words + texts', d: 'Gifts, colors, money, measure words.', go: ['cards', { deck: 'L3' }], m: () => fracDone(deckWords('L3'), w => seen(w.k)) },
  { day: 2, id: 'd2c', t: '第四課 你要咖啡還是茶？: words + texts', d: 'Drinks, ordering food, big numbers, seasons.', go: ['cards', { deck: 'L4' }], m: () => fracDone(deckWords('L4'), w => seen(w.k)) },
  { day: 2, id: 'd2d', t: '第五課 我的錢包在哪裡？: words + texts', d: 'Rooms, furniture, 上面/下面/裡面/旁邊.', go: ['cards', { deck: 'L5' }], m: () => fracDone(deckWords('L5'), w => seen(w.k)) },
  { day: 2, id: 'd2e', t: 'Grammar for 第三～五課', d: 'Measure words, 二/兩, 都, 還是, 太…了, 最, 在 vs 有, 吧…', go: ['grammar', { g: 'g_mw' }], m: () => fracDone(gramOf(['L3', 'L4', 'L5']), g => (S.gd[g] || 0) >= 2) },
  { day: 2, id: 'd2f', t: 'Drills: prices, big numbers, measure words, where things are', d: '25 answers across those drills.', go: ['drills', {}], m: () => [Math.min(25, catTotal(['money', 'place'])), 25] },
  { day: 2, id: 'd2g', t: 'Write 20 characters from 第三～五課', d: 'Use dictation mode: hear the word, write it from memory.', go: ['write', { deck: 'L4', mode: 'dict' }], m: () => { const [a] = fracDone(chOf(['L3', 'L4', 'L5'].flatMap(deckWords)), c => S.written[c]); return [Math.min(a, 20), 20]; } },
  { day: 3, id: 'd3a', t: '第六課 週末去打網球吧！: words + texts', d: 'Sports, movies, hobbies.', go: ['cards', { deck: 'L6' }], m: () => fracDone(deckWords('L6'), w => seen(w.k)) },
  { day: 3, id: 'd3b', t: 'Grammar for 第六課: 會, V得, 吧, 覺得, 有一點…', d: 'The newest points — practice each one twice.', go: ['grammar', { g: 'g_hui' }], m: () => fracDone(gramOf(['L6']), g => (S.gd[g] || 0) >= 2) },
  { day: 3, id: 'd3c', t: 'Clear your weak words', d: 'Every word you missed comes back until you get it right.', go: ['cards', { deck: 'weak' }], m: () => { const n = deckWords('weak').length; return [n ? 0 : 1, 1]; } },
  { day: 3, id: 'd3d', t: 'Speed-sweep the vocab table, Level 1', d: 'Quick 4-choice rounds through the 401 words your teacher gave you.', go: ['cards', { deck: 'T1', mode: 'speed' }], m: () => fracDone(deckWords('T1'), w => seen(w.k)) },
  { day: 3, id: 'd3e', t: 'Look-alike characters and radicals', d: '買/賣, 午/牛, 未/末, 已/己… the classic test traps.', go: ['drills', {}], m: () => [Math.min(20, catTotal(['chars', 'radical'])), 20] },
  { day: 3, id: 'd3f', t: 'Two full mock tests', d: 'Exam conditions. Review every mistake afterwards.', go: ['test', {}], m: () => [Math.min(2, S.mocks.length), 2] },
  { day: 3, id: 'd3g', t: 'Sleep 7+ hours before the test', d: 'Sleep is when memory gets saved. Seriously.' },
];const taskDone = t => !!S.plan[t.id] || (t.m && (() => { const [a, b] = t.m(); return b > 0 && a >= b; })());
