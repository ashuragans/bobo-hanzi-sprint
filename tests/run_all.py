# -*- coding: utf-8 -*-
"""Run the browser tests against public/index.html.

    python tests/run_all.py            all tests (game flow, adaptivity + layout sweep at 7 screen widths, peeking)
    python tests/run_all.py --quick    game flow + peeking only (about a minute)

Needs:  pip install -r tests/requirements.txt  and  python -m playwright install chromium
(skip the second command if Chromium for Playwright is already installed).
Screenshots go to tests/shots/ (not committed).
"""
import functools, http.server, os, subprocess, sys, threading, time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PORT = int(os.environ.get("TEST_PORT", "8765"))


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve():
    handler = functools.partial(Quiet, directory=os.path.join(ROOT, "public"))
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def main():
    quick = "--quick" in sys.argv
    tests = ["test_game.py", "test_peek.py"] if quick else ["test_game.py", "test_adaptive.py", "test_peek.py"]
    srv = serve()
    env = dict(os.environ, TEST_URL=f"http://127.0.0.1:{PORT}/index.html")
    failed = []
    for t in tests:
        t0 = time.time()
        print(f"\n=== {t} ===", flush=True)
        r = subprocess.run([sys.executable, os.path.join(HERE, t)], env=env)
        print(f"--- {t}: {'PASS' if r.returncode == 0 else 'FAIL'} ({time.time() - t0:.0f}s)", flush=True)
        if r.returncode:
            failed.append(t)
    srv.shutdown()
    print("\nALL PASSED" if not failed else f"\nFAILED: {', '.join(failed)}")
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
