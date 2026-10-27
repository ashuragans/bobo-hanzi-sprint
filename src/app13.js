/* ============================================================ MIDTERM-STYLE TESTS: a new test in the midterm's format every time
   Same five parts as the paper (picture matching, passages with a word bank, dialogues, measure words, second halves),
   built from the pools in content3.py (DATA.tests.style). Words you are weak on are blanked first. */
const ST = TT.style;
function weakKeys() { return new Set(WL.filter(w => S.cards[w.k] && (stageOf(w.k) <= 3 || recallNow(w.k) < .8)).map(w => w.k)); }
const weakHas = (h, weak) => { const w = H2W[h]; return !!(w && weak.has(w.k)); };
const ranked = (a, f) => a.map(x => [x, f(x) + Math.random()]).sort((x, y) => y[1] - x[1]).map(x => x[0]);

/* ---- a reading passage with a word bank: 13–14 of its marked words become blanks */
function genPassage(o = {}) {
  const weak = o.weak || weakKeys(), maxL = o.L ? LIDX[o.L] : 6, recent = S.ui.seenP || [];
  const pool = ST.passages.filter(p => LIDX[p.L] <= maxL && !(o.not || []).includes(p.id));
  if (!pool.length) return null;
  // passages you haven't had lately come first, then the ones with more of your weak words
  const p = ranked(pool, p => p.parts.filter(x => x[0] === 'b' && weakHas(x[1], weak)).length * .5 - (recent.includes(p.id) ? 8 - recent.indexOf(p.id) : 0))[0];
  S.ui.seenP = [p.id, ...recent.filter(x => x !== p.id)].slice(0, 8);
  const n = o.n || 13 + (Math.random() * 2 | 0), chosen = new Set();
  const slots = p.parts.map((x, i) => x[0] === 'b' ? i : -1).filter(i => i >= 0);
  for (const i of ranked(slots, i => weakHas(p.parts[i][1], weak) ? 1 : 0)) {
    if (chosen.size >= n) break;
    if (!chosen.has(i - 1) && !chosen.has(i + 1)) chosen.add(i); // never two blanks side by side
  }
  const names = {}, used = new Set();
  p.parts.filter(x => x[0] === 'n').forEach(([, sl]) => { if (names[sl]) return; const nm = pick(ST.names[sl[0]].filter(x => !used.has(x[0]))); used.add(nm[0]); names[sl] = nm; });
  const bank = shuffle([...chosen].map(i => p.parts[i][1])), parts = [], ans = [];
  const text = toks => { const last = parts[parts.length - 1]; if (last && !last[0]) last[1] = last[1].concat(toks); else parts.push([0, toks.slice()]); };
  p.parts.forEach((x, i) => {
    if (x[0] === 't') text(x[1]);
    else if (x[0] === 'n') text([[names[x[1]][0], names[x[1]][1]]]);
    else if (chosen.has(i)) { parts.push([1, ans.length]); ans.push(x[2].filter(a => bank.includes(a))); }
    else text(x[3]);
  });
  const en = p.en.replace(/\{([MF]2?)\}/g, (_, sl) => names[sl] ? names[sl][1] : '');
  return { kind: 'bank', cat: 'bank', pid: p.id, label: o.label || 'Read the passage and choose the correct word', bank, lines: [['', parts]], ans, en: [en],
    prompt: `<div class="small muted"><span class="han">${esc(p.title)}</span> · a new passage made for practice: every word in the bank is used once.</div>` };
}

/* ---- choose the second half of each sentence: one shared list, one half per sentence */
function genHalves(n = 8, o = {}) {
  const chosen = [], skip = o.used || new Set();
  for (const h of shuffle(ST.halves)) { if (!skip.has(h[1]) && !chosen.some(c => c[2] === h[2])) chosen.push(h); if (chosen.length >= n) break; }
  chosen.forEach(c => skip.add(c[1]));
  const st = { sec: 'Choose the correct second half of the sentence', opts: shuffle(chosen.map(c => c[1])) };
  return chosen.map(c => Object.assign(qChoice(st, [c[0], st.opts.indexOf(c[1])]), { qt: 'half' }));
}
/* ---- complete each dialogue: five dialogues of different kinds, plus two replies that fit none of them */
function genDialogs(n = 5, extra = 2, o = {}) {
  const chosen = [], skip = o.used || new Set();
  for (const d of shuffle(ST.dialogs)) { if (!skip.has(d[0]) && !chosen.some(c => c[2] === d[2])) chosen.push(d); if (chosen.length >= n + extra) break; }
  chosen.slice(0, n).forEach(c => skip.add(c[0]));
  const st = { sec: 'Choose an appropriate sentence to complete each dialogue', opts: shuffle(chosen.map(c => c[1])) };
  return chosen.slice(0, n).map(c => Object.assign(qChoice(st, [`A：${c[0]}　B：＿＿`, st.opts.indexOf(c[1])]), { qt: 'dialog',
    prompt: `<div class="qa"><div><b>A：</b><span class="han">${esc(c[0])}</span></div><div><b>B：</b><span class="sblank">＿＿</span></div></div>` }));
}

/* ---- measure-word bank: each measure word fits exactly one line */
const MW_TWIN = { 枝: '支', 支: '枝' };
function genMwBank(n = 12, o = {}) {
  for (let t = 0; t < 30; t++) {
    const rows = [];
    for (const m of shuffle(uniq(ST.mw.flatMap(x => x[1])).filter(m => m !== '個'))) { // 個 fits almost anything, so it is never in the bank
      if (rows.length >= n) break;
      const bank = rows.map(r => r.m).concat(m);
      if ((MW_TWIN[m] && bank.includes(MW_TWIN[m])) || rows.some(r => r.ok.includes(m) || r.noun.includes(m))) continue;
      const fit = ST.mw.filter(([noun, ok]) => ok.includes(m) && ok.every(x => x === m || !bank.includes(x)) && !bank.some(x => noun.includes(x)) && !rows.some(r => r.noun === noun));
      if (fit.length) { const [noun, ok] = pick(fit); rows.push({ m, noun, ok }); }
    }
    if (rows.length < Math.min(n, 8)) continue;
    const bank = shuffle(rows.map(r => r.m));
    const lines = rows.map((r, i) => [String(i + 1), [[0, tokenizeLoose(pick(['一', '兩', '三', '四', '五', '六', '八', '十', '幾', '這', '那']))], [1, i], [0, tokenizeLoose(r.noun)]]]);
    return { kind: 'bank', cat: 'money', label: o.label || 'Choose the measure word, each measure word can only be used once', bank, lines, ans: rows.map(r => r.ok.filter(x => bank.includes(x))), prompt: '' };
  }
  return null;
}

/* ---- picture matching: 12 words from one theme, no two sharing a picture */
const picParts = p => { try { return [...new Intl.Segmenter().segment(p)].map(s => s.segment).filter(s => s.trim()); } catch (e) { return [p]; } };
function genPicSet(o = {}) {
  const th = o.theme || pick(ST.pics), weak = o.weak || weakKeys(), n = o.n || 12, out = [], usedP = new Set();
  for (const h of ranked(th.words, h => weakHas(h, weak) ? .7 : 0)) {
    if (out.length >= n) break;
    const p = TT.pic[h] || (H2W[h] && H2W[h].em); if (!p) continue;
    const ps = picParts(p); if (ps.some(x => usedP.has(x))) continue;
    ps.forEach(x => usedP.add(x)); out.push(h);
  }
  const items = shuffle(out);
  return { kind: 'bank', layout: 'pics', cat: 'pics', label: o.label || th.title + ' — write the letter for each picture', bank: shuffle(out), items, ans: items.map(w => [w]), prompt: '' };
}

/* ---- the whole test: listening, then the five reading parts in the paper's order */
function midStyleTest(o = {}) {
  const short = !!o.short, weak = weakKeys(), qs = [];
  if (ttsOK() && !o.noListen) for (let i = 0, used = new Set(); i < (short ? 3 : 5); i++) { let g; do { g = Math.random() * LGEN.length | 0; } while (used.has(g) && used.size < LGEN.length); used.add(g); qs.push(LGEN[g]()); }
  sampleN(ST.pics, short ? 1 : 2).forEach((th, i) => qs.push(genPicSet({ theme: th, weak, n: short ? 10 : 12, label: `Part ${i + 1} · ${th.title} — write the letter for each picture` })));
  const p1 = genPassage({ weak }); qs.push(p1);
  if (!short) qs.push(genPassage({ weak, not: [p1 && p1.pid] }));
  const dUsed = new Set(), hUsed = new Set();
  qs.push(...genDialogs(5, 2, { used: dUsed }));
  if (!short) qs.push(...genDialogs(5, 2, { used: dUsed }));
  qs.push(genMwBank(short ? 8 : 12));
  qs.push(...genHalves(8, { used: hUsed }));
  if (!short) qs.push(...genHalves(10, { used: hUsed }));
  return qs.filter(Boolean);
}

/* ---- drills for each part */
(() => {
  const qa = DRILL_SETS.find(s => s.id === 'qa'); if (qa) qa.make = () => shuffle([[...genChoiceSet(5)], genDialogs(5, 2)]).flat();
  const pics = DRILL_SETS.find(s => s.id === 'pics'); if (pics) pics.make = () => shuffle([...sampleN(TT.pics.concat(TT.last.pics, TT.mid.pics), 1).map(qPics), genPicSet(), genPicSet()]);
  DRILL_SETS.unshift(
    { id: 'passage', zh: '短文填空', en: 'Read a passage, fill the blanks', d: 'A new passage with a word bank A–N, like the reading part of your midterm. Different blanks every time.', make: () => { const a = genPassage(); return [a, genPassage({ not: [a && a.pid] })].filter(Boolean); } },
    { id: 'halves', zh: '後半句', en: 'Second halves', d: 'Pick the second half of each sentence from one list — you have to understand the whole sentence.', make: () => { const u = new Set(); return [...genHalves(8, { used: u }), ...genHalves(8, { used: u })]; } },
    { id: 'mwbank', zh: '量詞填空', en: 'Measure-word bank', d: '12 measure words, 12 nouns, each measure word used once — like your midterm.', make: () => [genMwBank(12), genMwBank(12)].filter(Boolean) });
})();
