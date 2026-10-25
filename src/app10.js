/* ============================================================ SENTENCE ENGINE
   1) a corpus of real sentences (lesson dialogues + grammar examples)
   2) a generator that builds NEW, grammatical sentences from the lesson words, with
      minimal-pair variants (one word changed) and typical-mistake variants (wrong grammar). */
const OVR = { 了: 'le', 的: 'de', 得: 'de', 嗎: 'ma', 呢: 'ne', 吧: 'ba', 中明: 'Zhōngmíng', 友美: 'Yǒuměi', 游: 'yóu', 泳: 'yǒng', 舞: 'wǔ', 歌: 'gē', 步: 'bù',
  每天: 'měitiān', 有一點: 'yǒu yìdiǎn', 或是: 'huòshì', 一點: 'yìdiǎn', 多少: 'duōshǎo', 錢: 'qián', 飯: 'fàn' };
const NPY = { 零: 'líng', 一: 'yī', 二: 'èr', 兩: 'liǎng', 三: 'sān', 四: 'sì', 五: 'wǔ', 六: 'liù', 七: 'qī', 八: 'bā', 九: 'jiǔ', 十: 'shí', 百: 'bǎi', 千: 'qiān', 萬: 'wàn' };
Object.assign(OVR, { 宜文: 'Yíwén', 國安: "Guó'ān", 小華: 'Xiǎohuá', 小美: 'Xiǎoměi', 小明: 'Xiǎomíng', 安娜: 'Ānnà', 大明: 'Dàmíng' });
function pyOf(h) {
  if (OVR[h]) return OVR[h];
  if (DATA.altpy && DATA.altpy[h]) return DATA.altpy[h];
  const w = H2W[h]; if (w && w.h === h) return w.p;
  if (/^[零一二兩三四五六七八九十百千萬]+$/.test(h)) return [...h].map(c => NPY[c]).join('');
  const m = h.match(/^([零一二兩三四五六七八九十]+)點$/); if (m) return [...m[1]].map(c => NPY[c]).join('') + ' diǎn';
  return w ? w.p : '';
}
const firstTone = p => { try { const c = parsePy(p); return c[0] && c[0][0] ? c[0][0][1] : 0; } catch (e) { return 0; } };
function mkToks(words, end) {
  const t = words.map(h => [h, pyOf(h)]);
  t.forEach((x, i) => {
    const nx = t[i + 1]; if (!nx) return;
    const nt = nx[0] === '個' ? 4 : firstTone(nx[1]);
    if (x[0] === '不') x[1] = nt === 4 ? 'bú' : 'bù';
    if (x[0] === '一') x[1] = nt === 4 ? 'yí' : 'yì';
  });
  if (end) t.push([end, '']);
  return t;
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const tidy = s => s.replace(/\s+/g, ' ').replace(/\s+([?.!,])/g, '$1').trim();
const art = s => (/^[aeiou]/i.test(s) ? 'an ' : 'a ') + s;

/* ---- slot pools */
const SUBJ = [{ h: ['我'], en: 'I' }, { h: ['你'], en: 'you' }, { h: ['他'], en: 'he', p3: 1 }, { h: ['她'], en: 'she', p3: 1 }, { h: ['我們'], en: 'we', pl: 1 },
  { h: ['他們'], en: 'they', pl: 1 }, { h: ['中明'], en: 'Zhongming', p3: 1 }, { h: ['友美'], en: 'Youmei', p3: 1 }, { h: ['我', '朋友'], en: 'my friend', p3: 1 },
  { h: ['我', '媽媽'], en: 'my mom', p3: 1 }, { h: ['老師'], en: 'the teacher', p3: 1 }];
const beOf = s => s.en === 'I' ? 'am' : s.p3 ? 'is' : 'are';
const vOf = (s, a) => s.p3 ? a.vs : a.v;
const ACT = {
  看書: { h: ['看書'], v: 'read', vs: 'reads', vg: 'reading', o: '' },
  看電影: { h: ['看', '電影'], v: 'watch', vs: 'watches', vg: 'watching', o: 'movies', o1: 'a movie' },
  看電視: { h: ['看電視'], v: 'watch', vs: 'watches', vg: 'watching', o: 'TV' },
  聽音樂: { h: ['聽', '音樂'], v: 'listen', vs: 'listens', vg: 'listening', o: 'to music' },
  喝咖啡: { h: ['喝', '咖啡'], v: 'drink', vs: 'drinks', vg: 'drinking', o: 'coffee', go: 1 },
  喝茶: { h: ['喝', '茶'], v: 'drink', vs: 'drinks', vg: 'drinking', o: 'tea' },
  吃飯: { h: ['吃飯'], v: 'eat', vs: 'eats', vg: 'eating', o: '' },
  打籃球: { h: ['打', '籃球'], v: 'play', vs: 'plays', vg: 'playing', o: 'basketball', V: '打', O: '籃球', mn: ['好', '不錯'], skill: 1, go: 1 },
  打網球: { h: ['打', '網球'], v: 'play', vs: 'plays', vg: 'playing', o: 'tennis', V: '打', O: '網球', mn: ['好', '不錯'], skill: 1, go: 1 },
  踢足球: { h: ['踢', '足球'], v: 'play', vs: 'plays', vg: 'playing', o: 'soccer', V: '踢', O: '足球', mn: ['好', '不錯'], skill: 1, go: 1 },
  游泳: { h: ['游泳'], v: 'swim', vs: 'swims', vg: 'swimming', o: '', V: '游', O: '泳', VO: '游泳', mn: ['好', '快', '不錯'], skill: 1, go: 1 },
  唱歌: { h: ['唱歌'], v: 'sing', vs: 'sings', vg: 'singing', o: '', V: '唱', O: '歌', VO: '唱歌', mn: ['好', '不錯'], skill: 1, go: 1 },
  跳舞: { h: ['跳舞'], v: 'dance', vs: 'dances', vg: 'dancing', o: '', V: '跳', O: '舞', VO: '跳舞', mn: ['好', '漂亮', '不錯'], skill: 1, go: 1 },
  學中文: { h: ['學', '中文'], v: 'study', vs: 'studies', vg: 'studying', o: 'Chinese' },
  說中文: { h: ['說', '中文'], v: 'speak', vs: 'speaks', vg: 'speaking', o: 'Chinese', V: '說', O: '中文', mn: ['好', '不錯'], skill: 1 },
  做功課: { h: ['做', '功課'], v: 'do', vs: 'does', vg: 'doing', o: 'homework' },
  買東西: { h: ['買', '東西'], v: 'shop', vs: 'shops', vg: 'shopping', o: '', go: 1 },
  做飯: { h: ['做飯'], v: 'cook', vs: 'cooks', vg: 'cooking', o: '', V: '做', O: '飯', VO: '做飯', mn: ['好', '不錯'], skill: 1 },
  跑步: { h: ['跑步'], v: 'run', vs: 'runs', vg: 'running', o: '', V: '跑', O: '步', VO: '跑步', mn: ['快'], skill: 0, go: 1 },
  騎腳踏車: { h: ['騎', '腳踏車'], v: 'ride', vs: 'rides', vg: 'riding', o: 'a bike', V: '騎', O: '腳踏車', mn: ['快'], skill: 1, go: 1 },
  上網: { h: ['上網'], v: 'go online', vs: 'goes online', vg: 'going online', o: '' },
  畫畫: { h: ['畫畫'], v: 'draw', vs: 'draws', vg: 'drawing', o: '', skill: 1 },
  上課: { h: ['上課'], v: 'have class', vs: 'has class', vg: 'having class', o: '', noLike: 1 },
};
Object.entries(ACT).forEach(([id, a]) => { a.id = id; });
const ACTS = Object.values(ACT);
const MN_EN = { 好: 'very well', 快: 'very fast', 漂亮: 'very beautifully', 不錯: 'pretty well' };
const PLACE = [
  { h: ['學校'], en: 'school', to: 'to school', acts: ['上課', '學中文', '打籃球'] },
  { h: ['圖書館'], en: 'the library', acts: ['看書', '做功課', '學中文'] },
  { h: ['電影院'], en: 'the movie theater', acts: ['看電影'] },
  { h: ['公園'], en: 'the park', acts: ['跑步', '打籃球', '騎腳踏車', '踢足球'] },
  { h: ['餐廳'], en: 'a restaurant', acts: ['吃飯'] },
  { h: ['咖啡廳'], en: 'the café', acts: ['喝咖啡', '看書'] },
  { h: ['商店'], en: 'the store', acts: ['買東西'] },
  { h: ['夜市'], en: 'the night market', acts: ['買東西'] },
  { h: ['海邊'], en: 'the beach', acts: ['游泳'] },
  { h: ['朋友', '家'], en: "a friend's house", acts: ['看電視', '做功課'] }];
PLACE.forEach(p => { p.to = p.to || 'to ' + p.en; });
const TIME = [{ h: ['今天'], en: 'today' }, { h: ['明天'], en: 'tomorrow' }, { h: ['週末'], en: 'on the weekend' }, { h: ['星期六'], en: 'on Saturday' },
  { h: ['星期天'], en: 'on Sunday' }, { h: ['今天', '晚上'], en: 'tonight' }, { h: ['明天', '下午'], en: 'tomorrow afternoon' }];
const ADJP = [{ h: ['忙'], en: 'busy' }, { h: ['累'], en: 'tired' }, { h: ['高興'], en: 'happy' }, { h: ['餓'], en: 'hungry' }, { h: ['渴'], en: 'thirsty' }, { h: ['高'], en: 'tall' }, { h: ['可愛'], en: 'cute' }];
const ITEM = [
  { h: ['書'], mw: '本', sg: 'book', pl: 'books', g: 1, buy: 1, loc: 1 }, { h: ['筆'], mw: '枝', sg: 'pen', pl: 'pens', g: 1, buy: 1, loc: 1 },
  { h: ['衣服'], mw: '件', sg: 'piece of clothing', pl: 'pieces of clothing', buy: 1, size: 1 }, { h: ['花'], mw: '朵', sg: 'flower', pl: 'flowers', g: 1, buy: 1, loc: 1 },
  { h: ['電腦'], mw: '台', sg: 'computer', pl: 'computers', buy: 1, size: 1 }, { h: ['桌子'], mw: '張', sg: 'table', pl: 'tables', buy: 1, size: 1 },
  { h: ['椅子'], mw: '張', sg: 'chair', pl: 'chairs', buy: 1, size: 1 }, { h: ['蛋糕'], mw: '個', sg: 'cake', pl: 'cakes', g: 1, buy: 1, food: 1, sweet: 1, yum: 1, loc: 1 },
  { h: ['鞋子'], mw: '雙', sg: 'pair of shoes', pl: 'pairs of shoes', buy: 1, size: 1 }, { h: ['杯子'], mw: '個', sg: 'cup', pl: 'cups', g: 1, buy: 1, size: 1, loc: 1 },
  { h: ['錢包'], mw: '個', sg: 'wallet', pl: 'wallets', g: 1, buy: 1 }, { h: ['書包'], mw: '個', sg: 'backpack', pl: 'backpacks', g: 1, buy: 1, size: 1 },
  { h: ['咖啡'], mw: '杯', sg: 'cup of coffee', pl: 'cups of coffee', buy: 1, drink: 1, tasty: 1, order: 1 },
  { h: ['奶茶'], mw: '杯', sg: 'cup of milk tea', pl: 'cups of milk tea', buy: 1, drink: 1, sweet: 1, tasty: 1, order: 1 },
  { h: ['果汁'], mw: '杯', sg: 'glass of juice', pl: 'glasses of juice', buy: 1, drink: 1, sweet: 1, order: 1 },
  { h: ['水'], mw: '瓶', sg: 'bottle of water', pl: 'bottles of water', buy: 1, drink: 1, order: 1 },
  { h: ['汽水'], mw: '瓶', sg: 'bottle of soda', pl: 'bottles of soda', buy: 1, drink: 1, sweet: 1, order: 1 },
  { h: ['牛肉麵'], mw: '碗', sg: 'bowl of beef noodles', pl: 'bowls of beef noodles', buy: 1, food: 1, yum: 1, order: 1 },
  { h: ['貓'], mw: '隻', sg: 'cat', pl: 'cats', animal: 1, loc: 1 }, { h: ['狗'], mw: '隻', sg: 'dog', pl: 'dogs', animal: 1, loc: 1 }];
const NUM = [{ n: 1, h: '一' }, { n: 2, h: '兩' }, { n: 3, h: '三' }, { n: 4, h: '四' }, { n: 5, h: '五' }];
const NUM_EN = ['', 'one', 'two', 'three', 'four', 'five'];
const numPhrase = (n, it) => n === 1 ? art(it.sg) : NUM_EN[n] + ' ' + it.pl;
const TOO = [{ h: ['貴'], en: 'expensive', ok: it => it.buy }, { h: ['大'], en: 'big', ok: it => it.size }, { h: ['小'], en: 'small', ok: it => it.size },
  { h: ['甜'], en: 'sweet', ok: it => it.sweet }, { h: ['好吃'], en: 'delicious', so: 1, ok: it => it.yum }, { h: ['好喝'], en: 'tasty', so: 1, ok: it => it.tasty }];
const DRINK = [{ h: ['咖啡'], en: 'coffee' }, { h: ['茶'], en: 'tea' }, { h: ['果汁'], en: 'juice' }, { h: ['奶茶'], en: 'milk tea' }, { h: ['紅茶'], en: 'black tea' },
  { h: ['綠茶'], en: 'green tea' }, { h: ['牛奶'], en: 'milk' }, { h: ['汽水'], en: 'soda' }];
const LOCN = [{ h: ['上面'], en: 'on' }, { h: ['下面'], en: 'under' }, { h: ['旁邊'], en: 'next to' }, { h: ['前面'], en: 'in front of' }, { h: ['後面'], en: 'behind' }, { h: ['裡面'], en: 'in' }];
const SPOT = [{ h: ['桌子'], en: 'table', f: 1 }, { h: ['椅子'], en: 'chair', f: 1 }, { h: ['床'], en: 'bed', f: 1 }, { h: ['沙發'], en: 'sofa', f: 1 }, { h: ['書桌'], en: 'desk', f: 1 },
  { h: ['電視'], en: 'TV', side: 1 }, { h: ['窗戶'], en: 'window', side: 1 }, { h: ['門'], en: 'door', side: 1 },
  { h: ['書包'], en: 'backpack', box: ['書', '筆', '錢包'] }, { h: ['房間'], en: 'room', box: ['貓', '狗', '書包'] }, { h: ['冰箱'], en: 'fridge', box: ['蛋糕'] }];
function spotOK(sp, lc, it) {
  const L = lc.h[0], o = it.h[0];
  if (sp.h[0] === o) return false;
  if (L === '裡面') return !!(sp.box && sp.box.includes(o));
  if (sp.box) return false;
  if (sp.f) return ['上面', '下面', '旁邊'].includes(L) || (['前面', '後面'].includes(L) && ['沙發', '椅子'].includes(sp.h[0]));
  if (sp.side) return ['旁邊', '前面', '後面'].includes(L) || (L === '上面' && sp.h[0] === '電視' && ['書', '貓', '筆'].includes(o));
  return false;
}
const GIFT_TO = [{ h: ['媽媽'], en: 'Mom' }, { h: ['爸爸'], en: 'Dad' }, { h: ['老師'], en: 'the teacher' }, { h: ['我', '朋友'], en: 'my friend' }, { h: ['他'], en: 'him' }, { h: ['她'], en: 'her' }];
const ROUT = [
  { h: ['起床'], v: 'get up', vs: 'gets up', t: [6, 7], p: '早上' }, { h: ['吃', '早餐'], v: 'eat breakfast', vs: 'eats breakfast', t: [7, 8], p: '早上' },
  { h: ['去', '學校'], v: 'go to school', vs: 'goes to school', t: [7, 8], p: '早上' }, { h: ['上課'], v: 'have class', vs: 'has class', t: [8, 9, 10], p: '上午' },
  { h: ['回家'], v: 'go home', vs: 'goes home', t: [4, 5], p: '下午' }, { h: ['吃', '晚餐'], v: 'eat dinner', vs: 'eats dinner', t: [6, 7], p: '晚上' },
  { h: ['洗澡'], v: 'take a shower', vs: 'takes a shower', t: [8, 9], p: '晚上' }, { h: ['睡覺'], v: 'go to bed', vs: 'goes to bed', t: [10, 11], p: '晚上' }];
const TOPIC = [{ h: ['中文'], en: 'Chinese', adj: [['難', 'difficult'], ['容易', 'easy'], ['有意思', 'interesting']] },
  { h: ['這', '本', '書'], en: 'this book', adj: [['有意思', 'interesting'], ['好看', 'good']] },
  { h: ['這', '部', '電影'], en: 'this movie', adj: [['有意思', 'interesting'], ['好看', 'good']] },
  { h: ['這', '杯', '奶茶'], en: 'this milk tea', adj: [['好喝', 'tasty'], ['甜', 'sweet']] },
  { h: ['牛肉麵'], en: 'beef noodles', pl: 1, adj: [['好吃', 'delicious']] }];
const OPINION = TOPIC.flatMap(t => t.adj.map(([a, en]) => ({ h: [a], en, top: t.h.join('') })));
const ORDER_OPEN = [{ h: ['請', '給', '我'], en: 'Please give me' }, { h: ['我', '要'], en: "I'd like" }];
const ADV = [{ h: ['常常'], en: 'often' }, { h: ['有時候'], en: 'sometimes' }];
const MWS_ALL = ['本', '枝', '件', '朵', '台', '張', '個', '雙', '杯', '瓶', '碗', '隻'];
const POOLS = { s: SUBJ, a: ACTS, pl: PLACE, t: TIME, adj: ADJP, it: ITEM, num: NUM, too: TOO, d: DRINK, d2: DRINK, lc: LOCN, sp: SPOT, to: GIFT_TO, r: ROUT, top: TOPIC, op: OPINION, open: ORDER_OPEN, adv: ADV };
const MWPOOL = MWS_ALL.map(m => ({ h: [m], mw: m }));

/* ---- templates: slots, validity, Chinese chunks, English, typical mistakes */
const TPL = [
  { id: 'qu', L: 'L2', g: 'g_time_pos', sl: ['s', 't', 'pl', 'a'], float: 1,
    ok: v => v.pl.acts.includes(v.a.id), zh: v => [v.s.h, v.t.h, ['去'], v.pl.h, v.a.h], end: '。',
    en: v => `${cap(v.s.en)} ${beOf(v.s)} going ${v.pl.to} to ${v.a.v} ${v.a.o1 || v.a.o} ${v.t.en}.`,
    bad: [v => [v.s.h, ['去'], v.pl.h, v.a.h, v.t.h], v => [v.s.h, v.t.h, v.pl.h, ['去'], v.a.h]] },
  { id: 'like', L: 'L1', g: 'g_xihuan_ai', sl: ['s', 'a'], ok: v => !v.a.noLike, zh: v => [v.s.h, ['喜歡'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? 'likes' : 'like'} ${v.a.vg} ${v.a.o}.`, bad: [v => [v.s.h, v.a.h, ['喜歡']]] },
  { id: 'nolike', L: 'L1', g: 'g_xihuan_ai', sl: ['s', 'a'], ok: v => !v.a.noLike, zh: v => [v.s.h, ['不', '喜歡'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? "doesn't" : "don't"} like ${v.a.vg} ${v.a.o}.`, bad: [v => [['不'], v.s.h, ['喜歡'], v.a.h]] },
  { id: 'also', L: 'L1', g: 'g_ye', sl: ['s', 'a'], ok: v => !v.a.noLike, zh: v => [v.s.h, ['也'], ['喜歡'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} also ${v.s.p3 ? 'likes' : 'like'} ${v.a.vg} ${v.a.o}.`, bad: [v => [v.s.h, ['喜歡'], ['也'], v.a.h], v => [['也'], v.s.h, ['喜歡'], v.a.h]] },
  { id: 'all', L: 'L3', g: 'g_dou', sl: ['s', 'a'], ok: v => v.s.pl && !v.a.noLike, zh: v => [v.s.h, ['都'], ['喜歡'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} all like ${v.a.vg} ${v.a.o}.`, bad: [v => [v.s.h, ['喜歡'], ['都'], v.a.h], v => [['都'], v.s.h, ['喜歡'], v.a.h]] },
  { id: 'hen', bk: [['adj']], L: 'L1', g: 'g_hen_adj', sl: ['s', 'adj'], ok: () => true, zh: v => [v.s.h, ['很'], v.adj.h], end: '。',
    en: v => `${cap(v.s.en)} ${beOf(v.s)} very ${v.adj.en}.`, bad: [v => [v.s.h, ['是'], v.adj.h]] },
  { id: 'bu', bk: [['adj']], L: 'L1', g: 'g_buhen', sl: ['s', 'adj'], ok: () => true, zh: v => [v.s.h, ['不'], v.adj.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.en === 'I' ? 'am not' : v.s.p3 ? "isn't" : "aren't"} ${v.adj.en}.`, bad: [v => [v.s.h, ['不'], ['是'], v.adj.h]] },
  { id: 'ma', L: 'L1', g: 'g_ma', sl: ['s', 'adj'], ok: v => v.s.en !== 'I', zh: v => [v.s.h, v.adj.h, ['嗎']], end: '？',
    en: v => `${cap(beOf(v.s))} ${v.s.en} ${v.adj.en}?`, bad: [v => [v.s.h, ['嗎'], v.adj.h]] },
  { id: 'huiq', L: 'L6', g: 'g_hui', sl: ['s', 'a'], ok: v => v.a.skill && v.s.en !== 'I', zh: v => [v.s.h, ['會'], v.a.h, ['嗎']], end: '？',
    en: v => `Can ${v.s.en} ${v.a.v} ${v.a.o}?`, bad: [v => [['會'], v.s.h, v.a.h, ['嗎']], v => [v.s.h, ['會'], ['嗎'], v.a.h]] },
  { id: 'hui', L: 'L6', g: 'g_hui', sl: ['s', 'a'], ok: v => v.a.skill, zh: v => [v.s.h, ['會'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} can ${v.a.v} ${v.a.o}.`, bad: [v => [v.s.h, v.a.h, ['會']]] },
  { id: 'buhui', L: 'L6', g: 'g_hui', sl: ['s', 'a'], ok: v => v.a.skill, zh: v => [v.s.h, ['不', '會'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} can't ${v.a.v} ${v.a.o}.`, bad: [v => [v.s.h, ['會', '不'], v.a.h]] },
  { id: 'de', bk: [['fw', '得', ['得'], ['的', '了', '在', '有']]], L: 'L6', g: 'g_de_comp', sl: ['s', 'a', 'mn'], ok: v => v.a.mn && v.a.mn.includes(v.mn.h[0]),
    zh: v => [v.s.h, v.a.VO ? [v.a.VO] : [v.a.V, v.a.O], [v.a.V, '得'], v.mn.h[0] === '不錯' ? ['不錯'] : ['很', v.mn.h[0]]], end: '。',
    en: v => `${cap(v.s.en)} ${vOf(v.s, v.a)} ${v.a.o} ${MN_EN[v.mn.h[0]]}.`,
    bad: [v => [v.s.h, v.a.VO ? [v.a.VO] : [v.a.V, v.a.O], ['得'], v.mn.h[0] === '不錯' ? ['不錯'] : ['很', v.mn.h[0]]], v => [v.s.h, [v.a.V, '得'], v.mn.h[0] === '不錯' ? ['不錯'] : ['很', v.mn.h[0]], [v.a.O]]] },
  { id: 'zui', L: 'L4', g: 'g_zui', sl: ['s', 'a'], ok: v => !v.a.noLike, zh: v => [v.s.h, ['最'], ['喜歡'], v.a.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? 'likes' : 'like'} ${v.a.vg} ${v.a.o} the most.`, bad: [v => [v.s.h, ['喜歡'], ['最'], v.a.h]] },
  { id: 'ba', bk: [['fw', '吧', ['吧'], ['嗎', '了', '的', '呢']]], L: 'L5', g: 'g_ba', sl: ['t', 'a'], float: 1, ok: v => v.a.go, zh: v => [['我們'], v.t.h, ['去'], v.a.h, ['吧']], end: '！',
    en: v => `Let's go ${v.a.v} ${v.a.o1 || v.a.o} ${v.t.en}!`, bad: [v => [['我們'], v.t.h, ['吧'], ['去'], v.a.h]] },
  { id: 'yaobuyao', L: 'L2', g: 'g_yao', sl: ['t', 'pl'], float: 1, ok: () => true, zh: v => [['你'], v.t.h, ['要', '不', '要'], ['去'], v.pl.h], end: '？',
    en: v => `Do you want to go ${v.pl.to} ${v.t.en}?` },
  { id: 'haishi', bk: [['fw', '還是', ['還是'], ['也', '都', '很', '在', '有']]], L: 'L4', g: 'g_haishi', sl: ['d', 'd2'], ok: v => v.d !== v.d2, zh: v => [['你'], ['要'], v.d.h, ['還是'], v.d2.h], end: '？',
    en: v => `Would you like ${v.d.en} or ${v.d2.en}?`, bad: [v => [['你'], ['要'], v.d.h, ['或是'], v.d2.h]] },
  { id: 'buy', bk: [['mw'], ['it'], ['fw', '想', ['想', '要'], ['得', '嗎', '吧', '的', '太']]], L: 'L3', g: 'g_mw', sl: ['s', 'num', 'it'], ok: v => v.it.buy, zh: v => [v.s.h, ['想'], ['買'], [v.num.h, v.it.mw], v.it.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? 'wants' : 'want'} to buy ${numPhrase(v.num.n, v.it)}.`,
    bad: [v => v.num.n === 2 ? [v.s.h, ['想'], ['買'], ['二', v.it.mw], v.it.h] : [v.s.h, ['想'], ['買'], [v.num.h, wrongMW(v.it)], v.it.h], v => [v.s.h, ['想'], ['買'], v.it.h, [v.num.h, v.it.mw]]] },
  { id: 'price', bk: [['mw'], ['fw', '多少', ['多少'], ['什麼', '很', '都', '也']]], L: 'L3', g: 'g_price', sl: ['it'], ok: v => v.it.buy, zh: v => [['這', v.it.mw], v.it.h, ['多少'], ['錢']], end: '？',
    en: v => `How much is this ${v.it.sg}?`, bad: [v => [['多少'], ['錢'], ['這', v.it.mw], v.it.h]] },
  { id: 'cost', L: 'L4', g: 'g_bignum', sl: ['it', 'pr'], ok: v => v.it.buy && priceOK(v.it, v.pr.n), zh: v => [['這', v.it.mw], v.it.h, v.pr.h, ['塊']], end: '。',
    en: v => `This ${v.it.sg} is ${v.pr.n} dollars.`, bad: [v => v.pr.n === 2 ? [['這', v.it.mw], v.it.h, ['二'], ['塊']] : [['這', v.it.mw], v.it.h, ['塊'], v.pr.h]] },
  { id: 'tai', bk: [['fw', '太', ['太'], ['在', '有', '得', '嗎', '的']]], L: 'L4', g: 'g_tai_le', sl: ['it', 'too'], ok: v => v.too.ok(v.it), zh: v => [['這', v.it.mw], v.it.h, ['太'], v.too.h, ['了']], end: '！',
    en: v => `This ${v.it.sg} is ${v.too.so ? 'so' : 'too'} ${v.too.en}!`, bad: [v => [['這', v.it.mw], v.it.h, ['了'], ['太'], v.too.h]] },
  { id: 'youyidian', L: 'L6', g: 'g_youdian', sl: ['it', 'too'], ok: v => v.too.ok(v.it) && !v.too.so, zh: v => [['這', v.it.mw], v.it.h, ['有一點'], v.too.h], end: '。',
    en: v => `This ${v.it.sg} is a bit ${v.too.en}.`, bad: [v => [['這', v.it.mw], v.it.h, v.too.h, ['有一點']]] },
  { id: 'zai', bk: [['fw', '在', ['在'], ['有', '是', '得', '的']]], L: 'L5', g: 'g_location', sl: ['it', 'sp', 'lc'], ok: v => v.it.loc && spotOK(v.sp, v.lc, v.it), zh: v => [v.it.h, ['在'], v.sp.h, v.lc.h], end: '。',
    en: v => `The ${v.it.sg} is ${v.lc.en} the ${v.sp.en}.`, bad: [v => [v.it.h, ['是'], v.sp.h, v.lc.h], v => [v.sp.h, v.lc.h, ['在'], v.it.h]] },
  { id: 'you', bk: [['mw'], ['fw', '有', ['有'], ['在', '得', '嗎']]], L: 'L5', g: 'g_you_exist', sl: ['sp', 'lc', 'num', 'it'], ok: v => v.it.loc && spotOK(v.sp, v.lc, v.it) && v.num.n <= 3,
    zh: v => [v.sp.h.concat(v.lc.h), ['有'], [v.num.h, v.it.mw], v.it.h], end: '。',
    en: v => `There ${v.num.n === 1 ? 'is' : 'are'} ${numPhrase(v.num.n, v.it)} ${v.lc.en} the ${v.sp.en}.`, bad: [v => [v.sp.h.concat(v.lc.h), ['在'], [v.num.h, v.it.mw], v.it.h]] },
  { id: 'song', bk: [['mw'], ['fw', '送', ['送', '給'], ['在', '有', '得', '是']]], L: 'L3', g: 'g_song', sl: ['s', 'to', 'it'], ok: v => v.it.g && v.s.h[v.s.h.length - 1] !== v.to.h[v.to.h.length - 1] && !(v.s.en === 'I' && v.to.en === 'my friend'),
    zh: v => [v.s.h, ['想'], ['送'], v.to.h, ['一', v.it.mw], v.it.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? 'wants' : 'want'} to give ${v.to.en} ${art(v.it.sg)}.`, bad: [v => [v.s.h, ['想'], ['送'], ['一', v.it.mw], v.it.h, v.to.h]] },
  { id: 'clock', L: 'L2', g: 'g_clock', sl: ['s', 'r', 'hr'], float: 3, ok: v => v.r.t.includes(v.hr.n),
    zh: v => [v.s.h, ['每天'], [v.r.p], v.hr.half ? [hourZh(v.hr.n) + '點', '半'] : [hourZh(v.hr.n) + '點'], v.r.h], end: '。',
    en: v => `${cap(v.s.en)} ${vOf(v.s, v.r)} at ${v.hr.n}${v.hr.half ? ':30' : ''} ${v.r.p === '早上' || v.r.p === '上午' ? 'a.m.' : 'p.m.'} every day.`,
    bad: [v => [v.s.h, v.r.h, ['每天'], [v.r.p], v.hr.half ? [hourZh(v.hr.n) + '點', '半'] : [hourZh(v.hr.n) + '點']]] },
  { id: 'freq', L: 'L3', g: 'g_changchang', sl: ['s', 'adv', 'pl', 'a'], ok: v => v.pl.acts.includes(v.a.id), zh: v => [v.s.h, v.adv.h, ['去'], v.pl.h, v.a.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.adv.en} ${v.s.p3 ? 'goes' : 'go'} ${v.pl.to} to ${v.a.v} ${v.a.o1 || v.a.o}.`, bad: [v => [v.s.h, ['去'], v.pl.h, v.adv.h, v.a.h]] },
  { id: 'juede', bk: [['fw', '覺得', ['覺得', '想'], ['喜歡', '會', '在', '有']]], L: 'L6', g: 'g_juede', sl: ['s', 'top', 'op'], ok: v => v.op.top === v.top.h.join(''), zh: v => [v.s.h, ['覺得'], v.top.h, ['很'], v.op.h], end: '。',
    en: v => `${cap(v.s.en)} ${v.s.p3 ? 'thinks' : 'think'} ${v.top.en} ${v.top.pl ? 'are' : 'is'} very ${v.op.en}.`, bad: [v => [v.s.h, v.top.h, ['覺得'], ['很'], v.op.h]] },
  { id: 'order', bk: [['mw'], ['it']], L: 'L4', g: 'g_order', sl: ['open', 'it'], ok: v => v.it.order, zh: v => [v.open.h, ['一', v.it.mw], v.it.h], end: '。',
    en: v => `${v.open.en} ${art(v.it.sg)}.`, bad: [v => [v.open.h, ['一'], v.it.h, [v.it.mw]]] },
];
const TMAP = Object.fromEntries(TPL.map(t => [t.id, t]));
function wrongMW(it) { return pick(MWS_ALL.filter(m => m !== it.mw && m !== '個')); }
const HOURS = []; [4, 5, 6, 7, 8, 9, 10, 11].forEach(n => { HOURS.push({ n, half: 0, h: [hourZh(n) + '點'] }); HOURS.push({ n, half: 1, h: [hourZh(n) + '點', '半'] }); });
const PRICES = () => { const lo = [5, 8, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95], hi = [100, 120, 150, 180, 200, 250, 300, 350, 400, 450, 500, 600, 800, 1000, 1200, 1500, 2000], top = [12000, 15000, 20000, 25000, 30000];
  return lo.concat(hi, top).map(n => ({ n, h: [n < 100 ? priceZh(n) : numZh(n)] })); };
const PRICE_RANGE = { 書: [100, 600], 筆: [10, 95], 衣服: [150, 2000], 花: [20, 95], 電腦: [12000, 30000], 桌子: [500, 2000], 椅子: [300, 1500], 蛋糕: [40, 95], 鞋子: [500, 2000],
  杯子: [50, 300], 錢包: [200, 1500], 書包: [300, 1500], 咖啡: [35, 95], 奶茶: [30, 75], 果汁: [30, 80], 水: [10, 25], 汽水: [20, 40], 牛肉麵: [60, 95] };
const priceOK = (it, n) => { const r = PRICE_RANGE[it.h[0]]; return !r || (n >= r[0] && n <= r[1]); };
const PR = PRICES();
const MNP = [{ h: ['好'] }, { h: ['快'] }, { h: ['漂亮'] }, { h: ['不錯'] }];
const poolOf = (name) => name === 'hr' ? HOURS : name === 'pr' ? PR : name === 'mn' ? MNP : POOLS[name];

/* ---- lesson level of a word: words a learner has met are always allowed */
const LIDX = { L0: 0, L1: 1, L2: 2, L3: 3, L4: 4, L5: 5, L6: 6 };
const wordLevel = h => { const w = H2W[h]; if (!w) return 0; const ls = w.ls.filter(l => l in LIDX).map(l => LIDX[l]); return ls.length ? Math.min(...ls) : (w.lv === 1 ? 3 : w.lv === 2 ? 5 : 0); };
const entryWords = e => [].concat(e.h || [], e.mw ? [e.mw] : []).filter(x => typeof x === 'string' && HAN.test(x));
function entryOK(e, maxL) {
  if (maxL == null) return true;
  return entryWords(e).every(h => { const w = H2W[h]; return !w || seen(w.k) || wordLevel(h) <= maxL; });
}

/* ---- fill a template */
function fillTpl(t, fixed = {}, o = {}) {
  const maxL = o.L != null ? LIDX[o.L] : null;
  for (let tries = 0; tries < 80; tries++) {
    const v = Object.assign({}, fixed);
    for (const s of t.sl) {
      if (v[s]) continue;
      let pool = poolOf(s).filter(e => entryOK(e, maxL));
      if (!pool.length) pool = poolOf(s);
      if (o.prefSeen && Math.random() < .7) { const sp = pool.filter(e => entryWords(e).every(h => { const w = H2W[h]; return !w || seen(w.k); })); if (sp.length) pool = sp; }
      v[s] = pick(pool);
    }
    try { if (t.ok(v)) return v; } catch (e) {}
  }
  return null;
}
function render(t, v) {
  const chunks = t.zh(v);
  const words = chunks.flat();
  const toks = mkToks(words, t.end);
  const keys = uniq(words.map(h => H2W[h] && H2W[h].k).filter(Boolean));
  const tiles = chunks.map(c => c.join(''));
  const zh = tiles.join('') + t.end;
  return { tid: t.id, t, v, chunks, tiles, toks, zh, en: tidy(t.en(v)), end: t.end, keys, g: t.g, L: t.L };
}
function altOrders(s) {
  const n = s.t.float || 0, out = new Set([s.tiles.join('')]);
  if (n) { const [first, ...rest] = s.tiles; for (let i = 1; i <= n; i++) out.add(rest.slice(0, i).join('') + first + rest.slice(i).join('')); }
  return [...out];
}
function genSent(tid, fixed, o = {}) { const t = TMAP[tid]; const v = fillTpl(t, fixed, o); return v ? render(t, v) : null; }
function genAny(o = {}) {
  let ts = TPL;
  if (o.L) ts = ts.filter(t => LIDX[t.L] <= LIDX[o.L]);
  if (o.onlyL) ts = ts.filter(t => t.L === o.onlyL);
  if (o.g) ts = ts.filter(t => t.g === o.g);
  if (o.need) ts = ts.filter(t => (t[o.need] || []).length);
  if (!ts.length) return null;
  for (let i = 0; i < 6; i++) { const s = genSent(pick(ts).id, {}, o); if (s) return s; }
  return null;
}
/* find a template + slot value that contains a given word, then build a sentence around it */
const SLOT_IDX = {};
TPL.forEach(t => t.sl.forEach(sl => (poolOf(sl) || []).forEach(e => entryWords(e).forEach(h => (SLOT_IDX[h] = SLOT_IDX[h] || []).push([t.id, sl, e])))));
['本', '枝', '件', '朵', '台', '張', '個', '雙', '杯', '瓶', '碗', '隻'].forEach(m => ITEM.filter(it => it.mw === m).forEach(it => ['buy', 'price', 'song', 'order', 'you', 'tai'].forEach(tid => { if (TMAP[tid].sl.includes('it')) (SLOT_IDX[m] = SLOT_IDX[m] || []).push([tid, 'it', it]); })));
const FW = ['想', '喜歡', '也', '都', '很', '會', '去', '最', '在', '有', '送', '覺得', '太', '了', '還是', '要', '每天', '買', '請', '給', '多少', '錢', '這', '有一點', '塊', '吧', '嗎', '不', '得', '每'];
TPL.forEach(t => { const v = fillTpl(t); if (!v) return; const words = new Set(t.zh(v).flat()); FW.forEach(h => { if (words.has(h)) (SLOT_IDX[h] = SLOT_IDX[h] || []).push([t.id, null, null]); }); });
function genFor(h, o = {}) {
  const opts = shuffle(SLOT_IDX[h] || []);
  for (const [tid, sl, e] of opts.slice(0, 8)) {
    if (o.L && LIDX[TMAP[tid].L] > LIDX[o.L] + 1) continue;
    const s = genSent(tid, sl ? { [sl]: e } : {}, o);
    if (s && s.chunks.flat().includes(h)) return s;
  }
  return null;
}
/* minimal pairs: change one slot, so the meaning changes a little */
function variants(s, n = 3) {
  const out = [], seenEn = new Set([s.en]), seenZh = new Set([s.zh]);
  const slots = shuffle(s.t.sl.slice());
  for (let round = 0; round < 3 && out.length < n; round++) for (const sl of slots) {
    if (out.length >= n) break;
    const pool = shuffle(poolOf(sl).filter(e => e !== s.v[sl]));
    for (const e of pool.slice(0, 8)) {
      const v = Object.assign({}, s.v, { [sl]: e });
      let ok = false; try { ok = s.t.ok(v); } catch (x) {}
      if (!ok) continue;
      const r = render(s.t, v);
      if (seenEn.has(r.en) || seenZh.has(r.zh)) continue;
      seenEn.add(r.en); seenZh.add(r.zh); out.push(r); break;
    }
  }
  return out;
}
function badVariants(s) {
  return uniq((s.t.bad || []).map(f => { try { const c = f(s.v); return c ? c.map(x => x.join('')).join('') + s.end : null; } catch (e) { return null; } }).filter(z => z && z !== s.zh));
}

/* ---- corpus of real sentences */
const SENTS = [];
LES.forEach(L => L.texts.forEach((tx, ti) => tx.lines.forEach(([sp, toks, en], li) => {
  const n = toks.filter(t => t[1]).length;
  if (en && n >= 3 && n <= 12 && !/[A-Z]：/.test(en)) SENTS.push({ id: `${L.id}-${ti}-${li}`, toks, en, L: L.id, src: 'text', zh: plainZh(toks) });
})));
Object.entries(G).forEach(([g, x]) => { if (x.later) return; x.ex.forEach(([toks, en], i) => SENTS.push({ id: `${g}-${i}`, toks, en, L: x.L, g, src: 'gram', zh: plainZh(toks) })); });
const SIDX = {};
SENTS.forEach(s => { s.keys = uniq(s.toks.map(t => H2W[t[0]] && H2W[t[0]].k).filter(Boolean)); s.keys.forEach(k => (SIDX[k] = SIDX[k] || []).push(s)); });
function corpusFor(k) { const a = SIDX[k] || []; const recent = new Set((S.recentS || []).slice(-30)); const fresh = a.filter(s => !recent.has(s.zh)); return pick(fresh.length ? fresh : a) || null; }
function noteSent(zh) { S.recentS = (S.recentS || []).concat(zh).slice(-60); }
/* sentence that uses word k: a new generated one most of the time, a real lesson sentence otherwise */
function sentFor(k, o = {}) {
  const w = W[k]; if (!w) return null;
  const preferGen = o.gen ?? Math.random() < .7;
  let s = preferGen ? genFor(w.h, o) : null;
  if (!s) { const c = corpusFor(k); if (c) return c; }
  if (!s) s = genFor(w.h, o);
  return s;
}

/* ---- sentence question makers */
const isGen = s => !!s.t;
const sentHTML = (toks, blankAt) => toks.map(([w, p], i) => i === blankAt ? '<span class="sblank">＿＿</span>' : p ? `<ruby class="tok" data-w="${esc(w)}">${esc(w)}<rt>${esc(phon(p))}</rt></ruby>` : `<span class="punct">${esc(w)}</span>`).join('');
const keysExcept = (s, k) => (s.keys || []).filter(x => x !== k);
function enDistractors(s, n) {
  if (isGen(s)) { const vs = variants(s, n).map(v => v.en); if (vs.length >= n) return vs; return vs.concat(sampleN(SENTS.filter(x => x.en !== s.en), n - vs.length).map(x => x.en)); }
  const pool = SENTS.filter(x => x.en !== s.en && x.zh !== s.zh);
  const near = pool.filter(x => x.L === s.L && Math.abs(x.en.length - s.en.length) < 25);
  return sampleN(near.length >= n ? near : pool, n).map(x => x.en);
}
function qSentRead(s, o = {}) {
  noteSent(s.zh);
  const ds = enDistractors(s, 3);
  return mcq({ kind: 'mc', cat: 'reading', qt: 'read', label: 'What does this sentence mean?', prompt: `<div class="qsent zh">${sentHTML(s.toks)}</div><button class="playbtn" data-say="${esc(s.zh)}" aria-label="Play">${IC.sound}</button>`,
    opts: [s.en, ...ds], ans: [0], explain: `<div class="zh">${sentHTML(s.toks)}</div>`, sayAfter: s.zh, k: o.k, sk: 'u', ks: keysExcept(s, o.k), g: s.g, sent: s });
}
function qSentHear(s, o = {}) {
  noteSent(s.zh);
  const ds = enDistractors(s, 3);
  return mcq({ kind: 'mc', cat: 'listen', qt: 'hear', label: 'Listen — what does it mean?', prompt: `<button class="btn big hearbtn" data-say="${esc(s.zh)}" aria-label="Play again">${IC.sound}</button><span class="small faint">Tap to hear it again${S.set.rate > .7 ? ' · try the slow speed in settings' : ''}</span>`,
    opts: [s.en, ...ds], ans: [0], explain: `<div class="zh">${sentHTML(s.toks)}</div>`, say: s.zh, k: o.k, sk: 'l', ks: keysExcept(s, o.k), g: s.g, sent: s });
}
function qSentPick(s, o = {}) {
  if (!isGen(s)) return null;
  noteSent(s.zh);
  const vs = variants(s, 3).map(v => v.zh); const bad = badVariants(s);
  const opts = uniq([s.zh, ...vs.slice(0, bad.length && Math.random() < .5 ? 2 : 3), ...(bad.length ? [pick(bad)] : [])]).slice(0, 4);
  if (opts.length < 3) return null;
  return mcq({ kind: 'mc', cat: 'usage', qt: 'pick', label: 'Which sentence says this?', prompt: `<div class="qen">${esc(s.en)}</div>`, opts, han: true, ans: [0],
    explain: `<div class="zh">${sentHTML(s.toks)}</div>`, sayAfter: s.zh, k: o.k, sk: 'u', ks: keysExcept(s, o.k), g: s.g, sent: s });
}
function qSentFix(s, o = {}) {
  if (!isGen(s)) return null;
  let bad = badVariants(s);
  for (let i = 0; i < 4 && bad.length < 2; i++) { const s2 = genSent(s.tid); if (s2) bad = uniq(bad.concat(badVariants(s2))); }
  if (!bad.length) return null;
  noteSent(s.zh);
  const gx = G[s.g];
  return mcq({ kind: 'mc', cat: 'grammar', qt: 'fix', label: 'Which sentence is correct?', prompt: `<div class="small muted">${esc(s.en)}</div>`, opts: [s.zh, ...sampleN(bad, 2)], han: true, ans: [0],
    explain: (gx ? `<div><b>${esc(gx.t)}</b></div><div class="han">${esc(gx.p)}</div>` : '') + `<div class="zh">${sentHTML(s.toks)}</div>`, sayAfter: s.zh, k: o.k, sk: 'u', ks: keysExcept(s, o.k), g: s.g,
    after: ok => s.g && gramAnswer(s.g, ok), sent: s });
}
function qSentBuild(s, o = {}) {
  let tiles, answers;
  if (isGen(s)) { tiles = s.tiles.slice(); answers = altOrders(s); }
  else {
    const t = s.toks.filter(x => x[1]).map(x => x[0]);
    if (t.length < 3 || t.length > 8) return null;
    tiles = t; answers = [t.join('')];
  }
  if (tiles.length < 3 || new Set(tiles).size !== tiles.length) return null;
  noteSent(s.zh);
  return { kind: 'order', cat: 'order', qt: 'build', label: 'Build the sentence', prompt: `<div class="qen">${esc(s.en)}</div>`, tiles, answers, end: isGen(s) ? s.end : (s.toks[s.toks.length - 1][1] ? '' : s.toks[s.toks.length - 1][0]),
    explain: '', k: o.k, sk: 'u', ks: keysExcept(s, o.k), g: s.g, after: ok => s.g && gramAnswer(s.g, ok), sent: s, tileHints: true };
}
/* a "crisp" blank: exactly which words are correct there, and words that are clearly wrong */
function bkInfo(s, b) {
  if (b[0] === 'mw') { const m = s.v.it.mw; return { h: m, type: 'mw', acc: x => x === m, wrong: MWS_ALL.filter(x => x !== m && x !== '個') }; }
  if (b[0] === 'it') {
    const it = s.v.it;
    const acc = x => { const e = ITEM.find(i => i.h[0] === x); if (!e || e.mw !== it.mw) return false; try { return !!s.t.ok(Object.assign({}, s.v, { it: e })); } catch (z) { return false; } };
    return { h: it.h[0], type: 'it', acc, wrong: ITEM.filter(i => i.mw !== it.mw).map(i => i.h[0]) };
  }
  if (b[0] === 'adj') return { h: s.v.adj.h[0], type: 'adj', acc: x => ADJP.some(e => e.h[0] === x), wrong: ['書', '杯', '去', '咖啡', '學校', '本', '在'] };
  return { h: b[1], type: 'fw', acc: x => b[2].includes(x), wrong: b[3] || [] };
}
function qSentCloze(s, h, o = {}) {
  const at = s.toks.findIndex(t => t[0] === h);
  if (at < 0 || s.toks.filter(t => t[0] === h).length !== 1) return null;
  if (s.toks.filter((t, i) => i !== at).map(t => t[0]).join('').includes(h)) return null;
  let wrong = [], crisp = false;
  if (isGen(s)) {
    const b = (s.t.bk || []).find(b => bkInfo(s, b).h === h);
    if (b) { const bi = bkInfo(s, b); crisp = true; wrong = bi.wrong.filter(x => !bi.acc(x)); }
    else {
      const sl = s.t.sl.find(sl => s.v[sl] && s.v[sl].h && s.v[sl].h.length === 1 && s.v[sl].h[0] === h);
      if (sl) wrong = poolOf(sl).filter(e => e.h.length === 1 && e.h[0] !== h).map(e => e.h[0]);
    }
  }
  wrong = uniq(wrong).filter(x => x !== h && !isSyn(x, h) && !s.toks.some(t => t[0] === x));
  const showEn = o.showEn !== false || !crisp || wrong.length < 3;
  if (wrong.length < 3) {
    const w0 = H2W[h]; const L0 = w0 && w0.ls[0];
    const extra = WL.filter(w => w.h !== h && HAN.test(w.h) && w.h.length === h.length && !isSyn(w.h, h) && (!L0 || w.ls.includes(L0)) && !s.zh.includes(w.h));
    wrong = wrong.concat(sampleN(extra, 6).map(w => w.h));
  }
  const ds = sampleN(uniq(wrong), 3);
  if (ds.length < 2) return null;
  noteSent(s.zh);
  return mcq({ kind: 'mc', cat: 'usage', qt: 'cloze', label: 'Which word fits?', prompt: `<div class="qsent zh">${sentHTML(s.toks, at)}</div>${showEn ? `<div class="small muted">${esc(s.en)}</div>` : '<div class="tiny faint">No English this time — read the whole sentence</div>'}`,
    opts: [h, ...ds], han: true, ans: [0], optK: [H2W[h] && H2W[h].k, ...ds.map(x => H2W[x] && H2W[x].k)], explain: `<div class="zh">${sentHTML(s.toks)}</div><div class="small">${esc(s.en)}</div>`,
    sayAfter: s.zh, k: o.k || (H2W[h] && H2W[h].k), sk: 'u', ks: keysExcept(s, o.k), g: s.g, sent: s, hard: !showEn });
}

/* ---- teacher-style word bank built from NEW sentences (like Part V of her test) */
function genBank(o = {}) {
  const n = o.n || 6;
  for (let attempt = 0; attempt < 14; attempt++) {
    const ts = shuffle(TPL.filter(t => (t.bk || []).length && (!o.L || LIDX[t.L] <= LIDX[o.L])));
    const rows = [], usedAns = new Set(), cnt = { mw: 0, it: 0, adj: 0, fw: 0 };
    const visOf = (s, h) => { const at = s.toks.findIndex(x => x[0] === h); return s.toks.filter((x, i) => i !== at).map(x => x[0]).join(''); };
    const cap = { mw: 2, it: 1, adj: 1, fw: 4 };
    const pref = shuffle((o.prefer || []).filter(k => W[k]));
    for (const t of ts) {
      if (rows.length >= n) break;
      let s = null;
      const pk = pref.find(k => (SLOT_IDX[W[k].h] || []).some(x => x[0] === t.id));
      if (pk) { const hit = (SLOT_IDX[W[pk].h] || []).find(x => x[0] === t.id); s = genSent(t.id, hit[1] ? { [hit[1]]: hit[2] } : {}, o); }
      if (!s) s = genSent(t.id, {}, o);
      if (!s) continue;
      for (const b of shuffle(t.bk.slice())) {
        const bi = bkInfo(s, b);
        if (cnt[bi.type] >= cap[bi.type] || usedAns.has(bi.h) || s.toks.filter(x => x[0] === bi.h).length !== 1) continue;
        if (rows.some(r => r.bi.acc(bi.h)) || rows.some(r => bi.acc(r.bi.h))) continue;
        const vis = visOf(s, bi.h);
        // no giveaways: this answer must not show up anywhere else, and no earlier answer may show up in this line
        if (vis.includes(bi.h) || [...usedAns].some(a => vis.includes(a)) || rows.some(r => r.vis.includes(bi.h))) continue;
        rows.push({ s, bi, vis }); usedAns.add(bi.h); cnt[bi.type]++;
        if (pk) pref.splice(pref.indexOf(pk), 1);
        break;
      }
    }
    if (rows.length < Math.min(n, 4)) continue;
    const accAny = x => rows.some(r => r.bi.acc(x));
    const dist = shuffle(uniq(rows.flatMap(r => r.bi.wrong)).filter(x => !usedAns.has(x) && !accAny(x)));
    const bank = shuffle(rows.map(r => r.bi.h).concat(dist.slice(0, n >= 6 ? 3 : 2)));
    const ans = rows.map(r => bank.filter(x => r.bi.acc(x)));
    const lines = rows.map((r, i) => {
      const at = r.s.toks.findIndex(x => x[0] === r.bi.h);
      return [String(i + 1), [[0, r.s.toks.slice(0, at)], [1, i], [0, r.s.toks.slice(at + 1)]].filter(p => p[0] === 1 || p[1].length)];
    });
    rows.forEach(r => noteSent(r.s.zh));
    return { id: 'gen', kind: 'gen', sec: o.sec || 'Choose the correct word for each sentence', bank, lines, ans, en: rows.map(r => r.s.en), keys: rows.map(r => H2W[r.bi.h] && H2W[r.bi.h].k), L: o.L || '' };
  }
  return null;
}
function genOrderQ(o = {}) {
  for (let i = 0; i < 10; i++) {
    const s = genAny(Object.assign({}, o));
    if (!s || s.tiles.length < 4 || s.tiles.length > 6 || new Set(s.tiles).size !== s.tiles.length) continue;
    noteSent(s.zh);
    return { t: s.tiles.slice(), a: altOrders(s), en: s.en, end: s.end, s };
  }
  return null;
}

function genBankQ(gb, o = {}) {
  return { kind: 'bank', cat: 'bank', label: (o.num || 'V.') + ' ' + gb.sec, bank: gb.bank.slice(), lines: gb.lines, ans: gb.ans, en: gb.en, prompt: o.prompt || '<div class="small muted">New sentences made from your lesson words — the same kind of question as your teacher\'s test.</div>' };
}
