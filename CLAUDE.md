# CLAUDE.md — Bobo Hanzi Sprint

A game-style website (Duolingo-like, with 波波 the bubble-tea mascot) for one student learning **Traditional Chinese**
for a class test. It covers 時代華語 1 (Modern Chinese 1, Taiwan) **Lessons 1–6**, the class slides, the teacher's
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
python tests/run_all.py --quick                 # game flow + peeking + memory, phone and desktop (a few minutes)
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
src/                 app code, concatenated in numeric order (app1 … app13) into one script — order matters
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
                     Also the 短文填空 / 後半句 / 量詞填空 drills; teacherTest uses a generated passage or measure-word bank half the time
content/
  content.py         Lessons 1–3 (from the class slides), GRAMMAR, DRILLS, READING, ROUTINE, MNEMO
  content2.py        Lessons 4–6 (book word lists; L4–5 practice dialogues written for this site; L6 dialogues, words and exercises from the class slides), more grammar and drills
  content3.py        teacher-style tests: LAST_* = the earlier class test and MID_* = the midterm (do not change), BANKS, CLOZE, OPPOSITES, ORDERS, NEW_PICS, PIC,
                     STYLE_* = pools for the midterm-style generator (passages, second halves, dialogues, measure words, picture themes)
  vocab_tocfl.txt    the teacher's vocab table, `key|alts|pinyin|english`, exactly 804 lines of entries
  vocab_extra.txt    words from slides/book that are not in the table (same format)
  book1_raw.txt      lesson word lists from the book: `L#|word|pinyin|POS|english`
generated/data.js    window.DATA, built from content/ (committed so a src-only change needs no Python packages)
scripts/             build.py, assemble.py, make_icons.py (optional, redraws icons from the mascot)
tests/               Playwright tests + run_all.py
```

## Recipes

- **Add or fix a word:** edit `content/vocab_extra.txt` (never change the 804 lines of `vocab_tocfl.txt` unless the teacher's table changed). Then run `build.py`.
- **Add example sentences:** add `[zh, en]` pairs to `EXAMPLES` in `src/app11.js`. Then run `assemble.py`.
- **Add a midterm-style passage:** add to `STYLE_PASSAGES` in `content3.py`. Mark 14+ words that may become blanks as `[word]` (`[word|alt]` also accepts `alt`), and names as `{M}` `{M2}` `{F}` `{F2}`. build.py fails if a marked word shows up a second time anywhere in the passage (even inside another word) or inside a name. Only mark words that can't be swapped with another marked word, or list the swap as an `|alt`. Second halves and dialogues carry a group: a set never takes two of one group, so put every pair whose answer could also fit another one in the same group.
- **Add a teacher-style word bank or cloze set:** add to `BANKS`/`CLOZE` in `content3.py`, using `＿＿` for blanks. `ans` lists one answer, or a list of accepted answers, per blank. Then run `build.py`.
- **New question type:** write a generator that returns the same shape as its neighbours (`mcq(...)` in app4, or the session item kinds in app7). Register it where it should appear: `LADDER`/`qFor` in app9 for adaptive practice, or a node in `NODES` (app8) for the learning path.
- **Change difficulty or adaptivity:** see `learn()`, `dialStep()`, `qFor()`, `wordPriority()` in app9. Peeking at pinyin or meaning counts as half-knowing a word and fades over about 3 days (`peekScore`).
- **Review timing:** `schedule()` in app1 (learning steps `IV`, FSRS weights `FSW`, test-date cap). `wordPriority()` adds the predicted forgetting (`recallNow`).
- **Look-alikes:** build.py computes `DATA.look` from strokes.json (shape + shared components); app12 adds the student's own mix-ups (`S.cc`, recorded by `noteWordMix`) and the hand-picked `LOOK` sets in app4. Multiple-choice options keep their word keys in `optK`; `mcq()` shuffles both together.
- **Styling:** add classes in `style.css`, reuse tokens, and check 320 px phones (`tests/test_adaptive.py` sweeps 7 widths).

## Before you finish a change

1. Rebuild (`assemble.py` or `build.py`) with no errors.
2. Run `python tests/run_all.py --quick`. Run the full suite after layout or engine changes. If Playwright can't be installed in your environment, say so, and at least make sure `assemble.py` passed its syntax check.
3. Commit the source changes **and** the rebuilt `public/` files together, with a message that says what changed for the learner.

## Deploying

Vercel watches the GitHub repo. A push to `main` updates the live site in about a minute. A push to any other branch
(or a pull request) gets its own preview link, so the student can try a change before merging it.
