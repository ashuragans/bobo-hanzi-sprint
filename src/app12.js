/* ============================================================ MEMORY & READING UPGRADES
   1) Look-alike characters. scripts/build.py works out which characters look alike from their stroke shapes (DATA.look);
      S.cc counts the pairs YOU mix up. "Which character?" questions, look-alike wrong choices and the 字形診所 mix-up clinic
      (a contrast card with the different strokes in red, then questions that mix both) pull them apart.
   2) Reading in context: who / when / where / what questions on whole sentences (the order every sentence follows), and
      "choose the reply" questions built from the lesson dialogues, like the dialogue part of the midterm.
   3) The memory forecast on the Stats page, from the memory model in app1 (fsR, recallNow). */

/* ---- look-alikes */
const LOOKC = Object.assign({}, DATA.look || {});
LOOK.forEach(set => set.forEach(a => { const add = set.filter(b => b !== a && !(LOOKC[a] || '').includes(b)).join(''); if (add) LOOKC[a] = add + (LOOKC[a] || ''); })); // hand-picked sets (app4) first
const ccKey = (a, b) => a < b ? a + b : b + a;
const ccOf = c => Object.entries(S.cc).reduce((a, [k, n]) => a + (k.includes(c) ? n : 0), 0);
const looksLike = (a, b) => (LOOKC[a] || '').includes(b) || (LOOKC[b] || '').includes(a);
function noteCharMix(a, b, d = 1) {
  if (!a || !b || a === b || !HAN.test(a) || !HAN.test(b)) return;
  const k = ccKey(a, b), n = (S.cc[k] || 0) + d;
  if (n <= 0) delete S.cc[k]; else S.cc[k] = Math.min(9, n);
}
/* you picked word `conf` instead of word `k`: remember the characters you mixed up */
function noteWordMix(k, conf) {
  const a = W[k] && W[k].h, b = W[conf] && W[conf].h;
  if (!a || !b || a.length !== b.length) return;
  const diff = [...a].map((c, i) => [c, b[i]]).filter(([x, y]) => x !== y);
  diff.forEach(([x, y]) => { if (looksLike(x, y)) noteCharMix(x, y); }); // only shape mix-ups (請客/請問 is a meaning mix-up)
}
function lookAlikes(c, n = 3) { // the ones you've mixed up first, then the closest shapes
  const mine = Object.entries(S.cc).filter(([k]) => k.includes(c)).sort((x, y) => y[1] - x[1]).map(([k]) => k.replace(c, ''));
  return uniq(mine.concat([...(LOOKC[c] || '')])).filter(x => x && x !== c && HAN.test(x) && !isSyn(x, c)).slice(0, n);
}
/* words that look like w: same length, every character the same or a look-alike (買 → 賣, 午 → 牛, 問 → 間) */
function lookWords(w, pool) {
  if (!w) return [];
  const close = (c, x) => c === x ? 0 : (S.cc[ccKey(c, x)] || 0) * 10 + 9 - Math.min(...[(LOOKC[c] || '').indexOf(x), (LOOKC[x] || '').indexOf(c)].map(i => i < 0 ? 9 : i));
  return pool.filter(o => o.k !== w.k && o.h !== w.h && o.h.length === w.h.length && [...o.h].every((c, i) => c === w.h[i] || looksLike(c, w.h[i])))
    .map(o => [[...o.h].reduce((s, c, i) => s + close(w.h[i], c), 0), o]).sort((x, y) => y[0] - x[0]).map(x => x[1]); // closest first
}
function wordForChar(c) {
  const w1 = H2W[c]; if (w1 && w1.h === c && w1.lv !== 9) return w1;
  return WL.filter(w => w.h.includes(c) && w.lv !== 9 && HAN.test(w.h)).sort((a, b) => (seen(b.k) - seen(a.k)) || (b.ls.length - a.ls.length) || (a.h.length - b.h.length))[0] || null;
}

/* ---- which strokes differ (for the red strokes on contrast cards). The stroke rule is the same as in scripts/build.py. */
function strokeType(m) {
  const [x0, y0] = m[0], [x1, y1] = m[m.length - 1];
  const d = Math.floor((Math.atan2(y0 - y1, x1 - x0) * 180 / Math.PI + 382.5) % 360 / 45);
  let turn = 0;
  for (let i = 0; i + 2 < m.length; i++) {
    const v1 = [m[i + 1][0] - m[i][0], m[i + 1][1] - m[i][1]], v2 = [m[i + 2][0] - m[i + 1][0], m[i + 2][1] - m[i + 1][1]], n1 = Math.hypot(...v1), n2 = Math.hypot(...v2);
    if (n1 > 25 && n2 > 25 && (v1[0] * v2[0] + v1[1] * v2[1]) / (n1 * n2) < .3) { turn = 1; break; }
  }
  return d * 4 + turn * 2 + (Math.hypot(x1 - x0, y1 - y0) > 250 ? 1 : 0);
}
function resample(m, n = 6) {
  const seg = []; let tot = 0;
  for (let i = 1; i < m.length; i++) { const d = Math.hypot(m[i][0] - m[i - 1][0], m[i][1] - m[i - 1][1]); seg.push(d); tot += d; }
  if (!tot) return Array(n).fill(m[0]);
  return Array.from({ length: n }, (_, k) => {
    let t = tot * k / (n - 1), i = 0;
    while (i < seg.length - 1 && t > seg[i]) { t -= seg[i]; i++; }
    const f = seg[i] ? Math.min(1, t / seg[i]) : 0;
    return [m[i][0] + (m[i + 1][0] - m[i][0]) * f, m[i][1] + (m[i + 1][1] - m[i][1]) * f];
  });
}
const pathLen = m => m.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - m[i][0], p[1] - m[i][1]), 0);
/* the part both characters share: every stretch where the two stroke sequences run in the same directions is tried, and
   the longest one whose strokes also sit in the same place with the same length (measured inside that part, so 買 inside
   賣 still counts) wins. Every other stroke is a difference: 未/末 differ in the two lengths of 一, 媽/嗎 in 女 and 口. */
function strokeDiff(a, b) {
  const A = STROKES[a].medians, B = STROKES[b].medians, ta = A.map(m => strokeType(m) >> 1), tb = B.map(m => strokeType(m) >> 1);
  // a component can be squeezed narrower or flatter in one character, so x and y are scaled separately
  const box = (M, i0, L) => { const ps = M.slice(i0, i0 + L).flat(), xs = ps.map(p => p[0]), ys = ps.map(p => p[1]), x = Math.min(...xs), y = Math.min(...ys), w = Math.max(...xs) - x, h = Math.max(...ys) - y, m = Math.max(w, h, 1);
    return [x, y, Math.max(w, m * .25), Math.max(h, m * .25)]; };
  const unit = (M, k, b) => resample(M[k]).map(p => [(p[0] - b[0]) / b[2], (p[1] - b[1]) / b[3]]);
  const fits = (ia, ib, L) => {
    const ba = box(A, ia, L), bb = box(B, ib, L);
    for (let k = 0; k < L; k++) {
      const pa = unit(A, ia + k, ba), pb = unit(B, ib + k, bb), la = pathLen(pa), lb = pathLen(pb);
      const dist = pa.reduce((s, p, i) => s + Math.hypot(p[0] - pb[i][0], p[1] - pb[i][1]), 0) / pa.length;
      if (dist > .1 || (Math.max(la, lb) > .2 && (la / Math.max(lb, 1e-6) < .75 || la / Math.max(lb, 1e-6) > 1.33))) return false; // dots vary in length
    }
    return true;
  };
  let best = null;
  for (let i = 0; i < ta.length; i++) for (let j = 0; j < tb.length; j++) {
    if (ta[i] !== tb[j] || (i && j && ta[i - 1] === tb[j - 1])) continue; // only where a shared run starts
    let n = 0; while (i + n < ta.length && j + n < tb.length && ta[i + n] === tb[j + n]) n++;
    for (let L = n; L >= 2 && !(best && L <= best[2]); L--) { const s = [...Array(n - L + 1).keys()].find(s => fits(i + s, j + s, L)); if (s != null) { best = [i + s, j + s, L]; break; } }
  }
  if (!best) return [new Set(), new Set()]; // nothing in common: don't paint whole characters red
  const da = new Set(A.keys()), db = new Set(B.keys());
  for (let k = 0; k < best[2]; k++) { da.delete(best[0] + k); db.delete(best[1] + k); }
  return [da, db];
}
const diffOf = (a, b) => STROKES && STROKES[a] && STROKES[b] ? strokeDiff(a, b) : [new Set(), new Set()];
function charSVG(c, diff = new Set()) {
  const d = STROKES && STROKES[c];
  if (!d) return `<span class="han mixt">${esc(c)}</span>`;
  return `<svg class="mixsvg" viewBox="0 0 1024 1024" role="img" aria-label="${esc(c)}"><g transform="translate(0,900) scale(1,-1)">${d.strokes.map((p, i) => `<path d="${p}" style="fill:var(${diff.has(i) ? '--seal' : '--ink'})"/>`).join('')}</g></svg>`;
}
function mixHTML(a, b) { // the two characters side by side, different strokes in red
  const [da, db] = diffOf(a, b);
  const side = (c, d) => { const w = wordForChar(c); return `<div class="mixc">${charSVG(c, d)}<div class="small"><b class="han">${esc(w ? w.h : c)}</b>${w ? ` ${esc(phon(w.p))} · ${esc(shortEn(w.e))}` : ''}</div></div>`; };
  return `<div class="mixpair">${side(a, da)}<span class="mixvs" aria-hidden="true">≠</span>${side(b, db)}</div>${da.size || db.size ? '<div class="tiny faint">Red strokes = the difference.</div>' : ''}`;
}

/* ---- "which character completes the word?" for any word (the look-alikes come from the stroke shapes and your mix-ups) */
function qLookC(w, lvl = 3, o = {}) {
  const spots = [...w.h].map((c, i) => [c, i]).filter(([c]) => HAN.test(c) && (!o.ch || c === o.ch) && lookAlikes(c).length >= (o.vs ? 1 : 2));
  if (!spots.length) return null;
  const [ch, at] = spots.sort((x, y) => ccOf(y[0]) - ccOf(x[0]) || Math.random() - .5)[0];
  // never offer a character that makes another word with the same meaning (他們 / 她們)
  const alts = uniq([o.vs, ...lookAlikes(ch, 4)].filter(Boolean)).filter(x => { if (x === ch) return false; const f = w.h.slice(0, at) + x + w.h.slice(at + 1), fw = H2W[f]; return !(fw && fw.h === f && sameMeaning(fw, w)); }).slice(0, 3);
  if (alts.length < 2) return null;
  const shown = [...w.h].map((c, i) => i === at ? '<span class="lkbox">?</span>' : esc(c)).join('');
  return mcq({ kind: 'mc', cat: 'chars', sk: 'r', k: w.k, qt: 'lookc', lvl, label: 'Which character completes the word?', han: true,
    prompt: `<div class="qbig">${shown}</div><div>${lvl >= 4 ? '' : `<b style="color:var(--jade)">${esc(phon(w.p))}</b> · `}${esc(w.e)}</div>`,
    opts: [ch, ...alts], ans: [0], explain: wordLine(w) + mixHTML(ch, alts[0]),
    after: (ok, yours) => { if (ok) alts.forEach(x => noteCharMix(ch, x, -.5)); else noteCharMix(ch, yours); } });
}
QT.lookc = { sk: 'r', f: (w, qt, lvl) => qLookC(w, lvl) };
[[2, .7], [3, .9], [4, .6]].forEach(([l, wt]) => LADDER[l].push(['lookc', wt]));

/* ---- 字形診所 mix-up clinic */
function contrastTeach(a, b) {
  const [da, db] = diffOf(a, b);
  const card = (c, d) => { const w = wordForChar(c);
    return `<div class="mixcard">${charSVG(c, d)}${w ? `<div class="row" style="justify-content:center;gap:6px"><b class="han" style="font-size:1.3rem">${esc(w.h)}</b><button class="playbtn" style="margin:0" data-say="${esc(w.h)}" aria-label="Play">${IC.sound}</button></div><div class="bigpy" style="font-size:1rem">${esc(phon(w.p))}</div><div class="small">${esc(w.e)}</div>` : ''}${MN[c] ? `<div class="tiny muted">${esc(MN[c][0])} — ${esc(MN[c][1])}</div>` : ''}</div>`; };
  return { kind: 'teach', label: '字形 · Spot the difference', say: null,
    html: `<div class="teach"><div class="mixcards">${card(a, da)}${card(b, db)}</div><p class="small muted" style="text-align:center">${da.size || db.size ? 'The red strokes are what makes them different. ' : ''}Say each one out loud, then tell them apart.</p></div>` };
}
function pairQs(a, b) {
  const wa = wordForChar(a), wb = wordForChar(b), out = [];
  [[wa, a, b], [wb, b, a]].forEach(([w, c, other]) => { const q = w && qLookC(w, 3, { ch: c, vs: other }); if (q) out.push(q); });
  if (wa && wb && !sameMeaning(wa, wb) && wa.e !== wb.e) {
    const [x, y] = Math.random() < .5 ? [wa, wb] : [wb, wa], others = smartDist(x, WL.filter(o => o.lv !== 9), 4, 'h2e', 2).filter(o => o.k !== y.k && o.e !== y.e).slice(0, 2);
    out.push(mcq({ kind: 'mc', cat: 'chars', sk: 'm', k: x.k, qt: 'lookm', label: 'What does it mean?', prompt: `<div class="qbig">${esc(x.h)}</div>`, opts: [x.e, y.e, ...others.map(o => o.e)],
      optK: [x.k, y.k, ...others.map(o => o.k)], ans: [0], explain: wordLine(x) + wordLine(y), hidePy: true, sayAfter: x.h }));
  }
  return out;
}
function mixPairs(n = 4) { // your own mix-ups first, then look-alikes among the characters you've met
  const mine = Object.entries(S.cc).sort((x, y) => y[1] - x[1]).map(([k]) => [...k]);
  const chars = ws => uniq(ws.flatMap(w => [...w.h].filter(c => HAN.test(c))));
  const known = chars(WL.filter(w => seen(w.k) && w.lv !== 9)), pool = known.length >= 12 ? known : chars(lessonWordsOf(currentLesson()));
  const auto = shuffle(pool).map(c => { const o = [...(LOOKC[c] || '')].find(x => pool.includes(x)); return o ? [c, o] : null; }).filter(Boolean);
  const out = [], used = new Set();
  for (const [a, b] of mine.concat(auto)) { const k = ccKey(a, b); if (used.has(k) || !wordForChar(a) || !wordForChar(b)) continue; used.add(k); out.push([a, b]); if (out.length >= n) break; }
  return out;
}
function startClinic(back) {
  const start = () => {
    const pairs = mixPairs(4);
    if (!pairs.length) return toast('Learn a few words first — then 波波 can find the characters that look alike.');
    // each pair: its contrast card and one question; then all the other questions mixed together (that's what trains telling them apart)
    const sets = pairs.map(([a, b]) => shuffle(pairQs(a, b))), qs = [];
    pairs.forEach(([a, b], i) => qs.push(contrastTeach(a, b), ...sets[i].splice(0, 1)));
    qs.push(...shuffle(sets.flat()));
    runQuiz({ title: '字形診所', adaptive: true, hearts: 0, qs, back: back || (() => go('practice')) });
  };
  loadStrokes().then(start, start);
}
const mixCount = () => Object.keys(S.cc).length;

/* ---- reading in context: who / when / where / what */
const ROLE = { s: ['誰？', 'Who?', 'who'], t: ['什麼時候？', 'When?', 'when'], hr: ['幾點？', 'What time?', 'when'], pl: ['去哪裡？', 'Where to?', 'where'],
  a: ['做什麼？', 'Doing what?', 'what'], r: ['做什麼？', 'Doing what?', 'what'], to: ['送給誰？', 'To whom?', 'to whom'], it: ['什麼東西？', 'What thing?', 'what thing'],
  tr: ['怎麼去？', 'How?', 'how'], ds: ['去哪裡？', 'Where to?', 'where'], fr: ['從哪裡？', 'From where?', 'from'] };
function frameParts(s) { // the parts of a generated sentence that answer who / when / where / what
  if (!isGen(s)) return [];
  const chunks = s.chunks.map(c => c.join('')), out = [];
  s.t.sl.forEach(sl => { const v = s.v[sl], t = v && v.h && ROLE[sl] ? v.h.join('') : ''; if (t && chunks.includes(t) && !out.some(x => x[1] === t)) out.push([sl, t]); });
  return out;
}
function sentMapHTML(s) {
  const parts = frameParts(s);
  return `<div class="smap">${s.chunks.map(c => { const t = c.join(''), p = parts.find(x => x[1] === t);
    return `<span class="smc ${p ? 'r-' + ROLE[p[0]][2].replace(' ', '') : ''}"><b class="han">${esc(t)}</b>${p ? `<small>${ROLE[p[0]][2]}</small>` : ''}</span>`; }).join('')}</div><div class="small">${esc(s.en)}</div>`;
}
function qSentFrame(s, o = {}) {
  const parts = frameParts(s);
  if (parts.length < 3) return null;
  const [sl, ans] = pick(parts);
  noteSent(s.zh);
  return mcq({ kind: 'mc', cat: 'reading', qt: 'frame', sk: 'u', label: 'Read the sentence, then answer', han: true,
    prompt: `<div class="qsent zh">${sentHTML(s.toks)}</div><div class="qmid" style="margin-top:6px"><span class="han">${ROLE[sl][0]}</span> <span class="small muted">${ROLE[sl][1]}</span></div>`,
    opts: [ans, ...shuffle(parts.filter(p => p[1] !== ans).map(p => p[1]))].slice(0, 4), ans: [0], explain: sentMapHTML(s), sayAfter: s.zh,
    k: o.k, ks: keysExcept(s, o.k), g: s.g, sent: s, hidePy: o.hidePy ?? dialLv() >= 2 });
}
function genFrame(o = {}) {
  for (let i = 0; i < 8; i++) { const s = genSent(pick(['qu', 'freq', 'clock', 'song', 'trans', 'congdao', 'transdao']), {}, o), q = s && qSentFrame(s, o); if (q) return q; }
  return null;
}
QT.frame = { sk: 'u', f: qSent };
[[3, .7], [4, .9], [5, .6]].forEach(([l, wt]) => LADDER[l].push(['frame', wt]));

/* ---- choose the reply: question → answer pairs from the lesson dialogues and grammar examples */
function qClass(q) {
  const t = q.replace(/[？?！!。\s]+$/, '').split(/[，。！]/).pop();
  return /誰/.test(t) ? 'who' : /哪國/.test(t) ? 'country' : /哪裡|在哪|哪兒/.test(t) ? 'where' : /幾點|什麼時候|幾月|幾號|星期幾/.test(t) ? 'when'
    : /多少|幾/.test(t) ? 'count' : /還是/.test(t) ? 'or' : /什麼/.test(t) ? 'what' : /^怎麼樣$/.test(t) ? 'yn' : /怎麼/.test(t) ? 'how' : /呢$/.test(t) ? 'ne' : 'yn';
}
// kinds of question whose answers could also fit each other are never mixed (好啊！ answers 好不好？ and 怎麼樣？ alike; 我要… answers 要不要？ and 要點什麼？)
const QGROUP = { yn: 'y', ne: 'y', how: 'y', what: 'y', or: 'y', who: 'p', country: 'p', where: 'where', when: 'when', count: 'count' };
const QA = [];
LES.forEach(L => L.texts.forEach(tx => tx.lines.forEach((l, i) => {
  const nx = tx.lines[i + 1]; if (!nx || !l[0] || !nx[0] || l[0] === nx[0]) return;
  const q = plainZh(l[1]), a = plainZh(nx[1]);
  if (/？$/.test(q) && !/？$/.test(a)) QA.push({ q: l[1], az: a, en: l[2] + ' — ' + nx[2], L: L.id, g: QGROUP[qClass(q)] });
})));
Object.values(G).forEach(g => { if (g.later) return; g.ex.forEach(([toks, en]) => {
  const at = toks.findIndex(t => !t[1] && t[0].includes('—')); if (at < 1) return;
  const q = toks.slice(0, at).concat([['？', '']]), az = plainZh(toks.slice(at + 1)).trim();
  if (/？$/.test(plainZh(q)) && az && !/？$/.test(az)) QA.push({ q, az, en, L: g.L, g: QGROUP[qClass(plainZh(q))] });
}); });
/* a set like the midterm: a few questions sharing one list of replies (one reply per kind of question, so only one fits) */
function genChoiceSet(n = 5, o = {}) {
  const maxL = o.L ? LIDX[o.L] : LMAX, pool = shuffle(QA.filter(x => (LIDX[x.L] ?? LMAX) <= maxL)), chosen = o.with ? [o.with] : [];
  for (const x of pool) { if (!chosen.some(y => y.g === x.g || y.az === x.az)) chosen.push(x); if (chosen.length >= n + 1) break; }
  if (chosen.length < 3) return [];
  const opts = shuffle(chosen.map(x => x.az));
  return chosen.slice(0, Math.min(n, chosen.length - 1)).map(x => ({ kind: 'mc', cat: 'reading', qt: 'qa', abc: true, han: true, label: 'Choose an appropriate sentence to complete each dialogue',
    prompt: `<div class="qa"><div><b>A：</b><span class="zh">${ruby(x.q)}</span></div><div><b>B：</b><span class="sblank">＿＿</span></div></div>`,
    opts, ans: [opts.indexOf(x.az)], hidePy: o.hidePy ?? dialLv() >= 2, sig: 'qa|' + QA.indexOf(x), explain: `<div class="zh">${ruby(x.q)}</div><div class="han">${esc(x.az)}</div><div class="small">${esc(x.en)}</div>` }));
}

/* ---- memory forecast (Stats page) */
function memoryCardHTML() {
  const now = Date.now(), met = WL.filter(w => S.cards[w.k] && w.lv !== 9);
  if (!met.length) return '';
  const td = parseYmd(S.testDate).getTime() + 9 * 36e5, ahead = td > now, when = ahead ? td : now;
  const at = w => { const f = S.fs[w.k]; return f ? fsR(Math.max(0, when - f[2]) / 864e5, f[0]) : recallNow(w.k, when); };
  const rows = LES.map(L => { const ws = L.words.map(k => W[k]).filter(w => w && S.cards[w.k]); if (!ws.length) return '';
    const v = ws.reduce((a, w) => a + at(w), 0) / ws.length;
    return `<div class="catrow"><span class="small han">${L.num}</span><div class="bar ${v < .6 ? 'seal' : v < .8 ? 'gold' : ''}"><i style="width:${Math.round(v * 100)}%"></i></div><span class="nums small" style="text-align:right">${Math.round(v * 100)}%</span></div>`; }).join('');
  const fading = met.filter(w => recallNow(w.k) < .8).length, week = met.filter(w => S.cards[w.k][1] < now + 7 * 864e5).length;
  return `<div class="card span2"><h3>Memory forecast</h3><p class="small muted" style="margin:2px 0 10px">${ahead ? `How much of each lesson you'd still remember on test day (${esc(S.testDate)}) if you stopped reviewing now:` : 'How much of each lesson you remember right now:'}</p>
    <div class="catrows">${rows}</div>
    <p class="small" style="margin-top:8px"><b class="nums">${fading}</b> word${fading === 1 ? ' is' : 's are'} fading now · <b class="nums">${week}</b> come${week === 1 ? 's' : ''} back for review this week. Each word returns just before you would forget it${ahead ? ', and every word comes back by the day before your test' : ''}. Set your next test date in Settings.</p></div>`;
}

/* ---- drills and hub */
(() => {
  const lk = DRILL_SETS.find(s => s.id === 'look');
  if (lk) { lk.d = 'Fill in the missing character — the choices look alike (from the stroke shapes, and the ones you mix up).';
    lk.make = () => { const ws = shuffle(lessonWords().filter(w => w && seen(w.k)).concat(shuffle(lessonWords()))), out = [];
      for (const w of ws) { if (out.length >= 12) break; if (out.some(q => q.k === w.k)) continue; const q = qLookC(w, 3); if (q) out.push(q); }
      while (out.length < 12) out.push(qLook()); return out; }; }
  DRILL_SETS.unshift(
    { id: 'clinic', zh: '字形診所', en: 'Mix-up clinic', d: 'Characters that look alike, side by side with the different strokes in red — then questions that mix them up.', start: back => startClinic(back) },
    { id: 'frame', zh: '誰・何時・哪裡', en: 'Who, when, where, what', d: 'Read a whole sentence and find who, when, where and what — every Chinese sentence follows that order.', make: () => Array.from({ length: 10 }, () => genFrame()).filter(Boolean) },
    { id: 'qa', zh: '選回答', en: 'Choose the reply', d: 'Questions from the lessons with a list of replies — like the dialogue part of your midterm.', make: () => [...genChoiceSet(5), ...genChoiceSet(5)] });
})();
