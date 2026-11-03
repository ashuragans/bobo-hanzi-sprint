# CLAUDE.md — Bobo Hanzi Sprint

A game-style website (Duolingo-like, with 波波 the bubble-tea mascot) for one student learning **Traditional Chinese**
for a class test. It covers 時代華語 1 (Modern Chinese 1, Taiwan) **Lessons 1–8**, the class slides, the teacher's
**TOCFL vocabulary table (804 words, Level 1 = 1–401, Level 2 = 402–804)** and the teacher's test style: word banks,
put-in-order, measure words, opposites, cloze, picture matching and listening A/B/C.

The site is static. Vercel serves the `public/` folder as is. There is no server and no build on Vercel.

## Golden rules

1. **Never edit `public/index.html` or `generated/` by hand.** They are produced by the scripts. Change `src/` or `content/`, then rebuild.
2. **Always rebuild and commit the result.** After changing `src/`, run `python scripts/assemble.py`. After changing `content/`, run `python scripts/build.py` (it also assembles). Commit `public/index.html` (and `generated/data.js`, `public/strokes.json` if they changed). Vercel only serves what is committed.
3. **Never break saved progress.** Progress lives in the browser's localStorage under the key `hanzi-sprint-v1` (state object `S`, `src/app1.js`). Add new fields with a default in `defState()` and a repair line in `normalize()`. Never rename or remove fields, and never change `LS_KEY`. Backup codes (`HZS1:` + base64 JSON, Me → Save) must keep restoring.
4. **Keep the teacher's real tests exactly as written:** `LAST_BANKS`, `LAST_ORDERS`, `LAST_PICS` (the earlier test) and the `MID_*` sets (the midterm, reading part) in `content/content3.py`.
5. **No giveaways.** In word-bank and cloze sets, an answer must not appear anywhere else in the same set: not in another line, not in the prompt. The generator (`genBank`, `qSentCloze` in `src/app10.js`) enforces this. Hand-written sets in `content3.py` must follow it too.
6. **Works on phone and desktop with no overlaps** from 320 px to 1920 px wide, light and dark mode. Use the CSS tokens in `:root` (`src/style.css`) and never hard-code colours.
7. **Keep it working outside claude.ai.** `window.claude` (cloud sync, the 問老師 tutor) exists only when the page runs as a claude.ai artifact. Every use must stay guarded (`if (!window.claude || !window.claude.use) return;`).
8. Traditional characters only (台灣, 學, 這…), Taiwan usage and pinyin with tone marks.

## Commands

```bash
pip install -r scripts/requirements.txt         # pypinyin + numpy (only needed for build.py)
python scripts/build.py                         # content/ -> generated/data.js + public/strokes.json + public/index.html
python scripts/assemble.py                      # src/ + generated/data.js -> public/index.html (also runs `node --check`)
python scripts/assemble.py --artifact           # dist/artifact.html: single-file version for a claude.ai artifact

pip install -r tests/requirements.txt && python -m playwright install chromium   # once, for tests
python tests/run_all.py --quick                 # game flow + peeking + memory + learner record + memory tricks + typing, phone and desktop (~20 min)
python tests/run_all.py                         # everything, including the layout sweep at 7 widths (~20 min)

python -m http.server -d public 8765            # preview at http://localhost:8765
```

`build.py` asserts a lot (804 TOCFL entries, every lesson word known, every bank answer in its bank, order items use
the right characters). A failed assert means the content is wrong. Fix the content; don't remove the assert.

Stroke data for writing practice: `build.py` reuses `public/strokes.json`. If you add a word with a **new character**,
the build prints it as `missing:`. Run `npm install --no-save hanzi-writer-data@2.0.1` and build again. The
script reads `node_modules/hanzi-writer-data`.

The tests load Hanzi Writer from the jsdelivr CDN. Without internet, `npm install --no-save hanzi-writer@3.7.2` and the
tests will serve the local copy. Tests exit non-zero on any page error, console error or overlapping element.

## Layout

```
public/              what Vercel serves: index.html (generated), strokes.json (generated), icons, manifest
src/                 app code, concatenated in numeric order (app1 … app15) into one script — order matters
  shell.html         page skeleton (header, nav, containers); /*CSS*/ /*DATA*/ /*APP*/ are filled by assemble.py
  style.css          all styles; tokens in :root, dark mode under prefers-color-scheme and [data-theme]
  app1.js            data indexes (W words, H2W), state S (defState/normalize/save), cloud sync, spaced repetition (learning steps, then the FSRS-4.5
                     memory model: S.fs, schedule(), recallNow(); reviews never land after the day before S.testDate), pinyin/zhuyin helpers, speech
  app2.js            icons, views/router (go, renderAll), header HUD, word pop-up, settings, readiness, study plan
  app3.js            Today, Lessons, Grammar, Cards views; example sentences per word
  app4.js            question generators (vocab, clock, dates, prices, measure words, locations, look-alikes, radicals, reading…)
  app5.js            writing (Hanzi Writer, strokes.json), dictation, tutor (claude.ai only), init()
  app6.js            teacher-style tests: word banks, opposites, picture matching, order by number, listening A/B/C
  app7.js            session engine (runQuiz): hearts, streak, answer checking, word-bank UI with per-word peeking (拼 → 意), results screen
  app8.js            game layer: mascot (mascotSVG), levels, pearls, quests, achievements, learning path (UNITS/NODES), Me page, backup codes
  app9.js            adaptive learner model: six skills per word, stages 0–5, difficulty dial, mix-ups, peek tracking (notePeek/peekScore), Smart review
  app10.js           sentence engine: corpus (SENTS/SIDX) + 26 templates that generate new sentences, cloze, word banks, put-in-order
  app11.js           EXAMPLES: hand-written example sentences for verbs and lesson words; 字{pinyin} overrides a reading
  app12.js           look-alike characters (DATA.look from build.py + S.cc = pairs the student mixes up), "which character?" questions,
                     the 字形診所 mix-up clinic (contrast cards with the different strokes in red), who/when/where/what and choose-the-reply
                     questions, the midterm redo, the memory forecast on Stats
  app13.js           midterm-style tests: a NEW test in the midterm's format every time (midStyleTest: pictures, two passages with a word
                     bank, dialogues, measure-word bank, second halves), built from the STYLE_* pools; weak words are blanked first.
                     Also the 短文填空 / 後半句 / 量詞填空 drills; teacherTest uses a generated passage or measure-word bank half the time.
                     unitTest(['L7','L8']): the teacher's format on chosen lessons only (Tests page "第七、八課考試", FIN node); `UNIT` maps each
                     lesson to its halves/dialogue groups, picture sets, opposites and measure-word nouns — extend it for a new lesson
  app14.js           learner record: trackAnswer() records EVERY answer by question type (S.qs: right, total, peeked, time, last 20) and
                     grammar point (S.ga); sentence questions feed their least-known words to the word model; the 錯題本 mistake
                     notebook (S.miss, rebuilt by missQ from q.sig); peeking at answer choices (拼 → 意) and at any Chinese prompt
                     (tokPrompt); weakTypes() for Smart review; the coach (coachInsights: where to improve + a button to act on it)
  app15.js           記憶法 memory tricks: hardScore()/hardWords() pick the words you peek at, miss or mix up; trickCard() shows each
                     character's parts, picture story (MN), tone and your own story (S.myMn); startTricks() = card → check → check again
                     at the end. Shown after a wrong answer (trickMiniHTML), inside adaptive practice / Smart review (wordGen), on the
                     results screen, Practice (記憶法 tile), Stats, the coach and the word pop-up. S.mt[k] = [times shown, last, misses
                     then]: a word rests 20 h after its trick unless you miss it or peek at it again
  app16.js           打字 type the pinyin (its own tab, #type): flashcards where you type a word's pinyin with tones, from its characters,
                     its sound or its meaning. pyUnits() reads a word's pinyin, tyFix() turns tone numbers into marks as you type (ma3 → mǎ,
                     v → ü), tyGrade() checks an answer (right · almost = right letters, wrong tone · wrong; light tones, 一/不 tone changes,
                     the book's spelling DATA.bookpy and same-meaning words on meaning cards count). typeCard() is the card inside runQuiz
                     (kind 'type'); typeGen() = new word copied once, then the words that need it most, wrong ones typed again and brought
                     back, a trick card for words that keep slipping. tyRevealHTML(): tone colours (1 sky · 2 jade · 3 gold · 4 seal ·
                     light grey), tone melody, sound clue from the character's parts (DATA.partpy), memory story, example. Lesson decks also
                     get a card for the book's other spellings (tyVariants: 超級市場, 錶). S.ty[k] = [right in a row, right, answers, last],
                     S.tt = per-tone [right, total], S.tc['3>2'] = tone mix-ups, S.set.ty = the typing settings: deck, mode, cards,
                     tones (strict · loose · none = letters only), live tone marks, tone keys, preview, u for ü, one-letter slips,
                     hints, retype, say, auto-next, answer detail, time per card, hearts, new words. TY_SET lists them for the
                     settings drawer (tySettings, on the page and ⚙️ on every card); their defaults live in defState (app1)
content/
  content.py         Lessons 1–3 (from the class slides), GRAMMAR, DRILLS, READING, ROUTINE, MNEMO
  content2.py        Lessons 4–6 (book word lists; L4–5 practice dialogues written for this site; L6 dialogues, words and exercises from the class slides), more grammar and drills
  content4.py        Lesson 7 怎麼到飯店去？: the book's two dialogues + reading, practice dialogues from the class slides, 8 grammar points
                     (從/到, 怎麼去 + 坐/搭/騎/開車/走路, 了 new situation, V-O topic, 又…又…, 先…再…, 一定, 怎麼了), drills incl. the slides' fill-ins
  content5.py        Lesson 8 這條裙子真好看: the book's two dialogues + reading, practice texts from the slides and the book's classroom activities,
                     11 grammar points (好/難+V, 因為…所以…, 吧?, VV看, 快要…了, 真/真的, 怕, 以前/以後, 開/關, 時間, 對了/沒關係), the slides' clothes words
  content3.py        teacher-style tests: LAST_* = the earlier class test and MID_* = the midterm (do not change), BANKS, CLOZE, OPPOSITES, ORDERS, NEW_PICS, PIC,
                     STYLE_* = pools for the midterm-style generator (passages, second halves, dialogues, measure words, picture themes)
  vocab_tocfl.txt    the teacher's vocab table, `key|alts|pinyin|english`, exactly 804 lines of entries
  vocab_extra.txt    words from slides/book that are not in the table (same format)
  mnemonics.txt      `char|parts|story` memory stories, read before the MNEMO in content*.py so its story wins: picture stories that
                     replace the definition-only ones, and a story for every other character on the site (build.py fails if one is missing)
  book1_raw.txt      lesson word lists from the book: `L#|word|pinyin|POS|english` (where its pinyin differs from the table it becomes
                     DATA.bookpy, accepted in typing practice: 舒服 shūfu / shūfú)
generated/data.js    window.DATA, built from content/ (committed so a src-only change needs no Python packages)
scripts/             build.py, assemble.py, make_icons.py (optional, redraws icons from the mascot)
tests/               Playwright tests + run_all.py
```

## Recipes

- **Add a lesson:** a new `contentN.py` that does `LESSONS += [...]`, `GRAMMAR.update`, `DRILLS +=`, `READING +=`, `MNEMO +=` (see content4.py), imported in build.py after content2; the book's word list goes into `book1_raw.txt` (`L#|word|…`) and missing words into `vocab_extra.txt`. Then add the lesson id to `LIDX` (app10), `LNAME`/`LEN`/`DECKS` (app1), the Lessons groups (app3), `LORD` (build.py) and the study plan (app2); the learning-path unit is made from `LES` automatically. Give its grammar sentence templates in `TPL` (app10) so the site keeps generating new sentences with the new words, and add it to the teacher-test pools in content3.py.
- **Add or fix a word:** edit `content/vocab_extra.txt` (never change the 804 lines of `vocab_tocfl.txt` unless the teacher's table changed). Then run `build.py`.
- **Add example sentences:** add `[zh, en]` pairs to `EXAMPLES` in `src/app11.js`. Then run `assemble.py`.
- **Add a midterm-style passage:** add to `STYLE_PASSAGES` in `content3.py`. Mark 14+ words that may become blanks as `[word]` (`[word|alt]` also accepts `alt`), and names as `{M}` `{M2}` `{F}` `{F2}`. build.py fails if a marked word shows up a second time anywhere in the passage (even inside another word) or inside a name. Only mark words that can't be swapped with another marked word, or list the swap as an `|alt`. Second halves and dialogues carry a group: a set never takes two of one group, so put every pair whose answer could also fit another one in the same group.
- **Add a teacher-style word bank or cloze set:** add to `BANKS`/`CLOZE` in `content3.py`, using `＿＿` for blanks. `ans` lists one answer, or a list of accepted answers, per blank. Then run `build.py`.
- **New question type:** write a generator that returns the same shape as its neighbours (`mcq(...)` in app4, or the session item kinds in app7). Register it where it should appear: `LADDER`/`qFor` in app9 for adaptive practice, or a node in `NODES` (app8) for the learning path. Give it a `qt` (or `cat`) that `qtypeOf()` maps to an entry in `QTI` (app14) so its answers are recorded and the coach can advise on it; add a `TYPE_Q` generator so Smart review can practise it. If it comes from a fixed pool, set `q.sig` and teach `missQ()` to rebuild it, so misses go into the mistake notebook. Set `noPeek: true` where peeking would give the answer away (choices are already not peekable for listening and pinyin questions).
- **Change difficulty or adaptivity:** see `learn()`, `dialStep()`, `qFor()`, `wordPriority()` in app9. Peeking at pinyin or meaning counts as half-knowing a word and fades over about 3 days (`peekScore`). Smart review (`startSmart`) mixes in due mistakes (`missDue`), mix-ups, weak grammar (`weakGrammar`, by S.ga accuracy) and the weakest question types (`weakTypes`) every 2nd–3rd question.
- **Review timing:** `schedule()` in app1 (learning steps `IV`, FSRS weights `FSW`, test-date cap). `wordPriority()` adds the predicted forgetting (`recallNow`).
- **Memory stories:** every character needs one in `content/mnemonics.txt` or a `MNEMO` block (first one wins, mnemonics.txt is read first).
  A good story is a picture that ties the parts to the meaning ("a hungry beggar (乞) opens his mouth (口) wide: eat"), not a definition.
  Tune who gets a trick in `hardScore()` (app15) and the `hardScore(w.k) >= 2.5` line in `wordGen` (app9).
- **Look-alikes:** build.py computes `DATA.look` from strokes.json (shape + shared components); app12 adds the student's own mix-ups (`S.cc`, recorded by `noteWordMix`) and the hand-picked `LOOK` sets in app4. Multiple-choice options keep their word keys in `optK`; `mcq()` shuffles both together.
- **Typing settings:** add the default to `set.ty` in `defState()` (app1; normalize fills it in for old saves), a row to `TY_SET`
  (app16) and read it from `S.set.ty` in `typeCard()` when the card is shown, so a change from ⚙️ applies from the next card.
- **Typing practice:** a word is typable when all its characters are Han and `pyUnits()` reads its pinyin (test_type.py checks every
  lesson word). Change what counts as right in `tyGrade()`/`tyGradeUnits()`, the tips in `toneTipsHTML()`/`spellTipsHTML()`, how often
  a word comes back in `tyPriority()`, how many new words a session teaches in `tyNewN()`, and the decks in `TY_DECKS`/`tyDeckWords()` (app16).
- **Styling:** add classes in `style.css`, reuse tokens, and check 320 px phones (`tests/test_adaptive.py` sweeps 7 widths).

## Before you finish a change

1. Rebuild (`assemble.py` or `build.py`) with no errors.
2. Run `python tests/run_all.py --quick`. Run the full suite after layout or engine changes. If Playwright can't be installed in your environment, say so, and at least make sure `assemble.py` passed its syntax check.
3. Commit the source changes **and** the rebuilt `public/` files together, with a message that says what changed for the learner.

## Deploying

Vercel watches the GitHub repo. A push to `main` updates the live site in about a minute. A push to any other branch
(or a pull request) gets its own preview link, so the student can try a change before merging it.
