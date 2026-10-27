/* ============================================================ QUESTION GENERATORS */
const CAT = { vocab: '詞彙 Vocabulary', listen: '聽力 Listening', pinyin: '拼音 Pinyin & tones', chars: '字形 Look-alikes', radical: '部首 Radicals', grammar: '語法 Grammar', order: '句子 Word order', time: '時間 Time & dates', money: '錢・量詞 Money & measure words', place: '位置 Where things are', reading: '閱讀 Reading', bank: '詞庫填空 Word-bank fill-in', opp: '反義詞 Opposites', pics: '看圖 Picture matching' };
const wordLine = w => `<div><span class="han" style="font-size:1.5rem">${esc(w.h)}</span> <b style="color:var(--jade)">${esc(phon(w.p))}</b> — ${esc(w.e)}</div>`;
function canonPy(p) { return parsePy(p).map(c => c.map(([s, t, bad]) => bad ? s : markSyl(s, t)).join('')).join(' '); }
function distractors(w, pool, n, dir) {
  const cand = pool.filter(o => o.k !== w.k && o.h !== w.h && o.e !== w.e && !isSyn(o.h, w.h) && !sameMeaning(o, w) && !(dir === 'listen' && plainPy(o.p) === plainPy(w.p)));
  const scored = cand.map(o => {
    let s = Math.random() * 2;
    if (dir !== 'h2e') { if (o.h.length === w.h.length) s += 2; if ([...o.h].some(c => w.h.includes(c))) s += 1.5; }
    else { if (Math.abs(o.e.length - w.e.length) < 8) s += 1; }
    if (dir === 'listen' && plainPy(o.p).slice(0, 2) === plainPy(w.p).slice(0, 2)) s += 1.5;
    return [s, o];
  }).sort((a, b) => b[0] - a[0]).map(x => x[1]);
  const out = []; const seenT = new Set([dir === 'h2e' ? w.e : w.h]);
  for (const o of scored) { const t = dir === 'h2e' ? o.e : o.h; if (seenT.has(t)) continue; seenT.add(t); out.push(o); if (out.length >= n) break; }
  return out;
}
function mcq(base) { // shuffle options, keep answer (and which word each option is, for the mix-up list)
  const order = shuffle(base.opts.map((_, i) => i));
  if (base.optHTML) base.optHTML = order.map(i => base.optHTML[i]);
  if (base.optK) base.optK = order.map(i => base.optK[i]);
  return Object.assign(base, { opts: order.map(i => base.opts[i]), ans: base.ans.map(a => order.indexOf(a)) });
}
function qVocab(w, dir, pool) {
  pool = pool || WL;
  const base = { k: w.k, explain: wordLine(w) };
  if (dir === 'h2p') {
    const right = canonPy(w.p);
    const vs = toneVariants(w.p, 3).filter(v => v !== right);
    if (vs.length < 2) dir = 'h2e';
    else return mcq(Object.assign(base, { kind: 'mc', cat: 'pinyin', sk: 's', label: 'Which pinyin is right?', prompt: `<div class="qbig">${esc(w.h)}</div>`, opts: [right, ...vs], ans: [0], say: null, sayAfter: w.h }));
  }
  const ds = distractors(w, pool, 3, dir === 'h2e' ? 'h2e' : dir);
  const optK = [w.k, ...ds.map(o => o.k)];
  if (dir === 'h2e') return mcq(Object.assign(base, { kind: 'mc', cat: 'vocab', sk: 'm', label: 'What does it mean?', prompt: `<div class="qbig">${esc(w.h)}</div>`, opts: [w.e, ...ds.map(o => o.e)], optK, ans: [0], sayAfter: w.h }));
  if (dir === 'e2h') return mcq(Object.assign(base, { kind: 'mc', cat: 'vocab', sk: 'r', label: 'Which characters?', prompt: `${w.em ? `<div style="font-size:2.6rem">${w.em}</div>` : ''}<div class="qen">${esc(w.e)}</div>`, opts: [w.h, ...ds.map(o => o.h)], optK, han: true, ans: [0], sayAfter: w.h }));
  if (dir === 'p2h') return mcq(Object.assign(base, { kind: 'mc', cat: 'pinyin', sk: 's', label: 'Which word has this pinyin?', prompt: `<div class="qen" style="color:var(--jade);font-size:1.6rem">${esc(w.p)}</div>`, opts: [w.h, ...ds.map(o => o.h)], optK, han: true, ans: [0], sayAfter: w.h }));
  if (dir === 'listen') return mcq(Object.assign(base, { kind: 'mc', cat: 'listen', sk: 'l', label: 'Listen — which word did you hear?', prompt: `<button class="btn big hearbtn" data-say="${esc(w.h)}" aria-label="Play again">${IC.sound}</button><span class="small faint">Tap to hear it again</span>`, opts: [w.h, ...ds.map(o => o.h)], optK, han: true, ans: [0], say: w.h }));
}
function fillBlank(s) { return esc(s).replace(/＿＿/g, '<span style="display:inline-block;min-width:2.2em;border-bottom:2.5px solid var(--pen);margin:0 .15em">&nbsp;</span>'); }
function gExplain(g) { const x = G[g]; const wr = x.wr[0]; return `<div><b>${esc(x.t)}</b></div><div class="han" style="font-size:1.1rem">${esc(x.p)}</div>${wr ? `<div class="small"><span class="mark x">✗</span><span class="han">${esc(wr[0])}</span> → <span class="mark o">✓</span><span class="han">${esc(wr[1])}</span> · ${esc(wr[2])}</div>` : ''}<button class="btn sm ghost" data-go="grammar" data-p='{"g":"${g}"}' style="align-self:flex-start">Open this grammar point</button>`; }
function qFromDrill(d) {
  const after = ok => gramAnswer(d.g, ok);
  if (d.k === 'choose') return mcq({ kind: 'mc', cat: 'grammar', label: 'Fill in the blank', prompt: `<div class="qmid">${fillBlank(d.q)}</div>`, opts: d.o.slice(), han: true, ans: [].concat(d.a), explain: gExplain(d.g), after, g: d.g });
  if (d.k === 'fix') return mcq({ kind: 'mc', cat: 'grammar', label: 'Which sentence is correct?', prompt: '', opts: d.o.slice(), han: true, ans: [d.a], explain: gExplain(d.g), after, g: d.g });
  return { kind: 'order', cat: 'order', label: 'Put the words in order', prompt: `<div class="qen">${esc(d.en)}</div>`, tiles: d.t.slice(), answers: d.a, end: d.end ?? '。', explain: gExplain(d.g), after, g: d.g };
}
function clockSVG(h, m) {
  const ha = ((h % 12) + m / 60) * 30 * Math.PI / 180, ma = m * 6 * Math.PI / 180;
  let ticks = '';
  for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, r1 = i % 5 ? 43 : 39; ticks += `<line x1="${50 + Math.sin(a) * r1}" y1="${50 - Math.cos(a) * r1}" x2="${50 + Math.sin(a) * 46}" y2="${50 - Math.cos(a) * 46}" style="stroke:var(--ink-3)" stroke-width="${i % 5 ? .7 : 1.8}"/>`; }
  const nums = [12, 3, 6, 9].map((n, i) => { const a = i * 90 * Math.PI / 180; return `<text x="${50 + Math.sin(a) * 32}" y="${50 - Math.cos(a) * 32 + 4}" text-anchor="middle" style="fill:var(--ink-2);font:600 10px var(--f-body)">${n}</text>`; }).join('');
  return `<svg class="clock" viewBox="0 0 100 100" role="img" aria-label="clock"><circle cx="50" cy="50" r="47" style="fill:var(--page);stroke:var(--ink)" stroke-width="2.5"/>${ticks}${nums}
    <line x1="50" y1="50" x2="${50 + Math.sin(ha) * 24}" y2="${50 - Math.cos(ha) * 24}" style="stroke:var(--ink)" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="50" y1="50" x2="${50 + Math.sin(ma) * 37}" y2="${50 - Math.cos(ma) * 37}" style="stroke:var(--seal)" stroke-width="2.6" stroke-linecap="round"/><circle cx="50" cy="50" r="3.2" style="fill:var(--ink)"/></svg>`;
}
function timeZh(h, m, half) { return hourZh(h) + '點' + (m === 0 ? '' : m === 30 && half ? '半' : numZh(m) + '分'); }
function qClock() {
  const digital = Math.random() < .45;
  if (!digital) {
    const h = 1 + (Math.random() * 12 | 0), m = pick([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
    const half = m === 30 && Math.random() < .5;
    const right = timeZh(h, m, half);
    const set = new Set([right]);
    const add = s => { if (s && !set.has(s)) set.add(s); };
    if (h === 2) add('二點' + (m === 0 ? '' : m === 30 && half ? '半' : numZh(m) + '分'));
    if (m) add(hourZh(h) + '點' + numZh(m / 5) + '分');
    add(timeZh(h === 12 ? 1 : h + 1, m, half));
    if (m && m / 5 <= 12 && m / 5 >= 1) add(timeZh(m / 5, (h * 5) % 60, false));
    add(timeZh(h, (m + 15) % 60, false));
    add(timeZh(h === 1 ? 12 : h - 1, (m + 30) % 60, false));
    const opts = [...set].slice(0, 4);
    return mcq({ kind: 'mc', cat: 'time', label: '現在幾點？ What time is it?', prompt: clockSVG(h, m), opts, han: true, ans: [0], explain: `<div class="han" style="font-size:1.3rem">${right}</div><div class="small">Short hand = hour (點), long red hand = minutes (分). 2 o'clock is 兩點, never 二點.</div>` });
  }
  const parts = [[7, '早上'], [8, '早上'], [10, '上午'], [11, '上午'], [12, '中午'], [13, '下午'], [15, '下午'], [16, '下午'], [19, '晚上'], [20, '晚上'], [21, '晚上']];
  const [h24, part] = pick(parts); const m = pick([0, 10, 15, 20, 30, 40, 45]);
  const h = h24 > 12 ? h24 - 12 : h24;
  const right = part + timeZh(h, m, false);
  const wrongPart = pick(parts.filter(p => p[1] !== part))[1];
  const opts = uniq([right, wrongPart + timeZh(h, m, false), timeZh(h, m, false) + part, part + timeZh(h, (m + 20) % 60, false)]);
  return mcq({ kind: 'mc', cat: 'time', label: 'Say this time in Chinese', prompt: `<div class="pricetag nums" style="background:var(--pen-soft);color:var(--pen)">${h24}:${pad2(m)}</div>`, opts, han: true, ans: [0], explain: `<div class="han" style="font-size:1.3rem">${right}</div><div class="small">Part of the day comes first, then the hour, then minutes (big → small).</div>` });
}
function qDate() {
  const d0 = new Date(2026, Math.random() * 12 | 0, 1 + (Math.random() * 28 | 0));
  const m = d0.getMonth() + 1, d = d0.getDate(), wd = d0.getDay();
  const wz = i => '星期' + (i === 0 ? pick(['天', '日']) : WEEK[i]);
  const right = numZh(m) + '月' + numZh(d) + '號' + wz(wd);
  const set = new Set([right]);
  set.add(numZh(d) + '號' + numZh(m) + '月' + wz(wd));
  set.add(numZh(m) + '月' + numZh(d) + '號' + wz((wd + pick([1, 2, 3])) % 7));
  if (wd === 0) set.add(numZh(m) + '月' + numZh(d) + '號星期七');
  if (m !== d && d <= 12) set.add(numZh(d) + '月' + numZh(m) + '號' + wz(wd));
  if (set.size < 4) set.add(numZh(m) + '月' + numZh(d === 28 ? 18 : d + 10) + '號' + wz(wd));
  const opts = [...set].slice(0, 4);
  return mcq({ kind: 'mc', cat: 'time', label: '幾月幾號？星期幾？', prompt: `<div class="pricetag nums" style="background:var(--pen-soft);color:var(--pen)">${m}/${d} · ${WEEK_EN[wd]}</div>`, opts, han: true, ans: [0], explain: `<div class="han" style="font-size:1.3rem">${right}</div><div class="small">Month first, then day (號), then the weekday. Sunday is 星期天 or 星期日.</div>` });
}
function qTimeOrder() { return qFromDrill(pick(DRILLS.filter(d => d.g === 'g_time_order'))); }
const ITEMS = [['🍎', '蘋果'], ['🍌', '香蕉'], ['🍉', '西瓜'], ['🍇', '葡萄'], ['🧋', '珍珠奶茶'], ['☕', '咖啡'], ['🎂', '蛋糕'], ['✏️', '鉛筆'], ['📖', '書'], ['👕', '衣服'], ['🥛', '牛奶'], ['🍍', '鳳梨'], ['🌸', '花']];
function qPrice() {
  const n = pick([2, 5, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 99, 100, 105, 120, 150, 200, 250, 380]);
  const [em, nm] = pick(ITEMS);
  const right = priceZh(n) + '塊';
  const set = new Set([right]);
  if (n === 2) set.add('二塊');
  if (n >= 10 && n < 100 && n % 10) { const sw = (n % 10) * 10 + (n / 10 | 0); if (sw !== n) set.add(priceZh(sw) + '塊'); }
  if (n >= 100) set.add(numZh(n / 10 | 0) + '塊');
  set.add(priceZh(n + (n >= 100 ? 50 : 10)) + '塊');
  set.add(priceZh(Math.max(1, n - (n > 10 ? 5 : 1))) + '塊');
  const opts = [...set].slice(0, 4);
  return mcq({ kind: 'mc', cat: 'money', label: `${nm}多少錢？ How much?`, prompt: `<div style="font-size:3rem">${em}</div><div class="pricetag nums">NT$ ${n}</div>`, opts, han: true, ans: [0], explain: `<div class="han" style="font-size:1.3rem">${right}（錢）／ ${priceZh(n)}元</div><div class="small">Spoken: 塊 (or 塊錢). Written prices: 元. 2 dollars = 兩塊.</div>` });
}
// first measure word = the one the course teaches; the others are also correct (Taiwan usage), so they never show up as wrong choices
const MWN = [['書', '本'], ['課本', '本'], ['中文書', '本'], ['人', '個'], ['兒子', '個'], ['孩子', '個'], ['學生', '個/位'], ['朋友', '個/位'], ['蛋糕', '個'], ['禮物', '個'], ['桌子', '張'], ['椅子', '張'], ['紙', '張'],
  ['電腦', '台/部'], ['筆', '枝/支'], ['鉛筆', '枝/支'], ['花', '朵'], ['衣服', '件'], ['外套', '件'], ['咖啡', '杯/瓶'], ['奶茶', '杯/瓶'], ['茶', '杯/瓶'], ['牛奶', '杯/瓶'], ['狗', '隻/條'], ['貓', '隻'], ['鳥', '隻'], ['車子', '輛/台'], ['腳踏車', '輛/部/台'], ['褲子', '條'], ['魚', '條/隻'], ['鞋子', '雙'], ['老師', '位/個'], ['水果', '種'],
  ['房間', '間/個'], ['房子', '棟/個/間'], ['沙發', '張'], ['床', '張'], ['電視機', '台'], ['牛肉麵', '碗'], ['果汁', '杯/瓶'], ['飲料', '瓶/杯'], ['餐廳', '家/間'], ['咖啡廳', '家/間'], ['電影', '部'], ['歌', '首'], ['手機', '支/枝/台/部'], ['比賽', '場']];
const MWS = ['本', '個', '張', '台', '枝', '朵', '件', '杯', '隻', '輛', '條', '雙', '位', '種', '間', '棟', '碗', '瓶', '家', '部', '首', '支', '場'];
function qMW() {
  const [noun, mw] = pick(MWN); const ok = mw.split('/');
  const n = pick([1, 2, 3, 5]);
  const nz = n === 2 ? '兩' : numZh(n);
  const opts = [ok[0], ...sampleN(MWS.filter(x => !ok.includes(x)), 3)];
  const w = H2W[noun];
  return mcq({ kind: 'mc', cat: 'money', label: 'Choose the measure word', prompt: `<div style="font-size:2.4rem">${(w && w.em) || ''}</div><div class="qmid">${nz}<span style="display:inline-block;min-width:1.6em;border-bottom:2.5px solid var(--pen)">&nbsp;</span>${noun}</div><div class="small muted">${w ? esc(w.e) : ''}</div>`, opts, han: true, ans: [0], explain: `<div class="han" style="font-size:1.3rem">${nz}${ok.join('/')}${noun}</div><div class="small">${esc(G.g_mw.tip)}</div>`, after: okk => gramAnswer('g_mw', okk) });
}
const ERLIANG = [['＿＿本書', '兩'], ['十＿＿點', '二'], ['＿＿月二十八號', '二'], ['＿＿個人', '兩'], ['第＿＿課', '二'], ['＿＿點鐘', '兩'], ['＿＿十塊', '二'], ['＿＿塊錢', '兩'], ['一、＿＿、三', '二'], ['＿＿杯咖啡', '兩'], ['星期＿＿', '二'], ['＿＿枝鉛筆', '兩'], ['十＿＿個學生', '二'], ['＿＿件衣服', '兩']];
function fmtN(n) { return n.toLocaleString('en-US'); }
function qBigNum() {
  const n = pick([105, 120, 250, 380, 450, 999, 1005, 1500, 2008, 2350, 3460, 4060, 12000, 15800, 23505, 30000, 860, 7200]);
  const right = numZh(n) + '塊';
  const set = new Set([right]);
  if (right.includes('零')) set.add(right.replace(/零/g, ''));
  if (n * 10 < 100000) set.add(numZh(n * 10) + '塊');
  if (n >= 1000) set.add(numZh(Math.floor(n / 10)) + '塊');
  if (n >= 10000) set.add('十' + numZh(Math.floor(n / 1000)).replace('兩', '二') + '千塊');
  const s2 = numZh(n).replace('千', '百').replace('萬', '千') + '塊'; if (s2 !== right) set.add(s2);
  for (let g = 0; set.size < 4 && g < 20; g++) { const m = n + pick([10, 100, 1000, -10, -100]); if (m > 0 && m < 100000) set.add(numZh(m) + '塊'); }
  const opts = [...set].slice(0, 4);
  return mcq({ kind: 'mc', cat: 'money', label: 'Read the price in Chinese', prompt: `<div class="pricetag nums">NT$ ${fmtN(n)}</div>`, opts, han: true, ans: [0],
    explain: `<div class="han" style="font-size:1.3rem">${right}</div><div class="small">Big → small: 萬 10,000 · 千 1,000 · 百 100 · 十 10. Use 零 for a missing place in the middle; 2 before 百/千/萬 is usually 兩.</div>`, after: ok => gramAnswer('g_bignum', ok) });
}
const LOC_OBJ = [['貓', '🐱', '隻', 'cat'], ['狗', '🐶', '隻', 'dog'], ['錢包', '👛', '個', 'wallet'], ['書', '📖', '本', 'book'], ['手機', '📱', '支', 'phone'], ['筆', '🖊️', '枝', 'pen'], ['鳥', '🐦', '隻', 'bird']];
const LOC_PLACE = [['桌子', 'table'], ['椅子', 'chair'], ['床', 'bed'], ['沙發', 'sofa'], ['電視機', 'TV', '前面 後面 旁邊 上面'], ['窗戶', 'window', '前面 後面 旁邊'], ['門', 'door', '前面 後面 旁邊']];
const LOC_POS = [['上面', 'on'], ['下面', 'under'], ['前面', 'in front of'], ['後面', 'behind'], ['旁邊', 'next to']];
const LOC_ROOM = [['房間', 'the bedroom'], ['客廳', 'the living room'], ['廚房', 'the kitchen']];
function qLocation() {
  const [o, em, mw, oe] = pick(LOC_OBJ);
  const room = Math.random() < .25;
  const [pl, pe, okPos] = room ? pick(LOC_ROOM) : pick(LOC_PLACE);
  const [pos, pose] = room ? ['裡', 'in'] : pick(LOC_POS.filter(p => !okPos || okPos.includes(p[0])));
  const other = room ? pick(LOC_POS)[0] : pick(LOC_POS.filter(p => p[0] !== pos))[0];
  const ex = Math.random() < .5;
  const cap = s => s[0].toUpperCase() + s.slice(1);
  let en, opts;
  if (!ex) {
    en = `The ${em} ${oe} is ${pose} ${room ? '' : 'the '}${pe}.`;
    opts = [`${o}在${pl}${pos}。`, `${pl}在${o}${pos}。`, `${o}在${pos}${pl}。`, `${o}在${pl}${other}。`];
  } else {
    en = `There is a ${em} ${oe} ${pose} ${room ? '' : 'the '}${pe}.`;
    opts = [`${pl}${pos}有一${mw}${o}。`, `${pl}${pos}在一${mw}${o}。`, `${pos}${pl}有一${mw}${o}。`, `${pl}${other}有一${mw}${o}。`];
  }
  return mcq({ kind: 'mc', cat: 'place', label: 'Which sentence says this?', prompt: `<div class="qen">${esc(cap(en))}</div>`, opts, han: true, ans: [0],
    explain: `<div class="han" style="font-size:1.3rem">${esc(opts[0])}</div><div class="small">${ex ? 'Place + position word + 有 + thing = there is…' : 'Thing + 在 + place + position word.'} The position word (上面, 下面, 裡…) comes after the place.</div>`, after: ok => gramAnswer(ex ? 'g_you_exist' : 'g_location', ok) });
}
function qErLiang() {
  const [q, a] = pick(ERLIANG);
  return mcq({ kind: 'mc', cat: 'money', label: '二 or 兩?', prompt: `<div class="qmid">${fillBlank(q)}</div>`, opts: ['二', '兩'], han: true, ans: [a === '二' ? 0 : 1], explain: `<div class="han" style="font-size:1.3rem">${q.replace('＿＿', a)}</div><div class="small">兩 before a measure word (本, 個, 點, 塊…). 二 for counting, inside bigger numbers, months, weekdays and 第二.</div>`, after: ok => gramAnswer('g_er_liang', ok) });
}
const LOOK = [['買', '賣'], ['午', '牛'], ['人', '入'], ['大', '太', '天', '夫'], ['白', '百'], ['未', '末'], ['己', '已'], ['門', '們', '問', '間'], ['他', '她', '也', '地'], ['那', '哪'], ['日', '目', '白'], ['王', '玉', '主', '生'],
  ['土', '士'], ['刀', '力'], ['今', '令', '冷'], ['東', '車'], ['西', '四'], ['本', '木', '休'], ['千', '午'], ['早', '草'], ['媽', '嗎', '馬'], ['請', '清', '情', '青'], ['很', '跟'], ['喝', '渴'], ['貴', '買'], ['洗', '先'], ['筆', '書'],
  ['花', '化'], ['茶', '菜'], ['住', '往'], ['休', '體'], ['睡', '垂'], ['課', '果'], ['明', '朋'], ['星', '是'], ['和', '知'], ['怎', '作', '昨'], ['這', '還'], ['電', '雷'], ['冰', '水'], ['見', '貝'], ['哥', '可']];
function qLook() {
  for (let tries = 0; tries < 30; tries++) {
    const set = pick(LOOK);
    const ch = pick(set);
    const cands = WL.filter(w => w.lv !== 9 && w.h.includes(ch) && w.h.length >= 2 && w.h.length <= 4 && !set.some(o => o !== ch && w.h.includes(o)));
    const pri = cands.filter(w => w.ls.length);
    const w = pick(pri.length ? pri : cands);
    if (!w) continue;
    const shown = [...w.h].map(c => c === ch ? '<span style="display:inline-grid;place-items:center;width:1.05em;height:1.05em;border:2.5px dashed var(--pen);border-radius:6px;vertical-align:-.12em;color:var(--pen)">?</span>' : esc(c)).join('');
    const opts = [ch, ...set.filter(c => c !== ch)];
    return mcq({ kind: 'mc', cat: 'chars', label: 'Which character completes the word?', prompt: `<div class="qbig">${shown}</div><div><b style="color:var(--jade)">${esc(phon(w.p))}</b> · ${esc(w.e)}</div>`, opts, han: true, ans: [0], explain: wordLine(w) + (MN[ch] ? `<div class="small"><b class="han" style="font-size:1.2rem">${ch}</b> = ${esc(MN[ch][0])} — ${esc(MN[ch][1])}</div>` : ''), after: ok => quizSRS(w.k, ok) });
  }
  return qClock();
}
const RADS = [['亻', 'person', '你他們做住休'], ['女', 'woman', '她媽姊妹好姓'], ['口', 'mouth', '嗎呢吃喝叫哪'], ['氵', 'water', '洗澡漂沒汽海'], ['木', 'tree / wood', '桌椅杯林樹校'], ['日', 'sun / day', '明早晚星昨時'],
  ['言 訁', 'speech / words', '說話請謝誰課'], ['糸', 'silk / thread', '紅綠紙給經累'], ['艹', 'grass / plant', '花茶草菜藍英'], ['忄 心', 'heart / feeling', '忙快懂想怎愛'], ['宀', 'roof', '家字安室宿'], ['辶', 'walking', '這送週道還近'],
  ['貝', 'shell / money', '買賣貴'], ['金', 'metal', '錢鉛銀錶'], ['門', 'door', '問間開關'], ['扌 手', 'hand', '打找掛搬接拉'], ['足', 'foot', '跟跑跳踢路'], ['目', 'eye', '看睡眼'], ['食 飠', 'food', '飯館餓餃飽'], ['禾', 'grain', '和種秋租'], ['竹', 'bamboo', '筆筷籃算第'], ['灬 火', 'fire', '熱點黑烤炒']];
function qRadical() {
  const r = pick(RADS);
  if (Math.random() < .5) {
    const others = sampleN(RADS.filter(x => x !== r), 3);
    return mcq({ kind: 'mc', cat: 'radical', label: 'What do these characters share?', prompt: `<div class="qmid" style="letter-spacing:.2em">${[...sampleN([...r[2]], 4)].join(' ')}</div><div class="small muted">They all contain the radical <b class="han" style="font-size:1.3rem">${r[0].split(' ')[0]}</b>. What does it mean?</div>`, opts: [r[1], ...others.map(o => o[1])], ans: [0], explain: `<div><b class="han" style="font-size:1.3rem">${r[0]}</b> = ${r[1]}: <span class="han" style="font-size:1.2rem">${[...r[2]].join(' ')}</span></div>` });
  }
  const right = pick([...r[2]]);
  const wrong = sampleN(RADS.filter(x => x !== r), 3).map(x => pick([...x[2]]));
  return mcq({ kind: 'mc', cat: 'radical', label: `Which character has the “${r[1]}” radical ${r[0].split(' ')[0]}?`, prompt: `<div class="qbig">${r[0].split(' ')[0]}</div>`, opts: [right, ...wrong], han: true, ans: [0], explain: `<div><b class="han" style="font-size:1.3rem">${r[0]}</b> = ${r[1]}: <span class="han" style="font-size:1.2rem">${[...r[2]].join(' ')}</span></div>` });
}
function qReading(rq) {
  rq = rq || pick(DATA.reading);
  const [lid, ti] = rq.text.split('-'); const tx = LMAP[lid].texts[+ti];
  return mcq({ kind: 'mc', cat: 'reading', label: 'Read, then answer', prompt: `<div class="passage"><div class="small faint" style="margin-bottom:4px">${esc(tx.title)}</div>${tx.lines.map(l => `<div class="zh">${l[0] ? `<b class="han" style="color:var(--ink-2)">${esc(l[0])}：</b>` : ''}${ruby(l[1])}</div>`).join('')}</div><div class="qmid" style="margin-top:6px">${esc(rq.q)}</div>`, opts: rq.o.slice(), han: true, ans: [rq.a], explain: `<div class="han" style="font-size:1.2rem">${esc(rq.o[rq.a])}</div>` });
}
function qRoutine() {
  const R = DATA.routine;
  return { kind: 'order', cat: 'order', label: 'Put Xiaowen’s day in order (from the Lesson 2 reading)', prompt: '<div class="small muted">Tap the activities from morning to night.</div>', tiles: R.slice(), answers: [R.join('')], sep: ' → ', end: '', explain: `<div class="han" style="font-size:1.1rem">${R.join(' → ')}</div>` };
}
function lessonQuiz(lid) {
  const L = LMAP[lid]; const ws = L.words.map(k => W[k]);
  const qs = [];
  sampleN(ws, 6).forEach((w, i) => qs.push(qVocab(w, ['h2e', 'e2h', 'h2e', 'p2h', 'h2p', 'e2h'][i], ws)));
  sampleN(DRILLS.filter(d => L.grammar.includes(d.g)), 5).forEach(d => qs.push(qFromDrill(d)));
  sampleN(DATA.reading.filter(r => r.text.startsWith(lid)), 2).forEach(r => qs.push(qReading(r)));
  if (lid === 'L2') { qs.push(qClock()); qs.push(qDate()); }
  if (lid === 'L3') { qs.push(qMW()); qs.push(qPrice()); }
  if (lid === 'L4') { qs.push(qBigNum()); qs.push(qMW()); }
  if (lid === 'L5') { qs.push(qLocation()); qs.push(qLocation()); }
  if (lid === 'L1' || lid === 'L0') qs.push(qLook());
  return shuffle(qs);
}
function mockQuiz(withTable) {
  const lw = lessonWords(); const t = withTable ? deckWords('T1').concat(deckWords('T2')) : lw;
  const qs = [];
  sampleN(lw, 5).forEach(w => qs.push(qVocab(w, 'h2e', lw)));
  sampleN(t.filter(w => !lw.includes(w)).length ? t.filter(w => !lw.includes(w)) : lw, 3).forEach(w => qs.push(qVocab(w, 'h2e', t)));
  sampleN(lw, 4).forEach(w => qs.push(qVocab(w, 'e2h', lw)));
  sampleN(lw.filter(w => w.h.length <= 3), 3).forEach(w => qs.push(qVocab(w, 'h2p', lw)));
  if (ttsOK()) { for (let i = 0; i < 3; i++) qs.push(qListenPic()); } else sampleN(lw, 3).forEach(w => qs.push(qVocab(w, 'p2h', lw)));
  for (let i = 0; i < 3; i++) qs.push(qLook());
  sampleN(DRILLS.filter(d => d.k !== 'order' && !G[d.g].later), 7).forEach(d => qs.push(qFromDrill(d)));
  qs.push(qLocation(), qBigNum());
  sampleN(DRILLS.filter(d => d.k === 'order' && d.g !== 'g_time_order'), 3).forEach(d => qs.push(qFromDrill(d)));
  qs.push(qClock(), qClock(), qDate(), qPrice(), qMW(), qErLiang());
  sampleN(DATA.reading, 3).forEach(r => qs.push(qReading(r)));
  return shuffle(qs).slice(0, 40);
}

/* ============================================================ DRILLS & TEST */
const DRILL_SETS = [
  { id: 'order', zh: '排句子', en: 'Sentence builder', d: 'Tap words into the right order. Trains word order: time before verb, 也/都 placement…', make: () => sampleN(DRILLS.filter(d => d.k === 'order' && !G[d.g].later), 10).map(qFromDrill) },
  { id: 'choose', zh: '填空', en: 'Grammar fill-in', d: 'Pick the word that fits: 不/沒, 呢/嗎, 和/跟, measure words…', make: () => sampleN(DRILLS.filter(d => d.k === 'choose' && !G[d.g].later), 12).map(qFromDrill) },
  { id: 'fix', zh: '找錯', en: 'Spot the correct sentence', d: 'Three sentences, one is right. The classic test question.', make: () => shuffle(DRILLS.filter(d => d.k === 'fix' && !G[d.g].later)).slice(0, 12).map(qFromDrill) },
  { id: 'clock', zh: '幾點', en: 'Telling time', d: 'Read the clock, say the time. Includes 兩點 and 半.', make: () => Array.from({ length: 10 }, qClock) },
  { id: 'date', zh: '日期', en: 'Dates & time order', d: 'Month, day, weekday, and big → small time order.', make: () => shuffle([...Array.from({ length: 6 }, qDate), ...sampleN(DRILLS.filter(d => d.g === 'g_time_order'), 4).map(qFromDrill)]) },
  { id: 'money', zh: '多少錢', en: 'Prices', d: 'Read price tags out in Chinese: 塊, 元, 兩塊.', make: () => Array.from({ length: 10 }, qPrice) },
  { id: 'mw', zh: '量詞', en: 'Measure words + 二/兩', d: '本, 個, 張, 台, 枝, 朵, 件, 杯, 碗, 間, 隻… and when to say 兩.', make: () => shuffle([...Array.from({ length: 8 }, qMW), ...Array.from({ length: 5 }, qErLiang)]) },
  { id: 'num', zh: '大數字', en: 'Big numbers', d: '百, 千, 萬, 零 — read prices up to 99,999 (Lesson 4).', make: () => Array.from({ length: 10 }, qBigNum) },
  { id: 'loc', zh: '在哪裡', en: 'Where is it?', d: '上面, 下面, 前面, 後面, 旁邊, 裡 — and 在 vs 有 (Lesson 5).', make: () => Array.from({ length: 10 }, qLocation) },
  { id: 'look', zh: '形近字', en: 'Look-alike characters', d: '買/賣, 午/牛, 未/末, 他/她… fill the missing character.', make: () => Array.from({ length: 12 }, qLook) },
  { id: 'rad', zh: '部首', en: 'Radicals', d: 'The building blocks: 氵 water, 口 mouth, 亻 person, 言 speech…', make: () => Array.from({ length: 10 }, qRadical) },
  { id: 'tone', zh: '聲調', en: 'Pinyin & tones', d: 'Pick the right tones for words from your lessons.', make: () => sampleN(lessonWords().filter(w => w.h.length <= 3), 12).map(w => qVocab(w, 'h2p', lessonWords())) },
  { id: 'listen', zh: '聽力', en: 'Listening', d: 'Hear a word from your lessons, pick the characters.', make: () => sampleN(lessonWords(), 12).map(w => qVocab(w, 'listen', lessonWords())) },
  { id: 'read', zh: '閱讀', en: 'Reading comprehension', d: 'Questions on the dialogues and short texts.', make: () => shuffle(DATA.reading).slice(0, 10).map(r => qReading(r)) },
  { id: 'routine', zh: '一天', en: 'Daily routine order', d: '起床 → 刷牙 → … → 睡覺, from the Lesson 2 reading.', make: () => [qRoutine(), ...sampleN(DATA.reading.filter(r => r.text === 'L2-3' || r.text === 'L2-2'), 4).map(r => qReading(r))] },
  { id: 'mix', zh: '綜合', en: 'Everything mixed', d: 'A bit of every drill type. Great for a warm-up.', make: () => shuffle([qClock(), qDate(), qPrice(), qBigNum(), qLocation(), qMW(), qErLiang(), qLook(), qRadical(), ...sampleN(DRILLS, 6).map(qFromDrill), qReading(), ...sampleN(lessonWords(), 3).map(w => qVocab(w, 'h2e', lessonWords()))]) },
];
function vDrills(el) {
  const st = c => S.cat[c] ? `${S.cat[c][0]}/${S.cat[c][1]}` : '';
  el.innerHTML = `<div class="stack"><div class="sec-head"><div><span class="eyebrow">練習 · Drills</span><h1>Practice by question type</h1></div>
    <button class="btn seal" data-go="test">${IC.test}Take a mock test</button></div>
    <div class="quick">${DRILL_SETS.map(s => `<button class="qbtn" data-drill="${s.id}"${s.id === 'listen' && !ttsOK() ? ' disabled title="No Chinese voice on this device"' : ''}><span class="qh">${s.zh}</span><b>${s.en}</b><span>${s.d}</span></button>`).join('')}</div>
    <div class="page pad"><h3 style="margin-bottom:10px">Your accuracy by skill</h3><div class="catrows">${Object.keys(CAT).map(c => { const [a, b] = S.cat[c] || [0, 0]; return `<div class="catrow"><span class="small">${CAT[c]}</span><div class="bar ${b && a / b < .6 ? 'seal' : b && a / b < .8 ? 'gold' : ''}"><i style="width:${b ? a / b * 100 : 0}%"></i></div><span class="nums small" style="text-align:right">${b ? Math.round(a / b * 100) + '%' : '—'}</span></div>`; }).join('')}</div></div></div>`;
  $$('[data-drill]', el).forEach(b => b.onclick = () => { const s = DRILL_SETS.find(x => x.id === b.dataset.drill); if (s.start) return s.start(() => go('drills')); runQuiz({ title: s.en, qs: s.make(), back: () => go('drills') }); });
}
