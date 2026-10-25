# -*- coding: utf-8 -*-
# All course content: lessons (from the class slides), grammar points, drills, mnemonics.

LESSONS = [
 {
  "id": "L0", "num": "預備", "name": "她是誰？這是什麼？", "en": "Who is she? What is this?",
  "src": "Slides: 她是誰 + 這是什麼",
  "words": "他 她 誰 是 我 的 爸爸 媽媽 哥哥 弟弟 姊姊 妹妹 先生 太太 小姐 王 林 這 那 什麼 桌子 椅子 書 課本 紙 筆 杯子 電腦 地圖 黑板 手機".split(),
  "texts": [
   {"title": "他是誰？ Who is he?", "lines": [
     ["A", "他是誰？", "Who is he?"],
     ["B", "他是我的爸爸。", "He is my dad."],
     ["A", "她是誰？", "Who is she?"],
     ["B", "她是我的媽媽。", "She is my mom."],
     ["A", "他是誰？", "Who is he?"],
     ["B", "他是王先生。", "He is Mr. Wang."],
     ["A", "她是誰？", "Who is she?"],
     ["B", "她是林太太。", "She is Mrs. Lin."],
     ["A", "她是誰？", "Who is she?"],
     ["B", "她是林小姐。", "She is Miss Lin."],
   ]},
   {"title": "這是什麼？ What is this?", "lines": [
     ["A", "這是什麼？", "What is this?"],
     ["B", "這是桌子。", "This is a table."],
     ["A", "這是什麼？", "What is this?"],
     ["B", "這是課本。", "This is a textbook."],
     ["A", "那是什麼？", "What is that?"],
     ["B", "那是電腦。", "That is a computer."],
     ["A", "那是什麼？", "What is that?"],
     ["B", "那是手機。", "That is a cell phone."],
   ]},
  ],
  "grammar": ["g_shi", "g_de_pos", "g_titles", "g_qword", "g_zhe_na"],
 },
 {
  "id": "L1", "num": "第一課", "name": "她是新同學", "en": "She is a new classmate",
  "src": "Slides: 基礎中文 第一課",
  "words": ("不 老師 學生 你 你們 他們 人 國 國家 台灣 美國 英國 日本 中國 大陸 德國 法國 韓國 越南 印尼 菲律賓 "
            "懂 懂了 嗎 新 同學 叫 姓 名字 很 可愛 小狗 小女孩 小孩 哪 哪國人 知道 認識 漂亮 美 美麗 山 忙 累 "
            "喜歡 喜愛 愛 呢 也 請問 洗手間 大家 早安 家 吃 喝 水果 奶茶 珍珠奶茶 朋友 謝謝 "
            "蘋果 香蕉 木瓜 草莓 番茄 橘子 西瓜 芒果 葡萄 鳳梨 啤酒 汽水 綠茶 果汁 牛奶 豆漿 紅茶 紅酒 咖啡").split(),
  "texts": [
   {"title": "會話 · She is a new classmate", "note": "Lines collected from the Lesson 1 slides.", "lines": [
     ["", "她是新同學，叫友美。她很可愛。", "She is a new classmate, called Youmei. She is very cute."],
     ["A", "她是哪國人？", "Which country is she from?"],
     ["B", "她是日本人。", "She is Japanese."],
     ["A", "你知道他的名字嗎？", "Do you know his name?"],
     ["B", "他叫林中明。", "His name is Lin Zhongming."],
     ["中明", "我喜歡台灣，你呢？", "I like Taiwan. How about you?"],
     ["友美", "我也喜歡台灣。", "I like Taiwan too."],
   ]},
   {"title": "短文 · 友美's self-introduction", "lines": [
     ["友美", "大家早安！我姓小林，叫友美，我是日本人。", "Good morning, everyone! My surname is Kobayashi, my name is Youmei, I'm Japanese."],
     ["友美", "我喜歡台灣，台灣朋友很可愛。", "I like Taiwan. Taiwanese friends are lovely."],
     ["友美", "我愛吃水果，愛喝珍珠奶茶。謝謝大家。", "I love eating fruit and love drinking bubble tea. Thank you, everyone."],
   ]},
  ],
  "grammar": ["g_shi", "g_ma", "g_anota", "g_hen_adj", "g_buhen", "g_ne", "g_ye", "g_jiao_xing", "g_na_which", "g_zhidao_renshi", "g_xihuan_ai", "g_qingwen", "g_qword"],
 },
 {
  "id": "L2", "num": "第二課", "name": "你幾點去學校？", "en": "What time do you go to school?",
  "src": "Slides: 第二課 你幾點去學校",
  "words": ("今天 昨天 明天 星期 星期一 星期二 星期三 星期四 星期五 星期六 星期天 星期幾 週末 禮拜 去 學校 上課 上班 在 教室 "
            "有 沒有 沒 早上 上午 中午 下午 晚上 半夜 早 晚 現在 課 課本 圖書館 點 分 鐘 半 幾點 下課 回 回家 電話 家人 "
            "月 日 號 兒子 女兒 孩子 裡 以後 來 啊 生日 快樂 生日快樂 要 好 問 問題 沒問題 見 明天見 熱 歲 "
            "起床 床 刷牙 牙齒 早餐 上學 午餐 中飯 放學 做飯 煮飯 晚餐 洗澡 看 電視 看電視 睡覺 男孩").split(),
  "texts": [
   {"title": "會話一 · 在中明家 (At Zhongming's home)", "lines": [
     ["媽媽", "今天是星期一，你不去學校嗎？", "Today is Monday. Aren't you going to school?"],
     ["中明", "我早上沒有課，九點去圖書館。", "I don't have class in the morning. I'm going to the library at nine."],
     ["媽媽", "中午呢？你中午回家嗎？", "What about noon? Are you coming home at noon?"],
     ["中明", "我下午有課，中午不回家。", "I have class in the afternoon, so I'm not coming home at noon."],
     ["媽媽", "你幾點下課？", "What time does your class end?"],
     ["中明", "我四點四十分下課。", "My class ends at 4:40."],
   ]},
   {"title": "會話二 · 星期五下課以後 (Friday, after class)", "lines": [
     ["宜文", "今天是星期五，明天是週末，你們要不要來我家？", "Today is Friday, tomorrow is the weekend. Do you want to come to my house?"],
     ["中明", "明天是九月二十三號……啊！是你的生日！", "Tomorrow is September 23rd… Oh! It's your birthday!"],
     ["友美", "宜文，生日快樂！", "Yiwen, happy birthday!"],
     ["宜文", "謝謝！明天晚上六點來我家，好不好？", "Thanks! Come to my house tomorrow at 6 p.m., OK?"],
     ["中明", "沒問題。", "No problem."],
     ["友美", "好，明天見。", "OK, see you tomorrow."],
   ]},
   {"title": "短文 · 友美很忙！ (Youmei is busy!)", "lines": [
     ["", "友美是學生，十九歲。", "Youmei is a student, nineteen years old."],
     ["", "她早上六點三十分起床，七點去學校，八點四十分上課；", "She gets up at 6:30, goes to school at 7, and has class at 8:40;"],
     ["", "中午十二點下課、吃午飯；下午一點去圖書館；", "at 12 noon class ends and she eats lunch; at 1 p.m. she goes to the library;"],
     ["", "四點回家做飯，晚上六點吃飯，十點睡覺。友美很忙！", "at 4 she goes home to cook, eats at 6 p.m., and sleeps at 10. Youmei is very busy!"],
   ]},
   {"title": "閱讀 · 小文的一天 (Xiaowen's day)", "lines": [
     ["", "小文早上七點起床，七點十分刷牙，七點半吃早餐，八點上學。", "Xiaowen gets up at 7, brushes her teeth at 7:10, eats breakfast at 7:30, and goes to school at 8."],
     ["", "上午八點半上課，中午十二點吃午餐。", "Class starts at 8:30 a.m.; she eats lunch at 12 noon."],
     ["", "下午四點放學，四點半去圖書館，六點回家。", "School is out at 4 p.m.; she goes to the library at 4:30 and goes home at 6."],
     ["", "晚上六點半做飯，七點吃晚餐，八點洗澡，九點看電視，十點睡覺。", "She cooks at 6:30 p.m., eats dinner at 7, showers at 8, watches TV at 9, and sleeps at 10."],
   ]},
  ],
  "grammar": ["g_time_pos", "g_time_order", "g_clock", "g_dates", "g_you", "g_bu_mei", "g_zai_place", "g_qu_place", "g_ji", "g_yihou", "g_yao", "g_haobuhao", "g_a"],
 },
 {
  "id": "L3", "num": "第三課", "name": "買生日禮物", "en": "Buying a birthday present",
  "src": "Slides: 第三課 買生日禮物",
  "words": ("買 賣 禮物 生日禮物 送 想 看書 讀書 唸書 本 兩 一些 這些 那些 哪些 花 朵 花錢 時間 蛋 雞蛋 蛋糕 好吃 和 跟 "
            "大 中 小 大學生 中學生 小學生 一起 張 台 枝 支 室友 鉛筆 種 怎麼樣 不錯 還可以 不太好 東西 東 西 "
            "錢 多少錢 塊 元 便宜 貴 顏色 金色 白色 黑色 藍色 紅色 黃色 綠色 橘色 好看 好喝 都 常常 時常 經常 "
            "穿 衣服 件 請 請客 玩 點心 甜點 甜 開心 快樂 高興 杯 了 中文書").split(),
  "texts": [
   {"title": "會話一 · Planning a gift", "lines": [
     ["宜文", "明天是友美的生日，我想送她一個禮物。", "Tomorrow is Youmei's birthday. I want to give her a present."],
     ["中明", "你想送她什麼？", "What do you want to give her?"],
     ["宜文", "友美愛看書，我想送她兩本中文書，你呢？", "Youmei loves reading. I want to give her two Chinese books. And you?"],
     ["中明", "我想買一些花和一個大蛋糕。", "I want to buy some flowers and a big cake."],
     ["宜文", "我們一起去買，好不好？", "Let's go buy them together, OK?"],
     ["中明", "好啊！", "Sure!"],
   ]},
   {"title": "會話二 · At the shop", "note": "Put together from the Lesson 3 slides.", "lines": [
     ["宜文", "這種小鉛筆怎麼樣？", "How about these little pencils?"],
     ["中明", "很可愛，友美喜歡可愛的東西。", "Very cute. Youmei likes cute things."],
     ["宜文", "我們買兩枝，好不好？兩枝五十塊錢。", "Let's buy two, OK? Two for fifty dollars."],
     ["中明", "五十塊錢很便宜。哪個顏色漂亮？", "Fifty dollars is cheap. Which color is pretty?"],
     ["宜文", "紅色、白色都好看。", "Red and white both look nice."],
     ["中明", "我想友美喜歡白色，她常穿白色的衣服。", "I think Youmei likes white. She often wears white clothes."],
   ]},
   {"title": "短文 · 友美的生日 (Youmei's birthday)", "lines": [
     ["宜文", "今天是友美的生日，她請我、中明和國安一起去她家玩。", "Today is Youmei's birthday. She invited me, Zhongming and Guoan to her home to hang out."],
     ["宜文", "我們送友美花、兩本中文書、兩枝可愛的小鉛筆和一個大蛋糕，", "We gave Youmei flowers, two Chinese books, two cute little pencils and a big cake,"],
     ["宜文", "她很喜歡這些禮物。", "and she really liked these gifts."],
     ["宜文", "友美請我們吃點心和水果，大家都很開心。", "Youmei treated us to snacks and fruit. Everyone was very happy."],
   ]},
  ],
  "grammar": ["g_xiang", "g_mw", "g_er_liang", "g_xie", "g_he_gen", "g_yiqi", "g_zenmeyang", "g_price", "g_dou", "g_changchang", "g_adj_de", "g_song", "g_qing", "g_zai_prog", "g_le", "g_hua", "g_hao_v"],
 },
]

PEOPLE = [
 ["林中明", "Lín Zhōngmíng", "Taiwanese student; lives with his mom"],
 ["林友美 / 小林友美", "(Xiǎolín) Yǒuměi", "new classmate from Japan; loves fruit and bubble tea"],
 ["宜文", "Yíwén", "classmate; her birthday is September 23"],
 ["國安", "Guó'ān", "classmate who goes to the birthday party"],
]

# ---------------------------------------------------------------- GRAMMAR
# examples: [zh, en]; wrong: [wrong, right, why]
GRAMMAR = {
 "g_shi": {"t": "是 / 不是 — A is (not) B", "p": "A + 是 + B　·　A + 不是 + B",
  "x": "是 links two nouns: 'A is B'. To say 'is not', put 不 before 是. 不 changes to bú before a 4th-tone word, so 不是 is said búshì.",
  "ex": [["我是老師；我不是學生。", "I am a teacher; I am not a student."], ["你們是學生；你們不是老師。", "You are students; you are not teachers."], ["我不是台灣人，我是美國人。", "I am not Taiwanese; I'm American."]],
  "wr": [["他是很忙。", "他很忙。", "Don't use 是 before an adjective."], ["我是不老師。", "我不是老師。", "不 goes before 是."]],
  "tip": "Nationality = country + 人: 日本人, 美國人, 台灣人."},
 "g_de_pos": {"t": "的 — possession ('s)", "p": "Person + 的 + thing",
  "x": "的 works like English 's. 我的 = my, 你的 = your, 老師的 = the teacher's. With close family you may drop it: 我爸爸 = 我的爸爸.",
  "ex": [["他是我的爸爸。", "He is my dad."], ["這是誰的書？", "Whose book is this?"], ["明天是你的生日！", "Tomorrow is your birthday!"]],
  "wr": [["書的我", "我的書", "Owner comes first, then 的, then the thing."]], "tip": ""},
 "g_titles": {"t": "先生 / 太太 / 小姐 — titles go AFTER the surname", "p": "Surname + 先生/太太/小姐",
  "x": "Opposite of English: 王先生 = Mr. Wang, 林太太 = Mrs. Lin (her husband's surname is 林), 林小姐 = Miss Lin (a younger woman). 我先生 = my husband, 我太太 = my wife.",
  "ex": [["他是王先生。", "He is Mr. Wang."], ["她是林太太。", "She is Mrs. Lin."], ["她是我的太太。", "She is my wife."]],
  "wr": [["先生王", "王先生", "Title comes after the surname."]], "tip": ""},
 "g_qword": {"t": "Question words stay in place (誰, 什麼, 哪)", "p": "他是誰？　這是什麼？　她是哪國人？",
  "x": "Chinese questions keep the normal sentence order. Put the question word where the answer will go. Do NOT add 嗎 when you already have a question word.",
  "ex": [["他是誰？— 他是我的哥哥。", "Who is he? — He is my older brother."], ["那是什麼？— 那是黑板。", "What is that? — That is a blackboard."], ["她叫什麼名字？", "What is her name?"]],
  "wr": [["誰是他？", "他是誰？", "Keep the word order of the answer: 他是___."], ["這是什麼嗎？", "這是什麼？", "No 嗎 with question words."]], "tip": ""},
 "g_zhe_na": {"t": "這 this / 那 that / 哪 which", "p": "這是… / 那是… / 哪個…？",
  "x": "這 (zhè) = this, 那 (nà) = that, 哪 (nǎ) = which? 哪 has a 口 'mouth' because it asks a question.",
  "ex": [["這是筆。", "This is a pen."], ["那是杯子。", "That is a cup."], ["哪個人是你的老師？", "Which person is your teacher?"]],
  "wr": [["那國人？", "哪國人？", "'Which' is 哪 with the mouth radical."]], "tip": "那 vs 哪: same shape, but the question word has 口 on the left."},
 "g_ma": {"t": "嗎 — yes/no questions", "p": "Statement + 嗎？",
  "x": "Add 嗎 at the end of any statement to make a yes/no question. Answer with the verb: 是 / 不是, 有 / 沒有, 喜歡 / 不喜歡.",
  "ex": [["他是學生嗎？— 是，他是學生。", "Is he a student? — Yes, he is a student."], ["你喜歡台灣嗎？", "Do you like Taiwan?"], ["你們是印尼人嗎？— 不是，我們是越南人。", "Are you Indonesian? — No, we are Vietnamese."]],
  "wr": [["你是學生不是嗎？", "你是學生嗎？ / 你是不是學生？", "Use 嗎 OR A-not-A, not both."]], "tip": "Answer 'yes' by repeating the verb (是/喜歡), not with 對 every time."},
 "g_anota": {"t": "A-not-A questions (是不是, 好不好, 要不要…)", "p": "Verb/Adj + 不 + Verb/Adj？　有沒有？",
  "x": "Another way to ask yes/no: say the verb (or adjective) twice with 不 in the middle. For two-syllable words you may say only the first syllable: 喜不喜歡. For 有 use 有沒有. Never add 嗎.",
  "ex": [["你懂不懂？", "Do you understand?"], ["你要不要喝咖啡？", "Do you want coffee?"], ["你喜不喜歡台灣？", "Do you like Taiwan?"], ["台灣熱不熱？", "Is Taiwan hot?"], ["林先生有沒有孩子？", "Does Mr. Lin have children?"]],
  "wr": [["你忙不忙嗎？", "你忙不忙？", "No 嗎 after A-not-A."], ["你有不有書？", "你有沒有書？", "有 is negated by 沒, so it's 有沒有."], ["你很忙不忙？", "你忙不忙？", "No 很 inside A-not-A."]], "tip": ""},
 "g_hen_adj": {"t": "很 + adjective (no 是!)", "p": "Subject + 很 + Adj",
  "x": "Adjectives work like verbs in Chinese. Put 很 before them (很 is often just a link, not a strong 'very'). Do not use 是. Negative: 不 + Adj (她不漂亮). Question: Adj + 嗎 or Adj-不-Adj.",
  "ex": [["她很可愛。", "She is cute."], ["台灣很漂亮。", "Taiwan is beautiful."], ["他很忙；他不累。", "He is busy; he isn't tired."], ["小狗很可愛。", "The little dog is cute."]],
  "wr": [["她是可愛。", "她很可愛。", "No 是 before adjectives."], ["她不很漂亮嗎？", "她漂亮嗎？", "Simple Adj + 嗎."]], "tip": "Adjectives so far: 可愛 忙 累 漂亮 美 熱 好 新 大 小 便宜 貴 好看 好吃 甜 開心"},
 "g_buhen": {"t": "不 vs 不很 / 不太 — 'not' vs 'not very'", "p": "不 + Adj = not　·　不很/不太 + Adj = not very",
  "x": "她不漂亮 = she is not pretty. 她不很漂亮 = she is not very pretty (softer). In daily speech people usually say 不太 for 'not very'.",
  "ex": [["他不忙。", "He is not busy."], ["他不很忙。", "He is not very busy."], ["這本書不太好。", "This book isn't very good."]],
  "wr": [["他很不忙。", "他不很忙 / 他不太忙。", "'Not very' = 不很 / 不太."]], "tip": "很不 + adj = VERY not (很不好 = really bad). 不很 + adj = not very."},
 "g_ne": {"t": "呢 — 'And you?' / 'What about…?'", "p": "(Topic) + 呢？",
  "x": "After saying something about yourself, ask the same question back with just 你呢？. You can also use it with time words: 中午呢？ = What about noon?",
  "ex": [["我喜歡台灣，你呢？", "I like Taiwan. How about you?"], ["我是學生，你呢？— 我也是學生。", "I'm a student. And you? — I'm a student too."], ["中午呢？你中午回家嗎？", "What about noon? Are you coming home at noon?"]],
  "wr": [["你呢嗎？", "你呢？", "呢 already makes the question."]], "tip": ""},
 "g_ye": {"t": "也 — also, too (before the verb)", "p": "Subject + 也 + Verb",
  "x": "也 must come right after the subject and before the verb (or 不). Never put it at the start or end of the sentence.",
  "ex": [["我也喜歡台灣。", "I like Taiwan too."], ["她也是日本人。", "She is Japanese too."], ["我沒有妹妹，也沒有哥哥。", "I don't have a younger sister, or an older brother."], ["我也不累。", "I'm not tired either."]],
  "wr": [["也我喜歡台灣。", "我也喜歡台灣。", "也 goes after the subject."], ["我喜歡台灣也。", "我也喜歡台灣。", "也 is never at the end."]], "tip": "也 + 不: 我也不忙 (I'm not busy either)."},
 "g_jiao_xing": {"t": "叫 vs 姓 — full name vs surname", "p": "我姓 + surname　·　我叫 + (full) name",
  "x": "姓 is for your family name only. 叫 is for your full name or given name. Ask: 你叫什麼名字？ (What's your name?) or politely 您貴姓？ (What's your surname?).",
  "ex": [["我姓張，叫張世娟。", "My surname is Zhang; my name is Zhang Shijuan."], ["她姓林，叫林友美。", "Her surname is Lin; she's called Lin Youmei."], ["他叫什麼名字？— 他叫中明。", "What's his name? — He's called Zhongming."]],
  "wr": [["我姓林友美。", "我姓林。 / 我叫林友美。", "姓 takes only the surname."], ["我是叫中明。", "我叫中明。", "叫 is the verb; no 是."]], "tip": ""},
 "g_na_which": {"t": "哪國人？ — Which country is someone from?", "p": "Subject + 是 + 哪國人？ → Subject + 是 + Country人",
  "x": "哪 = which. 哪國 = which country. Answer by replacing 哪國 with the country name.",
  "ex": [["她是哪國人？— 她是日本人。", "Where is she from? — She's Japanese."], ["你是哪國人？— 我是印尼人。", "What nationality are you? — I'm Indonesian."]],
  "wr": [["她是那國人？", "她是哪國人？", "Use 哪 (which), not 那 (that)."]], "tip": ""},
 "g_zhidao_renshi": {"t": "知道 vs 認識 — know a fact vs know a person", "p": "知道 + information　·　認識 + person/place",
  "x": "知道 = to know information (a name, a fact, an answer). 認識 = to be acquainted with a person (or a place, a character).",
  "ex": [["你知道他的名字嗎？", "Do you know his name?"], ["你認識他嗎？", "Do you know him (personally)?"], ["我知道，他叫中明。", "I know, he's called Zhongming."]],
  "wr": [["我知道王老師。", "我認識王老師。", "Knowing a person = 認識."], ["我認識他的名字。", "我知道他的名字。", "A name is a fact = 知道."]], "tip": ""},
 "g_xihuan_ai": {"t": "喜歡 / 愛 + noun or verb", "p": "喜歡/愛 + Noun　·　喜歡/愛 + Verb + Noun",
  "x": "喜歡 = like, 喜愛 = like very much, 愛 = love. They can take a noun (愛台灣) or a whole activity (愛吃水果, 愛喝珍珠奶茶 = love eating fruit / drinking bubble tea).",
  "ex": [["我喜歡台灣。", "I like Taiwan."], ["我愛吃水果，愛喝珍珠奶茶。", "I love eating fruit and drinking bubble tea."], ["我愛我的爸爸媽媽。", "I love my parents."]],
  "wr": [["我很愛喝的奶茶。", "我很愛喝奶茶。", "No 的 between the verb and its object."]], "tip": ""},
 "g_qingwen": {"t": "請問 — 'Excuse me, may I ask…'", "p": "請問，+ question？",
  "x": "Start a polite question with 請問. It doesn't replace the question itself.",
  "ex": [["請問，洗手間在哪裡？", "Excuse me, where is the restroom?"], ["請問，你叫什麼名字？", "May I ask your name?"], ["請問，你是哪國人？", "May I ask where you're from?"], ["請問，你忙嗎？", "Excuse me, are you busy?"]],
  "wr": [], "tip": ""},
 # ---- L2
 "g_time_pos": {"t": "Time words go BEFORE the verb", "p": "Subject + Time + Verb　or　Time + Subject + Verb",
  "x": "In Chinese the 'when' comes early: after the subject (or at the very beginning), always before the verb. Never at the end like English.",
  "ex": [["我早上八點去學校。", "I go to school at 8 in the morning."], ["我下午有課。", "I have class in the afternoon."], ["我星期三下午沒有課。", "I don't have class on Wednesday afternoon."], ["我今天晚上在家。", "I'm at home tonight."]],
  "wr": [["我去學校早上八點。", "我早上八點去學校。", "Time goes before the verb."], ["我有課今天下午。", "我今天下午有課。", "Time before the verb."]], "tip": "Order inside a sentence: Who + When + Where + Do what. 我明天早上在圖書館看書。"},
 "g_time_order": {"t": "Big → small time order", "p": "Year → month → day → weekday → part of day → hour → minute",
  "x": "Chinese goes from the largest unit to the smallest: 今天早上八點十分 (today, morning, 8, 10 minutes).",
  "ex": [["今天早上八點十分", "8:10 this morning"], ["昨天下午四點二十分", "4:20 yesterday afternoon"], ["明天晚上六點", "6 p.m. tomorrow"], ["九月二十三號星期六", "Saturday, September 23"]],
  "wr": [["八點今天早上", "今天早上八點", "Big unit first."], ["早上今天八點", "今天早上八點", "Day before part of the day."]], "tip": ""},
 "g_clock": {"t": "Telling time — 點, 分, 半", "p": "X 點 Y 分　·　X 點半　·　幾點？",
  "x": "點 (diǎn) = o'clock, 分 (fēn) = minutes, 半 = half past. 2:00 is 兩點 (never 二點). 9:05 is 九點五分 (or 九點零五分). Ask 現在幾點？",
  "ex": [["現在八點四十五分。", "It's 8:45."], ["我四點四十分下課。", "My class ends at 4:40."], ["兩點五十分", "2:50"], ["四點半 = 四點三十分", "4:30"], ["十二點", "12:00"]],
  "wr": [["二點", "兩點", "Use 兩 for 2 o'clock."], ["八點鐘四十分", "八點四十分", "鐘 only when there are no minutes."]], "tip": "早上 / 上午 / 中午 / 下午 / 晚上 / 半夜 come before the hour: 晚上七點."},
 "g_dates": {"t": "Dates — 月, 號/日, 星期", "p": "X月 Y號 星期Z　·　今天幾月幾號？星期幾？",
  "x": "Month = number + 月. Day = number + 號 (spoken) or 日 (written). Weekdays: 星期一 to 星期六, and Sunday is 星期天 or 星期日. 禮拜 and 週 also mean week.",
  "ex": [["今天幾月幾號？— 今天十月二十四號。", "What's the date today? — October 24."], ["七月十五號星期日", "Sunday, July 15"], ["十二月二十五號星期天", "Sunday, December 25"], ["明天是星期幾？", "What day is tomorrow?"]],
  "wr": [["星期七", "星期天 / 星期日", "There is no 星期七."], ["二十五號十二月", "十二月二十五號", "Month before day."]], "tip": "2月 is 二月 (counting/naming numbers use 二)."},
 "g_you": {"t": "有 / 沒有 / 有沒有 — have, there is", "p": "A + 有 + N　·　A + 沒有 + N　·　A + 有沒有 + N？",
  "x": "有 = have / there is. The negative of 有 is ALWAYS 沒有 (never 不有). When you say 沒有, drop the number: 我沒有妹妹 (not 沒有一個妹妹). 教室裡有… = In the classroom there is…",
  "ex": [["我有一個姊姊。", "I have an older sister."], ["我沒有妹妹，也沒有哥哥。", "I don't have a younger sister or an older brother."], ["王先生有兩個兒子。", "Mr. Wang has two sons."], ["教室裡有沒有地圖？", "Is there a map in the classroom?"], ["林先生有幾個孩子？", "How many children does Mr. Lin have?"]],
  "wr": [["我不有課。", "我沒有課。", "有 is negated with 沒."], ["我沒有一個妹妹。", "我沒有妹妹。", "No number after 沒有."]], "tip": ""},
 "g_bu_mei": {"t": "不 vs 沒", "p": "不 + most verbs/adjectives　·　沒 + 有",
  "x": "不 negates verbs, adjectives, 是, 要, 喜歡… (habit, wish, now/future). 沒 goes with 有 (and later: things that didn't happen).",
  "ex": [["我中午不回家。", "I'm not going home at noon."], ["我早上沒有課。", "I don't have class in the morning."], ["我不要喝咖啡。", "I don't want coffee."], ["他沒回電話。", "He didn't return the call."]],
  "wr": [["我沒是學生。", "我不是學生。", "是 takes 不."], ["我不有錢。", "我沒有錢。", "有 takes 沒."]], "tip": "Quick test: is the verb 有? → 沒. Otherwise → 不 (for now)."},
 "g_zai_place": {"t": "在 + place — be at / do something at", "p": "Subject + 在 + Place　·　Subject + 在 + Place + Verb",
  "x": "在 means 'at / in'. Alone it is the verb 'to be at': 我在家. Before another verb it tells where the action happens: 我在圖書館看書. Negative: 不在.",
  "ex": [["我今天晚上在家。", "I'm at home tonight."], ["我先生今天晚上不在家。", "My husband isn't home tonight."], ["她在學校。", "She's at school."], ["我在教室上課。", "I have class in the classroom."]],
  "wr": [["我是在家。", "我在家。", "No 是."], ["我看書在圖書館。", "我在圖書館看書。", "Place goes before the verb."]], "tip": "Order: Who + When + 在 Where + Do what."},
 "g_qu_place": {"t": "去 / 來 / 回 + place", "p": "去 + Place (+ Verb)　·　來 + Place　·　回 + Place",
  "x": "去 = go (away from here), 來 = come (toward the speaker), 回 = return. The place comes right after the verb, no 'to' word: 去學校, 來我家, 回家. Add a second verb for the purpose: 去圖書館看書.",
  "ex": [["我九點去圖書館。", "I go to the library at nine."], ["你們要不要來我家？", "Do you want to come to my house?"], ["他六點回家。", "He goes home at six."], ["我們一起去買。", "Let's go buy (it) together."]],
  "wr": [["我去到學校。", "我去學校。", "No extra 'to' needed."]], "tip": ""},
 "g_ji": {"t": "幾 — how many? (small numbers, dates, time)", "p": "幾 + measure word + noun？　幾點？　幾月幾號？　星期幾？",
  "x": "幾 asks for a number you expect to be small (under ~10) or a number in a date/time. 幾 needs a measure word: 幾個人, 幾本書. For prices and big numbers use 多少.",
  "ex": [["你家有幾個人？", "How many people are in your family?"], ["你幾點下課？", "What time does your class end?"], ["教室裡有幾張桌子？", "How many tables are in the classroom?"], ["你有幾個室友？", "How many roommates do you have?"]],
  "wr": [["你家有幾人？", "你家有幾個人？", "幾 needs a measure word."], ["這個幾錢？", "這個多少錢？", "Prices use 多少."]], "tip": ""},
 "g_yihou": {"t": "…以後 — after…", "p": "Event / Time + 以後, (main clause)",
  "x": "以後 comes AFTER the event: 下課以後 = after class. (English puts 'after' first.) Alone, 以後 means 'later, in the future'.",
  "ex": [["星期五下課以後", "Friday after class"], ["回家以後，我做飯。", "After I get home, I cook."], ["來台灣以後，我很喜歡喝奶茶。", "Since coming to Taiwan, I love drinking milk tea."], ["吃飯以後", "after eating"]],
  "wr": [["以後下課", "下課以後", "以後 goes after the event."]], "tip": ""},
 "g_yao": {"t": "要 / 不要 / 要不要 — want, will", "p": "要 + Noun/Verb　·　不要 + Verb　·　要不要 + Verb？",
  "x": "要 = want (to) or will. 要不要 asks 'do you want to…?'. 不要 = don't want; also 'don't!' as a command (不要去！).",
  "ex": [["你要不要喝奶茶？— 要，我要喝奶茶。", "Do you want milk tea? — Yes, I do."], ["你要不要吃水果？— 不要，我不要。", "Do you want fruit? — No, I don't."], ["今天星期天，你要去學校嗎？— 不要，我不要去學校。", "It's Sunday. Are you going to school? — No."]],
  "wr": [["你要不要嗎？", "你要不要？", "No 嗎 with A-not-A."]], "tip": "Short answers: 要。/ 不要。"},
 "g_haobuhao": {"t": "…，好不好？ / …，好嗎？ — suggestions", "p": "Suggestion，好不好？",
  "x": "Make a suggestion, then add 好不好？ or 好嗎？ ('OK?'). Answer 好 / 好啊 / 沒問題. Alone, 好不好？ also asks 'is it good?'",
  "ex": [["我們去圖書館，好不好？", "Let's go to the library, OK?"], ["明天晚上六點來我家，好不好？", "Come to my place tomorrow at 6 p.m., OK?"], ["這本書好不好？— 很好。", "Is this book good? — Very good."]],
  "wr": [], "tip": "好 = good, and also 'OK' (好，我知道了)."},
 "g_a": {"t": "啊 — surprise / softening particle", "p": "Sentence + 啊！",
  "x": "啊 at the end shows surprise or makes a reply sound friendly: 是你的生日啊！ / 好啊！",
  "ex": [["啊！是你的生日！", "Oh! It's your birthday!"], ["好啊！", "Sure!"]], "wr": [], "tip": ""},
 # ---- L3
 "g_xiang": {"t": "想 — want to, would like to; think", "p": "想 + Verb　·　不想 + Verb　·　想不想 + Verb？　·　我想 + opinion",
  "x": "想 + verb = would like to (softer than 要). 我想… before a whole sentence = I think… (我想友美喜歡白色).",
  "ex": [["我想送她一個禮物。", "I'd like to give her a present."], ["你想不想喝咖啡？— 想。", "Do you want to drink coffee? — Yes."], ["我不想吃飯。", "I don't want to eat."], ["我想友美喜歡白色。", "I think Youmei likes white."]],
  "wr": [["我想不吃飯。", "我不想吃飯。", "不 goes before 想."]], "tip": ""},
 "g_mw": {"t": "Measure words — Number + MW + Noun", "p": "一 + 本 + 書　·　這/那/哪 + MW + Noun",
  "x": "Between a number (or 這/那/哪/幾) and a noun you need a measure word. 個 is the general one. Learn the noun with its MW.",
  "ex": [["兩本書", "two books (本: books)"], ["三朵花", "three flowers (朵: flowers)"], ["一個兒子", "a son (個: general)"], ["五張桌子", "five tables (張: flat things)"], ["一台電腦", "a computer (台: machines)"], ["一枝筆 / 一支筆", "a pen (枝/支: long thin things)"], ["兩件衣服", "two pieces of clothing (件)"], ["一杯咖啡", "a cup of coffee (杯)"], ["兩種水果", "two kinds of fruit (種)"]],
  "wr": [["三書", "三本書", "A number needs a MW."], ["一個書", "一本書", "Books use 本."]], "tip": "本 books · 個 people/things · 張 table/paper/chair · 台 computer · 枝/支 pen/pencil · 朵 flower · 件 clothes · 杯 cup of · 種 kind · 位 polite people · 隻 animals · 輛 cars"},
 "g_er_liang": {"t": "二 vs 兩 — two", "p": "兩 + MW　·　二 when counting/in numbers",
  "x": "Before a measure word use 兩: 兩本書, 兩個人, 兩點 (2 o'clock). Use 二 for counting (一、二、三), in numbers (十二, 二十), dates (二月) and order (第二).",
  "ex": [["兩本書", "two books"], ["兩個人", "two people"], ["十二點", "12 o'clock"], ["二月二十八號", "February 28"]],
  "wr": [["二本書", "兩本書", "兩 before a measure word."], ["兩月", "二月", "Month names use 二."]], "tip": ""},
 "g_xie": {"t": "一些 / 這些 / 那些 / 哪些 — some, these, those", "p": "這些 + Noun (no other MW)",
  "x": "些 is a plural measure word: 一些 = some, 這些 = these, 那些 = those, 哪些 = which ones. Don't add another MW: 這些書 (not 這些本書).",
  "ex": [["我想買一些花。", "I want to buy some flowers."], ["這些書是誰的？", "Whose books are these?"], ["那些人是我的朋友。", "Those people are my friends."], ["這些水果很好吃。", "This fruit is delicious."]],
  "wr": [["這些本書", "這些書", "些 replaces the MW."], ["我買了一點些水果。", "我買了一些水果。", "Just 一些."]], "tip": ""},
 "g_he_gen": {"t": "和 vs 跟 — and / with", "p": "Noun + 和 + Noun　·　跟 + person + (一起) + Verb",
  "x": "和 joins two nouns: 我有哥哥和妹妹. It does NOT join two sentences or two verbs. 跟 (or 和) + person + 一起 = (do) with someone.",
  "ex": [["我喜歡咖啡和茶。", "I like coffee and tea."], ["我想買一些花和一個大蛋糕。", "I want to buy some flowers and a big cake."], ["我跟朋友一起吃飯。", "I eat with friends."], ["她和弟弟一起去學校。", "She goes to school with her younger brother."]],
  "wr": [["我吃飯和他看書。", "我吃飯，他看書。", "和 doesn't join sentences."], ["我吃飯跟朋友。", "我跟朋友吃飯。", "跟 + person goes before the verb."]], "tip": ""},
 "g_yiqi": {"t": "一起 — together (before the verb)", "p": "(跟/和 + person +) 一起 + Verb",
  "x": "一起 goes right before the verb. With a partner: 跟/和 + person + 一起 + verb.",
  "ex": [["我們一起去買，好不好？", "Let's go buy it together, OK?"], ["他們一起去學校。", "They go to school together."], ["你要不要一起去？", "Do you want to go together?"], ["我們一起學中文。", "We study Chinese together."]],
  "wr": [["我們去一起買。", "我們一起去買。", "一起 before the verb."]], "tip": ""},
 "g_zenmeyang": {"t": "怎麼樣 — how is it? / how about…?", "p": "Noun + 怎麼樣？",
  "x": "Ask for an opinion or make a suggestion. Answers: 很好, 很不錯 (pretty good), 還可以 (OK), 不太好 (not very good).",
  "ex": [["這種小鉛筆怎麼樣？", "How about these little pencils?"], ["你的中文怎麼樣？— 還可以。", "How's your Chinese? — OK."], ["台灣怎麼樣？— 很不錯。", "How's Taiwan? — Pretty good."], ["新老師怎麼樣？", "How's the new teacher?"]],
  "wr": [["這本書是怎麼樣？", "這本書怎麼樣？", "No 是."]], "tip": ""},
 "g_price": {"t": "Money — 多少錢？ 塊 / 元", "p": "Thing + 多少錢？ → Number + 塊(錢) / 元",
  "x": "多少錢？ = How much? Spoken: 塊 (塊錢). Written/prices: 元. 50 = 五十塊, 100 = 一百塊, 2 dollars = 兩塊.",
  "ex": [["這個多少錢？", "How much is this?"], ["兩枝五十塊錢。", "Two for fifty dollars."], ["香蕉多少錢？— 三十塊。", "How much are the bananas? — Thirty dollars."], ["一百元", "100 dollars (NT$)"]],
  "wr": [["這個幾錢？", "這個多少錢？", "Prices: 多少錢."], ["二塊", "兩塊", "兩 before 塊."]], "tip": "便宜 cheap · 貴 expensive: 五十塊錢很便宜。"},
 "g_dou": {"t": "都 — all, both (before the verb)", "p": "Plural subject + 都 + Verb/Adj",
  "x": "都 points back to everything mentioned before it. It goes right before the verb or adjective, never at the start.",
  "ex": [["紅色、白色都好看。", "Red and white both look nice."], ["我們都是學生。", "We are all students."], ["這些水果都是蘋果。", "These fruits are all apples."], ["我的爸爸媽媽都是老師。", "My parents are both teachers."], ["大家都很開心。", "Everyone was happy."]],
  "wr": [["都我們是學生。", "我們都是學生。", "都 after the subject."], ["我們是都學生。", "我們都是學生。", "都 before the verb."]], "tip": "也 + 都 order: 我們也都是學生 (we're all students too)."},
 "g_changchang": {"t": "常 / 常常 — often (before the verb)", "p": "Subject + 常常 + Verb",
  "x": "常, 常常, 時常, 經常 all mean often. Put them before the verb.",
  "ex": [["她常穿白色的衣服。", "She often wears white clothes."], ["你常常喝奶茶嗎？", "Do you often drink milk tea?"], ["我常常吃水果。", "I often eat fruit."]],
  "wr": [["我喝奶茶常常。", "我常常喝奶茶。", "常常 before the verb."]], "tip": ""},
 "g_adj_de": {"t": "Adjective + 的 + Noun", "p": "(很) Adj + 的 + Noun　·　one-syllable Adj + Noun",
  "x": "To describe a noun, put the description first, then 的, then the noun: 可愛的東西 (cute things). Short one-syllable adjectives often skip 的: 大蛋糕, 新書, 小鉛筆.",
  "ex": [["友美喜歡可愛的東西。", "Youmei likes cute things."], ["她常穿白色的衣服。", "She often wears white clothes."], ["一個好吃的蛋糕", "a delicious cake"], ["很貴的咖啡", "very expensive coffee"], ["大蛋糕　新同學　小鉛筆", "big cake · new classmate · little pencil"]],
  "wr": [["東西可愛", "可愛的東西 (as a phrase)", "Describer comes first."], ["衣服的白色", "白色的衣服", "Adj + 的 + noun."]], "tip": ""},
 "g_song": {"t": "送 + person + thing — give (a gift)", "p": "A + 送 + person + thing",
  "x": "送 takes two objects: first the person, then the gift.",
  "ex": [["老師送我一本書。", "The teacher gave me a book."], ["媽媽送我一枝筆。", "Mom gave me a pen."], ["我想送她兩本中文書。", "I'd like to give her two Chinese books."]],
  "wr": [["我送一本書她。", "我送她一本書。", "Person first, then the thing."]], "tip": ""},
 "g_qing": {"t": "請 — please / invite / treat", "p": "請 + person + Verb",
  "x": "請 + person + verb = invite someone to do something, or treat them (you pay!). 請客 = to treat. Also 'please': 請坐.",
  "ex": [["她請我們去她家玩。", "She invited us to her place."], ["老師請我們吃早餐。", "The teacher treated us to breakfast."], ["友美請我們吃點心和水果。", "Youmei treated us to snacks and fruit."], ["今天我請客！", "Today it's my treat!"]],
  "wr": [], "tip": "玩 = play/hang out: 去朋友家玩."},
 "g_zai_prog": {"t": "在 + Verb — doing right now", "p": "Subject + 在 + Verb (+ Object)",
  "x": "在 before a verb (with no place) shows an action in progress: 她在吃東西 = she is eating.",
  "ex": [["她在吃東西。", "She is eating."], ["妹妹在買東西。", "My younger sister is shopping."], ["他在看電視。", "He is watching TV."]],
  "wr": [], "tip": "Compare: 她在家 (at home) · 她在家吃飯 (eats at home) · 她在吃飯 (is eating)."},
 "g_le": {"t": "了 — completed action (basic)", "p": "Verb + 了 + (number) Object",
  "x": "了 after a verb shows the action is done: 我買了一些東西 = I bought some things. Negative of a past action uses 沒 (no 了): 我沒買.",
  "ex": [["我買了一些東西。", "I bought some things."], ["你買了幾種水果？", "How many kinds of fruit did you buy?"], ["我懂了。", "I get it now."]],
  "wr": [["我沒買了。", "我沒買。", "No 了 with 沒."]], "tip": ""},
 "g_hua": {"t": "花 — flower (noun) / spend (verb)", "p": "一朵花　·　花 + 錢/時間",
  "x": "Same character, two jobs. Noun: 這些花很漂亮. Verb: 花錢 (spend money), 花時間 (spend time).",
  "ex": [["他送我一朵花。", "He gave me a flower."], ["我不想花錢。", "I don't want to spend money."], ["我要花一些時間學中文。", "I need to spend some time studying Chinese."]],
  "wr": [], "tip": ""},
 "g_hao_v": {"t": "好 + verb — good to…", "p": "好吃 · 好喝 · 好看",
  "x": "好 + a sense verb makes an adjective: 好吃 (tasty food), 好喝 (tasty drink), 好看 (good-looking / good to watch).",
  "ex": [["這些甜點很好吃。", "These desserts are delicious."], ["奶茶很好喝。", "Milk tea tastes good."], ["紅色、白色都好看。", "Red and white both look nice."]],
  "wr": [["奶茶很好吃。", "奶茶很好喝。", "Drinks are 好喝."]], "tip": ""},
 # ---- Bonus: likely in book Units 4–6 (all words come from the vocab table)
 "g_hui": {"t": "會 — can (a learned skill) / will", "p": "會 + Verb　·　不會 + Verb　·　會不會？", "bonus": True,
  "x": "會 = know how to (a skill you learned): 我會說中文. It can also mean 'will (probably)': 明天會下雨. 能 = be able to (conditions allow); 可以 = may / be allowed.",
  "ex": [["我會說一點中文。", "I can speak a little Chinese."], ["你會不會游泳？", "Can you swim?"], ["明天會下雨。", "It will rain tomorrow."], ["我今天不能去，我很忙。", "I can't go today; I'm busy."], ["我可以坐這裡嗎？", "May I sit here?"]],
  "wr": [["我會說中文很好。", "我中文說得很好。", "Use 得 to say how well."]], "tip": ""},
 "g_de_comp": {"t": "Verb + 得 + how well", "p": "Subject + (Verb) Object + Verb + 得 + (很) Adj", "bonus": True,
  "x": "To say how well/fast someone does something, put 得 after the verb and the description after 得. If there is an object, say the verb twice (or drop the first one).",
  "ex": [["他跑得很快。", "He runs fast."], ["你說得很好。", "You speak very well."], ["她中文說得很好。", "She speaks Chinese well."], ["他(唱)歌唱得不好。", "He doesn't sing well."]],
  "wr": [["他說中文得很好。", "他中文說得很好。", "得 must follow the verb directly."], ["他跑的很快。", "他跑得很快。", "After a verb use 得, not 的."]], "tip": "的 (noun) · 得 (after verb) · 地 (before verb): 我的書 · 跑得快 · 慢慢地走"},
 "g_tai_le": {"t": "太…了 — too…!", "p": "太 + Adj + 了", "bonus": True,
  "x": "太…了 = too much / so…! 太貴了 = too expensive. 不太 + Adj = not very.",
  "ex": [["這個太貴了！", "This is too expensive!"], ["太好了！", "Great!"], ["今天不太熱。", "Today isn't very hot."]], "wr": [], "tip": ""},
 "g_youdian": {"t": "有一點 vs 一點 — a bit", "p": "有(一)點 + Adj (complaint)　·　Adj + 一點 (comparison/request)", "bonus": True,
  "x": "有一點 + adjective = a bit (usually something negative): 有一點貴. Adjective + 一點 = a little more…: 便宜一點 (a bit cheaper, please).",
  "ex": [["這件衣服有一點貴。", "This piece of clothing is a bit expensive."], ["可以便宜一點嗎？", "Can it be a bit cheaper?"], ["我會說一點中文。", "I can speak a little Chinese."]],
  "wr": [["這個一點貴。", "這個有一點貴。", "有一點 before an adjective."]], "tip": ""},
 "g_haishi": {"t": "還是 (or, in questions) vs 或是 (or, in statements)", "p": "A 還是 B？　·　A 或是 B。", "bonus": True,
  "x": "Questions offering a choice use 還是: 你要咖啡還是茶？ Statements use 或是: 我喝咖啡或是茶都可以.",
  "ex": [["你要喝咖啡還是茶？", "Do you want coffee or tea?"], ["你是學生還是老師？", "Are you a student or a teacher?"], ["星期六或是星期天都可以。", "Saturday or Sunday are both fine."]],
  "wr": [["你要咖啡還是茶嗎？", "你要咖啡還是茶？", "No 嗎 with 還是."]], "tip": ""},
 "g_bi": {"t": "比 — comparisons", "p": "A + 比 + B + Adj", "bonus": True,
  "x": "A 比 B + adjective = A is more … than B. Don't put 很 before the adjective.",
  "ex": [["哥哥比我高。", "My older brother is taller than me."], ["台灣比日本熱。", "Taiwan is hotter than Japan."], ["香蕉比蘋果便宜。", "Bananas are cheaper than apples."]],
  "wr": [["他比我很高。", "他比我高。", "No 很 in 比 sentences."]], "tip": ""},
 "g_yinwei": {"t": "因為…所以… — because…so…", "p": "因為 + reason，所以 + result", "bonus": True,
  "x": "Chinese often uses both halves together. Reason first, result second.",
  "ex": [["因為今天下雨，所以我不去。", "Because it's raining today, I'm not going."], ["因為我很累，所以想休息。", "I'm tired, so I want to rest."]], "wr": [], "tip": ""},
 "g_location": {"t": "Location words — 在 + place + 裡/上/旁邊", "p": "Thing + 在 + Place + 裡面/上面/旁邊/前面/右邊…", "bonus": True,
  "x": "To say where something is: thing + 在 + place + position word. To say what is there: Place + 有 + thing.",
  "ex": [["書在桌子上。", "The book is on the table."], ["教室裡有很多學生。", "There are many students in the classroom."], ["洗手間在哪裡？", "Where is the restroom?"], ["圖書館在學校旁邊。", "The library is next to the school."]],
  "wr": [["在桌子上有書。", "桌子上有書。", "With 有, start with the place."]], "tip": ""},
}

# ---------------------------------------------------------------- DRILLS
# order: tiles -> correct sentence(s) (answers listed without punctuation)
# choose: pick option(s) for the blank; ans = index or list of acceptable indexes
# fix: pick the CORRECT sentence
DRILLS = [
 # L0 / L1
 {"k":"choose","g":"g_shi","q":"我＿＿老師；＿＿學生。(I'm a teacher, not a student)","o":["是 / 不是","不是 / 是","是 / 沒有"],"a":0},
 {"k":"choose","g":"g_shi","q":"我＿＿台灣人；＿＿美國人。(I'm not Taiwanese; I'm American)","o":["是 / 不是","不是 / 是","不 / 是"],"a":1},
 {"k":"order","g":"g_shi","t":["林小姐","不是","法國人","她是","美國人"],"a":["林小姐不是法國人她是美國人"],"en":"Miss Lin is not French; she is American.","p":"，"},
 {"k":"order","g":"g_shi","t":["王太太","日本人","不是","英國人","她是"],"a":["王太太不是日本人她是英國人"],"en":"Mrs. Wang is not Japanese; she's British.","p":"，"},
 {"k":"order","g":"g_shi","t":["王先生","中國人","法國人","是","不是"],"a":["王先生不是法國人是中國人","王先生是中國人不是法國人"],"en":"Mr. Wang is not French, he's Chinese."},
 {"k":"fix","g":"g_hen_adj","o":["她是很可愛。","她很可愛。","她可愛是。"],"a":1},
 {"k":"fix","g":"g_qword","o":["誰是他？","他是誰？","他是誰嗎？"],"a":1},
 {"k":"fix","g":"g_titles","o":["先生王是老師。","王先生是老師。","王是先生老師。"],"a":1},
 {"k":"choose","g":"g_de_pos","q":"他是我＿＿哥哥。","o":["的","得","是"],"a":0},
 {"k":"choose","g":"g_qword","q":"那是＿＿？— 那是黑板。","o":["什麼","誰","哪"],"a":0},
 {"k":"choose","g":"g_qword","q":"他是＿＿？— 他是我的弟弟。","o":["什麼","誰","哪國"],"a":1},
 {"k":"choose","g":"g_ma","q":"她是韓國人。→ 她是韓國人＿＿？","o":["嗎","呢","吧"],"a":0},
 {"k":"choose","g":"g_ma","q":"她是日本人嗎？— 是，＿＿。","o":["她是日本人","她不是日本人","她日本人是"],"a":0},
 {"k":"choose","g":"g_ma","q":"他們是老師嗎？— 不是，＿＿。","o":["他們是老師","他們不是老師","他們沒有老師"],"a":1},
 {"k":"order","g":"g_ma","t":["學生","他們","嗎","是"],"a":["他們是學生嗎"],"en":"Are they students?","end":"？"},
 {"k":"fix","g":"g_anota","o":["你忙不忙嗎？","你忙不忙？","你很忙不忙？"],"a":1},
 {"k":"fix","g":"g_anota","o":["你有不有哥哥？","你有沒有哥哥？","你沒有有哥哥？"],"a":1},
 {"k":"choose","g":"g_anota","q":"這本書＿＿？","o":["好不好","要不要","來不來"],"a":0},
 {"k":"choose","g":"g_anota","q":"你＿＿喝咖啡？","o":["好不好","要不要","愛不愛台灣"],"a":1},
 {"k":"choose","g":"g_anota","q":"你＿＿台灣？","o":["喜不喜歡","要不要","來不來"],"a":[0]},
 {"k":"choose","g":"g_anota","q":"你晚上＿＿我家？","o":["好不好","來不來","喜不喜歡"],"a":1},
 {"k":"choose","g":"g_anota","q":"我們明天去圖書館，＿＿？","o":["好不好","來不來","愛不愛"],"a":0},
 {"k":"choose","g":"g_anota","q":"你＿＿你先生？","o":["愛不愛","來不來","好不好"],"a":0},
 {"k":"choose","g":"g_anota","q":"王小姐＿＿？— 她很累。","o":["累不累","累嗎不","不累累"],"a":0},
 {"k":"choose","g":"g_anota","q":"台灣＿＿？— 台灣很熱。","o":["熱不熱","熱沒熱","很熱嗎不"],"a":0},
 {"k":"order","g":"g_anota","t":["林先生","不","忙","忙"],"a":["林先生忙不忙"],"en":"Is Mr. Lin busy?","end":"？"},
 {"k":"choose","g":"g_buhen","q":"He is not very busy. → 他＿＿忙。","o":["不很","很不","沒"],"a":0},
 {"k":"choose","g":"g_buhen","q":"She is not tired. → 她＿＿累。","o":["不","沒","不是"],"a":0},
 {"k":"choose","g":"g_hen_adj","q":"Is he busy? →","o":["他忙嗎？","他是忙嗎？","他忙不忙嗎？"],"a":0},
 {"k":"choose","g":"g_ne","q":"中明：我是學生，＿＿？ 友美：我也是學生。","o":["你呢","你嗎","你是"],"a":0},
 {"k":"choose","g":"g_ne","q":"中明：我是老師，你呢？ 友美：（No）","o":["我不是老師。","我也是老師。","我沒有老師。"],"a":0},
 {"k":"order","g":"g_ye","t":["我","喜歡","也","台灣"],"a":["我也喜歡台灣"],"en":"I like Taiwan too."},
 {"k":"fix","g":"g_ye","o":["也我是學生。","我是學生也。","我也是學生。"],"a":2},
 {"k":"order","g":"g_ye","t":["我","沒有","妹妹","也","沒有","哥哥"],"a":["我沒有妹妹也沒有哥哥"],"en":"I have no younger sister, and no older brother either.","p":"，"},
 {"k":"choose","g":"g_jiao_xing","q":"她＿＿林友美。她＿＿林。","o":["叫 / 姓","姓 / 叫","是 / 叫"],"a":0},
 {"k":"fix","g":"g_jiao_xing","o":["我姓林中明。","我叫林中明。","我是叫林中明。"],"a":1},
 {"k":"choose","g":"g_na_which","q":"她是＿＿國人？— 她是日本人。","o":["哪","那","什麼"],"a":0},
 {"k":"choose","g":"g_zhidao_renshi","q":"你＿＿他的名字嗎？","o":["知道","認識","懂"],"a":0},
 {"k":"choose","g":"g_zhidao_renshi","q":"你＿＿王老師嗎？— ＿＿，她是我的老師。","o":["知道 / 知道","認識 / 認識","懂 / 懂"],"a":1},
 {"k":"order","g":"g_xihuan_ai","t":["我","愛","水果","吃"],"a":["我愛吃水果"],"en":"I love eating fruit."},
 {"k":"choose","g":"g_qingwen","q":"You want to know where the restroom is:","o":["請問，洗手間在哪裡？","請問，你忙嗎？","請問，你是哪國人？"],"a":0},
 {"k":"choose","g":"g_qingwen","q":"You want to know which country I'm from:","o":["請問，你叫什麼名字？","請問，你是哪國人？","請問，你累嗎？"],"a":1},
 {"k":"order","g":"g_qword","t":["他","叫","名字","什麼"],"a":["他叫什麼名字"],"en":"What is his name?","end":"？"},
 {"k":"order","g":"g_na_which","t":["是","她","人","哪國"],"a":["她是哪國人"],"en":"Which country is she from?","end":"？"},
 # L2
 {"k":"order","g":"g_time_pos","t":["我","早上","八點","去","學校"],"a":["我早上八點去學校","早上八點我去學校"],"en":"I go to school at 8 in the morning."},
 {"k":"order","g":"g_time_pos","t":["我","今天","下午","有","課"],"a":["我今天下午有課","今天下午我有課"],"en":"I have class this afternoon."},
 {"k":"order","g":"g_time_pos","t":["我","下午","沒有","課"],"a":["我下午沒有課","下午我沒有課"],"en":"I don't have class in the afternoon."},
 {"k":"order","g":"g_time_pos","t":["我","星期三","下午","沒有","課"],"a":["我星期三下午沒有課","星期三下午我沒有課"],"en":"I don't have class on Wednesday afternoon."},
 {"k":"order","g":"g_time_pos","t":["我","今天","早上","喝","牛奶"],"a":["我今天早上喝牛奶","今天早上我喝牛奶"],"en":"I drink milk this morning."},
 {"k":"order","g":"g_zai_place","t":["我先生","今天","晚上","不","在","家"],"a":["我先生今天晚上不在家","今天晚上我先生不在家"],"en":"My husband isn't home tonight."},
 {"k":"fix","g":"g_time_pos","o":["我去學校早上八點。","我早上八點去學校。","早上我去學校八點。"],"a":1},
 {"k":"order","g":"g_time_order","t":["早上","今天","八點","十分"],"a":["今天早上八點十分"],"en":"8:10 this morning","end":""},
 {"k":"order","g":"g_time_order","t":["下午","明天","三點","二十分"],"a":["明天下午三點二十分"],"en":"3:20 tomorrow afternoon","end":""},
 {"k":"order","g":"g_time_order","t":["晚上","昨天","七點","三十分"],"a":["昨天晚上七點三十分"],"en":"7:30 last night","end":""},
 {"k":"order","g":"g_time_order","t":["中午","今天","十二點","十五分"],"a":["今天中午十二點十五分"],"en":"12:15 today at noon","end":""},
 {"k":"order","g":"g_time_order","t":["早上","明天","九點","五分"],"a":["明天早上九點五分"],"en":"9:05 tomorrow morning","end":""},
 {"k":"order","g":"g_time_order","t":["下午","昨天","四點","四十分"],"a":["昨天下午四點四十分"],"en":"4:40 yesterday afternoon","end":""},
 {"k":"order","g":"g_time_order","t":["晚上","今天","六點","二十五分"],"a":["今天晚上六點二十五分"],"en":"6:25 this evening","end":""},
 {"k":"order","g":"g_time_order","t":["中午","明天","十二點","十分"],"a":["明天中午十二點十分"],"en":"12:10 tomorrow at noon","end":""},
 {"k":"order","g":"g_time_order","t":["早上","昨天","七點","五十分"],"a":["昨天早上七點五十分"],"en":"7:50 yesterday morning","end":""},
 {"k":"order","g":"g_time_order","t":["晚上","明天","八點","三十五分"],"a":["明天晚上八點三十五分"],"en":"8:35 tomorrow evening","end":""},
 {"k":"choose","g":"g_clock","q":"2:50 →","o":["二點五十分","兩點五十分","兩點五分"],"a":1},
 {"k":"choose","g":"g_clock","q":"4:30 →","o":["四點半","四點三分","半四點"],"a":0},
 {"k":"choose","g":"g_clock","q":"9:05 →","o":["九點五十分","九點五分","五點九分"],"a":1},
 {"k":"choose","g":"g_you","q":"王先生只有兩個兒子。王先生＿＿女兒。","o":["有","沒有","不有"],"a":1},
 {"k":"choose","g":"g_you","q":"王先生＿＿兒子？— 有。","o":["有沒有","有不有","沒有沒"],"a":0},
 {"k":"choose","g":"g_you","q":"王先生有＿＿兒子？— 兩個。","o":["幾個","幾","多少個錢"],"a":0},
 {"k":"fix","g":"g_you","o":["我沒有一個妹妹。","我不有妹妹。","我沒有妹妹。"],"a":2},
 {"k":"order","g":"g_you","t":["教室","裡","有沒有","地圖"],"a":["教室裡有沒有地圖"],"en":"Is there a map in the classroom?","end":"？"},
 {"k":"choose","g":"g_bu_mei","q":"我中午＿＿回家。","o":["不","沒","沒有"],"a":0},
 {"k":"choose","g":"g_bu_mei","q":"我早上＿＿課。","o":["不有","沒有","不是"],"a":1},
 {"k":"choose","g":"g_bu_mei","q":"他＿＿是老師。","o":["不","沒","沒有"],"a":0},
 {"k":"order","g":"g_zai_place","t":["我","在","圖書館","看書"],"a":["我在圖書館看書"],"en":"I read in the library."},
 {"k":"order","g":"g_qu_place","t":["我","九點","去","圖書館"],"a":["我九點去圖書館","九點我去圖書館"],"en":"I go to the library at nine."},
 {"k":"choose","g":"g_ji","q":"你家有＿＿人？","o":["幾個","幾","多少錢"],"a":0},
 {"k":"choose","g":"g_ji","q":"今天＿＿？— 今天星期六。","o":["星期幾","幾星期","什麼星期"],"a":0},
 {"k":"choose","g":"g_ji","q":"你＿＿下課？— 四點四十分。","o":["幾點","幾個","多少"],"a":0},
 {"k":"choose","g":"g_dates","q":"12/25 →","o":["十二月二十五號","二十五號十二月","十二號二十五月"],"a":0},
 {"k":"choose","g":"g_dates","q":"Sunday →","o":["星期七","星期天","星期零"],"a":1},
 {"k":"order","g":"g_yihou","t":["下課","以後","我","回家"],"a":["下課以後我回家","我下課以後回家"],"en":"After class I go home."},
 {"k":"fix","g":"g_yihou","o":["以後下課，我們去吃飯。","下課以後，我們去吃飯。","下課我們以後去吃飯。"],"a":1},
 {"k":"choose","g":"g_yao","q":"今天星期天，你要不要去學校？— ＿＿，今天沒有課。","o":["不要","要","沒有"],"a":0},
 {"k":"choose","g":"g_yao","q":"今天星期一，你要不要去學校？— ＿＿，我要去學校。","o":["要","不要","是"],"a":0},
 {"k":"choose","g":"g_yao","q":"你＿＿喝奶茶？— 要，我要喝。","o":["要不要","不要嗎","要嗎不"],"a":0},
 {"k":"order","g":"g_yao","t":["你們","要不要","來","我家"],"a":["你們要不要來我家"],"en":"Do you want to come to my house?","end":"？"},
 {"k":"order","g":"g_haobuhao","t":["明天","晚上","六點","來","我家"],"a":["明天晚上六點來我家"],"en":"Come to my house at 6 p.m. tomorrow (…OK?)","end":"，好不好？"},
 {"k":"choose","g":"g_qu_place","q":"他六點＿＿家。(He goes home at six)","o":["回","來","在"],"a":0},
 # L3
 {"k":"choose","g":"g_xiang","q":"你＿＿喝咖啡？— 想。","o":["想不想","想嗎不","不想嗎"],"a":0},
 {"k":"fix","g":"g_xiang","o":["我想不吃飯。","我不想吃飯。","我不吃想飯。"],"a":1},
 {"k":"order","g":"g_song","t":["我","想","送","她","一個","禮物"],"a":["我想送她一個禮物"],"en":"I'd like to give her a present."},
 {"k":"fix","g":"g_song","o":["老師送一本書我。","老師送我一本書。","老師我送一本書。"],"a":1},
 {"k":"choose","g":"g_mw","q":"兩＿＿書","o":["本","個","張"],"a":0},
 {"k":"choose","g":"g_mw","q":"三＿＿花","o":["朵","件","台"],"a":0},
 {"k":"choose","g":"g_mw","q":"五＿＿桌子","o":["張","本","枝"],"a":0},
 {"k":"choose","g":"g_mw","q":"一＿＿電腦","o":["台","朵","杯"],"a":0},
 {"k":"choose","g":"g_mw","q":"一＿＿筆","o":["枝","件","張"],"a":0},
 {"k":"choose","g":"g_mw","q":"兩＿＿衣服","o":["件","本","朵"],"a":0},
 {"k":"choose","g":"g_mw","q":"一＿＿咖啡","o":["杯","台","張"],"a":0},
 {"k":"choose","g":"g_mw","q":"一＿＿兒子","o":["個","本","件"],"a":0},
 {"k":"choose","g":"g_mw","q":"你喜歡哪＿＿水果？","o":["種","張","台"],"a":0},
 {"k":"choose","g":"g_er_liang","q":"＿＿本書","o":["兩","二","雙"],"a":0},
 {"k":"choose","g":"g_er_liang","q":"＿＿月二十八號","o":["二","兩","第"],"a":0},
 {"k":"choose","g":"g_er_liang","q":"十＿＿點 (12 o'clock)","o":["二","兩","雙"],"a":0},
 {"k":"fix","g":"g_xie","o":["這些本書是誰的？","這些書是誰的？","這書些是誰的？"],"a":1},
 {"k":"choose","g":"g_xie","q":"弟弟喜歡吃＿＿水果？","o":["哪種","這些","那"],"a":0},
 {"k":"choose","g":"g_xie","q":"＿＿都是他的衣服。","o":["這些","哪種","這"],"a":0},
 {"k":"choose","g":"g_xie","q":"＿＿是你的書？(Which ones?)","o":["哪些","這","那"],"a":0},
 {"k":"choose","g":"g_xie","q":"＿＿都是學生。","o":["這些","這","哪種"],"a":0},
 {"k":"choose","g":"g_xie","q":"＿＿是一杯咖啡。","o":["這","這些","哪些"],"a":0},
 {"k":"choose","g":"g_he_gen","q":"我有哥哥＿＿妹妹。","o":["和","也","都"],"a":0},
 {"k":"fix","g":"g_he_gen","o":["我吃飯跟朋友。","我跟朋友一起吃飯。","我一起朋友吃飯。"],"a":1},
 {"k":"order","g":"g_yiqi","t":["我們","一起","去","買"],"a":["我們一起去買"],"en":"Let's go buy it together (OK?)","end":"，好不好？"},
 {"k":"order","g":"g_yiqi","t":["她","和","弟弟","一起","去","學校"],"a":["她和弟弟一起去學校"],"en":"She goes to school with her younger brother."},
 {"k":"choose","g":"g_zenmeyang","q":"你的中文＿＿？— 還可以。","o":["怎麼樣","什麼","多少"],"a":0},
 {"k":"choose","g":"g_price","q":"香蕉＿＿？— 三十塊。","o":["多少錢","幾錢","怎麼樣錢"],"a":0},
 {"k":"choose","g":"g_price","q":"Two for fifty dollars →","o":["兩枝五十塊錢","二枝五十塊錢","兩枝五塊十錢"],"a":0},
 {"k":"choose","g":"g_dou","q":"紅色、白色＿＿好看。","o":["都","也","和"],"a":0},
 {"k":"fix","g":"g_dou","o":["都我們是學生。","我們都是學生。","我們是都學生。"],"a":1},
 {"k":"order","g":"g_dou","t":["我的","爸爸媽媽","都","是","老師"],"a":["我的爸爸媽媽都是老師"],"en":"My parents are both teachers."},
 {"k":"order","g":"g_changchang","t":["她","常","穿","白色的","衣服"],"a":["她常穿白色的衣服"],"en":"She often wears white clothes."},
 {"k":"choose","g":"g_adj_de","q":"友美喜歡可愛＿＿東西。","o":["的","得","是"],"a":0},
 {"k":"choose","g":"g_adj_de","q":"a delicious cake →","o":["一個好吃的蛋糕","一個蛋糕的好吃","一個好喝的蛋糕"],"a":0},
 {"k":"choose","g":"g_hao_v","q":"珍珠奶茶很＿＿。","o":["好喝","好吃","好看"],"a":0},
 {"k":"order","g":"g_qing","t":["她","請","我們","去","她家","玩"],"a":["她請我們去她家玩"],"en":"She invited us to her place."},
 {"k":"choose","g":"g_zai_prog","q":"妹妹＿＿買東西。(is shopping)","o":["在","是","有"],"a":0},
 {"k":"fix","g":"g_le","o":["我沒買了。","我沒買。","我不買了東西。"],"a":1},
 # Bonus
 {"k":"fix","g":"g_de_comp","o":["他跑的很快。","他跑得很快。","他很快跑得。"],"a":1},
 {"k":"fix","g":"g_de_comp","o":["她說中文得很好。","她中文說得很好。","她說得中文很好。"],"a":1},
 {"k":"choose","g":"g_hui","q":"我＿＿說一點中文。","o":["會","要","是"],"a":0},
 {"k":"choose","g":"g_haishi","q":"你要喝咖啡＿＿茶？","o":["還是","或是","和"],"a":0},
 {"k":"fix","g":"g_bi","o":["他比我很高。","他比我高。","他高比我。"],"a":1},
 {"k":"choose","g":"g_youdian","q":"這件衣服＿＿貴。","o":["有一點","一點","很一點"],"a":0},
 {"k":"choose","g":"g_tai_le","q":"一千塊？＿＿！","o":["太貴了","很貴了","貴太了"],"a":0},
 {"k":"order","g":"g_location","t":["書","在","桌子","上"],"a":["書在桌子上"],"en":"The book is on the table."},
]

# Reading comprehension (questions about the lesson texts)
READING = [
 {"text":"L2-2","q":"友美幾點起床？","o":["六點三十分","七點","八點四十分"],"a":0},
 {"text":"L2-2","q":"友美幾點上課？","o":["七點","八點四十分","十二點"],"a":1},
 {"text":"L2-2","q":"友美下午一點去哪裡？","o":["回家","圖書館","學校"],"a":1},
 {"text":"L2-2","q":"友美幾點睡覺？","o":["九點","十點","十一點"],"a":1},
 {"text":"L2-2","q":"友美幾歲？","o":["十八歲","十九歲","二十歲"],"a":1},
 {"text":"L2-3","q":"小文幾點吃午餐？","o":["十二點","四點","七點半"],"a":0},
 {"text":"L2-3","q":"小文幾點放學？","o":["四點","四點半","六點"],"a":0},
 {"text":"L2-3","q":"小文晚上九點做什麼？","o":["洗澡","看電視","睡覺"],"a":1},
 {"text":"L2-0","q":"中明早上去學校嗎？","o":["去，他早上有課","不去，他早上沒有課","他早上在家睡覺"],"a":1},
 {"text":"L2-0","q":"中明中午回家嗎？","o":["回家","不回家","他不知道"],"a":1},
 {"text":"L2-0","q":"中明幾點下課？","o":["四點四十分","九點","十二點"],"a":0},
 {"text":"L2-1","q":"宜文的生日是幾月幾號？","o":["九月二十三號","九月二十號","十月二十三號"],"a":0},
 {"text":"L2-1","q":"他們幾點去宜文家？","o":["明天早上六點","明天晚上六點","今天晚上六點"],"a":1},
 {"text":"L1-1","q":"友美是哪國人？","o":["台灣人","日本人","韓國人"],"a":1},
 {"text":"L1-1","q":"友美愛喝什麼？","o":["咖啡","珍珠奶茶","紅茶"],"a":1},
 {"text":"L3-0","q":"宜文想送友美什麼？","o":["兩本中文書","一些花","一個大蛋糕"],"a":0},
 {"text":"L3-0","q":"中明想買什麼？","o":["鉛筆","一些花和一個大蛋糕","衣服"],"a":1},
 {"text":"L3-1","q":"兩枝鉛筆多少錢？","o":["五十塊","十五塊","一百塊"],"a":0},
 {"text":"L3-1","q":"友美常穿什麼顏色的衣服？","o":["紅色","白色","黑色"],"a":1},
 {"text":"L3-2","q":"友美請誰去她家玩？","o":["宜文、中明和國安","她的爸爸媽媽","她的老師"],"a":0},
 {"text":"L3-2","q":"友美請大家吃什麼？","o":["點心和水果","蛋糕和咖啡","午餐"],"a":0},
]

ROUTINE = ["起床","刷牙","吃早餐","上學","上課","吃午餐","放學","去圖書館","回家","做飯","吃晚餐","洗澡","看電視","睡覺"]

# --------------------------------------------------- character memory tricks
# char|parts|story  (stories are memory tricks, not etymology)
MNEMO = """
你|亻 person + 尔|The person (亻) standing in front of me: you.
他|亻 person + 也|A person (亻) who is "also" (也) there: he.
她|女 woman + 也|Same as 他 but with 女 (woman): she.
們|亻 person + 門 door|People crowding through a door: the plural -men (我們, 你們).
是|日 sun + 疋|Under the sun (日), everything is what it is: is.
誰|言 speech + 隹 bird|Speech (言) from a bird (隹) in the tree? Who's talking?
的|白 white + 勺 spoon|A white spoon that belongs to me: 's (possession).
爸|父 father + 巴 (bā)|Father (父) on top, 巴 gives the sound bā.
媽|女 woman + 馬 horse (mǎ)|A woman (女) + 馬 for the sound mā: mom.
嗎|口 mouth + 馬 horse (mǎ)|A mouth (口) + 馬 sound: the question word ma.
馬|horse|Picture a horse: mane on top, four legs (灬) below.
哥|可 + 可|Two 可 stacked: big brother is twice as capable.
弟|bow and string|A little brother tied up with string, always tagging along.
姊|女 woman + 𠂔|Woman radical: older sister.
妹|女 woman + 未 not yet|A woman (女) who is "not yet" (未) grown: younger sister.
先|⺧ + 儿 legs|Legs walking ahead first: first; 先生 = 'born first' = Mr.
生|plant from the ground|A sprout growing out of the ground: be born, life, raw.
太|大 big + 丶|Big (大) plus one more dot: TOO big. 太太 = Mrs.
大|person with arms wide|A person spreading their arms: big.
天|一 + 大|The line (一) above a big person (大): sky, day.
小|three small strokes|A small hook with two small dots: small.
姐|女 woman + 且|Woman radical: older sister / Miss.
這|辶 walk + 言 speech|Walk (辶) over and speak about it: this one here.
那|that|那 points over there: that. (No mouth, it's not a question.)
哪|口 mouth + 那|那 with a mouth (口) asking: which? where?
什|亻 + 十 ten|A person among ten things: what?
麼|麻 + 幺|Part of 什麼 (what) and 怎麼 (how).
書|聿 brush + 曰 say|A brush (聿) writing down what was said: book.
筆|⺮ bamboo + 聿 brush|A brush (聿) with a bamboo (⺮) handle: pen.
紙|糸 silk/thread + 氏|Made from fibers (糸): paper.
桌|卜 + 日 + 木 wood|Something wooden (木) you put things on: table.
椅|木 wood + 奇|A wooden (木) thing to sit on: chair.
杯|木 wood + 不|A wooden (木) cup. 不 gives the sound.
電|雨 rain + 申 lightning|Lightning out of the rain clouds: electricity.
腦|月 flesh + 囟 skull|Flesh (月) inside the skull: brain. 電腦 = 'electric brain' = computer!
手|hand with fingers|A hand with fingers: hand. 手機 = hand machine = cell phone.
機|木 wood + 幾|An old wooden (木) machine with many (幾) parts: machine.
地|土 earth + 也|Earth (土) is also (也) everywhere: ground. 地圖 = map.
圖|囗 frame + 啚|A drawing inside a frame (囗): picture, map.
黑|smoke from fire (灬)|Soot from a fire (灬 at the bottom): black.
老|old man with a cane|An old person bending over with a walking stick: old.
師|teacher|老師 = 'old master' = teacher.
學|子 child under a roof|A child (子) under a roof learning with two hands: study.
同|冂 + 一 + 口|Mouths (口) under one roof: same. 同學 = classmate.
新|立 + 木 + 斤 axe|Freshly cut wood (木) with an axe (斤): new.
叫|口 mouth + 丩|Open your mouth (口) and call out: to call, be called.
姓|女 woman + 生 born|What you're born (生) with from a woman (女): surname.
名|夕 evening + 口 mouth|In the evening (夕) dark you call out your name with your mouth (口).
字|宀 roof + 子 child|A child (子) under a roof (宀) learning characters.
很|彳 step + 艮|Step (彳) by step: very.
可|丁 + 口 mouth|A mouth that says 'yes, you can': can, may.
愛|爫 hand + 冖 + 心 heart + 夊 walk|Love keeps a heart (心) right in the middle.
忙|忄 heart + 亡 lose|Your heart (忄) is lost (亡) in all the work: busy.
累|田 field + 糸 thread|Working in the field (田) all day, tied down: tired.
喜|drum + 口 mouth|A drum and a happy mouth: joy, like.
歡|雚 + 欠 open mouth|Open mouth (欠) laughing: joyful. 喜歡 = like.
也|also|A snake-like shape that shows up 'also' in 他, 她, 地.
呢|口 mouth + 尼|Mouth radical = sound particle: …and you?
吃|口 mouth + 乞|Mouth (口) on the left: eat.
喝|口 mouth + 曷|Mouth (口) on the left: drink.
水|water flowing|A stream with splashes: water.
果|田 + 木 tree|Fruit (田) growing on top of a tree (木).
茶|艹 grass + 人 + 木|A person (人) between grass (艹) and tree (木) picking tea leaves.
朋|月 + 月|Two moons side by side: friends shining together.
友|ナ hand + 又 hand|Two hands joined: friend.
家|宀 roof + 豕 pig|A pig (豕) under a roof (宀): home (old farms kept pigs inside!).
國|囗 border + 或|Land with a border (囗) around it: country.
人|person walking|Two legs walking: person.
台|厶 + 口|台灣 = Taiwan. Also MW for machines (一台電腦).
灣|氵 water + 彎 bend|Water (氵) at a bend: bay. 台灣.
美|羊 sheep + 大 big|A big (大) sheep (羊) was beautiful: beautiful. 美國 = 'beautiful country' = USA.
英|艹 grass + 央|英國 = England.
日|sun|A square sun: sun, day. 日本 = 'sun origin' = Japan.
本|木 tree + 一|A mark at the root of a tree (木): origin; MW for books.
中|line through a box|An arrow through the middle: middle. 中國, 中文.
明|日 sun + 月 moon|Sun + moon together: bright. 明天 = tomorrow.
月|moon|A crescent moon: moon, month.
早|日 sun + 十|The sun (日) rising over the horizon: early.
午|noon|Like 牛 (cow) but the top doesn't poke out: noon. 中午, 下午.
牛|cow|The middle line pokes through the top like a horn: cow. 牛奶 = milk.
晚|日 sun + 免|The sun (日) has gone away: late, evening.
上|above|A line pointing up above the base: up, above.
下|below|A line hanging below the top: down, below.
點|黑 black + 占|A black (黑) dot: dot, o'clock.
分|八 divide + 刀 knife|A knife (刀) dividing (八) something: divide, minute.
幾|how many|幾點 what time? 幾個 how many?
現|王 jade + 見 see|現在 = now: see (見) it right now.
在|at|在家 = at home.
有|ナ hand + 月 meat|A hand holding meat: have.
沒|氵 water + 殳|Sunk under the water (氵): gone, don't have.
課|言 speech + 果 fruit|Words (言) that bear fruit (果): lesson, class.
去|土 + 厶|go: 去學校.
來|來|come: 來我家.
回|口 inside 口|A circle inside a circle: go round and return.
問|門 door + 口 mouth|A mouth (口) at the door (門): ask.
題|是 + 頁 page|The topic on the page (頁): 問題 = question.
門|door|Two swinging saloon doors.
間|門 door + 日 sun|Sun (日) shining through the gap in a door (門): between, room.
見|目 eye + 儿 legs|An eye (目) on legs walking to see: see.
看|手 hand over 目 eye|A hand (手) shading the eye (目): look!
睡|目 eye + 垂 droop|Eyes (目) drooping (垂): sleep.
覺|⺍ + 冖 + 見|睡覺 = sleep.
飯|食 food + 反|Food radical (飠): rice, meal.
做|亻 person + 故|A person (亻) doing work: do, make.
起|走 walk + 己 self|Get yourself (己) up to walk (走): rise. 起床 = get up.
床|广 shelter + 木 wood|Wood (木) under a shelter (广): bed.
洗|氵 water + 先|Water (氵) first (先): wash.
澡|氵 water + 喿|Water radical: bath. 洗澡.
牙|tooth|A tooth with its root. 刷牙 = brush teeth.
刷|尸 + 巾 cloth + 刂 knife|Brush. 刷牙.
星|日 sun + 生 born|Little suns (日) being born (生): star. 星期 = week.
期|其 + 月 moon|A period of moons: period of time. 星期 = week.
號|口 + 丂 + 虎 tiger|A tiger roars a number: number, date (幾號).
生|life|生日 = birthday.
快|忄 heart + 夬|Heart beating fast: fast; 快樂 = happy.
樂|music/joy|Drums on a wooden stand (木): music, happy.
要|覀 + 女 woman|want.
好|女 woman + 子 child|A woman (女) with her child (子): good!
買|罒 net + 貝 shell-money|Use a net (罒) to collect shell money (貝): buy.
賣|士 + 買|Put something (士) on top of 買 to sell it: sell. Top = sell, no top = buy.
貝|shell|An old cowrie shell = money. Shows up in 買, 賣, 貴.
貴|中 + 一 + 貝 money|Lots of money (貝) piled up: expensive.
錢|金 metal + 戔|Metal (金) coins: money.
禮|礻 ritual + 豊|A ritual (礻) offering: gift. 禮物.
物|牛 cow + 勿|A cow (牛) was a valuable thing: thing. 禮物 = gift.
送|辶 walk + 关|Walk (辶) it over to give: give, deliver.
想|相 + 心 heart|Your heart (心) looking at (相) something: think, want to.
兩|two|Two people in a frame: two (before measure words).
些|此 + 二|Plural: 一些 some, 這些 these.
花|艹 grass + 化 change|Grass (艹) that changes (化) into blossoms: flower.
蛋|疋 + 虫|egg. 蛋糕 = cake.
糕|米 rice + 羔|Made of rice (米) flour: cake.
和|禾 grain + 口 mouth|Grain (禾) for every mouth (口): harmony; and.
跟|足 foot + 艮|Feet (足) following: with, follow.
起|一起|一起 = together.
鉛|金 metal + 㕣|Metal (金): lead. 鉛筆 = pencil.
種|禾 grain + 重|Different grains (禾): kind, type.
怎|乍 + 心 heart|怎麼 = how; 怎麼樣 = how about?
樣|木 + 羊 + 水|Shape, appearance: 怎麼樣.
東|木 tree + 日 sun|The sun (日) rising behind a tree (木): east.
西|west|西瓜 = 'west melon' = watermelon. 東西 = east-west = things!
色|color|顏色 = color. 紅色, 白色…
顏|彥 + 頁 head|Color of the face (頁): 顏色.
紅|糸 silk + 工|Dyed silk (糸): red.
綠|糸 silk + 彔|Dyed silk (糸): green.
藍|艹 grass + 監|A plant (艹) used for blue dye: blue.
黃|yellow|yellow.
白|white|A ray of light: white. Add 一 on top → 百 hundred.
百|一 + 白|One (一) on top of white (白): hundred.
都|者 + 阝 city|all.
常|⺌ + 冖 + 口 + 巾|often.
穿|穴 hole + 牙 tooth|Push through a hole (穴): wear, put on.
衣|clothing|A robe with collar and sleeves: clothes.
服|月 + 𠬝|衣服 = clothes.
件|亻 + 牛|MW for clothes: 一件衣服.
請|言 speech + 青|Polite words (言): please, invite.
玩|王 jade + 元|Playing with jade (王) toys: play.
心|heart|A heart with three drops: heart. 開心 = happy.
開|門 door + 开|Hands opening the door (門): open.
甜|舌 tongue + 甘 sweet|Sweet (甘) on the tongue (舌): sweet.
點|點心|點心 = snacks (a dot for the heart).
今|today|今天 = today.
昨|日 sun + 乍|昨天 = yesterday.
週|辶 + 周|week: 週末 = weekend.
末|木 + longer top line|Top line longer = the end (tip of the tree): 週末. (未 has a SHORTER top line.)
未|木 + shorter top line|Not yet. (Top line short.) Shows up in 妹.
校|木 wood + 交|學校 = school.
圖|圖書館|圖書館 = library.
館|食 food + 官|A building (originally a guesthouse with food): 圖書館.
教|孝 + 攵 hand with stick|教室 = classroom.
室|宀 roof + 至|A room under a roof (宀): 教室, 室友.
熱|埶 + 灬 fire|Fire (灬) underneath: hot.
冷|冫 ice + 令|Ice (冫): cold.
歲|years old|十九歲 = 19 years old.
兒|child|兒子 = son, 女兒 = daughter.
孩|子 child + 亥|Child: 孩子.
女|woman|A kneeling woman: female.
男|田 field + 力 power|Power (力) in the field (田): male.
知|矢 arrow + 口 mouth|Words (口) as quick as an arrow (矢): know.
道|辶 walk + 首 head|The way to walk (辶): road, way. 知道 = know.
認|言 speech + 忍|認識 = know (a person).
識|言 speech + 戠|認識.
懂|忄 heart + 董|Understand with your heart (忄): 懂.
漂|氵 water + 票|漂亮 = pretty.
亮|bright|漂亮 = pretty.
山|three mountain peaks|Three peaks: mountain.
謝|言 speech + 射|Words (言) of thanks: 謝謝.
安|宀 roof + 女 woman|A woman (女) safe under a roof (宀): peace. 早安 = good morning.
"""
