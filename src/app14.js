/* ============================================================ LEARNER RECORD: every answer, every peek, every question type
   Every answer is recorded by question type (right/wrong, peeked or not, time: S.qs) and by grammar point (S.ga).
   Questions about whole sentences also teach the word model: the words in a sentence you got right get a little stronger,
   and after a wrong answer its least-known words come back for review soon. Questions from the fixed pools (drills, readings,
   the teacher's tests, dialogues, second halves) that you miss go into the 錯題本 mistake notebook (S.miss) and come back,
   in Smart review too, until you get them right three times. The coach turns all of it into advice with a button to act on it. */

/* ---- question types */
const QTI = { // type: [zh, en, how to practise it]
  mean: ['意思', 'Word → meaning', 'smart'], recall: ['回想', 'Meaning → word', 'smart'], pinyin: ['拼音', 'Pinyin & tones', 'tone'],
  listen: ['聽詞', 'Listening: words', 'listen'], lpic: ['聽力選圖', 'Listening: pick A, B or C', 'lpic'], chars: ['形近字', 'Look-alike characters', 'clinic'],
  radical: ['部首', 'Radicals', 'rad'], cloze: ['填空', 'Which word fits the sentence', 'smart'], read: ['讀句子', 'Reading a sentence', 'frame'],
  frame: ['誰何時哪裡', 'Who, when, where, what', 'frame'], build: ['造句', 'Building a sentence', 'order'], order: ['排句子', 'Sentence order', 'order'],
  grammar: ['語法', 'Grammar', 'choose'], time: ['時間', 'Time & dates', 'clock'], money: ['錢・量詞', 'Prices & measure words', 'mw'], place: ['位置', 'Where things are', 'loc'],
  reading: ['閱讀', 'Reading the dialogues', 'read'], bank: ['詞庫填空', 'Word-bank dialogues', 'bank'], passage: ['短文填空', 'Passages with a word bank', 'passage'],
  mwbank: ['量詞填空', 'Measure-word bank', 'mwbank'], opp: ['反義詞', 'Opposites', 'opp'], pics: ['看圖', 'Picture matching', 'pics'],
  dialog: ['選回答', 'Choosing the reply', 'qa'], half: ['後半句', 'Second halves', 'halves'], write: ['寫字', 'Writing characters', 'write'], vocab: ['詞彙', 'Vocabulary', 'smart'] };
const QT_OF = { mean: 'mean', recall: 'recall', contrast: 'recall', py2h: 'pinyin', h2py: 'pinyin', tone: 'pinyin', hear: 'listen', hearH: 'listen', hearM: 'listen',
  lookc: 'chars', cloze: 'cloze', fix: 'grammar', pick: 'read', read: 'read', frame: 'frame', build: 'build', qa: 'dialog', dialog: 'dialog', half: 'half' };
function qtypeOf(q) {
  if (q.qtype) return q.qtype;
  if (q.kind === 'bank') return q.layout === 'pics' ? 'pics' : q.pid ? 'passage' : q.cat === 'money' ? 'mwbank' : q.cat === 'opp' ? 'opp' : 'bank';
  if (q.kind === 'write') return 'write';
  if (q.cat === 'listen') return q.optHTML ? 'lpic' : 'listen';
  if (q.qt && QT_OF[q.qt]) return QT_OF[q.qt];
  if (q.kind === 'order') return 'order';
  return QTI[q.cat] ? q.cat : 'vocab';
}
const QTIP = {
  mean: 'Say the word out loud and picture what it means before you look at the choices.',
  recall: 'Cover the choices and remember the characters first, then check. Writing a word once by hand makes it stick.',
  pinyin: 'Say each word with your hand drawing the tone: 1 flat, 2 up, 3 down-and-up, 4 down. Repeat after the voice in Cards.',
  listen: 'Play it twice and say what you heard before you look at the choices. You can slow the voice down in Settings.',
  lpic: 'Listen for the key word — a number, a time, a place, a food — then look at the pictures.',
  chars: 'The Mix-up clinic shows the strokes that differ in red. Say what each meaning part (radical) is about.',
  radical: 'Learn the meaning parts: 氵 water, 口 mouth, 亻 person, 言 speech, 扌 hand. New characters get easier to guess.',
  cloze: 'Look right before and after the blank: a measure word needs a noun, 得 needs an adjective, 在 needs a place.',
  read: 'Read the whole sentence and find who, when, where and what before you choose.',
  frame: 'Chinese order is who → when → where → what. Find each part in every sentence you read.',
  build: 'Who + when + where + verb + what. Time words go before the verb, never at the end.',
  order: 'Who + when + where + verb + what. Find the verb first, then put the time and place in front of it.',
  grammar: 'Open the grammar point, read its examples out loud, then do its drill.',
  time: 'Say times out loud: 兩點 (not 二點), 半 for :30, 分 for minutes; dates go big → small: 年 月 號 星期.',
  money: 'Measure words go with the noun: 本 books, 張 flat things, 台 machines, 件 clothes, 隻 animals. Prices: say 塊, write 元.',
  place: 'Thing + 在 + place + position: 書在桌子上面. Place + position + 有 + thing: 桌子上面有書.',
  reading: 'Read the dialogue twice: first for who and where, then for the detail the question asks about.',
  bank: 'Read the whole dialogue first, fill the blanks you are sure of, and the rest gets easier — each word is used once.',
  passage: 'Read the whole passage once before filling anything. Fill the sure blanks first; each word in the bank is used once.',
  mwbank: 'Do the nouns you are sure of first. Each measure word is used once, so the last ones are easier.',
  opp: 'Learn opposites in pairs and say them together: 大小, 冷熱, 買賣, 早晚.',
  pics: 'Say the Chinese word for each picture before you look at the word bank.',
  dialog: "Find the question word in A's line (誰, 哪裡, 什麼時候, 幾, 怎麼, 嗎). B's reply must answer exactly that.",
  half: 'Ask what has to come next: a reason (所以), a contrast (可是), a suggestion (吧, 好嗎)? The 。 or ？ at the end is a clue too.',
  write: 'Write each character three times: with the outline, from memory, and again the next day.',
  vocab: 'Little and often: Smart review brings back each word right before you would forget it.' };
const SKILL_TIP = { m: 'Make a small story for each word you miss (the memory tips in Cards) and say it in a sentence.',
  r: 'Look at the English, say the Chinese, then check — and write the word once by hand.', l: 'Listen with your eyes closed and say the word back; slow the voice down in Settings.',
  s: 'Read words out loud and draw the tone with your hand. The 聲調 drill trains exactly this.', u: 'Read whole sentences: find who, when, where and what. Then build your own with the same words.',
  w: 'Write a few characters a day: outline, from memory, then the next day again.' };

/* ---- the words in a question (for questions about whole sentences) */
const STOPW = new Set('我 你 您 他 她 它 的 是 了 很 嗎 也 都 不 在 有 和 呢 吧 這 那 個 一 二 兩 我們 你們 他們 好 要 去 說 就 還 得 到 會 想 啊 嗯'.split(' '));
const stripHTML = s => String(s || '').replace(/<rt>[^<]*<\/rt>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
function qText(q) {
  let t = stripHTML(q.prompt) + ' ' + (q.say || '');
  if (q.kind === 'mc' && q.han && !q.optHTML) t += ' ' + q.ans.map(a => q.opts[a]).join(' ');
  if (q.kind === 'order') t += ' ' + q.tiles.join(' ');
  return t;
}
const wordsIn = t => uniq(segWords(t).filter(h => HAN.test(h) && H2W[h] && !STOPW.has(h)).map(h => H2W[h].k)).filter(k => W[k] && W[k].lv !== 9);
const knowOf = k => { const v = wmOf(k); return v[0] * .4 + v[1] * .3 + v[4] * .3; };
const soon = (k, min) => { const c = S.cards[k], at = Date.now() + min * 60000; if (!c) S.cards[k] = [0, at, 0, 0]; else c[1] = Math.min(c[1], at); };

/* ---- record one answer (called by runQuiz for every answer, and for every blank of a word bank) */
function trackAnswer(q, ok, o = {}) {
  if (!q || q.kind === 'teach') return;
  const t = qtypeOf(q), now = Date.now();
  const st = S.qs[t] || (S.qs[t] = [0, 0, 0, 0, '', 0]);
  st[0] += ok ? 1 : 0; st[1]++; if (o.assist) st[2]++;
  if (o.ms > 0 && !o.blank) { st[3] += Math.min(60000, Math.round(o.ms)); st[5]++; }
  st[4] = (st[4] + (ok ? '1' : '0')).slice(-20);
  if (q.g && G[q.g]) { const g = S.ga[q.g] || (S.ga[q.g] = [0, 0, 0]); g[0] += ok ? 1 : 0; g[1]++; g[2] = now; }
  if (!q.k && !o.blank && q.kind !== 'write') {
    const ks = wordsIn(qText(q));
    if (ok && !o.assist) ks.slice(0, 5).forEach(k => learn(k, 'u', true, { w: .2, noSrs: true, noStat: true }));
    if (!ok) ks.filter(k => stageOf(k) < 5).sort((a, b) => knowOf(a) - knowOf(b)).slice(0, 3).forEach(k => { learn(k, 'u', false, { w: .3, noSrs: true, noStat: true }); soon(k, 10); });
  }
  if (q.sig) noteMiss(q.sig, ok, !!o.assist, o.yours, t);
}

/* ---- 錯題本 mistake notebook: [box, due, times missed, your last answer, last seen, type] */
function noteMiss(sig, ok, assist, yours, t) {
  const m = S.miss[sig], now = Date.now();
  if (!ok) { S.miss[sig] = [0, now + 10 * 60000, ((m && m[2]) || 0) + 1, String(yours ?? '').slice(0, 60), now, t]; trimMiss(); return; }
  if (!m || assist) return;
  m[0]++; m[4] = now;
  if (m[0] >= 3) { delete S.miss[sig]; return; }
  const eve = parseYmd(S.testDate).getTime() - 16 * 36e5;
  let at = now + (m[0] === 1 ? 1 : 3) * 864e5; if (eve > now + 3 * 36e5 && at > eve) at = eve;
  m[1] = at;
}
function trimMiss() { const ks = Object.keys(S.miss); if (ks.length > 160) ks.sort((a, b) => S.miss[a][4] - S.miss[b][4]).slice(0, ks.length - 160).forEach(k => delete S.miss[k]); }
const missDue = () => Object.keys(S.miss).filter(s => S.miss[s][1] <= Date.now()).sort((a, b) => S.miss[a][1] - S.miss[b][1]);
const missRecent = () => Object.keys(S.miss).sort((a, b) => S.miss[b][4] - S.miss[a][4]);
/* build the question again from its signature */
function missQ(sig) {
  const i = sig.indexOf('|'), kind = sig.slice(0, i), key = sig.slice(i + 1);
  let q = null;
  try {
    if (kind === 'dr') q = DRILLS[+key] ? qFromDrill(DRILLS[+key]) : null;
    else if (kind === 'rd') q = DATA.reading[+key] ? qReading(DATA.reading[+key]) : null;
    else if (kind === 'ord') { const o = TT.orders.concat(TT.last.orders).find(o => o.a[0] === key); q = o ? qOrderNum(o) : null; }
    else if (kind === 'qa') q = QA[+key] ? genChoiceSet(3, { with: QA[+key] })[0] : null;
    else if (kind === 'ch') {
      const h = ST.halves.find(x => x[0] === key), d = ST.dialogs.find(x => `A：${x[0]}　B：＿＿` === key);
      if (h) q = genHalves(4, { with: h })[0];
      else if (d) q = genDialogs(3, 1, { with: d })[0];
      else for (const st of TT.mid.choice) { const it = st.items.find(x => x[0] === key); if (it) { q = qChoice(st, it); break; } }
    }
  } catch (e) { q = null; }
  if (!q) delete S.miss[sig]; // the item no longer exists
  else q.label = '錯題 · ' + (q.label || '');
  return q;
}
function startMistakes(back) {
  const sigs = (missDue().length ? missDue() : missRecent()).slice(0, 12);
  const qs = sigs.map(missQ).filter(Boolean);
  if (!qs.length) return toast('No mistakes saved yet — every question you miss is saved here.');
  runQuiz({ title: '錯題本', adaptive: true, hearts: 0, qs: shuffle(qs), back: back || (() => go('practice')) });
}

/* ---- weak question types and grammar, for Smart review */
const accS = st => (st[0] + 1) / (st[1] + 2); // smoothed accuracy: a few answers can't make a type look perfect or hopeless
const recentAcc = st => st[4].length >= 5 ? [...st[4]].filter(x => x === '1').length / st[4].length : st[0] / Math.max(1, st[1]);
const TYPE_Q = {
  lpic: () => ttsOK() ? qListenPic() : null, time: () => pick([qClock, qDate])(), money: () => pick([qPrice, qMW, qErLiang])(), place: () => qLocation(),
  radical: () => qRadical(), chars: () => qLook(), grammar: () => { const g = weakGrammar(1)[0]; return g ? qGrammarFor(g) : null; },
  order: () => qOrderNum(pick(TT.orders)), reading: () => qReading(), half: () => genHalves(4)[0], dialog: () => genDialogs(3, 1)[0], frame: () => genFrame(),
  passage: () => genPassage({ n: 8 }), mwbank: () => genMwBank(6), pics: () => genPicSet({ n: 6 }), opp: () => qOpp(5), bank: () => { const g = genBank({ n: 4 }); return g ? genBankQ(g) : null; } };
function weakTypes(n = 2) {
  return Object.entries(S.qs).filter(([t, st]) => TYPE_Q[t] && st[1] >= 4).map(([t, st]) => [Math.min(accS(st), recentAcc(st)) - st[2] / st[1] * .3, t])
    .filter(x => x[0] < .8).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
const typeQ = t => { try { return TYPE_Q[t] ? TYPE_Q[t]() : null; } catch (e) { return null; } };

/* ---- the coach: where to improve, and what to do about it */
function runDrill(id, back) {
  const s = DRILL_SETS.find(x => x.id === id); if (!s) return startSmart();
  if (s.start) return s.start(back);
  runQuiz({ title: s.en, qs: s.make(), back });
}
function focusWords(ws, title, back) {
  ws = ws.filter(Boolean); if (!ws.length) return startSmart();
  runAdaptive({ title, len: Math.min(14, ws.length * 2 + 4), hearts: 0, gen: wordGen(ws, { teach: 0 }), back });
}
function actFor(p, back) {
  if (p === 'smart') return () => startSmart();
  if (p === 'clinic') return () => startClinic(back);
  if (p === 'write') return () => go('write');
  if (p === 'mistakes') return () => startMistakes(back);
  return () => runDrill(p, back);
}
function coachInsights() {
  const out = [], cv = CUR, cp = PARAMS, back = () => go(cv, cp);
  const add = (score, o) => out.push(Object.assign({ score }, o));
  const answers = Object.values(S.qs).reduce((a, st) => a + st[1], 0);
  // 1. question types you get wrong (or need to peek at)
  Object.entries(S.qs).forEach(([t, st]) => {
    if (!QTI[t] || st[1] < 5) return;
    const ra = recentAcc(st), pr = st[2] / st[1];
    if (ra >= .75 && pr <= .4) return;
    add((1 - ra) * 2 + pr * .8 + Math.min(.3, st[1] / 100), { zh: QTI[t][0], title: QTI[t][1], why: `${Math.round(ra * 100)}% right in your last ${Math.min(20, st[4].length || st[1])} answers${pr > .25 ? ` · you needed a peek on ${Math.round(pr * 100)}%` : ''}`,
      tip: QTIP[t] || QTIP.vocab, label: 'Practice this', act: actFor(QTI[t][2], back) });
  });
  // 2. skills (meaning, recall, listening, tones, using words, writing)
  SKL.forEach(sk => { const st = S.sk[sk]; if (!st || st[1] < 12) return; const a = st[0] / st[1];
    if (a < .7) add((.7 - a) * 2.5 + .3, { zh: SKN[sk][0], title: SKN[sk][1], why: `${Math.round(a * 100)}% right over ${st[1]} answers`, tip: SKILL_TIP[sk],
      label: sk === 'w' ? 'Write characters' : 'Smart review', act: actFor(sk === 'w' ? 'write' : sk === 's' ? 'tone' : sk === 'l' ? 'listen' : sk === 'u' ? 'frame' : 'smart', back) }); });
  // 3. how you peek
  const lately = Object.entries(S.pk).filter(([k, p]) => W[k] && Date.now() - p[2] < 14 * 864e5);
  const py = lately.reduce((a, [, p]) => a + p[0], 0), mn = lately.reduce((a, [, p]) => a + p[1], 0);
  const top = i => lately.sort((a, b) => b[1][i] - a[1][i]).filter(x => x[1][i] > 0).slice(0, 10).map(([k]) => W[k]);
  if (py >= 6 && py >= mn * .8) { const ws = top(0); add(.55 + Math.min(1, py / 30), { zh: '拼', title: 'You often peek at the pinyin', why: `${py} pinyin peeks in the last two weeks, most on ${ws.slice(0, 4).map(w => w.h).join('、')}`,
    tip: 'You know these words by sound but can\'t read the characters yet. Read them out loud without pinyin — this session asks you to read exactly those words.', label: 'Read them without pinyin', act: () => focusWords(ws, '拼 · Read without pinyin', back) }); }
  if (mn >= 6) { const ws = top(1); add(.5 + Math.min(1, mn / 30), { zh: '意', title: 'You often peek at the meaning', why: `${mn} meaning peeks in the last two weeks, most on ${ws.slice(0, 4).map(w => w.h).join('、')}`,
    tip: 'These words are not stuck yet. Make a tiny story for each one (the memory tips in Cards) and use it in a sentence of your own.', label: 'Practice these words', act: () => focusWords(ws, '意 · Words you peek at', back) }); }
  // 4. mix-ups
  const pairs = confPairs(20), nm = pairs.length + mixCount();
  if (nm >= 2) add(.5 + Math.min(1, nm / 6), { zh: '混', title: 'You mix up look-alike words', why: (pairs.slice(0, 3).map(([a, b]) => `${a.h}/${b.h}`).concat(Object.keys(S.cc).slice(0, 3).map(k => [...k].join('/')))).slice(0, 4).join(' · '),
    tip: QTIP.chars, label: 'Open the Mix-up clinic', act: actFor('clinic', back) });
  // 5. mistakes waiting in the notebook
  const md = missDue().length;
  if (md >= 2) add(.7 + Math.min(1, md / 10), { zh: '錯', title: `${md} mistakes to redo`, why: 'Questions you missed, saved in your 錯題本. Each one leaves after three right answers in a row.',
    tip: 'Redo a mistake a few minutes after it happens, then the next day, then a few days later — that is when it sticks.', label: 'Redo my mistakes', act: actFor('mistakes', back) });
  // 6. memory that is fading
  const met = WL.filter(w => S.cards[w.k] && w.lv !== 9), fading = met.filter(w => recallNow(w.k) < .7).length;
  if (fading >= 8) add(.4 + Math.min(1, fading / 40), { zh: '忘', title: `${fading} words are fading from memory`, why: 'The memory model guesses you would now forget them.', tip: QTIP.vocab, label: 'Smart review', act: actFor('smart', back) });
  // 7. grammar points
  Object.entries(S.ga).filter(([g, a]) => G[g] && a[1] >= 3 && a[0] / a[1] < .7).forEach(([g, a]) => add((.7 - a[0] / a[1]) * 2 + .3, { zh: '法', title: G[g].t.split(' — ')[0], why: `${a[0]}/${a[1]} right · ${G[g].p}`, tip: G[g].tip || QTIP.grammar,
    label: 'Practice this grammar', act: () => runQuiz({ title: G[g].t, adaptive: true, qs: Array.from({ length: 6 }, () => qGrammarFor(g)).filter(Boolean), back }) }));
  // 8. right but slow
  const SLOW = { half: 30000, dialog: 30000, reading: 35000, read: 25000, frame: 25000, cloze: 20000, order: 30000, build: 30000 };
  Object.entries(S.qs).forEach(([t, st]) => { if (!QTI[t] || st[5] < 6 || recentAcc(st) < .75) return; const avg = st[3] / st[5];
    if (avg > (SLOW[t] || 15000)) add(.3 + Math.min(.4, avg / 100000), { zh: '慢', title: `Right but slow: ${QTI[t][1].toLowerCase()}`, why: `about ${Math.round(avg / 1000)} seconds an answer`,
      tip: 'Speed comes from reading words as whole chunks. A Speed sweep through the vocab table trains exactly that.', label: 'Speed sweep', act: () => go('cards', { deck: 'T1', mode: 'speed' }) }); });
  // 9. a lesson that is fading
  LES.forEach(L => { const ws = L.words.map(k => W[k]).filter(w => w && S.cards[w.k]); if (ws.length < 8) return; const v = ws.reduce((a, w) => a + recallNow(w.k), 0) / ws.length;
    if (v < .65) add(.45 + (.65 - v) * 2, { zh: L.num.replace('第', '').replace('課', '') || L.num, title: `${LEN[L.id]} is fading (${Math.round(v * 100)}%)`, why: `${ws.length} words from ${L.num}`, tip: 'Read the lesson dialogue out loud once, then practise its words.',
      label: 'Practice ' + LEN[L.id], act: () => focusWords(ws.sort((a, b) => recallNow(a.k) - recallNow(b.k)).slice(0, 10), L.num, back) }); });
  const strong = Object.entries(S.qs).filter(([t, st]) => QTI[t] && st[1] >= 10 && recentAcc(st) >= .9).sort((a, b) => recentAcc(b[1]) - recentAcc(a[1])).slice(0, 3).map(([t, st]) => `${QTI[t][1]} ${Math.round(recentAcc(st) * 100)}%`);
  return { list: out.sort((a, b) => b.score - a.score), answers, strong };
}
let COACH = [];
function coachHTML(n = 3, full = false) {
  const c = coachInsights(); COACH = c.list.slice(0, n);
  const head = `<div class="coach-h">${mascotSVG({ mood: 'think', size: 46 })}<div><span class="eyebrow">波波教練 · Your coach</span><h3>${full ? 'Where to improve' : 'What to work on next'}</h3></div></div>`;
  if (c.answers < 20 && !COACH.length) return `<div class="card coach ${full ? 'span2' : ''}">${head}<p class="small muted">波波 records every answer: right or wrong, how long it took, and every 拼 or 意 peek. After about 20 more answers you'll see here where you need to improve, and the best way to do it.</p></div>`;
  return `<div class="card coach ${full ? 'span2' : ''}">${head}
    ${COACH.length ? `<div class="coach-list">${COACH.map((x, i) => `<div class="coach-it"><div class="coach-t"><span class="coach-zh han">${esc(x.zh)}</span><b>${esc(x.title)}</b></div><span class="small muted">${esc(x.why)}</span><span class="small">${esc(x.tip)}</span>
      <button class="btn3d sm" data-coach="${i}">${esc(x.label)}</button></div>`).join('')}</div>` : '<p class="small">Nothing weak right now — keep your streak going and 波波 will watch for anything that slips.</p>'}
    ${c.strong.length ? `<p class="small coach-strong"><b>Strong:</b> ${c.strong.map(esc).join(' · ')}</p>` : ''}
    ${full ? `<p class="tiny faint">Built from ${c.answers} recorded answers, your peeks, the words you mix up, your mistake notebook and the memory model.</p>` : `<button class="btn sm ghost" data-go="me" data-p='{"tab":"stats"}'>See all your stats</button>`}</div>`;
}
function bindCoach(root) { $$('[data-coach]', root).forEach(b => b.onclick = e => { e.stopPropagation(); const x = COACH[+b.dataset.coach]; if (x) x.act(); }); }

/* ---- stats: every question type, and the notebook */
const secs = ms => ms < 10000 ? (ms / 1000).toFixed(1) : Math.round(ms / 1000);
function typeTableHTML() {
  const rows = Object.entries(S.qs).filter(([t, st]) => QTI[t] && st[1]).sort((a, b) => recentAcc(a[1]) - recentAcc(b[1]));
  if (!rows.length) return '';
  return `<div class="card span2"><h3>Every question type</h3><p class="small muted" style="margin:2px 0 10px">Recent accuracy (last 20 answers), how often you peeked, and your average time. The lowest come first.</p>
    <div class="qtrows">${rows.map(([t, st]) => { const a = recentAcc(st); return `<div class="qtrow"><span class="small"><b class="han">${esc(QTI[t][0])}</b> ${esc(QTI[t][1])}</span><div class="bar ${a < .6 ? 'seal' : a < .8 ? 'gold' : ''}"><i style="width:${Math.round(a * 100)}%"></i></div>
      <span class="nums small qtn">${Math.round(a * 100)}% · ${st[1]}</span><span class="tiny faint qtx">${st[2] ? `peek ${Math.round(st[2] / st[1] * 100)}%` : 'no peeks'}${st[5] ? ` · ${secs(st[3] / st[5])} s` : ''}</span></div>`; }).join('')}</div></div>`;
}
function missCardHTML() {
  const all = missRecent(), due = missDue();
  const txt = sig => { const s = sig.slice(sig.indexOf('|') + 1); if (sig.startsWith('dr|')) { const d = DRILLS[+s]; return d ? (d.q || d.en || (d.o || [])[0] || '') : ''; } if (sig.startsWith('rd|')) { const r = DATA.reading[+s]; return r ? r.q : ''; } if (sig.startsWith('qa|')) { const x = QA[+s]; return x ? plainZh(x.q) : ''; } return s; };
  return `<div class="card"><h3>錯題本 Mistake notebook</h3>${all.length ? `<p class="small muted" style="margin:2px 0 8px">${all.length} saved · ${due.length} to redo now. Each leaves after three right answers.</p>
    <div class="misslist">${all.slice(0, 6).map(s => { const m = S.miss[s]; return `<div class="missit"><span class="tag">${esc((QTI[m[5]] || QTI.vocab)[0])}</span><span class="han small">${esc(txt(s).slice(0, 34))}</span>${m[3] ? `<span class="tiny faint">you: <span class="han">${esc(m[3].slice(0, 16))}</span></span>` : ''}</div>`; }).join('')}</div>
    <button class="btn3d sm" id="missGo" style="margin-top:10px">Redo ${due.length ? due.length + ' due' : 'my'} mistakes</button>` : '<p class="small muted">Every question you miss in drills, readings and practice tests is saved here, and comes back until you get it right three times.</p>'}</div>`;
}
/* end of a session: what this session showed, and what to do next */
function sessionNoteHTML(R) {
  const saved = R.log.filter(l => !l.ok && l.q.sig).length;
  const by = {}; R.log.forEach(l => { const t = qtypeOf(l.q); (by[t] = by[t] || [0, 0])[1]++; if (l.ok) by[t][0]++; });
  const w = Object.entries(by).filter(([t, v]) => QTI[t] && v[1] >= 2 && v[0] / v[1] < .8).sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])[0];
  R.focus = w ? w[0] : null;
  return (w ? `<div class="note fin-focus" style="max-width:520px"><div>Focus next on <b>${esc(QTI[w[0]][1])}</b> — ${w[1][0]}/${w[1][1]} right this time.</div><div class="small">${esc(QTIP[w[0]] || '')}</div><button class="btn3d sm" id="fin-focus">Practice ${esc(QTI[w[0]][1].toLowerCase())}</button></div>` : '')
    + (saved ? `<p class="small muted" style="max-width:520px;text-align:center">${saved} question${saved > 1 ? 's' : ''} went into your 錯題本 mistake notebook — ${saved > 1 ? 'they come' : 'it comes'} back in Smart review until you get ${saved > 1 ? 'them' : 'it'} right three times.</p>` : '');
}

/* ---- peeking inside questions: every Chinese word in a prompt can be tapped (pinyin first, then the meaning) */
function canTokPrompt(q) { return (q.kind === 'mc' || q.kind === 'order') && q.sk !== 's' && q.cat !== 'chars' && !['lookc', 'contrast'].includes(q.qt) && !q.noPeek; }
function tokPrompt(root) {
  if (!root) return;
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), nodes = [];
  while (walk.nextNode()) { const n = walk.currentNode; if (HAN.test(n.nodeValue) && !n.parentElement.closest('ruby, rt, button, svg, .pricetag, .notok')) nodes.push(n); }
  nodes.forEach(n => { const s = document.createElement('span'); s.className = 'hidepy tkz'; s.innerHTML = ruby(tokenizeLoose(n.nodeValue)); n.replaceWith(s); });
}
/* answer choices in Chinese get a 拼 → 意 peek, like the word bank (not where it would give the answer away) */
function canPeekOpts(q) { return q.han && !q.optHTML && !q.noPeek && q.cat !== 'listen' && q.sk !== 's' && q.sk !== 'l'; }
function optPeekHTML(o, lvl) {
  const x = H2W[o], en = lvl >= 2 ? (x ? shortEn(x.e) : wordsIn(o).slice(0, 5).map(k => `${W[k].h} ${shortEn(W[k].e)}`).join(' · ')) : '';
  return (lvl >= 1 ? `<span class="opy">${esc(phon(pyOfText(o)))}</span>` : '') + (en ? `<span class="oen">${esc(en)}</span>` : '');
}
// the words a peek at a choice counts for: a single word always, in a sentence only the words you don't know well yet
const peekKeys = opt => H2W[opt] ? [H2W[opt].k] : wordsIn(opt).filter(k => stageOf(k) <= 3).slice(0, 3);

/* ---- practice hub tile and drill for the notebook */
DRILL_SETS.unshift({ id: 'miss', zh: '錯題本', en: 'Mistake notebook', d: 'Every question you missed, until you get it right three times.', start: back => startMistakes(back) });
