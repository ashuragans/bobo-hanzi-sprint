/* ============================================================ GAME LAYER: mascot, levels, pearls, quests, achievements */
const O_ = '#3B2A20';
const FLAVORS = { milk: ['奶茶', 'Milk tea', '#DDAA74', 0], taro: ['芋頭', 'Taro', '#BBA0DC', 60], matcha: ['抹茶', 'Matcha', '#A9CC84', 60], straw: ['草莓', 'Strawberry', '#F5AFBF', 80], mango: ['芒果', 'Mango', '#F7C654', 80], brown: ['黑糖', 'Brown sugar', '#A9703F', 120] };
const ACCS = { none: ['不戴', 'Nothing', 0], band: ['必勝頭巾', '“Must win” headband', 30], glasses: ['眼鏡', 'Round glasses', 40], bow: ['蝴蝶結', 'Pink bow', 40], phones: ['耳機', 'Headphones', 70], cap: ['學士帽', 'Graduation cap', 100], crown: ['皇冠', 'Golden crown', 180] };
let MID = 0;
function accSVG(a) {
  const O = O_;
  return ({
    band: `<g class="acc"><rect x="25" y="64" width="70" height="11" fill="#fff" stroke="${O}" stroke-width="2"/><circle cx="60" cy="69.5" r="3.4" fill="#E8574A"/><text x="40" y="73.3" font-size="8" font-weight="700" fill="#E8574A" font-family="serif">必</text><text x="72" y="73.3" font-size="8" font-weight="700" fill="#E8574A" font-family="serif">勝</text><path d="M95 66 L109 59 L105 70 Z M95 72 L108 80 L100 81 Z" fill="#fff" stroke="${O}" stroke-width="1.6" stroke-linejoin="round"/></g>`,
    glasses: `<g class="acc" stroke="${O}" stroke-width="2.6" fill="#fff" fill-opacity=".18"><circle cx="47" cy="87" r="9.5"/><circle cx="73" cy="87" r="9.5"/><path d="M56.5 86 Q60 83 63.5 86" fill="none"/></g>`,
    bow: `<g class="acc" transform="translate(31 45)" stroke="${O}" stroke-width="2" stroke-linejoin="round"><path d="M0 0 L-13 -8 L-12 8 Z" fill="#F07CA0"/><path d="M0 0 L13 -8 L12 8 Z" fill="#F07CA0"/><circle r="4" fill="#F59BB9"/></g>`,
    phones: `<g class="acc"><path d="M17 70 Q17 16 60 15 Q103 16 103 70" fill="none" stroke="${O}" stroke-width="5"/><path d="M17 70 Q17 16 60 15 Q103 16 103 70" fill="none" stroke="#4A7BD8" stroke-width="2.2"/><rect x="9" y="62" width="15" height="24" rx="7" fill="#4A7BD8" stroke="${O}" stroke-width="2.5"/><rect x="96" y="62" width="15" height="24" rx="7" fill="#4A7BD8" stroke="${O}" stroke-width="2.5"/></g>`,
    cap: `<g class="acc" stroke="${O}" stroke-width="2.2" stroke-linejoin="round"><rect x="43" y="27" width="34" height="11" rx="2" fill="#2E2E38"/><path d="M60 12 L99 25 L60 38 L21 25 Z" fill="#2E2E38"/><path d="M91 27 L91 45" stroke="#F2B33D" stroke-width="2.5"/><circle cx="91" cy="47" r="3.2" fill="#F2B33D" stroke-width="1.5"/></g>`,
    crown: `<g class="acc" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"><path d="M40 40 L43 20 L52 31 L60 13 L68 31 L77 20 L80 40 Z" fill="#F4C64E"/><circle cx="60" cy="31" r="3" fill="#E8574A" stroke-width="1.5"/><circle cx="48" cy="35" r="2.2" fill="#4A7BD8" stroke-width="1.2"/><circle cx="72" cy="35" r="2.2" fill="#3FAE6B" stroke-width="1.2"/></g>`,
  })[a] || '';
}
function mascotSVG({ mood = 'idle', size = 96, flavor, acc, cls = '' } = {}) {
  const W_ = S.ward || {};
  const fl = FLAVORS[flavor || W_.flavor] || FLAVORS.milk, ac = acc ?? W_.acc ?? 'none', O = O_;
  const id = 'bbc' + (++MID);
  const cup = 'M24 60 L96 60 L88 133 Q87 139 81 139 L39 139 Q33 139 32 133 Z';
  const happy = mood === 'happy' || mood === 'cheer';
  const eyes = happy ? `<g fill="none" stroke="${O}" stroke-width="3.6" stroke-linecap="round"><path d="M41 89 Q47 81 53 89"/><path d="M67 89 Q73 81 79 89"/></g>`
    : mood === 'sleep' ? `<g fill="none" stroke="${O}" stroke-width="3.2" stroke-linecap="round"><path d="M41 86 Q47 92 53 86"/><path d="M67 86 Q73 92 79 86"/></g>`
    : `<g class="bb-eyes"><ellipse cx="47" cy="87" rx="5.2" ry="6.6" fill="${O}"/><ellipse cx="73" cy="87" rx="5.2" ry="6.6" fill="${O}"/><circle cx="49" cy="84.4" r="1.9" fill="#fff"/><circle cx="75" cy="84.4" r="1.9" fill="#fff"/></g>`;
  const mouth = ({ idle: `<path d="M54 99 Q60 105 66 99" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    happy: `<path d="M52 97 Q60 111 68 97 Z" fill="#7A2B22" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/><path d="M56 104.5 Q60 108.5 64 104.5" fill="#EF8080"/>`,
    cheer: `<path d="M50 96 Q60 114 70 96 Z" fill="#7A2B22" stroke="${O}" stroke-width="2.4" stroke-linejoin="round"/><path d="M55 105.5 Q60 110.5 65 105.5" fill="#EF8080"/>`,
    sad: `<path d="M54 105 Q60 98.5 66 105" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    think: `<path d="M55 102 Q61 100 66 101" stroke="${O}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    sleep: `<ellipse cx="60" cy="102" rx="3" ry="2.4" fill="#7A2B22"/>`,
    wow: `<ellipse cx="60" cy="102" rx="4.5" ry="5.6" fill="#7A2B22" stroke="${O}" stroke-width="2"/>` })[mood] || '';
  const up = happy;
  const armL = up ? 'M27 86 Q16 74 15 62' : 'M27 92 Q15 98 14 108';
  const armR = up ? 'M93 86 Q104 74 105 62' : mood === 'think' ? 'M93 94 Q104 92 99 81' : 'M93 92 Q105 98 106 108';
  const hand = d => { const m = d.match(/(-?\d+\.?\d*) (-?\d+\.?\d*)$/); return `<circle cx="${m[1]}" cy="${m[2]}" r="4.2" fill="${fl[2]}" stroke="${O}" stroke-width="2.4"/>`; };
  const pearls = [[38, 131], [48.5, 134], [59, 131.5], [69.5, 134], [80, 131], [43, 123.5], [64, 124.5], [75, 123], [54, 125.5]]
    .map(([x, y], i) => `<g class="bb-pearl" style="animation-delay:${(i * .17).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="4.9" fill="${O}"/><circle cx="${x - 1.6}" cy="${y - 1.7}" r="1.4" fill="#fff" fill-opacity=".45"/></g>`).join('');
  return `<svg class="bobo m-${mood} ${cls}" viewBox="0 0 120 150" width="${size}" height="${Math.round(size * 1.25)}" role="img" aria-label="波波 the bubble-tea mascot">
    <ellipse class="bb-shadow" cx="60" cy="146" rx="30" ry="4" fill="#000" opacity=".13"/>
    <g class="bb-body">
      <g class="bb-straw"><rect x="66" y="-2" width="10" height="62" rx="5" transform="rotate(12 71 50)" fill="#E8574A" stroke="${O}" stroke-width="2.6"/><path d="M68 10 L77 12 M66 22 L75 24" transform="rotate(12 71 50)" stroke="#fff" stroke-opacity=".55" stroke-width="2.5"/></g>
      <path d="M22 52 Q60 20 98 52 Z" fill="#fff" fill-opacity=".92" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M36 44 Q46 33 58 31" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      <rect x="17" y="50" width="86" height="10" rx="5" fill="#fff" stroke="${O}" stroke-width="3"/>
      <clipPath id="${id}"><path d="${cup}"/></clipPath>
      <path d="${cup}" fill="${fl[2]}"/>
      <g clip-path="url(#${id})"><rect x="24" y="60" width="72" height="7" fill="#fff" opacity=".28"/><rect x="31" y="66" width="6" height="62" rx="3" fill="#fff" opacity=".28"/>${pearls}</g>
      <path d="${cup}" fill="none" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>
      <ellipse cx="38" cy="99" rx="5.5" ry="3.4" fill="#F28C8C" opacity=".55"/><ellipse cx="82" cy="99" rx="5.5" ry="3.4" fill="#F28C8C" opacity=".55"/>
      ${eyes}${mouth}${mood === 'sad' ? `<path class="bb-tear" d="M81 93 Q84.5 99 81 102.5 Q77.5 99 81 93Z" fill="#6CB6FF" stroke="${O}" stroke-width="1"/>` : ''}
      <g class="bb-arm l"><path d="${armL}" fill="none" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="${armL}" fill="none" stroke="${fl[2]}" stroke-width="2.4" stroke-linecap="round"/>${hand(armL)}</g>
      <g class="bb-arm r"><path d="${armR}" fill="none" stroke="${O}" stroke-width="6" stroke-linecap="round"/><path d="${armR}" fill="none" stroke="${fl[2]}" stroke-width="2.4" stroke-linecap="round"/>${hand(armR)}</g>
      ${accSVG(ac)}
    </g>${mood === 'sleep' ? `<text class="bb-z" x="96" y="44" font-size="15" font-weight="700" fill="${O}">z</text>` : ''}</svg>`;
}

/* ---- levels & ranks */
const levelOf = xp => { let n = 1; while (xp >= 25 * n * (n + 1)) n++; return n; };
const levelFloor = n => 25 * (n - 1) * n;
const RANKS = [[1, '新同學', 'New classmate'], [3, '好學生', 'Good student'], [5, '小老師', 'Little teacher'], [8, '中文高手', 'Chinese pro'], [12, '華語大師', 'Mandarin master']];
const rankOf = n => RANKS.filter(r => n >= r[0]).pop();
const knownCount = () => Object.values(S.cards).filter(c => c[0] >= 2).length;

/* ---- pearls */
function addPearls(n, fly = true) { if (!n) return; S.pearls = (S.pearls || 0) + n; hud(); if (fly) flyPearls(n); }
function flyPearls(n) {
  const pill = $('#pearlPill'); if (!pill || !n || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = pill.getBoundingClientRect(); if (!r.width) return;
  const k = Math.min(10, Math.max(3, n));
  for (let i = 0; i < k; i++) {
    const p = document.createElement('span'); p.className = 'pfly'; p.innerHTML = PEARL;
    const sx = innerWidth / 2 + (Math.random() - .5) * 140, sy = innerHeight * .42 + (Math.random() - .5) * 80;
    p.style.left = sx + 'px'; p.style.top = sy + 'px';
    p.style.setProperty('--dx', (r.left + r.width / 2 - sx) + 'px'); p.style.setProperty('--dy', (r.top + r.height / 2 - sy) + 'px');
    p.style.animationDelay = (i * 70) + 'ms';
    document.body.appendChild(p); setTimeout(() => p.remove(), 1400 + i * 70);
  }
  setTimeout(() => { pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump'); sfx('coin'); }, 900);
}

/* ---- daily quests */
const QDEF = { xp: ['⚡', 'Earn 100 XP', 100], lessons: ['📚', 'Finish 2 lessons', 2], combo: ['🔥', 'Get 8 right in a row', 8], perfect: ['💯', 'Finish a lesson with no mistakes', 1],
  listen: ['🎧', 'Get 8 listening questions right', 8], write: ['🖌️', 'Write 6 characters', 6], words: ['🌱', 'Learn 8 new words', 8], test: ['📝', 'Finish a practice test', 1] };
const hashStr = s => { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); };
function questsToday() {
  const t = today();
  if (!S.quests || S.quests.date !== t) {
    const others = ['lessons', 'combo', 'perfect', 'listen', 'write', 'words', 'test'];
    const h = hashStr(t); const a = others[h % others.length]; let b = others[(h >> 4) % others.length]; if (b === a) b = others[(others.indexOf(a) + 3) % others.length];
    S.quests = { date: t, items: ['xp', a, b].map(id => ({ id, n: 0, claimed: false })) };
  }
  return S.quests;
}
function questEvent(id, amt = 1, isMax = false) {
  const Q = questsToday();
  Q.items.forEach(it => {
    if (it.id !== id || it.claimed) return;
    const g = QDEF[id][2], before = it.n;
    it.n = Math.min(g, isMax ? Math.max(it.n, amt) : it.n + amt);
    if (before < g && it.n >= g) setTimeout(() => popup(`<span class="pp-ic">${chestSVG(false, 40)}</span><span><b>Quest complete!</b><br><span class="small">${esc(QDEF[id][1])} — claim your chest</span></span>`), 300);
  });
}
function questsHTML(compact) {
  const Q = questsToday();
  return `<div class="quests">${Q.items.map((it, i) => { const [ic, t, g] = QDEF[it.id]; const done = it.n >= g;
    return `<div class="quest ${done ? 'done' : ''} ${it.claimed ? 'claimed' : ''}"><span class="q-ic">${ic}</span><div class="q-mid"><div class="q-t">${esc(t)}</div><div class="q-bar"><i style="width:${it.n / g * 100}%"></i><span class="nums">${it.n} / ${g}</span></div></div>
      ${it.claimed ? `<span class="q-chest">${chestSVG(true, 38)}</span>` : done ? `<button class="btn3d sm gold" data-claim="${i}">Claim</button>` : `<span class="q-chest dim">${chestSVG(false, 38)}</span>`}</div>`; }).join('')}</div>`;
}
function bindClaims(root, rerender) {
  $$('[data-claim]', root).forEach(b => b.onclick = async () => {
    const it = questsToday().items[+b.dataset.claim]; if (it.claimed) return;
    it.claimed = true; save();
    await openChest(15 + (Math.random() * 16 | 0), 'Daily quest');
    rerender && rerender();
  });
}

/* ---- achievements */
const ACH = [
  ['first', '🎉', 'First steps', 'Finish your first lesson', s => s.totals.sessions >= 1, 10],
  ['perfect', '💯', 'Flawless', 'Finish a lesson with no mistakes', s => s.totals.perfect >= 1, 15],
  ['combo10', '🔥', 'On fire', 'Get 10 answers right in a row', s => (s.bestCombo || 0) >= 10, 15],
  ['streak3', '📅', 'Three days strong', 'Study 3 days in a row', s => s.streak.n >= 3, 20],
  ['words50', '🌱', 'Sprouting', 'Know 50 words', () => knownCount() >= 50, 15],
  ['words150', '🌳', 'Word forest', 'Know 150 words', () => knownCount() >= 150, 30],
  ['words300', '🏯', 'Word tower', 'Know 300 words', () => knownCount() >= 300, 50],
  ['brush20', '🖌️', 'Brush apprentice', 'Write 20 different characters', s => Object.keys(s.written).length >= 20, 15],
  ['brush80', '🎴', 'Calligrapher', 'Write 80 different characters', s => Object.keys(s.written).length >= 80, 40],
  ['ear', '🎧', 'Sharp ears', 'Get 30 listening questions right', s => ((s.cat.listen || [0])[0]) >= 30, 20],
  ['unit', '🏆', 'Unit champion', 'Finish every level in one unit', s => UNITS.some(u => u.nodes.every(nd => (s.path[nd.id] || 0) >= 1)), 30],
  ['chest', '🧰', 'Treasure hunter', 'Open 5 chests', s => (s.totals.chests || 0) >= 5, 20],
  ['last100', '📜', 'Payback', 'Score 100% on your last-test redo', s => s.mocks.some(m => m.type === 'last' && m.pct === 100), 40],
  ['ready', '🎓', 'Test ready', 'Score 80%+ on a teacher-style test', s => s.mocks.some(m => (m.type === 'teacher' || m.type === 'midstyle') && m.pct >= 80), 40],
  ['shop', '🛍️', 'Fashionista', 'Buy something for 波波', s => (s.ward.owned || []).length > 2, 10],
  ['level5', '⭐', 'Little teacher', 'Reach level 5', s => levelOf(s.xp) >= 5, 30],
  ['night', '🌙', 'Night owl', 'Study after 10 p.m.', s => (s.totals.night || 0) > 0, 10],
];
function checkAch() {
  const out = [];
  ACH.forEach(a => { if (!S.ach[a[0]] && a[4](S)) { S.ach[a[0]] = today(); S.pearls += a[5]; out.push(a); } });
  if (out.length) { save(); hud(); out.forEach((a, i) => setTimeout(() => { popup(`<span class="pp-medal">${a[1]}</span><span><b>Achievement unlocked</b><br><span class="small">${esc(a[2])} · +${a[5]} pearls</span></span>`, 'ach'); sfx('level'); }, i * 1700)); }
}
let POPQ = Promise.resolve();
function popup(html, cls = '') {
  POPQ = POPQ.then(() => new Promise(res => {
    const p = document.createElement('div'); p.className = 'popup ' + cls; p.setAttribute('role', 'status'); p.innerHTML = html;
    document.body.appendChild(p); setTimeout(() => { p.classList.add('out'); setTimeout(() => { p.remove(); res(); }, 350); }, 2600);
  }));
}
function onXP(n) {
  questEvent('xp', n);
  const h = new Date().getHours(); if (h >= 22 || h < 4) S.totals.night = (S.totals.night || 0) + 1;
}

/* ---- chest, level up */
function chestSVG(open, size = 120) {
  const O = O_;
  return `<svg class="chest ${open ? 'open' : ''}" viewBox="0 0 120 100" width="${size}" height="${Math.round(size * .83)}" aria-hidden="true">
    <g class="ch-base"><rect x="14" y="46" width="92" height="46" rx="6" fill="#B8692C" stroke="${O}" stroke-width="3"/><rect x="14" y="60" width="92" height="7" fill="#F2B33D" stroke="${O}" stroke-width="2"/><rect x="51" y="55" width="18" height="19" rx="3" fill="#F2B33D" stroke="${O}" stroke-width="2.5"/><circle cx="60" cy="63" r="2.5" fill="${O}"/></g>
    <g class="ch-lid"><path d="M14 48 Q14 18 60 18 Q106 18 106 48 Z" fill="#CF7D38" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><rect x="14" y="41" width="92" height="7" fill="#F2B33D" stroke="${O}" stroke-width="2"/><path d="M30 30 Q42 23 56 22" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none" stroke-linecap="round"/></g></svg>`;
}
function openChest(amount, title = 'Treasure chest') {
  return new Promise(res => {
    const m = modal(`<div class="chest-stage">${chestSVG(false, 150)}<div class="chest-burst"></div></div><h2 class="chest-t">${esc(title)}</h2><p class="muted chest-sub">Tap to open it!</p>`, [['Open', 'gold', null]], 'chestm');
    const btn = m.querySelector('[data-mb="0"]'), stage = m.querySelector('.chest-stage');
    sfx('tap');
    const open = () => {
      if (stage.classList.contains('opened')) { closeModal(); addPearls(amount); S.totals.chests = (S.totals.chests || 0) + 1; save(); checkAch(); return res(); }
      stage.classList.add('opened'); stage.querySelector('.chest').classList.add('open'); sfx('chest');
      const burst = stage.querySelector('.chest-burst');
      for (let i = 0; i < 14; i++) { const p = document.createElement('span'); p.innerHTML = PEARL; const a = Math.PI * (1.1 + Math.random() * .8), d = 70 + Math.random() * 70; p.style.setProperty('--tx', Math.cos(a) * d + 'px'); p.style.setProperty('--ty', Math.sin(a) * d + 'px'); p.style.animationDelay = (i * 25) + 'ms'; burst.appendChild(p); }
      m.querySelector('.chest-sub').innerHTML = `<b class="chest-amt">${PEARL} +${amount} pearls</b>`;
      btn.textContent = 'Collect';
    };
    btn.onclick = open; stage.onclick = () => { if (!stage.classList.contains('opened')) open(); };
  });
}
function levelUp(l) {
  return new Promise(res => {
    const r = rankOf(l), newRank = RANKS.some(x => x[0] === l);
    modal(`<div class="lvl-stage"><div class="rays"></div>${mascotSVG({ mood: 'cheer', size: 130 })}</div><div class="lvl-num">Level ${l}</div>
      <h2 class="han">${newRank ? '新等級：' + r[1] : '升級了！'}</h2><p class="muted">${newRank ? 'New rank: ' + r[2] : 'You leveled up! Keep it going.'}</p>`, [['Awesome!', 'primary', () => { closeModal(); res(); }]], 'lvlm');
    sfx('level'); setTimeout(confetti, 200);
  });
}
async function afterRewards(after, lvl0) {
  if (after.msg) toast(after.msg);
  if (after.chest) await openChest(after.chest, after.chestTitle || 'Checkpoint chest');
  const l = levelOf(S.xp); if (l > lvl0) await levelUp(l);
  checkAch(); hud();
}

/* ============================================================ LEARNING PATH */
const UCOL = ['jade', 'sky', 'taro', 'tea', 'pink', 'seal', 'gold'];
const NODE_FACE = { words: '字', grammar: '法', story: '讀', listen: '聽', write: '寫', check: '考', test: '考', sweep: '詞', lmix: '聽' };
const UNITS = [
  ...LES.map((L, i) => ({ id: L.id, idx: i, zh: L.num, name: L.name, en: L.en, color: UCOL[i % UCOL.length],
    nodes: [{ t: 'words', part: 0, title: '生詞 1', en: 'Words 1' }, { t: 'words', part: 1, title: '生詞 2', en: 'Words 2' }, { t: 'grammar', title: '語法', en: 'Grammar' },
      { t: 'story', title: '課文', en: 'Dialogue' }, { t: 'words', part: 2, title: '生詞 3', en: 'Words 3' }, { t: 'listen', title: '聽力', en: 'Listening' },
      { t: 'write', title: '寫字', en: 'Writing' }, { t: 'check', title: '單元考', en: 'Checkpoint' }].map((n, j) => Object.assign(n, { id: L.id + '-' + j, unit: L.id })) })),
  { id: 'FIN', idx: LES.length, zh: '衝刺', name: '考前衝刺', en: 'Final sprint before the test', color: 'seal',
    nodes: [{ t: 'test', which: 'last', title: '上次的考卷', en: 'Your last test' }, { t: 'lmix', title: '聽力 A/B/C', en: 'Listening mix' }, { t: 'sweep', deck: 'T1', title: '詞表 1', en: 'Vocab table 1' },
      { t: 'test', which: 'teacher', title: '老師式考卷', en: 'Teacher-style test' }, { t: 'sweep', deck: 'T2', title: '詞表 2', en: 'Vocab table 2' }, { t: 'test', which: 'mock', title: '模擬考', en: 'Mixed mock test' },
      { t: 'test', which: 'mid', title: '期中考', en: 'Your midterm' }, { t: 'test', which: 'midstyle', title: '期中考式', en: 'New midterm-style test' }]
      .map((n, j) => Object.assign(n, { id: 'FIN-' + j, unit: 'FIN' })) }];
const NODES = UNITS.flatMap(u => u.nodes);
const nodeCount = id => S.path[id] || 0;
function nodeOpen(u, j) { return j === 0 || nodeCount(u.nodes[j - 1].id) >= 1; }
function currentNode() { for (const u of UNITS) for (let j = 0; j < u.nodes.length; j++) if (nodeOpen(u, j) && !nodeCount(u.nodes[j].id)) return u.nodes[j]; return null; }
function nodeDesc(nd) {
  const L = LMAP[nd.unit];
  return ({ words: `Meet new words from ${L ? L.num : ''} with sound, pictures and memory tricks, then quick quizzes.`,
    grammar: L ? 'Grammar: ' + L.grammar.slice(0, 4).map(g => G[g].t.split(' — ')[0]).join(' · ') + (L.grammar.length > 4 ? ' …' : '') : '',
    story: 'Read and listen to a dialogue, then answer questions and rebuild its sentences.',
    listen: 'Hear a sentence, pick the picture A, B or C — like your teacher\'s listening test.',
    write: 'Watch the stroke order, trace it, then write characters from memory.',
    check: 'Mixed questions in your teacher\'s style. Score 60% to pass and open the chest.',
    test: { last: 'Every question from the test your teacher gave you.', teacher: 'A full new test in your teacher\'s format.', mock: '40 mixed questions with a 30-minute timer.', mid: 'The reading part of your midterm, exactly as on the paper.', midstyle: 'A new test in your midterm\'s format, different every time.' }[nd.which],
    lmix: '10 listening questions: times, prices, food, places and more.',
    sweep: `Fast 4-choice round through ${nd.deck === 'T1' ? 'Level 1' : 'Level 2'} of the vocab table.` })[nd.t];
}
const lessonWordsOf = L => LMAP[L].words.map(k => W[k]).filter(w => w && HAN.test(w.h));
const thirds = a => { const n = Math.ceil(a.length / 3); return [a.slice(0, n), a.slice(n, 2 * n), a.slice(2 * n)]; };
function teachWord(w) {
  const ex = exampleFor(w);
  return { kind: 'teach', label: '新詞 · New word', say: w.h,
    html: `<div class="teach"><div class="tzg ${w.h.length > 3 ? 'sm' : w.h.length > 2 ? 'md' : ''}">${[...w.h].map(c => `<span><i>${esc(c)}</i></span>`).join('')}</div>
      <div class="row" style="justify-content:center;gap:10px"><span class="bigpy">${esc(phon(w.p))}</span><button class="playbtn" style="margin:0" data-say="${esc(w.h)}" aria-label="Play">${IC.sound}</button></div>
      <div class="bigen">${w.em ? `<span style="font-size:1.6em;vertical-align:-.15em">${w.em}</span> ` : ''}${esc(w.e)}</div>
      ${ex ? `<div class="exline"><div class="zh">${ruby(ex[0])}</div><div class="small muted">${esc(ex[1])}</div></div>` : ''}${mnemoHTML(w.h)}</div>`,
    onShow: () => { if (!S.cards[w.k]) { S.cards[w.k] = [0, Date.now() + 60000, 0, 0]; questEvent('words'); save(); } } };
}
function teachGrammar(g) {
  const x = G[g];
  return { kind: 'teach', label: '語法 · Grammar tip', say: null,
    html: `<div class="teach left"><h2 style="font-size:1.25rem">${esc(x.t)}</h2><div class="pattern">${esc(x.p)}</div><p>${esc(x.x)}</p>
      ${x.ex.slice(0, 2).map(([t, e]) => `<div class="ex"><div class="zh">${ruby(t)}</div><button class="playbtn" style="margin-top:6px" data-say="${esc(plainZh(t))}" aria-label="Play">${IC.sound}</button><div class="en">${esc(e)}</div></div>`).join('')}
      ${x.wr[0] ? `<div class="mistake"><div><span class="mark x">✗</span><span class="bad">${esc(x.wr[0][0])}</span></div><div><span class="mark o">✓</span><span class="good">${esc(x.wr[0][1])}</span></div><div class="why">${esc(x.wr[0][2])}</div></div>` : ''}</div>` };
}
function teachChar(c, w) {
  return { kind: 'teach', label: '筆順 · Watch the stroke order', say: w ? w.h : c,
    html: `<div class="teach"><div class="wq-hint">${w ? `<span class="han" style="font-size:1.4rem">${[...w.h].map(x => x === c ? `<b style="color:var(--jade)">${x}</b>` : esc(x)).join('')}</span> <b style="color:var(--jade)">${esc(phon(w.p))}</b> · ${esc(w.e)}` : ''}</div>
      <div class="hwbox" style="width:min(240px,64vw)">${GRID}<div class="hw" id="tchw"></div></div>${MN[c] ? `<div class="mn" style="max-width:420px"><span class="c">${c}</span><span class="s"><b>${esc(MN[c][0])}</b><br>${esc(MN[c][1])}</span></div>` : ''}</div>`,
    onShow: body => { if (!hwOK()) return; loadStrokes().then(() => { const host = $('#tchw', body); if (!host || !host.isConnected || !STROKES[c]) return; const wr = makeWriter(host, c, { showCharacter: false, strokeAnimationSpeed: 1.3 }); wr.loopCharacterAnimation(); }).catch(() => {}); } };
}
function storyTeach(tx) {
  return { kind: 'teach', label: '課文 · Read and listen', say: null,
    html: `<div class="teach left"><div class="row" style="justify-content:space-between"><h2 style="font-size:1.15rem">${esc(tx.title)}</h2><button class="btn3d sm sky" id="playall">${IC.play}Play all</button></div>
      <div class="dialog">${tx.lines.map(([sp, toks, en], li) => `<div class="line" data-li="${li}"><div class="who ${SPK[sp] || ''}">${esc(sp)}</div><div style="min-width:0"><div class="zh">${ruby(toks)}</div><div class="en" style="filter:none">${esc(en)}</div></div><button class="playbtn" data-say="${esc(plainZh(toks))}" aria-label="Play line">${IC.sound}</button></div>`).join('')}</div>
      ${tx.note ? `<p class="tiny faint">${esc(tx.note)}</p>` : ''}</div>`,
    onShow: body => { const b = $('#playall', body); if (b) b.onclick = async () => { stopSpeak(); const t0 = speakToken; for (let i = 0; i < tx.lines.length; i++) { const row = $(`.line[data-li="${i}"]`, body); if (!row) return; $$('.line.playing', body).forEach(r => r.classList.remove('playing')); row.classList.add('playing'); row.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); await speak(plainZh(tx.lines[i][1])); if (speakToken > t0 + i + 1) return; } $$('.line.playing', body).forEach(r => r.classList.remove('playing')); }; } };
}
function sessWrite(L) {
  const all = lessonWordsOf(L);
  const freq = {}; all.forEach(w => [...w.h].forEach(c => { if (HAN.test(c)) freq[c] = (freq[c] || 0) + 1; }));
  if (!hwOK()) return sampleN(all, 8).map(w => qVocab(w, pick(['e2h', 'p2h']), all));
  const chars = Object.keys(freq).filter(c => DATA.charsWithStrokes.includes(c)).sort((a, b) => ((S.written[a] || 0) - (S.written[b] || 0)) || (freq[b] - freq[a])).slice(0, 3);
  const wordFor = c => all.filter(w => w.h.includes(c)).sort((a, b) => a.h.length - b.h.length)[0];
  const hint = (c, w) => w ? `<span class="han" style="font-size:1.4rem">${[...w.h].map(x => x === c ? `<b style="color:var(--jade)">${x}</b>` : esc(x)).join('')}</span> <b style="color:var(--jade)">${esc(phon(w.p))}</b> · ${esc(w.e)}` : '';
  const qs = [];
  chars.forEach(c => { const w = wordFor(c); qs.push(teachChar(c, w), { kind: 'write', cat: 'write', mode: 'trace', char: c, label: '描 · Trace the character', hint: hint(c, w), explain: '' }); });
  chars.forEach(c => { const w = wordFor(c); qs.push({ kind: 'write', cat: 'write', mode: 'memory', char: c, label: '默寫 · Write it from memory', hint: hint(c, w), explain: '' }); });
  return qs;
}
/* ---- adaptive path sessions */
const withRetry = (q, g) => { if (q && !q.retry) q.retry = () => qGrammarFor(g); return q; };
function sessGrammar(L) {
  const gl = LMAP[L].grammar.filter(g => G[g]);
  const gs = gl.slice().sort((a, b) => (S.gd[a] || 0) - (S.gd[b] || 0)).slice(0, 2);
  const qs = [];
  gs.forEach(g => {
    if ((S.gd[g] || 0) < 3) qs.push(teachGrammar(g));
    sampleN(DRILLS.filter(d => d.g === g), (S.gd[g] || 0) >= 3 ? 1 : 2).forEach(d => qs.push(withRetry(qFromDrill(d), g)));
    for (let i = 0; i < 2; i++) { const q = qGrammarFor(g, { L }); if (q) qs.push(withRetry(q, g)); }
  });
  const others = gl.filter(g => !gs.includes(g));
  for (let i = 0, n = Math.max(3, 12 - qs.length); i < n; i++) { const g = pick(others.length ? others : gl); const q = qGrammarFor(g, { L }); if (q) qs.push(withRetry(q, g)); }
  return qs.filter(Boolean);
}
function sessStory(L, nid) {
  const LL = LMAP[L], n = nodeCount(nid), ti = n < 3 ? n % LL.texts.length : Math.random() * LL.texts.length | 0, tx = LL.texts[ti]; // after level 3, any of the lesson's texts
  const qs = [storyTeach(tx)];
  DATA.reading.filter(r => r.text === `${L}-${ti}`).slice(0, 3).forEach(r => qs.push(qReading(r)));
  const lines = SENTS.filter(x => x.id.startsWith(`${L}-${ti}-`));
  shuffle(lines).slice(0, 3).forEach((x, i) => { const q = i === 1 && ttsOK() ? qSentHear(x, {}) : qSentRead(x, {}); if (q) { q.hidePy = dialLv() >= 2; qs.push(q); } });
  shuffle(lines).filter(x => x.toks.filter(t => t[1]).length <= 7).slice(0, 2).forEach(x => { const q = qSentBuild(x, {}); if (q) qs.push(q); });
  qs.push(...genChoiceSet(2, { L }), genFrame({ L })); // replies and who / when / where / what
  const inText = uniq(tx.lines.flatMap(l => l[1].map(t => t[0]))).map(h => H2W[h]).filter(w => w && w.h.length >= 2 && HAN.test(w.h));
  sampleN(inText, 3).forEach(w => qs.push(qFor(w, { L, pool: lessonWordsOf(L) })));
  return qs.filter(Boolean);
}
function sessListen(L) {
  const all = lessonWordsOf(L), qs = [], met = all.filter(w => seen(w.k));
  if (ttsOK()) {
    for (let i = 0; i < 4; i++) qs.push(qListenPic());
    for (let i = 0; i < 3; i++) { const x = genAny({ L, prefSeen: true }) || pick(SENTS.filter(y => y.L === L)); if (x) qs.push(qSentHear(x, {})); }
    sampleN(met.length >= 3 ? met : all, 3).forEach(w => qs.push(qWord(w, stageOf(w.k) >= 3 ? 'hearM' : 'hearH', Math.max(2, stageOf(w.k)), all)));
  } else {
    for (let i = 0; i < 4; i++) { const x = genAny({ L, prefSeen: true }) || pick(SENTS.filter(y => y.L === L)); if (x) qs.push(qSentRead(x, {})); }
    sampleN(all, 4).forEach(w => qs.push(qWord(w, 'py2h', 2, all)));
  }
  return shuffle(qs.filter(Boolean)).map(q => { if (q.k && !q.retry && W[q.k]) { const w = W[q.k]; q.retry = () => qFor(w, { lvl: 2, pool: all }); } return q; });
}
function sessCheck(L) {
  const LL = LMAP[L], all = lessonWordsOf(L), qs = [];
  sampleN(LL.grammar.filter(g => G[g]), 3).forEach(g => { const q = qGrammarFor(g, { L }); if (q) qs.push(withRetry(q, g)); });
  const go_ = genOrderQ({ L, prefSeen: true });
  if (go_) qs.push(qOrderNum(go_)); else sampleN(DRILLS.filter(d => d.k === 'order' && LL.grammar.includes(d.g)), 1).forEach(d => qs.push(qOrderNum({ t: d.t, a: d.a, en: d.en })));
  const sp = { L0: [qLook], L1: [qLook, () => qReading(pick(DATA.reading.filter(r => r.text.startsWith('L1'))))], L2: [qClock, qDate], L3: [qMW, qPrice], L4: [qBigNum, qMW], L5: [qLocation, qLocation], L6: [qListenPic, () => qReading(pick(DATA.reading.filter(r => r.text.startsWith('L6'))))] }[L] || [];
  sp.forEach(f => { const q = f(); if (q && !(q.cat === 'listen' && !ttsOK())) qs.push(q); });
  qs.push(genFrame({ L }));
  const met = all.filter(w => seen(w.k));
  sampleN(met.length >= 4 ? met : all, 4).forEach(w => qs.push(qFor(w, { L, pool: all })));
  const out = shuffle(qs.filter(Boolean));
  const fixed = TT.banks.concat(TT.cloze).filter(b => b.L === L);
  const gb = LIDX[L] >= 2 && (!fixed.length || Math.random() < .5) ? genBank({ L, n: 5, prefer: met.filter(w => stageOf(w.k) <= 3).map(w => w.k) }) : null;
  if (gb) out.push(genBankQ(gb)); else if (fixed.length) out.push(qBank(pick(fixed), { shuffleBank: true }));
  return out;
}
function startNode(nd) {
  closeNodePop();
  const back = () => go('learn', { focus: nd.id });
  const cfg = { title: nd.title, node: nd.id, back, hearts: 5, adaptive: true };
  const L = nd.unit;
  if (nd.t === 'words') { const all = lessonWordsOf(L), chunk = thirds(all)[nd.part] || all; cfg.len = 13 + Math.min(3, nodeCount(nd.id)); cfg.gen = wordGen(chunk, { pool: all, L }); }
  else if (nd.t === 'grammar') cfg.qs = sessGrammar(L);
  else if (nd.t === 'story') cfg.qs = sessStory(L, nd.id);
  else if (nd.t === 'listen') cfg.qs = sessListen(L);
  else if (nd.t === 'write') { cfg.qs = sessWrite(L); cfg.hearts = 0; }
  else if (nd.t === 'check') cfg.qs = sessCheck(L);
  else if (nd.t === 'lmix') { cfg.hearts = 0; cfg.qs = ttsOK() ? shuffle([...Array.from({ length: 6 }, qListenPic), ...Array.from({ length: 4 }, () => { const x = genAny({ prefSeen: true }); return x ? qSentHear(x, {}) : qListenPic(); })]) : shuffle(DATA.reading).slice(0, 8).map(r => qReading(r)); }
  else if (nd.t === 'sweep') { cfg.hearts = 0; const ws = deckWords(nd.deck); cfg.len = 15; cfg.gen = wordGen(buildQueue(ws, 24, 24), { teach: 0, pool: ws }); }
  else if (nd.t === 'test') { cfg.hearts = 0; cfg.adaptive = false; cfg.mock = true; cfg.type = nd.which; cfg.title = nd.title;
    if (nd.which === 'last') cfg.qs = lastTest(); else if (nd.which === 'mid') cfg.qs = midTest(); else if (nd.which === 'midstyle') cfg.qs = midStyleTest(); else if (nd.which === 'teacher') cfg.qs = teacherTest(); else { cfg.qs = mockQuiz(true); cfg.exam = true; cfg.minutes = 30; } }
  cfg.onDone = res => {
    const first = !nodeCount(nd.id);
    const need = nd.t === 'check' ? 60 : 0;
    const out = {};
    if (res.pct >= need) { S.path[nd.id] = Math.min(3, nodeCount(nd.id) + 1); S.lastNode = nd.id; if (first && (nd.t === 'check' || nd.t === 'test')) { out.chest = 20 + (Math.random() * 21 | 0); out.chestTitle = nd.t === 'check' ? 'Checkpoint chest' : 'Test chest'; } }
    else out.msg = `Score ${need}% to pass the checkpoint — you got ${res.pct}%. Try again!`;
    return out;
  };
  runQuiz(cfg);
}

/* ---- path view */
let NODE_POP = null;
function closeNodePop() { $$('.npop').forEach(p => p.remove()); $$('.nwrap.sel').forEach(n => n.classList.remove('sel')); NODE_POP = null; }
function nodeHTML(u, nd, j, cur) {
  const n = nodeCount(nd.id), open = nodeOpen(u, j), isCur = cur && cur.id === nd.id;
  const st = isCur ? 'current' : n ? 'done' : open ? 'open' : 'locked';
  const x = Math.round(Math.sin(j * 1.05 + u.idx * .7) * 64);
  const ring = [0, 1, 2].map(i => { const a0 = -90 + i * 120 + 6, a1 = a0 + 108, r = 47, c = 50; const p = a => [c + r * Math.cos(a * Math.PI / 180), c + r * Math.sin(a * Math.PI / 180)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1); return `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" class="${i < n ? 'on' : ''}"/>`; }).join('');
  return `<div class="nwrap ${isCur ? 'cur' : ''}" style="--x:${x}px;--d:${j * 45}ms" data-node="${nd.id}">
    ${isCur ? `<div class="start-tip">START</div>` : ''}
    <div class="nring"><svg viewBox="0 0 100 100" aria-hidden="true">${ring}</svg>
      <button class="node ${st} t-${nd.t}" data-nid="${nd.id}" aria-label="${esc(nd.title + ' ' + nd.en)} — ${st === 'locked' ? 'locked' : n ? 'level ' + n + ' of 3' : 'start'}">
        <span class="node-face han">${st === 'locked' ? '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="currentColor"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.4"/></svg>' : (nd.t === 'check' || nd.t === 'test') && !n ? chestSVG(false, 44) : NODE_FACE[nd.t]}</span>
        ${n ? `<span class="crown nums">${n}</span>` : ''}</button></div>
    ${isCur ? `<div class="path-mascot ${x > 0 ? 'left' : 'right'}">${mascotSVG({ mood: 'idle', size: 74 })}<span class="say han">${pick(['加油！', '一起學！', '來吧！', '你可以！'])}</span></div>` : ''}
  </div>`;
}
function unitHTML(u, cur) {
  const done = u.nodes.filter(nd => nodeCount(nd.id)).length;
  return `<section class="unit u-${u.color}" id="unit-${u.id}">
    <header class="ubanner"><div class="ub-txt"><span class="ub-eyebrow">${u.id === 'FIN' ? 'FINAL' : 'UNIT ' + u.idx} · <span class="han">${esc(u.zh)}</span></span><h2 class="han">${esc(u.name)}</h2><p>${esc(u.en)}</p></div>
      <button class="ub-guide" data-guide="${u.id}" aria-label="Open the guide">${IC.lessons}<span>Guide</span></button>
      <div class="ub-prog" aria-label="${done} of ${u.nodes.length} levels done"><i style="width:${done / u.nodes.length * 100}%"></i></div></header>
    <div class="upath">${u.nodes.map((nd, j) => nodeHTML(u, nd, j, cur)).join('')}</div></section>`;
}
function streakWeek() {
  const out = []; const base = new Date();
  for (let i = 6; i >= 0; i--) { const d = new Date(base.getTime() - i * 86400000); const k = ymd(d); out.push([WEEK_EN[d.getDay()][0], !!(S.dayLog && S.dayLog[k]), i === 0]); }
  return `<div class="week">${out.map(([l, on, t]) => `<span class="wd ${on ? 'on' : ''} ${t ? 'today' : ''}"><i>${on ? FLAME : ''}</i>${l}</span>`).join('')}</div>`;
}
const TIPS = [['先聽，再說。', 'Listen first, then say it out loud.'], ['錯了沒關係！', 'Mistakes are how you learn — missed words come back soon.'], ['寫一寫！', 'Writing a character once by hand beats reading it five times.'],
  ['時間在動詞前面。', 'Time words go before the verb: 我早上八點去學校。'], ['兩，不是二！', 'Before a measure word, 2 is 兩: 兩本書.'], ['睡覺很重要！', 'Sleep turns today\'s practice into memory.'], ['多練習！', 'Your teacher loves word banks — try the 詞庫填空 drill.']];
function sideHTML() {
  const d = daysLeft(), R0 = readiness(), Q = questsToday();
  const qd = Q.items.filter(i => i.n >= QDEF[i.id][2]).length;
  const tip = TIPS[hashStr(today() + (S.totals.sessions || 0)) % TIPS.length];
  return `<div class="card side-streak"><div class="row" style="gap:12px;flex-wrap:nowrap"><span class="big-flame ${S.streak.last === today() ? 'lit' : ''}">${FLAME}</span><div><b class="nums" style="font:800 1.6rem var(--f-disp)">${hudStreak()}</b><div class="small muted">day streak${S.freeze ? ` · ${S.freeze} freeze` : ''}</div></div></div>${streakWeek()}</div>
    <div class="card"><div class="row" style="justify-content:space-between;margin-bottom:8px"><h3>Daily quests</h3><span class="small faint nums">${qd}/3</span></div><div id="sideQuests">${questsHTML()}</div></div>
    <div class="card side-test"><div class="row" style="gap:14px;flex-wrap:nowrap"><div class="ring" style="width:84px;height:84px">${ringSVG(R0.pct, 84, 9)}<div class="val nums" style="font-size:1.2rem">${R0.pct}%<small>ready</small></div></div>
      <div><b style="font:800 1.25rem var(--f-disp)">${d < 0 ? 'Test done' : d === 0 ? 'Test today!' : d + ' day' + (d > 1 ? 's' : '') + ' to go'}</b><div class="small muted">Lessons 1–6 · 時代華語 1</div><button class="btn3d sm" data-go="test" style="margin-top:8px">Practice tests</button></div></div></div>
    <div class="card side-tip"><div class="row" style="gap:10px;flex-wrap:nowrap;align-items:flex-end">${mascotSVG({ mood: 'happy', size: 58 })}<div class="bubble"><b class="han">${tip[0]}</b><br><span class="small">${esc(tip[1])}</span></div></div></div>`;
}
const hudStreak = () => S.streak.last === today() || S.streak.last === ymd(new Date(Date.now() - 86400000)) ? S.streak.n : 0;
function vLearn(el, p) {
  const cur = currentNode();
  const Q = questsToday(); const qd = Q.items.filter(i => i.n >= QDEF[i.id][2]).length; const claim = Q.items.some(i => i.n >= QDEF[i.id][2] && !i.claimed);
  el.innerHTML = `<div class="learn">
    <div class="learn-main">
      <div class="learn-top"><button class="chip3d" id="ltQuests">${claim ? chestSVG(false, 22) : '🎯'} Quests <b class="nums">${qd}/3</b></button><button class="chip3d" data-go="test"><span class="han">考</span> ${daysLeft() < 0 ? '—' : daysLeft()} days</button><button class="chip3d" data-go="me" data-p='{"tab":"ward"}'>${mascotSVG({ size: 20 })} Wardrobe</button><button class="chip3d tutor-entry" data-tutor>💬 Ask tutor</button></div>
      ${smartCardHTML()}
      ${S.totals.sessions ? coachHTML(2) : ''}
      ${UNITS.map(u => unitHTML(u, cur)).join('')}
      <div class="path-end">${mascotSVG({ mood: 'cheer', size: 110 })}<p class="han" style="font-size:1.3rem">考試加油！</p><p class="small muted">Finish the final sprint, then go ace that test.</p></div>
    </div>
    <aside class="learn-side">${sideHTML()}</aside></div>`;
  bindClaims(el, () => go('learn', p));
  if ($('#smartGo', el)) $('#smartGo', el).onclick = () => startSmart();
  bindCoach(el);
  $('#ltQuests', el).onclick = () => { const m = modal(`<h2>Daily quests</h2><p class="small muted">New quests every day. Finish one to open a chest.</p>${questsHTML()}`, [['Close', 'ghost', null]]); bindClaims(m, () => { closeModal(); go('learn', p); }); };
  $$('[data-guide]', el).forEach(b => b.onclick = () => { const id = b.dataset.guide; if (id === 'FIN') go('test'); else go('lessons', { l: id }); });
  $$('.node', el).forEach(b => b.onclick = e => {
    e.stopPropagation();
    const nd = NODES.find(n => n.id === b.dataset.nid), u = UNITS.find(x => x.id === nd.unit), j = u.nodes.indexOf(nd), wrap = b.closest('.nwrap');
    if (NODE_POP === nd.id) return closeNodePop();
    closeNodePop(); NODE_POP = nd.id; wrap.classList.add('sel');
    const open = nodeOpen(u, j), n = nodeCount(nd.id);
    const pop = document.createElement('div'); pop.className = `npop u-${u.color} ${open ? '' : 'locked'}`;
    pop.innerHTML = `<div class="np-t"><span class="han">${esc(nd.title)}</span> · ${esc(nd.en)}</div><div class="np-d">${esc(nodeDesc(nd) || '')}</div>
      ${open ? `<div class="np-lv">${[0, 1, 2].map(i => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}<span class="small">${n ? `Level ${n}/3` : 'Not started'}</span></div><button class="btn3d big light" id="npGo">${n ? (n >= 3 ? 'Practice +XP' : 'Level up +XP') : 'Start +XP'}</button>` : `<div class="np-lock">Finish the level above to unlock this.</div>`}`;
    wrap.after(pop);
    if (open) $('#npGo', pop).onclick = () => startNode(nd);
    sfx('tap');
    pop.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
  el.onclick = e => { if (!e.target.closest('.npop,.node')) closeNodePop(); };
  requestAnimationFrame(() => {
    const target = p.focus ? $(`.nwrap[data-node="${p.focus}"]`, el) : $('.node.current', el);
    if (target) { target.scrollIntoView({ block: 'center' }); if (p.focus) { const nb = target.querySelector('.node'); nb && nb.classList.add('levelup'); } }
  });
}

/* ============================================================ ME: profile, quests, badges, wardrobe, plan, stats, save */
function vMe(el, p) {
  const tab = p.tab || 'quests';
  const l = levelOf(S.xp), r = rankOf(l), f0 = levelFloor(l), f1 = levelFloor(l + 1);
  el.innerHTML = `<div class="me">
    <section class="profile card">
      <div class="pf-mascot">${mascotSVG({ mood: 'idle', size: 128 })}</div>
      <div class="pf-info"><input class="pf-name" id="pfName" value="${esc(S.name || '')}" placeholder="Your name" aria-label="Your name" maxlength="20">
        <div class="pf-rank"><span class="lvl-badge nums">Lv ${l}</span><span class="han">${r[1]}</span><span class="muted">${r[2]}</span></div>
        <div class="xpbar"><i style="width:${(S.xp - f0) / (f1 - f0) * 100}%"></i></div><div class="tiny faint nums">${S.xp - f0} / ${f1 - f0} XP to level ${l + 1}</div>
        <div class="pf-chips"><span class="chip3d static">${FLAME}<b class="nums">${hudStreak()}</b> streak</span><span class="chip3d static">${PEARL}<b class="nums">${S.pearls}</b> pearls</span><span class="chip3d static">🌱<b class="nums">${knownCount()}</b> words known</span><span class="chip3d static">🏅<b class="nums">${Object.keys(S.ach).length}</b>/${ACH.length}</span></div></div>
    </section>
    <div class="tabs metabs">${[['quests', '任務 Quests'], ['badges', '成就 Badges'], ['ward', '衣櫃 Wardrobe'], ['plan', '計畫 Plan'], ['stats', '統計 Stats'], ['save', '存檔 Save']].map(([k, t]) => `<button class="chip" data-mt="${k}" aria-pressed="${k === tab}">${t}</button>`).join('')}</div>
    <div id="metab"></div></div>`;
  $('#pfName', el).onchange = e => { S.name = e.target.value.trim().slice(0, 20); save(); toast('Name saved'); };
  $$('[data-mt]', el).forEach(b => b.onclick = () => go('me', { tab: b.dataset.mt }));
  const T = $('#metab', el);
  if (tab === 'quests') { T.innerHTML = `<div class="card"><p class="small muted" style="margin-bottom:10px">Three new quests every day. Finish one, then claim its chest for pearls.</p>${questsHTML()}</div>`; bindClaims(T, () => go('me', { tab: 'quests' })); }
  else if (tab === 'badges') T.innerHTML = `<div class="badges">${ACH.map(a => { const got = S.ach[a[0]]; return `<div class="badge ${got ? 'got' : ''}"><span class="medal">${a[1]}</span><b>${esc(a[2])}</b><span class="small muted">${esc(a[3])}</span><span class="tiny ${got ? '' : 'faint'}">${got ? 'Earned ' + got : '+' + a[5] + ' pearls'}</span></div>`; }).join('')}</div>`;
  else if (tab === 'ward') wardrobe(T);
  else if (tab === 'plan') { vToday(T); }
  else if (tab === 'stats') {
    const R0 = readiness(), d = dialLv();
    const met = WL.filter(w => S.cards[w.k] && w.lv !== 9);
    const skAvg = sk => met.length ? met.reduce((a, w) => a + avgSkill(w.k, sk), 0) / met.length : 0;
    const cg = coreG(), gAvg = cg.length ? cg.reduce((a, g) => a + Math.min(1, (S.gd[g] || 0) / 3), 0) / cg.length : 0;
    const bar = (lab, v) => `<div class="skrow"><span class="skl"><b class="han">${lab[0]}</b> ${esc(lab[1])}</span><div class="bar ${v < .4 ? 'seal' : v < .7 ? 'gold' : ''}"><i style="width:${Math.round(v * 100)}%"></i></div><span class="nums small">${Math.round(v * 100)}%</span></div>`;
    const stRow = (name, ws) => { const c = [0, 0, 0, 0, 0, 0]; ws.forEach(w => c[stageOf(w.k)]++); const n = ws.length || 1;
      return `<div class="strow"><span class="han">${name}</span><div class="stbar">${c.map((x, i) => [x, i]).reverse().map(([x, i]) => x ? `<i class="s${i}" style="width:${x / n * 100}%" title="${STG[i][1]}: ${x}"></i>` : '').join('')}</div><span class="nums small">${c[4] + c[5]}/${ws.length}</span></div>`; };
    const pairs = confPairs(8), looked = Object.keys(S.pk).filter(k => W[k]).sort((a, b) => peekScore(b) - peekScore(a)).map(k => W[k]).slice(0, 14);
    T.innerHTML = `<div class="grid2">
      ${coachHTML(8, true)}
      <div class="card"><h3>Your skills</h3><p class="small muted" style="margin:2px 0 10px">Averages over the ${met.length} words you've met. Each session aims at your lowest bars.</p>
        <div class="skrows">${SKL.map(sk => bar(SKN[sk], skAvg(sk))).join('')}${bar(['語法', 'Grammar'], gAvg)}</div></div>
      ${memoryCardHTML()}
      <div class="card"><h3>Difficulty adapts to you</h3><div class="dialbig">${[1, 2, 3].map(i => `<div class="${i === d ? 'on' : i < d ? 'past' : ''}"><b class="han">${DIAL_N[i][0]}</b><span>${DIAL_N[i][1]}</span></div>`).join('')}</div>
        <p class="small" style="margin-top:10px">${esc(DIAL_N[d][2])}</p><p class="small muted" style="margin-top:6px">Quick, correct answers move it up; mistakes move it down, so you stay at about 80% right — hard enough to grow, easy enough to keep going.</p></div>
      <div class="card span2"><h3>Word stages by lesson</h3><div class="stlegend">${STG.map((x, i) => [x, i]).reverse().map(([x, i]) => `<span><i class="s${i}"></i>${x[1]}</span>`).join('')}</div>
        <div class="strows">${LES.map(L => stRow(L.num, L.words.map(k => W[k]).filter(Boolean))).join('')}${stRow('詞表 1', deckWords('T1'))}${stRow('詞表 2', deckWords('T2'))}</div>
        <p class="tiny faint" style="margin-top:8px">New → Met → Recognize (you know the meaning) → Recall (you can find the word from English) → Can use (in sentences) → Mastered (also by ear or tone).</p></div>
      <div class="card"><h3>Words you mix up</h3>${pairs.length ? `<div class="pairs">${pairs.map(([a, b, c]) => `<div class="pair"><span data-say="${esc(a.h)}"><b class="han">${esc(a.h)}</b><small>${esc(shortEn(a.e))}</small></span><span class="vs">↔</span><span data-say="${esc(b.h)}"><b class="han">${esc(b.h)}</b><small>${esc(shortEn(b.e))}</small></span></div>`).join('')}</div><button class="btn3d sm" id="pairGo" style="margin-top:10px">Practice these</button>` : '<p class="small muted">No mix-ups yet. When you pick a wrong word, 波波 remembers it and uses it to test you again.</p>'}</div>
      <div class="card"><h3>Words you peek at</h3>${looked.length ? `<p class="small muted" style="margin:2px 0 8px">拼 = you checked the pinyin, 意 = you checked the meaning. Right answers without peeking clear them.</p><div class="wchips">${looked.map(w => `<span class="wchip peek" data-say="${esc(w.h)}"><b class="han">${esc(w.h)}</b><span>${peekPy(w.k) ? '拼' + (peekPy(w.k) >= 2 ? '×' + Math.round(peekPy(w.k)) : '') : ''}${peekMean(w.k) ? ' 意' + (peekMean(w.k) >= 2 ? '×' + Math.round(peekMean(w.k)) : '') : ''}</span></span>`).join('')}</div><button class="btn3d sm" id="lookGo" style="margin-top:10px">Practice them</button>` : '<p class="small muted">In practice tests, tap 拼 or 意 on a word to peek at it. 波波 remembers every peek and brings those words back until you can read them without help.</p>'}</div>
      ${missCardHTML()}
      ${typeTableHTML() || `<div class="card"><h3 style="margin-bottom:10px">Accuracy by question type</h3><div class="catrows">${Object.keys(CAT).map(c => { const [a, b] = S.cat[c] || [0, 0]; return `<div class="catrow"><span class="small">${CAT[c]}</span><div class="bar ${b && a / b < .6 ? 'seal' : b && a / b < .8 ? 'gold' : ''}"><i style="width:${b ? a / b * 100 : 0}%"></i></div><span class="nums small" style="text-align:right">${b ? Math.round(a / b * 100) + '%' : '—'}</span></div>`; }).join('')}</div></div>`}
      <div class="card"><h3>Overall</h3><div class="row" style="gap:16px;margin-top:10px"><div class="ring">${ringSVG(R0.pct)}<div class="val nums">${R0.pct}%<small>ready</small></div></div><div class="small stack" style="gap:4px"><span>${S.totals.sessions || 0} sessions · ${S.totals.perfect || 0} perfect</span><span>Best combo: ${S.bestCombo || 0}</span><span>${Object.keys(S.written).length} characters written</span><span>${S.mocks.length} practice tests</span></div></div></div></div>`;
    animateRings(T); bindCoach(T);
    if ($('#missGo', T)) $('#missGo', T).onclick = () => startMistakes(() => go('me', { tab: 'stats' }));
    if ($('#pairGo', T)) $('#pairGo', T).onclick = () => { const ps = confPairs(8); const qs = shuffle(ps.flatMap(([a, b]) => [qContrast(a, b), qContrast(b, a)])); runAdaptive({ title: 'Mix-ups', qs, hearts: 0, back: () => go('me', { tab: 'stats' }) }); };
    if ($('#lookGo', T)) $('#lookGo', T).onclick = () => runAdaptive({ title: 'Looked-up words', len: 12, hearts: 0, gen: wordGen(looked, { teach: 0 }), back: () => go('me', { tab: 'stats' }) });
  } else saveTab(T);
}
function wardrobe(T) {
  const W0 = S.ward;
  const own = k => W0.owned.includes(k);
  T.innerHTML = `<div class="ward"><div class="card ward-stage">${mascotSVG({ mood: 'happy', size: 150 })}<div class="ward-cash">${PEARL}<b class="nums">${S.pearls}</b> pearls</div><p class="tiny faint" style="text-align:center">Earn pearls from lessons, perfect scores, chests, quests and badges.</p></div>
    <div class="stack"><div class="card"><h3 style="margin-bottom:10px">口味 Flavor</h3><div class="shop">${Object.entries(FLAVORS).map(([k, f]) => `<button class="item ${W0.flavor === k ? 'eq' : ''}" data-fl="${k}"><span class="sw" style="background:${f[2]}"></span><span class="han">${f[0]}</span><span class="tiny">${f[1]}</span><span class="price">${own('fl:' + k) || !f[3] ? (W0.flavor === k ? 'Wearing' : 'Owned') : PEARL + f[3]}</span></button>`).join('')}</div></div>
      <div class="card"><h3 style="margin-bottom:10px">配件 Accessories</h3><div class="shop">${Object.entries(ACCS).map(([k, a]) => `<button class="item ${W0.acc === k ? 'eq' : ''}" data-ac="${k}"><span class="mini">${mascotSVG({ acc: k, size: 44 })}</span><span class="han">${a[0]}</span><span class="tiny">${a[1]}</span><span class="price">${own('ac:' + k) || !a[2] ? (W0.acc === k ? 'Wearing' : 'Owned') : PEARL + a[2]}</span></button>`).join('')}</div></div>
      <div class="card"><h3 style="margin-bottom:6px">Streak freeze</h3><div class="row" style="justify-content:space-between"><span class="small muted">Miss a day without losing your streak. You have ${S.freeze || 0}.</span><button class="btn3d sm sky" id="buyFreeze">${PEARL}50 Buy</button></div></div></div></div>`;
  const buy = (key, price, apply) => {
    if (own(key) || !price) { apply(); save(); sfx('tap'); return wardrobe(T); }
    if (S.pearls < price) { toast(`You need ${price - S.pearls} more pearls`); sfx('no'); return; }
    modal(`<div class="mm">${mascotSVG({ mood: 'wow', size: 110 })}</div><h2>Buy this for ${price} pearls?</h2>`, [['Buy', 'gold', () => { closeModal(); S.pearls -= price; W0.owned.push(key); apply(); save(); hud(); sfx('coin'); checkAch(); wardrobe(T); }], ['Not now', 'ghost', null]]);
  };
  $$('[data-fl]', T).forEach(b => b.onclick = () => { const k = b.dataset.fl; buy('fl:' + k, FLAVORS[k][3], () => { W0.flavor = k; }); });
  $$('[data-ac]', T).forEach(b => b.onclick = () => { const k = b.dataset.ac; buy('ac:' + k, ACCS[k][2], () => { W0.acc = k; }); });
  $('#buyFreeze', T).onclick = () => { if (S.pearls < 50) { toast('You need ' + (50 - S.pearls) + ' more pearls'); return; } S.pearls -= 50; S.freeze = (S.freeze || 0) + 1; save(); hud(); sfx('coin'); toast('Streak freeze ready'); wardrobe(T); };
}
function saveTab(T) {
  T.innerHTML = `<div class="grid2"><div class="card stack"><h3>Your progress is saved automatically</h3>
      <p class="small">${CLOUD.state === 'on' ? '✓ Saved to your Claude account — open this page on your phone or computer and your progress follows you.' : CLOUD.state === 'readonly' ? 'This copy is view-only, so progress is saved in this browser only.' : '✓ Saved in this browser. Use a backup code to move your progress to another device.'}</p>
      <p class="tiny faint">Last saved ${S.updatedAt ? new Date(S.updatedAt).toLocaleString() : '—'}</p>
      <button class="btn3d sky" id="bkCopy">Copy backup code</button><textarea class="input" id="bkOut" rows="3" readonly hidden aria-label="Backup code"></textarea></div>
    <div class="card stack"><h3>Restore from a backup code</h3><p class="small muted">Paste a code from another device. This replaces the progress on this one.</p>
      <textarea class="input" id="bkIn" rows="3" placeholder="Paste your backup code here" aria-label="Paste backup code"></textarea><button class="btn3d" id="bkLoad">Restore</button></div>
    <div class="card stack"><h3>Settings</h3><p class="small muted">Pinyin or 注音, English, voice speed, sounds, test date.</p><button class="btn3d ghost" id="openSet">Open settings</button></div></div>`;
  $('#bkCopy', T).onclick = () => {
    const code = 'HZS1:' + btoa(unescape(encodeURIComponent(JSON.stringify(S))));
    const out = $('#bkOut', T); out.hidden = false; out.value = code;
    const done = () => toast('Backup code copied');
    try { navigator.clipboard.writeText(code).then(done, () => { out.select(); toast('Select and copy the code below'); }); } catch (e) { out.select(); toast('Select and copy the code below'); }
  };
  $('#bkLoad', T).onclick = () => {
    const raw = $('#bkIn', T).value.trim();
    try {
      if (!raw.startsWith('HZS1:')) throw 0;
      const obj = JSON.parse(decodeURIComponent(escape(atob(raw.slice(5)))));
      modal(`<h2>Replace progress on this device?</h2><p class="muted">The backup has ${obj.xp || 0} XP and ${Object.keys(obj.cards || {}).length} words practiced.</p>`, [['Restore', 'primary', () => { closeModal(); S = normalize(obj); loadCustom(); S.updatedAt = Date.now(); saveLocal(); cloudPush(true); hud(); toast('Progress restored'); go('learn'); }], ['Cancel', 'ghost', null]]);
    } catch (e) { toast('That code doesn\'t look right — copy the whole thing, starting with HZS1:'); }
  };
  $('#openSet', T).onclick = openSettings;
}

/* ============================================================ PRACTICE HUB */
function vPractice(el) {
  const weakN = deckWords('weak').length, dueN = WL.filter(w => due(w.k)).length;
  const sc = smartCounts();
  const tiles = [['smart', {}, '智慧', 'Smart review', sc.seen ? `${sc.due} due · ${sc.weak} weak · ${sc.conf} mix-ups` : 'Built from your mistakes', 'pink'], ['cards', { deck: 'LALL', mode: 'flip' }, '翻卡', 'Flashcards', dueN ? dueN + ' due now' : 'Spaced repetition', 'jade'], ['cards', { deck: 'T1', mode: 'speed' }, '快選', 'Speed sweep', 'Race through the vocab table', 'gold'],
    ['cards', { deck: 'weak', mode: 'flip' }, '錯題', 'Weak words', weakN + ' to fix', 'seal'], ['clinic', {}, '字形', 'Mix-up clinic', mixCount() ? mixCount() + ' look-alike pair' + (mixCount() > 1 ? 's' : '') + ' you mix up' : 'Characters that look alike', 'pink'], ['miss', {}, '錯題本', 'Mistake notebook', Object.keys(S.miss).length ? `${missDue().length} to redo · ${Object.keys(S.miss).length} saved` : 'Every question you miss', 'seal'], ['lessons', {}, '課文', 'Dialogues', 'Read and listen to every lesson', 'sky'],
    ['grammar', {}, '語法', 'Grammar library', `All ${Object.keys(G).length} points with examples`, 'taro'], ['write', { mode: 'dict' }, '聽寫', 'Dictation', 'Hear it, write it', 'tea']];
  el.innerHTML = `<div class="stack"><div class="sec-head"><div><span class="eyebrow">練習 · Practice</span><h1>Practice anything, anytime</h1></div></div>
    <div class="hub">${tiles.map(([v, p, zh, en, d, c]) => `<button class="hubtile u-${c}" ${v === 'smart' ? 'id="hubSmart"' : v === 'clinic' ? 'id="hubClinic"' : v === 'miss' ? 'id="hubMiss"' : `data-go="${v}" data-p='${JSON.stringify(p)}'`}><span class="ht-zh han">${zh}</span><b>${en}</b><span>${d}</span></button>`).join('')}<button class="hubtile u-gold tutor-entry" data-tutor><span class="ht-zh han">問老師</span><b>Ask the tutor</b><span>Check a sentence, ask about grammar</span></button></div>
    <div id="drillsHere"></div></div>`;
  vDrills($('#drillsHere', el));
  $('#hubSmart', el).onclick = () => startSmart();
  $('#hubClinic', el).onclick = () => startClinic();
  $('#hubMiss', el).onclick = () => startMistakes();
}

/* ---- welcome, streak pop */
function streakPop(n) {
  popup(`<span class="pp-ic flame-big">${FLAME}</span><span><b>${n}-day streak!</b><br><span class="small">${n >= 3 ? '你真棒！ Keep the fire going.' : 'Come back tomorrow to keep it.'}</span></span>`, 'streakp');
}
function welcome() {
  if (S.seenIntro || RUN) return;
  const steps = [
    [`<div class="mm">${mascotSVG({ mood: 'cheer', size: 140 })}</div><h2><span class="han">你好！</span> I'm 波波 (Bōbō)</h2><p class="muted">I'm a bubble tea, and I'll get you ready for your Chinese test in ${daysLeft() > 0 ? daysLeft() + ' days' : 'no time'}.</p>
      <input class="input" id="wName" placeholder="What should I call you?" maxlength="20" aria-label="Your name" style="margin-top:6px">`, 'Next'],
    [`<div class="mm">${mascotSVG({ mood: 'happy', size: 120 })}</div><h2>How it works</h2><div class="howto">
      <div><span class="han hb">學</span><span><b>Follow the path.</b> Each unit is one lesson of 時代華語 1 — words, grammar, dialogues, listening, writing, then a checkpoint.</span></div>
      <div><span class="hb">${HEART}</span><span><b>5 hearts per level.</b> Lose one for each mistake. Missed words come back until you know them.</span></div>
      <div><span class="hb">${PEARL}</span><span><b>Earn pearls</b> and spend them on outfits for me in the wardrobe.</span></div>
      <div><span class="han hb">考</span><span><b>Final sprint:</b> your teacher's last test, listening A/B/C and full mock tests.</span></div></div>`, 'Let\'s go!']];
  let i = 0;
  const show = () => {
    const m = modal(steps[i][0], [[steps[i][1], 'primary', () => {
      if (i === 0) { const v = ($('#wName') || {}).value; if (v && v.trim()) S.name = v.trim().slice(0, 20); }
      i++; if (i < steps.length) return show();
      closeModal(); S.seenIntro = true; save(); if (CUR === 'learn') go('learn'); sfx('done');
    }]], 'welcome');
    const inp = $('#wName', m); if (inp) { inp.value = S.name || ''; inp.onkeydown = e => { if (e.key === 'Enter') m.querySelector('[data-mb="0"]').click(); }; }
  };
  show();
}
