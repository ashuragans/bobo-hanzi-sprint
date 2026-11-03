/* ============================================================ 打字 TYPE THE PINYIN
   Flashcards where you type the pinyin of a word, tones included: from its characters (看字), from its sound (聽音) or from
   its meaning (看意思). Tones go in as numbers (ma3 → mǎ, v → ü) or with the tone keys; the marks appear as you type.
   Every answer feeds the learner model (tones & pinyin 's', listening 'l', recall 'r') and the memory schedule. A new word
   starts with a card you copy once; a wrong answer is typed again right away and comes back later in the session. Every
   answer shows the word in tone colours, its tone melody, the memory story, a sound clue from the character's parts
   (跑 has 包 bāo inside → pǎo) and an example sentence.
   S.ty[k] = [right in a row, right, answers, last typed] · S.tt[tone] = [right, total] · S.tc['3>2'] = tone 3 typed as 2
   S.set.ty = { deck, face, n, tones: 'strict' | 'loose' | 'none', and the settings in TY_SET } (defaults in defState, app1) */

/* ---- reading pinyin */
const PY_LET = 'a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü';
const PYU = {};
/* a word's pinyin → syllables [{ s: plain letters (ü as v), t: tone 1–5, b: starts a new written chunk }], null if it can't be read */
function pyUnits(p) {
  if (p in PYU) return PYU[p];
  const out = [];
  const chunks = String(p).toLowerCase().normalize('NFC').split(new RegExp(`[^${PY_LET}]+`)).filter(Boolean);
  for (const chunk of chunks) {
    let plain = ''; const tones = [];
    for (const ch of chunk) { const m = TM[ch]; if (m) { plain += m[0]; tones.push(m[1]); } else { plain += ch; tones.push(0); } }
    let segs = splitSyl(plain), er = false;
    if (!segs && plain.length > 1 && plain.endsWith('r')) { segs = splitSyl(plain.slice(0, -1)); er = !!segs; }
    if (!segs) return (PYU[p] = null);
    let i = 0;
    segs.forEach((sg, j) => {
      let t = 5; for (let x = i; x < i + sg.length; x++) if (tones[x]) t = tones[x];
      i += sg.length;
      out.push({ s: sg + (er && j === segs.length - 1 ? 'r' : ''), t, b: j === 0 && out.length > 0 });
    });
  }
  return (PYU[p] = out.length ? out : null);
}
const normJ = s => s.replace(/([jqxy])v/g, '$1u'); // ju = jü: both spellings count
const unmarkSyl = s => { let o = ''; for (const ch of String(s).toLowerCase()) { const m = TM[ch]; o += m ? m[0] : ch; } return o; };
const sylMark = u => markSyl(u.s, u.t);
const unitsStr = us => us.map((u, i) => (u.b && i ? ' ' : '') + sylMark(u)).join('');
/* what you typed → its letters and the tone you gave at each letter (a mark on a vowel, or a number after the syllable) */
function typedOf(str) {
  let plain = ''; const tone = {};
  for (const ch of String(str).toLowerCase().normalize('NFC').replace(/u:/g, 'v')) {
    const m = TM[ch];
    if (m) { if (m[1]) tone[plain.length] = m[1]; plain += m[0]; }
    else if (/[a-z]/.test(ch)) plain += ch;
    else if (/[0-5]/.test(ch) && plain) tone[plain.length - 1] = +ch || 5;
  }
  return { plain: normJ(plain), tone };
}
/* how many letters at the end of `plain` make one syllable (0 if none) */
function tySylLen(plain) {
  for (let L = Math.min(7, plain.length); L >= 1; L--) {
    const seg = normJ(plain.slice(-L));
    if (zySyl(seg) || (seg.length > 1 && seg !== 'er' && seg.endsWith('r') && zySyl(seg.slice(0, -1)))) return L;
  }
  return 0;
}
const retone = (seg, d) => { const p = unmarkSyl(seg); return d >= 1 && d <= 4 ? markSyl(p, d) : p.replace(/v/g, 'ü'); };
/* "fang1bian4" → "fāngbiàn", "lv4" → "lǜ"; returns [new text, new caret] */
function tyFix(v, caret) {
  let out = '', cur = caret;
  const tail = new RegExp(`[${PY_LET}]+$`, 'i');
  for (let i = 0; i < v.length; i++) {
    const ch = v[i];
    if (ch === ':' && /u$/i.test(out)) { out = out.slice(0, -1) + 'ü'; if (i < caret) cur--; continue; }
    if (ch === 'v' || ch === 'V') { out += 'ü'; continue; }
    if (/[0-5]/.test(ch)) {
      const m = out.match(tail), L = m ? tySylLen(unmarkSyl(m[0])) : 0;
      if (L) { out = out.slice(0, -L) + retone(out.slice(-L), +ch); if (i < caret) cur--; continue; }
    }
    out += ch;
  }
  return [out, Math.max(0, cur)];
}
/* split what you typed into syllables for the live preview: [[text, tone 0–5]] */
function typedSyls(str) {
  const T = typedOf(str);
  if (!T.plain) return [];
  let segs = splitSyl(T.plain);
  if (!segs && T.plain.length > 1 && T.plain.endsWith('r')) { const s2 = splitSyl(T.plain.slice(0, -1)); if (s2) { s2[s2.length - 1] += 'r'; segs = s2; } }
  if (!segs) return null;
  let i = 0;
  return segs.map(sg => { let t = 0; for (let x = i; x < i + sg.length; x++) if (T.tone[x]) t = T.tone[x]; i += sg.length; return [sg, t]; });
}

/* ---- how a character is read on this site (for neutral tones, sound clues and sound families) */
let CHR = null;
function chReadings() {
  if (CHR) return CHR;
  CHR = {};
  WL.forEach(w => {
    const cs = [...w.h], u = pyUnits(w.p); if (!u || u.length !== cs.length) return;
    cs.forEach((c, i) => { const r = CHR[c] || (CHR[c] = {}); const key = u[i].s + u[i].t; r[key] = (r[key] || 0) + (cs.length === 1 ? 3 : 1); });
  });
  return CHR;
}
/* the most common full-tone reading of a character: [plain, tone] */
function chFull(c, plain) {
  const r = chReadings()[c]; if (!r) return null;
  const best = Object.entries(r).filter(([k]) => !k.endsWith('5') && (!plain || k.slice(0, -1) === plain)).sort((a, b) => b[1] - a[1])[0];
  return best ? [best[0].slice(0, -1), +best[0].slice(-1)] : null;
}

/* ---- grading */
function tyCands(w, face) {
  const out = [], add = (x, p) => { const u = pyUnits(p); if (u && !out.some(o => o.p === p)) out.push({ w: x, p, units: u }); };
  add(w, w.p);
  if (DATA.bookpy && DATA.bookpy[w.h]) add(w, DATA.bookpy[w.h]); // the book's spelling counts too (舒服 shūfu)
  if (DATA.altpy && DATA.altpy[w.h]) add(w, DATA.altpy[w.h]);
  if (face === 'e') WL.forEach(o => { if (o !== w && o.lv !== 9 && HAN.test(o.h) && (isSyn(o.h, w.h) || sameMeaning(o, w))) add(o, o.p); });
  return out;
}
function tyGradeUnits(str, units, w, o = {}) {
  const T = typedOf(str), cs = [...w.h], al = units.length === cs.length;
  let tp = normJ(units.map(u => u.s).join(''));
  if (o.uu) { T.plain = T.plain.replace(/v/g, 'u'); tp = tp.replace(/v/g, 'u'); } // "u counts for ü": lu4 = lǜ (same length, so tone positions still line up)
  if (T.plain !== tp) {
    // which syllables you still got right: the ones your answer starts or ends with
    let pre = '', suf = '';
    const sOk = units.map(() => false);
    units.forEach((u, i) => { pre += normJ(u.s); if (T.plain.startsWith(pre)) sOk[i] = true; });
    for (let i = units.length - 1; i >= 0; i--) { suf = normJ(units[i].s) + suf; if (T.plain.endsWith(suf) && T.plain.length - suf.length >= 0) sOk[i] = true; }
    return { spell: false, toneOk: false, syl: units.map((u, i) => ({ s: u.s, t: u.t, u: 0, ok: false, sOk: sOk[i], c: al ? cs[i] : '' })), plain: T.plain, units };
  }
  let pos = 0;
  const syl = units.map((u, i) => {
    let ut = 0; for (let x = pos; x < pos + u.s.length; x++) if (T.tone[x]) ut = T.tone[x];
    pos += u.s.length;
    const c = al ? cs[i] : '';
    let ok = ut === u.t || (u.t === 5 && ut === 0), note = '';
    if (!ok && c === '一' && u.s === 'yi' && [1, 2, 4].includes(ut)) { ok = true; note = 'yi'; }
    if (!ok && c === '不' && u.s === 'bu' && [2, 4].includes(ut)) { ok = true; note = 'bu'; }
    if (!ok && u.t === 5 && ut >= 1 && ut <= 4 && c) { const f = chFull(c, u.s); if (f && f[1] === ut) { ok = true; note = 'light'; } }
    return { s: u.s, t: u.t, u: ut, ok, sOk: true, c, note };
  });
  return { spell: true, toneOk: syl.every(x => x.ok), syl, plain: T.plain, units };
}
/* one wrong, missing, extra or swapped letter */
function lev1(a, b) {
  if (a === b || Math.abs(a.length - b.length) > 1) return false;
  let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (a.length === b.length) return a.slice(i + 1) === b.slice(i + 1) || (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2));
  return a.length > b.length ? a.slice(i + 1) === b.slice(i) : a.slice(i) === b.slice(i + 1);
}
/* o = { tones: 'strict' (a wrong tone = almost) | 'loose' (only letters count) | 'none' (letters only), uu, typo }; true/false = strict/loose */
function tyGrade(str, w, face, o = {}) {
  if (typeof o === 'boolean') o = { tones: o ? 'strict' : 'loose' };
  const tones = o.tones || 'strict', cands = tyCands(w, face);
  let best = null;
  for (const c of cands) {
    const g = tyGradeUnits(str, c.units, c.w, o); g.cand = c;
    g.sc = g.spell ? (g.toneOk ? 3 : 2) : g.syl.filter(x => x.sOk).length / 10;
    if (!best || g.sc > best.sc) best = g;
    if (g.sc === 3) break;
  }
  best.ok = best.spell && (best.toneOk || tones !== 'strict');
  best.half = best.spell && !best.toneOk && tones === 'strict';
  if (!best.spell && o.typo && best.plain) { // a one-letter slip in a word of 5+ letters counts, with a note
    const c = cands.find(c => { const tp = normJ(c.units.map(u => u.s).join('')); return tp.length >= 5 && lev1(best.plain, o.uu ? tp.replace(/v/g, 'u') : tp); });
    if (c) { best = Object.assign(tyGradeUnits(str, c.units, c.w, o), { cand: c, ok: true, half: false, typo: true }); }
  }
  best.other = best.cand.w !== w;
  return best;
}
/* who can be typed: characters only, and pinyin we can read */
const tyTypable = w => w && HAN.test(w.h) && [...w.h].every(c => HAN.test(c)) && !!pyUnits(w.p);

/* ---- learner record for typing */
function tyNote(w, res, ok, assist, tones = 'strict') {
  const t = S.ty[w.k] || (S.ty[w.k] = [0, 0, 0, 0]);
  t[2]++; t[3] = Date.now();
  if (ok && !assist) { t[0]++; t[1]++; } else if (ok) t[1]++; else t[0] = res && res.half ? Math.min(t[0], 1) : 0;
  if (res && res.spell && !res.other && tones !== 'none') res.syl.filter(x => tones === 'strict' || x.u || x.t === 5).forEach(x => {
    const a = S.tt[x.t] || (S.tt[x.t] = [0, 0]); a[1]++; if (x.ok) a[0]++;
    if (!x.ok) { const key = x.t + '>' + (x.u || 0); S.tc[key] = Math.min(99, (S.tc[key] || 0) + 1); }
  });
}
/* 0 new · 1 learning · 2 getting there · 3 mastered */
function tyLevel(k) { const t = S.ty[k]; if (!t || !t[2]) return 0; if (t[0] >= 3 && recallNow(k) >= .75) return 3; return t[0] >= 1 ? 2 : 1; }
const TYL = [['新', 'New'], ['學', 'Learning'], ['熟', 'Getting there'], ['會', 'Mastered']];

/* ---- tone colours and melodies */
const TONE_EN = { 1: 'tone 1 (high and flat)', 2: 'tone 2 (rising)', 3: 'tone 3 (low dip)', 4: 'tone 4 (falling)', 5: 'the light tone', 0: 'no tone' };
const TONE_PATH = { 1: 'M4 5H24', 2: 'M4 14L24 4', 3: 'M4 12C8 22 16 22 24 7', 4: 'M4 4L24 20', 5: 'M12 13H16' };
function toneSVG(units, cls = '') {
  const n = units.length;
  return `<svg class="ty-cont ${cls}" viewBox="0 0 ${n * 28} 24" width="${n * 28}" height="24" aria-hidden="true">${units.map((u, i) => `<path d="${TONE_PATH[u.t] || TONE_PATH[5]}" transform="translate(${i * 28} 0)" class="ts${u.t}"/>`).join('')}</svg>`;
}
const tyPyHTML = units => units.map((u, i) => `${u.b && i ? ' ' : ''}<span class="tc${u.t}">${esc(sylMark(u))}</span>`).join('');
function tyHanHTML(w, units) {
  const cs = [...w.h];
  return cs.map((c, i) => `<span class="${units && units.length === cs.length ? 'tc' + units[i].t : ''}">${esc(c)}</span>`).join('');
}

/* ---- sound clues: a part that gives the character its sound */
const ZERO_F = { yi: 'i', ya: 'ia', ye: 'ie', yao: 'iao', you: 'iou', yan: 'ian', yin: 'in', yang: 'iang', ying: 'ing', yong: 'iong', yu: 'v', yue: 've', yuan: 'van', yun: 'vn',
  wu: 'u', wa: 'ua', wo: 'uo', wai: 'uai', wei: 'uei', wan: 'uan', wen: 'uen', wang: 'uang', weng: 'ueng' };
const RIME_CORE = new Set(['a', 'ao', 'an', 'ang', 'ou', 'ong', 'ai', 'ei', 'en', 'eng', 'o']);
const iniOf = s => INIS.find(i => s.startsWith(i)) || '';
function rimeOf(s) {
  s = normJ(s); if (s !== 'er' && s.length > 1 && s.endsWith('r')) s = s.slice(0, -1);
  let f = ZERO_F[s];
  if (!f) { const ini = iniOf(s); f = s.slice(ini.length); if ('jqx'.includes(ini) && ini && f[0] === 'u') f = 'v' + f.slice(1); f = { iu: 'iou', ui: 'uei', un: 'uen' }[f] || f; }
  if (f.length > 1 && 'iuv'.includes(f[0]) && RIME_CORE.has(f.slice(1))) f = f.slice(1);
  return f;
}
let PIDX = null;
const partsOf = c => MN[c] ? MN[c][0].split('+').map(x => x.trim().split(' ')[0]).filter(p => [...p].length === 1 && HAN.test(p) && p !== c) : [];
function partReading(p) { const r = (DATA.partpy || {})[p]; const u = r && pyUnits(r); if (u && u.length === 1) return u[0]; const f = chFull(p); return f ? { s: f[0], t: f[1] } : null; }
function soundClue(c, syl) {
  if (!syl) return null;
  for (const p of partsOf(c)) {
    const a = partReading(p); if (!a) continue;
    const same = normJ(a.s) === normJ(syl.s), rh = !same && rimeOf(a.s) === rimeOf(syl.s);
    if (!same && !rh) continue;
    if (!PIDX) { PIDX = {}; Object.keys(MN).forEach(ch => partsOf(ch).forEach(q => (PIDX[q] = PIDX[q] || []).push(ch))); }
    const fam = (PIDX[p] || []).filter(ch => ch !== c).map(ch => [ch, chFull(ch)]).filter(([, r]) => r && rimeOf(r[0]) === rimeOf(a.s)).slice(0, 4);
    return { p, r: markSyl(a.s, a.t), kind: same ? (a.t === syl.t ? 'exact' : 'same') : 'rhyme', fam };
  }
  return null;
}
function soundClueHTML(w, units) {
  const cs = [...w.h], al = units && units.length === cs.length;
  if (!al) return '';
  const rows = uniq(cs).map(c => { const i = cs.indexOf(c), cl = soundClue(c, units[i]); if (!cl) return '';
    const say = cl.kind === 'exact' ? 'sounds exactly like it' : cl.kind === 'same' ? 'sounds like it, with another tone' : 'rhymes with it';
    return `<div class="ty-clue"><b class="han">${esc(c)}</b><span>has <b class="han">${esc(cl.p)}</b> <i>${esc(cl.r)}</i> inside and ${say}: <b class="tc${units[i].t}">${esc(sylMark(units[i]))}</b>${cl.fam.length ? `<span class="ty-fam">Same sound family: ${cl.fam.map(([ch, r]) => `<b class="han">${esc(ch)}</b> ${esc(markSyl(r[0], r[1]))}`).join(' · ')}</span>` : ''}</span></div>`; }).join('');
  return rows ? `<div class="ty-clues"><span class="eyebrow">🔊 Sound clue</span>${rows}</div>` : '';
}

/* ---- tips after a mistake */
const TONE_PAIR_TIP = {
  '2-3': 'Tone 2 goes straight up, like asking “what?”. Tone 3 first sinks low, like a doubtful “uh-huh”. (Two 3rd tones in a row: you say the first like a 2, but it is still written 3.)',
  '1-4': 'Tone 1 stays high and flat, like singing “laaa”. Tone 4 drops hard, like a firm “No!”.',
  '1-2': 'Tone 1 starts high and stays there; tone 2 starts in the middle and climbs.',
  '3-4': 'Tone 3 is low and lazy; tone 4 starts high and falls fast.',
  '2-4': 'Tone 2 goes up ↗, tone 4 goes down ↘ — draw the line with your hand while you say it.',
  '1-3': 'Tone 1 is high and flat; tone 3 dips down to the bottom of your voice.' };
function toneTipsHTML(w, res, tones = 'strict') {
  if (tones === 'none') return '';
  const bad = res.syl.filter(x => !x.ok && (tones === 'strict' || x.u));
  if (!bad.length) return res.syl.some(x => x.note === 'yi' || x.note === 'bu') ? '<p class="small muted ty-tip">一 and 不 change their tone before other syllables (一定 yídìng, 不是 búshì) — both ways count.</p>' : '';
  const lines = bad.map(x => `<li><b class="han">${esc(x.c || '')}</b> <b class="tc${x.t}">${esc(markSyl(x.s, x.t))}</b> is ${TONE_EN[x.t]}${TONE_CUE[x.t] ? ` — ${TONE_CUE[x.t][1]}` : ''}. You typed ${x.u ? `<span class="tc${x.u}">${TONE_EN[x.u]}</span>` : 'no tone'}.</li>`);
  const miss = bad.filter(x => !x.u && x.t !== 5).length;
  const pair = bad.map(x => [x.t, x.u].sort().join('-')).find(k => TONE_PAIR_TIP[k]);
  const often = bad.map(x => [x, S.tc[x.t + '>' + x.u] || 0]).sort((a, b) => b[1] - a[1])[0];
  return `<div class="ty-tips-box"><span class="eyebrow">🎵 Tones</span><ul>${lines.join('')}</ul>
    ${miss ? '<p class="small">Add a tone number after each syllable: <b>fang1bian4</b> → <b>fāngbiàn</b>, or tap a tone key.</p>' : ''}
    ${pair ? `<p class="small">${TONE_PAIR_TIP[pair]}</p>` : ''}
    ${often && often[1] >= 3 && often[0].u ? `<p class="small ty-often">You have typed tone ${often[0].u} for tone ${often[0].t} ${often[1]} times — 波波 will give you more words with tone ${often[0].t}.</p>` : ''}</div>`;
}
function spellTipsHTML(res, typed) {
  const tips = new Set(), us = typedSyls(typed) || [], U = res.units;
  const pairs = us.length === U.length ? U.map((u, i) => [normJ(u.s), normJ(us[i][0])]) : [];
  pairs.forEach(([a, b]) => {
    if (a === b) return;
    const ia = iniOf(a), ib = iniOf(b), ra = a.slice(ia.length), rb = b.slice(ib.length);
    if (ia !== ib && [['zh', 'z'], ['ch', 'c'], ['sh', 's']].some(([x, y]) => (ia === x && ib === y) || (ia === y && ib === x))) tips.add('zh · ch · sh have an <b>h</b>: curl your tongue back (知 zhī, 吃 chī, 是 shì). z · c · s keep it flat behind your teeth (字 zì, 菜 cài, 四 sì).');
    if (ia === ib && (ra + 'g' === rb || rb + 'g' === ra)) tips.add('-n or -ng? <b>-n</b> ends with your tongue on your teeth (安 ān, 先 xiān); <b>-ng</b> ends at the back, like “song” (昂 áng, 星 xīng).');
    if (a.includes('v') && b === a.replace(/v/g, 'u')) tips.add('This one has <b>ü</b>: type <b>v</b> (綠 lǜ = lv4, 女 nǚ = nv3). After j, q, x and y the dots are left off (去 qù).');
    if (a.endsWith('r') && a.slice(0, -1) === b || b.endsWith('r') && b.slice(0, -1) === a) tips.add('This word ends with the 兒 <b>r</b> sound.');
    if ([['iu', 'iou'], ['ui', 'uei'], ['un', 'uen']].some(([x, y]) => ra === x && rb === y)) tips.add('<b>iu, ui, un</b> are short spellings of iou, uei, uen (六 liù, 對 duì, 春 chūn).');
    if (!ia && /^[iu]/.test(rb) && !ib) tips.add('Syllables that start with i or u are written with <b>y</b> or <b>w</b>: 一 yī, 有 yǒu, 五 wǔ, 我 wǒ.');
  });
  if (!tips.size) tips.add(`Say it slowly, one syllable at a time: ${U.map(u => `<b class="tc${u.t}">${esc(sylMark(u))}</b>`).join(' · ')}.`);
  return `<div class="ty-tips-box"><span class="eyebrow">✏️ Spelling</span>${[...tips].map(t => `<p class="small">${t}</p>`).join('')}</div>`;
}

/* ---- the answer card: the word in tone colours, its melody, meaning, sound clue, memory story, example */
function tyRevealHTML(w, o = {}) {
  const units = pyUnits(w.p), full = o.full !== false, ex = exampleFor(w), res = o.res;
  const cs = uniq([...w.h].filter(c => HAN.test(c) && (MN[c] || myStory(c))));
  const bp = DATA.bookpy && DATA.bookpy[w.h], bu = bp && bp !== w.p && pyUnits(bp);
  return `<div class="ty-rev ${o.cls || ''}">
    ${o.noHead ? '' : `<div class="ty-word"><div class="ty-han han">${tyHanHTML(w, units)}</div>
      <div class="ty-meta"><div class="ty-pyrow"><span class="ty-py">${units ? tyPyHTML(units) : esc(w.p)}</span>${units ? toneSVG(units) : ''}</div>
        ${S.set.ph === 'zy' ? `<div class="ty-zy han">${esc(toZhuyin(w.p))}</div>` : ''}
        <div class="ty-en">${w.em ? `<span class="ty-emo">${w.em}</span> ` : ''}${esc(w.e)}</div>
        <div class="ty-play"><button class="btn sm" data-say="${esc(w.h)}">${IC.sound}Listen</button><button class="btn sm ghost" data-tyslow="${esc(w.h)}">🐢 Slowly</button>${w.ls.length ? `<span class="tiny faint">${esc(w.ls.filter(l => LNAME[l]).map(l => LNAME[l]).join(' · '))}</span>` : ''}</div>
        ${bu ? `<div class="tiny muted">Your book writes it <b>${tyPyHTML(bu)}</b> — both count.</div>` : ''}</div></div>`}
    ${res && res.other ? `<p class="small ty-also">You typed <b class="han">${esc(res.cand.w.h)}</b> ${esc(res.cand.w.p)} — that means the same, so it counts. This card was <b class="han">${esc(w.h)}</b>.</p>` : ''}
    ${res && !res.ok && !res.spell ? spellTipsHTML(res, o.typed || '') : ''}${res && res.spell && !res.other ? toneTipsHTML(w, res, o.tones) : ''}${res && res.typo ? `<p class="small ty-also">Small typo: you typed <b>${esc(o.typed || '')}</b>. It's <b>${tyPyHTML(res.cand.units)}</b> — look at it once more.</p>` : ''}
    ${full ? soundClueHTML(w, units) : ''}
    ${full && cs.length ? `<div class="ty-mn"><span class="eyebrow">🧠 Memory trick</span>${cs.slice(0, 3).map(c => `<div class="tk-mrow"><b class="han">${esc(c)}</b><span>${MN[c] ? `<span class="tk-mparts">${esc(MN[c][0])}</span>` : ''}${myStory(c) ? `<span><b>Your story:</b> ${esc(myStory(c))}</span>` : ''}${MN[c] ? `<span>${esc(MN[c][1])}</span>` : ''}</span></div>`).join('')}
      <button class="btn sm ghost ty-mybtn" data-trickpop="${esc(w.k)}">✏️ Make up your own story</button></div>` : ''}
    ${ex ? `<div class="ty-ex"><div class="zh">${ruby(ex[0])}</div><div class="row" style="gap:8px"><button class="playbtn" style="margin:0" data-say="${esc(plainZh(ex[0]))}" aria-label="Play the sentence">${IC.sound}</button><span class="small muted">${esc(ex[1])}</span></div></div>` : ''}
  </div>`;
}
function bindReveal(root) {
  $$('[data-tyslow]', root).forEach(b => b.onclick = e => { e.stopPropagation(); speak(b.dataset.tyslow, .55); });
  $$('[data-trickpop]', root).forEach(b => b.onclick = e => { e.stopPropagation(); const w = W[b.dataset.trickpop]; if (!w) return;
    const m = modal(trickHTML(w, { edit: true, why: '' }), [['Done', 'primary', () => { closeModal(); const r = $('.ty-rev', root); if (r && RUN) r.outerHTML = tyRevealHTML(w, { full: true }); bindReveal(root); }]], 'trickm'); bindTrick(m); });
}

/* ---- typing settings: [key, label, [[value, text]], help, group]. On the 打字 page and behind ⚙️ on every card */
const TY_SET = [
  ['tones', 'Tones', [['strict', 'Type tones'], ['loose', 'Tones optional'], ['none', 'No tones']], 'Type tones: a wrong tone counts as “almost”. Tones optional: only the letters count, a tone you do type is still checked. No tones: type just the letters (fangbian) — the tone keys go away.', 'Typing'],
  ['live', 'Tone numbers', [[1, 'Turn into marks'], [0, 'Stay numbers']], 'ma3 becomes mǎ as you type, or stays ma3.', 'Typing'],
  ['keys', 'Tone keys under the box', [[1, 'Show'], [0, 'Hide']], 'The ā á ǎ à and ü keys.', 'Typing'],
  ['prev', 'Syllable preview', [[1, 'Show'], [0, 'Hide']], 'How 波波 reads what you typed, syllable by syllable, in tone colours.', 'Typing'],
  ['uu', 'u for ü', [[0, 'Type v or ü'], [1, 'u counts too']], 'With “u counts too”, lu4 is right for 綠 lǜ.', 'Typing'],
  ['typo', 'One-letter slips', [[0, 'Count as wrong'], [1, 'Forgive']], 'Forgive: one wrong, missing or swapped letter in a word of 5+ letters still counts (with a note).', 'Typing'],
  ['hints', 'Hint buttons', [[1, 'Show'], [0, 'Hide']], 'Hear it and 💡 Hint. “I don\'t know” is always there.', 'Help'],
  ['retype', 'After a mistake', [[1, 'Type it again'], [0, 'Just show it']], 'Typing the right answer once makes it stick.', 'Help'],
  ['say', 'Say the word after you answer', [[1, 'On'], [0, 'Off']], '', 'Flow'],
  ['auto', 'After a right answer', [[0, 'Wait for me'], [1, 'Next in 1 s'], [2, 'Next in 2.5 s']], 'Go on to the next card by itself.', 'Flow'],
  ['detail', 'Answer card when you are right', [['full', 'Everything'], ['short', 'Just the word']], 'Wrong answers always show the memory trick and tips.', 'Flow'],
  ['timer', 'Time for each card', [[0, 'No limit'], [20, '20 s'], [10, '10 s']], 'When time runs out, the card counts as wrong.', 'Challenge'],
  ['hearts', 'Hearts', [[0, 'Off'], [5, '5'], [3, '3']], 'Lose one for each mistake; at zero the session ends.', 'Challenge'],
  ['newN', 'New words in a session', [[-1, 'Auto'], [0, 'None'], [3, '3'], [5, '5'], [10, '10']], 'Auto: about a third of the cards, fewer while you find it hard.', 'Words'],
  ['n', 'Cards in a session', [[10, '10'], [15, '15'], [25, '25'], [40, '40']], '', 'Words']];
const tyDef = () => defState().set.ty;
/* the settings you changed from the defaults, as short words */
function tyCustomList() {
  const d = tyDef(), set = S.set.ty;
  return TY_SET.filter(([k]) => k !== 'n' && k !== 'tones' && String(set[k]) !== String(d[k])).map(([k, l, opts]) => { const o = opts.find(x => String(x[0]) === String(set[k])); return k === 'timer' ? `${set[k]} s a card` : k === 'hearts' ? `${set[k]} hearts` : k === 'newN' ? `${set[k] || 'no'} new words` : `${l}: ${o ? o[1].toLowerCase() : set[k]}`; });
}
function tySettings(onChange, inSession) {
  const set = S.set.ty, groups = uniq(TY_SET.map(x => x[4]));
  const d = drawer('⚙️ Typing settings', `${inSession ? '<p class="note small">Changes start with the next card (hearts, new words and the number of cards with the next session).</p>' : ''}
    ${groups.map(g => `<div class="ty-sgroup"><span class="eyebrow">${g}</span>${TY_SET.filter(x => x[4] === g).map(([k, l, opts, help]) => `<div class="field"><label>${esc(l)}</label>
      <div class="seg ty-sseg" data-tyset="${k}">${opts.map(([v, t]) => `<button data-v="${v}" aria-pressed="${String(set[k]) === String(v)}">${esc(t)}</button>`).join('')}</div>${help ? `<span class="small muted">${esc(help)}</span>` : ''}</div>`).join('')}</div>`).join('')}`,
    '<button class="btn" id="tyReset">Back to the default settings</button>');
  d.classList.add('ty-drawer');
  const bind = () => $$('[data-tyset]', d).forEach(sg => $$('button', sg).forEach(b => b.onclick = () => {
    const k = sg.dataset.tyset, num = typeof tyDef()[k] === 'number';
    set[k] = num ? +b.dataset.v : b.dataset.v; save(); sfx('tap');
    $$('button', sg).forEach(x => x.setAttribute('aria-pressed', x === b));
    if (onChange) onChange(k);
  }));
  bind();
  $('#tyReset', d).onclick = () => { const keep = { deck: set.deck, face: set.face }; Object.assign(set, tyDef(), keep); save(); closeDrawer(); toast('Typing settings are back to the defaults'); if (onChange) onChange('*'); };
  return d;
}

/* ---- one typing question */
const TY_FACE = { h: ['看字', 'Characters → pinyin'], a: ['聽音', 'Sound → pinyin'], e: ['看意思', 'Meaning → pinyin'], copy: ['新詞', 'New word'] };
function tyPromptHTML(w, face) {
  const n = [...w.h].length;
  if (face === 'h') return `<div class="ty-prompt"><div class="tzg ${n > 3 ? 'sm' : n > 2 ? 'md' : ''}">${[...w.h].map(c => `<span><i>${esc(c)}</i></span>`).join('')}</div></div>`;
  if (face === 'a') return `<div class="ty-prompt"><div class="row" style="justify-content:center;gap:12px"><button class="ty-hear" data-tyhear="1" aria-label="Play it again">${IC.sound}</button><button class="btn sm ghost" data-tyhear="slow">🐢 Slowly</button></div><span class="tiny faint">${n} syllable${n > 1 ? 's' : ''}</span></div>`;
  return `<div class="ty-prompt">${w.em ? `<div class="ty-bigemo">${w.em}</div>` : ''}<div class="qen">${esc(w.e)}</div><div class="ty-boxes" aria-label="${n} characters">${[...w.h].map(() => '<i></i>').join('')}</div></div>`;
}
function tyQ(w, face, o = {}) {
  if (face === 'a' && !ttsOK()) face = 'h';
  const q = { kind: 'type', qt: 'type', qtype: 'type', face, k: w.k, w, cat: 'pinyin', sk: face === 'a' ? 'l' : face === 'e' ? 'r' : 's', noPeek: true,
    label: `${TY_FACE[face][0]} · ${face === 'copy' ? 'New word — type it once' : face === 'a' ? 'Type what you hear' : face === 'e' ? 'Which word is it? Type its pinyin' : 'Type the pinyin'}`,
    prompt: face === 'copy' ? '' : tyPromptHTML(w, face), say: face === 'a' ? w.h : null };
  q.retry = () => tyQ(w, face === 'copy' ? 'h' : face, o);
  return q;
}
function tyFace(w, o = {}) {
  const f = o.face || 'mix';
  if (f !== 'mix') return f === 'a' && !ttsOK() ? 'h' : f;
  const v = wmOf(w.k), t = S.ty[w.k] || [0, 0, 0, 0], opts = [['h', 1.5 * (1.5 - v[3])]];
  if (ttsOK() && t[1] >= 1) opts.push(['a', 1.2 * (1.5 - v[2])]);
  if (t[1] >= 2 || stageOf(w.k) >= 3) opts.push(['e', 1.1 * (1.5 - v[1])]);
  let r = Math.random() * opts.reduce((a, b) => a + b[1], 0);
  for (const [x, wt] of opts) { r -= wt; if (r <= 0) return x; }
  return 'h';
}
const onEnter = f => e => { if (e.key !== 'Enter' || document.querySelector('.modal,.drawer')) return; e.preventDefault(); f(); };
/* the card itself, run inside runQuiz (app7): api = { R, cfg, practice, el, record, sheet, next, loseHeart, cta } */
function typeCard(body, q, api) {
  const w = q.w || W[q.k], R = api.R, copy = q.face === 'copy';
  const units = pyUnits(w.p), set = S.set.ty, tm = set.tones, noT = tm === 'none';
  const gopt = { tones: tm, uu: !!set.uu, typo: !!set.typo };
  const ansTxt = noT ? units.map((u, i) => (u.b && i ? ' ' : '') + u.s.replace(/v/g, 'ü')).join('') : unitsStr(units);
  const keyList = (set.keys ? (noT ? [] : [[1, 'ā'], [2, 'á'], [3, 'ǎ'], [4, 'à'], [5, 'a·']]) : []);
  body.innerHTML = `${copy ? `<div class="ty-copyhead"><div class="tzg ${units.length > 3 ? 'sm' : units.length > 2 ? 'md' : ''}">${[...w.h].map((c, i) => `<span><i class="${units.length === [...w.h].length ? 'tc' + units[i].t : ''}">${esc(c)}</i></span>`).join('')}</div>
      <div class="ty-pyrow"><span class="ty-py">${tyPyHTML(units)}</span>${toneSVG(units)}<button class="playbtn" style="margin:0" data-say="${esc(w.h)}" aria-label="Listen">${IC.sound}</button></div>
      <div class="ty-en">${w.em ? `<span class="ty-emo">${w.em}</span> ` : ''}${esc(w.e)}</div></div>` : ''}
    <form class="ty-form" id="tyForm" autocomplete="off" novalidate>
      <div class="ty-inwrap"><input id="tyIn" class="ty-in" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" enterkeyhint="go"
        aria-label="${noT ? 'Type the pinyin letters' : 'Type the pinyin'}" placeholder="${copy ? esc('Type it: ' + ansTxt) : noT ? 'Type the letters, e.g. nihao' : 'Type the pinyin, e.g. ni3hao3'}"><span class="ty-res" id="tyRes" aria-hidden="true"></span></div>
      ${set.timer && !copy ? `<div class="ty-timer" id="tyTimer" aria-hidden="true"><i style="animation-duration:${set.timer}s"></i></div>` : ''}
      <div class="ty-prev" id="tyPrev" aria-live="polite" ${set.prev ? '' : 'hidden'}></div>
      ${set.keys ? `<div class="ty-keys ${noT ? 'only-u' : ''}" role="group" aria-label="Tone keys">${keyList.map(([d, m]) => `<button type="button" class="tykey tk${d}" data-tone="${d}" aria-label="Tone ${d === 5 ? 'light' : d}"><b>${m}</b><span>${d === 5 ? 'light' : d}</span></button>`).join('')}<button type="button" class="tykey" data-ins="ü" aria-label="ü"><b>ü</b><span>v</span></button></div>` : ''}
      <div class="ty-tools" id="tyTools">${copy || !set.hints ? '' : `${q.face !== 'a' ? `<button type="button" class="btn sm ghost" data-tyh="hear">${IC.sound}Hear it</button>` : `<button type="button" class="btn sm ghost" data-tyh="chars">字 Show characters</button>`}
        <button type="button" class="btn sm ghost" data-tyh="hint">💡 Hint</button>`}${copy ? '' : `<button type="button" class="btn sm ghost" data-tyh="idk">I don't know</button>`}<button type="button" class="btn sm ghost ty-gear" id="tyGear" aria-label="Typing settings">⚙️</button></div>
      <div class="ty-hint" id="tyHint" hidden></div>
    </form><div id="tyRev">${copy ? tyRevealHTML(w, { full: true, noHead: true, cls: 'teach' }) : ''}</div>`;
  if (copy) bindReveal(body);
  const inp = $('#tyIn', body), prev = $('#tyPrev', body), resEl = $('#tyRes', body), cta = api.cta();
  let stage = copy ? 'copy' : 'ask', hint = 0, peeked = false, lastAct = 0, res = null, typed = '';
  cta.textContent = copy ? 'Type it ↑' : 'Check'; cta.disabled = true;
  const sk = $('#skip', api.el);
  if (copy && sk) { sk.hidden = false; sk.textContent = 'Skip'; sk.onclick = () => { stopSpeak(); api.next(); }; }
  const upd = () => {
    const v = inp.value.trim();
    const sy = typedSyls(v);
    prev.innerHTML = !v ? `<span class="tiny faint">${noT ? 'Letters only — no tones needed (fangbian)' : set.live ? 'Tones: add 1–4 after a syllable (ma3 → mǎ)' + (set.keys ? ' or tap a key' : '') : 'Tones: add 1–4 after each syllable (fang1bian4)'}</span>`
      : sy ? sy.map(([s, t]) => `<span class="ty-ps ${noT ? '' : t ? 'tc' + t : 'nt'}">${esc(t && !noT ? markSyl(s, t) : s.replace(/v/g, 'ü'))}</span>`).join('') + (!noT && tm === 'strict' && sy.some(x => !x[1]) && stage !== 'done' ? '<span class="tiny faint ty-nt">· no mark = light tone</span>' : '')
      : `<span class="small faint">${esc(v)}</span>`;
    if (stage === 'ask') cta.disabled = !v;
  };
  const fix = () => {
    let v = inp.value, c = inp.selectionStart ?? v.length;
    if (noT) { const b = v.slice(0, c).replace(/[0-5]/g, ''); v = b + v.slice(c).replace(/[0-5]/g, ''); c = b.length; } // no tones: numbers are just dropped
    if (set.live) [v, c] = tyFix(v, c);
    if (v !== inp.value) { inp.value = v; try { inp.setSelectionRange(c, c); } catch (e) {} }
    upd();
  };
  inp.addEventListener('input', e => { if (stage === 'done') { inp.value = typed; return; } if (!e.isComposing) fix(); });
  inp.addEventListener('compositionend', fix);
  const keyAct = b => {
    if (stage === 'done') return;
    const a = inp.selectionStart ?? inp.value.length, z = inp.selectionEnd ?? a;
    if (b.dataset.ins) { inp.value = inp.value.slice(0, a) + b.dataset.ins + inp.value.slice(z); try { inp.setSelectionRange(a + 1, a + 1); } catch (e) {} upd(); sfx('tap'); return; }
    const before = inp.value.slice(0, a), m = before.match(new RegExp(`[${PY_LET}]+$`, 'i'));
    if (!m || !tySylLen(unmarkSyl(m[0]))) { toast('Type a syllable first, then its tone'); return; }
    const [v, c2] = set.live ? tyFix(before + b.dataset.tone + inp.value.slice(z), a + 1) : [before + b.dataset.tone + inp.value.slice(z), a + 1];
    inp.value = v; try { inp.setSelectionRange(c2, c2); } catch (e) {} upd(); sfx('tap');
  };
  // tone keys keep the keyboard open: act on pointerdown and don't let the input lose focus
  $$('.tykey', body).forEach(b => {
    b.addEventListener('pointerdown', e => { e.preventDefault(); keyAct(b); });
    b.addEventListener('click', e => { if (e.detail === 0) keyAct(b); });
  });
  const peek = () => { if (!peeked) { peeked = true; notePeek(w.k, 'p'); } R.assist = true; };
  const showHint = () => {
    const h = $('#tyHint', body); h.hidden = false;
    h.innerHTML = hint === 1 ? `<span class="tiny faint">Starts with</span> ${units.map(u => `<b>${esc(u.s[0] === 'v' ? 'ü' : u.s[0])}</b>${'·'.repeat(Math.max(0, u.s.length - 1))}`).join(' ')}`
      : `<span class="tiny faint">${tm === 'strict' ? 'Letters (add the tones)' : 'Letters'}</span> ${units.map(u => `<b>${esc(u.s.replace(/v/g, 'ü'))}</b>`).join(' ')}`;
  };
  $$('[data-tyh]', body).forEach(b => b.onclick = () => {
    if (stage !== 'ask') return;
    const t = b.dataset.tyh;
    if (t === 'hear') { peek(); speak(w.h); b.classList.add('used'); }
    else if (t === 'chars') { peek(); const p = $('.qprompt .ty-prompt', api.el); if (p) p.insertAdjacentHTML('beforeend', `<div class="tzg sm">${[...w.h].map(c => `<span><i>${esc(c)}</i></span>`).join('')}</div>`); b.disabled = true; }
    else if (t === 'hint') { peek(); hint = Math.min(2, hint + 1); showHint(); if (hint >= 2) b.disabled = true; }
    else if (t === 'idk') { giveUp(); return; }
    inp.focus({ preventScroll: true });
  });
  $('#tyGear', body).onclick = () => { const d = tySettings(null, true); const x = $('.drawer-h .iconbtn', d); const back = () => setTimeout(() => { if (inp.isConnected) inp.focus({ preventScroll: true }); }, 30);
    x.addEventListener('click', back); const sc = $('.scrim'); if (sc) sc.addEventListener('click', back); };
  $$('[data-tyhear]', api.el).forEach(b => b.onclick = () => { speak(w.h, b.dataset.tyhear === 'slow' ? .55 : undefined); inp.focus({ preventScroll: true }); });
  const lock = () => { $$('.tykey,[data-tyh]', body).forEach(b => b.disabled = true); $$('[data-tyh]', body).forEach(b => b.hidden = true); const tb = $('#tyTimer', body); if (tb) tb.classList.add('stop'); };
  const reveal = (o2) => { const r = $('#tyRev', body); r.innerHTML = tyRevealHTML(w, o2); bindReveal(r); };
  const finishCopy = () => {
    stage = 'done'; typed = inp.value; inp.classList.add('ok'); resEl.textContent = '✓'; lock();
    if (!S.cards[w.k]) { S.cards[w.k] = [0, Date.now() + 60000, 0, 0]; questEvent('words'); }
    if (!S.ty[w.k]) S.ty[w.k] = [0, 0, 0, Date.now()];
    learn(w.k, 's', true, { assist: true, w: .5, noSrs: true, noStat: true });
    save(); sfx('ok'); if (set.say) speak(w.h);
    cta.textContent = 'Continue'; cta.disabled = false; cta.classList.remove('red'); cta.onclick = () => api.next();
    if (sk) sk.hidden = true;
    KEYH = onEnter(api.next);
  };
  // after a mistake: type the right answer once (it fixes the memory right away)
  const startRetype = () => {
    if (!set.retype) return;
    stage = 'retype'; inp.value = ''; inp.classList.remove('no', 'half'); resEl.textContent = '';
    inp.placeholder = 'Type it right once: ' + ansTxt;
    $$('.tykey', body).forEach(b => b.disabled = false);
    cta.textContent = 'Type it ↑'; cta.disabled = true;
    if (sk) { sk.hidden = false; sk.textContent = 'Skip'; sk.onclick = () => { stopSpeak(); api.next(); }; }
    upd(); setTimeout(() => inp.focus({ preventScroll: true }), 30);
    KEYH = onEnter(act);
  };
  const doneRetype = () => {
    stage = 'done'; typed = inp.value; inp.classList.add('ok'); resEl.textContent = '✓'; lock(); sfx('tap');
    cta.textContent = 'Continue'; cta.disabled = false; cta.onclick = () => api.next(); if (sk) sk.hidden = true;
    KEYH = onEnter(api.next);
  };
  const answer = (r, yours, why) => {
    res = r; typed = yours; stage = 'done';
    const assist = !!R.assist || !!r.typo, ok = r.ok;
    inp.classList.add(ok ? 'ok' : r.half ? 'half' : 'no'); resEl.textContent = ok ? '✓' : r.half ? '~' : '✗';
    lock();
    tyNote(w, r, ok, assist, tm);
    api.record(q, ok, yours || '—', false, { half: r.half, assist });
    if (!ok) api.loseHeart();
    reveal({ full: !ok || r.typo || set.detail !== 'short', res: r, typed: yours, tones: tm });
    const right = `<b class="ty-ans">${tyPyHTML(r.cand && !r.other ? r.cand.units : units)}</b>`;
    const badT = r.spell ? r.syl.filter(x => !x.ok && x.u).length : 0;
    const msg = ok ? (r.typo ? `Small typo — it's ${right}` : r.other ? 'Also right!' : r.toneOk || noT ? (noT ? `Tones: ${right}` : '') : badT ? 'Right letters — tones don\'t count, but check them below.' : `Tones: ${right}`)
      : why === 'time' ? `Time's up — it's ${right}` : r.half ? `Right letters, ${r.syl.filter(x => !x.ok).length > 1 ? 'some tones are' : 'one tone is'} off: ${right}` : `It's ${right}`;
    api.sheet(ok, q, msg ? `<div>${msg}</div>` : '', ok ? (r.typo ? ['好！', 'Almost perfect'] : null) : why === 'time' ? ['時間到！', 'Out of time'] : r.half ? ['差一點！', 'Check the tones'] : pick([['沒關係！', 'Here it is'], ['加油！', 'Now you know it']]));
    if (set.say) speak(w.h);
    if (!ok) startRetype(); else setTimeout(() => inp.focus({ preventScroll: true }), 30);
    if (ok && set.auto) setTimeout(() => { if (RUN === R && R.cur === q && stage === 'done' && !document.querySelector('.modal,.drawer')) api.next(); }, set.auto === 1 ? 1000 : 2500);
    if (ok && !assist && S.ty[w.k] && S.ty[w.k][0] === 3) setTimeout(() => toast(`🔒 ${w.h} — typed right 3 times in a row: mastered!`), 600);
  };
  const giveUp = why => {
    if (stage !== 'ask') return;
    if (why !== 'time') peek();
    const r = tyGrade(why === 'time' ? inp.value.trim() : '', w, q.face, gopt);
    if (why !== 'time' || !r.ok) { r.ok = false; r.half = false; r.typo = false; if (why !== 'time') r.spell = false; }
    answer(r, why === 'time' ? inp.value.trim() : '', why);
  };
  if (set.timer && !copy) setTimeout(() => { if (RUN === R && R.cur === q && stage === 'ask') giveUp('time'); }, set.timer * 1000);
  const act = () => {
    const now = Date.now(); if (now - lastAct < 60) return; lastAct = now; // the Enter key and the form's submit can both fire for one press
    const v = inp.value.trim();
    if (stage === 'ask') {
      if (!v) return;
      const r = tyGrade(v, w, q.face, gopt);
      answer(r, v);
    } else if (stage === 'copy' || stage === 'retype') {
      if (!v) return;
      const r = tyGrade(v, w, 'h', { tones: tm, uu: gopt.uu });
      if (r.ok && !r.other) return stage === 'copy' ? finishCopy() : doneRetype();
      inp.classList.remove('shake'); void inp.offsetWidth; inp.classList.add('shake'); sfx('no');
      const h = $('#tyHint', body); h.hidden = false; h.innerHTML = `<span class="tiny faint">Not yet — it's</span> <b>${noT ? esc(ansTxt) : tyPyHTML(units)}</b>${!r.spell ? '' : ' <span class="tiny faint">(check the tones)</span>'}`;
    } else api.next();
  };
  $('#tyForm', body).addEventListener('submit', e => { e.preventDefault(); act(); });
  cta.onclick = act;
  KEYH = onEnter(act);
  upd();
  setTimeout(() => { if (RUN === R && inp.isConnected) inp.focus({ preventScroll: true }); }, copy ? 60 : 30);
  if (copy && set.say) setTimeout(() => { if (RUN === R && R.cur === q) speak(w.h); }, 350);
}

/* ---- adaptive typing sessions */
function tyPriority(w) {
  const t = S.ty[w.k];
  let p = wordPriority(w);                                   // the memory model: due, fading, mistakes, mix-ups, peeks
  p += (3 - Math.min(3, t ? t[0] : 0)) * .35;                // not typed right 3× in a row yet
  if (t && t[2] && !t[0]) p += .5;                           // wrong the last time you typed it
  const u = pyUnits(w.p);                                    // the tones you mix up come up more
  if (u) p += Math.min(.8, u.reduce((a, x) => a + Object.entries(S.tc).filter(([k]) => +k[0] === x.t).reduce((b, [, n]) => b + n, 0), 0) * .03);
  if (t && Date.now() - t[3] < 4 * 60000) p -= 1;           // just typed it
  return p;
}
const tyNewN = n => clamp(Math.round(n / 3) + (dialLv() - 2), 1, 10); // new words a session teaches
function typeGen(words, o = {}) {
  const n = o.n || 15;
  const nNew = o.teach ?? (S.set.ty.newN >= 0 ? S.set.ty.newN : tyNewN(n));
  const teachQ = words.filter(w => !S.ty[w.k] && stageOf(w.k) <= 1).slice(0, nNew);
  const st = { asked: {}, last: [], pend: [], wrong: {}, tk: {} };
  const met = () => words.filter(w => S.ty[w.k] || S.cards[w.k]);
  const wrap = (q, w) => { if (q) q.after = ok => { if (!ok) st.wrong[w.k] = (st.wrong[w.k] || 0) + 1; }; return q; };
  return R => {
    const pi = st.pend.findIndex(x => x.at <= R.i);
    if (pi >= 0) return st.pend.splice(pi, 1)[0].q;
    const cand = met().filter(w => !st.last.slice(-3).includes(w.k) && !st.pend.some(x => x.k === w.k));
    if (teachQ.length && (R.i % 3 === 0 || cand.length < 2)) {
      const w = teachQ.shift(); st.last.push(w.k); st.asked[w.k] = 1;
      st.pend.push({ at: R.i + 2 + (Math.random() * 2 | 0), k: w.k, q: wrap(tyQ(w, 'h', o), w) });
      return tyQ(w, 'copy', o);
    }
    const list = (cand.length ? cand : met().length ? met() : words).map(w => [tyPriority(w) - (st.asked[w.k] || 0) * .5 + (st.wrong[w.k] || 0) * .4, w]).sort((a, b) => b[0] - a[0]);
    const w = list[0][1];
    st.asked[w.k] = (st.asked[w.k] || 0) + 1; st.last.push(w.k);
    if (!st.tk[w.k] && (hardScore(w.k) >= 2.5 || (st.wrong[w.k] || 0) >= 2)) {
      st.tk[w.k] = 1; st.pend.push({ at: R.i + 1, k: w.k, q: wrap(tyQ(w, tyFace(w, o), o), w) });
      const t = trickCard(w); t.label = '記憶法 · This one keeps slipping — here\'s a trick'; return t;
    }
    if ((o.face || 'mix') === 'mix' && R.i % 5 === 4 && avgSkill(w.k, 'm') < .6) { try { const q = qWord(w, 'mean', 2, words.length >= 8 ? words : WL.filter(x => x.lv !== 9)); if (q) return q; } catch (e) {} }
    return wrap(tyQ(w, tyFace(w, o), o), w);
  };
}
const TY_DECKS = [['L78', '第七、八課', 'Lessons 7–8'], ['L7', '第七課', 'Lesson 7'], ['L8', '第八課', 'Lesson 8'], ['L16', '第一～六課', 'Lessons 1–6'],
  ['MID', '期中考', 'Midterm words'], ['T1', '詞表 1', 'Vocab table 1'], ['T2', '詞表 2', 'Vocab table 2'], ['weak', '錯題', 'Weak words']];
/* the book's other spellings of a word get their own card in lesson decks (超級市場 next to 超市, 錶 next to 手錶);
   they share the word's key, so what you know about one counts for both */
const lettersOf = p => normJ(unmarkSyl(p).replace(/[^a-zv]/g, ''));
function tyVariants(ws) {
  const out = [];
  ws.forEach(w => (w.alt || '').split('/').forEach(a => {
    if (!a || a === w.h || ![...a].every(c => HAN.test(c)) || ws.some(x => x.h === a) || out.some(x => x.h === a)) return;
    const r = (DATA.bookpy || {})[a]; // only the book's own spellings
    if (!r || !pyUnits(r) || lettersOf(r) === lettersOf(w.p)) return; // 臺灣 / 台灣 sound the same: nothing new to type
    out.push(Object.assign(Object.create(w), { h: a, p: r, base: w }));
  }));
  return out;
}
function tyDeckWords(id) {
  let ws = id === 'L16' ? uniq(['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].flatMap(l => LMAP[l] ? LMAP[l].words : [])).map(k => W[k])
    : id === 'weak' ? WL.filter(w => isWeak(w.k) || (S.ty[w.k] && S.ty[w.k][2] && !S.ty[w.k][0])) : deckWords(id);
  ws = uniq(ws.filter(Boolean));
  if (/^L/.test(id)) ws = ws.concat(tyVariants(ws));
  return ws.filter(tyTypable);
}
function startType(o = {}) {
  const set = S.set.ty;
  const words = (o.words || tyDeckWords(o.deck || set.deck)).filter(tyTypable);
  if (!words.length) return toast(set.deck === 'weak' ? 'No weak words yet — words you miss show up here.' : 'No words in this deck.');
  const n = o.n || set.n, face = o.face || set.face;
  runQuiz({ title: '打字', adaptive: true, hearts: o.hearts ?? set.hearts, len: n, gen: typeGen(words, { n, face, teach: o.teach }), back: o.back || (() => go('type')),
    onDone: () => { const R = RUN; if (!R) return {}; const lk = uniq(R.log.filter(l => l.q.kind === 'type' && S.ty[l.q.k] && S.ty[l.q.k][0] >= 3).map(l => l.q.w.h));
      return lk.length ? { msg: `🔒 Mastered: ${lk.slice(0, 8).join('、')}` } : {}; } });
}

/* ---- the 打字 page */
function tyDeckStats(ws) {
  const lv = [0, 0, 0, 0]; ws.forEach(w => lv[tyLevel(w.k)]++);
  const fresh = ws.filter(w => !S.ty[w.k] && stageOf(w.k) <= 1).length, missed = ws.filter(w => S.ty[w.k] && S.ty[w.k][2] && !S.ty[w.k][0]).length;
  const dueN = ws.filter(w => S.ty[w.k] && due(w.k)).length;
  return { lv, fresh, missed, due: dueN, total: ws.length };
}
function vType(el, p = {}) {
  const set = S.set.ty;
  if (p.deck && TY_DECKS.some(d => d[0] === p.deck)) set.deck = p.deck;
  const deck = set.deck, words = tyDeckWords(deck), ds = tyDeckStats(words), filt = p.f || 'all';
  const dname = (TY_DECKS.find(d => d[0] === deck) || TY_DECKS[0]);
  const tones = [1, 2, 3, 4, 5].map(t => [t, S.tt[t] || [0, 0]]);
  const conf = Object.entries(S.tc).filter(([k, n]) => n >= 2 && +k.split('>')[1]).sort((a, b) => b[1] - a[1]).slice(0, 2);
  const weakTone = tones.filter(([t, a]) => a[1] >= 6 && t !== 5).map(([t, a]) => [t, a[0] / a[1]]).sort((a, b) => a[1] - b[1])[0];
  const shown = words.filter(w => filt === 'all' || (filt === 'new' ? tyLevel(w.k) === 0 : filt === 'learn' ? tyLevel(w.k) === 1 || tyLevel(w.k) === 2 : tyLevel(w.k) === 3));
  const pct = ds.total ? Math.round(ds.lv[3] / ds.total * 100) : 0;
  el.innerHTML = `<div class="stack ty-page">
    <div class="ty-hero">
      <div class="ty-hero-m" aria-hidden="true">${mascotSVG({ mood: 'cheer', size: 92 })}</div>
      <div class="ty-hero-t"><span class="eyebrow">打字 · Type the pinyin</span><h1>See it. Say it. Type it.</h1>
        <p class="muted">Type the pinyin of each word, tones and all: <b>ma3</b> turns into <b>mǎ</b> as you type.<span class="ty-more"> Or tap a tone key. 波波 brings back the words you miss, gives every word a memory trick and works on the tones you mix up.</span></p></div>
      <div class="ty-legend" aria-label="Tone colours">${[1, 2, 3, 4, 5].map(t => `<span class="ty-lg"><svg viewBox="0 0 28 24" width="28" height="24" aria-hidden="true"><path d="${TONE_PATH[t]}" class="ts${t}"/></svg><b class="tc${t}">${['', 'ā', 'á', 'ǎ', 'à', 'a'][t]}</b><span class="tiny">${['', 'high', 'rising', 'dip', 'falling', 'light'][t]}</span></span>`).join('')}</div>
    </div>
    <div class="card ty-setup">
      <div class="ty-step"><span class="ty-n">1</span><b>Words</b></div>
      <div class="deckbar">${TY_DECKS.map(([id, zh]) => { const ws = id === deck ? words : tyDeckWords(id); const m = ws.filter(w => tyLevel(w.k) === 3).length;
        return `<button class="chip" data-tydeck="${id}" aria-pressed="${id === deck}"><span class="han" style="font-size:1.05rem">${zh}</span><span class="n nums">${id === 'weak' ? ws.length : m + '/' + ws.length}</span></button>`; }).join('')}</div>
      <div class="ty-step"><span class="ty-n">2</span><b>How</b></div>
      <div class="ty-faces">${[['mix', '混合', 'Mix', 'Characters, sound and meaning — 波波 picks what each word needs'], ['h', '看字', 'Characters', 'See the characters, type the pinyin'],
        ['a', '聽音', 'Sound', 'Hear the word, type the pinyin'], ['e', '看意思', 'Meaning', 'See the meaning, type the word']].map(([v, zh, en, d]) =>
        `<button class="ty-face" data-tyface="${v}" aria-pressed="${set.face === v}"><span class="han">${zh}</span><b>${en}${v === 'mix' ? ' <i class="ty-rec">best</i>' : ''}</b><span class="tiny">${d}</span></button>`).join('')}</div>
      ${set.face === 'a' && !ttsOK() ? '<p class="note">This device has no Chinese voice, so 波波 will show the characters instead of playing the sound.</p>' : ''}
      <div class="ty-opts">
        <div class="ty-opt"><span class="tiny faint">Cards</span><div class="seg sm">${[10, 15, 25, 40].map(x => `<button data-tyn="${x}" aria-pressed="${set.n === x}">${x}</button>`).join('')}</div></div>
        <div class="ty-opt"><span class="tiny faint">Tones</span><div class="seg sm">${[['strict', 'Type tones'], ['loose', 'Optional'], ['none', 'No tones']].map(([v, l]) => `<button data-tyt="${v}" aria-pressed="${set.tones === v}">${l}</button>`).join('')}</div></div>
        <div class="ty-opt ty-optset"><span class="tiny faint">Everything else</span><button class="btn sm" id="tySet">⚙️ All typing settings</button></div>
      </div>
      <p class="small muted ty-tonenote">${set.tones === 'none' ? 'No tones: just type the letters (fangbian). Cards still show the tones in colour so you see them.' : set.tones === 'loose' ? 'Tones optional: the letters decide if you are right; a tone you type is still checked.' : 'Type tones: 1–4 after each syllable (fang1bian4) — a wrong tone counts as “almost”.'}</p>
      ${tyCustomList().length ? `<div class="ty-custom">${tyCustomList().map(x => `<span class="ty-cchip">${esc(x)}</span>`).join('')}</div>` : ''}
      <div class="ty-go"><button class="btn3d big" id="tyStart">${IC.play}開始 Start ${set.n} cards</button>
        <span class="small muted">${esc(dname[2])}: ${ds.fresh ? `<b>${Math.min(ds.fresh, tyNewN(set.n))}</b> new words, then ` : ''}${ds.missed ? `<b>${ds.missed}</b> you missed, ` : ''}${ds.due ? `<b>${ds.due}</b> due, ` : ''}the ones you need most first.</span>
        ${ds.missed >= 2 ? `<button class="btn3d sm red" id="tyMissed">🔥 Just the ${ds.missed} I missed</button>` : ''}</div>
    </div>
    <div class="grid2">
      <div class="card ty-prog"><h3>${esc(dname[1])} · ${esc(dname[2])}</h3>
        <div class="ty-ring"><svg viewBox="0 0 36 36" width="84" height="84" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="var(--jade)" stroke-width="4" stroke-linecap="round" stroke-dasharray="${(2 * Math.PI * 15 * pct / 100).toFixed(1)} ${(2 * Math.PI * 15).toFixed(1)}" transform="rotate(-90 18 18)"/></svg><b class="nums">${pct}%</b></div>
        <div class="ty-lvls">${[3, 2, 1, 0].map(i => `<div class="ty-lv l${i}"><span class="ty-dot l${i}"></span><span><b class="nums">${ds.lv[i]}</b> ${TYL[i][1].toLowerCase()}</span></div>`).join('')}</div>
        <p class="tiny faint">Mastered = typed right 3 times in a row, and still fresh in your memory.</p></div>
      <div class="card ty-tones"><h3>Your tones</h3>
        ${tones.some(([, a]) => a[1]) ? `<div class="ty-trows">${tones.map(([t, a]) => `<div class="ty-trow"><svg viewBox="0 0 28 24" width="28" height="24" aria-hidden="true"><path d="${TONE_PATH[t]}" class="ts${t}"/></svg><span class="tc${t} ty-tn">${t === 5 ? 'light' : 'tone ' + t}</span><div class="bar"><i style="width:${a[1] ? a[0] / a[1] * 100 : 0}%;background:var(--${['', 'sky', 'jade', 'gold', 'seal', 'ink-3'][t]})"></i></div><span class="nums small">${a[1] ? Math.round(a[0] / a[1] * 100) + '%' : '—'}</span></div>`).join('')}</div>
          ${conf.length ? `<p class="small">${conf.map(([k, n]) => { const [a, b] = k.split('>'); return `You typed <b class="tc${b}">tone ${b}</b> for <b class="tc${a}">${a === '5' ? 'the light tone' : 'tone ' + a}</b> ${n}×.`; }).join(' ')} ${TONE_PAIR_TIP[conf[0][0].split('>').sort().join('-')] || ''}</p>` : '<p class="small muted">No tone you keep mixing up. 好！</p>'}
          ${weakTone && weakTone[1] < .85 ? `<button class="btn3d sm" id="tyTone" data-t="${weakTone[0]}">Practise tone ${weakTone[0]} words</button>` : ''}`
        : '<p class="small muted">After a few cards you\'ll see here how well you know each tone, and which tones you mix up.</p>'}</div>
    </div>
    <div class="card"><div class="row" style="justify-content:space-between"><h3>Words in this deck</h3>
      <div class="seg sm" id="tyFilt">${[['all', 'All'], ['new', 'New'], ['learn', 'Learning'], ['done', 'Mastered']].map(([v, l]) => `<button data-f="${v}" aria-pressed="${filt === v}">${l}</button>`).join('')}</div></div>
      <p class="tiny faint" style="margin:6px 0 10px">Tap a word to see its card, hear it and practise just that word.</p>
      <div class="ty-grid">${shown.length ? shown.slice(0, p.all ? 9999 : 48).map((w, i) => { const l = tyLevel(w.k); return `<button class="ty-w l${l}" data-tyw="${i}" aria-label="${esc(w.h)} — ${TYL[l][1]}"><span class="han">${esc(w.h)}</span><span class="ty-dots">${[1, 2, 3].map(i => `<i class="${i <= l ? 'on' : ''}"></i>`).join('')}</span></button>`; }).join('') : '<p class="small muted">No words here yet.</p>'}</div>
      ${shown.length > 48 && !p.all ? `<button class="btn sm ghost" id="tyAll" style="margin-top:10px">Show all ${shown.length} words</button>` : ''}</div>
    <div class="card ty-howto"><h3>How to make a word stick</h3><div class="ty-tipgrid">
      <div><span class="ty-ti">🎨</span><span><b>See the tone colours.</b> Every word is shown in its tone colours — blue high, green rising, gold dip, red falling. Picture the character painted in its colour.</span></div>
      <div><span class="ty-ti">🗣️</span><span><b>Say it before you type it.</b> Saying the word out loud uses your memory for sound, then your fingers check it.</span></div>
      <div><span class="ty-ti">🔊</span><span><b>Find the sound part.</b> Many characters borrow the sound of one of their parts: 包 bāo → 跑 pǎo, 飽 bǎo. The card shows it when there is one.</span></div>
      <div><span class="ty-ti">🧠</span><span><b>Use the picture story</b> on each card, or make up your own — the sillier, the better it sticks.</span></div>
      <div><span class="ty-ti">✍️</span><span><b>Type it again after a mistake.</b> Fixing it right away is how the right version wins.</span></div>
      <div><span class="ty-ti">⏰</span><span><b>Little and often.</b> 波波 brings each word back just before you'd forget it — and everything once more before your test.</span></div></div></div>
  </div>`;
  $$('[data-tydeck]', el).forEach(b => b.onclick = () => { set.deck = b.dataset.tydeck; save(); go('type'); });
  $$('[data-tyface]', el).forEach(b => b.onclick = () => { set.face = b.dataset.tyface; save(); go('type', { f: filt }); });
  $$('[data-tyn]', el).forEach(b => b.onclick = () => { set.n = +b.dataset.tyn; save(); go('type', { f: filt }); });
  $$('[data-tyt]', el).forEach(b => b.onclick = () => { set.tones = b.dataset.tyt; save(); go('type', { f: filt }); });
  $('#tySet', el).onclick = () => tySettings(() => { const y = scrollY; go('type', { f: filt }); window.scrollTo(0, y); });
  $$('#tyFilt button', el).forEach(b => b.onclick = () => go('type', { f: b.dataset.f }));
  const ab = $('#tyAll', el); if (ab) ab.onclick = () => { const y = scrollY; go('type', { f: filt, all: 1 }); window.scrollTo(0, y); };
  $('#tyStart', el).onclick = () => startType();
  const mb = $('#tyMissed', el); if (mb) mb.onclick = () => startType({ words: words.filter(w => S.ty[w.k] && S.ty[w.k][2] && !S.ty[w.k][0]), teach: 0 });
  const tb = $('#tyTone', el); if (tb) tb.onclick = () => { const t = +tb.dataset.t; const ws = words.filter(w => S.ty[w.k] && (pyUnits(w.p) || []).some(u => u.t === t)); startType({ words: ws.length >= 4 ? ws : words.filter(w => (pyUnits(w.p) || []).some(u => u.t === t)), face: 'h', teach: 0 }); };
  $$('[data-tyw]', el).forEach(b => b.onclick = () => { const w = shown[+b.dataset.tyw]; if (!w) return;
    const m = modal(tyRevealHTML(w, { full: true }), [['Practise this word', 'primary', () => { closeModal(); startType({ words: [w], n: 4, face: 'mix', teach: S.ty[w.k] ? 0 : 1 }); }], ['Close', 'ghost', null]], 'trickm tym');
    bindReveal(m); });
}

/* keep a typing card above the phone keyboard: size the session to the part of the screen you can see */
(function () {
  const vv = window.visualViewport; if (!vv) return;
  const f = () => { const r = document.documentElement.style; r.setProperty('--vvh', vv.height + 'px'); r.setProperty('--vvt', vv.offsetTop + 'px'); document.body && document.body.classList.toggle('kbd', vv.height < window.innerHeight * .78); };
  vv.addEventListener('resize', f); vv.addEventListener('scroll', f); f();
})();
