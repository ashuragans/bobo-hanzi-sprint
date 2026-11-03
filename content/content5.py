# -*- coding: utf-8 -*-
"""Lesson 8 這條裙子真好看 (This skirt is really beautiful): the book's dialogues, reading, words and grammar
(時代華語 1 第8課) and the class slides (真/真的, 因為/所以 practice, 怕, 時間 phrases, 高矮胖瘦長短, the clothes and
accessories charts, 流行, VV看, 以前/以後, 對了, 雙, 樓, 快要, 開/關 and the reading questions)."""
from content import LESSONS, GRAMMAR, DRILLS, READING, MNEMO

L8_NOTE = "Practice text written for this site with the Lesson 8 words, the class slides and the book's classroom activities."

LESSONS += [
 {
  "id": "L8", "num": "第八課", "name": "這條裙子真好看", "en": "This skirt is really beautiful",
  "src": "Book: 時代華語 1 第8課 (dialogues, reading, words, grammar, classroom activities) + the class slides",
  # words from the class slides; the book's word list (book1_raw.txt, L8) is added by build.py
  "words": ("裙子 去年 今年 明年 年 上星期 下星期 牌子 因為 所以 為什麼 有名 褲子 長褲 短褲 牛仔褲 百貨公司 公司 難 容易 困難 簡單 "
            "最近 胖 瘦 高 矮 長 短 低 公斤 斤 怕 老鼠 跟 時間 黃色 黃 黑色 黑 吧 流行 鞋子 襪子 雙 手套 筷子 樓 樓上 樓下 上樓 下樓 "
            "快要 快 關 開 開燈 關燈 開門 關門 電梯 樓梯 爬 沒關係 對不起 對了 年輕 老 皮包 包包 女生 男生 雜誌 舊 新 真 真的 假 "
            "以前 以後 上衣 襯衫 外套 毛衣 大衣 睡衣 運動衣 雨傘 球鞋 拖鞋 涼鞋 帽子 皮帶 雨衣 雨鞋 太陽眼鏡 試試看 "
            "歌手 生病 食物 出門 看起來 逛 書店 父母 "
            # the book's 好/難 + V table, the reading's title and more words the class slides use
            "年輕人 難吃 難喝 難看 好聽 難聽 好唱 難唱 好學 難學 好找 難找 好騎 難騎 穿穿看 吃吃看 找時間 花時間 "
            "內衣 抽菸 門口 之間 韓文 回國 記得 忘 帶 冰箱 燈 電 肚子 需要 如果 眼睛 飲料店 辦公室 臥室 完成 回答").split(),
  "texts": [
   {"title": "對話一 · 這條裙子真好看 (This skirt is really beautiful)", "note": "From the book, Lesson 8.", "lines": [
     ["宜文", "元真，妳的這條裙子真好看，我很喜歡。", "Yuanzhen, your skirt is really beautiful. I like it a lot."],
     ["元真", "謝謝，這是我去年的生日禮物。", "Thanks, this was my birthday present last year."],
     ["宜文", "聽說這個牌子的東西很貴，可是很多人喜歡。", "I heard this brand's things are expensive, but lots of people like them."],
     ["元真", "是啊，因為這個牌子很有名，衣服、褲子和裙子也都很好看，所以很多人買。", "Yes. This brand is very famous, and its tops, pants and skirts all look great, so lots of people buy it."],
     ["宜文", "妳知道去哪裡買這個牌子的衣服嗎？", "Do you know where to buy this brand's clothes?"],
     ["元真", "知道，百貨公司都有，不難找。", "Yes. Department stores all have it; it's not hard to find."],
     ["宜文", "我很想去看，可是我最近胖了五公斤，我怕衣服不好買。", "I'd love to go and look, but I've put on five kilos lately; I'm afraid it'll be hard to find clothes that fit."],
     ["元真", "妳胖了嗎？我不覺得啊，我跟妳一起去看。我也想去買今年夏天的新衣服。", "Have you gained weight? I don't think so. I'll go and look with you. I want to buy new clothes for this summer too."],
     ["宜文", "好，我們找時間一起去。", "OK, let's find a time to go together."],
   ]},
   {"title": "對話二 · 在百貨公司 (In a department store)", "note": "From the book, Lesson 8.", "lines": [
     ["宜文", "妳看，這條黃色的褲子不錯吧？", "Look, these yellow pants are nice, aren't they?"],
     ["元真", "很好看。這條藍的也很漂亮，藍色是今年很流行的顏色。", "They look great. These blue ones are pretty too; blue is a really popular color this year."],
     ["宜文", "這兩條我都去穿穿看。", "I'll go and try both of them on."],
     ["元真", "（五分鐘以後）妳覺得怎麼樣？", "(Five minutes later) What do you think?"],
     ["宜文", "都太短，也太小了。", "They're both too short, and too small."],
     ["元真", "沒關係，我們可以下個週末再來看。對了，妳要買鞋子吧？", "It's OK, we can come and look again next weekend. Oh, by the way, you want to buy shoes, don't you?"],
     ["宜文", "是啊，我想買一雙黑色的。", "Yes, I want a pair of black ones."],
     ["元真", "鞋子都在一樓，我們到樓下去吧！九點了，百貨公司快要關了。", "The shoes are all on the first floor. Let's go downstairs! It's nine o'clock; the department store is about to close."],
     ["宜文", "電梯在那裡！我們現在去買。", "There's the elevator! Let's go buy them now."],
   ]},
   {"title": "短文 · 年輕人喜歡新東西 (Young people like new things)", "note": "From the book, Lesson 8.", "lines": [
     ["", "百貨公司裡有很多衣服、鞋子和皮包，都是最新的，所以很多年輕女生喜歡到百貨公司去，漂亮的、流行的衣服，她們都想穿穿看。", "Department stores have lots of clothes, shoes and purses, all the newest, so many young women like to go there; they want to try on every pretty, trendy piece."],
     ["", "很多年輕男生愛在書店看汽車雜誌，汽車很貴，他們不一定可以買新車，可是都看得很開心。", "Many young men love reading car magazines in bookstores. Cars are expensive and they can't necessarily buy a new one, but they enjoy looking a lot."],
     ["", "我覺得有的舊東西很不錯，有的新東西也很有趣，我很喜歡看新車、新衣服，可是因為我的錢不多，所以我不常買。", "I think some old things are really good and some new things are fun too. I love looking at new cars and new clothes, but because I don't have much money, I don't buy them often."],
   ]},
   {"title": "練習 · 真的嗎？ (Really? — 真, 真的, 怕)", "note": L8_NOTE, "lines": [
     ["國安", "聽說妳下個月要去日本，真的嗎？", "I heard you're going to Japan next month — really?"],
     ["友美", "真的！我要回國看我的父母。", "Really! I'm going home to see my parents."],
     ["國安", "妳怕坐飛機嗎？", "Are you afraid of flying?"],
     ["友美", "我不怕坐飛機，可是我怕日本的冬天太冷。", "I'm not afraid of flying, but I'm afraid Japan's winter will be too cold."],
     ["國安", "對了，妳要買新大衣吧？", "Oh, by the way — you need to buy a new coat, right?"],
     ["友美", "是啊！我真想去百貨公司看看。", "Yes! I really want to go and look at the department store."],
   ]},
   {"title": "練習 · 鞋子在幾樓？ (Which floor are the shoes on?)", "note": L8_NOTE, "lines": [
     ["中明", "請問，鞋子在幾樓？", "Excuse me, which floor are the shoes on?"],
     ["小姐", "鞋子在一樓，襪子和手套也在一樓。", "Shoes are on the first floor; socks and gloves are on the first floor too."],
     ["中明", "我想買一雙球鞋。這雙很好看，我可以穿穿看嗎？", "I'd like a pair of sneakers. This pair looks great — can I try them on?"],
     ["小姐", "可以，你穿穿看。", "Sure, try them on."],
     ["中明", "有一點小。有沒有大一點的？", "They're a bit small. Do you have a bigger size?"],
     ["小姐", "有，這雙怎麼樣？", "Yes. How about this pair?"],
     ["中明", "這雙很舒服，我要這雙。對了，百貨公司幾點關門？", "These are comfortable — I'll take them. By the way, what time does the department store close?"],
     ["小姐", "十點。現在九點五十分了，快要關門了。", "At ten. It's 9:50 now, so we're about to close."],
   ]},
   {"title": "練習 · 以前和現在 (Before and now)", "note": L8_NOTE, "lines": [
     ["", "我哥哥以前很胖，因為他常常吃甜點，也不喜歡運動。", "My older brother used to be fat, because he often ate desserts and didn't like exercising."],
     ["", "去年他開始每天跑步，所以瘦了十公斤。", "Last year he started running every day, so he lost ten kilos."],
     ["", "他說跑步以前，他覺得運動很難，現在覺得很容易。", "He says that before he started running he thought exercise was hard; now he finds it easy."],
     ["", "以前他喜歡穿黑色的長褲，現在他喜歡穿短褲和球鞋。", "He used to like wearing black trousers; now he likes wearing shorts and sneakers."],
     ["", "他覺得最近很流行運動衣，又好看又舒服。", "He thinks sportswear is really popular lately — it looks good and it's comfortable."],
   ]},
   {"title": "練習 · 為什麼？ (Why? — the book's classroom activity)", "note": L8_NOTE, "lines": [
     ["宜文", "為什麼沒有人買這本書？", "Why is nobody buying this book?"],
     ["國安", "因為太貴了。", "Because it's too expensive."],
     ["宜文", "為什麼他穿很多衣服？", "Why is he wearing so many clothes?"],
     ["國安", "因為天氣很冷。", "Because the weather is cold."],
     ["宜文", "為什麼他要去郵局？", "Why is he going to the post office?"],
     ["國安", "因為他要寄信。", "Because he wants to mail a letter."],
     ["宜文", "為什麼百貨公司有很多人？", "Why are there so many people at the department store?"],
     ["國安", "因為今天是星期天，大家都有空。", "Because today is Sunday and everyone is free."],
     ["宜文", "為什麼他們很開心？", "Why are they so happy?"],
     ["國安", "因為今天是她的生日。", "Because today is her birthday."],
   ]},
   {"title": "練習 · 你吃吃看！ (Try it! — VV看)", "note": L8_NOTE, "lines": [
     ["友美", "我覺得這種巧克力很好吃，你要不要吃吃看？", "I think this chocolate is really good — do you want to try some?"],
     ["元真", "好，我吃吃看。真好吃啊！", "OK, I'll try it. It's really good!"],
     ["友美", "這杯飲料也很好喝，你喝喝看。", "This drink is good too — have a taste."],
     ["元真", "對不起，我不喝冰的。", "Sorry, I don't drink cold drinks."],
     ["友美", "沒關係。對了，你聽聽看這首歌，很好聽吧？", "That's OK. Oh, listen to this song — it's nice, isn't it?"],
     ["元真", "真好聽！我覺得這首歌也很好唱。", "It's really nice! I think this song is easy to sing too."],
   ]},
  ],
  "grammar": ["g_hao_nan", "g_yinwei", "g_ba_guess", "g_vv_kan", "g_kuaiyao", "g_zhen_de", "g_pa", "g_yiqian_yihou", "g_kai_guan", "g_shijian", "g_duile"],
 },
]

GRAMMAR["g_yinwei"].update({"later": False, "bonus": False, "t": "因為…所以… — because … so …", "p": "因為 + reason，所以 + result　·　為什麼…？— 因為…",
  "x": "因為 gives the reason and 所以 the result. The 因為 part usually comes first: 因為這個牌子很有名，所以很多人買. You can also use just one of them: 我沒去上課，因為我生病了 / 他很忙，所以沒時間. "
       "Answer a 為什麼 question with 因為.",
  "ex": [["因為這個牌子很有名，衣服也很好看，所以很多人喜歡。", "Because this brand is famous and its clothes look great, lots of people like it."],
         ["A：你為什麼不想走路到學校去？B：因為學校很遠，所以我不想走路去。", "Why don't you want to walk to school? — Because school is far, so I don't want to walk."],
         ["因為他很累，所以他要在家休息。", "He's tired, so he wants to rest at home."], ["今天大家都穿很多衣服，因為天氣太冷了。", "Everyone's wearing lots of clothes today because it's too cold."],
         ["我昨天沒去上課，因為我生病了。", "I didn't go to class yesterday because I was sick."], ["他很忙，所以沒時間跟我們看電影。", "He's busy, so he has no time to see a movie with us."],
         ["因為這件衣服太貴了，所以我沒買。", "This shirt was too expensive, so I didn't buy it."]],
  "wr": [["所以天氣很冷，因為我穿大衣。", "因為天氣很冷，所以我穿大衣。", "因為 goes with the reason, 所以 with the result."], ["為什麼你不吃？— 所以我不餓。", "為什麼你不吃？— 因為我不餓。", "Answer 為什麼 with 因為."]],
  "tip": "為什麼…？ asks why · 因為… answers it · 所以… gives the result"})

GRAMMAR.update({
 "g_hao_nan": {"t": "好 / 難 + verb — nice / bad to …, easy / hard to …", "p": "好 / 難 + 吃·喝·看·聽 (nice / bad)　·　好 / 難 + 學·唱·找·騎 (easy / hard)",
  "x": "Before verbs of the senses, 好 means 'nice to …' and 難 'bad to …': 好吃 delicious, 難喝 tastes bad, 好看 good-looking, 好聽 nice to hear. "
       "Before action verbs they mean 'easy to …' and 'hard to …': 好學 easy to learn, 難找 hard to find, 好騎 easy to ride. Use them like adjectives: 很好吃, 有點兒難學, 不難找.",
  "ex": [["這家餐廳的牛肉麵很好吃，我常吃。", "This restaurant's beef noodles are delicious; I eat them often."], ["這杯茶有點兒難喝，我不要喝。", "This tea tastes a bit bad; I don't want to drink it."],
         ["這件衣服的顏色很好看，我很喜歡。", "The color of this shirt looks great; I really like it."], ["你唱歌唱得很好聽，現在唱一首，好嗎？", "You sing beautifully — sing one now, OK?"],
         ["這首中文歌很好唱，我朋友都會唱。", "This Chinese song is easy to sing; all my friends can sing it."], ["弟弟覺得英文很難學。", "My younger brother thinks English is hard to learn."],
         ["這裡附近只有一家百貨公司，很好找。", "There's only one department store around here; it's easy to find."], ["這輛腳踏車太小了，很難騎。", "This bike is too small; it's hard to ride."]],
  "wr": [["這個蛋糕很吃好。", "這個蛋糕很好吃。", "好 / 難 goes before the verb."], ["英文很學難。", "英文很難學。", "難 + verb: 難學."]],
  "tip": "好吃 ↔ 難吃 · 好喝 ↔ 難喝 · 好看 ↔ 難看 · 好聽 ↔ 難聽 · 好學 ↔ 難學 · 好找 ↔ 難找 · 不難 = 容易"},
 "g_ba_guess": {"t": "…吧？ — I suppose …, right?", "p": "statement + 吧？",
  "x": "Put 吧 at the end of a statement when you think it's true and want the other person to confirm: 你要買鞋子吧？ = You want to buy shoes, don't you? "
       "嗎 is a plain yes/no question (you don't know); 吧 means you're fairly sure. (Lesson 5's 吧 makes a suggestion: 我們走吧！)",
  "ex": [["妳要買鞋子吧？", "You want to buy shoes, don't you?"], ["你會唱中文歌吧？— 會，可是不多，我只會唱三首。", "You can sing Chinese songs, right? — Yes, but not many; I only know three."],
         ["他平常都坐捷運來上課吧？— 不是，他都坐公車來上課。", "He usually takes the MRT to class, right? — No, he always takes the bus."],
         ["你現在有空吧？要不要跟我一起去看網球比賽？", "You're free now, aren't you? Want to come and watch a tennis match with me?"], ["這條黃色的褲子不錯吧？", "These yellow pants are nice, aren't they?"],
         ["他們的蛋糕一定很好吃吧？", "Their cakes must be delicious, right?"]],
  "wr": [["你吧要買鞋子？", "你要買鞋子吧？", "吧 goes at the very end."]],
  "tip": "嗎 = I don't know · 吧？ = I think so, right? · 吧！ = let's"},
 "g_vv_kan": {"t": "V V 看 — try doing it and see", "p": "S + V + V + 看",
  "x": "Double a one-syllable action verb and add 看 to mean 'try it and see': 穿穿看 try it on, 吃吃看 try a bite, 喝喝看 have a taste, 聽聽看 have a listen, 找找看 have a look for it. 試試看 = give it a try.",
  "ex": [["我穿穿看。", "I'll try it on and see."], ["我不知道要買哪種甜點。— 你可以先吃吃看。", "I don't know which dessert to buy. — You can try some first."],
         ["聽說這裡的咖啡很好喝。— 好，我喝喝看。", "I heard the coffee here is good. — OK, I'll try it."], ["我的錢包不在我這裡，你去客廳找找看。", "Your wallet isn't with me — go and have a look in the living room."],
         ["這件衣服很漂亮，你穿穿看。", "This shirt is pretty — try it on."], ["我們再等等看吧。", "Let's wait a little longer and see."], ["從台北到桃園機場坐捷運很方便，我很想坐坐看。", "Taking the MRT from Taipei to Taoyuan Airport is convenient; I'd love to try it."]],
  "wr": [["我看穿穿。", "我穿穿看。", "看 comes last."], ["我穿看穿。", "我穿穿看。", "Double the verb first, then 看."]],
  "tip": "穿穿看 · 吃吃看 · 喝喝看 · 聽聽看 · 找找看 · 坐坐看 · 騎騎看 · 試試看"},
 "g_kuaiyao": {"t": "快(要) / 要 … 了 — about to …", "p": "(S) + 快 / 快要 / 要 + V (O) + 了",
  "x": "快要…了 (or 快…了, 要…了) says something is about to happen. 了 always comes at the end: 我們快要上課了 = class is about to start. 冬天快要到了 = winter is almost here. "
       "With a time or a number: 快要十二點了 (it's almost 12), 弟弟快要十歲了.",
  "ex": [["我們快要上課了。", "Class is about to start."], ["火車快要來了。", "The train is about to come."], ["十月了，冬天快要到了。", "It's October; winter is almost here."],
         ["現在八點五十分了，圖書館快開了。", "It's 8:50 now; the library is about to open."], ["九點了，百貨公司快要關了。", "It's nine; the department store is about to close."],
         ["十點了，飛機快要起飛了。", "It's ten; the plane is about to take off."], ["我的手機快要沒電了。", "My phone's battery is about to die."], ["我的生日快要到了。", "My birthday is coming soon."]],
  "wr": [["火車快要來。", "火車快要來了。", "Don't forget 了 at the end."], ["火車來快要了。", "火車快要來了。", "快要 goes before the verb."]],
  "tip": "快要下課了 class is almost over · 快要到了 almost there · 快要十二點了 nearly 12"},
 "g_zhen_de": {"t": "真 · 真的 · 真的嗎？ — really", "p": "真 + adjective (+ 啊)！　·　真 + 想/喜歡　·　真的 = true　·　真的嗎？",
  "x": "真 + adjective is an exclamation: 這條裙子真好看！(so pretty!) — often with 啊 at the end. 真 + verb of feeling: 我真想去日本. "
       "真的 = it's true: 我真的會說韓文. 真的嗎？ shows surprise: Really? 真的 + noun = real (not fake): 這是真的花，不是假花.",
  "ex": [["這個蛋糕真好吃啊！", "This cake is so delicious!"], ["這條裙子真漂亮啊！", "This skirt is so pretty!"], ["我真想去日本玩。", "I really want to go to Japan for fun."],
         ["A：聽說你要去日本？B：真的！我下個月要去。", "I heard you're going to Japan? — It's true! I'm going next month."], ["A：你真的會說韓文嗎？B：真的，我學了三年。", "Can you really speak Korean? — Really, I've studied it for three years."],
         ["A：小明買了一輛新車。B：真的嗎？多少錢？", "Xiaoming bought a new car. — Really? How much?"], ["這些是真的花，不是假花。", "These are real flowers, not fake ones."]],
  "wr": [["這條裙子是真好看。", "這條裙子真好看。", "No 是 before an adjective."]],
  "tip": "真好吃 so delicious · 真的 really / true · 真的嗎？ really? · 假 fake"},
 "g_pa": {"t": "怕 — to be afraid of / to worry that …", "p": "怕 + noun　·　怕 + verb　·　怕 + a whole sentence",
  "x": "怕 + noun: 我怕狗 (I'm afraid of dogs). 怕 + verb: 我怕坐飛機 (I'm afraid of flying). 怕 + sentence = to worry that something will happen: 我怕明天下雨 (I'm worried it'll rain tomorrow), 我怕衣服不好買.",
  "ex": [["我怕坐飛機。", "I'm afraid of flying."], ["妹妹怕游泳。", "My younger sister is afraid of swimming."], ["我不怕老鼠。", "I'm not afraid of mice."], ["我怕狗。", "I'm afraid of dogs."],
         ["小孩子怕黑。", "Little kids are afraid of the dark."], ["我怕明天下雨。", "I'm worried it'll rain tomorrow."], ["老師怕我們聽不懂。", "The teacher is worried we won't understand."],
         ["弟弟不喜歡唱歌，因為怕唱得不好。", "My little brother doesn't like singing because he's afraid he'll sing badly."]],
  "wr": [["我很怕了狗。", "我很怕狗。", "No 了 here."]], "tip": "不怕 not afraid · 很怕 really afraid"},
 "g_yiqian_yihou": {"t": "以前 / 以後 — before / after; in the past / in the future", "p": "time / action + 以前·以後　·　以前 … 現在 …",
  "x": "After a time or an action: 八點以前 (before eight), 下課以後 (after class), 吃飯以前 (before eating). Alone at the front, 以前 = in the past and 以後 = in the future: "
       "他以前很胖，現在很瘦. 我以後想去日本工作.",
  "ex": [["他以前很胖，現在很瘦。", "He used to be fat; now he's thin."], ["這種衣服以前很流行，現在不流行了。", "These clothes used to be popular; now they're not any more."],
         ["請在八點以前到學校。", "Please be at school before eight."], ["吃飯以前，要先洗手。", "Wash your hands before eating."], ["來台灣以前，我不會說中文。", "Before coming to Taiwan I couldn't speak Chinese."],
         ["下課以後，我要去圖書館。", "After class I'm going to the library."], ["晚上八點以後，我有時間。", "I'm free after 8 p.m."], ["我以後想去日本工作。", "In the future I want to work in Japan."]],
  "wr": [["以前吃飯，要先洗手。", "吃飯以前，要先洗手。", "以前 / 以後 go AFTER the action or time."]], "tip": "以前 before · 以後 after · 現在 now"},
 "g_kai_guan": {"t": "開 / 關 — open / close · turn on / turn off · 開車", "p": "開 / 關 + 門·窗戶·燈·電視　·　開車 / 開飛機",
  "x": "開 = to open or turn on, 關 = to close or turn off: 開門 / 關門, 開窗戶 / 關窗戶, 開燈 / 關燈, 開電視 / 關電視. A shop 開門 (opens) and 關門 (closes) at certain times. "
       "開 also means to drive: 開車, 開飛機, 開船.",
  "ex": [["學校的圖書館早上八點開，晚上九點關。", "The school library opens at 8 a.m. and closes at 9 p.m."], ["請開燈。", "Please turn on the light."], ["睡覺以前，記得關電視。", "Remember to turn off the TV before going to bed."],
         ["外面很冷，請關窗戶。", "It's cold outside — please close the window."], ["這家店早上九點開門，晚上十點關門。", "This shop opens at 9 a.m. and closes at 10 p.m."],
         ["我爸爸會開車，也會開飛機。", "My dad can drive a car, and fly a plane too."], ["他開冰箱拿牛奶。", "He opens the fridge to get the milk."]],
  "wr": [["請打開電視關。", "請關電視。", "開 / 關 + the thing."]], "tip": "開門 ↔ 關門 · 開燈 ↔ 關燈 · 開電視 ↔ 關電視"},
 "g_shijian": {"t": "時間 — time: 有時間, 沒時間, 找時間, 花時間", "p": "有時間 / 沒(有)時間 + V　·　找時間 + V　·　花 + time + V　·　長時間",
  "x": "有時間 = have time (free), 沒時間 = have no time: 我今天很忙，沒時間去看電影. 找時間 = find a time: 我們找時間一起去. 花 + time = spend time: 我每天花一個小時學中文. 長時間 = for a long time.",
  "ex": [["我們找時間一起去。", "Let's find a time to go together."], ["我最近沒有時間看電影。", "I haven't had time for movies lately."], ["你明天下午有時間嗎？我們一起去喝咖啡。", "Do you have time tomorrow afternoon? Let's go for coffee."],
         ["我每天花一個小時學中文。", "I spend an hour a day studying Chinese."], ["不要長時間看手機，對眼睛不好。", "Don't look at your phone for a long time; it's bad for your eyes."],
         ["我最近很忙，想找時間去看我的父母。", "I'm busy lately; I want to find time to visit my parents."]],
  "wr": [["我沒有時候看電影。", "我沒有時間看電影。", "Free time is 時間; 時候 means 'when'."]], "tip": "時間 = (amount of) time · 時候 = a point in time (…的時候)"},
 "g_duile": {"t": "對不起 · 沒關係 · 對了", "p": "對不起。— 沒關係。　·　對了，… (by the way / oh, I just remembered)",
  "x": "對不起 = sorry; the answer is 沒關係 (it's OK, never mind). 沒關係 also comforts: 太小了？沒關係，我們下個週末再來. 對了 changes the topic ('by the way') or shows you just remembered something: 對了！今天是你的生日.",
  "ex": [["A：對不起。B：沒關係。", "Sorry. — That's OK."], ["沒關係，我們可以下個週末再來看。", "It's OK, we can come back next weekend."], ["對了，妳要買鞋子吧？", "By the way, you want to buy shoes, don't you?"],
         ["好。對了，這杯咖啡請你給她，好嗎？", "OK. Oh, by the way, could you give her this coffee?"], ["對了！我忘了帶手機。", "Oh! I forgot my phone."], ["對了，你什麼時候回國？", "By the way, when are you going back to your country?"]],
  "wr": [["A：對不起。B：不客氣。", "A：對不起。B：沒關係。", "不客氣 answers 謝謝; 沒關係 answers 對不起."]], "tip": "謝謝 → 不客氣 · 對不起 → 沒關係"},
})

DRILLS += [
 # 好 / 難 + verb — the book's exercise
 {"k": "choose", "g": "g_hao_nan", "q": "這部電影很＿＿，我很喜歡。", "o": ["好看", "難看", "好吃"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "新的腳踏車很＿＿。", "o": ["好騎", "難騎", "好喝"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "聽說游泳很＿＿，我也想學。", "o": ["好學", "難學", "好看"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "我覺得這張畫他畫得不好，有點兒＿＿。", "o": ["難看", "好看", "難學"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "珍珠奶茶很＿＿，大家都想買一杯。", "o": ["好喝", "難喝", "好看"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "那個地方又遠又＿＿，我不想跟你去。", "o": ["難找", "好找", "好看"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "這首中文歌很＿＿，我朋友都會唱。", "o": ["好唱", "難唱", "難聽"], "a": 0},
 {"k": "choose", "g": "g_hao_nan", "q": "百貨公司都有，不＿＿找。", "o": ["難", "好", "很"], "a": 0},
 {"k": "fix", "g": "g_hao_nan", "o": ["這杯茶有點兒好喝，我不要喝。", "這杯茶有點兒難喝，我不要喝。", "這杯茶有點兒難吃，我不要喝。"], "a": 1},
 {"k": "fix", "g": "g_hao_nan", "o": ["英文很學難。", "英文很難學。", "英文難很學。"], "a": 1},
 # 因為…所以… — the slides' practice
 {"k": "choose", "g": "g_yinwei", "q": "＿＿學校很遠，＿＿我不想走路去。", "o": ["因為 / 所以", "所以 / 因為", "可是 / 也"], "a": 0},
 {"k": "choose", "g": "g_yinwei", "q": "A：你為什麼不吃冰淇淋？　B：＿＿天氣有點兒冷。", "o": ["因為", "所以", "可是"], "a": 0},
 {"k": "choose", "g": "g_yinwei", "q": "他最近很忙，＿＿每天都很累。", "o": ["所以", "因為", "可是"], "a": 0},
 {"k": "choose", "g": "g_yinwei", "q": "我昨天沒去上課，＿＿我生病了。", "o": ["因為", "所以", "可是"], "a": 0},
 {"k": "choose", "g": "g_yinwei", "q": "今天很冷，＿＿我穿一件大衣。", "o": ["所以", "因為", "還是"], "a": 0},
 {"k": "choose", "g": "g_yinwei", "q": "A：＿＿你的朋友不跟你來？　B：因為他很累。", "o": ["為什麼", "什麼", "怎麼樣"], "a": 0},
 {"k": "fix", "g": "g_yinwei", "o": ["因為天氣很冷，所以我穿大衣。", "所以天氣很冷，因為我穿大衣。", "因為天氣很冷，因為我穿大衣。"], "a": 0},
 {"k": "order", "g": "g_yinwei", "t": ["因為", "這個牌子", "很有名", "所以", "很多人", "買"], "a": ["因為這個牌子很有名所以很多人買"], "en": "Because this brand is famous, lots of people buy it."},
 {"k": "order", "g": "g_yinwei", "t": ["因為", "明天", "是我弟弟的生日", "所以", "我要", "去買禮物"], "a": ["因為明天是我弟弟的生日所以我要去買禮物"], "en": "Because tomorrow is my brother's birthday, I'm going to buy a present."},
 # 吧 — supposition
 {"k": "choose", "g": "g_ba_guess", "q": "他平常都坐捷運來上課＿＿？— 不是，他都坐公車。", "o": ["吧", "呢", "了"], "a": 0},
 {"k": "choose", "g": "g_ba_guess", "q": "好多人來這家店買蛋糕，他們的蛋糕一定很好吃＿＿？", "o": ["吧", "呢", "的"], "a": 0},
 {"k": "choose", "g": "g_ba_guess", "q": "妳看，這條黃色的褲子不錯＿＿？", "o": ["吧", "呢", "得"], "a": 0},
 {"k": "choose", "g": "g_ba_guess", "q": "A：他是韓國人＿＿？　B：是啊，他是韓國人。", "o": ["吧", "呢", "了"], "a": 0},
 {"k": "fix", "g": "g_ba_guess", "o": ["你吧要買鞋子？", "你要買鞋子吧？", "吧你要買鞋子？"], "a": 1},
 {"k": "order", "g": "g_ba_guess", "t": ["你", "現在", "有空", "吧"], "a": ["你現在有空吧", "現在你有空吧"], "en": "You're free now, aren't you?", "end": "？"},
 # V V 看
 {"k": "choose", "g": "g_vv_kan", "q": "這件衣服很漂亮，你＿＿。", "o": ["穿穿看", "穿看看", "看穿穿"], "a": 0},
 {"k": "choose", "g": "g_vv_kan", "q": "A：聽說這裡的咖啡很好喝。　B：好，我＿＿。", "o": ["喝喝看", "喝看喝", "看喝喝"], "a": 0},
 {"k": "choose", "g": "g_vv_kan", "q": "A：我的錢包在你那裡嗎？　B：不在我這裡，你去客廳＿＿。", "o": ["找找看", "找看找", "看找找"], "a": 0},
 {"k": "choose", "g": "g_vv_kan", "q": "A：我不想等他了。　B：我們再＿＿吧。", "o": ["等等看", "等看等", "看等等"], "a": 0},
 {"k": "choose", "g": "g_vv_kan", "q": "A：他們都不太喜歡這首歌，你呢？　B：我＿＿。", "o": ["聽聽看", "聽看聽", "看聽聽"], "a": 0},
 {"k": "choose", "g": "g_vv_kan", "q": "我不知道要買哪種甜點。— 你可以先＿＿。", "o": ["吃吃看", "吃看看", "看吃吃"], "a": 0},
 {"k": "fix", "g": "g_vv_kan", "o": ["我穿穿看。", "我看穿穿。", "我穿看穿。"], "a": 0},
 {"k": "order", "g": "g_vv_kan", "t": ["這兩條", "我", "都", "去", "穿穿看"], "a": ["這兩條我都去穿穿看"], "en": "I'll go and try both of these on."},
 # 快要…了
 {"k": "choose", "g": "g_kuaiyao", "q": "火車快要來＿＿。", "o": ["了", "的", "吧"], "a": 0},
 {"k": "choose", "g": "g_kuaiyao", "q": "現在八點五十分了，圖書館＿＿開了。", "o": ["快", "太", "最"], "a": 0},
 {"k": "choose", "g": "g_kuaiyao", "q": "十月了，冬天快要＿＿了。", "o": ["到", "去", "走"], "a": 0},
 {"k": "choose", "g": "g_kuaiyao", "q": "晚上九點了，百貨公司快要＿＿了。", "o": ["關", "開", "買"], "a": 0},
 {"k": "choose", "g": "g_kuaiyao", "q": "四月三號了，我的日本朋友四月五號來。我的日本朋友＿＿來了。", "o": ["快要", "最近", "以前"], "a": 0},
 {"k": "choose", "g": "g_kuaiyao", "q": "十月一號了，弟弟十月十號生日。弟弟＿＿十歲了。", "o": ["快要", "已經", "以前"], "a": 0},
 {"k": "fix", "g": "g_kuaiyao", "o": ["我們快要上課了。", "我們快要上課。", "我們上課快要了。"], "a": 0},
 {"k": "order", "g": "g_kuaiyao", "t": ["我的", "生日", "快要", "到", "了"], "a": ["我的生日快要到了"], "en": "My birthday is coming soon."},
 {"k": "order", "g": "g_kuaiyao", "t": ["百貨公司", "快要", "關", "了"], "a": ["百貨公司快要關了"], "en": "The department store is about to close."},
 # 真 / 真的
 {"k": "choose", "g": "g_zhen_de", "q": "這個蛋糕＿＿好吃啊！", "o": ["真", "是", "的"], "a": 0},
 {"k": "choose", "g": "g_zhen_de", "q": "A：小明買了一輛新車。　B：＿＿？多少錢？", "o": ["真的嗎", "真嗎", "真好"], "a": 0},
 {"k": "choose", "g": "g_zhen_de", "q": "A：你＿＿會說韓文嗎？　B：真的，我學了三年。", "o": ["真的", "真好", "很"], "a": 0},
 {"k": "choose", "g": "g_zhen_de", "q": "這些是真的花，不是＿＿花。", "o": ["假", "真", "新"], "a": 0},
 {"k": "fix", "g": "g_zhen_de", "o": ["這條裙子是真好看。", "這條裙子真好看。", "這條裙子好看真。"], "a": 1},
 # 怕
 {"k": "choose", "g": "g_pa", "q": "我很想去看，可是我最近胖了五公斤，我＿＿衣服不好買。", "o": ["怕", "會", "很"], "a": 0},
 {"k": "choose", "g": "g_pa", "q": "我＿＿明天下雨，我們今天去海邊吧。", "o": ["怕", "喜歡", "會"], "a": 0},
 {"k": "order", "g": "g_pa", "t": ["我", "怕", "坐", "飛機"], "a": ["我怕坐飛機"], "en": "I'm afraid of flying."},
 # 以前 / 以後
 {"k": "choose", "g": "g_yiqian_yihou", "q": "吃飯＿＿，要先洗手。", "o": ["以前", "以後", "前面"], "a": 0},
 {"k": "choose", "g": "g_yiqian_yihou", "q": "來台灣＿＿，我不會說中文。", "o": ["以前", "以後", "現在"], "a": 0},
 {"k": "choose", "g": "g_yiqian_yihou", "q": "他＿＿很胖，現在很瘦。", "o": ["以前", "以後", "最近"], "a": 0},
 {"k": "choose", "g": "g_yiqian_yihou", "q": "洗澡＿＿，我上床睡覺。", "o": ["以後", "以前", "前面"], "a": 0},
 {"k": "choose", "g": "g_yiqian_yihou", "q": "這種衣服以前很流行，現在不流行＿＿。", "o": ["了", "的", "吧"], "a": 0},
 {"k": "fix", "g": "g_yiqian_yihou", "o": ["以前吃飯，要先洗手。", "吃飯以前，要先洗手。", "吃飯，以前要先洗手。"], "a": 1},
 # 開 / 關
 {"k": "choose", "g": "g_kai_guan", "q": "外面很冷，請＿＿窗戶。", "o": ["關", "開", "上"], "a": 0},
 {"k": "choose", "g": "g_kai_guan", "q": "睡覺以前，記得＿＿電視。", "o": ["關", "開", "坐"], "a": 0},
 {"k": "choose", "g": "g_kai_guan", "q": "這家店早上九點＿＿門，晚上十點關門。", "o": ["開", "關", "出"], "a": 0},
 {"k": "choose", "g": "g_kai_guan", "q": "我爸爸會＿＿車，也會＿＿飛機。", "o": ["開 / 開", "騎 / 開", "關 / 關"], "a": 0},
 {"k": "choose", "g": "g_kai_guan", "q": "房間裡很黑，請＿＿燈。", "o": ["開", "關", "看"], "a": 0},
 # 時間 — the slides' fill-in (有時間 / 沒時間 / 找時間 / 長時間 / 花)
 {"k": "choose", "g": "g_shijian", "q": "我今天很忙，＿＿去看電影。", "o": ["沒時間", "有時間", "找時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "你明天下午＿＿嗎？我們一起去喝咖啡。", "o": ["有時間", "沒時間", "長時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "我每天＿＿一個小時學中文。", "o": ["花", "有", "找"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "不要＿＿看手機，對眼睛不好。", "o": ["長時間", "短時間", "找時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "我最近很忙，想＿＿去看我的父母。", "o": ["找時間", "沒時間", "長時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "他每天工作十個小時，＿＿休息。", "o": ["沒時間", "有時間", "找時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "如果你＿＿，可以教我中文嗎？", "o": ["有時間", "沒時間", "長時間"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "媽媽每天花很多＿＿做飯。", "o": ["時間", "時候", "點"], "a": 0},
 {"k": "choose", "g": "g_shijian", "q": "我們坐了＿＿的飛機，大家都很累。", "o": ["長時間", "找時間", "有時間"], "a": 0},
 # 對不起 / 沒關係 / 對了
 {"k": "choose", "g": "g_duile", "q": "A：對不起。　B：＿＿。", "o": ["沒關係", "不客氣", "對了"], "a": 0},
 {"k": "choose", "g": "g_duile", "q": "A：我要去三樓找友美。　B：好。＿＿，這杯咖啡請你給她，好嗎？", "o": ["對了", "沒關係", "對不起"], "a": 0},
 {"k": "choose", "g": "g_duile", "q": "＿＿！今天是你的生日。", "o": ["對了", "沒關係", "不客氣"], "a": 0},
 {"k": "choose", "g": "g_duile", "q": "都太短，也太小了。— ＿＿，我們可以下個週末再來看。", "o": ["沒關係", "對不起", "不客氣"], "a": 0},
 # measure words and floors
 {"k": "choose", "g": "g_mw", "q": "我想買一＿＿黑色的鞋子和一＿＿白色的襪子。", "o": ["雙 / 雙", "條 / 雙", "件 / 條"], "a": 0},
 {"k": "choose", "g": "g_mw", "q": "元真，妳的這＿＿裙子真好看。", "o": ["條", "雙", "本"], "a": 0},
 {"k": "choose", "g": "g_mw", "q": "我想買一＿＿流行雜誌。", "o": ["本", "條", "雙"], "a": 0},
 {"k": "choose", "g": "g_location", "q": "鞋子都在一＿＿，我們到樓下去吧！", "o": ["樓", "站", "路"], "a": 0},
]

# questions on the Lesson 8 texts (L8-0 dialogue 1 … L8-7 VV看), many from the class slides
READING += [
 {"text": "L8-0", "q": "元真的裙子是什麼時候的禮物？", "o": ["去年的生日禮物", "今年的生日禮物", "上星期買的"], "a": 0},
 {"text": "L8-0", "q": "為什麼很多人喜歡這個牌子？", "o": ["因為這個牌子很有名，衣服也很好看", "因為這個牌子很便宜", "因為這個牌子是新的"], "a": 0},
 {"text": "L8-0", "q": "去哪裡買這個牌子的衣服？", "o": ["百貨公司", "夜市", "超市"], "a": 0},
 {"text": "L8-0", "q": "宜文為什麼怕衣服不好買？", "o": ["她最近胖了五公斤", "她沒有錢", "百貨公司太遠"], "a": 0},
 {"text": "L8-1", "q": "今年很流行什麼顏色？", "o": ["藍色", "黃色", "黑色"], "a": 0},
 {"text": "L8-1", "q": "宜文覺得那兩條褲子怎麼樣？", "o": ["都太短，也太小了", "又便宜又好看", "太長了"], "a": 0},
 {"text": "L8-1", "q": "宜文想買什麼？", "o": ["一雙黑色的鞋子", "一條黃色的褲子", "一雙白色的襪子"], "a": 0},
 {"text": "L8-1", "q": "鞋子在幾樓？", "o": ["一樓", "二樓", "九樓"], "a": 0},
 {"text": "L8-1", "q": "為什麼她們要快一點去買？", "o": ["九點了，百貨公司快要關了", "電梯壞了", "鞋子快要賣完了"], "a": 0},
 {"text": "L8-2", "q": "百貨公司裡有什麼？", "o": ["很多衣服、鞋子和皮包", "很多汽車", "很多雜誌"], "a": 0},
 {"text": "L8-2", "q": "為什麼年輕女生喜歡到百貨公司去？", "o": ["那裡的東西都是最新的", "那裡的東西很便宜", "那裡有很多書"], "a": 0},
 {"text": "L8-2", "q": "年輕男生去書店做什麼？", "o": ["看汽車雜誌", "買新車", "看衣服"], "a": 0},
 {"text": "L8-2", "q": "為什麼年輕男生不一定可以買新車？", "o": ["汽車很貴", "書店沒有車", "他們不喜歡車"], "a": 0},
 {"text": "L8-2", "q": "他喜歡新東西，可是為什麼不常買？", "o": ["因為他的錢不多", "因為新東西不好看", "因為他沒有時間"], "a": 0},
 {"text": "L8-2", "q": "他覺得舊東西怎麼樣？", "o": ["有的很不錯", "都不好", "都太貴"], "a": 0},
 {"text": "L8-3", "q": "友美為什麼要去日本？", "o": ["她要回國看她的父母", "她要去買衣服", "她要去工作"], "a": 0},
 {"text": "L8-3", "q": "友美怕什麼？", "o": ["日本的冬天太冷", "坐飛機", "狗"], "a": 0},
 {"text": "L8-4", "q": "中明覺得第一雙球鞋怎麼樣？", "o": ["有一點小", "太大了", "太貴了"], "a": 0},
 {"text": "L8-4", "q": "百貨公司幾點關門？", "o": ["十點", "九點", "九點五十分"], "a": 0},
 {"text": "L8-5", "q": "哥哥為什麼瘦了十公斤？", "o": ["因為他每天跑步", "因為他不吃飯", "因為他生病了"], "a": 0},
 {"text": "L8-5", "q": "哥哥現在喜歡穿什麼？", "o": ["短褲和球鞋", "黑色的長褲", "大衣"], "a": 0},
 {"text": "L8-6", "q": "為什麼他穿很多衣服？", "o": ["因為天氣很冷", "因為他要去郵局", "因為今天是星期天"], "a": 0},
 {"text": "L8-6", "q": "為什麼百貨公司有很多人？", "o": ["因為今天是星期天，大家都有空", "因為今天是她的生日", "因為太貴了"], "a": 0},
 {"text": "L8-7", "q": "元真為什麼不喝那杯飲料？", "o": ["她不喝冰的", "她不喜歡巧克力", "她不渴"], "a": 0},
]

MNEMO += """
裙|衤 clothing + 君|Clothing (衤) worn like a lady (君): skirt. 裙子.
年|a person carrying grain|Carrying in the harvest once a year: year. 去年 last year, 今年 this year, 明年 next year.
牌|片 a board + 卑|A flat board (片) with a name on it: a sign, a brand. 牌子 = brand.
因|囗 enclosure + 大 person|A person (大) lying on a mat in a box: the cause, the reason. 因為 = because.
為|a hand leading an elephant|Doing hard work with an elephant: to do; for. 因為 because, 為什麼 why.
褲|衤 clothing + 庫 storeroom|Clothing (衤) with two rooms for your legs: pants. 褲子.
所|戶 door + 斤 axe|A place behind a door (戶): place. 所以 = therefore, so.
以|a plough + person|Using a tool: by means of. 所以 = so; 以前 before; 以後 after.
貨|化 change + 貝 money|What changes (化) into money (貝): goods. 百貨公司 = 'hundred-goods company' = department store.
公|八 split + 厶 private|Splitting up what is private so everyone shares it: public. 公司 company; 公斤 kilogram.
司|a mouth giving orders|Someone who gives orders: to be in charge. 公司 = company.
難|堇 clay + 隹 bird|A bird (隹) stuck in clay (堇): difficult. 難吃 tastes bad, 難學 hard to learn.
容|宀 roof + 谷 valley|A roof (宀) over a valley (谷) holds a lot: to hold. 容易 = easy.
易|sun over a lizard|A lizard changes colour easily in the sun: easy. 容易 = easy.
近|辶 walk + 斤 axe|Only an axe's throw (斤) of walking (辶): near. 最近 = lately.
胖|月 body + 半 half|Your body (月) has grown by half (半) again: fat.
瘦|疒 sickness + 叟 old man|Sick (疒) like a frail old man (叟): thin.
高|a tall tower|A tall building with a roof and a door: tall, high.
矮|矢 arrow + 委|As short as an arrow (矢): short (height).
斤|an axe|An axe, used on old scales as a weight: catty (0.6 kg). 公斤 = kilogram.
怕|忄 heart + 白 white|Your heart (忄) goes white (白): to be afraid.
時|日 sun + 寺 temple|The temple bell rings as the sun (日) moves: time. 時間 = time.
吧|口 mouth + 巴|A mouth (口) adding a soft sound at the end: 吧 — let's… / …right?
流|氵 water + 㐬|Water (氵) flowing: to flow. 流行 = flowing along = popular, trendy.
行|crossroads|A crossroads: to go, to walk; OK. 流行 = trendy.
短|矢 arrow + 豆|As short as an arrow (矢): short (length).
長|long flowing hair|An old man with long flowing hair: long (cháng).
鞋|革 leather + 圭|Leather (革) for your feet: shoe. 鞋子 = shoes.
襪|衤 clothing + 蔑|Clothing (衤) under your shoes: sock. 襪子 = socks.
雙|two birds in one hand|Two birds (隹隹) in one hand (又): a pair. 一雙鞋子.
樓|木 wood + 婁|A wooden (木) building with storeys: floor, building. 二樓 = second floor.
關|門 door + bolt|A door (門) with the bolt across it: to close, to turn off.
梯|木 wood + 弟 younger brother|Wooden (木) steps where your little brother (弟) climbs: ladder, stairs. 電梯 elevator, 樓梯 stairs.
係|亻 person + 系 a thread|People tied by a thread (系): relation. 沒關係 = no matter, it's OK.
對|丵 + 寸 hand|A hand (寸) setting things right: correct; facing. 對不起 sorry; 對了 by the way.
了|a child wrapped up|A baby all wrapped up — finished: 了 marks a change (我餓了) or a finished action.
輕|車 cart + 巠|An empty cart (車) is light: light. 年輕 = young.
皮|a hand peeling skin|A hand peeling off an animal's skin: skin, leather. 皮包 = purse.
雜|衣 clothes + 集 gather|Clothes (衣) of every kind gathered (集) together: mixed. 雜誌 = magazine.
誌|言 words + 志 will|Words (言) written down to remember (志): a record. 雜誌 = magazine.
舊|萑 an old bird + 臼|An old owl in its nest: old, used.
假|亻 person + 叚|A person (亻) borrowing someone else's look: fake.
前|in front of a boat|The front: before. 以前 = before, in the past.
後|彳 step + 幺 small + 夊 slow feet|Small, slow steps (彳 夊) trailing behind: behind, after. 以後 = after.
低|亻 person + 氐 bottom|A person (亻) bending down to the bottom (氐): low.
衫|衤 clothing + 彡 lines|Clothing (衤) with stripes (彡): shirt. 襯衫.
套|大 big + 長 long|A big (大), long piece that covers everything: cover, set. 外套 = jacket; 手套 = gloves.
毛|a feather / hair|Hair, fur, wool: 毛衣 = sweater.
傘|an umbrella|Four people (人人人人) sheltering under one umbrella: umbrella. 雨傘.
帶|a belt with things hanging|A belt with things tied on: belt; to bring. 皮帶 = belt.
眼|目 eye + 艮|The eye (目): eye. 太陽眼鏡 = sunglasses.
鏡|金 metal + 竟|Polished metal (金) that shows your face: mirror, lens. 眼鏡 = glasses.
"""
