'use strict';
/* ============================================================ core data */
const DATA = window.DATA;
const W = {}, WL = [];
DATA.words.forEach(([k, h, alt, p, e, lv, n, ls, em]) => {
  const w = { k, h, alt, p, e, lv, n, ls: ls ? ls.split(' ') : [], em };
  W[k] = w; WL.push(w);
});
const H2W = {};
WL.forEach(w => { if (!H2W[w.h]) H2W[w.h] = w; });
WL.forEach(w => (w.alt || '').split('/').forEach(a => { if (a && !/\d/.test(a) && !H2W[a]) H2W[a] = w; }));
const LES = DATA.lessons, LMAP = Object.fromEntries(LES.map(l => [l.id, l]));
const G = DATA.grammar, DRILLS = DATA.drills, MN = DATA.mnemo;
const LNAME = { L0: '預備', L1: '第一課', L2: '第二課', L3: '第三課', L4: '第四課', L5: '第五課', L6: '第六課', B: '之後' };
const LEN = { L0: 'Intro', L1: 'Lesson 1', L2: 'Lesson 2', L3: 'Lesson 3', L4: 'Lesson 4', L5: 'Lesson 5', L6: 'Lesson 6', B: 'Later lessons' };
const SYN = [['二','兩'],['他','她','它'],['常常','時常','經常'],['快樂','高興','開心'],['美','漂亮','美麗'],['讀書','唸書','念','讀','看書'],['早上','上午','早'],
  ['星期天','禮拜天','週日'],['枝','支'],['元','塊'],['和','跟'],['學','學習'],['認為','覺得','想'],['看見','看到'],['聽見','聽到'],['巴士','公車','公共汽車'],
  ['超商','便利商店'],['日文','日語'],['英文','英語'],['房子','屋子'],['午餐','中飯'],['書包','背包'],['喜歡','喜愛','愛'],['妳','你'],['禮拜','星期'],
  ['小時','鐘頭'],['點','鐘'],['做飯','煮飯'],['車子','汽車'],['那','那些'],['這','這些'],['還','還是'],['醫生','醫師'],['孩子','小孩','小朋友'],['相片','照片'],['作業','功課'],
  ['大家','所有'],['不錯','還可以'],['生日禮物','禮物'],['電腦','手機'],['女孩','女生'],['男孩','男生'],['週末','周末'],['號','日'],['每','各'],['再見','明天見'],['要','想']];
const SYNMAP = {}; SYN.forEach((g, i) => g.forEach(x => (SYNMAP[x] = SYNMAP[x] || []).push(i)));
const isSyn = (a, b) => (SYNMAP[a] || []).some(i => (SYNMAP[b] || []).includes(i));
/* words whose English glosses overlap (跑 "to run" / 跑步 "to run, jog") can't be told apart from the English, so they are never each other's wrong choices */
const glosses = e => String(e || '').toLowerCase().replace(/\([^)]*\)/g, ' ').split(/[;,/]/).map(s => s.replace(/^\s*(to|a|an|the)\s+/, '').replace(/\s+/g, ' ').trim()).filter(s => s.length > 1);
const sameMeaning = (a, b) => { const B = new Set(glosses(b.e)); return glosses(a.e).some(x => B.has(x)); };

/* ============================================================ utils */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const sampleN = (a, n) => shuffle(a).slice(0, n);
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const pad2 = n => String(n).padStart(2, '0');
const ymd = d => d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
const today = () => ymd(new Date());
const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const dayDiff = (a, b) => Math.round((parseYmd(b) - parseYmd(a)) / 86400000);
const HAN = /[一-鿿]/;
const uniq = a => [...new Set(a)];

/* ============================================================ state */
const LS_KEY = 'hanzi-sprint-v1';
function defState() {
  return { v: 1, updatedAt: 0, start: today(), testDate: ymd(new Date(Date.now() + 3 * 86400000)), xp: 0, streak: { last: '', n: 0 }, day: { date: '', xp: 0 },
    cards: {}, plan: {}, gd: {}, cat: {}, mocks: [], written: {}, custom: [], ui: {},
    pearls: 0, path: {}, quests: null, ach: {}, ward: { flavor: 'milk', acc: 'band', owned: ['fl:milk', 'ac:none', 'ac:band'] }, totals: { sessions: 0, perfect: 0, chests: 0, night: 0 },
    bestCombo: 0, name: '', freeze: 0, dayLog: {}, lastNode: '', seenIntro: false,
    wm: {}, conf: {}, look: {}, sk: {}, pk: {}, dial: .35, recentS: [],
    set: { ph: 'py', en: true, rate: 0.85, sfx: true, shadow: false, hint: 'tap', hintV: 2 } };
}
function normalize(s) {
  const d = defState();
  const o = Object.assign(d, s || {});
  o.set = Object.assign(defState().set, (s && s.set) || {});
  o.ward = Object.assign(defState().ward, (s && s.ward) || {});
  o.totals = Object.assign(defState().totals, (s && s.totals) || {});
  ['cards', 'plan', 'gd', 'cat', 'written', 'ui', 'path', 'ach', 'dayLog', 'wm', 'conf', 'look', 'sk', 'pk'].forEach(k => { if (!o[k] || typeof o[k] !== 'object') o[k] = {}; });
  ['mocks', 'custom', 'recentS'].forEach(k => { if (!Array.isArray(o[k])) o[k] = []; });
  if (typeof o.dial !== 'number') o.dial = .35;
  if (!o.set.hintV) { o.set.hint = 'tap'; o.set.hintV = 2; }
  if (!Array.isArray(o.ward.owned)) o.ward.owned = defState().ward.owned;
  if (typeof o.pearls !== 'number') o.pearls = 0;
  return o;
}
let S = (() => { try { const r = localStorage.getItem(LS_KEY); if (r) return normalize(JSON.parse(r)); } catch (e) {} return defState(); })();
function saveLocal() { try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {} }
function save() { S.updatedAt = Date.now(); saveLocal(); cloudPush(); }
function loadCustom() {
  S.custom.forEach(([h, p, e], i) => {
    const k = 'my:' + h;
    if (!W[k]) { const w = { k, h, alt: '', p: p || '', e: e || '', lv: 9, n: 0, ls: ['MY'], em: '' }; W[k] = w; WL.push(w); if (!H2W[h]) H2W[h] = w; }
  });
}
loadCustom();

/* ---- cloud sync (db capability, per-viewer private doc) */
const CLOUD = { ref: null, state: 'off', busy: false, pending: false, timer: null };
async function cloudInit() {
  try {
    if (!window.claude || !window.claude.use) return;
    const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]);
    if (!db || !user) return;
    const uid = await user.id();
    if (!uid) return;
    CLOUD.ref = db.doc('data/users/' + uid + '/progress');
    const snap = await CLOUD.ref.get();
    if (snap.exists) {
      const r = snap.data();
      if (r && r.v === 1 && (r.updatedAt || 0) > (S.updatedAt || 0)) {
        S = normalize(JSON.parse(JSON.stringify(r))); saveLocal(); loadCustom(); renderAll(); toast('Progress loaded from your account');
      } else if ((S.updatedAt || 0) > ((r && r.updatedAt) || 0)) cloudPush(true);
    } else if (S.updatedAt) cloudPush(true);
    CLOUD.state = 'on'; syncChip();
  } catch (e) { CLOUD.state = 'off'; syncChip(); }
}
function cloudPush(now) { if (!CLOUD.ref) return; clearTimeout(CLOUD.timer); CLOUD.timer = setTimeout(doPush, now ? 0 : 2500); }
async function doPush() {
  if (!CLOUD.ref) return;
  if (CLOUD.busy) { CLOUD.pending = true; return; }
  CLOUD.busy = true;
  try { await CLOUD.ref.set(JSON.parse(JSON.stringify(S))); CLOUD.state = 'on'; }
  catch (e) { CLOUD.state = (e && e.code === 'invalid_argument') ? 'readonly' : 'err'; }
  CLOUD.busy = false; syncChip();
  if (CLOUD.pending) { CLOUD.pending = false; doPush(); }
}
function syncChip() { const el = $('#syncState'); if (el) el.textContent = CLOUD.state === 'on' ? 'Saved to your Claude account — works on every device.' : CLOUD.state === 'readonly' ? 'This copy is view-only, so progress stays in this browser.' : 'Progress is saved in this browser.'; }

/* ---- XP, streak */
function addXP(n, x, y) {
  if (!n) return;
  S.xp += n;
  const t = today();
  if (S.day.date !== t) S.day = { date: t, xp: 0 };
  S.day.xp += n;
  S.dayLog[t] = (S.dayLog[t] || 0) + n;
  if (S.streak.last !== t) {
    const y1 = ymd(new Date(parseYmd(t).getTime() - 86400000)), y2 = ymd(new Date(parseYmd(t).getTime() - 2 * 86400000));
    const was = S.streak.n;
    if (S.streak.last === y1) S.streak.n++;
    else if (S.streak.last === y2 && S.freeze > 0 && was > 0) { S.freeze--; S.streak.n++; setTimeout(() => toast('🧊 Streak freeze used — your streak is safe!'), 600); }
    else S.streak.n = 1;
    S.streak.last = t;
    if (S.streak.n > 1 && S.streak.n !== was) setTimeout(() => typeof streakPop === 'function' && streakPop(S.streak.n), 1200);
  }
  if (typeof onXP === 'function') onXP(n);
  hud();
  if (document.body.classList.contains('running')) return;
  const el = document.createElement('div'); el.className = 'xpfloat'; el.textContent = '+' + n + ' XP';
  const xpPill = $('#xpPill'); const r = xpPill ? xpPill.getBoundingClientRect() : { left: innerWidth - 120, top: 20 };
  el.style.left = (x ?? r.left + 8) + 'px'; el.style.top = (y ?? r.top + 30) + 'px';
  document.body.appendChild(el); setTimeout(() => el.remove(), 1000);
}

/* ---- spaced repetition (Leitner boxes tuned for a 3-day sprint) */
const IV = [1, 10, 60, 300, 1440, 2880]; // minutes
function grade(k, g) {
  const c = S.cards[k] ? S.cards[k].slice() : [0, 0, 0, 0];
  let box = c[0];
  if (g === 0) { box = 0; c[3]++; } else if (g === 1) box = Math.max(1, box); else if (g === 2) box = Math.min(5, box + 1); else box = Math.min(5, box + 2);
  const mins = g === 1 ? Math.max(1, IV[box] / 2) : IV[box];
  c[0] = box; c[1] = Date.now() + mins * 60000; c[2]++; S.cards[k] = c;
}
const quizSRS = (k, ok) => grade(k, ok ? 2 : 0);
const box = k => S.cards[k] ? S.cards[k][0] : -1;
const seen = k => !!S.cards[k];
const known = k => box(k) >= 2;
const isWeak = k => S.cards[k] && S.cards[k][3] > 0 && S.cards[k][0] < 3;
const due = k => S.cards[k] && S.cards[k][1] <= Date.now();
function nextIn(k, g) {
  const c = S.cards[k] || [0, 0, 0, 0]; let b = c[0];
  if (g === 0) b = 0; else if (g === 1) b = Math.max(1, b); else if (g === 2) b = Math.min(5, b + 1); else b = Math.min(5, b + 2);
  const m = g === 1 ? Math.max(1, IV[b] / 2) : IV[b];
  return m < 60 ? Math.round(m) + 'm' : m < 1440 ? Math.round(m / 60) + 'h' : Math.round(m / 1440) + 'd';
}
function gramAnswer(g, ok) { if (ok) S.gd[g] = (S.gd[g] || 0) + 1; }
function catAnswer(c, ok) { const a = S.cat[c] || [0, 0]; S.cat[c] = [a[0] + (ok ? 1 : 0), a[1] + 1]; }

/* ---- decks */
const DECKS = [
  { id: 'L0', zh: '預備', en: 'Intro' }, { id: 'L1', zh: '第一課', en: 'Lesson 1' }, { id: 'L2', zh: '第二課', en: 'Lesson 2' }, { id: 'L3', zh: '第三課', en: 'Lesson 3' },
  { id: 'L4', zh: '第四課', en: 'Lesson 4' }, { id: 'L5', zh: '第五課', en: 'Lesson 5' }, { id: 'L6', zh: '第六課', en: 'Lesson 6' },
  { id: 'T1', zh: '詞表 1', en: 'Vocab table L1' }, { id: 'T2', zh: '詞表 2', en: 'Vocab table L2' }, { id: 'weak', zh: '錯題', en: 'Weak words' }, { id: 'MY', zh: '我的', en: 'My words' }];
function deckWords(id) {
  if (/^L\d$/.test(id)) return LMAP[id].words.map(k => W[k]);
  if (id === 'LALL') return uniq(LES.flatMap(l => l.words)).map(k => W[k]);
  if (id === 'T1') return WL.filter(w => w.lv === 1);
  if (id === 'T2') return WL.filter(w => w.lv === 2);
  if (id === 'weak') return WL.filter(w => isWeak(w.k));
  if (id === 'MY') return WL.filter(w => w.lv === 9);
  if (id === 'ALL') return WL.filter(w => w.lv !== 9 || true);
  return [];
}
function deckCounts(id) { const ws = deckWords(id); return { total: ws.length, due: ws.filter(w => due(w.k)).length, fresh: ws.filter(w => !seen(w.k)).length, known: ws.filter(w => known(w.k)).length, seen: ws.filter(w => seen(w.k)).length }; }
function buildQueue(words, size = 20, maxNew = 12) {
  const now = Date.now();
  const dueW = words.filter(w => S.cards[w.k] && S.cards[w.k][1] <= now).sort((a, b) => S.cards[a.k][1] - S.cards[b.k][1]);
  const newW = words.filter(w => !S.cards[w.k]);
  const rest = words.filter(w => S.cards[w.k] && S.cards[w.k][1] > now).sort((a, b) => S.cards[a.k][1] - S.cards[b.k][1]);
  let q = dueW.slice(0, size);
  q = q.concat(newW.slice(0, Math.min(maxNew, size - q.length)));
  if (q.length < size) q = q.concat(rest.slice(0, size - q.length));
  return shuffle(q);
}

/* ============================================================ phonetics */
const TM = { 'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4], 'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4], 'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
  'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4], 'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4], 'ǖ': ['v', 1], 'ǘ': ['v', 2], 'ǚ': ['v', 3], 'ǜ': ['v', 4], 'ü': ['v', 0] };
const ZI = { b: 'ㄅ', p: 'ㄆ', m: 'ㄇ', f: 'ㄈ', d: 'ㄉ', t: 'ㄊ', n: 'ㄋ', l: 'ㄌ', g: 'ㄍ', k: 'ㄎ', h: 'ㄏ', j: 'ㄐ', q: 'ㄑ', x: 'ㄒ', zh: 'ㄓ', ch: 'ㄔ', sh: 'ㄕ', r: 'ㄖ', z: 'ㄗ', c: 'ㄘ', s: 'ㄙ' };
const ZF = { a: 'ㄚ', o: 'ㄛ', e: 'ㄜ', ai: 'ㄞ', ei: 'ㄟ', ao: 'ㄠ', ou: 'ㄡ', an: 'ㄢ', en: 'ㄣ', ang: 'ㄤ', eng: 'ㄥ', ong: 'ㄨㄥ', i: 'ㄧ', ia: 'ㄧㄚ', ie: 'ㄧㄝ', iao: 'ㄧㄠ', iu: 'ㄧㄡ', ian: 'ㄧㄢ', in: 'ㄧㄣ', iang: 'ㄧㄤ', ing: 'ㄧㄥ', iong: 'ㄩㄥ',
  u: 'ㄨ', ua: 'ㄨㄚ', uo: 'ㄨㄛ', uai: 'ㄨㄞ', ui: 'ㄨㄟ', uan: 'ㄨㄢ', un: 'ㄨㄣ', uang: 'ㄨㄤ', v: 'ㄩ', ve: 'ㄩㄝ', van: 'ㄩㄢ', vn: 'ㄩㄣ' };
const ZY = { yi: 'ㄧ', ya: 'ㄧㄚ', ye: 'ㄧㄝ', yao: 'ㄧㄠ', you: 'ㄧㄡ', yan: 'ㄧㄢ', yin: 'ㄧㄣ', yang: 'ㄧㄤ', ying: 'ㄧㄥ', yong: 'ㄩㄥ', yu: 'ㄩ', yue: 'ㄩㄝ', yuan: 'ㄩㄢ', yun: 'ㄩㄣ',
  wu: 'ㄨ', wa: 'ㄨㄚ', wo: 'ㄨㄛ', wai: 'ㄨㄞ', wei: 'ㄨㄟ', wan: 'ㄨㄢ', wen: 'ㄨㄣ', wang: 'ㄨㄤ', weng: 'ㄨㄥ', er: 'ㄦ', a: 'ㄚ', o: 'ㄛ', e: 'ㄜ', ai: 'ㄞ', ei: 'ㄟ', ao: 'ㄠ', ou: 'ㄡ', an: 'ㄢ', en: 'ㄣ', ang: 'ㄤ', eng: 'ㄥ' };
const INIS = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's'];
function zySyl(s) {
  if (ZY[s]) return ZY[s];
  let ini = '', rest = s;
  for (const i of INIS) if (s.startsWith(i)) { ini = i; rest = s.slice(i.length); break; }
  if (!ini) return null;
  if (rest === 'i' && ['zh', 'ch', 'sh', 'r', 'z', 'c', 's'].includes(ini)) return ZI[ini];
  if ('jqx'.includes(ini)) { if (rest[0] === 'u') rest = 'v' + rest.slice(1); if (!(rest[0] === 'i' || rest[0] === 'v')) return null; }
  if (!ZF[rest]) return null;
  return ZI[ini] + ZF[rest];
}
function splitSyl(s) {
  const memo = {};
  const go = i => {
    if (i === s.length) return [];
    if (i in memo) return memo[i];
    for (let L = Math.min(6, s.length - i); L >= 1; L--) { const seg = s.slice(i, i + L); if (zySyl(seg)) { const r = go(i + L); if (r) return (memo[i] = [seg, ...r]); } }
    return (memo[i] = null);
  };
  return go(0);
}
function parsePy(p) { // -> chunks: [[ [plain,tone], ... ], ...]
  return String(p).toLowerCase().split(/[\s]+/).filter(Boolean).map(chunk => {
    const out = [];
    chunk.split("'").filter(Boolean).forEach(part => {
      let plain = '', tones = [];
      for (const ch of part) { const t = TM[ch]; if (t) { plain += t[0]; tones.push(t[1]); } else if (/[a-z]/.test(ch)) { plain += ch; tones.push(0); } }
      const segs = splitSyl(plain);
      if (!segs) { out.push([plain, 5, true]); return; }
      let i = 0;
      segs.forEach(sg => { let tone = 5; for (let j = i; j < i + sg.length; j++) if (tones[j]) tone = tones[j]; out.push([sg, tone]); i += sg.length; });
    });
    return out;
  });
}
const ZTONE = ['', '', 'ˊ', 'ˇ', 'ˋ', ''];
function toZhuyin(p) {
  return parsePy(p).map(ch => ch.map(([s, t, bad]) => bad ? s : (t === 5 ? '˙' : '') + (zySyl(s) || s) + (ZTONE[t] || '')).join(' ')).join('　');
}
const MARKS = { a: 'āáǎà', e: 'ēéěè', i: 'īíǐì', o: 'ōóǒò', u: 'ūúǔù', v: 'ǖǘǚǜ' };
function markSyl(s, t) {
  let out = s;
  if (t >= 1 && t <= 4) {
    let idx = s.indexOf('a'); if (idx < 0) idx = s.indexOf('e'); if (idx < 0 && s.includes('ou')) idx = s.indexOf('o');
    if (idx < 0) { for (let i = s.length - 1; i >= 0; i--) if ('iouv'.includes(s[i])) { idx = i; break; } }
    if (idx >= 0) out = s.slice(0, idx) + MARKS[s[idx]][t - 1] + s.slice(idx + 1);
  }
  return out.replace(/v/g, 'ü');
}
function toneVariants(p, n = 3) {
  const chunks = parsePy(p);
  const flat = []; chunks.forEach((c, ci) => c.forEach((s, si) => { if (!s[2] && s[1] !== 5) flat.push([ci, si]); }));
  const res = new Set();
  let guard = 0;
  while (res.size < n && guard++ < 40 && flat.length) {
    const [ci, si] = pick(flat);
    const copy = chunks.map(c => c.map(s => s.slice()));
    const cur = copy[ci][si][1]; let nt; do { nt = 1 + (Math.random() * 4 | 0); } while (nt === cur);
    copy[ci][si][1] = nt;
    if (flat.length > 1 && Math.random() < .35) { const [cj, sj] = pick(flat); if (cj !== ci || sj !== si) { const c2 = copy[cj][sj][1]; let n2; do { n2 = 1 + (Math.random() * 4 | 0); } while (n2 === c2); copy[cj][sj][1] = n2; } }
    const str = copy.map(c => c.map(([s, t]) => markSyl(s, t)).join('')).join(' ');
    if (str.toLowerCase() !== p.toLowerCase().replace(/'/g, '')) res.add(str);
  }
  return [...res];
}
const plainPy = p => String(p).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ü/g, 'v').replace(/[\s']/g, '').toLowerCase();
function phon(p) { if (!p) return ''; return S.set.ph === 'zy' ? toZhuyin(p) : p; }
function applyPhonClass() { document.body.classList.toggle('zy', S.set.ph === 'zy'); document.body.classList.toggle('nopy', S.set.ph === 'off'); document.body.classList.toggle('noen', !S.set.en); }
function ruby(toks) {
  return toks.map(([w, p]) => p ? `<ruby class="tok" data-w="${esc(w)}">${esc(w)}<rt>${esc(phon(p))}</rt></ruby>` : `<span class="punct">${esc(w)}</span>`).join('');
}
const plainZh = toks => toks.map(t => t[0]).join('');

/* ============================================================ numbers */
const DIG = '零一二三四五六七八九';
function numZh(n) {
  if (n < 10) return DIG[n];
  if (n < 20) return '十' + (n % 10 ? DIG[n % 10] : '');
  if (n < 100) return DIG[n / 10 | 0] + '十' + (n % 10 ? DIG[n % 10] : '');
  let s = '', zero = false, started = false;
  for (const [u, nm] of [[10000, '萬'], [1000, '千'], [100, '百'], [10, '十'], [1, '']]) {
    const d = Math.floor(n / u) % 10, rest = n % u;
    if (d === 0) { if (started && rest) zero = true; continue; }
    if (zero) { s += '零'; zero = false; }
    s += (d === 2 && u >= 100 ? '兩' : DIG[d]) + nm; started = true;
  }
  return s;
}
const hourZh = h => h === 2 ? '兩' : numZh(h);
const priceZh = n => n === 2 ? '兩' : numZh(n);
const WEEK = '天一二三四五六';
const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* ============================================================ audio */
let VOICE = null, voiceChecked = false;
function pickVoice() {
  if (!('speechSynthesis' in window)) return;
  const vs = speechSynthesis.getVoices();
  if (!vs.length) return;
  voiceChecked = true;
  VOICE = vs.find(v => /zh[-_]TW/i.test(v.lang)) || vs.find(v => /zh[-_]CN|cmn/i.test(v.lang)) || vs.find(v => /^zh/i.test(v.lang) && !/HK|yue/i.test(v.lang)) || null;
}
if ('speechSynthesis' in window) { pickVoice(); try { speechSynthesis.onvoiceschanged = pickVoice; } catch (e) {} }
const ttsOK = () => ('speechSynthesis' in window) && (!voiceChecked || !!VOICE);
let speakToken = 0;
function speak(text, rate) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return res(false);
    try {
      const tok = ++speakToken;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = VOICE ? VOICE.lang : 'zh-TW'; if (VOICE) u.voice = VOICE;
      u.rate = rate || S.set.rate;
      let done = false; const fin = ok => { if (!done) { done = true; res(ok && tok === speakToken); } };
      u.onend = () => fin(true); u.onerror = () => fin(false);
      speechSynthesis.speak(u);
      setTimeout(() => fin(true), 1800 + text.length * 520);
    } catch (e) { res(false); }
  });
}
function stopSpeak() { speakToken++; try { speechSynthesis.cancel(); } catch (e) {} }
let AC = null;
function sfx(type) {
  if (!S.set.sfx) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    const t = AC.currentTime;
    const SND = { ok: [[660, 990], .09, 'sine', .16], no: [[196, 147], .09, 'triangle', .16], done: [[523, 659, 784, 1047], .09, 'sine', .16], flip: [[520], .09, 'sine', .05],
      tap: [[880], .05, 'sine', .045], heart: [[330, 247, 185], .07, 'triangle', .12], coin: [[988, 1319], .07, 'square', .04],
      chest: [[392, 523, 659, 784, 1047, 1319], .06, 'sine', .14], level: [[523, 659, 784, 659, 784, 1047], .1, 'triangle', .14] };
    const [notes, gap, wave, vol] = SND[type] || [[440], .09, 'sine', .1];
    notes.forEach((f, i) => {
      const o = AC.createOscillator(), g = AC.createGain();
      o.type = wave; o.frequency.value = f;
      const st = t + i * gap;
      g.gain.setValueAtTime(0.0001, st); g.gain.exponentialRampToValueAtTime(vol, st + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, st + (type === 'tap' ? .08 : .24));
      o.connect(g).connect(AC.destination); o.start(st); o.stop(st + 0.26);
    });
  } catch (e) {}
}
