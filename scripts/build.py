# -*- coding: utf-8 -*-
"""Build the app's data from content/.

    python scripts/build.py          content/ -> generated/data.js + public/strokes.json, then assembles public/index.html

Reads:  content/content*.py, content/vocab_tocfl.txt, content/vocab_extra.txt, content/book1_raw.txt
Writes: generated/data.js, generated/pinyin_diffs.txt, public/strokes.json (and public/index.html via assemble.py)

Stroke data for writing practice comes from the npm package hanzi-writer-data. If node_modules/hanzi-writer-data
is missing, the strokes already in public/strokes.json are reused; any new character without strokes is listed as
"missing" (install with: npm install --no-save hanzi-writer-data@2.0.1, then rebuild).
"""
import json, re, os, sys, unicodedata
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.join(ROOT, "content")
sys.path.insert(0, HERE)
import content2  # adds Lessons 4–6 to the shared lists
import content3
from content import LESSONS, PEOPLE, GRAMMAR, DRILLS, READING, ROUTINE, MNEMO
from pypinyin import pinyin as _py, Style

STROKE_DIR = os.environ.get("HWD_DIR") or os.path.join(ROOT, "node_modules", "hanzi-writer-data")
OLD_STROKES_FP = os.path.join(ROOT, "public", "strokes.json")
OLD_STROKES = json.load(open(OLD_STROKES_FP, encoding="utf-8")) if os.path.exists(OLD_STROKES_FP) else {}
GEN_DIR = os.path.join(ROOT, "generated")
os.makedirs(GEN_DIR, exist_ok=True)

def read_vocab(fn):
    out = []
    for line in open(os.path.join(HERE, fn), encoding="utf-8"):
        line = line.rstrip("\n")
        if not line or line.startswith("#"):
            continue
        k, alts, p, e = line.split("|")
        out.append(dict(k=k, alt=alts, p=p, e=e))
    return out

tocfl = read_vocab("vocab_tocfl.txt")
extra = read_vocab("vocab_extra.txt")
assert len(tocfl) == 804, len(tocfl)

EMOJI = dict(桌子="🪵", 椅子="🪑", 書="📖", 課本="📘", 紙="📄", 筆="🖊️", 杯子="🥤", 電腦="💻", 地圖="🗺️", 黑板="🧑‍🏫", 手機="📱",
 蘋果="🍎", 香蕉="🍌", 草莓="🍓", 番茄="🍅", 橘子="🍊", 西瓜="🍉", 芒果="🥭", 葡萄="🍇", 鳳梨="🍍", 啤酒="🍺", 汽水="🥤", 綠茶="🍵",
 紅茶="🫖", 果汁="🧃", 牛奶="🥛", 咖啡="☕", 紅酒="🍷", 珍珠奶茶="🧋", 奶茶="🧋", 花="🌸", 蛋="🥚", 雞蛋="🥚", 蛋糕="🎂", 禮物="🎁",
 生日禮物="🎁", 錢="💰", 衣服="👕", 鉛筆="✏️", 床="🛏️", 刷牙="🪥", 洗澡="🛁", 睡覺="😴", 電視="📺", 看電視="📺", 電話="☎️", 圖書館="📚",
 學校="🏫", 家="🏠", 回家="🏠", 山="⛰️", 小狗="🐶", 狗="🐶", 貓="🐱", 魚="🐟", 雞="🐔", 牛="🐮", 豬="🐷", 馬="🐴", 鳥="🐦", 火車="🚆",
 飛機="✈️", 公車="🚌", 巴士="🚌", 計程車="🚕", 腳踏車="🚲", 車子="🚗", 汽車="🚗", 雨="🌧️", 下雨="🌧️", 雪="❄️", 下雪="❄️", 熱="🥵", 冷="🥶",
 累="😩", 生日="🎂", 漢堡="🍔", 熱狗="🌭", 三明治="🥪", 冰淇淋="🍦", 餃子="🥟", 包子="🥟", 麵="🍜", 麵包="🍞", 可樂="🥤", 書包="🎒",
 背包="🎒", 眼鏡="👓", 帽子="🧢", 鞋子="👟", 褲子="👖", 裙子="👗", 外套="🧥", 大衣="🧥", 手錶="⌚", 足球="⚽", 籃球="🏀", 棒球="⚾",
 網球="🎾", 音樂="🎵", 醫院="🏥", 醫生="🧑‍⚕️", 藥="💊", 銀行="🏦", 郵局="🏤", 信="✉️", 樹="🌳", 草="🌿", 海="🌊", 紅色="🟥", 白色="⬜",
 黑色="⬛", 藍色="🟦", 黃色="🟨", 綠色="🟩", 橘色="🟧", 金色="🏅", 太陽="☀️", 月="🌙", 眼睛="👁️", 耳朵="👂", 鼻子="👃", 嘴巴="👄",
 手="✋", 腳="🦶", 頭="🙂", 臉="🙂", 心="❤️", 愛="❤️", 火="🔥", 水="💧", 水果="🍓", 茶="🍵", 酒="🍶", 肉="🥩", 菜="🥬", 青菜="🥬", 湯="🍲",
 飯="🍚", 吃飯="🍚", 筷子="🥢", 碗="🥣", 盤子="🍽️", 叉子="🍴", 刀子="🔪", 湯匙="🥄", 冰="🧊", 冰塊="🧊", 冰箱="🧊", 門="🚪", 燈="💡",
 電="⚡", 電梯="🛗", 樓梯="🪜", 房子="🏠", 公園="🏞️", 夜市="🏮", 生病="🤒", 感冒="🤧", 笑="😄", 哭="😢", 生氣="😠", 高興="😊", 開心="😊",
 快樂="😊", 跑步="🏃", 跑="🏃", 游泳="🏊", 跳舞="💃", 唱歌="🎤", 電影="🎬", 照相="📷", 相片="🖼️", 球="⚽", 糖="🍬", 點心="🍪", 甜點="🍰",
 鐘="🕐", 點="🕐", 時間="⏰", 起床="⏰", 字典="📕", 報紙="📰", 票="🎫", 信用卡="💳", 錢包="👛", 皮包="👜", 盒子="📦", 瓶子="🍾",
 女孩="👧", 小女孩="👧", 男孩="👦", 小孩="🧒", 孩子="🧒", 爸爸="👨", 媽媽="👩", 哥哥="👦", 弟弟="👦", 姊姊="👧", 妹妹="👧", 爺爺="👴", 奶奶="👵",
 老師="🧑‍🏫", 學生="🧑‍🎓", 做飯="🍳", 煮飯="🍳", 早餐="🥐", 午餐="🍱", 中飯="🍱", 晚餐="🍛", 上學="🏫", 放學="🎒", 去圖書館="📚",
 飲料="🥤", 牛肉麵="🍜", 巧克力="🍫", 咖啡廳="☕", 下午茶="🫖", 沙發="🛋️", 廚房="🍳", 電視機="📺", 曬太陽="😎", 海邊="🏖️",
 電影院="🎦", 畫畫="🎨", 夏天="☀️", 冬天="⛄", 春天="🌷", 秋天="🍂", 窗戶="🪟", 家具="🪑", 自行車="🚲", 客廳="🛋️", 房間="🛏️",
 台灣="🇹🇼", 美國="🇺🇸", 英國="🇬🇧", 日本="🇯🇵", 中國="🇨🇳", 德國="🇩🇪", 法國="🇫🇷", 韓國="🇰🇷", 越南="🇻🇳", 印尼="🇮🇩", 菲律賓="🇵🇭")

def disp(k):
    return re.sub(r"\d$", "", k)

# ------------------------------------------------ merge dictionary
D = {}       # key -> entry
order = []
for i, w in enumerate(tocfl):
    w["lv"] = 1 if i < 401 else 2
    w["n"] = i + 1
    w["ls"] = []
    D[w["k"]] = w; order.append(w["k"])
for w in extra:
    if w["k"] in D:
        continue
    w["lv"] = 0; w["n"] = 0; w["ls"] = []
    D[w["k"]] = w; order.append(w["k"])

# display hanzi -> key (first wins)
H2K = {}
for k in order:
    H2K.setdefault(disp(k), k)
    for a in D[k]["alt"].split("/"):
        if a and not re.search(r"\d", a):
            H2K.setdefault(a, k)

# book (時代華語 1) word lists, merged into each lesson
BOOK = {}
for line in open(os.path.join(HERE, 'book1_raw.txt'), encoding='utf-8'):
    Ln, h = line.split('|')[:2]
    BOOK.setdefault('L' + str(int(Ln[1:])), []).append(h)
for L in LESSONS:
    L['words'] = L['words'] + BOOK.get(L['id'], [])
# lesson tags
missing = []
for L in LESSONS:
    seen = set()
    words = []
    for k in L["words"]:
        k = k if k in D else H2K.get(k, k)
        if k in seen: continue
        seen.add(k)
        if k not in D:
            if L["id"] in BOOK and k in BOOK[L["id"]]: print("  (book word skipped)", L["id"], k); continue
            missing.append((L["id"], k)); continue
        D[k]["ls"].append(L["id"]); words.append(k)
    L["words"] = words
if missing:
    print("MISSING lesson words:", missing); sys.exit(1)

# ------------------------------------------------ pinyin check
TONE = {"ā":"a1","á":"a2","ǎ":"a3","à":"a4","ē":"e1","é":"e2","ě":"e3","è":"e4","ī":"i1","í":"i2","ǐ":"i3","ì":"i4",
        "ō":"o1","ó":"o2","ǒ":"o3","ò":"o4","ū":"u1","ú":"u2","ǔ":"u3","ù":"u4","ǖ":"ü1","ǘ":"ü2","ǚ":"ü3","ǜ":"ü4"}
def strip_tones(s):
    s = s.lower().replace("'", "").replace(" ", "")
    return "".join(TONE.get(c, c)[0] for c in s)
def ref_py(h):
    return "".join(x[0] for x in _py(h, style=Style.TONE, heteronym=False))

diffs = []
for k in order:
    w = D[k]
    h = disp(k)
    mine = w["p"].lower().replace("'", "").replace(" ", "")
    ref = ref_py(h).lower()
    if mine != ref:
        if strip_tones(mine) != strip_tones(ref):
            diffs.append(("LETTERS", h, w["p"], ref))
        else:
            diffs.append(("tone", h, w["p"], ref))
with open(os.path.join(GEN_DIR, "pinyin_diffs.txt"), "w", encoding="utf-8") as f:
    for d in diffs: f.write("\t".join(d) + "\n")
print("pinyin diffs:", len(diffs), " letter-level:", sum(1 for d in diffs if d[0]=="LETTERS"))

# ------------------------------------------------ sentence tokenizer with pinyin
NAMES = {"中明":"Zhōngmíng","友美":"Yǒuměi","宜文":"Yíwén","國安":"Guó'ān","小文":"Xiǎowén","小明":"Xiǎomíng","小美":"Xiǎoměi",
         "小林":"Xiǎolín","林中明":"Lín Zhōngmíng","林友美":"Lín Yǒuměi","張世娟":"Zhāng Shìjuān","世娟":"Shìjuān","李大華":"Lǐ Dàhuá",
         "王小姐":"Wáng xiǎojiě","王先生":"Wáng xiānshēng","林先生":"Lín xiānshēng","林太太":"Lín tàitai","林小姐":"Lín xiǎojiě",
         "王太太":"Wáng tàitai","王老師":"Wáng lǎoshī","您貴姓":"nín guìxìng","小華":"Xiǎohuá","大明":"Dàmíng","張小華":"Zhāng Xiǎohuá","安娜":"Ānnà","同學們":"tóngxuémen"}
PHRASES = {"十九":"shíjiǔ","二十":"èrshí","三十":"sānshí","四十":"sìshí","五十":"wǔshí","二十三":"èrshísān","二十五":"èrshíwǔ","十五":"shíwǔ",
           "四十五":"sìshíwǔ","二十八":"èrshíbā","一百":"yìbǎi","一千":"yìqiān","十二":"shí'èr","十分":"shí fēn","九月":"jiǔyuè","十月":"shíyuè",
           "七月":"qīyuè","二月":"èryuè","十二月":"shí'èryuè","三月":"sānyuè","不知道":"bù zhīdào","一個":"yí ge","兩個":"liǎng ge",
           "幾個":"jǐ ge","這個":"zhège","那個":"nàge","哪個":"nǎge","一下":"yíxià","喜不喜歡":"xǐ bù xǐhuān","要不要":"yào bú yào","好不好":"hǎo bù hǎo",
           "是不是":"shì bú shì","有沒有":"yǒu méi yǒu","忙不忙":"máng bù máng","累不累":"lèi bú lèi","熱不熱":"rè bú rè","懂不懂":"dǒng bù dǒng",
           "來不來":"lái bù lái","愛不愛":"ài bú ài","想不想":"xiǎng bù xiǎng","會不會":"huì bú huì","不是":"búshì","不要":"búyào","不在":"bú zài",
           "不去":"bú qù","不回家":"bù huíjiā","不很":"bù hěn","不太":"bú tài","不忙":"bù máng","不累":"bú lèi","不想":"bù xiǎng",
           "不喜歡":"bù xǐhuān","不漂亮":"bú piàoliàng","不好":"bù hǎo","不熱":"bú rè","很熱":"hěn rè","在家":"zài jiā","我家":"wǒ jiā",
           "她家":"tā jiā","你家":"nǐ jiā","去買":"qù mǎi","幾月幾號":"jǐ yuè jǐ hào","二十號":"èrshí hào","兩點":"liǎng diǎn","一點":"yì diǎn",
           "八點":"bā diǎn","九點":"jiǔ diǎn","四點":"sì diǎn","六點":"liù diǎn","七點":"qī diǎn","十點":"shí diǎn","十二點":"shí'èr diǎn",
           "十一點":"shíyī diǎn","三點":"sān diǎn","五點":"wǔ diǎn","七點半":"qī diǎn bàn","四點半":"sì diǎn bàn","一杯":"yì bēi","一本":"yì běn",
           "一枝":"yì zhī","一支":"yì zhī","一台":"yì tái","一朵":"yì duǒ","一件":"yí jiàn","一種":"yì zhǒng","一張":"yì zhāng","一天":"yì tiān",
           "一百元":"yìbǎi yuán","說得":"shuō de","跑得":"pǎo de","唱得":"chàng de","第二":"dì'èr","哪裡":"nǎlǐ","在哪裡":"zài nǎlǐ",
           "白色的":"báisè de","可愛的":"kě'ài de","好吃的":"hǎochī de","下課以後":"xiàkè yǐhòu","星期五":"xīngqíwǔ","星期日":"xīngqírì",
           "中文課本":"Zhōngwén kèběn","英文課本":"Yīngwén kèběn","洗手間":"xǐshǒujiān","大家":"dàjiā","不錯":"búcuò","很不錯":"hěn búcuò"}
ALT_PY = {"爸":"bà","杯":"bēi","鼻":"bí","常":"cháng","車":"chē","弟":"dì","哥":"gē","花兒":"huār","姐姐":"jiějie","姊":"jiě","姐":"jiě","筷":"kuài",
 "裏":"lǐ","裏面":"lǐmiàn","媽":"mā","妹":"mèi","哪兒":"nǎr","哪裏":"nǎlǐ","那裡":"nàlǐ","那裏":"nàlǐ","那兒":"nàr","唸":"niàn","旁":"páng","甚麼":"shénme",
 "事兒":"shìr","臺灣":"Táiwān","台灣人":"Táiwānrén","晚飯":"wǎnfàn","午飯":"wǔfàn","小孩子":"xiǎoháizi","鞋":"xié","星期日":"xīngqírì","共":"gòng",
 "一點點":"yìdiǎndiǎn","一點兒":"yìdiǎnr","衣":"yī","醫師":"yīshī","椅":"yǐ","應":"yīng","有一點":"yǒu yìdiǎn","有點兒":"yǒudiǎnr","有時":"yǒushí",
 "早飯":"zǎofàn","這裡":"zhèlǐ","這裏":"zhèlǐ","這兒":"zhèr","周末":"zhōumò","桌":"zhuō","嘴":"zuǐ","比方":"bǐfāng","較":"jiào","伯":"bó","部份":"bùfèn",
 "叉":"chā","超級市場":"chāojí shìchǎng","窗戶":"chuānghù","窗子":"chuāngzi","春":"chūn","刀":"dāo","冬":"dōng","肚":"dù","剛":"gāng","盒":"hé","餃":"jiǎo",
 "計劃":"jìhuà","褲":"kù","老板":"lǎobǎn","聊":"liáo","帽":"mào","念書":"niànshū","盤":"pán","瓶":"píng","其它":"qítā","秋":"qiū","裙":"qún","手表":"shǒubiǎo",
 "錶":"biǎo","表":"biǎo","叔":"shú","雖":"suī","臺":"tái","髮":"fǎ","味":"wèi","屋":"wū","夏":"xià","照片":"zhàopiàn","需":"xū","一會兒":"yìhuǐr",
 "一塊兒":"yíkuàir","一下":"yíxià","語":"yǔ","總":"zǒng","妳好":"nǐ hǎo","沒有空":"méiyǒu kòng","晒太陽":"shài tàiyáng","有一點兒":"yǒu yìdiǎnr","點兒":"diǎnr"}
LEX = {}
for k in order:
    w = D[k]
    LEX.setdefault(disp(k), w["p"])
    for a in w["alt"].split("/"):
        if a and not re.search(r"\d", a):
            LEX.setdefault(a, ALT_PY.get(a, w["p"]))
LEX.update(ALT_PY)
LEX.update(PHRASES); LEX.update(NAMES)
LEX["哪"] = "nǎ"; LEX["得"] = "de"; LEX["地"] = "dì"; LEX["了"] = "le"; LEX["長"] = "cháng"; LEX["還"] = "hái"; LEX["行"] = "xíng"
LEX["著"] = "zhe"; LEX["個"] = "ge"; LEX["一"] = "yī"; LEX["不"] = "bù"; LEX["喝"] = "hē"; LEX["種"] = "zhǒng"
MAXL = max(len(x) for x in LEX)
HAN = re.compile(r"[一-鿿]")

def tone_of(syl):
    for c in syl:
        if c in TONE: return int(TONE[c][1])
    return 5

def tokenize(s):
    toks = []
    i = 0
    while i < len(s):
        ch = s[i]
        if not HAN.match(ch):
            # group consecutive non-han
            j = i
            while j < len(s) and not HAN.match(s[j]): j += 1
            toks.append([s[i:j], ""]); i = j; continue
        for L in range(min(MAXL, len(s) - i), 0, -1):
            seg = s[i:i+L]
            if seg in LEX:
                toks.append([seg, LEX[seg]]); i += L; break
        else:
            toks.append([ch, ref_py(ch)]); i += 1
    # sandhi for standalone 一 / 不
    for idx, (w, p) in enumerate(toks):
        if w in ("一", "不") and p in ("yī", "bù"):
            nxt = None
            for t in toks[idx+1:]:
                if t[1]: nxt = t[1].split(" ")[0]; break
                if t[0].strip(): break
            prev = toks[idx-1][0] if idx > 0 else ""
            if nxt is None: continue
            t = tone_of(nxt)
            if w == "不":
                toks[idx][1] = "bú" if t == 4 else "bù"
            else:
                if prev.endswith(("十", "第", "期")): continue
                toks[idx][1] = "yí" if t == 4 else "yì"
    return toks

def tk(s): return tokenize(s)

# ------------------------------------------------ assemble output data
lessons_out = []
for L in LESSONS:
    texts = []
    for T in L["texts"]:
        texts.append({"title": T["title"], "note": T.get("note", ""),
                      "lines": [[sp, tk(zh), en] for sp, zh, en in T["lines"]]})
    lessons_out.append({"id": L["id"], "num": L["num"], "name": L["name"], "nameT": tk(L["name"]), "en": L["en"], "src": L["src"],
                        "words": L["words"], "texts": texts, "grammar": L["grammar"]})

g_out = {}
gl = {}
for L in LESSONS:
    for g in L["grammar"]:
        gl.setdefault(g, L["id"])
for gid, g in GRAMMAR.items():
    g_out[gid] = {"t": g["t"], "p": g["p"], "x": g["x"], "tip": g.get("tip", ""), "bonus": g.get("bonus", False), "later": g.get("later", False),
                  "L": gl.get(gid, "B"),
                  "ex": [[tk(z), e] for z, e in g["ex"]],
                  "wr": g["wr"]}
for d in DRILLS:
    assert d["g"] in GRAMMAR, d
    if d["k"] == "order":
        for a in d["a"]:
            assert "".join(sorted(a)) == "".join(sorted("".join(d["t"]))), ("tile mismatch", d)

mn = {}
for line in MNEMO.strip().splitlines():
    c, parts, story = line.split("|")
    if c in mn: continue
    mn[c] = [parts, story]

words_out = []
for k in order:
    w = D[k]
    words_out.append([k, disp(k), w["alt"], w["p"], w["e"], w["lv"], w["n"], " ".join(w["ls"]), EMOJI.get(disp(k), "")])

# characters for writing practice: every char in vocab display forms
chars = []
for k in order:
    for c in disp(k):
        if HAN.match(c) and c not in chars: chars.append(c)
for c in mn:
    if c not in chars: chars.append(c)
strokes = {}
nostroke = []
for c in chars:
    fp = os.path.join(STROKE_DIR, c + ".json")
    if os.path.exists(fp):
        j = json.load(open(fp, encoding="utf-8"))
        strokes[c] = {"strokes": j["strokes"], "medians": j["medians"]}
        if "radStrokes" in j: strokes[c]["radStrokes"] = j["radStrokes"]
    elif c in OLD_STROKES:
        strokes[c] = OLD_STROKES[c]
    else:
        nostroke.append(c)
print("chars:", len(chars), "with strokes:", len(strokes), "missing:", "".join(nostroke))

out_dir = os.path.join(ROOT, "public")
os.makedirs(out_dir, exist_ok=True)
def bank_set(st):
    lines = []; bi = 0
    for sp, text in st["lines"]:
        pieces = text.split("＿＿"); parts = []
        for i, piece in enumerate(pieces):
            if piece: parts.append([0, tk(piece)])
            if i < len(pieces) - 1: parts.append([1, bi]); bi += 1
        lines.append([sp, parts])
    ans = [a if isinstance(a, list) else [a] for a in st["ans"]]
    assert bi == len(ans), ("blank count", st["id"], bi, len(ans))
    for a in ans:
        for x in a: assert x in st["bank"], ("answer not in bank", st["id"], x)
    return {"id": st["id"], "sec": st.get("sec", ""), "kind": st.get("kind", "conv"), "L": st.get("L", ""), "bank": st["bank"], "lines": lines, "ans": ans}
def order_item(o):
    for a in o["a"]: assert sorted(a) == sorted("".join(o["t"])), ("order mismatch", o)
    return {"t": o["t"], "a": o["a"], "en": o["en"], "note": o.get("note", "")}
for ps in content3.LAST_PICS + content3.NEW_PICS:
    for it in ps["items"]:
        assert it in ps["bank"] and it in content3.PIC, ("pic", ps["id"], it)
tests = {"last": {"banks": [bank_set(s) for s in content3.LAST_BANKS], "orders": [order_item(o) for o in content3.LAST_ORDERS], "pics": content3.LAST_PICS},
         "banks": [bank_set(s) for s in content3.BANKS], "cloze": [bank_set(s) for s in content3.CLOZE], "opp": content3.OPPOSITES,
         "orders": [order_item(o) for o in content3.ORDERS], "pics": content3.NEW_PICS, "pic": content3.PIC}
data = {"altpy": ALT_PY, "tests": tests, "words": words_out, "lessons": lessons_out, "people": PEOPLE, "grammar": g_out, "drills": DRILLS,
        "reading": READING, "routine": ROUTINE, "mnemo": mn, "charsWithStrokes": "".join(strokes.keys())}
js = "window.DATA=" + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";"
open(os.path.join(GEN_DIR, "data.js"), "w", encoding="utf-8").write(js)
open(os.path.join(out_dir, "strokes.json"), "w", encoding="utf-8").write(json.dumps(strokes, ensure_ascii=False, separators=(",", ":")))
print("data.js KB:", len(js.encode()) // 1024, " strokes.json KB:", os.path.getsize(os.path.join(out_dir, "strokes.json")) // 1024)
if "--quiet" not in sys.argv:
    # sample tokenization for eyeballing
    for L in lessons_out[2:3]:
        for T in L["texts"][:2]:
            for sp, toks, en in T["lines"][:3]:
                print(" ".join(f"{w}[{p}]" for w, p in toks if p))

if "--no-assemble" not in sys.argv:
    import subprocess
    subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "assemble.py")], check=True)
