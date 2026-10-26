# -*- coding: utf-8 -*-
# Lessons 4–6 of 時代華語 1. Titles and word lists follow the book; the dialogues and texts below are
# practice texts written for this site with the book's vocabulary (not the book's own dialogues).
from content import LESSONS, GRAMMAR, DRILLS, READING, MNEMO

PRACTICE_NOTE = "Practice text written for this site using the Lesson's words — your book has the official dialogue."
L6_NOTE = "Extra practice text written for this site with the Lesson 6 words."

LESSONS += [
 {
  "id": "L4", "num": "第四課", "name": "你要咖啡還是茶？", "en": "Would you like coffee or tea?",
  "src": "Book: 時代華語 1 · Lesson 4",
  "words": "老闆".split(),
  "texts": [
   {"title": "會話一 · 天氣好熱！ (It's so hot!)", "note": PRACTICE_NOTE, "lines": [
     ["國安", "今天天氣好熱！", "It's so hot today!"],
     ["友美", "是啊，太熱了。我好渴，也很餓。", "Yes, it's too hot. I'm really thirsty, and hungry too."],
     ["國安", "我知道一家餐廳，牛肉麵很好吃。我們一起去，好不好？", "I know a restaurant with delicious beef noodles. Let's go together, OK?"],
     ["友美", "好啊！我也想喝一點兒飲料。", "Sure! I'd also like something to drink."],
     ["國安", "你要喝咖啡還是茶？", "Do you want coffee or tea?"],
     ["友美", "天氣太熱了，我不想喝咖啡。我要一杯綠茶。", "It's too hot, I don't want coffee. I'll have a green tea."],
   ]},
   {"title": "會話二 · 在餐廳 (At the restaurant)", "note": PRACTICE_NOTE, "lines": [
     ["老闆", "歡迎！請問，幾位？", "Welcome! How many people?"],
     ["國安", "兩位。", "Two."],
     ["老闆", "你們要點什麼？", "What would you like to order?"],
     ["國安", "我要一碗牛肉麵和一杯紅茶。", "I'd like a bowl of beef noodles and a black tea."],
     ["友美", "請給我一碗牛肉麵、一杯綠茶。", "A bowl of beef noodles and a green tea for me, please."],
     ["老闆", "好。……一共四百二十塊。", "OK. … That's 420 dollars altogether."],
     ["國安", "給您五百塊。", "Here's 500."],
     ["老闆", "找您八十塊。謝謝！", "Here's 80 in change. Thank you!"],
     ["友美", "這家餐廳的牛肉麵好好吃！", "The beef noodles here are so good!"],
   ]},
   {"title": "短文 · 我最喜歡秋天 (I like autumn best)", "note": PRACTICE_NOTE, "lines": [
     ["", "台灣的夏天天氣好熱，冬天不太冷。", "Summer in Taiwan is really hot, and winter isn't very cold."],
     ["", "春天和秋天的天氣最好，不冷也不熱。", "Spring and autumn have the best weather — not cold and not hot."],
     ["", "夏天，我每天都喝很多水和果汁。", "In summer I drink lots of water and juice every day."],
     ["", "台灣的飲料店很多，有的賣果汁，有的賣珍珠奶茶。", "Taiwan has lots of drink shops; some sell juice, some sell bubble tea."],
     ["", "一杯珍珠奶茶五十多塊，不太貴。", "A bubble tea is fifty-something dollars — not too expensive."],
     ["", "我最喜歡秋天，秋天我常常和朋友一起去餐廳吃飯。", "I like autumn best. In autumn I often go to restaurants with friends."],
   ]},
  ],
  "grammar": ["g_haishi", "g_hao_very", "g_tai_le", "g_yidianr", "g_zui", "g_order", "g_bignum", "g_youde", "g_mei_dou"],
 },
 {
  "id": "L5", "num": "第五課", "name": "我的錢包在哪裡？", "en": "Where is my wallet?",
  "src": "Book: 時代華語 1 · Lesson 5",
  "words": [],
  "texts": [
   {"title": "會話一 · 去喝下午茶吧！ (Let's have afternoon tea!)", "note": PRACTICE_NOTE, "lines": [
     ["宜文", "中明，你下午有空嗎？", "Zhongming, are you free this afternoon?"],
     ["中明", "有空。你想做什麼？", "Yes. What do you want to do?"],
     ["宜文", "學校旁邊有一家咖啡廳，那裡的巧克力蛋糕很好吃。我們去喝下午茶吧！", "There's a café next to school with great chocolate cake. Let's go for afternoon tea!"],
     ["中明", "好啊！我們幾點去？", "Sure! What time shall we go?"],
     ["宜文", "兩點半，好不好？", "Half past two, OK?"],
     ["中明", "沒問題。啊，我的錢包在哪裡？", "No problem. Oh, where's my wallet?"],
     ["宜文", "在桌子上面嗎？", "Is it on the table?"],
     ["中明", "不在桌子上面。", "It's not on the table."],
     ["宜文", "你看，在椅子下面！", "Look, it's under the chair!"],
     ["中明", "太好了！謝謝你幫我找。", "Great! Thanks for helping me look."],
   ]},
   {"title": "會話二 · 宜文的新家 (Yiwen's new home)", "note": PRACTICE_NOTE, "lines": [
     ["友美", "你的新家很漂亮！有幾間房間？", "Your new home is beautiful! How many rooms are there?"],
     ["宜文", "有三間房間，還有一間客廳跟一間廚房。", "Three bedrooms, plus a living room and a kitchen."],
     ["友美", "你的房間在哪裡？", "Where is your room?"],
     ["宜文", "在客廳後面。我的房間裡有一張床、一張桌子跟兩張椅子。", "Behind the living room. In my room there's a bed, a table and two chairs."],
     ["友美", "客廳裡有沙發嗎？", "Is there a sofa in the living room?"],
     ["宜文", "有，客廳裡有一張大沙發，沙發前面有一台電視機。", "Yes, there's a big sofa, and a TV in front of it."],
     ["友美", "你家有貓嗎？", "Do you have a cat?"],
     ["宜文", "有一隻。你看，我的貓在窗戶前面曬太陽。", "One. Look, my cat is sitting in the sun in front of the window."],
   ]},
   {"title": "短文 · 中明的家 (Zhongming's home)", "note": PRACTICE_NOTE, "lines": [
     ["", "中明的家是一棟不大的房子。", "Zhongming's home is a house that isn't big."],
     ["", "房子外面有很多花，很漂亮。", "Outside the house there are lots of flowers. It's very pretty."],
     ["", "客廳裡有一張沙發，沙發旁邊有一張小桌子。", "In the living room there's a sofa, with a small table next to it."],
     ["", "中明的房間在廚房旁邊，他常常在房間裡看書、聽音樂。", "Zhongming's room is next to the kitchen. He often reads and listens to music in his room."],
     ["", "中明家有一隻狗跟兩隻鳥。狗常常在門外面睡覺。", "His family has a dog and two birds. The dog often sleeps outside the door."],
   ]},
  ],
  "grammar": ["g_location", "g_you_exist", "g_nali", "g_ba", "g_youkong", "g_keshi", "g_bang", "g_zai_again", "g_he_gen"],
 },
 {
  "id": "L6", "num": "第六課", "name": "週末去打網球吧！", "en": "Let's play tennis this weekend!",
  "src": "Slides: 第六課 週末去打網球吧！ + book word list",
  "words": ("邊 旁邊 右邊 左邊 海邊 河邊 湖邊 路邊 海 游泳 游泳池 泳衣 風 風景 會 下雨 得 不太好 跑 跑步 慢跑 慢 快 慢慢 "
            "說 說話 打 網球 打電腦 打電話 打人 棒球 籃球 寫字 漢字 踢 足球 唱歌 跳舞 聽 聽說 聽見 聽到 音樂 "
            "有趣 有意思 不好看 無趣 電影 電影院 看電影 部 覺得 休息 有點 有一點 不要 玩 上網 網路 網址 "
            "應該 可以 不可以 不行 騎 腳踏車 自行車 摩托車 機車 馬 輛 開車 只 堂 這兩天 前天 後天 幾天 每天 天天 "
            "唱 歌 首 興趣 感興趣 愛好 平時 運動 有時候 高興 比賽 場 旅行 拍照 遊戲 玩遊戲 出去 畫畫").split(),
  "texts": [
   {"title": "會話一 · 我想去游泳 (I want to go swimming)", "note": "From the Lesson 6 slides.", "lines": [
     ["國安", "今天天氣不錯，海邊的風景也很漂亮，我想去游泳，妳們想去嗎？", "The weather is nice today and the view at the beach is beautiful too. I want to go swimming — do you two want to go?"],
     ["友美", "我不會游泳。宜文，妳會游泳嗎？", "I can't swim. Yiwen, can you swim?"],
     ["宜文", "我會游泳，可是游得不太好。", "I can swim, but not very well."],
     ["國安", "我們去跑步，怎麼樣？", "How about we go running?"],
     ["友美", "我不喜歡跑步，我跑步跑得很慢。", "I don't like running. I run very slowly."],
     ["宜文", "打網球怎麼樣？", "How about tennis?"],
     ["宜文", "中明說妳的網球打得很好，我們一起去打吧。", "Zhongming says you play tennis really well. Let's go play together."],
   ]},
   {"title": "會話二 · 我想回家休息 (I want to go home and rest)", "note": "From the Lesson 6 slides.", "lines": [
     ["國安", "聽說這部電影很有趣，我們晚上一起去看，好不好？", "I heard this movie is really interesting. Let's go see it together tonight, OK?"],
     ["中明", "我覺得有一點兒累，我想回家休息。", "I feel a little tired. I want to go home and rest."],
     ["國安", "你不要常常在家上網、看電腦、玩手機，應該去運動。", "Don't stay home so often going online, looking at the computer and playing on your phone. You should go exercise."],
     ["國安", "明天我有空，我們可以一起去騎腳踏車。", "I'm free tomorrow. We can go ride bikes together."],
     ["中明", "可是我只想聽音樂、睡覺。", "But I only want to listen to music and sleep."],
     ["國安", "後天去呢？", "What about the day after tomorrow?"],
     ["中明", "這兩天天氣有點兒冷，我們週末去，好嗎？", "The weather's a bit cold these couple of days. Let's go on the weekend, OK?"],
   ]},
   {"title": "短文 · 我的興趣 (My hobbies — 友美 writes)", "note": "From the Lesson 6 slides.", "lines": [
     ["", "我有幾個好朋友，我們都喜歡學中文、聽音樂、唱歌。", "I have a few good friends. We all like studying Chinese, listening to music and singing."],
     ["", "中明最愛唱歌，他的中文歌唱得很好。", "Zhongming loves singing most. He sings Chinese songs really well."],
     ["", "平時我們都有點兒忙，可是週末我們常一起去運動。", "Usually we're all a bit busy, but on weekends we often go exercise together."],
     ["", "宜文游泳游得不錯，國安的籃球打得很好，我喜歡打網球。", "Yiwen swims pretty well, Guoan plays basketball really well, and I like playing tennis."],
     ["", "有時候我們也一起去看運動比賽。", "Sometimes we also go watch sports games together."],
     ["", "有這幾個好朋友，我真高興！", "I'm so happy to have these good friends!"],
   ]},
   {"title": "練習 · 去打網球吧！ (Let's play tennis!)", "note": L6_NOTE, "lines": [
     ["國安", "這個週末天氣很好，我們去打網球吧！", "The weather's nice this weekend. Let's go play tennis!"],
     ["中明", "我不會打網球，可是我會打籃球。", "I can't play tennis, but I can play basketball."],
     ["國安", "沒問題，我可以教你。", "No problem, I can teach you."],
     ["中明", "你網球打得怎麼樣？", "How well do you play tennis?"],
     ["國安", "我打得不太好，可是很喜歡打。", "I don't play very well, but I really like playing."],
     ["中明", "好，我們星期六早上幾點去？", "OK, what time shall we go on Saturday morning?"],
     ["國安", "九點，我們在學校見吧。", "Nine. Let's meet at school."],
   ]},
   {"title": "練習 · 看電影 (Seeing a movie)", "note": L6_NOTE, "lines": [
     ["友美", "宜文，後天你有空嗎？我們一起去看電影，怎麼樣？", "Yiwen, are you free the day after tomorrow? How about seeing a movie together?"],
     ["宜文", "好啊！聽說那部電影很有趣。", "Sure! I heard that movie is really fun."],
     ["友美", "看電影以後，我們去海邊騎腳踏車吧！", "After the movie, let's ride bikes at the beach!"],
     ["宜文", "我覺得有一點累，不想騎腳踏車。", "I feel a bit tired. I don't want to ride a bike."],
     ["友美", "你應該常常運動！", "You should exercise more often!"],
     ["宜文", "好吧，那我們去海邊看風景。", "OK then, let's go look at the view by the sea."],
   ]},
   {"title": "練習 · 唱歌跟跳舞 (Singing and dancing)", "note": L6_NOTE, "lines": [
     ["", "我的興趣是唱歌跟跳舞。", "My hobbies are singing and dancing."],
     ["", "我平常每個星期都去學唱歌，有時候也去跳舞。", "I usually go to singing class every week, and sometimes I go dancing too."],
     ["", "我唱歌唱得不錯，可是跳舞跳得不太好。", "I sing pretty well, but I don't dance very well."],
     ["", "我的朋友中明很喜歡畫畫，他畫得很好。", "My friend Zhongming loves drawing. He draws really well."],
     ["", "下個星期學校有唱歌比賽，我很高興。", "Next week the school has a singing contest. I'm really happy."],
   ]},
  ],
  "grammar": ["g_hui", "g_de_comp", "g_ba", "g_juede", "g_youdian", "g_yinggai_keyi", "g_zhi", "g_buyao_imp", "g_ting", "g_shuohua",
              "g_da_qi", "g_days", "g_freq", "g_xingqu", "g_ji_several", "g_zhen"],
 },
]
# lessons 4–6 grammar that used to be "bonus" now belongs to a lesson
for g in ["g_hui", "g_de_comp", "g_tai_le", "g_youdian", "g_haishi", "g_location"]:
    GRAMMAR[g]["bonus"] = False
GRAMMAR["g_location"].update({"t": "N + 在 + place + 上面/下面/裡面… — where something is",
  "p": "Thing + 在 + Place + 上面/下面/裡面/外面/前面/後面/旁邊",
  "x": "To say where something is: thing first, then 在, then the place, then the position word. The position word comes AFTER the place (English puts it before). 裡 can be short: 房間裡. Ask with 在哪裡？",
  "ex": [["我的錢包在哪裡？", "Where is my wallet?"], ["你的筆在那本書上面。", "Your pen is on that book."], ["錢包在椅子下面。", "The wallet is under the chair."], ["我的房間在客廳後面。", "My room is behind the living room."], ["他在房間外面。", "He's outside the room."]],
  "wr": [["錢包在下面椅子。", "錢包在椅子下面。", "Place first, then the position word."], ["在桌子上有書。", "桌子上有書。 / 書在桌子上。", "Don't start a 有 sentence with 在."]],
  "tip": "上面 on · 下面 under · 裡面 in · 外面 outside · 前面 in front · 後面 behind · 旁邊 next to"})
GRAMMAR["g_mw"]["tip"] += " · 碗 bowl of · 瓶 bottle of · 家 restaurants/shops · 間 rooms · 棟 buildings · 部 movies/computers · 支 cell phones · 首 songs"
GRAMMAR["g_youdian"].update({"t": "有(一)點 + adjective vs 一點 + noun — a bit / a little",
  "p": "有(一)點(兒) + Adj/feeling　·　(V +) 一點(兒) + Noun",
  "x": "有一點 / 有點 (兒) before an adjective or a feeling = a bit, usually something you don't like: 我有一點累, 今天有點冷, 這件衣服有點貴. Before a noun, use 一點 = a little (of it): 請給我一點水. In 錢包裡有一點錢 the 有 is just 'there is'. Compare Lesson 4: 喝一點兒飲料.",
  "ex": [["我覺得有一點兒累。", "I feel a little tired."], ["今天有點冷。", "It's a bit cold today."], ["這件衣服有點貴。", "This piece of clothing is a bit expensive."],
         ["這個蛋糕有點甜。", "This cake is a bit sweet."], ["請給我一點水。", "Please give me a little water."], ["錢包裡有一點錢。", "There's a little money in the wallet."]],
  "wr": [["這個一點貴。", "這個有一點貴。", "Before an adjective: 有一點."], ["請給我有一點水。", "請給我一點水。", "Before a noun: 一點, no 有."]],
  "tip": "a bit + adjective → 有一點 · a little + noun → 一點 · a lot → 很多"})
GRAMMAR["g_hui"].update({"t": "會 — can (a learned skill) / will (future)", "p": "會 + Verb　·　不會 + Verb　·　會不會 + Verb？",
  "x": "會 = know how to / can, for a skill you learned: 我會游泳, 我不會說日文. 會 also means will — something that may happen in the future: 明天會下雨, 他晚上會來. Ask with 你會…嗎？ or 你會不會…？ (not both). 可以 = may / allowed; 應該 = should.",
  "ex": [["我不會游泳。妳會游泳嗎？", "I can't swim. Can you swim?"], ["我會說中文，可是我不會說日文。", "I can speak Chinese, but I can't speak Japanese."], ["你會不會做飯？", "Can you cook?"],
         ["明天會下雨。", "It will rain tomorrow."], ["他晚上會來。", "He'll come tonight."], ["下個月天氣會很冷。", "The weather will be cold next month."]],
  "wr": [["你明天會不會來上課嗎？", "你明天會不會來上課？ / 你明天會來上課嗎？", "Use A-not-A or 嗎, not both."], ["我會說中文很好。", "我中文說得很好。", "Use 得 to say how well."]],
  "tip": "會 = skill or will · 可以 = may · 應該 = should"})
GRAMMAR["g_de_comp"].update({"t": "Verb + 得 + how well — 游得很好, 跑得很慢",
  "p": "Subject + (Verb + Object) + Verb + 得 + (很) Adj",
  "x": "得 goes right after a verb to say how well, fast or slowly it is done: 他跑得很快. If the verb has an object (游泳, 做飯, 唱歌, 打網球), say the verb twice: 王先生游泳游得很好 — or put the object first: 妳的網球打得很好. Ask: 你游泳游得怎麼樣？ Answer: 很好 · 不錯 · 不太好 · 很慢.",
  "ex": [["王太太做飯做得很好。", "Mrs. Wang cooks very well."], ["王先生游泳游得很好。", "Mr. Wang swims very well."], ["我會游泳，可是游得不太好。", "I can swim, but not very well."],
         ["我跑步跑得很慢。", "I run very slowly."], ["中明說妳的網球打得很好。", "Zhongming says you play tennis really well."], ["他說得很快，請說慢一點。", "He speaks fast — please speak a little slower."]],
  "wr": [["他游泳得很好。", "他游泳游得很好。", "Say the verb again before 得."], ["他說中文得很好。", "他中文說得很好。", "得 must follow the verb directly."], ["他跑的很快。", "他跑得很快。", "After a verb use 得, not 的."]],
  "tip": "的 + noun (我的書, 可愛的狗) · Verb + 得 (跑得快, 打得很好)"})
GRAMMAR["g_bi"]["later"] = True
GRAMMAR["g_yinwei"]["later"] = True

GRAMMAR.update({
 "g_hao_very": {"t": "好 + adjective = so / very", "p": "好 + Vs　(今天好熱！)",
  "x": "In speech, 好 before an adjective works like 很 but with more feeling: 好熱 = so hot! 好好吃 = so delicious!",
  "ex": [["今天天氣好熱！", "It's so hot today!"], ["我好渴。", "I'm really thirsty."], ["這家的牛肉麵好好吃！", "The beef noodles here are so good!"]],
  "wr": [["今天是好熱。", "今天好熱。", "No 是 before adjectives."]], "tip": ""},
 "g_yidianr": {"t": "Verb + 一點兒 + noun — a little (of something)", "p": "想/要 + V + 一點兒 + N",
  "x": "一點兒 (or 一點) after a verb means 'a little / some': 喝一點兒水. Don't confuse it with 有一點 + adjective (Lesson 6), which means 'a bit too…'.",
  "ex": [["我想喝一點兒飲料。", "I'd like to drink something."], ["我只想吃一點兒水果。", "I only want to eat a little fruit."], ["我會說一點兒中文。", "I can speak a little Chinese."]],
  "wr": [["我想一點兒喝水。", "我想喝一點兒水。", "一點兒 goes after the verb."]], "tip": ""},
 "g_zui": {"t": "最 — the most", "p": "最 + adjective / 最 + 喜歡/愛",
  "x": "最 goes right before an adjective or a verb like 喜歡/愛: 最好 (best), 最喜歡 (like most).",
  "ex": [["秋天的天氣最好。", "Autumn has the best weather."], ["我最喜歡喝綠茶。", "I like green tea the most."], ["這家餐廳的甜點最好吃。", "This restaurant's desserts are the most delicious."]],
  "wr": [["我喜歡最綠茶。", "我最喜歡綠茶。", "最 before the verb."]], "tip": ""},
 "g_order": {"t": "Ordering food — 我要… / 請給我…", "p": "我要 / 請給我 + number + MW + food",
  "x": "Order with 我要 (I want) or the politer 請給我 (please give me). Use the right measure word: 一碗 (bowl), 一杯 (cup), 一瓶 (bottle). The waiter asks 幾位？ (how many people — 位 is polite) and 要點什麼？",
  "ex": [["我要一碗牛肉麵。", "I'd like a bowl of beef noodles."], ["請給我一杯綠茶。", "A green tea, please."], ["請問，幾位？— 兩位。", "How many people? — Two."], ["你要果汁還是牛奶？", "Juice or milk?"]],
  "wr": [["我要一個牛肉麵。", "我要一碗牛肉麵。", "Noodles come in a bowl: 碗."], ["請給一杯茶我。", "請給我一杯茶。", "給 + person + thing."]], "tip": "給 + person + thing, just like 送."},
 "g_bignum": {"t": "Big numbers and prices — 百, 千, 萬, 零, 多", "p": "兩萬三千五百零五　·　一百多塊　·　一共多少錢？",
  "x": "Say numbers from big to small: 萬 (10,000) → 千 → 百 → 十. Use 零 for a missing place in the middle: 105 = 一百零五, 2008 = 兩千零八. Before 百/千/萬, 2 is usually 兩. 一百多塊 = a hundred-something dollars. Ask the total with 一共多少錢？ and change is 找錢.",
  "ex": [["這些東西一共多少錢？", "How much is all of this altogether?"], ["一共兩萬三千五百零五塊。", "23,505 dollars in total."], ["這個杯子一百多塊錢。", "This cup is a hundred-something dollars."], ["他找你多少錢？", "How much change did he give you?"]],
  "wr": [["一百五 (for 105)", "一百零五", "Without 零 it means 150."], ["十千", "一萬", "10,000 has its own word: 萬."]], "tip": "1,500 = 一千五百 (or 一千五) · 12,000 = 一萬兩千 · 250 = 兩百五十"},
 "g_youde": {"t": "有的…，有的… — some…, (others)…", "p": "有的 + N + V，有的 + V",
  "x": "有的 = some (of them). Use it twice to split a group: 有的賣果汁，有的賣珍珠奶茶.",
  "ex": [["這些水果，有的不甜。", "Some of this fruit isn't sweet."], ["台灣的飲料店，有的賣果汁，有的賣珍珠奶茶。", "Some drink shops sell juice, some sell bubble tea."], ["我的同學，有的是日本人，有的是美國人。", "Some of my classmates are Japanese, some are American."]],
  "wr": [], "tip": ""},
 "g_mei_dou": {"t": "每 + MW + noun + 都 — every…", "p": "每天 / 每個星期 + 都 + Verb",
  "x": "每 (every) usually comes with 都 before the verb. 天 and 年 need no measure word (每天, 每年); most nouns do (每個星期, 每本書).",
  "ex": [["我爸爸每天早上都喝一杯咖啡。", "My dad drinks a cup of coffee every morning."], ["我每個星期都有中文課。", "I have Chinese class every week."], ["每個學生都喜歡王老師。", "Every student likes Teacher Wang."]],
  "wr": [["每星期我有中文課。", "我每個星期都有中文課。", "Add 個 and 都."]], "tip": ""},
 "g_you_exist": {"t": "Place + 有 + thing — there is…", "p": "Place (+ 上面/裡面…) + 有 + number + MW + N",
  "x": "To say what is somewhere, start with the place, then 有. Compare: 書在桌子上 (the book is on the table) vs 桌子上有一本書 (there is a book on the table). Negative: 沒有.",
  "ex": [["客廳裡有一張大沙發。", "There's a big sofa in the living room."], ["你的房間裡有幾張椅子？", "How many chairs are in your room?"], ["房子外面有很多花。", "There are lots of flowers outside the house."], ["沙發前面有一台電視機。", "There's a TV in front of the sofa."]],
  "wr": [["有一張沙發在客廳裡。", "客廳裡有一張沙發。", "Place first, then 有."]], "tip": "Known thing → 在 (我的錢包在哪裡？). New thing → 有 (桌子上有一個錢包)."},
 "g_nali": {"t": "哪裡 / 這裡 / 那裡 — where / here / there", "p": "在哪裡？ · 在這裡 · 去那裡",
  "x": "哪裡 = where (a question word, stays in place). 這裡 = here, 那裡 = there. 哪兒 / 這兒 / 那兒 are the same words with 兒.",
  "ex": [["你在哪裡？— 我在這裡！", "Where are you? — I'm here!"], ["那家飲料店的飲料很好喝，我們去那裡買。", "That drink shop's drinks are good — let's buy them there."], ["洗手間在哪裡？", "Where's the restroom?"]],
  "wr": [["哪裡是你的錢包？", "你的錢包在哪裡？", "Keep the answer's word order."]], "tip": "那裡 (there) vs 哪裡 (where?): the question has a 口."},
 "g_ba": {"t": "…吧 — let's… / suggestions", "p": "我們 + V + 吧！ · 你 + V + 吧",
  "x": "吧 at the end turns a sentence into a suggestion: 我們去打網球吧！ (Let's play tennis!). With 你 it's soft advice: 你買便宜的吧.",
  "ex": [["週末去打網球吧！", "Let's play tennis this weekend!"], ["我們去喝下午茶吧！", "Let's go have afternoon tea!"], ["這支筆太貴了，你買便宜的吧。", "This pen is too expensive; buy a cheap one."], ["好吧。", "OK, fine."]],
  "wr": [["我們去吧打網球。", "我們去打網球吧。", "吧 goes at the very end."]], "tip": "吧 suggests (let's), 嗎 asks (yes/no?), 呢 asks back (and you?)."},
 "g_youkong": {"t": "有空 / 沒空 — free / busy", "p": "Person + (Time) + 有空 / 沒(有)空",
  "x": "有空 = to have free time. Negative is 沒空 or 沒有空 (never 不有空). Ask: 你下午有空嗎？",
  "ex": [["你下午有空嗎？— 我沒有空，我有中文課。", "Are you free this afternoon? — No, I have Chinese class."], ["後天你有空嗎？", "Are you free the day after tomorrow?"]],
  "wr": [["我不有空。", "我沒空。 / 我沒有空。", "有 takes 沒."]], "tip": ""},
 "g_keshi": {"t": "可是 — but", "p": "Sentence 1，可是 + Sentence 2",
  "x": "可是 joins two sentences that contrast. It starts the second part.",
  "ex": [["這棟房子不大，可是很貴。", "This house isn't big, but it's expensive."], ["我想去朋友家玩，可是沒有空。", "I want to visit my friend, but I'm not free."], ["那家店的冰淇淋很好吃，可是有點兒貴。", "That shop's ice cream is good, but a bit expensive."]],
  "wr": [["我想去，可是我不。", "我想去，可是我沒空。", "Finish the second sentence."]], "tip": ""},
 "g_bang": {"t": "幫 + person + verb — help someone (do)", "p": "A + 幫 + B + Verb",
  "x": "幫 + person + verb = do something for/with someone: 我幫你找 (I'll help you look).",
  "ex": [["你要找什麼？我幫你找。", "What are you looking for? I'll help you look."], ["他常常幫朋友。", "He often helps his friends."], ["謝謝你幫我找錢包。", "Thanks for helping me find my wallet."]],
  "wr": [["我幫找你。", "我幫你找。", "Person right after 幫."]], "tip": ""},
 "g_zai_again": {"t": "再 — again (in the future)", "p": "再 + Verb",
  "x": "再 = again / once more, for something that hasn't happened yet: 你想再去嗎？ 再見 literally means 'see again'.",
  "ex": [["那家咖啡廳怎麼樣？你想再去嗎？", "How was that café? Do you want to go again?"], ["請再說一次。", "Please say it again."], ["明天再來吧！", "Come again tomorrow!"]],
  "wr": [["我想去再。", "我想再去。", "再 goes before the verb."]], "tip": "Not to be confused with 在 (at). Same sound zài, different character."},
 "g_juede": {"t": "覺得 — to feel, to think (opinion)", "p": "Person + 覺得 + opinion / feeling",
  "x": "覺得 gives an opinion or says how you feel: 我覺得這部電影很有趣. Ask someone's opinion: 你覺得呢？ / 你覺得怎麼樣？",
  "ex": [["我覺得這部電影很有趣，你覺得呢？", "I think this movie is fun. What do you think?"], ["我覺得有一點累。", "I feel a bit tired."], ["你覺得台灣怎麼樣？", "What do you think of Taiwan?"],
         ["我們都覺得台灣天氣很熱。", "We all think Taiwan's weather is hot."], ["弟弟覺得這隻小狗很可愛。", "My younger brother thinks this puppy is cute."]],
  "wr": [["我覺得很累有一點。", "我覺得有一點累。", "有一點 goes before the adjective."]], "tip": ""},
 "g_yinggai_keyi": {"t": "應該 should · 可以 may · 不可以 / 不行", "p": "(不)應該 + Verb　·　(不)可以 + Verb　·　不行。",
  "x": "應該 = should, ought to — use it to give advice; 不應該 = shouldn't. 可以 = may / can (you're allowed), or a gentle suggestion: 你今天晚上可以來我家. 不可以 = not allowed: 上課不可以看手機. To say no to a plan, answer 不行 (that won't work): 我們明天去，好嗎？— 不行，我明天要上課.",
  "ex": [["你應該多休息。", "You should rest more."], ["你不要常常在家上網，應該去運動。", "Don't stay home online so often — you should go exercise."], ["上課不可以說話，也不可以看手機。", "In class you may not talk or look at your phone."],
         ["你可不可以幫我？— 我下午有時間，可以幫你。", "Can you help me? — I have time this afternoon, I can help you."], ["今天我可以跟你一起去圖書館，但是明天不行。", "Today I can go to the library with you, but tomorrow I can't."],
         ["A：我們明天去，好嗎？B：不行，我明天要上課。", "A: Let's go tomorrow, OK? B: No, I have class tomorrow."]],
  "wr": [["你應該運動常常。", "你應該常常運動。", "常常 before the verb."], ["教室裡不行吃東西。", "教室裡不可以吃東西。", "Before a verb use 不可以; 不行 stands on its own."]],
  "tip": "會 = skill / will · 可以 = may · 應該 = should · 不行 = no way (answer) · 不可以 = not allowed"},
 "g_zhi": {"t": "只 — only", "p": "只 + Verb　·　只有 + number + noun",
  "x": "只 goes after the subject and before the verb: 我只想休息 (I only want to rest). With numbers use 只有: 我只有一百元.",
  "ex": [["可是我只想聽音樂、睡覺。", "But I only want to listen to music and sleep."], ["我只喝水，不喝咖啡，也不喝茶。", "I only drink water — no coffee, no tea."], ["我今天只有兩堂課。", "I only have two classes today."],
         ["我只有一百元。", "I only have 100 dollars."], ["教室裡只有三個學生。", "There are only three students in the classroom."]],
  "wr": [["只我有一個妹妹。", "我只有一個妹妹。", "只 after the subject, before the verb."], ["我喝只水。", "我只喝水。", "只 before the verb."]], "tip": ""},
 "g_buyao_imp": {"t": "不要 + verb — Don't…!", "p": "(你) 不要 + Verb！",
  "x": "不要 before a verb tells someone not to do it: 不要說話！ (Don't talk!). Softer: 請不要…",
  "ex": [["不要說話！", "Don't talk!"], ["你不要常常在家上網、看電腦、玩手機。", "Don't stay home so often going online, looking at the computer and playing on your phone."], ["你不要喝太多咖啡。", "Don't drink too much coffee."], ["請不要在這裡吃東西。", "Please don't eat here."]],
  "wr": [["你沒說話！", "你不要說話！", "Commands use 不要."]], "tip": ""},
 "g_ting": {"t": "聽 · 聽說 · 聽見 / 聽到 — listen, I heard, hear", "p": "聽 + 音樂/中文　·　聽說 + news　·　聽見/聽到 + a sound",
  "x": "聽 = to listen (to): 我喜歡聽音樂. 聽說 = I heard (that)… — news someone told you: 聽說這部電影很有趣. 聽見 / 聽到 = to hear — the sound reaches you: 我聽見有人叫我. Not heard: 沒聽見 / 沒聽到.",
  "ex": [["我喜歡聽音樂。", "I like listening to music."], ["我每天聽中文。", "I listen to Chinese every day."], ["聽說這部電影很有趣。", "I heard this movie is really interesting."], ["我聽說這家餐廳很好吃。", "I heard this restaurant is very good."],
         ["我聽見有人叫我。", "I heard someone calling me."], ["我沒聽到老師說什麼。", "I didn't hear what the teacher said."]],
  "wr": [["我聽說音樂。", "我聽音樂。", "聽說 is for news; to listen is just 聽."], ["我沒聽說老師說什麼。", "我沒聽見老師說什麼。", "Hearing a sound = 聽見 / 聽到."]], "tip": ""},
 "g_shuohua": {"t": "說 vs 說話 — say something / talk", "p": "說 + language / what you say　·　說話 (nothing after it)",
  "x": "說 takes what you say: 說中文, 你說什麼？, 老師說…. 說話 = to talk; 話 is already its object, so nothing comes after it: 上課不要說話. To ask someone to slow down: 請說慢一點 / 慢慢說.",
  "ex": [["老師說上課不要說話。", "The teacher says not to talk in class."], ["我會說英文，也會說中文。", "I can speak English and Chinese."], ["我聽到有人在客廳說話。", "I heard someone talking in the living room."],
         ["他說得很快，請說慢一點。", "He speaks fast — please speak a little slower."], ["請慢慢說。", "Please speak slowly."]],
  "wr": [["我會說話中文。", "我會說中文。", "說話 takes no object."]], "tip": ""},
 "g_da_qi": {"t": "打 · 踢 · 騎 · 開 — play, kick, ride, drive", "p": "打 + ball games / 電話　·　踢 + 足球　·　騎 + 腳踏車/機車/馬　·　開 + 車",
  "x": "Sports with your hands use 打: 打網球, 打籃球, 打棒球 (also 打電話 make a call, 打電腦 use the computer). Soccer is kicked: 踢足球. 騎 = ride something you sit on with your legs apart: 騎腳踏車, 騎機車, 騎馬. 開 = drive: 開車. Vehicles count with 輛: 一輛腳踏車.",
  "ex": [["週末去打網球吧！", "Let's play tennis this weekend!"], ["他很喜歡踢足球。", "He loves playing soccer."], ["明天我們可以一起去騎腳踏車。", "Tomorrow we can go ride bikes together."],
         ["我們有時候走路去學校，有時候騎機車。", "Sometimes we walk to school, sometimes we ride a scooter."], ["我爸爸每天開車上班。", "My dad drives to work every day."]],
  "wr": [["我會打足球。", "我會踢足球。", "Soccer is kicked: 踢."], ["我開腳踏車去學校。", "我騎腳踏車去學校。", "You 騎 a bike; you 開 a car."]], "tip": "一輛腳踏車 · 一輛機車 · 一部電影 · 一首歌 · 一場比賽"},
 "g_days": {"t": "前天 · 昨天 · 今天 · 明天 · 後天 — days around today", "p": "前天 → 昨天 → 今天 → 明天 → 後天　·　這兩天　·　每天　·　幾天？",
  "x": "前天 = the day before yesterday, 後天 = the day after tomorrow. 這兩天 = these (last) couple of days. 每天 = every day. 幾天 = how many days? Day words are time words, so they go before the verb or adjective: 我這兩天很忙.",
  "ex": [["今天星期三，後天星期五，前天星期一。", "Today is Wednesday; the day after tomorrow is Friday; the day before yesterday was Monday."], ["這兩天天氣有點兒冷。", "The weather's been a bit cold these couple of days."],
         ["我這兩天很忙。", "I've been busy these couple of days."], ["他這兩天沒有來上課。", "He hasn't come to class these couple of days."], ["我每天都喝咖啡。", "I drink coffee every day."], ["你要去台北幾天？", "How many days are you going to Taipei for?"]],
  "wr": [["我很忙這兩天。", "我這兩天很忙。", "Time words go before the verb or adjective."]], "tip": "前 = before, 後 = after: 前天 / 後天, 前面 / 後面"},
 "g_xingqu": {"t": "興趣 — hobbies and interests", "p": "我的興趣是 + activity　·　對 + something + 有興趣 / 感興趣",
  "x": "興趣 = interest, hobby (a noun). Say your hobby: 我的興趣是看電影. Say what you're interested in: 我對中文感興趣 / 我對打籃球很有興趣. Don't mix it up with 有趣 = interesting, which describes a thing: 這部電影很有趣. 愛好 is another word for hobby.",
  "ex": [["你的興趣是什麼？— 我的興趣是看電影。", "What are your hobbies? — My hobby is watching movies."], ["你對什麼有興趣？— 我對打籃球很有興趣。", "What are you interested in? — I'm really interested in basketball."],
         ["我對中文感興趣。", "I'm interested in Chinese."], ["你對這本書感興趣嗎？", "Are you interested in this book?"], ["聽說這部電影很有趣。", "I heard this movie is interesting."]],
  "wr": [["我對中文很有趣。", "我對中文很有興趣。", "A person 有興趣; a thing is 有趣."], ["我的有趣是唱歌。", "我的興趣是唱歌。", "Hobby = 興趣."]], "tip": ""},
 "g_ji_several": {"t": "幾 in statements — a few, several", "p": "幾 + MW + Noun (statement)",
  "x": "In a question 幾 means 'how many?'. In a statement it means 'a few / several': 我有幾個台灣朋友.",
  "ex": [["我有幾個好朋友。", "I have a few good friends."], ["你有幾個台灣朋友？", "How many Taiwanese friends do you have?"], ["他會唱幾首中文歌。", "He can sing a few Chinese songs."]],
  "wr": [], "tip": ""},
 "g_freq": {"t": "How often — 平時/平常, 常(常), 有時候…有時候…, 每天", "p": "Subject + 平時/常常/有時候/每天都 + Verb　·　有時候 A，有時候 B",
  "x": "Frequency words go after the subject (or at the very start) and before the verb. 平時 / 平常 = usually, on ordinary days · 常 / 常常 = often · 有時候 (有時) = sometimes · 每天都 = every day. 有時候…，有時候… = sometimes one thing, sometimes another.",
  "ex": [["我平時七點起床。", "I usually get up at 7."], ["平時我們都有點兒忙，可是週末我們常一起去運動。", "Usually we're all a bit busy, but on weekends we often go exercise together."], ["她平時很少喝咖啡。", "She rarely drinks coffee."],
         ["你平時喜歡做什麼？", "What do you usually like to do?"], ["我有時候在家念書，有時候在圖書館念書。", "Sometimes I study at home, sometimes at the library."], ["我們有時候晚上出去吃飯。", "We sometimes go out to eat in the evening."]],
  "wr": [["我喝茶有時候。", "我有時候喝茶。", "Before the verb, not at the end."]], "tip": "平時 = 平常 (usually) · 常 = 常常 (often)"},
 "g_zhen": {"t": "真 + adjective — really, so (exclamation)", "p": "Subject + 真 + Vs！",
  "x": "真 + adjective expresses how you feel right now: 你媽媽真漂亮！ It's used in exclamations, not to describe something neutrally.",
  "ex": [["有這幾個好朋友，我真高興！", "I'm so happy to have these good friends!"], ["你媽媽真漂亮！", "Your mom is so pretty!"], ["這部電影真有趣！", "This movie is really fun!"], ["今天真熱！", "It's really hot today!"]],
  "wr": [["她是一個真漂亮的人。", "她真漂亮！", "真 is for exclamations; use 很 to describe."]], "tip": ""},
})

DRILLS += [
 # L4
 {"k":"choose","g":"g_haishi","q":"你要喝咖啡＿＿茶？","o":["還是","或是","和"],"a":0},
 {"k":"order","g":"g_haishi","t":["你","要","果汁","還是","牛奶"],"a":["你要果汁還是牛奶"],"en":"Do you want juice or milk?","end":"？"},
 {"k":"fix","g":"g_haishi","o":["你要咖啡還是茶嗎？","你要咖啡還是茶？","你要咖啡或是茶嗎還是？"],"a":1},
 {"k":"choose","g":"g_hao_very","q":"今天天氣＿＿熱！我好渴。","o":["好","是","太好"],"a":0},
 {"k":"choose","g":"g_tai_le","q":"天氣太熱＿＿，我要喝飲料。","o":["了","的","嗎"],"a":0},
 {"k":"order","g":"g_tai_le","t":["我","太","累","了"],"a":["我太累了"],"en":"I'm too tired. (…I don't want to go out.)","end":"，不想去玩。"},
 {"k":"choose","g":"g_yidianr","q":"我想喝＿＿飲料。","o":["一點兒","有一點","一些點"],"a":0},
 {"k":"fix","g":"g_yidianr","o":["我想一點兒喝水。","我想喝一點兒水。","我一點兒想喝水。"],"a":1},
 {"k":"choose","g":"g_zui","q":"秋天的天氣＿＿好，不冷也不熱。","o":["最","太","都"],"a":0},
 {"k":"fix","g":"g_zui","o":["我喜歡最喝綠茶。","我最喜歡喝綠茶。","我喜歡喝綠茶最。"],"a":1},
 {"k":"choose","g":"g_order","q":"我要一＿＿牛肉麵。","o":["碗","杯","本"],"a":0},
 {"k":"choose","g":"g_order","q":"請給我一＿＿珍珠奶茶。","o":["杯","碗","張"],"a":0},
 {"k":"choose","g":"g_order","q":"你很渴嗎？我有一＿＿飲料。","o":["瓶","朵","件"],"a":0},
 {"k":"choose","g":"g_order","q":"請問，幾＿＿？— 兩位。","o":["位","個人","張"],"a":0},
 {"k":"order","g":"g_order","t":["請","給","我","一杯","綠茶"],"a":["請給我一杯綠茶"],"en":"A green tea for me, please."},
 {"k":"choose","g":"g_bignum","q":"105 →","o":["一百零五","一百五","一零五"],"a":0},
 {"k":"choose","g":"g_bignum","q":"2,008 →","o":["兩千零八","兩千八","二百零八"],"a":0},
 {"k":"choose","g":"g_bignum","q":"12,000 →","o":["一萬兩千","十二千","一千兩百"],"a":0},
 {"k":"choose","g":"g_bignum","q":"這個杯子一百多塊錢。The cup costs…","o":["between 100 and 200 dollars","exactly 100 dollars","more than 1,000 dollars"],"a":0},
 {"k":"order","g":"g_bignum","t":["這些","東西","一共","多少","錢"],"a":["這些東西一共多少錢"],"en":"How much is all of this altogether?","end":"？"},
 {"k":"choose","g":"g_youde","q":"這些水果，＿＿很甜，＿＿不甜。","o":["有的 / 有的","都 / 都","一些 / 也"],"a":0},
 {"k":"fix","g":"g_mei_dou","o":["每天我都喝咖啡。","我每天喝都咖啡。","都我每天喝咖啡。"],"a":0},
 {"k":"order","g":"g_mei_dou","t":["我","每個","星期","都","有","中文課"],"a":["我每個星期都有中文課"],"en":"I have Chinese class every week."},
 # L5
 {"k":"choose","g":"g_location","q":"The wallet is under the chair. → 錢包在椅子＿＿。","o":["下面","上面","裡面"],"a":0},
 {"k":"choose","g":"g_location","q":"Your pen is on the book. → 你的筆在書＿＿。","o":["上面","下面","後面"],"a":0},
 {"k":"fix","g":"g_location","o":["錢包在下面椅子。","錢包在椅子下面。","在椅子下面錢包。"],"a":1},
 {"k":"order","g":"g_location","t":["我的","房間","在","客廳","後面"],"a":["我的房間在客廳後面"],"en":"My room is behind the living room."},
 {"k":"order","g":"g_you_exist","t":["客廳","裡","有","一張","沙發"],"a":["客廳裡有一張沙發"],"en":"There's a sofa in the living room."},
 {"k":"fix","g":"g_you_exist","o":["有一台電視機在沙發前面。","沙發前面有一台電視機。","沙發有前面一台電視機。"],"a":1},
 {"k":"choose","g":"g_you_exist","q":"你的房間裡＿＿幾張椅子？","o":["有","在","是"],"a":0},
 {"k":"choose","g":"g_you_exist","q":"我的錢包＿＿哪裡？","o":["在","有","是"],"a":0},
 {"k":"choose","g":"g_nali","q":"你在＿＿？— 我在這裡！","o":["哪裡","那裡","這裡"],"a":0},
 {"k":"choose","g":"g_ba","q":"今天天氣很好，我們去打網球＿＿！","o":["吧","嗎","呢"],"a":0},
 {"k":"choose","g":"g_ba","q":"我喜歡台灣，你＿＿？","o":["呢","吧","嗎"],"a":0},
 {"k":"choose","g":"g_ba","q":"你喜歡台灣＿＿？","o":["嗎","吧","呢"],"a":0},
 {"k":"fix","g":"g_youkong","o":["我下午不有空。","我下午沒有空。","我沒下午有空。"],"a":1},
 {"k":"choose","g":"g_keshi","q":"這棟房子不大，＿＿很貴。","o":["可是","和","也"],"a":0},
 {"k":"order","g":"g_bang","t":["我","幫","你","找"],"a":["我幫你找"],"en":"I'll help you look."},
 {"k":"choose","g":"g_zai_again","q":"那家咖啡廳很好，我想＿＿去。","o":["再","在","也"],"a":0},
 {"k":"choose","g":"g_he_gen","q":"我要買一張桌子＿＿四張椅子。","o":["跟","也","都"],"a":0},
 # L6
 {"k":"choose","g":"g_hui","q":"我不＿＿游泳，你會嗎？","o":["會","要","是"],"a":0},
 {"k":"order","g":"g_hui","t":["你","會不會","打","網球"],"a":["你會不會打網球"],"en":"Can you play tennis?","end":"？"},
 {"k":"choose","g":"g_de_comp","q":"我妹妹跑＿＿很慢。","o":["得","的","地"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"她看書看得＿＿。","o":["很快","快很","很快的"],"a":0},
 {"k":"order","g":"g_de_comp","t":["他","唱歌","唱","得","很好"],"a":["他唱歌唱得很好"],"en":"He sings well."},
 {"k":"fix","g":"g_de_comp","o":["他畫畫得很好。","他畫得很好。","他畫很好得。"],"a":1},
 {"k":"choose","g":"g_juede","q":"我＿＿這部電影很有趣，你呢？","o":["覺得","知道","認識"],"a":0},
 {"k":"choose","g":"g_youdian","q":"那家店的冰淇淋很好吃，可是＿＿貴。","o":["有點兒","一點兒","太一點"],"a":0},
 {"k":"choose","g":"g_youdian","q":"我想喝＿＿水。(a little water)","o":["一點兒","有一點","有點兒"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"你＿＿常常運動！(should)","o":["應該","會","可以"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"她很喜歡花，你＿＿送她一些花。(could)","o":["可以","應該不","會不會"],"a":0},
 {"k":"fix","g":"g_zhi","o":["只我想吃水果。","我只想吃一點兒水果。","我想吃只水果。"],"a":1},
 {"k":"choose","g":"g_buyao_imp","q":"＿＿說話！(Don't talk!)","o":["不要","沒有","不是"],"a":0},
 {"k":"choose","g":"g_ji_several","q":"我有＿＿個台灣朋友。(a few)","o":["幾","多少","一點"],"a":0},
 {"k":"order","g":"g_freq","t":["我","平常","早上","七點","起床"],"a":["我平常早上七點起床"],"en":"I usually get up at 7 a.m."},
 {"k":"choose","g":"g_zhen","q":"你媽媽＿＿漂亮！","o":["真","是","最是"],"a":0},
 {"k":"order","g":"g_ba","t":["週末","去","打","網球","吧"],"a":["週末去打網球吧"],"en":"Let's play tennis this weekend!","end":"！"},
 # L6 slides — 會 (can / will)
 {"k":"choose","g":"g_hui","q":"我會說中文，＿＿我不會說日文。","o":["可是","也","都"],"a":0},
 {"k":"choose","g":"g_hui","q":"明天＿＿下雨。(It will rain tomorrow.)","o":["會","是","在"],"a":0},
 {"k":"fix","g":"g_hui","o":["你明天會不會來上課嗎？","你明天會不會來上課？","你會明天不會來上課？"],"a":1},
 {"k":"order","g":"g_hui","t":["他","晚上","會","來"],"a":["他晚上會來","晚上他會來"],"en":"He will come tonight."},
 # L6 slides — 的 or 得?
 {"k":"choose","g":"g_de_comp","q":"這是我＿＿書。","o":["的","得"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"他中文說＿＿很不錯。","o":["的","得"],"a":1},
 {"k":"choose","g":"g_de_comp","q":"那是一隻可愛＿＿狗。","o":["的","得"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"妹妹游泳游＿＿很好。","o":["的","得"],"a":1},
 {"k":"choose","g":"g_de_comp","q":"我喜歡紅色＿＿衣服。","o":["的","得"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"這是媽媽買＿＿水果。","o":["的","得"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"他網球打＿＿很好。","o":["的","得"],"a":1},
 {"k":"choose","g":"g_de_comp","q":"哥哥跑＿＿很快。","o":["的","得"],"a":1},
 {"k":"choose","g":"g_de_comp","q":"王小姐做飯做＿＿很不錯。","o":["的","得"],"a":1},
 {"k":"choose","g":"g_de_comp","q":"那是我們＿＿新老師。","o":["的","得"],"a":0},
 {"k":"choose","g":"g_de_comp","q":"你游泳游得＿＿？— 不太好。","o":["怎麼樣","什麼","哪裡"],"a":0},
 {"k":"order","g":"g_de_comp","t":["王太太","做飯","做得","很好"],"a":["王太太做飯做得很好"],"en":"Mrs. Wang cooks very well."},
 {"k":"order","g":"g_de_comp","t":["我","跑步","跑得","很慢"],"a":["我跑步跑得很慢"],"en":"I run very slowly."},
 {"k":"fix","g":"g_de_comp","o":["她跳舞得很好。","她跳舞跳得很好。","她跳得舞很好。"],"a":1},
 # L6 slides — 有一點 / 一點 / 很多
 {"k":"choose","g":"g_youdian","q":"今天＿＿冷，我們不要去海邊。","o":["有一點","一點","很多"],"a":0},
 {"k":"choose","g":"g_youdian","q":"我＿＿餓，想吃一點東西。","o":["有一點","一點","很多"],"a":0},
 {"k":"choose","g":"g_youdian","q":"請給我＿＿水。(a little water)","o":["一點","有一點","很多"],"a":0},
 {"k":"choose","g":"g_youdian","q":"🥛 杯子裡只有＿＿牛奶。(just a little)","o":["一點","很多","有一點"],"a":0},
 {"k":"choose","g":"g_youdian","q":"🍌🍌🍌🍌🍌🍌 桌子上有＿＿香蕉。","o":["很多","一點","有一點"],"a":0},
 {"k":"fix","g":"g_youdian","o":["這個蛋糕一點甜。","這個蛋糕有一點甜。","這個蛋糕甜有一點。"],"a":1},
 # L6 slides — 應該 / 可以 / 不可以 / 不行
 {"k":"choose","g":"g_yinggai_keyi","q":"你很累，你＿＿多休息。","o":["應該","不行","只"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"上課＿＿玩手機。(shouldn't)","o":["不應該","應該","不行"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"A：我們明天去，好嗎？ B：＿＿，我明天要上課。","o":["不行","不應該","不會"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"教室裡＿＿吃東西。(not allowed)","o":["不可以","不行","不會"],"a":0},
 {"k":"choose","g":"g_yinggai_keyi","q":"你可不可以幫我？— 我下午有時間，＿＿幫你。","o":["可以","不行","只"],"a":0},
 {"k":"order","g":"g_yinggai_keyi","t":["上課","不可以","看","手機"],"a":["上課不可以看手機"],"en":"You may not look at your phone in class."},
 # L6 slides — 只
 {"k":"choose","g":"g_zhi","q":"教室裡＿＿三個學生。(only)","o":["只有","只","都有"],"a":0},
 {"k":"fix","g":"g_zhi","o":["我喝只水。","我只喝水。","只我喝水。"],"a":1},
 {"k":"order","g":"g_zhi","t":["我","今天","只有","兩堂","課"],"a":["我今天只有兩堂課","今天我只有兩堂課"],"en":"I only have two classes today."},
 # L6 slides — days
 {"k":"choose","g":"g_days","q":"今天星期三，＿＿星期五。","o":["後天","明天","前天"],"a":0},
 {"k":"choose","g":"g_days","q":"今天星期三，＿＿星期一。","o":["前天","昨天","後天"],"a":0},
 {"k":"choose","g":"g_days","q":"＿＿天氣有點冷。(these couple of days)","o":["這兩天","幾天","後天"],"a":0},
 {"k":"choose","g":"g_days","q":"你要去台北＿＿？(how many days)","o":["幾天","這兩天","每天"],"a":0},
 {"k":"order","g":"g_days","t":["我","這兩天","很","忙"],"a":["我這兩天很忙","這兩天我很忙"],"en":"I've been busy these couple of days."},
 # L6 slides — 聽 / 聽說 / 聽見
 {"k":"choose","g":"g_ting","q":"我＿＿這家餐廳很好吃。(I heard that…)","o":["聽說","聽見","聽"],"a":0},
 {"k":"choose","g":"g_ting","q":"我沒＿＿老師說什麼。(didn't hear)","o":["聽見","聽說","說話"],"a":0},
 {"k":"choose","g":"g_ting","q":"我喜歡＿＿音樂。","o":["聽","聽說","說"],"a":0},
 # L6 slides — 說 / 說話
 {"k":"choose","g":"g_shuohua","q":"上課不要＿＿！","o":["說話","說","聽說"],"a":0},
 {"k":"choose","g":"g_shuohua","q":"你說得太快了，請說＿＿一點。","o":["慢","快","好"],"a":0},
 {"k":"fix","g":"g_shuohua","o":["我會說話中文。","我會說中文。","我說會中文。"],"a":1},
 # L6 slides — 打 / 踢 / 騎 / 開
 {"k":"choose","g":"g_da_qi","q":"他很喜歡＿＿足球。","o":["踢","打","騎"],"a":0},
 {"k":"choose","g":"g_da_qi","q":"週末我們去＿＿網球吧！","o":["打","踢","騎"],"a":0},
 {"k":"choose","g":"g_da_qi","q":"我每天＿＿腳踏車去學校。","o":["騎","開","打"],"a":0},
 {"k":"choose","g":"g_da_qi","q":"我爸爸每天＿＿車上班。(drives)","o":["開","踢","打"],"a":0},
 {"k":"choose","g":"g_da_qi","q":"我想＿＿電話給媽媽。","o":["打","說","聽"],"a":0},
 # L6 slides — 興趣 / 有趣
 {"k":"choose","g":"g_xingqu","q":"你的＿＿是什麼？— 我的＿＿是看電影。","o":["興趣","有趣","高興"],"a":0},
 {"k":"choose","g":"g_xingqu","q":"這部電影很＿＿。(interesting)","o":["有趣","興趣","高興"],"a":0},
 {"k":"fix","g":"g_xingqu","o":["我對打籃球很有趣。","我對打籃球很有興趣。","我很有興趣打籃球對。"],"a":1},
 {"k":"order","g":"g_xingqu","t":["我","對","中文","感興趣"],"a":["我對中文感興趣"],"en":"I'm interested in Chinese."},
 # L6 slides — 平時 / 有時候…有時候…
 {"k":"choose","g":"g_freq","q":"弟弟晚餐有時候吃飯，＿＿吃麵。","o":["有時候","平時","這兩天"],"a":0},
 {"k":"order","g":"g_freq","t":["我","平時","七點","起床"],"a":["我平時七點起床","平時我七點起床"],"en":"I usually get up at 7."},
 {"k":"order","g":"g_freq","t":["我們","有時候","走路去學校","有時候","騎機車"],"a":["我們有時候走路去學校有時候騎機車","我們有時候騎機車有時候走路去學校"],"en":"Sometimes we walk to school, sometimes we ride a scooter."},
 {"k":"order","g":"g_juede","t":["我","覺得","有一點兒","累"],"a":["我覺得有一點兒累"],"en":"I feel a little tired."},
]

READING += [
 {"text":"L4-0","q":"友美要喝什麼？","o":["一杯綠茶","一杯咖啡","珍珠奶茶"],"a":0},
 {"text":"L4-0","q":"今天天氣怎麼樣？","o":["好熱","很冷","不冷也不熱"],"a":0},
 {"text":"L4-1","q":"他們一共要付多少錢？","o":["四百二十塊","五百塊","八十塊"],"a":0},
 {"text":"L4-1","q":"老闆找國安多少錢？","o":["八十塊","一百八十塊","四百二十塊"],"a":0},
 {"text":"L4-1","q":"國安點了什麼？","o":["一碗牛肉麵和一杯紅茶","一碗麵和一杯綠茶","兩杯咖啡"],"a":0},
 {"text":"L4-2","q":"台灣春天和秋天的天氣怎麼樣？","o":["不冷也不熱","好熱","很冷"],"a":0},
 {"text":"L4-2","q":"一杯珍珠奶茶多少錢？","o":["五十多塊","一百多塊","五塊"],"a":0},
 {"text":"L5-0","q":"宜文想去哪裡？","o":["咖啡廳","圖書館","餐廳"],"a":0},
 {"text":"L5-0","q":"中明的錢包在哪裡？","o":["椅子下面","桌子上面","書包裡"],"a":0},
 {"text":"L5-0","q":"他們幾點去？","o":["兩點半","兩點","三點半"],"a":0},
 {"text":"L5-1","q":"宜文的房間在哪裡？","o":["客廳後面","廚房旁邊","客廳前面"],"a":0},
 {"text":"L5-1","q":"沙發前面有什麼？","o":["一台電視機","一張床","一隻貓"],"a":0},
 {"text":"L5-1","q":"宜文的貓在哪裡？","o":["窗戶前面","沙發上面","床下面"],"a":0},
 {"text":"L5-2","q":"中明的房間在哪裡？","o":["廚房旁邊","客廳後面","門外面"],"a":0},
 {"text":"L5-2","q":"中明家有幾隻鳥？","o":["兩隻","一隻","三隻"],"a":0},
 {"text":"L5-2","q":"狗常常在哪裡睡覺？","o":["門外面","客廳裡","床上"],"a":0},
 {"text":"L6-0","q":"今天天氣怎麼樣？","o":["不錯","很冷","有點兒熱"],"a":0},
 {"text":"L6-0","q":"國安想去做什麼？","o":["去游泳","去打網球","去唱歌"],"a":0},
 {"text":"L6-0","q":"友美會游泳嗎？","o":["不會","會，游得很好","會，游得不太好"],"a":0},
 {"text":"L6-0","q":"宜文游泳游得怎麼樣？","o":["不太好","很好","很快"],"a":0},
 {"text":"L6-0","q":"為什麼友美不喜歡跑步？","o":["她跑步跑得很慢","她不會跑步","天氣太熱"],"a":0},
 {"text":"L6-0","q":"中明說誰的網球打得很好？","o":["友美","宜文","國安"],"a":0},
 {"text":"L6-1","q":"國安晚上想做什麼？","o":["去看電影","去騎腳踏車","回家休息"],"a":0},
 {"text":"L6-1","q":"中明為什麼想回家？","o":["他覺得有一點兒累","電影不好看","他明天要上課"],"a":0},
 {"text":"L6-1","q":"國安覺得中明應該做什麼？","o":["去運動","在家上網","聽音樂、睡覺"],"a":0},
 {"text":"L6-1","q":"這兩天天氣怎麼樣？","o":["有點兒冷","很熱","不冷也不熱"],"a":0},
 {"text":"L6-1","q":"中明想什麼時候去騎腳踏車？","o":["週末","明天","後天"],"a":0},
 {"text":"L6-2","q":"誰最愛唱歌？","o":["中明","宜文","國安"],"a":0},
 {"text":"L6-2","q":"國安的籃球打得怎麼樣？","o":["很好","不太好","很慢"],"a":0},
 {"text":"L6-2","q":"週末他們常常做什麼？","o":["一起去運動","在家休息","一起去唱歌"],"a":0},
 {"text":"L6-2","q":"「我」喜歡什麼運動？","o":["打網球","游泳","打籃球"],"a":0},
 {"text":"L6-2","q":"平時他們怎麼樣？","o":["都有點兒忙","都很累","常常去看比賽"],"a":0},
 {"text":"L6-3","q":"中明會打什麼球？","o":["籃球","網球","棒球"],"a":0},
 {"text":"L6-3","q":"國安網球打得怎麼樣？","o":["不太好","很好","很快"],"a":0},
 {"text":"L6-3","q":"他們星期六幾點見？","o":["早上九點","晚上九點","下午兩點"],"a":0},
 {"text":"L6-4","q":"聽說那部電影怎麼樣？","o":["很有趣","不好看","有一點貴"],"a":0},
 {"text":"L6-4","q":"宜文為什麼不想騎腳踏車？","o":["她覺得有一點累","她不會騎","天氣太熱"],"a":0},
 {"text":"L6-4","q":"最後她們要去做什麼？","o":["去海邊看風景","去打網球","回家休息"],"a":0},
 {"text":"L6-5","q":"他的興趣是什麼？","o":["唱歌跟跳舞","打網球","畫畫"],"a":0},
 {"text":"L6-5","q":"他跳舞跳得怎麼樣？","o":["不太好","很好","不錯"],"a":0},
 {"text":"L6-5","q":"誰畫畫畫得很好？","o":["中明","宜文","友美"],"a":0},
]

MNEMO += """
飲|飠 food + 欠 open mouth|An open mouth (欠) next to food: drink. 飲料 = drinks.
料|米 rice + 斗 scoop|A scoop of grain: material. 飲料 = 'drink material' = beverage.
咖|口 mouth + 加|Mouth radical = a sound word: 咖啡 kāfēi, coffee.
啡|口 mouth + 非|Second half of 咖啡.
碗|石 stone + 宛|A bowl made of stone/porcelain: bowl.
瓶|并 + 瓦 pottery|A pottery (瓦) container: bottle.
杯|木 wood + 不|A wooden cup: cup.
季|禾 grain + 子 child|Seasons of growing grain.
春|三 + 人 + 日 sun|People under the spring sun: spring.
夏|頁 head + 夊 feet|summer.
秋|禾 grain + 火 fire|Burning the grain stalks after harvest: autumn.
冬|夊 + ⺀ ice drops|Two drops of ice at the bottom: winter.
包|勹 wrap + 巳|Something wrapped up: bag. 錢包 = money bag = wallet.
裡|衣 clothes + 里|Inside the clothes (衣): inside.
房|戶 door + 方|A space behind a door (戶): room, house.
廚|广 shelter + 尌|The room under the roof where you cook: kitchen.
廳|广 shelter + 聽 listen|A big hall where people listen: 客廳 living room.
客|宀 roof + 各 each|Everyone (各) under your roof: guest. 客廳 = guest hall = living room.
沙|氵 water + 少 little|Little bits by the water: sand. 沙發 = sofa (sounds like it!).
發|癶 + 弓 bow + 殳|沙發 shāfā = sofa.
貓|豸 animal + 苗 sprout|An animal that sounds like 'miao': cat.
狗|犭 animal + 句|Animal radical 犭: dog.
鳥|bird|A bird with its tail feathers and feet (灬).
隻|隹 bird + 又 hand|One bird in your hand: MW for animals.
窗|穴 hole + 囪|A hole in the wall: window.
網|糸 thread + 罔|Threads knotted into a net: net. 網球 = net ball = tennis!
球|王 jade + 求|A round jade ball: ball.
打|扌 hand + 丁 nail|A hand hitting a nail: hit, play (ball).
踢|足 foot + 易|Foot radical: kick.
跑|足 foot + 包|Feet (足) moving fast: run.
海|氵 water + 每|Water everywhere: sea.
游|氵 water + 斿|Water radical: swim (游泳).
泳|氵 water + 永 forever|Swim forever in the water: 游泳.
會|meeting / can|會 = can (a skill you learned).
得|彳 step + 㝵|跑得快: links a verb to how well/fast.
影|景 scene + 彡 rays|Light rays from a scene: shadow, film. 電影 = electric shadows = movie!
院|阝 + 完|A walled compound: 電影院 cinema, 醫院 hospital.
趣|走 walk + 取 take|Going to get something fun: 有趣 interesting.
興|lifting hands|Lift up with joy: 高興 happy, 興趣 interest.
騎|馬 horse + 奇|Ride a horse (馬): ride. 騎腳踏車 = ride a bike.
唱|口 mouth + 昌|Mouth radical: sing.
歌|哥 + 欠 open mouth|Open your mouth (欠) and sing: song.
跳|足 foot + 兆|Foot radical: jump. 跳舞 = dance.
舞|dance|A person dancing with sleeves flying: dance.
畫|聿 brush + 田 field|A brush drawing the borders of a field: draw, painting.
真|really|你真漂亮！ = You're really pretty!
應|广 + 心 heart|應該 = should (what your heart knows you should do).
只|口 + 八|只 = only.
運|辶 walk + 軍|運動 = exercise.
動|重 heavy + 力 strength|Use strength (力) to move something heavy: move. 運動 = sports.
陽|阝 + 昜 sun rays|太陽 = the sun.
邊|辶 walk + 臱|Walk to the edge: side. 旁邊 next to, 海邊 seaside.
風|几 sail + 虫 insect|An insect blown around inside a sail (几): wind. 風景 = scenery.
景|日 sun + 京 capital|The sun shining over the capital city: a view. 風景 = scenery.
慢|忄 heart + 曼|A relaxed heart (忄) takes its time: slow. 快 (fast) has the same 忄.
聽|耳 ear + 十目一心|Ear (耳), ten (十) eyes (目) and one (一) heart (心): really listening.
說|言 speech + 兌|Words (言) coming out: to say, to speak. 說話 = to talk.
話|言 speech + 舌 tongue|Speech (言) from the tongue (舌): words. 說話 = to talk.
輛|車 vehicle + 兩|Vehicle (車) radical: MW for vehicles. 一輛腳踏車.
休|亻 person + 木 tree|A person (亻) leaning on a tree (木): rest. 休息 = to rest.
息|自 nose + 心 heart|Breath from your nose (自) and heart (心): to breathe, rest. 休息.
該|言 speech + 亥|What words (言) say you ought to do: 應該 = should.
遊|辶 walk + 斿 flag|Walking (辶) around behind a flag: travel, play. 遊戲 = game. (游泳 has 氵 water!)
戲|戈 spear + 虍 + 豆|A show with spears (戈): play, game. 遊戲 = game.
拍|扌 hand + 白|A hand (扌) clapping: to pat, to take (photos). 拍照 = take photos.
照|日 sun + 召 + 灬 fire|Sun (日) and fire (灬) give light: shine, photo. 拍照 = take photos.
湖|氵 water + 胡|Water (氵) radical: lake. 湖邊 = lakeside.
河|氵 water + 可|Water (氵) that can (可) flow far: river. 河邊 = riverside.
路|足 foot + 各 each|Where each (各) foot (足) walks: road. 走路 = walk, 路邊 = roadside.
賽|宀 + 貝 money|Competing for a prize of money (貝): 比賽 = game, match.
比|two people side by side|Two people standing side by side to compare: 比賽 = competition.
場|土 earth + 昜|An open piece of ground (土): a field; MW for games: 一場比賽.
寫|宀 roof + 舄|Writing under a roof: to write. 寫字 = write characters.
首|head|A head with hair on top: head; MW for songs: 一首歌.
面|face|A face: 上面, 下面, 裡面… = side, surface.
"""
