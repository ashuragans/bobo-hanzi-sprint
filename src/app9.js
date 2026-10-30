/* ============================================================ ADAPTIVE LEARNER MODEL
   Every answer updates six skills per word (meaning, recall, listening, tones, usage in sentences, writing),
   the spaced-repetition schedule, a list of words you mix up, and a difficulty dial.
   The next question is chosen from what the word still needs. */
const SKL = ['m', 'r', 'l', 's', 'u', 'w'];
const SKN = { m: ['意思', 'Meaning'], r: ['回想', 'Recall'], l: ['聽力', 'Listening'], s: ['聲調', 'Tones & pinyin'], u: ['用法', 'Using words in sentences'], w: ['寫字', 'Writing'] };
const STG = [['新', 'New'], ['見過', 'Met'], ['認得', 'Recognize'], ['記得', 'Recall'], ['會用', 'Can use'], ['掌握', 'Mastered']];
const FAST = { m: 4500, r: 6500, l: 6500, s: 6500, u: 10000, w: 25000 };
CAT.usage = '用法 Using words in sentences';
function wmOf(k) {
  const v = S.wm[k]; if (v) return v;
  const c = S.cards[k]; if (!c) return [0, 0, 0, 0, 0, 0];
  const w = W[k], b = c[0];
  const wr = w && [...w.h].filter(ch => HAN.test(ch)).every(ch => S.written[ch]) ? .3 : 0;
  return [Math.min(.85, .25 + b * .14), Math.min(.7, b * .12), Math.min(.4, b * .06), Math.min(.4, b * .06), Math.min(.3, b * .05), wr];
}
function stageOf(k) {
  if (!S.cards[k] && !S.wm[k]) return 0;
  const [m, r, l, s, u] = wmOf(k);
  if (u >= .7 && r >= .6 && m >= .7 && (l >= .5 || s >= .5)) return 5;
  if (u >= .45 && r >= .5 && m >= .6) return 4;
  if (r >= .5 && m >= .6) return 3;
  if (m >= .5) return 2;
  return 1;
}
const avgSkill = (k, sk) => wmOf(k)[SKL.indexOf(sk)];
function learn(k, sk, ok, o = {}) {
  if (!k || !W[k]) return;
  const i = SKL.indexOf(sk); if (i < 0) return;
  const v = wmOf(k).slice();
  const fast = o.ms != null && o.ms < FAST[sk];
  const wt = o.w ?? 1;
  const tgt = ok ? (o.assist ? .55 : 1) : 0;
  const a = (ok ? (o.assist ? .2 : fast ? .5 : .36) : .45) * wt;
  v[i] += a * (tgt - v[i]);
  if (ok && !o.assist && wt >= .5) {
    if (sk === 'u' || sk === 'r' || sk === 'l') v[0] += .12 * (1 - v[0]);
    if (sk === 'u') v[1] += .06 * (1 - v[1]);
  }
  S.wm[k] = v.map(x => Math.round(clamp(x, 0, 1) * 100) / 100);
  if (!o.noSrs && sk !== 'w' && wt >= .5) grade(k, ok ? (o.assist ? 1 : fast ? 3 : 2) : 0);
  if (!ok && o.conf && o.conf !== k && W[o.conf]) { const c = S.conf[k] || (S.conf[k] = {}); c[o.conf] = Math.min(9, (c[o.conf] || 0) + 1); }
  if (ok && !o.assist && wt >= .5 && S.pk[k]) { const p = S.pk[k]; const f = sk === 's' ? 0 : 1; if (sk === 's' || sk === 'r' || sk === 'l') p[0] = Math.floor(p[0] * .6 * 10) / 10; if (sk === 'm' || sk === 'r' || sk === 'u') p[1] = Math.floor(p[1] * .6 * 10) / 10; if (p[0] + p[1] < .5) delete S.pk[k]; }
  if (ok && !o.assist && S.conf[k] && wt >= .5) { for (const x in S.conf[k]) { S.conf[k][x] -= .5; if (S.conf[k][x] <= 0) delete S.conf[k][x]; } if (!Object.keys(S.conf[k]).length) delete S.conf[k]; }
  if (!o.noStat) { const st = S.sk[sk] || [0, 0]; S.sk[sk] = [st[0] + (ok ? 1 : 0), st[1] + 1]; }
}
/* every peek is a signal: a pinyin peek = you can't read the characters yet; a meaning peek = you don't know what it means yet.
   The word is scheduled again soon and future questions aim at exactly that gap. */
function notePeek(k, kind) {
  if (!k || !W[k]) return;
  const p = S.pk[k] || (S.pk[k] = [0, 0, 0]);
  p[kind === 'p' ? 0 : 1]++; p[2] = Date.now();
  if (kind === 'm') S.look[k] = (S.look[k] || 0) + 1;
  learn(k, kind === 'p' ? 's' : 'm', false, { w: kind === 'p' ? .2 : .3, noSrs: true });
  const c = S.cards[k];
  if (!c) S.cards[k] = [0, Date.now() + 60000, 0, 0]; else c[1] = Math.min(c[1], Date.now() + 5 * 60000);
  if (RUN) { RUN.peeks = RUN.peeks || {}; RUN.peeks[k] = (RUN.peeks[k] || '') + kind; if (RUN.cur && RUN.cur.k === k) RUN.assist = true; }
}
const noteLookup = k => notePeek(k, 'm');
/* how much a word has been peeked at lately (fades over ~3 days and with right answers) */
function peekScore(k) { const p = S.pk[k]; if (!p) return 0; const days = (Date.now() - p[2]) / 864e5; return (p[0] * .5 + p[1]) * Math.pow(.5, days / 3); }
const peekPy = k => (S.pk[k] || [0])[0], peekMean = k => (S.pk[k] || [0, 0])[1];
/* difficulty dial: right and fast pushes it up, mistakes pull it down (target ≈ 80% right) */
const dialVal = () => S.dial ?? .35;
const dialLv = () => dialVal() < .34 ? 1 : dialVal() < .67 ? 2 : 3;
const DIAL_N = [null, ['輕鬆', 'Gentle', 'More hints and easier choices while you find your feet.'], ['剛好', 'Balanced', 'A mix of recognising, recalling and using words.'], ['挑戰', 'Challenge', 'Less pinyin, trickier choices, more sentences and writing.']];
function dialStep(ok, fast, assist) { S.dial = Math.round(clamp(dialVal() + (ok ? (assist ? 0 : fast ? .045 : .02) : -.07), 0, 1) * 1000) / 1000; }
function adaptRecord(q, ok, ms, assist, conf) {
  const fast = ms != null && ms < (FAST[q.sk || 'm'] || 6000);
  const before = dialLv();
  if (q.k) learn(q.k, q.sk || 'm', ok, { ms, assist, conf });
  if (!ok && conf && q.k && q.cat !== 'listen') noteWordMix(q.k, conf);
  if (ok && q.ks) q.ks.slice(0, 6).forEach(k => learn(k, 'm', true, { w: .25, noSrs: true }));
  if (!q.noDial) dialStep(ok, fast, assist);
  return { fast, dialChanged: dialLv() !== before ? dialLv() - before : 0 };
}

/* ---- distractors that get harder as you improve, and use YOUR confusions */
function smartDist(w, pool, n, dir, lvl) {
  const meaning = dir === 'h2e' || dir === 'hearM';
  const conf = Object.entries(S.conf[w.k] || {}).sort((a, b) => b[1] - a[1]).map(x => W[x[0]]).filter(Boolean);
  const rev = Object.keys(S.conf).filter(k => S.conf[k][w.k] && W[k]).map(k => W[k]);
  let cand = [];
  if (lvl >= 3) cand.push(...conf, ...rev, ...sampleN(WL.filter(o => o.k !== w.k && o.lv !== 9 && HAN.test(o.h) && [...o.h].some(c => w.h.includes(c))), 2));
  if (lvl >= 2) cand.push(...lookWords(w, WL.filter(o => o.lv !== 9)).slice(0, 2), ...sampleN(pool.filter(o => o.k !== w.k && o.ls.some(l => w.ls.includes(l))), 4)); // look-alikes first
  if (lvl <= 1) cand.push(...sampleN(pool.filter(o => o.k !== w.k && !o.ls.some(l => w.ls.includes(l)) && o.h.length !== w.h.length), 5));
  cand.push(...distractors(w, pool, 12, meaning ? 'h2e' : dir === 'hearH' ? 'listen' : dir));
  const out = [], seenT = new Set([meaning ? w.e : w.h]);
  for (const o of cand) {
    if (!o || o.k === w.k || o.h === w.h || o.e === w.e || isSyn(o.h, w.h) || sameMeaning(o, w)) continue;
    if (dir === 'hearH' && plainPy(o.p) === plainPy(w.p)) continue;
    const t = meaning ? o.e : o.h; if (seenT.has(t)) continue;
    seenT.add(t); out.push(o); if (out.length >= n) break;
  }
  return out;
}
const pyLine = w => `<div class="bigpy" style="font-size:1.1rem">${esc(phon(w.p))}</div>`;
function qWord(w, qt, lvl, pool) {
  pool = pool && pool.length > 8 ? pool : WL.filter(x => x.lv !== 9);
  const base = { k: w.k, qt, lvl, explain: wordLine(w), sayAfter: w.h };
  if (qt === 'mean') {
    const ds = smartDist(w, pool, 3, 'h2e', lvl);
    return mcq(Object.assign(base, { kind: 'mc', cat: 'vocab', sk: 'm', label: 'What does it mean?', prompt: `<div class="qbig">${esc(w.h)}</div>${lvl <= 1 ? pyLine(w) : ''}`,
      opts: [w.e, ...ds.map(o => o.e)], optK: [w.k, ...ds.map(o => o.k)], ans: [0], hidePy: false }));
  }
  if (qt === 'recall') {
    const ds = smartDist(w, pool, 3, 'e2h', lvl);
    return mcq(Object.assign(base, { kind: 'mc', cat: 'vocab', sk: 'r', label: 'Which word is it?', prompt: `${w.em ? `<div style="font-size:2.4rem">${w.em}</div>` : ''}<div class="qen">${esc(w.e)}</div>`,
      opts: [w.h, ...ds.map(o => o.h)], optK: [w.k, ...ds.map(o => o.k)], han: true, ans: [0] }));
  }
  if (qt === 'py2h') {
    const ds = smartDist(w, pool, 3, 'p2h', lvl);
    return mcq(Object.assign(base, { kind: 'mc', cat: 'pinyin', sk: 's', label: 'Read the pinyin — which word is it?', prompt: `<div class="qen" style="color:var(--jade);font-size:1.6rem">${esc(phon(w.p))}</div>`,
      opts: [w.h, ...ds.map(o => o.h)], optK: [w.k, ...ds.map(o => o.k)], han: true, ans: [0] }));
  }
  if (qt === 'h2py') {
    const ds = smartDist(w, pool, 6, 'e2h', Math.max(lvl, 3)).filter(o => plainPy(o.p) !== plainPy(w.p) && o.p).slice(0, 3);
    if (ds.length < 2) return null;
    return mcq(Object.assign(base, { kind: 'mc', cat: 'pinyin', sk: 's', label: 'How do you read it?', prompt: `<div class="qbig">${esc(w.h)}</div>`,
      opts: [phon(w.p), ...ds.map(o => phon(o.p))], optK: [w.k, ...ds.map(o => o.k)], ans: [0], hidePy: true }));
  }
  if (qt === 'tone') {
    const right = canonPy(w.p), vs = toneVariants(w.p, 3).filter(v => v !== right);
    if (vs.length < 2) return null;
    return mcq(Object.assign(base, { kind: 'mc', cat: 'pinyin', sk: 's', label: 'Which tones are right?', prompt: `<div class="qbig">${esc(w.h)}</div><button class="playbtn" data-say="${esc(w.h)}" aria-label="Play">${IC.sound}</button>`, opts: [right, ...vs], ans: [0] }));
  }
  if (qt === 'hearH') {
    if (!ttsOK()) return null;
    const ds = smartDist(w, pool, 3, 'hearH', lvl);
    return mcq(Object.assign(base, { kind: 'mc', cat: 'listen', sk: 'l', label: 'Listen — which word do you hear?', prompt: `<button class="btn big hearbtn" data-say="${esc(w.h)}" aria-label="Play again">${IC.sound}</button><span class="small faint">Tap to hear it again</span>`,
      opts: [w.h, ...ds.map(o => o.h)], optK: [w.k, ...ds.map(o => o.k)], han: true, ans: [0], say: w.h, sayAfter: null }));
  }
  if (qt === 'hearM') {
    if (!ttsOK()) return null;
    const ds = smartDist(w, pool, 3, 'hearM', lvl);
    return mcq(Object.assign(base, { kind: 'mc', cat: 'listen', sk: 'l', label: 'Listen — what does it mean?', prompt: `<button class="btn big hearbtn" data-say="${esc(w.h)}" aria-label="Play again">${IC.sound}</button><span class="small faint">No characters this time — just listen</span>`,
      opts: [w.e, ...ds.map(o => o.e)], optK: [w.k, ...ds.map(o => o.k)], ans: [0], say: w.h, sayAfter: null }));
  }
  if (qt === 'write') {
    if (!hwOK()) return null;
    const chars = [...w.h].filter(c => HAN.test(c) && DATA.charsWithStrokes.includes(c));
    if (!chars.length) return null;
    const c = chars.sort((a, b) => (S.written[a] || 0) - (S.written[b] || 0))[0];
    return { kind: 'write', cat: 'write', sk: 'w', k: w.k, qt, mode: lvl >= 5 ? 'memory' : 'trace', char: c, label: lvl >= 5 ? '默寫 · Write it from memory' : '描 · Trace it, then you\'ll know it',
      hint: `<span class="han" style="font-size:1.4rem">${[...w.h].map(x => x === c ? `<b style="color:var(--jade)">${lvl >= 5 ? '？' : x}</b>` : esc(x)).join('')}</span> <b style="color:var(--jade)">${esc(phon(w.p))}</b> · ${esc(w.e)}`, explain: '' };
  }
  return null;
}
function sentToken(s, w) { const t = s.toks.find(t => H2W[t[0]] && H2W[t[0]].k === w.k); return t ? t[0] : null; }
function qSent(w, qt, lvl, o = {}) {
  const s = sentFor(w.k, { L: o.L, prefSeen: true, gen: qt === 'pick' || qt === 'fix' || qt === 'build' || qt === 'frame' ? true : undefined });
  if (!s) return null;
  const hidePy = lvl >= 4 || dialLv() === 3;
  let q = null;
  const h = sentToken(s, w);
  if (qt === 'cloze' && h) q = qSentCloze(s, h, { k: w.k, showEn: !(lvl >= 5 && dialLv() >= 2) });
  else if (qt === 'read') q = qSentRead(s, { k: w.k });
  else if (qt === 'hearS') q = ttsOK() ? qSentHear(s, { k: w.k }) : null;
  else if (qt === 'pick') q = qSentPick(s, { k: w.k });
  else if (qt === 'fix') q = qSentFix(s, { k: w.k });
  else if (qt === 'build') q = qSentBuild(s, { k: w.k });
  else if (qt === 'frame') q = qSentFrame(s, { k: w.k, hidePy });
  if (q) { q.lvl = lvl; q.hidePy = q.hidePy ?? (qt === 'read' || qt === 'cloze' ? hidePy : false); if (!q.k) q.k = w.k; }
  return q;
}
const QT = {
  mean: { sk: 'm', f: qWord }, recall: { sk: 'r', f: qWord }, py2h: { sk: 's', f: qWord }, h2py: { sk: 's', f: qWord }, tone: { sk: 's', f: qWord }, hearH: { sk: 'l', f: qWord }, hearM: { sk: 'l', f: qWord }, write: { sk: 'w', f: qWord },
  cloze: { sk: 'u', f: qSent }, read: { sk: 'u', f: qSent }, hearS: { sk: 'l', f: qSent }, pick: { sk: 'u', f: qSent }, fix: { sk: 'u', f: qSent }, build: { sk: 'u', f: qSent } };
const LADDER = {
  1: [['mean', 3], ['hearH', 1]],
  2: [['mean', 2], ['recall', 2], ['hearH', 1.5], ['py2h', 1], ['h2py', .8]],
  3: [['recall', 2], ['tone', 1], ['h2py', 1], ['hearM', 1.2], ['cloze', 1.6], ['read', 1]],
  4: [['cloze', 2], ['read', 1.5], ['build', 1.3], ['hearS', 1.2], ['recall', 1], ['write', .5]],
  5: [['cloze', 1.6], ['pick', 1.5], ['fix', 1], ['hearS', 1.3], ['build', 1], ['write', .8]] };
/* the heart of it: pick the next question for this word from what it still needs */
function qFor(w, o = {}) {
  const st = Math.max(1, stageOf(w.k));
  const shift = dialLv() === 3 ? 1 : dialLv() === 1 ? -1 : 0;
  const lvl = clamp((o.lvl ?? st) + (o.lvl != null ? 0 : shift), 1, 5);
  const v = wmOf(w.k);
  const avoid = new Set([].concat(o.avoid || []));
  let opts = LADDER[lvl].filter(([t]) => !avoid.has(t) && (t !== 'write' || hwOK()) && !((t === 'hearH' || t === 'hearM' || t === 'hearS') && !ttsOK()));
  const pp = Math.min(3, peekPy(w.k)), pm = Math.min(3, peekMean(w.k));
  const mixed = [...w.h].reduce((a, c) => a + ccOf(c), 0); // characters of this word you've mixed up
  opts = opts.map(([t, wt]) => [t, wt * (1.5 - v[SKL.indexOf(QT[t].sk)]) * (1 + ((t === 'h2py' || t === 'tone') ? pp * .6 : 0) + ((t === 'mean' || t === 'recall' || t === 'read') ? pm * .6 : 0) + (t === 'lookc' ? Math.min(2, mixed * .5) : 0))]);
  if (pp >= 1 && !opts.some(o => o[0] === 'h2py') && !avoid.has('h2py')) opts.push(['h2py', 1 + pp * .6]);
  if (pm >= 1 && !opts.some(o => o[0] === 'mean') && !avoid.has('mean')) opts.push(['mean', 1 + pm * .6]);
  for (let tries = 0; tries < 5 && opts.length; tries++) {
    const tot = opts.reduce((a, b) => a + b[1], 0); let r = Math.random() * tot, pickT = opts[0][0];
    for (const [t, wt] of opts) { r -= wt; if (r <= 0) { pickT = t; break; } }
    const f = QT[pickT].f, q = f === qWord ? qWord(w, pickT, lvl, o.pool) : f === qSent ? qSent(w, pickT, lvl, o) : f(w, pickT, lvl, o);
    if (q && (pp >= 1 || pm >= 1) && q.kind === 'mc' && /qbig/.test(q.prompt || '')) q.hidePy = true;
    if (q) { q.retry = () => qFor(w, { lvl: Math.max(1, lvl - 1), avoid: [pickT], pool: o.pool, L: o.L }); return q; }
    opts = opts.filter(x => x[0] !== pickT);
  }
  const q = qWord(w, 'mean', Math.min(lvl, 2), o.pool);
  q.retry = () => qWord(w, 'recall', 1, o.pool);
  return q;
}

/* ---- adaptive word sessions: teach what's new, keep asking what's weak, bring mistakes back */
function wordPriority(w) {
  const v = wmOf(w.k), c = S.cards[w.k];
  let p = 1.4 - (v[0] * .3 + v[1] * .25 + v[4] * .3 + v[2] * .15);
  if (c && c[1] <= Date.now()) p += .6;
  if (c) p += (1 - recallNow(w.k)) * 1.2; // the memory model's guess that it's fading
  if (c) p += Math.min(1, c[3] * .25);
  p += Object.values(S.conf[w.k] || {}).reduce((a, b) => a + b, 0) * .3 + peekScore(w.k) * .45;
  if (stageOf(w.k) >= 5 && !(c && c[1] <= Date.now())) p -= 1;
  return p + Math.random() * .25;
}
function wordGen(words, o = {}) {
  const pool = o.pool || words;
  const fresh = words.filter(w => !seen(w.k));
  const nNew = Math.min(fresh.length, o.teach ?? [0, 3, 4, 5][dialLv()]);
  const teachQ = fresh.slice(0, nNew);
  const st = { last: [], asked: {}, next: [], taught: 0 };
  const known = () => words.filter(w => seen(w.k));
  return R => {
    if (st.next.length) return st.next.shift();
    const ev = o.extraEvery || 4;
    if (o.extra && R.i > 0 && R.i % ev === ev - 1) { const x = o.extra(R); if (x) return x; }
    const wantTeach = teachQ.length && (st.taught === 0 || R.i % 3 === 0 || !known().length);
    if (wantTeach) {
      const w = teachQ.shift(); st.taught++;
      st.next.push(qFor(w, { lvl: 1, pool, L: o.L }));
      st.asked[w.k] = (st.asked[w.k] || 0) + 1; st.last.push(w.k);
      return teachWord(w);
    }
    const cand = known().filter(w => !st.last.slice(-2).includes(w.k));
    const list = (cand.length ? cand : known().length ? known() : words).map(w => [wordPriority(w) - (st.asked[w.k] || 0) * .35, w]).sort((a, b) => b[0] - a[0]);
    const w = list[0][1];
    st.asked[w.k] = (st.asked[w.k] || 0) + 1; st.last.push(w.k);
    if (peekScore(w.k) >= 2 && stageOf(w.k) <= 3 && !st.re) { st.re = {}; }
    if (st.re && peekScore(w.k) >= 2 && stageOf(w.k) <= 3 && !st.re[w.k]) { st.re[w.k] = 1; st.next.push(qFor(w, { pool, L: o.L })); const t = teachWord(w); t.label = '複習 · You peeked at this one — look again'; return t; }
    return qFor(w, { pool, L: o.L });
  };
}
function runAdaptive(cfg) { runQuiz(Object.assign({ adaptive: true, qs: [] }, cfg)); }

/* ---- smart review: built from YOUR weak words, confusions, look-ups and weak grammar */
function smartWords(n = 10) {
  return WL.filter(w => (S.cards[w.k] || S.wm[w.k]) && w.lv !== 9 || (w.lv === 9 && S.cards[w.k])).map(w => [wordPriority(w), w]).sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]);
}
function confPairs(n = 5) {
  const out = [];
  Object.entries(S.conf).forEach(([k, m]) => Object.entries(m).forEach(([k2, c]) => { if (W[k] && W[k2] && W[k].h !== W[k2].h && !sameMeaning(W[k], W[k2])) out.push([W[k], W[k2], c]); }));
  return out.sort((a, b) => b[2] - a[2]).slice(0, n);
}
function qContrast(a, b) {
  const ds = smartDist(a, WL, 2, 'e2h', 3).filter(o => o.k !== b.k).slice(0, 2);
  return mcq({ kind: 'mc', cat: 'vocab', sk: 'r', k: a.k, qt: 'contrast', label: 'You mix these up — which one is it?', prompt: `${a.em ? `<div style="font-size:2.2rem">${a.em}</div>` : ''}<div class="qen">${esc(a.e)}</div>`,
    opts: [a.h, b.h, ...ds.map(o => o.h)], optK: [a.k, b.k, ...ds.map(o => o.k)], han: true, ans: [0], explain: wordLine(a) + wordLine(b), sayAfter: a.h });
}
function weakGrammar(n = 3) {
  const met = new Set(LES.filter(L => UNITS.find(u => u.id === L.id).nodes.some(nd => nodeCount(nd.id))).flatMap(L => L.grammar));
  const pool = (met.size ? [...met] : LES.slice(0, 3).flatMap(L => L.grammar)).filter(g => G[g] && !G[g].later);
  // lowest accuracy first (S.ga: right/total per grammar point); points you have rarely got right count as weak too
  return pool.map(g => { const a = S.ga[g], acc = a ? (a[0] + 1) / (a[1] + 2) : .55; return [acc + Math.min(1, (S.gd[g] || 0) / 12) * .25 + Math.random() * .15, g]; }).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
function qGrammarFor(g, o = {}) {
  const hasT = TPL.some(t => t.g === g);
  if (hasT && Math.random() < .65) {
    const s = genAny({ g, L: o.L, prefSeen: true });
    if (s) { const q = pick([qSentFix, qSentBuild, qSentPick])(s, {}); if (q) { q.g = g; q.noDial = false; return q; } }
  }
  const ds = DRILLS.filter(d => d.g === g);
  return ds.length ? qFromDrill(pick(ds)) : null;
}
function startSmart() {
  closeNodePop && closeNodePop();
  const peeked = Object.keys(S.pk).filter(k => W[k]).sort((a, b) => peekScore(b) - peekScore(a)).slice(0, 5).map(k => W[k]);
  let words = uniq(peeked.concat(smartWords(10))).slice(0, 12);
  if (words.length < 4) words = words.concat(lessonWordsOf(currentLesson()).filter(w => !words.includes(w)).slice(0, 6 - words.length));
  const pairs = confPairs(3), gs = weakGrammar(3);
  let xi = 0;
  const mix = mixPairs(3).filter(p => S.cc[ccKey(...p)]); // characters you mix up
  const miss = missDue().slice(0, 5), wt = weakTypes(2); // questions from your mistake notebook, and the question types you find hardest
  const extras = [...miss.map(s => () => missQ(s)), ...pairs.map(([a, b]) => () => qContrast(a, b)), ...mix.map(([a, b]) => () => pick(pairQs(a, b)) || null), ...gs.map(g => () => qGrammarFor(g)), ...wt.map(t => () => typeQ(t))];
  runAdaptive({ title: '智慧複習', smart: true, len: 15 + Math.min(5, miss.length), hearts: 0, back: () => go('learn'),
    gen: wordGen(words, { teach: 0, pool: WL.filter(x => x.lv !== 9), extra: () => xi < extras.length ? extras[xi++]() : null, extraEvery: extras.length > 5 ? 2 : 3 }),
    onDone: () => ({ chest: 0 }) });
}
function currentLesson() { const nd = currentNode(); return nd && nd.unit !== 'FIN' ? nd.unit : LES[LES.length - 1].id; }
function smartCounts() {
  const seenW = WL.filter(w => S.cards[w.k] && w.lv !== 9);
  return { due: seenW.filter(w => due(w.k)).length, weak: seenW.filter(w => stageOf(w.k) <= 2).length, conf: confPairs(20).length, looked: Object.keys(S.look).length, peeked: Object.keys(S.pk).filter(k => peekScore(k) >= .5).length, seen: seenW.length, miss: missDue().length };
}
function smartCardHTML() {
  const c = smartCounts();
  if (!c.seen) return '';
  const dl = dialLv();
  return `<button class="smart-card" id="smartGo"><span class="sc-m">${mascotSVG({ mood: 'think', size: 54 })}</span>
    <span class="sc-t"><span class="sc-eyebrow">For you · 智慧複習</span><b>Smart review</b>
    <span class="sc-chips"><span>${c.due} due</span><span>${c.weak} still weak</span>${c.peeked ? `<span>${c.peeked} peeked</span>` : ''}${c.conf ? `<span>${c.conf} mix-up${c.conf > 1 ? 's' : ''}</span>` : ''}${c.miss ? `<span>${c.miss} mistake${c.miss > 1 ? 's' : ''} to redo</span>` : ''}</span></span>
    <span class="sc-dial" title="Difficulty: ${DIAL_N[dl][1]}"><span class="dbars">${[1, 2, 3].map(i => `<i class="${i <= dl ? 'on' : ''}"></i>`).join('')}</span><small>${DIAL_N[dl][1]}</small></span></button>`;
}
/* word progress shown on the results screen */
function stageSummaryHTML(R) {
  const ch = Object.entries(R.st0 || {}).map(([k, s0]) => [k, s0, stageOf(k)]).filter(([k, a, b]) => a !== b && W[k]);
  const ups = ch.filter(x => x[2] > x[1]).slice(0, 8), downs = ch.filter(x => x[2] < x[1]).slice(0, 4);
  if (!ups.length && !downs.length) return '';
  const chip = ([k, a, b]) => `<span class="wchip ${b > a ? 'up' : 'down'}" data-say="${esc(W[k].h)}"><b class="han">${esc(W[k].h)}</b><span>${STG[a][1]} → <b>${STG[b][1]}</b></span></span>`;
  return `<div class="wprog"><div class="small muted">${ups.length ? 'Words that leveled up' : ''}${ups.length && downs.length ? ' · ' : ''}${downs.length ? `${downs.length} word${downs.length > 1 ? 's' : ''} need${downs.length > 1 ? '' : 's'} more practice` : ''}</div><div class="wchips">${ups.map(chip).join('')}${downs.map(chip).join('')}</div></div>`;
}

function peekSummaryHTML(R) {
  const ks = Object.entries(R.peeks || {}).filter(([k]) => W[k]);
  if (!ks.length) return '';
  const chip = ([k, kinds]) => `<span class="wchip peek" data-say="${esc(W[k].h)}"><b class="han">${esc(W[k].h)}</b><span>${kinds.includes('p') ? '拼' : ''}${kinds.includes('m') ? '意' : ''}</span></span>`;
  return `<div class="wprog"><div class="small muted">You peeked at ${ks.length} word${ks.length > 1 ? 's' : ''} — they come back first in your next lessons and Smart review</div><div class="wchips">${ks.slice(0, 12).map(chip).join('')}</div></div>`;
}
