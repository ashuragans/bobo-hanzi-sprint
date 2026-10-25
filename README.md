# 波波中文 · Bobo Hanzi Sprint

A game for learning Traditional Chinese: 時代華語 1, Lessons 1–6, the teacher's TOCFL vocabulary table (804 words),
writing practice, listening, and teacher-style tests, with an adaptive Smart review that notices what you still mix up.

It runs in any browser on a phone or a computer. Progress is saved in the browser. To move it to another device, use
**我的 Me → 存檔 Save → Copy backup code**, then **Restore** on the other device.

## Run it

The site is plain static files in `public/`. To preview it on your computer:

```bash
python -m http.server -d public 8765
# open http://localhost:8765
```

## Deploy (free)

1. Put this folder in a GitHub repository.
2. On vercel.com (Hobby plan), choose **Add New → Project**, import the repository and click **Deploy**.
   `vercel.json` already tells Vercel to serve `public/` with no build step.
3. From then on, every push to `main` updates the live site. Other branches get preview links.

## Change it

Open the repository in Claude Code (claude.ai/code) and describe the change. `CLAUDE.md` explains to Claude how the
project is built and tested, and which rules keep your saved progress safe.

To work on it yourself:

```bash
pip install -r scripts/requirements.txt
python scripts/build.py        # after editing content/
python scripts/assemble.py     # after editing src/
python tests/run_all.py --quick
```

## Credits

- Stroke data: [Hanzi Writer](https://hanziwriter.org) / hanzi-writer-data (Make Me a Hanzi; Arphic Public License).
- Pinyin: [pypinyin](https://github.com/mozillazg/python-pinyin).
- Course content follows 時代華語 1 and the class materials, for personal study.
