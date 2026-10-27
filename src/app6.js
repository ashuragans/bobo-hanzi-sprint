/* ============================================================ TEACHER-STYLE TESTS */
const TT = DATA.tests;
const SEC1 = 'Choose the correct word to complete the conversation';
const PAPAYA = `<svg viewBox="0 0 64 64" aria-label="papaya"><ellipse cx="32" cy="32" rx="17" ry="27" style="fill:#f39a3a;stroke:#3f8a3f" stroke-width="4"/><ellipse cx="32" cy="35" rx="7" ry="14" style="fill:#f7c46c"/>${[[30, 26], [34, 30], [29, 34], [35, 37], [31, 41], [33, 45], [30, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" style="fill:#2b1a0c"/>`).join('')}</svg>`;
function picHTML(word) {
  const p = TT.pic[word] || (H2W[word] && H2W[word].em) || '❓';
  if (p === 'svg:papaya') return PAPAYA;
  if (p.startsWith('🏷️$')) return `<span>🏷️<b style="font:800 1.1rem var(--f-disp);color:var(--gold)">$1</b></span>`;
  return esc(p);
}
function seqFor(tiles, ans) {
  const used = new Set(), out = []; let pos = 0, guard = 0;
  while (pos < ans.length && guard++ < 40) {
    let best = -1;
    tiles.forEach((t, i) => { if (!used.has(i) && ans.startsWith(t, pos) && (best < 0 || t.length > tiles[best].length)) best = i; });
    if (best < 0) break;
    used.add(best); out.push(best + 1); pos += tiles[best].length;
  }
  return out.join(' / ');
}
function qBank(set, opt = {}) {
  let bank = set.bank.slice(), ans = set.ans;
  if (opt.shuffleBank) { bank = shuffle(bank); }
  const cat = set.kind === 'mw' ? 'money' : set.kind === 'opp' ? 'opp' : 'bank';
  const label = set.sec ? (/^[IVX]+\./.test(set.sec) ? set.sec : 'I. ' + set.sec) : (set.kind === 'cloze' ? 'Read and fill in the blanks' : 'I. ' + SEC1);
  return { kind: 'bank', cat, label, bank, lines: set.lines, ans, prompt: set.kind === 'cloze' ? '<div class="small muted">A short passage, like the reading part of your test.</div>' : '',
    explainFor: k => '', after: null };
}
function wTok(w) { const x = H2W[w]; return [[w, x ? x.p : '']]; }
function qOpp(n = 7) {
  const pool = shuffle(TT.opp), chosen = [], seenW = new Set();
  for (const [a, b] of pool) { if (seenW.has(a) || seenW.has(b)) continue; seenW.add(a); seenW.add(b); chosen.push(Math.random() < .5 ? [a, b] : [b, a]); if (chosen.length >= n) break; }
  const bank = shuffle(chosen.map(c => c[1]));
  const lines = chosen.map(([l], k) => [String(k + 1), [[0, wTok(l)], [0, [[' ↔ ', '']]], [1, k]]]);
  return { kind: 'bank', cat: 'opp', label: 'IV. Choose the opposite word', bank, lines, ans: chosen.map(c => [c[1]]), prompt: '' };
}
function qPics(set) {
  return { kind: 'bank', layout: 'pics', cat: 'pics', label: 'VI. ' + set.title + ' — write the letter for each picture', bank: set.bank.slice(), items: set.items.slice(), ans: set.items.map(w => [w]), prompt: '' };
}
function qOrderNum(o, fixed) {
  const tiles = fixed ? o.t.slice() : shuffle(o.t);
  return { kind: 'order', cat: 'order', numbered: true, label: 'II. Regroup the sentence in correct order', prompt: `<div class="qmid" style="font-size:1.25rem">${tiles.map((t, i) => `${esc(t)} <span class="small faint">(${i + 1})</span>`).join(' / ')}</div>`,
    hint: o.en, tiles, answers: o.a, end: o.end || '。', note: o.note || '', explain: '' };
}

/* ---- listening: hear a sentence, pick picture A, B or C */
const LD = { drink: [['奶茶', '🧋'], ['咖啡', '☕'], ['綠茶', '🍵'], ['紅茶', '🫖'], ['牛奶', '🥛'], ['果汁', '🧃'], ['汽水', '🥤']],
  fruit: [['蘋果', '🍎'], ['香蕉', '🍌'], ['西瓜', '🍉'], ['橘子', '🍊'], ['芒果', '🥭'], ['葡萄', '🍇'], ['草莓', '🍓'], ['鳳梨', '🍍'], ['番茄', '🍅']],
  act: [['起床', '⏰🛏️'], ['刷牙', '🪥🦷'], ['吃早飯', '🥐🥛'], ['去學校', '🎒🏫'], ['看書', '📖🤓'], ['看電視', '🛋️📺'], ['洗澡', '🛁🧼'], ['睡覺', '😴🌙'], ['做飯', '🍳🔥'], ['回家', '🚶🏠'], ['上課', '🧑‍🏫📝']],
  hobby: [['打籃球', '🏀'], ['打網球', '🎾'], ['踢足球', '⚽'], ['游泳', '🏊'], ['唱歌', '🎤🎶'], ['跳舞', '💃'], ['看電影', '🎬🍿'], ['騎腳踏車', '🚴'], ['畫畫', '🎨'], ['跑步', '🏃'], ['拍照', '📷'], ['玩遊戲', '🎮']],
  place: [['廚房', '🍳🔪'], ['客廳', '🛋️📺'], ['圖書館', '📚🤫'], ['學校', '🏫'], ['咖啡廳', '☕🍰'], ['海邊', '🏖️🌊'], ['電影院', '🎦🍿'], ['餐廳', '🍜🥢']],
  weather: [['今天天氣好熱。', '🥵☀️', 'hot'], ['今天天氣很冷。', '🥶❄️', 'cold'], ['今天下雨。', '🌧️☔', 'rain'], ['今天天氣很好，不冷也不熱。', '🌤️😊', 'nice']],
  feel: [['他很累。', '😩💤', 'tired'], ['她很忙。', '💼⏰', 'busy'], ['他好餓。', '😫🍽️', 'hungry'], ['我好渴。', '🥵💧', 'thirsty'], ['她很開心。', '😄🎉', 'happy'], ['這隻狗很可愛。', '🐶💕', 'cute']],
  color: [['紅色', '#d8352a'], ['白色', '#ffffff'], ['黑色', '#222222'], ['藍色', '#2b5cd6'], ['黃色', '#f2c200'], ['綠色', '#2e9b4f']],
  count: [['筆', '枝', '🖊️'], ['書', '本', '📕'], ['花', '朵', '🌸'], ['杯子', '個', '🥛'], ['貓', '隻', '🐱'], ['蛋糕', '個', '🎂']] };
const rep = (e, n) => `<span style="font-size:${n > 2 ? 1.6 : 2.1}rem;letter-spacing:-.05em">${e.repeat(n)}</span>`;
const nZh = n => n === 2 ? '兩' : numZh(n);
function shirt(c) { return `<svg viewBox="0 0 64 56" aria-label="shirt"><path d="M20 6 L8 14 L4 26 L14 28 L14 52 L50 52 L50 28 L60 26 L56 14 L44 6 Q32 14 20 6 Z" style="fill:${c};stroke:var(--ink)" stroke-width="2.5" stroke-linejoin="round"/></svg>`; }
function scene(pos, em) {
  const p = { '上面': [40, 27], '下面': [40, 63], '旁邊': [95, 63] }[pos];
  return `<svg viewBox="0 0 120 80" aria-label="table"><rect x="12" y="34" width="60" height="6" rx="1.5" style="fill:var(--gold-soft);stroke:var(--ink)" stroke-width="2"/><line x1="18" y1="40" x2="18" y2="74" style="stroke:var(--ink)" stroke-width="3"/><line x1="66" y1="40" x2="66" y2="74" style="stroke:var(--ink)" stroke-width="3"/><line x1="2" y1="75" x2="118" y2="75" style="stroke:var(--ink-3)" stroke-width="1.5"/><text x="${p[0]}" y="${p[1]}" text-anchor="middle" font-size="22">${em}</text></svg>`;
}
const priceTag = n => `<span class="pricetag nums" style="font-size:1.05rem;padding:6px 10px">NT$ ${n}</span>`;
function lq(say, opts, label = '聽力 · Listen, then choose A, B or C') {
  // opts[0] is the right answer: [html, text]
  return mcq({ kind: 'mc', cat: 'listen', abc: true, label, say, prompt: `<button class="btn big" data-say="${esc(say)}" style="border-radius:50%;width:84px;height:84px;padding:0" aria-label="Play again">${IC.sound}</button><span class="small faint">Tap to hear it again</span>`,
    opts: opts.map(o => o[1]), optHTML: opts.map(o => o[0]), ans: [0], explain: `<div class="zh">${ruby(tokenizeLoose(say))}</div>` });
}
function tokenizeLoose(s) { // light tokenizer for generated sentences (longest match on the word list)
  const out = []; let i = 0;
  while (i < s.length) {
    if (!HAN.test(s[i])) { let j = i; while (j < s.length && !HAN.test(s[j])) j++; out.push([s.slice(i, j), '']); i = j; continue; }
    let L = Math.min(5, s.length - i), hit = null;
    for (; L > 0; L--) { const w = s.slice(i, i + L); if (H2W[w]) { hit = H2W[w]; break; } }
    if (hit) { out.push([s.slice(i, i + L), hit.h === s.slice(i, i + L) ? hit.p : '']); i += L; } else { out.push([s[i], (H2W[s[i]] || {}).p || '']); i++; }
  }
  return out;
}
const LGEN = [
  () => { const [d, e] = pick(LD.drink), n = pick([1, 2, 3]); const [d2, e2] = pick(LD.drink.filter(x => x[0] !== d)); const n2 = pick([1, 2, 3].filter(x => x !== n));
    return lq(`我要${nZh(n)}杯${d}。`, [[rep(e, n), `${n} × ${d}`], [rep(e, n2), `${n2} × ${d}`], [rep(e2, n), `${n} × ${d2}`]]); },
  () => { const [f, e] = pick(LD.fruit), n = pick([1, 2, 3, 4]); const [f2, e2] = pick(LD.fruit.filter(x => x[0] !== f)); const n2 = pick([1, 2, 3, 4].filter(x => x !== n));
    return lq(`桌子上有${nZh(n)}個${f}。`, [[rep(e, n), `${n} × ${f}`], [rep(e, n2), `${n2} × ${f}`], [rep(e2, n), `${n} × ${f2}`]]); },
  () => { const [a, b, c] = sampleN(LD.act, 3); const part = pick([['早上', [6, 7, 8]], ['下午', [2, 3, 4, 5]], ['晚上', [7, 8, 9, 10, 11]]]); const h = pick(part[1]);
    return lq(`我${part[0]}${hourZh(h)}點${a[0]}。`, [[a[1], a[0]], [b[1], b[0]], [c[1], c[0]]]); },
  () => { const [a, b, c] = sampleN(LD.hobby, 3); const s = pick([`我會${a[0]}。`, `週末我們去${a[0]}吧！`, `我的興趣是${a[0]}。`]);
    return lq(s, [[a[1], a[0]], [b[1], b[0]], [c[1], c[0]]]); },
  () => { const [a, b, c] = sampleN(LD.place, 3); const s = pick([`我在${a[0]}。`, `我們去${a[0]}，好不好？`]);
    return lq(s, [[a[1], a[0]], [b[1], b[0]], [c[1], c[0]]]); },
  () => { const [a, b, c] = sampleN(LD.weather, 3); return lq(a[0], [[a[1], a[2]], [b[1], b[2]], [c[1], c[2]]]); },
  () => { const [a, b, c] = sampleN(LD.feel, 3); return lq(a[0], [[a[1], a[2]], [b[1], b[2]], [c[1], c[2]]]); },
  () => { const [a, b, c] = sampleN(LD.color, 3); return lq(`我想買${a[0]}的衣服。`, [[shirt(a[1]), a[0]], [shirt(b[1]), b[0]], [shirt(c[1]), c[0]]]); },
  () => { const [o, mw, e] = pick(LD.count), n = pick([1, 2, 3, 4]); const [o2, mw2, e2] = pick(LD.count.filter(x => x[0] !== o)); const n2 = pick([1, 2, 3, 4].filter(x => x !== n));
    return lq(`我有${nZh(n)}${mw}${o}。`, [[rep(e, n), `${n} × ${o}`], [rep(e, n2), `${n2} × ${o}`], [rep(e2, n), `${n} × ${o2}`]]); },
  () => { const h = 1 + (Math.random() * 12 | 0), m = pick([0, 10, 15, 20, 30, 40, 45]); const h2 = h === 12 ? 1 : h + 1, m2 = m === 30 ? 0 : 30;
    return lq(`現在${timeZh(h, m, m === 30 && Math.random() < .5)}。`, [[clockSVG(h, m), `${h}:${pad2(m)}`], [clockSVG(h2, m), `${h2}:${pad2(m)}`], [clockSVG(h, m2), `${h}:${pad2(m2)}`]]); },
  () => { const n = pick([25, 45, 80, 120, 150, 250, 380, 1200]); const v = uniq([n, n >= 100 ? n + 100 : n + 10, n >= 100 ? Math.round(n / 10) : n * 10, n + 5]).filter(x => x !== n).slice(0, 2);
    const [em, nm] = pick(ITEMS); return lq(`這個${nm}${numZh(n)}塊。`, [[`${em} ${priceTag(n)}`, 'NT$' + n], [`${em} ${priceTag(v[0])}`, 'NT$' + v[0]], [`${em} ${priceTag(v[1])}`, 'NT$' + v[1]]]); },
  () => { const [pos, p2, p3] = shuffle(['上面', '下面', '旁邊']); const [o, em] = pick([['貓', '🐱'], ['狗', '🐶'], ['書', '📕'], ['錢包', '👛'], ['手機', '📱']]);
    return lq(`${o}在桌子${pos}。`, [[scene(pos, em), pos], [scene(p2, em), p2], [scene(p3, em), p3]]); },
  () => { const d = Math.random() * 7 | 0; const ds = sampleN([0, 1, 2, 3, 4, 5, 6].filter(x => x !== d), 2);
    const card = i => `<span style="display:inline-grid;place-items:center;width:74px;height:74px;border-radius:10px;border:2px solid var(--ink);background:var(--page);font:800 1.1rem var(--f-disp)"><span style="font-size:.7rem;color:var(--seal)">DAY</span>${WEEK_EN[i].toUpperCase()}</span>`;
    return lq(`今天星期${d === 0 ? '天' : WEEK[d]}。`, [[card(d), WEEK_EN[d]], [card(ds[0]), WEEK_EN[ds[0]]], [card(ds[1]), WEEK_EN[ds[1]]]]); },
];
function qListenPic() { return pick(LGEN)(); }

/* ---- full tests */
function teacherTest() {
  const qs = [];
  if (ttsOK()) for (let i = 0, used = new Set(); i < 6; i++) { let g; do { g = Math.random() * LGEN.length | 0; } while (used.has(g) && used.size < LGEN.length); used.add(g); qs.push(LGEN[g]()); }
  const conv = TT.banks.filter(b => b.kind !== 'mw');
  const weak = new Set(WL.filter(w => S.cards[w.k] && stageOf(w.k) <= 3).map(w => w.k));
  const score = b => b.bank.filter(h => H2W[h] && weak.has(H2W[h].k)).length + Math.random() * 2;
  const best = a => a.slice().sort((x, y) => score(y) - score(x));
  const early = best(conv.filter(b => ['L1', 'L2', 'L3'].includes(b.L))), late = best(conv.filter(b => ['L4', 'L5', 'L6'].includes(b.L)));
  const gb = genBank({ n: 6, prefer: [...weak] });
  [early[0], late[0], gb ? null : late[1]].filter(Boolean).forEach(b => qs.push(qBank(b, { shuffleBank: true })));
  if (gb) qs.push(genBankQ(gb, { num: 'I.' }));
  const gens = [genOrderQ({ prefSeen: true }), genOrderQ({ prefSeen: true })].filter(Boolean);
  [...sampleN(TT.orders, 5 - gens.length), ...gens].forEach(o => qs.push(qOrderNum(o)));
  const mwb = Math.random() < .5 && genMwBank(8, { label: 'III. Choose the correct measure word' });
  qs.push(mwb || Object.assign(qBank(pick(TT.banks.filter(b => b.kind === 'mw')), { shuffleBank: true }), { label: 'III. Choose the correct measure word' }));
  qs.push(qOpp(7));
  const pg = Math.random() < .5 && genPassage({ n: 10, label: 'V. Read the passage and fill in the blanks' });
  qs.push(pg || Object.assign(qBank(pick(TT.cloze), { shuffleBank: true }), { label: 'V. Read the passage and fill in the blanks' }));
  qs.push(...genChoiceSet(5, { hidePy: true }));
  qs.push(qPics(pick(TT.last.pics)), qPics(pick(TT.pics)));
  return qs;
}
/* choose-a-sentence question, in the paper's order and letters (midterm dialogues and sentence halves) */
function qChoice(st, [first, ai]) {
  const full = first.replace('＿＿', st.opts[ai].replace(/[。！？!]$/, ''));
  return { kind: 'mc', cat: 'reading', abc: true, han: true, label: st.sec, prompt: `<div class="qmid">${fillBlank(first)}</div>`, opts: st.opts.slice(), ans: [ai],
    explain: `<div class="zh">${ruby(tokenizeLoose(full))}</div>` };
}
/* the reading part of the midterm, exactly as on the paper */
function midTest() {
  const M = TT.mid, ch = p => M.choice.filter(c => c.id.startsWith(p)).flatMap(c => c.items.map(it => qChoice(c, it)));
  return [...M.pics.map(p => Object.assign(qPics(p), { label: p.title + ' — write the letter for each picture' })),
    ...M.banks.filter(b => b.kind === 'cloze').map(b => Object.assign(qBank(b), { label: b.sec })), ...ch('md'),
    ...M.banks.filter(b => b.kind === 'mw').map(b => Object.assign(qBank(b), { label: b.sec })), ...ch('mh')];
}
function lastTest() {
  const T = TT.last;
  return [...T.banks.slice(0, 5).map(b => qBank(b)), ...T.orders.map(o => qOrderNum(o, true)), ...T.banks.slice(5).map(b => qBank(b)), ...T.pics.map(p => qPics(p))];
}
function vTest(el) {
  const ms = S.mocks.slice().reverse();
  const typeName = { teacher: '老師式考卷', last: '上次的考卷', mock: '模擬考', mid: '期中考', midstyle: '期中考式' };
  el.innerHTML = `<div class="stack"><div class="sec-head"><div><span class="eyebrow">考試 · Practice tests</span><h1>Practice the way your teacher tests</h1></div></div>
    <div class="grid2">
      <div class="page pad stack">
        <div class="row" style="justify-content:space-between"><div class="han" style="font-size:2.4rem;line-height:1">老師式考卷</div><span class="tag bonus">Recommended</span></div>
        <p class="muted">A new test in your teacher's exact format, covering Lessons 1–6: listening (choose A, B or C), word-bank conversations, sentence order with numbers, measure words, opposites, a reading passage, and picture matching. Different questions every time.</p>
        ${ttsOK() ? '' : '<p class="note">No Chinese voice on this device, so the listening part is skipped.</p>'}
        <div class="row"><button class="btn primary big" id="tt_prac">${IC.play}Practice</button><button class="btn big" id="tt_exam">${IC.test}Exam mode</button></div>
        <p class="tiny faint">Practice checks each part as you go. Exam mode shows the answers only at the end.</p>
      </div>
      <div class="page pad stack">
        <div class="han" style="font-size:2.4rem;line-height:1">上次的考卷</div>
        <p class="muted">Your last test, every question, with the answer key. Redo it until you get 100% — your teacher often reuses the same kinds of sentences.</p>
        <div class="row"><button class="btn primary" id="lt_go">${IC.redo}Redo the last test</button></div>
      </div>
      <div class="page pad stack">
        <div class="row" style="justify-content:space-between"><div class="han" style="font-size:2.4rem;line-height:1">期中考式考卷</div><span class="tag bonus">New every time</span></div>
        <p class="muted">A new test in your midterm's format: listening, picture matching, two reading passages with a word bank, dialogues, measure words and second halves. New passages, new blanks and new names each time, and the words you are weak on come up first.</p>
        <label class="row small"><input type="checkbox" id="ms_short"> Short version (15 min)</label>
        <div class="row"><button class="btn primary big" id="ms_prac">${IC.play}Practice</button><button class="btn big" id="ms_exam">${IC.test}Exam mode</button></div>
      </div>
      <div class="page pad stack">
        <div class="han" style="font-size:2.4rem;line-height:1">期中考</div>
        <p class="muted">The reading part of your midterm, exactly as on the paper: picture matching, two passages, dialogues, measure words and sentence halves.</p>
        <div class="row"><button class="btn primary" id="mid_go">${IC.redo}Redo the midterm</button><button class="btn" data-go="cards" data-p='{"deck":"MID"}'>${IC.cards}Midterm words</button></div>
      </div>
      <div class="page pad stack">
        <div class="han" style="font-size:2.4rem;line-height:1">模擬考</div>
        <p class="muted">40 mixed questions: vocabulary, tones, look-alike characters, grammar, word order, time, prices and reading.</p>
        <label class="row small"><input type="checkbox" id="mt_table" checked> Include vocab-table words</label>
        <label class="row small"><input type="checkbox" id="mt_timer" checked> 30-minute timer</label>
        <div class="row"><button class="btn" id="mt_go">${IC.play}Start the mixed mock test</button></div>
      </div>
      <div class="page pad stack"><h3>How your teacher tests</h3>
        <div class="stack" style="gap:6px">${[['聽力', 'She reads a sentence, you pick picture A, B or C', 'lpic'], ['詞庫填空', 'Word bank A–K, fill the blanks in a dialogue', 'bank'], ['排句子', 'Numbered chunks → write the order (1/5/3/2/4)', 'order'], ['量詞', 'Measure-word bank: 本 張 枝 台 朵 個 種', 'mw'], ['反義詞', 'Opposite words: 貴 ↔ 便宜, 大 ↔ 小', 'opp'], ['看圖', 'Match pictures: verbs, fruits, drinks, adjectives', 'pics'], ['短文填空', 'A passage with a word bank A–N', 'passage'], ['選回答', 'Choose the reply to complete each dialogue', 'qa'], ['後半句', 'Choose the second half of each sentence', 'halves']]
          .map(([zh, d, id]) => `<button class="gitem" data-drillgo="${id}"><span class="han" style="font-size:1.3rem;min-width:4.2em">${zh}</span><span class="small muted" style="text-align:left">${d}</span></button>`).join('')}</div></div>
    </div>
    <div class="page pad stack"><h3>Past results</h3>${ms.length ? `<div class="stack" style="gap:8px">${ms.slice(0, 10).map(m => `<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><span class="small muted nums" style="min-width:150px">${m.date} · <span class="han">${typeName[m.type] || '模擬考'}</span></span><div class="bar ${m.pct < 60 ? 'seal' : m.pct < 80 ? 'gold' : ''}" style="flex:1;margin:0 12px"><i style="width:${m.pct}%"></i></div><b class="nums">${m.pct}%</b></div>`).join('')}</div>` : '<p class="muted">No tests yet. Redo the last test first, then try a teacher-style test.</p>'}</div></div>`;
  $('#tt_prac', el).onclick = () => runQuiz({ title: 'Teacher-style test', mock: true, type: 'teacher', qs: teacherTest(), back: () => go('test') });
  $('#tt_exam', el).onclick = () => runQuiz({ title: 'Teacher-style test (exam)', exam: true, mock: true, type: 'teacher', qs: teacherTest(), back: () => go('test') });
  $('#lt_go', el).onclick = () => runQuiz({ title: 'Your last test', mock: true, type: 'last', qs: lastTest(), back: () => go('test') });
  const msGo = exam => runQuiz({ title: exam ? '期中考式考卷 (exam)' : '期中考式考卷', exam, mock: true, type: 'midstyle', qs: midStyleTest({ short: $('#ms_short', el).checked }), back: () => go('test') });
  $('#ms_prac', el).onclick = () => msGo(false); $('#ms_exam', el).onclick = () => msGo(true);
  $('#mid_go', el).onclick = () => runQuiz({ title: '期中考', mock: true, type: 'mid', qs: midTest(), back: () => go('test') });
  $('#mt_go', el).onclick = () => runQuiz({ title: 'Mock test', exam: true, mock: true, type: 'mock', minutes: $('#mt_timer', el).checked ? 30 : 0, qs: mockQuiz($('#mt_table', el).checked), back: () => go('test') });
  $$('[data-drillgo]', el).forEach(b => b.onclick = () => { const s = DRILL_SETS.find(x => x.id === b.dataset.drillgo); runQuiz({ title: s.en, qs: s.make(), back: () => go('test') }); });
}

/* ---- new drills */
DRILL_SETS.unshift(
  { id: 'lpic', zh: '聽力選圖', en: 'Listening: pick A, B or C', d: 'Hear a sentence, choose the matching picture — like your teacher\'s listening test.', make: () => Array.from({ length: 10 }, qListenPic) },
  { id: 'bank', zh: '詞庫填空', en: 'Word-bank fill-in', d: 'A word bank A–K and a dialogue with blanks, exactly like Part I of the test.', make: () => sampleN(TT.banks.concat(TT.cloze), 3).map(b => qBank(b, { shuffleBank: true })) },
  { id: 'pics', zh: '看圖選字', en: 'Picture matching', d: 'Pictures of verbs, fruits, drinks, adjectives, sports, home and food.', make: () => sampleN(TT.pics.concat(TT.last.pics), 3).map(qPics) },
  { id: 'opp', zh: '反義詞', en: 'Opposite words', d: '貴 ↔ 便宜, 買 ↔ 賣, 大 ↔ 小… Part IV of the test.', make: () => [qOpp(7), qOpp(7)] },
);
(() => { const o = DRILL_SETS.find(s => s.id === 'order'); if (o) { o.d = 'Numbered chunks → put them in order, like Part II of the test.'; o.make = () => shuffle([...sampleN(TT.orders, 6).map(x => qOrderNum(x)), ...sampleN(DRILLS.filter(d => d.k === 'order' && !G[d.g].later && d.g !== 'g_time_order'), 4).map(d => qOrderNum({ t: d.t, a: d.a, en: d.en }))]); } })();
(() => { const ls = DRILL_SETS.find(s => s.id === 'listen'); if (ls) { ls.zh = '聽詞'; ls.en = 'Listening: words'; } })();

/* ---- plan additions */
(() => {
  const at = (id, item) => { const i = PLAN.findIndex(p => p.id === id); PLAN.splice(i + 1, 0, item); };
  at('d1f', { day: 1, id: 'd1g', t: 'Listening: pick the picture (A/B/C)', d: '15 answers. Say each sentence back after you hear it.', go: ['drills', {}], m: () => [Math.min(15, catTotal(['listen'])), 15] });
  at('d2a', { day: 2, id: 'd2h', t: 'Redo your last test until 100%', d: 'Every question from the test your teacher gave, with answers.', go: ['test', {}], m: () => { const b = Math.max(0, ...S.mocks.filter(m => m.type === 'last').map(m => m.pct)); return [Math.round(b), 100]; } });
  const f = PLAN.find(p => p.id === 'd3f');
  if (f) Object.assign(f, { t: 'Teacher-style test + mixed mock test', d: 'One of each, in exam mode. Review every mistake afterwards.', m: () => [Math.min(1, S.mocks.filter(m => m.type === 'teacher').length) + Math.min(1, S.mocks.filter(m => m.type === 'mock').length), 2] });
})();
