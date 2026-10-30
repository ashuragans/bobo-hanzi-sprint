# -*- coding: utf-8 -*-
"""Lesson 7 怎麼到飯店去？ (How do we get to the hotel?): the book's dialogues, reading, words and grammar
(時代華語 1 第7課), and the class slides (the teacher's 第8課 怎麼到飯店去?: example sentences, the 從/到 and
走/走路/搭/騎 fill-ins, 先…再…, 一定, 又…又…, the transport pictures and the 怎麼 summary)."""
from content import LESSONS, GRAMMAR, DRILLS, READING, MNEMO, PEOPLE

L7_NOTE = "Practice text written for this site with the Lesson 7 words and the class slides."
PEOPLE += [["元真", "Yuánzhēn", "Youmei's classmate; her Korean friend is staying at the Tianmei Hotel"]]

LESSONS += [
 {
  "id": "L7", "num": "第七課", "name": "怎麼到飯店去？", "en": "How do we get to the hotel?",
  "src": "Book: 時代華語 1 第7課 (dialogues, reading, words, grammar) + the class slides",
  # words from the class slides; the book's word list (book1_raw.txt, L7) is added by build.py
  "words": ("怎麼 到 飯店 旅館 找 找到 找錢 韓國 等 坐 搭 捷運 地鐵 公車 巴士 車子 汽車 計程車 火車 高鐵 船 飛機 腳踏車 機車 摩托車 "
            "上車 下車 遠 近 從 走路 走 先 再 地圖 錶 手錶 時鐘 了 路 馬路 條 街 地方 附近 郵局 寄 信 封 信封 郵票 "
            "超級市場 超市 市場 一定 不一定 又 方便 舒服 線 藍 藍色 機場 飛機場 開車 司機 車站 站 架 飛 起飛 "
            "聽說 上學 上班 上樓 廁所 怎麼了 為什麼 住 懂 下雨 台北 台中 高雄 天空").split(),
  "texts": [
   {"title": "對話一 · 學校的下課休息時間 (Break time at school)", "note": "From the book, Lesson 7.", "lines": [
     ["友美", "元真，我們明天幾點去找妳的韓國朋友？", "Yuanzhen, what time are we going to meet up with your Korean friend tomorrow?"],
     ["元真", "我們下午四點要到天美飯店，她在那裡等我們。", "We have to arrive at Tianmei Hotel at 4 in the afternoon. She will wait for us there."],
     ["友美", "我們要怎麼去？坐捷運還是坐公車？", "How do we get there? By MRT or by bus?"],
     ["元真", "聽說那家飯店不遠，我想我們可以從學校走路去。", "I heard that the hotel is not far; I think we can walk there from school."],
     ["友美", "可是我不知道怎麼走，妳知道嗎？", "But I don't know how to get there. Do you?"],
     ["元真", "我也不知道。我們可以先上網看地圖。", "I don't know either. We can look at the map online first."],
     ["友美", "（看錶）啊！上課了！我們先上課吧。", "(Looking at her watch) Ah! Class has started! Let's go to class first."],
     ["元真", "好。", "Okay."],
   ]},
   {"title": "對話二 · 下課了，一起看地圖 (After class, looking at the map)", "note": "From the book, Lesson 7.", "lines": [
     ["元真", "友美，妳看，天美飯店在大學路。我現在知道怎麼走了。", "Look, Youmei. Tianmei Hotel is on Daxue Road. Now I know how to get there."],
     ["友美", "（看地圖）啊！天美飯店在這裡！我知道這個地方，附近有郵局跟超級市場。", "(Looking at the map) Ah! Here is Tianmei Hotel! I know this place. There's a post office and a supermarket nearby."],
     ["元真", "我想走路去一定沒問題。", "I think walking there will definitely be fine."],
     ["友美", "可是我覺得那裡有點兒遠，走路去太累了。", "But I think it's a bit far. Walking there is too tiring."],
     ["元真", "妳想怎麼去？", "How do you want to get there?"],
     ["友美", "坐捷運又方便又舒服，我們可以坐捷運。", "Taking the MRT is both convenient and comfortable. We can take the MRT."],
     ["元真", "好，我們明天坐捷運去吧。", "OK, let's take the MRT there tomorrow."],
   ]},
   {"title": "短文 · 從我家坐捷運很方便 (It's convenient to take the MRT from my home)", "note": "From the book, Lesson 7.", "lines": [
     ["", "我家附近有三條捷運線，一條紅的、一條綠的和一條藍的。", "There are three MRT lines near my home: a red one, a green one and a blue one."],
     ["", "我平常坐紅線去學校上課，週末也坐捷運去運動、看電影。", "I usually take the red line to school for class, and on weekends I also take the MRT to exercise or see movies."],
     ["", "朋友常來找我，他們都覺得坐捷運來我家，又快又方便。", "My friends often come to see me. They all think taking the MRT to my home is both fast and convenient."],
     ["", "從我家到機場也不遠，開車去、坐捷運去都可以。", "It's not far from my home to the airport either; you can drive or take the MRT."],
     ["", "機場附近的風景也很漂亮，我常常去看風景、看飛機。", "The scenery near the airport is beautiful too. I often go there to look at the view and watch the planes."],
   ]},
   {"title": "練習 · 他們怎麼去？ (How do they get there? — the slide pictures)", "note": L7_NOTE, "lines": [
     ["宜文", "林先生怎麼去美國？", "How is Mr. Lin getting to America?"],
     ["國安", "他坐飛機去美國。", "He's going to America by plane."],
     ["宜文", "王小姐怎麼去台北？", "How is Miss Wang getting to Taipei?"],
     ["國安", "她坐高鐵去台北，又快又舒服。", "She's taking the high-speed rail to Taipei. It's fast and comfortable."],
     ["宜文", "奶奶怎麼去圖書館？", "How does Grandma get to the library?"],
     ["國安", "她騎腳踏車去圖書館。", "She rides her bike to the library."],
     ["宜文", "你的韓國朋友怎麼來台灣？", "How is your Korean friend coming to Taiwan?"],
     ["國安", "她坐船來台灣。", "She's coming to Taiwan by boat."],
   ]},
   {"title": "練習 · 請問，火車站怎麼走？ (Excuse me, how do I get to the train station?)", "note": L7_NOTE, "lines": [
     ["國安", "請問，從這裡到火車站有多遠？", "Excuse me, how far is it from here to the train station?"],
     ["友美", "不遠，走路十分鐘就到了。", "Not far. It's ten minutes on foot."],
     ["國安", "火車站怎麼走？", "How do I get to the train station?"],
     ["友美", "你先到郵局，火車站就在郵局旁邊。", "Go to the post office first; the train station is right next to the post office."],
     ["國安", "謝謝！我也想先去超市買水，再坐火車。", "Thanks! I also want to go to the supermarket to buy water first, then take the train."],
     ["友美", "超市就在郵局附近，很方便。", "The supermarket is right near the post office. Very convenient."],
   ]},
   {"title": "練習 · 公車來了！ (The bus is here!)", "note": L7_NOTE, "lines": [
     ["中明", "宜文，妳在等誰？", "Yiwen, who are you waiting for?"],
     ["宜文", "我在等公車。我等了二十分鐘，公車還沒來。", "I'm waiting for the bus. I've waited twenty minutes and it still hasn't come."],
     ["中明", "妳要去哪裡？", "Where are you going?"],
     ["宜文", "我要先到車站，再坐火車去台中。", "I'm going to the station first, then taking the train to Taichung."],
     ["中明", "啊！公車來了！我們可以上車了。", "Ah! The bus is here! We can get on now."],
     ["宜文", "太好了！我們上車吧。", "Great! Let's get on."],
   ]},
   {"title": "練習 · 去郵局寄信 (Mailing a letter)", "note": L7_NOTE, "lines": [
     ["友美", "元真，我要到郵局去寄信，也要買一些信封。", "Yuanzhen, I'm going to the post office to mail a letter and buy some envelopes."],
     ["元真", "郵局遠不遠？", "Is the post office far?"],
     ["友美", "不遠，就在超級市場旁邊。", "Not far. It's right next to the supermarket."],
     ["元真", "我也要到超市去買蛋。我們一起去吧！", "I need to go to the supermarket for eggs too. Let's go together!"],
     ["友美", "好啊！我們怎麼去？", "Sure! How do we get there?"],
     ["元真", "坐公車又快又便宜，我們坐公車去。", "The bus is fast and cheap. Let's take the bus."],
   ]},
  ],
  "grammar": ["g_cong_dao", "g_zenme_qu", "g_le_change", "g_vo_topic", "g_you_you", "g_xian_zai", "g_yiding", "g_zenme_more"],
 },
]

GRAMMAR.update({
 "g_cong_dao": {"t": "從 / 到 + place + 來/去 — from / to a place", "p": "S + 從/到 + place + 來/去　·　S + 從 place₁ + 到 place₂ + 來/去 (+ what for)",
  "x": "從 = from, 到 = to. Both go with a place, and the place comes before 來 or 去: 他從學校來 (he comes from school), 我到他家去 (I go to his place). "
       "Put both together for a trip: 我從我家到學校去上課. What you go there to do comes last. 從…到… also works with time: 我從八點到四點上課.",
  "ex": [["他從學校來。", "He comes from school."], ["我到他家去。", "I'm going to his place."], ["你從哪裡來？— 我從飯店來。", "Where are you coming from? — From the hotel."],
         ["他不到圖書館去，他到朋友家去。", "He isn't going to the library; he's going to a friend's place."], ["我從我家到學校去上課。", "I go from home to school for class."],
         ["他今天從韓國到台灣來看朋友。", "Today he's coming from Korea to Taiwan to see friends."], ["我從早上八點到下午四點上課。", "I have class from 8 a.m. to 4 p.m."]],
  "wr": [["我去到學校。", "我到學校去。", "到 + place goes before 去."], ["我從學校。", "我從學校來。", "從 + place needs a verb after it (來, 去, 走…)."],
         ["我到學校從家去。", "我從家到學校去。", "From first, then to: 從 A 到 B."]],
  "tip": "從 A 到 B 有多遠？ = How far is it from A to B? · 從八點開始 = starting at eight"},
 "g_zenme_qu": {"t": "怎麼去？— how you get there: 坐 / 搭 / 騎 / 開車 / 走路", "p": "S + 怎麼 + 去/來/走？　·　S + 坐公車 / 騎腳踏車 / 開車 / 走路 + 去 (+ place)",
  "x": "Ask how someone travels with 怎麼 before 去, 來 or 走: 你怎麼去？ Answer with the way you travel BEFORE 去: 我坐公車去 (I go by bus). "
       "Use 坐 (or 搭) for things you sit in — bus, MRT, train, high-speed rail, taxi, plane, boat; 騎 for things you ride on — bike, scooter; 開車 to drive; 走路 on foot. "
       "With a place: 我坐公車去學校, or the book's pattern 我坐公車到學校去. To ask for directions: 去火車站怎麼走？",
  "ex": [["你怎麼去？— 我坐公車去。", "How do you get there? — By bus."], ["你們怎麼來？— 我們騎腳踏車來。", "How did you get here? — By bike."],
         ["我不要走路去，我要坐捷運去。", "I don't want to walk; I want to take the MRT."], ["他坐計程車到學校去。", "He takes a taxi to school."],
         ["林先生坐飛機去美國。", "Mr. Lin goes to America by plane."], ["去火車站怎麼走？", "How do I get to the train station?"], ["從這裡到學校怎麼走？", "How do I get from here to school?"]],
  "wr": [["我去學校坐公車。", "我坐公車去學校。", "How you travel comes before 去."], ["我坐腳踏車去。", "我騎腳踏車去。", "Bikes and scooters are 騎 (you ride on them)."],
         ["我走去路學校。", "我走路去學校。", "走路 stays together: 走路去."]],
  "tip": "坐/搭 bus, MRT, train, 高鐵, taxi, plane, boat · 騎 bike, scooter · 開 a car (開車) · 走路 on foot"},
 "g_le_change": {"t": "了 — a new situation (now …)", "p": "S + Vs + 了　·　S + (Vaux) + V + 了　·　不 … 了 = not any more",
  "x": "了 at the END of a sentence says something has changed — it's new now: 我餓了 = I'm hungry now (I wasn't before). 公車來了 = the bus is here now. "
       "With 不 it means 'not any more': 我累了，不想走了. This is not the Lesson 3 了 after a verb (a finished action: 我買了書).",
  "ex": [["我餓了，想吃一點東西。", "I'm hungry now; I want to eat something."], ["孩子都累了，我們一起休息吧！", "The kids are all tired now; let's rest together!"],
         ["啊！現在十點了！我的錶慢了。", "Oh! It's ten o'clock now! My watch is slow."], ["公車來了。我們可以上車了。", "The bus is here. We can get on now."],
         ["你十五歲了，應該學做飯了。", "You're fifteen now; you should learn to cook."], ["上課了，我們不可以玩手機了。", "Class has started; we can't play on our phones any more."],
         ["我累了，不想走了。", "I'm tired; I don't want to walk any more."], ["下雨了！", "It's started raining!"]],
  "wr": [["我很餓了。", "我餓了。", "Usually no 很 with this 了."], ["我不想走路了去。", "我不想走路去了。", "了 goes at the end of the sentence."]],
  "tip": "我懂了 = I get it now · 我知道了 = got it · 上課了 = class has started · 公車來了 = the bus is here"},
 "g_vo_topic": {"t": "Verb + object as the topic — 坐捷運很方便", "p": "V (+ O) + comment",
  "x": "An activity (a verb with its object) can be the subject of a sentence: 坐捷運很方便 = taking the MRT is convenient. Chinese needs no '-ing' or 'to'. "
       "You can also put a liked or known activity first and comment on it: 踢足球，我們都很喜歡.",
  "ex": [["坐捷運很方便。", "Taking the MRT is very convenient."], ["踢足球，我們都很喜歡。", "Playing soccer — we all like it a lot."], ["走路去太慢了！", "Walking there is too slow!"],
         ["唱歌、跳舞都很有趣。", "Singing and dancing are both fun."], ["跑步、游泳、打網球，我都喜歡。", "Running, swimming, tennis — I like them all."],
         ["我家附近有一家超級市場，買東西很方便。", "There's a supermarket near my home, so shopping is convenient."], ["打籃球我會，打網球我不會。", "Basketball I can play; tennis I can't."]],
  "wr": [["坐捷運是很方便。", "坐捷運很方便。", "No 是 before an adjective."], ["捷運坐很方便。", "坐捷運很方便。", "The verb comes before its object: 坐捷運."]],
  "tip": ""},
 "g_you_you": {"t": "又…又… — both … and …", "p": "S + 又 + Vs / V + 又 + Vs / V",
  "x": "又…又… gives two qualities of something, or two things someone can do: 台北的捷運又快又方便. Put an adjective or a verb after each 又 — never a noun. "
       "The two usually point the same way (both good: 又便宜又好吃, or both bad: 又熱又不舒服). On its own, 又 also means 'again' for something that already happened: 他昨天去了，今天又去了.",
  "ex": [["台北的捷運又快又方便。", "Taipei's MRT is both fast and convenient."], ["他又會唱歌又會畫畫。", "He can both sing and paint."],
         ["我同學的妹妹又可愛又漂亮。", "My classmate's little sister is both cute and pretty."], ["我現在又餓又渴，想喝一點兒茶、吃一點兒飯。", "I'm hungry and thirsty now; I want some tea and some food."],
         ["這種巧克力冰淇淋又便宜又好吃。", "This chocolate ice cream is both cheap and delicious."], ["這裡的夏天又熱又不舒服。", "Summer here is hot and uncomfortable."],
         ["我早上喝了咖啡，下午又喝了一杯。", "I had coffee this morning, and another cup again in the afternoon."]],
  "wr": [["他又老師又學生。", "他是老師，也是學生。", "又 is never followed by a noun."], ["這家餐廳又便宜和好吃。", "這家餐廳又便宜又好吃。", "Use 又 twice."],
         ["這家餐廳又好吃又貴。", "這家餐廳很好吃，可是很貴。", "Good + bad together: use 可是, not 又…又…."]],
  "tip": "又快又方便 · 又便宜又好吃 · 又大又甜 · 又熱又不舒服"},
 "g_xian_zai": {"t": "先…再… — first …, then …", "p": "S + 先 + V₁ (，) + 再 + V₂",
  "x": "先 marks what you do first and 再 what comes next. Each goes right before its own verb: 我先吃飯，再看電視. 先 alone: 你先走 (you go first), 我們先上網看地圖.",
  "ex": [["我先吃飯，再看電視。", "I'll eat first, then watch TV."], ["我們先回家，再去餐廳。", "We'll go home first, then go to the restaurant."], ["你先走，我等一下來。", "You go first; I'll come in a moment."],
         ["我們可以先上網看地圖。", "We can look at the map online first."], ["我先洗澡，再睡覺。", "I take a shower first, then go to bed."], ["我先起床，再刷牙。", "I get up first, then brush my teeth."]],
  "wr": [["我吃飯先，再看電視。", "我先吃飯，再看電視。", "先 goes before the verb."], ["我先吃飯，看電視再。", "我先吃飯，再看電視。", "再 goes before the verb too."]],
  "tip": "先 = first · 再 = then / again (Lesson 5: 再見, 再來)"},
 "g_yiding": {"t": "一定 — definitely · 不一定 — not necessarily", "p": "一定 + V　·　一定要 + V (must)　·　一定是 (must be)　·　不一定",
  "x": "一定 goes right before the verb (after the subject and the time word): 我明天一定來. 一定要 = must: 明天一定要來上課. 一定是 = must be (a sure guess): 他一定是台灣人. "
       "不一定 = not necessarily / not sure: 我明天不一定有空. 一定不 = definitely not: 他明天一定不會來.",
  "ex": [["我明天有空，一定可以去。", "I'm free tomorrow, so I can definitely go."], ["我想走路去一定沒問題。", "I think walking there will definitely be fine."],
         ["你一定會喜歡台灣。", "You'll definitely love Taiwan."], ["明天一定要來上課。", "You must come to class tomorrow."], ["他中文說得很好，一定是台灣人。", "He speaks Chinese really well; he must be Taiwanese."],
         ["我明天不一定有空。", "I'm not sure I'll be free tomorrow."], ["他明天一定不會來，他要上班。", "He definitely won't come tomorrow; he has to work."]],
  "wr": [["我一定明天會來。", "我明天一定會來。", "The time word comes before 一定."], ["他是一定台灣人。", "他一定是台灣人。", "一定 goes before 是."]],
  "tip": "Don't mix up 一定 (definitely), 一起 (together), 一共 (in total) and 一點 (a little)."},
 "g_zenme_more": {"t": "怎麼 — how? · 怎麼了？· 怎麼這麼…！", "p": "怎麼 + V？　·　怎麼了？　·　怎麼這麼 + Vs！　·　怎麼會…？",
  "x": "怎麼 + verb asks HOW to do something: 這個字怎麼念？ 怎麼了？ = what's wrong? / what happened? 怎麼這麼 + adjective shows surprise: 今天怎麼這麼熱！ (why is it so hot today!). "
       "怎麼會…？ = how come…? 怎麼還沒…？ = why hasn't … yet? Don't confuse with 怎麼樣 (how is it? / how about…?).",
  "ex": [["這首歌怎麼唱？", "How do you sing this song?"], ["這個字怎麼寫？", "How do you write this character?"], ["他怎麼了？他看起來不太高興。", "What's wrong with him? He doesn't look very happy."],
         ["今天怎麼這麼熱！", "Why is it so hot today!"], ["這件衣服怎麼這麼貴！", "How come this shirt is so expensive!"], ["你怎麼會說中文？", "How come you can speak Chinese?"],
         ["他怎麼還沒來？", "Why hasn't he come yet?"]],
  "wr": [["這個字怎麼樣念？", "這個字怎麼念？", "怎麼 + verb asks how; 怎麼樣 asks for an opinion."], ["你覺得這件衣服怎麼？", "你覺得這件衣服怎麼樣？", "An opinion needs 怎麼樣."]],
  "tip": "怎麼去 how to get there · 怎麼念 how to read it · 怎麼了 what's wrong · 怎麼樣 how is it / how about"},
})

DRILLS += [
 # 從 / 到 — the fill-ins from the class slides
 {"k": "choose", "g": "g_cong_dao", "q": "我每天＿＿家裡走路去學校。", "o": ["從", "到", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "他今天＿＿台北來高雄。", "o": ["從", "到", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我們坐高鐵＿＿台中。", "o": ["到", "從", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我每天坐公車＿＿學校上課。", "o": ["到", "從", "是"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "你可以＿＿這裡走到火車站。", "o": ["從", "到", "去"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "他昨天＿＿美國回台灣。", "o": ["從", "到", "去"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我們明天要＿＿台北玩。", "o": ["到", "從", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "小美＿＿學校走路回家。", "o": ["從", "到", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我每天＿＿早上八點開始上課。", "o": ["從", "到", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我們上課上＿＿下午五點。", "o": ["到", "從", "在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我每天＿＿家裡＿＿學校，走路要十分鐘。", "o": ["從 / 到", "到 / 從", "從 / 從"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "他＿＿台北＿＿高雄，坐高鐵要一個半小時。", "o": ["從 / 到", "到 / 從", "到 / 到"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "我們＿＿早上八點＿＿下午五點上課。", "o": ["從 / 到", "到 / 從", "在 / 到"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "＿＿學校＿＿火車站有多遠？", "o": ["從 / 到", "到 / 從", "在 / 在"], "a": 0},
 {"k": "choose", "g": "g_cong_dao", "q": "這家店＿＿星期一＿＿星期五都開門。", "o": ["從 / 到", "到 / 從", "在 / 到"], "a": 0},
 {"k": "fix", "g": "g_cong_dao", "o": ["我到學校去上課。", "我去到學校上課。", "我學校到去上課。"], "a": 0},
 {"k": "fix", "g": "g_cong_dao", "o": ["他從學校。", "他從學校來。", "他來從學校。"], "a": 1},
 {"k": "order", "g": "g_cong_dao", "t": ["我", "從", "我家", "到", "學校", "去", "上課"], "a": ["我從我家到學校去上課"], "en": "I go from home to school for class."},
 {"k": "order", "g": "g_cong_dao", "t": ["他", "今天", "從", "韓國", "到", "台灣", "來", "看朋友"], "a": ["他今天從韓國到台灣來看朋友", "今天他從韓國到台灣來看朋友"], "en": "Today he's coming from Korea to Taiwan to see friends."},
 {"k": "order", "g": "g_cong_dao", "t": ["他", "從", "旅館", "到", "我家", "來", "吃飯"], "a": ["他從旅館到我家來吃飯"], "en": "He comes from the inn to my place to eat."},
 # 怎麼去 + 走 / 走路 / 搭 / 騎 — the fill-ins from the class slides
 {"k": "choose", "g": "g_zenme_qu", "q": "我每天＿＿公車去學校。", "o": ["搭", "走路", "騎", "走"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "學校很近，我＿＿去。", "o": ["走路", "搭", "騎", "走"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "他每天＿＿腳踏車上班。", "o": ["騎", "搭", "走路", "走"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "現在很晚了，我們＿＿吧！", "o": ["走", "騎", "搭", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "我爸爸每天＿＿捷運去公司。", "o": ["搭", "騎", "走", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "他喜歡＿＿機車去買東西。", "o": ["騎", "搭", "走", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "我家不遠，可以＿＿回家。", "o": ["走路", "騎", "搭", "走"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "明天我要＿＿飛機去日本。", "o": ["搭", "騎", "走", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "你先＿＿，我等一下來。", "o": ["走", "搭", "騎", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "A：你怎麼去台北？　B：我＿＿高鐵去。", "o": ["搭", "騎", "走", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "A：你會＿＿機車嗎？　B：會，我每天都騎。", "o": ["騎", "搭", "走", "走路"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "A：你要去哪裡？　B：我要＿＿了，明天見！", "o": ["走", "走路", "搭", "騎"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "A：你＿＿去學校？　B：我騎機車去。", "o": ["怎麼", "怎麼樣", "什麼"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "林先生怎麼去美國？— 他＿＿飛機去美國。", "o": ["坐", "騎", "開"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "奶奶怎麼去圖書館？— 她＿＿腳踏車去圖書館。", "o": ["騎", "坐", "開"], "a": 0},
 {"k": "choose", "g": "g_zenme_qu", "q": "我爸爸每天＿＿車上班。", "o": ["開", "騎", "走"], "a": 0},
 {"k": "fix", "g": "g_zenme_qu", "o": ["我去學校坐公車。", "我坐公車去學校。", "我坐公車學校去。"], "a": 1},
 {"k": "fix", "g": "g_zenme_qu", "o": ["我坐腳踏車去公園。", "我騎腳踏車去公園。", "我開腳踏車去公園。"], "a": 1},
 {"k": "order", "g": "g_zenme_qu", "t": ["你", "怎麼", "到", "他家", "去"], "a": ["你怎麼到他家去"], "en": "How are you getting to his place?", "end": "？"},
 {"k": "order", "g": "g_zenme_qu", "t": ["他", "每天", "坐公車", "到", "學校", "來"], "a": ["他每天坐公車到學校來", "每天他坐公車到學校來"], "en": "He comes to school by bus every day."},
 {"k": "order", "g": "g_zenme_qu", "t": ["我", "不要", "走路", "到", "那家", "飯店", "去"], "a": ["我不要走路到那家飯店去"], "en": "I don't want to walk to that hotel."},
 {"k": "order", "g": "g_zenme_qu", "t": ["他", "坐", "計程車", "到", "學校", "去"], "a": ["他坐計程車到學校去"], "en": "He takes a taxi to school."},
 # 了 — a new situation
 {"k": "choose", "g": "g_le_change", "q": "昨天二十五度，今天三十度。今天天氣熱＿＿。", "o": ["了", "嗎", "的"], "a": 0},
 {"k": "choose", "g": "g_le_change", "q": "以前一碗牛肉麵八十塊，現在一百二十塊。現在東西都＿＿。", "o": ["貴了", "便宜了", "貴嗎"], "a": 0},
 {"k": "choose", "g": "g_le_change", "q": "老師：你們懂了嗎？　學生：＿＿！謝謝老師。", "o": ["懂了", "懂嗎", "不懂了"], "a": 0},
 {"k": "choose", "g": "g_le_change", "q": "我累了，不想走＿＿。", "o": ["了", "的", "嗎"], "a": 0},
 {"k": "choose", "g": "g_le_change", "q": "啊！現在十點了！我的錶慢＿＿。", "o": ["了", "的", "得"], "a": 0},
 {"k": "choose", "g": "g_le_change", "q": "公車來了，我們可以上車＿＿。", "o": ["了", "呢", "的"], "a": 0},
 {"k": "fix", "g": "g_le_change", "o": ["我很餓了。", "我餓了。", "我了餓。"], "a": 1},
 {"k": "fix", "g": "g_le_change", "o": ["上課了，我們不可以玩手機了。", "上課了，我們不可以了玩手機。", "了上課，我們不可以玩手機。"], "a": 0},
 {"k": "order", "g": "g_le_change", "t": ["你", "十五歲", "了", "應該", "學做飯", "了"], "a": ["你十五歲了應該學做飯了"], "en": "You're fifteen now — you should learn to cook."},
 # verb + object as the topic
 {"k": "choose", "g": "g_vo_topic", "q": "＿＿很快，也很舒服，我不想走路去。", "o": ["坐捷運", "捷運坐", "坐在捷運"], "a": 0},
 {"k": "choose", "g": "g_vo_topic", "q": "我家附近有一家超級市場，＿＿很方便。", "o": ["買東西", "東西買", "買了東西"], "a": 0},
 {"k": "choose", "g": "g_vo_topic", "q": "＿＿我會，打網球我不會。", "o": ["打籃球", "籃球打", "打了籃球"], "a": 0},
 {"k": "fix", "g": "g_vo_topic", "o": ["坐捷運是很方便。", "坐捷運很方便。", "捷運坐很方便。"], "a": 1},
 {"k": "order", "g": "g_vo_topic", "t": ["坐", "捷運", "很", "方便"], "a": ["坐捷運很方便"], "en": "Taking the MRT is very convenient."},
 # 又…又…
 {"k": "choose", "g": "g_you_you", "q": "這種巧克力冰淇淋＿＿便宜＿＿好吃。", "o": ["又 / 又", "也 / 也", "很 / 很"], "a": 0},
 {"k": "choose", "g": "g_you_you", "q": "A：你喜歡夏天嗎？　B：這裡的夏天＿＿，我不喜歡。", "o": ["又熱又不舒服", "又熱又舒服", "又熱和不舒服"], "a": 0},
 {"k": "choose", "g": "g_you_you", "q": "A：你覺得這家餐廳的牛肉麵怎麼樣？　B：＿＿。", "o": ["又好吃又便宜", "又好吃和便宜", "又好吃又不好吃"], "a": 0},
 {"k": "choose", "g": "g_you_you", "q": "他＿＿喜歡游泳＿＿喜歡曬太陽，每個週末都去海邊。", "o": ["又 / 又", "都 / 都", "很 / 也"], "a": 0},
 {"k": "choose", "g": "g_you_you", "q": "我早上喝了咖啡，下午＿＿喝了一杯。", "o": ["又", "再", "都"], "a": 0},
 {"k": "fix", "g": "g_you_you", "o": ["他又老師又學生。", "他又會唱歌又會畫畫。", "他又唱歌和畫畫。"], "a": 1},
 {"k": "fix", "g": "g_you_you", "o": ["台北的捷運又快又方便。", "台北的捷運又快和方便。", "台北的捷運又快很方便。"], "a": 0},
 {"k": "order", "g": "g_you_you", "t": ["這家", "餐廳", "又", "便宜", "又", "好吃"], "a": ["這家餐廳又便宜又好吃", "這家餐廳又好吃又便宜"], "en": "This restaurant is cheap and delicious."},
 {"k": "order", "g": "g_you_you", "t": ["他的", "房間", "又", "大", "又", "漂亮"], "a": ["他的房間又大又漂亮", "他的房間又漂亮又大"], "en": "His room is big and pretty."},
 {"k": "order", "g": "g_you_you", "t": ["這件", "衣服", "又", "漂亮", "又", "便宜"], "a": ["這件衣服又漂亮又便宜", "這件衣服又便宜又漂亮"], "en": "This piece of clothing is pretty and cheap."},
 {"k": "order", "g": "g_you_you", "t": ["這本", "書", "又", "好看", "又", "有意思"], "a": ["這本書又好看又有意思", "這本書又有意思又好看"], "en": "This book is good and interesting."},
 {"k": "order", "g": "g_you_you", "t": ["坐", "高鐵", "又", "快", "又", "舒服"], "a": ["坐高鐵又快又舒服", "坐高鐵又舒服又快"], "en": "Taking the HSR is fast and comfortable."},
 # 先…再…
 {"k": "choose", "g": "g_xian_zai", "q": "我們＿＿回家，＿＿去餐廳。", "o": ["先 / 再", "再 / 先", "也 / 都"], "a": 0},
 {"k": "choose", "g": "g_xian_zai", "q": "我很餓，我們可以＿＿吃飯嗎？", "o": ["先", "再", "又"], "a": 0},
 {"k": "fix", "g": "g_xian_zai", "o": ["我先吃飯，再看電視。", "我吃飯先，再看電視。", "我先吃飯，看電視再。"], "a": 0},
 {"k": "order", "g": "g_xian_zai", "t": ["我", "先", "洗澡", "再", "睡覺"], "a": ["我先洗澡再睡覺"], "en": "I take a shower first, then go to bed."},
 {"k": "order", "g": "g_xian_zai", "t": ["我", "先", "念書", "再", "玩手機"], "a": ["我先念書再玩手機"], "en": "I study first, then play on my phone."},
 {"k": "order", "g": "g_xian_zai", "t": ["我", "先", "起床", "再", "刷牙"], "a": ["我先起床再刷牙"], "en": "I get up first, then brush my teeth."},
 {"k": "order", "g": "g_xian_zai", "t": ["我", "先", "吃早餐", "再", "去學校"], "a": ["我先吃早餐再去學校"], "en": "I eat breakfast first, then go to school."},
 {"k": "order", "g": "g_xian_zai", "t": ["你", "先", "坐下", "再", "慢慢說"], "a": ["你先坐下再慢慢說"], "en": "Sit down first, then tell me slowly."},
 # 一定 / 不一定
 {"k": "choose", "g": "g_yiding", "q": "我明天有空，＿＿可以去。", "o": ["一定", "一起", "一共"], "a": 0},
 {"k": "choose", "g": "g_yiding", "q": "他中文說得很好，＿＿是台灣人。", "o": ["一定", "一起", "一點"], "a": 0},
 {"k": "choose", "g": "g_yiding", "q": "我明天＿＿有空，可能要上班。", "o": ["不一定", "一定", "一共"], "a": 0},
 {"k": "choose", "g": "g_yiding", "q": "明天＿＿要來上課！", "o": ["一定", "一起", "一點"], "a": 0},
 {"k": "fix", "g": "g_yiding", "o": ["我一定明天會來。", "我明天一定會來。", "我明天會一定來。"], "a": 1},
 {"k": "fix", "g": "g_yiding", "o": ["他是一定台灣人。", "他一定是台灣人。", "一定他是台灣人。"], "a": 1},
 # 怎麼 / 怎麼了 / 怎麼這麼 / 怎麼樣
 {"k": "choose", "g": "g_zenme_more", "q": "你＿＿了？你看起來不太高興。", "o": ["怎麼", "什麼", "怎麼樣"], "a": 0},
 {"k": "choose", "g": "g_zenme_more", "q": "今天＿＿這麼熱！", "o": ["怎麼", "什麼", "哪裡"], "a": 0},
 {"k": "choose", "g": "g_zenme_more", "q": "這個字＿＿念？", "o": ["怎麼", "什麼", "哪"], "a": 0},
 {"k": "choose", "g": "g_zenme_more", "q": "你覺得這件衣服＿＿？", "o": ["怎麼樣", "怎麼", "什麼"], "a": 0},
 {"k": "fix", "g": "g_zenme_more", "o": ["這個字怎麼樣念？", "這個字怎麼念？", "怎麼這個字念？"], "a": 1},
]

# questions on the Lesson 7 texts (L7-0 dialogue 1 … L7-6 the post office), several from the class slides
READING += [
 {"text": "L7-0", "q": "她們明天幾點要到天美飯店？", "o": ["下午四點", "上午十點", "晚上七點"], "a": 0},
 {"text": "L7-0", "q": "她們明天要去找誰？", "o": ["元真的韓國朋友", "友美的老師", "元真的媽媽"], "a": 0},
 {"text": "L7-0", "q": "元真想她們可以怎麼去？", "o": ["從學校走路去", "坐計程車去", "開車去"], "a": 0},
 {"text": "L7-0", "q": "她們為什麼要先上網看地圖？", "o": ["她們不知道怎麼走", "她們想坐捷運", "飯店很近"], "a": 0},
 {"text": "L7-1", "q": "天美飯店在哪裡？", "o": ["大學路", "學校旁邊", "郵局裡面"], "a": 0},
 {"text": "L7-1", "q": "飯店附近有什麼？", "o": ["郵局跟超級市場", "捷運站跟公園", "餐廳跟咖啡廳"], "a": 0},
 {"text": "L7-1", "q": "友美為什麼不想走路去？", "o": ["她覺得有點兒遠，走路去太累了", "她不知道怎麼走", "她想坐公車"], "a": 0},
 {"text": "L7-1", "q": "她們明天怎麼去？", "o": ["坐捷運", "走路", "坐公車"], "a": 0},
 {"text": "L7-2", "q": "他家附近有幾條捷運線？", "o": ["三條", "兩條", "一條"], "a": 0},
 {"text": "L7-2", "q": "他平常怎麼去學校？", "o": ["坐紅線捷運", "坐公車", "開車"], "a": 0},
 {"text": "L7-2", "q": "他的朋友覺得坐捷運去他家怎麼樣？", "o": ["又快又方便", "又遠又貴", "太累了"], "a": 0},
 {"text": "L7-2", "q": "從他家到機場可以怎麼去？", "o": ["開車或坐捷運", "只可以走路", "坐飛機"], "a": 0},
 {"text": "L7-2", "q": "他為什麼常常去機場？", "o": ["去看風景、看飛機", "坐飛機去日本", "去機場買東西"], "a": 0},
 {"text": "L7-3", "q": "王小姐怎麼去台北？", "o": ["坐高鐵", "坐飛機", "坐船"], "a": 0},
 {"text": "L7-3", "q": "奶奶怎麼去圖書館？", "o": ["騎腳踏車", "走路", "坐計程車"], "a": 0},
 {"text": "L7-3", "q": "韓國朋友怎麼來台灣？", "o": ["坐船", "坐火車", "開車"], "a": 0},
 {"text": "L7-4", "q": "從這裡到火車站有多遠？", "o": ["走路十分鐘", "坐公車一個小時", "很遠"], "a": 0},
 {"text": "L7-4", "q": "火車站在哪裡？", "o": ["郵局旁邊", "超市裡面", "學校後面"], "a": 0},
 {"text": "L7-5", "q": "宜文等了多久？", "o": ["二十分鐘", "十分鐘", "一個小時"], "a": 0},
 {"text": "L7-5", "q": "宜文要先去哪裡？", "o": ["車站", "台中", "學校"], "a": 0},
 {"text": "L7-6", "q": "友美去郵局做什麼？", "o": ["寄信，也買信封", "買蛋", "坐公車"], "a": 0},
 {"text": "L7-6", "q": "她們怎麼去？為什麼？", "o": ["坐公車，因為又快又便宜", "走路，因為很近", "坐捷運，因為很舒服"], "a": 0},
]

MNEMO += """
到|至 arrive + 刂 knife|You have arrived (至) — the knife (刂) marks the spot. 到 = to arrive; to (a place).
店|广 shelter + 占 occupy|A shelter (广) where you occupy (占) a spot to sell things: shop. 飯店 = hotel.
旅|方 flag + people walking|People walking under one flag (方): to travel. 旅館 = inn, hotel.
找|扌 hand + 戈 weapon|Your hand (扌) reaches for the weapon (戈) you put down: to look for. 找朋友 = visit a friend.
韓|卓 tall + 韋 leather|Tall (卓) and dressed in leather (韋): 韓國, Korea.
等|竹 bamboo + 寺 temple|People waited at the temple (寺) holding bamboo (竹) number slips: to wait.
坐|土 ground + 人人 two people|Two people (人人) sitting on the ground (土): to sit. 坐公車 = ride the bus.
捷|扌 hand + 疌 quick|Quick (疌) hands: fast. 捷運 = rapid transit, the MRT.
鐵|金 metal + 戴|Metal (金): iron. 地鐵 = underground iron road = subway; 高鐵 = high-speed rail.
公|八 split + 厶 private|Splitting up (八) what was private (厶) so everyone shares it: public. 公車 = public car = bus.
車|a cart seen from above|The box, the axle (the long line) and two wheels: cart, car.
汽|氵 water + 气 steam|Water (氵) turning into steam (气): 汽車 = steam car = car.
計|言 speech + 十 ten|Saying (言) the numbers up to ten (十): to count. 計程車 = the car that counts the trip = taxi.
程|禾 grain + 呈 show|Grain (禾) laid out in a row: a stretch of road, a trip. 計程車 = taxi.
火|flames|Flames rising from a fire: fire. 火車 = fire car (from steam trains) = train.
遠|辶 walk + 袁|A long, long walk (辶): far.
近|辶 walk + 斤 axe|Only an axe's throw (斤) of walking (辶): near.
從|彳 step + 从 one person after another|One person following (从) another along the road (彳): from; to follow.
走|土 swinging arms + 止 foot|A person swinging their arms on moving feet (止): to walk; to leave.
錶|金 metal + 表 show|A metal (金) thing that shows (表) the time: watch.
了|a child wrapped up|A baby all wrapped up — finished: 了 marks a change (我餓了) or a finished action.
條|攸 + 木 wood|A long, thin strip of wood (木): measure word for long things — 一條路, 一條魚, 一條線.
街|行 road + 圭 earth|Earth (圭) right in the middle of a road (行): street.
方|a plough|A square plough: square, direction, place. 地方 = place; 方便 = convenient.
附|阝 hill + 付 hand over|Handed (付) right next to the hill (阝): attached, near. 附近 = nearby.
郵|垂 hanging + 阝 town|The town (阝) office where letters hang waiting (垂): post. 郵局 = post office.
局|尸 + 句|An office with its rules (句): bureau. 郵局 = post office.
寄|宀 roof + 奇 strange|Sending something strange (奇) out from under your roof (宀): to mail.
信|亻 person + 言 words|A person (亻) who stands by their words (言): trust; a letter. 寄信 = mail a letter.
封|圭 earth + 寸 hand|A hand (寸) pressing earth (圭) to seal it: to seal; 一封信 = a letter.
超|走 walk + 召 call|Walking (走) past whatever calls (召) you: to go beyond, super. 超級市場 = supermarket.
級|糸 thread + 及 reach|Threads (糸) ranked one after another: level, grade. 超級 = super.
市|亠 + 巾 cloth|A cloth (巾) hung up under a roof as a stall: market, city. 市場 = market.
定|宀 roof + 正 right|Everything set right (正) under the roof (宀): settled, fixed. 一定 = definitely.
又|a right hand|A hand that comes back again and again: again; 又…又… = both … and.
便|亻 person + 更 change|A person (亻) changing (更) things to make them easy: convenient (方便). Also 便宜 piányí, cheap.
舒|舍 house + 予 give|A house (舍) that gives (予) you room to stretch out: relaxed. 舒服 = comfortable.
線|糸 thread + 泉 spring|A thread (糸) as long as the water from a spring (泉): line. 捷運線 = MRT line.
司|a mouth giving orders|Someone who gives orders with their mouth (口): to be in charge. 司機 = driver.
站|立 stand + 占 a spot|Standing (立) on your spot (占): to stand; a station. 車站 = station.
飛|a bird's wings|Two wings beating up and down: to fly. 飛機 = flying machine = plane.
架|加 add + 木 wood|Pieces of wood (木) added (加) together: a frame. Measure word for planes: 一架飛機.
船|舟 boat + 㕣|A boat (舟) with people on it: ship, boat.
搭|扌 hand + 荅|Put your hand (扌) up to get a ride: 搭公車 = take the bus.
鐘|金 metal + 童 child|The metal (金) bell that calls the children (童): bell, clock. 時鐘 = clock.
"""
