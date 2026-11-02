/* ============================================================ 記憶法 MEMORY TRICKS
   The words you keep peeking at or getting wrong get a memory trick card: what each character is made of, a picture
   story that ties its shape to its meaning, what the word means literally, how to say the tone, and room for your own
   story (S.myMn — a picture you make up yourself sticks best). Right after the card the word is asked again, and once
   more at the end of the session, so the picture turns into a memory. S.mt[k] = [times shown, last shown, times missed then]. */

/* ---- which words are hard for you: peeks, wrong answers, mix-ups and memory that is fading */
function hardScore(k) {
  const c = S.cards[k], p = S.pk[k], w = W[k];
  if (!w || (!c && !p)) return 0;
  let s = 0;
  if (p) s += (p[0] * .6 + p[1]) * Math.pow(.5, (Date.now() - p[2]) / 864e5 / 10); // peeks fade over ~10 days
  if (c) s += Math.min(4, c[3]) * .8 + (1 - recallNow(k)) * 1.5;                    // times you got it wrong + forgetting
  s += Object.values(S.conf[k] || {}).reduce((a, b) => a + b, 0) * .5;               // mixed up with another word
  if (stageOf(k) >= 4) s *= .4;
  const t = S.mt[k];                                                                  // just had its trick: it rests for 20 h,
  if (t && Date.now() - t[1] < 20 * 36e5 && (!c || c[3] <= (t[2] || 0)) && (!p || p[2] <= t[1])) s *= .15; // unless you missed it or peeked again since
  return s;
}
const hardWords = (n = 6) => WL.filter(w => w.lv !== 9 && HAN.test(w.h)).map(w => [hardScore(w.k), w]).filter(x => x[0] >= 1.2).sort((a, b) => b[0] - a[0]).slice(0, n).map(x => x[1]);
function whyHard(k) {
  const p = S.pk[k] || [0, 0], c = S.cards[k], conf = Object.entries(S.conf[k] || {}).sort((a, b) => b[1] - a[1])[0], out = [];
  const pk = Math.round(p[0] + p[1]); if (pk) out.push(`you peeked ${pk}×`);
  if (c && c[3]) out.push(`missed it ${c[3]}×`);
  if (conf && W[conf[0]]) out.push(`mixed it up with ${W[conf[0]].h}`);
  return out.join(' · ');
}

/* ---- the pieces of a trick */
const TONE_CUE = { 1: ['ˉ', 'high and flat — like singing “laaa”'], 2: ['ˊ', 'rising — like asking “what?”'], 3: ['ˇ', 'low dip — like a doubtful “uh-huh”'],
  4: ['ˋ', 'sharp fall — like a firm “No!”'], 5: ['˙', 'light and short'] };
function sylsOf(w) { try { const s = parsePy(w.p).flat(); return s.length === [...w.h].length ? s : null; } catch (e) { return null; } }
const charGloss = c => { const w = H2W[c]; return w && w.h === c ? shortEn(w.e) : ''; };
function partChips(c) {
  const m = MN[c]; if (!m) return '';
  return m[0].split('+').map(x => x.trim()).filter(Boolean).map(x => { const [zh, ...en] = x.split(' '); return `<span class="tk-part"><b class="han">${esc(zh)}</b>${en.length ? ' ' + esc(en.join(' ')) : ''}</span>`; }).join('<span class="tk-plus">+</span>');
}
const myStory = c => (S.myMn[c] || '').trim();
function trickCharHTML(c, syl, o = {}) {
  const m = MN[c], mine = myStory(c), t = syl ? TONE_CUE[syl[1]] || TONE_CUE[5] : null;
  return `<div class="tk-char"><div class="tk-c han">${esc(c)}</div><div class="tk-body">
    ${m ? `<div class="tk-parts">${partChips(c)}</div>` : ''}
    ${mine ? `<div class="tk-story mine"><b>Your story:</b> ${esc(mine)}</div>` : ''}
    ${m ? `<div class="tk-story">${esc(m[1])}</div>` : ''}
    ${t && !o.noTone ? `<div class="tk-tone"><span class="tk-tmark">${t[0]}</span><b>${esc(phon(syl[1] >= 1 && syl[1] <= 4 ? markSyl(syl[0], syl[1]) : syl[0]))}</b> — ${syl[1] >= 1 && syl[1] <= 4 ? 'tone ' + syl[1] : 'neutral tone'}: ${t[1]}</div>` : ''}
    ${o.edit ? `<div class="tk-mine"><button class="tk-minebtn" data-mine-open="${esc(c)}" aria-expanded="false">✏️ ${mine ? 'Change your story' : 'Make up your own story (it sticks best)'}</button>
      <div class="tk-mineed" data-mine-ed="${esc(c)}" hidden><textarea class="input" rows="2" maxlength="200" data-mine="${esc(c)}" placeholder="Picture it: what are the parts of ${esc(c)} doing together? The sillier, the better.">${esc(mine)}</textarea>
      <button class="btn3d sm" data-mine-save="${esc(c)}">Save my story</button></div></div>` : ''}
  </div></div>`;
}
function trickHTML(w, o = {}) {
  const cs = [...w.h], syl = sylsOf(w), gl = cs.map(charGloss), why = o.why ?? whyHard(w.k);
  const lit = cs.length > 1 && gl.filter(Boolean).length >= Math.min(2, cs.length) ? `<div class="tk-lit"><span class="small muted">Literally</span> ${cs.map((c, i) => `<b class="han">${esc(c)}</b> ${esc(gl[i] || '…')}`).join(' <span class="tk-plus">+</span> ')} <span class="tk-plus">→</span> <b>${esc(shortEn(w.e))}</b></div>` : '';
  return `<div class="trick">
    <div class="tk-word"><span class="tk-big han">${esc(w.h)}</span><div class="tk-wmeta"><div class="row" style="gap:8px"><span class="bigpy">${esc(phon(w.p))}</span><button class="playbtn" style="margin:0" data-say="${esc(w.h)}" aria-label="Play">${IC.sound}</button></div>
      <div class="tk-en">${w.em ? `<span class="tk-em">${w.em}</span> ` : ''}${esc(w.e)}</div>${why ? `<div class="tiny faint">Why this word: ${esc(why)}</div>` : ''}</div></div>
    ${lit}
    <div class="tk-chars">${uniq(cs).filter(c => HAN.test(c)).map(c => trickCharHTML(c, syl && syl[cs.indexOf(c)], o)).join('')}</div>
    <div class="tk-do"><b>Lock it in:</b> close your eyes, see the picture, then say <b class="han">${esc(w.h)}</b> out loud 3 times.</div></div>`;
}
function bindTrick(root) {
  $$('[data-mine-open]', root).forEach(b => b.onclick = e => {
    e.stopPropagation(); const ed = $(`[data-mine-ed="${CSS.escape(b.dataset.mineOpen)}"]`, root); if (!ed) return;
    ed.hidden = !ed.hidden; b.setAttribute('aria-expanded', String(!ed.hidden)); if (!ed.hidden) { const t = $('textarea', ed); if (t) t.focus({ preventScroll: true }); }
  });
  $$('[data-mine-save]', root).forEach(b => b.onclick = e => {
    e.stopPropagation(); const c = b.dataset.mineSave, ta = $(`textarea[data-mine="${CSS.escape(c)}"]`, root); if (!ta) return;
    const v = ta.value.trim().slice(0, 200); if (v) S.myMn[c] = v; else delete S.myMn[c];
    save(); sfx('coin'); toast(v ? `Saved — your story for ${c} now shows first everywhere.` : 'Your story was removed.');
  });
  $$('textarea[data-mine]', root).forEach(t => t.addEventListener('keydown', e => e.stopPropagation()));
}
/* a short version for the answer sheet after a wrong answer */
function trickMiniHTML(w) {
  if (!w || !HAN.test(w.h)) return '';
  const cs = uniq([...w.h].filter(c => HAN.test(c) && (MN[c] || myStory(c)))).slice(0, 2);
  if (!cs.length) return '';
  return `<div class="tk-mini"><span class="eyebrow">💡 Memory trick</span>${cs.map(c => `<div class="tk-mrow"><b class="han">${esc(c)}</b><span>${myStory(c) ? `<b>Your story:</b> ${esc(myStory(c))}` : `${MN[c] ? `<span class="tk-mparts">${esc(MN[c][0])}</span> — ${esc(MN[c][1])}` : ''}`}</span></div>`).join('')}</div>`;
}

/* ---- the trick card and the questions after it */
function trickCard(w, o = {}) {
  return { kind: 'teach', label: '記憶法 · Memory trick', say: w.h, k: w.k, trick: 1, html: trickHTML(w, Object.assign({ edit: true }, o)),
    onShow: body => { bindTrick(body); if (!S.cards[w.k]) S.cards[w.k] = [0, Date.now() + 60000, 0, 0]; const t = S.mt[w.k] || [0, 0, 0]; S.mt[w.k] = [t[0] + 1, Date.now(), S.cards[w.k][3]]; save(); } };
}
function trickCheck(w, round = 1) {
  try {
    if (round === 1) return qWord(w, 'recall', 3); // English → the characters, with look-alikes and your own mix-ups as wrong choices
    const q = qFor(w, { lvl: 3 }); return q && q.kind !== 'teach' ? q : qWord(w, 'mean', 3);
  } catch (e) { return null; }
}
function startTricks(ws, back) {
  ws = (ws && ws.length ? ws : hardWords(6)).filter(Boolean).slice(0, 6);
  if (!ws.length) return toast('No hard words yet — 波波 picks the words you peek at or get wrong. Keep practicing!');
  const qs = [];
  ws.forEach(w => { qs.push(trickCard(w)); const q = trickCheck(w, 1); if (q) qs.push(q); });
  shuffle(ws).forEach(w => { const q = trickCheck(w, 2); if (q) qs.push(q); });
  runQuiz({ title: '記憶法', adaptive: true, hearts: 0, qs, back: back || (() => go('practice')),
    onDone: () => { const R = RUN; const ok = ws.filter(w => R && R.log.filter(l => l.q.k === w.k).length && R.log.filter(l => l.q.k === w.k).every(l => l.ok));
      return ok.length ? { msg: `🔒 Locked in: ${ok.map(w => w.h).join('、')}` } : {}; } });
}

/* ---- the hardest words, for the Stats page */
function hardCardHTML() {
  const ws = hardWords(8);
  return `<div class="card"><h3>記憶法 Your hardest words</h3>${ws.length ? `<p class="small muted" style="margin:2px 0 8px">The words you peek at or miss most. Each one gets a memory trick card, then a quick check.</p>
    <div class="hardlist">${ws.map(w => `<button class="hardit" data-trick="${esc(w.k)}"><b class="han">${esc(w.h)}</b><span class="small">${esc(shortEn(w.e))}</span><span class="tiny faint">${esc(whyHard(w.k))}</span></button>`).join('')}</div>
    <button class="btn3d sm" id="trickGo" style="margin-top:10px">Learn them with memory tricks</button>` : '<p class="small muted">When you peek at a word again and again, or get it wrong, it shows up here with a memory trick to make it stick.</p>'}</div>`;
}
function bindHard(root, back) {
  $$('[data-trick]', root).forEach(b => b.onclick = () => { const w = W[b.dataset.trick]; if (w) showTrick(w); });
  const g = $('#trickGo', root); if (g) g.onclick = () => startTricks(null, back);
}
/* the full card in a pop-up (from the word pop-up and the hardest-words list) */
function showTrick(w) {
  closePop();
  const m = modal(trickHTML(w, { edit: true }), [['Practice this word', 'primary', () => { closeModal(); startTricks([w], () => go(CUR, PARAMS)); }], ['Close', 'ghost', null]], 'trickm');
  bindTrick(m);
}

/* ---- hub tile and drill */
DRILL_SETS.unshift({ id: 'tricks', zh: '記憶法', en: 'Memory tricks', d: 'The words you peek at or miss most: a picture story for every character, then a quick check.', start: back => startTricks(null, back) });
ACH.push(['tricks', '🧠', 'Memory master', 'Lock in 10 hard words with memory tricks', s => Object.keys(s.mt || {}).filter(k => W[k] && stageOf(k) >= 4).length >= 10, 40]);
