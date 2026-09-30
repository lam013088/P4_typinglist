/**
 * =========================================================================
 * 📦 DATA.JS - 四年級速成打字【GitHub 安全版 · 方案 A】
 * 🛡️ 隱私安全承諾 (Zero-PII)：
 *    - 本檔案公開於 GitHub，完全不包含任何學生真實成績數據與全級名冊！
 *    - 網頁啟動時會透過 Webhook 自動向老師的 Google 試算表同步最新天梯戰況。
 *    - 內建各週手速賽標準速成題庫，保證離線/首度開啟絕不空白！
 * =========================================================================
 */

const DATA = {
  "benchmark_leaderboard": [],
  "top40": [],
  "class_top10": {},
  "perfect_students": {},
  "roster": {},
  "tiers_config": [
    {
      "min": 0,
      "max": 49,
      "badge": "🥉",
      "title": "🥉【新手訓練家】",
      "desc": "初登速成道館，開啟錯字討伐征途。",
      "skill": null
    },
    {
      "min": 50,
      "max": 149,
      "badge": "🥈",
      "title": "🥈【字根見習生】",
      "desc": "熟悉指法鍵位，能迅速辨識首碼與尾碼。",
      "skill": {
        "name": "⚡【精準直覺】",
        "type": "被動輔助",
        "rate": 0.25,
        "desc": "每關有 25% 機率自動聚焦高亮正確首碼精靈球！"
      }
    },
    {
      "min": 150,
      "max": 349,
      "badge": "🥇",
      "title": "🥇【鍵影遊俠】",
      "desc": "盲打速度初顯，能從容擊破各類常錯高頻字。",
      "skill": {
        "name": "🔍【雷霆看破】",
        "type": "主動隨機",
        "rate": 0.3,
        "desc": "每關開始時有 30% 機率自動剔除 2 個干擾字根球！"
      }
    },
    {
      "min": 350,
      "max": 699,
      "badge": "💎",
      "title": "💎【速成道館館主】",
      "desc": "威震一方道館，能冷靜拆解複雜易混字形。",
      "skill": {
        "name": "🛡️【聖盾防護】",
        "type": "保護格擋",
        "rate": 0.35,
        "desc": "捕捉失誤時有 35% 機率格擋一次失誤，免扣分且保留連擊！"
      }
    },
    {
      "min": 700,
      "max": 1199,
      "badge": "🔥",
      "title": "🔥【魔王討伐大將】",
      "desc": "攻克無數高難度錯字魔王，傷害爆擊力大幅提升。",
      "skill": {
        "name": "💥【烈焰爆擊】",
        "type": "增益加成",
        "rate": 0.25,
        "desc": "擊破魔王時有 25% 機率觸發爆擊，本關額外獲得 +5 點爆擊分！"
      }
    },
    {
      "min": 1200,
      "max": 1999,
      "badge": "⚡",
      "title": "⚡【疾風奧義宗師】",
      "desc": "指法如疾風驟雨，速成拆碼達到出神入化境界。",
      "skill": {
        "name": "⏳【時空凝滯】",
        "type": "提示輔助",
        "rate": 0.25,
        "desc": "遭遇難題時有 25% 機率發動，直接點亮並自動填入首碼！"
      }
    },
    {
      "min": 2000,
      "max": 3499,
      "badge": "👑",
      "title": "👑【傳奇鍵王大師】",
      "desc": "全級傳奇打字大師，任何生僻偏旁均能瞬間擊破。",
      "skill": {
        "name": "🌊【極限連擊】",
        "type": "持續增益",
        "rate": 0.3,
        "desc": "連擊 2 次以上時，答題額外獲得 +3 點連擊增益！"
      }
    },
    {
      "min": 3500,
      "max": 5000,
      "badge": "🌟",
      "title": "🌟【無雙神域殿堂至尊】",
      "desc": "登峰造極，榮登錯字討伐最高神域殿堂！",
      "skill": {
        "name": "🌌【神域天罰】",
        "type": "終極神技",
        "rate": 0.2,
        "desc": "戰鬥中有 20% 機率召喚神域天雷，秒殺魔王並額外獎勵 +10 點天罰分！"
      }
    }
  ],
  "cangjie_clean_letters": [
    {
      "code": "日",
      "key": "A",
      "category": "哲理類",
      "aux": "日、曰",
      "examples": "明、早、最、星、普"
    },
    {
      "code": "月",
      "key": "B",
      "category": "哲理類",
      "aux": "月、爫、夕、冂、冖",
      "examples": "朋、受、同、名、然、采"
    },
    {
      "code": "金",
      "key": "C",
      "category": "哲理類",
      "aux": "金、八、丷、儿",
      "examples": "錯、分、益、兒、公、曾"
    },
    {
      "code": "木",
      "key": "D",
      "category": "哲理類",
      "aux": "木、寸、才、十",
      "examples": "李、村、材、導、柴"
    },
    {
      "code": "水",
      "key": "E",
      "category": "哲理類",
      "aux": "水、氵、又、氺",
      "examples": "冰、江、友、取、求、泉"
    },
    {
      "code": "火",
      "key": "F",
      "category": "哲理類",
      "aux": "火、灬、⺌、小",
      "examples": "伙、焦、堂、尖、炎、照"
    },
    {
      "code": "土",
      "key": "G",
      "category": "哲理類",
      "aux": "土、士",
      "examples": "地、吉、志、社、城"
    },
    {
      "code": "竹",
      "key": "H",
      "category": "筆畫類",
      "aux": "竹、丿、⺮",
      "examples": "竹、笑、自、白、生、毛"
    },
    {
      "code": "戈",
      "key": "I",
      "category": "筆畫類",
      "aux": "戈、丶、厶、广",
      "examples": "找、主、台、府、應、底"
    },
    {
      "code": "十",
      "key": "J",
      "category": "筆畫類",
      "aux": "十、宀、穴",
      "examples": "汁、安、空、家、針、究"
    },
    {
      "code": "大",
      "key": "K",
      "category": "筆畫類",
      "aux": "大、乂、ナ、疒、犭",
      "examples": "天、病、左、狗、痛、猛"
    },
    {
      "code": "中",
      "key": "L",
      "category": "筆畫類",
      "aux": "中、丨、亅、川、衤",
      "examples": "巾、川、被、初、申、州"
    },
    {
      "code": "一",
      "key": "M",
      "category": "筆畫類",
      "aux": "一、厂、工、刁",
      "examples": "旦、原、巧、石、可、刁"
    },
    {
      "code": "弓",
      "key": "N",
      "category": "筆畫類",
      "aux": "弓、フ、勹、ク、乙、ㄋ、⺄",
      "examples": "引、句、包、乙、乃、風、弱"
    },
    {
      "code": "人",
      "key": "O",
      "category": "人體類",
      "aux": "人、亻、入、𠆢",
      "examples": "你、他、合、內、全、休"
    },
    {
      "code": "心",
      "key": "P",
      "category": "人體類",
      "aux": "心、忄、匕、七",
      "examples": "快、情、北、七、化、怨"
    },
    {
      "code": "手",
      "key": "Q",
      "category": "人體類",
      "aux": "手、扌、龵",
      "examples": "打、提、拜、看、拳、持"
    },
    {
      "code": "口",
      "key": "R",
      "category": "人體類",
      "aux": "口",
      "examples": "唱、叫、品、器、味、台"
    },
    {
      "code": "尸",
      "key": "S",
      "category": "字形類",
      "aux": "尸、コ、匚、阝、卩",
      "examples": "居、局、區、巨、都、節"
    },
    {
      "code": "廿",
      "key": "T",
      "category": "字形類",
      "aux": "廿、艹、龷",
      "examples": "花、草、共、黃、茶、英"
    },
    {
      "code": "山",
      "key": "U",
      "category": "字形類",
      "aux": "山、凵、屮、乚",
      "examples": "出、歲、凶、幽、逆、岳"
    },
    {
      "code": "女",
      "key": "V",
      "category": "字形類",
      "aux": "女、ㄑ、巛",
      "examples": "好、如、巡、巢、委、妹"
    },
    {
      "code": "田",
      "key": "W",
      "category": "字形類",
      "aux": "田、毌",
      "examples": "男、畏、果、思、甲、申、貫"
    },
    {
      "code": "卜",
      "key": "Y",
      "category": "字形類",
      "aux": "卜、亠、辶、冫",
      "examples": "外、高、這、道、冰、交"
    }
  ],
  "cangjie_letters_full": [
    {
      "code": "日",
      "key": "A",
      "category": "哲理類",
      "aux": "日、曰、目",
      "examples": "明、早、象、巴"
    },
    {
      "code": "月",
      "key": "B",
      "category": "哲理類",
      "aux": "月、冂、爫、冖",
      "examples": "朋、受、同、然、愛"
    },
    {
      "code": "金",
      "key": "C",
      "category": "哲理類",
      "aux": "金、八、丷、儿",
      "examples": "錯、分、四、曾"
    },
    {
      "code": "木",
      "key": "D",
      "category": "哲理類",
      "aux": "木、寸、才",
      "examples": "李、才、他"
    },
    {
      "code": "水",
      "key": "E",
      "category": "哲理類",
      "aux": "水、氵、又、氺",
      "examples": "冰、沒、求、雙、函"
    },
    {
      "code": "火",
      "key": "F",
      "category": "哲理類",
      "aux": "火、灬、小、⺌、ハ",
      "examples": "伙、堂、示、組、羔、尖"
    },
    {
      "code": "土",
      "key": "G",
      "category": "哲理類",
      "aux": "土、士",
      "examples": "社、志、地"
    },
    {
      "code": "竹",
      "key": "H",
      "category": "筆畫類",
      "aux": "竹、⺮、丿",
      "examples": "竹、笛、自、反、身"
    },
    {
      "code": "戈",
      "key": "I",
      "category": "筆畫類",
      "aux": "戈、丶、广、ム",
      "examples": "找、勺、應、允"
    },
    {
      "code": "十",
      "key": "J",
      "category": "筆畫類",
      "aux": "十、宀、穴",
      "examples": "汁、寫、究"
    },
    {
      "code": "大",
      "key": "K",
      "category": "筆畫類",
      "aux": "大、乂、ナ、疒、犭",
      "examples": "天、較、有、痛、狗"
    },
    {
      "code": "中",
      "key": "L",
      "category": "筆畫類",
      "aux": "中、丨、川、衤、肀",
      "examples": "仲、巾、川、畫、被、肅"
    },
    {
      "code": "一",
      "key": "M",
      "category": "筆畫類",
      "aux": "一、厂、工、刁",
      "examples": "旦、刁、曆、石、巧、逐"
    },
    {
      "code": "弓",
      "key": "N",
      "category": "筆畫類",
      "aux": "弓、𠃌、乚、乙、ㄋ",
      "examples": "引、例、吃、了、免、沒、風"
    },
    {
      "code": "人",
      "key": "O",
      "category": "人體類",
      "aux": "人、亻、入、𠆢",
      "examples": "你、他、內、介、合"
    },
    {
      "code": "心",
      "key": "P",
      "category": "人體類",
      "aux": "心、忄、匕、七",
      "examples": "情、性、怡、勿、七"
    },
    {
      "code": "手",
      "key": "Q",
      "category": "人體類",
      "aux": "手、扌、龵",
      "examples": "打、提、拿、拜、看"
    },
    {
      "code": "口",
      "key": "R",
      "category": "人體類",
      "aux": "口",
      "examples": "唱、叫、品、司"
    },
    {
      "code": "尸",
      "key": "S",
      "category": "字形類",
      "aux": "尸、コ、匚",
      "examples": "居、屋、展、局、區"
    },
    {
      "code": "廿",
      "key": "T",
      "category": "字形類",
      "aux": "廿、艹、龷",
      "examples": "花、草、共、黃、舊"
    },
    {
      "code": "山",
      "key": "U",
      "category": "字形類",
      "aux": "山、屮、凵",
      "examples": "出、岳、凶、幽、函"
    },
    {
      "code": "女",
      "key": "V",
      "category": "字形類",
      "aux": "女、巛、ㄑ",
      "examples": "好、始、巡、如、妹"
    },
    {
      "code": "田",
      "key": "W",
      "category": "字形類",
      "aux": "田、囗、四",
      "examples": "思、男、國、因、腦"
    },
    {
      "code": "卜",
      "key": "Y",
      "category": "字形類",
      "aux": "卜、亠、辶",
      "examples": "言、高、佔、外、走"
    }
  ],
  "aux_dataset": [
    {
      "code": "日",
      "key": "A",
      "category": "哲理類",
      "aux_list": [
        "曰"
      ],
      "examples": "明、早、最、星、普"
    },
    {
      "code": "月",
      "key": "B",
      "category": "哲理類",
      "aux_list": [
        "爫",
        "夕",
        "冂",
        "冖"
      ],
      "examples": "朋、受、同、名、然、采"
    },
    {
      "code": "金",
      "key": "C",
      "category": "哲理類",
      "aux_list": [
        "八",
        "丷",
        "儿"
      ],
      "examples": "錯、分、益、兒、公、曾"
    },
    {
      "code": "木",
      "key": "D",
      "category": "哲理類",
      "aux_list": [
        "寸",
        "才",
        "十"
      ],
      "examples": "李、村、材、導、柴"
    },
    {
      "code": "水",
      "key": "E",
      "category": "哲理類",
      "aux_list": [
        "氵",
        "又",
        "氺"
      ],
      "examples": "冰、江、友、取、求、泉"
    },
    {
      "code": "火",
      "key": "F",
      "category": "哲理類",
      "aux_list": [
        "灬",
        "⺌",
        "小"
      ],
      "examples": "伙、焦、堂、尖、炎、照"
    },
    {
      "code": "土",
      "key": "G",
      "category": "哲理類",
      "aux_list": [
        "士"
      ],
      "examples": "地、吉、志、社、城"
    },
    {
      "code": "竹",
      "key": "H",
      "category": "筆畫類",
      "aux_list": [
        "丿",
        "⺮"
      ],
      "examples": "竹、笑、自、白、生、毛"
    },
    {
      "code": "戈",
      "key": "I",
      "category": "筆畫類",
      "aux_list": [
        "丶",
        "厶",
        "广"
      ],
      "examples": "找、主、台、府、應、底"
    },
    {
      "code": "十",
      "key": "J",
      "category": "筆畫類",
      "aux_list": [
        "宀",
        "穴"
      ],
      "examples": "汁、安、空、家、針、究"
    },
    {
      "code": "大",
      "key": "K",
      "category": "筆畫類",
      "aux_list": [
        "乂",
        "ナ",
        "疒",
        "犭"
      ],
      "examples": "天、病、左、狗、痛、猛"
    },
    {
      "code": "中",
      "key": "L",
      "category": "筆畫類",
      "aux_list": [
        "丨",
        "亅",
        "川",
        "衤"
      ],
      "examples": "巾、川、被、初、申、州"
    },
    {
      "code": "一",
      "key": "M",
      "category": "筆畫類",
      "aux_list": [
        "厂",
        "工",
        "刁"
      ],
      "examples": "旦、原、巧、石、可、刁"
    },
    {
      "code": "弓",
      "key": "N",
      "category": "筆畫類",
      "aux_list": [
        "フ",
        "勹",
        "ク",
        "乙",
        "ㄋ",
        "⺄"
      ],
      "examples": "引、句、包、乙、乃、風、弱"
    },
    {
      "code": "人",
      "key": "O",
      "category": "人體類",
      "aux_list": [
        "亻",
        "入",
        "𠆢"
      ],
      "examples": "你、他、合、內、全、休"
    },
    {
      "code": "心",
      "key": "P",
      "category": "人體類",
      "aux_list": [
        "忄",
        "匕",
        "七"
      ],
      "examples": "快、情、北、七、化、怨"
    },
    {
      "code": "手",
      "key": "Q",
      "category": "人體類",
      "aux_list": [
        "扌",
        "龵"
      ],
      "examples": "打、提、拜、看、拳、持"
    },
    {
      "code": "口",
      "key": "R",
      "category": "人體類",
      "aux_list": [
        "口"
      ],
      "examples": "唱、叫、品、器、味、台"
    },
    {
      "code": "尸",
      "key": "S",
      "category": "字形類",
      "aux_list": [
        "コ",
        "匚",
        "阝",
        "卩"
      ],
      "examples": "居、局、區、巨、都、節"
    },
    {
      "code": "廿",
      "key": "T",
      "category": "字形類",
      "aux_list": [
        "艹",
        "龷"
      ],
      "examples": "花、草、共、黃、茶、英"
    },
    {
      "code": "山",
      "key": "U",
      "category": "字形類",
      "aux_list": [
        "凵",
        "屮",
        "乚"
      ],
      "examples": "出、歲、凶、幽、逆、岳"
    },
    {
      "code": "女",
      "key": "V",
      "category": "字形類",
      "aux_list": [
        "ㄑ",
        "巛",
        "女"
      ],
      "examples": "好、如、巡、巢、委、妹"
    },
    {
      "code": "田",
      "key": "W",
      "category": "字形類",
      "aux_list": [
        "毌"
      ],
      "examples": "男、畏、果、思、甲、申、貫"
    },
    {
      "code": "卜",
      "key": "Y",
      "category": "字形類",
      "aux_list": [
        "亠",
        "辶",
        "冫"
      ],
      "examples": "外、高、這、道、冰、交"
    }
  ],
  "pokemon_pool": [
    {
      "id": 25,
      "name": "皮卡丘",
      "tag": "⚡ 電氣",
      "icon": "⚡",
      "color": "#FEF08A",
      "border": "#FACC15",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    },
    {
      "id": 4,
      "name": "小火龍",
      "tag": "🔥 火焰",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#FB923C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
      "id": 1,
      "name": "妙蛙種子",
      "tag": "🍃 草系",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#4ADE80",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
      "id": 7,
      "name": "傑尼龜",
      "tag": "💧 水系",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#38BDF8",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    },
    {
      "id": 6,
      "name": "噴火龍",
      "tag": "🔥 飛火",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    },
    {
      "id": 9,
      "name": "水箭龜",
      "tag": "💧 巨浪",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png"
    },
    {
      "id": 26,
      "name": "雷丘",
      "tag": "⚡ 雷霆",
      "icon": "⚡",
      "color": "#FEF9C3",
      "border": "#EAB308",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png"
    },
    {
      "id": 35,
      "name": "皮皮",
      "tag": "✨ 妖精",
      "icon": "✨",
      "color": "#FCE7F3",
      "border": "#F472B6",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png"
    },
    {
      "id": 37,
      "name": "六尾",
      "tag": "🔥 狐火",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#F97316",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
    },
    {
      "id": 38,
      "name": "九尾",
      "tag": "🔥 幻火",
      "icon": "🔥",
      "color": "#FEF3C7",
      "border": "#F59E0B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png"
    },
    {
      "id": 39,
      "name": "胖丁",
      "tag": "🎵 音律",
      "icon": "🎵",
      "color": "#FCE7F3",
      "border": "#EC4899",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png"
    },
    {
      "id": 52,
      "name": "喵喵",
      "tag": "💰 聚寶",
      "icon": "💰",
      "color": "#FFF7ED",
      "border": "#FDBA74",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png"
    },
    {
      "id": 54,
      "name": "可達鴨",
      "tag": "🧠 念力",
      "icon": "🧠",
      "color": "#FEF9C3",
      "border": "#FACC15",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
    },
    {
      "id": 58,
      "name": "卡蒂狗",
      "tag": "🔥 忠勇",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#FB923C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png"
    },
    {
      "id": 59,
      "name": "風速狗",
      "tag": "🔥 烈焰",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png"
    },
    {
      "id": 65,
      "name": "胡地",
      "tag": "🔮 超能",
      "icon": "🔮",
      "color": "#FEF08A",
      "border": "#CA8A04",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png"
    },
    {
      "id": 68,
      "name": "怪力",
      "tag": "🥊 格鬥",
      "icon": "🥊",
      "color": "#E2E8F0",
      "border": "#64748B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png"
    },
    {
      "id": 77,
      "name": "小火馬",
      "tag": "🔥 疾馳",
      "icon": "🔥",
      "color": "#FFF1F2",
      "border": "#FB7185",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png"
    },
    {
      "id": 79,
      "name": "呆呆獸",
      "tag": "💤 悠閒",
      "icon": "💤",
      "color": "#FDF2F8",
      "border": "#F472B6",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png"
    },
    {
      "id": 94,
      "name": "耿鬼",
      "tag": "👻 幽靈",
      "icon": "👻",
      "color": "#F3E8FF",
      "border": "#9333EA",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png"
    },
    {
      "id": 130,
      "name": "暴鯉龍",
      "tag": "🌊 狂瀾",
      "icon": "🌊",
      "color": "#DBEAFE",
      "border": "#1D4ED8",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png"
    },
    {
      "id": 131,
      "name": "拉普拉斯",
      "tag": "❄️ 乘浪",
      "icon": "❄️",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png"
    },
    {
      "id": 132,
      "name": "百變怪",
      "tag": "⭐ 變身",
      "icon": "⭐",
      "color": "#F5F3FF",
      "border": "#A855F7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
    },
    {
      "id": 133,
      "name": "伊布",
      "tag": "⭐ 潛力",
      "icon": "⭐",
      "color": "#FEF3C7",
      "border": "#F59E0B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
    },
    {
      "id": 134,
      "name": "水伊布",
      "tag": "💧 水華",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#06B6D4",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png"
    },
    {
      "id": 135,
      "name": "雷伊布",
      "tag": "⚡ 迅雷",
      "icon": "⚡",
      "color": "#FEF08A",
      "border": "#EAB308",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png"
    },
    {
      "id": 136,
      "name": "火伊布",
      "tag": "🔥 炎熱",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EF4444",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png"
    },
    {
      "id": 143,
      "name": "卡比獸",
      "tag": "💤 泰山",
      "icon": "💤",
      "color": "#E2E8F0",
      "border": "#475569",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png"
    },
    {
      "id": 144,
      "name": "急凍鳥",
      "tag": "❄️ 冰風",
      "icon": "❄️",
      "color": "#E0F2FE",
      "border": "#38BDF8",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png"
    },
    {
      "id": 145,
      "name": "閃電鳥",
      "tag": "⚡ 雷鳴",
      "icon": "⚡",
      "color": "#FEF08A",
      "border": "#EAB308",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png"
    },
    {
      "id": 146,
      "name": "火焰鳥",
      "tag": "🔥 火羽",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png"
    },
    {
      "id": 147,
      "name": "迷你龍",
      "tag": "🐉 龍裔",
      "icon": "🐉",
      "color": "#E0E7FF",
      "border": "#6366F1",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png"
    },
    {
      "id": 149,
      "name": "快龍",
      "tag": "🐉 龍威",
      "icon": "🐉",
      "color": "#FEF3C7",
      "border": "#F59E0B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png"
    },
    {
      "id": 150,
      "name": "超夢",
      "tag": "🔮 絕頂",
      "icon": "🔮",
      "color": "#F3E8FF",
      "border": "#7C3AED",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
    },
    {
      "id": 151,
      "name": "夢幻",
      "tag": "✨ 傳奇",
      "icon": "✨",
      "color": "#FDF2F8",
      "border": "#F43F5E",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png"
    },
    {
      "id": 152,
      "name": "菊草葉",
      "tag": "🍃 香氣",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#22C55E",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png"
    },
    {
      "id": 155,
      "name": "火球鼠",
      "tag": "🔥 火花",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#F97316",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png"
    },
    {
      "id": 158,
      "name": "小鋸鱷",
      "tag": "💧 巨顎",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png"
    },
    {
      "id": 172,
      "name": "皮丘",
      "tag": "⚡ 電氣",
      "icon": "⚡",
      "color": "#FEF08A",
      "border": "#FACC15",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png"
    },
    {
      "id": 175,
      "name": "波克比",
      "tag": "🥚 幸運",
      "icon": "🥚",
      "color": "#FFFBEB",
      "border": "#FCD34D",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png"
    },
    {
      "id": 179,
      "name": "咩利羊",
      "tag": "⚡ 棉絨",
      "icon": "⚡",
      "color": "#FEF9C3",
      "border": "#FACC15",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png"
    },
    {
      "id": 183,
      "name": "瑪力露",
      "tag": "💧 水球",
      "icon": "💧",
      "color": "#DBEAFE",
      "border": "#3B82F6",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/183.png"
    },
    {
      "id": 196,
      "name": "太陽伊布",
      "tag": "🔮 晨曦",
      "icon": "🔮",
      "color": "#F3E8FF",
      "border": "#A855F7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png"
    },
    {
      "id": 197,
      "name": "月亮伊布",
      "tag": "🌙 月夜",
      "icon": "🌙",
      "color": "#F1F5F9",
      "border": "#334155",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png"
    },
    {
      "id": 202,
      "name": "果然翁",
      "tag": "🛡️ 反擊",
      "icon": "🛡️",
      "color": "#DBEAFE",
      "border": "#2563EB",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/202.png"
    },
    {
      "id": 246,
      "name": "由基拉",
      "tag": "🪨 岩石",
      "icon": "🪨",
      "color": "#ECFCCB",
      "border": "#65A30D",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/246.png"
    },
    {
      "id": 248,
      "name": "班基拉斯",
      "tag": "🪨 霸主",
      "icon": "🪨",
      "color": "#ECFCCB",
      "border": "#4D7C0F",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png"
    },
    {
      "id": 249,
      "name": "洛奇亞",
      "tag": "🌊 海神",
      "icon": "🌊",
      "color": "#EFF6FF",
      "border": "#1D4ED8",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png"
    },
    {
      "id": 250,
      "name": "鳳王",
      "tag": "🌈 彩虹",
      "icon": "🌈",
      "color": "#FEF2F2",
      "border": "#DC2626",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png"
    },
    {
      "id": 251,
      "name": "雪拉比",
      "tag": "🌲 森林",
      "icon": "🌲",
      "color": "#DCFCE7",
      "border": "#16A34A",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/251.png"
    },
    {
      "id": 252,
      "name": "木守宮",
      "tag": "🍃 拍擊",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#15803D",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png"
    },
    {
      "id": 255,
      "name": "火稚雞",
      "tag": "🔥 暖心",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png"
    },
    {
      "id": 258,
      "name": "水躍魚",
      "tag": "💧 潮汐",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png"
    },
    {
      "id": 280,
      "name": "拉魯拉絲",
      "tag": "✨ 感知",
      "icon": "✨",
      "color": "#ECFDF5",
      "border": "#059669",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/280.png"
    },
    {
      "id": 282,
      "name": "沙奈朵",
      "tag": "✨ 守護",
      "icon": "✨",
      "color": "#ECFDF5",
      "border": "#10B981",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png"
    },
    {
      "id": 300,
      "name": "向尾喵",
      "tag": "🐾 萌萌",
      "icon": "🐾",
      "color": "#FCE7F3",
      "border": "#F472B6",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/300.png"
    },
    {
      "id": 359,
      "name": "阿勃梭魯",
      "tag": "⚔️ 災難",
      "icon": "⚔️",
      "color": "#F8FAFC",
      "border": "#475569",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/359.png"
    },
    {
      "id": 384,
      "name": "烈空坐",
      "tag": "🐉 蒼空",
      "icon": "🐉",
      "color": "#DCFCE7",
      "border": "#047857",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png"
    },
    {
      "id": 385,
      "name": "基拉祈",
      "tag": "⭐ 願望",
      "icon": "⭐",
      "color": "#FEF9C3",
      "border": "#FACC15",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/385.png"
    },
    {
      "id": 387,
      "name": "草苗龜",
      "tag": "🍃 苗木",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#15803D",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png"
    },
    {
      "id": 390,
      "name": "小火焰猴",
      "tag": "🔥 靈巧",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png"
    },
    {
      "id": 393,
      "name": "波加曼",
      "tag": "🐧 驕傲",
      "icon": "🐧",
      "color": "#E0E7FF",
      "border": "#6366F1",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png"
    },
    {
      "id": 403,
      "name": "小貓怪",
      "tag": "⚡ 閃光",
      "icon": "⚡",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/403.png"
    },
    {
      "id": 446,
      "name": "小卡比獸",
      "tag": "🍙 活力",
      "icon": "🍙",
      "color": "#ECFDF5",
      "border": "#059669",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/446.png"
    },
    {
      "id": 448,
      "name": "路卡利歐",
      "tag": "🥊 波導",
      "icon": "🥊",
      "color": "#E0F2FE",
      "border": "#2563EB",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png"
    },
    {
      "id": 470,
      "name": "葉伊布",
      "tag": "🍃 綠意",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#16A34A",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png"
    },
    {
      "id": 471,
      "name": "冰伊布",
      "tag": "❄️ 霜雪",
      "icon": "❄️",
      "color": "#E0F2FE",
      "border": "#06B6D4",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png"
    },
    {
      "id": 492,
      "name": "謝米",
      "tag": "🌸 感恩",
      "icon": "🌸",
      "color": "#F0FDF4",
      "border": "#22C55E",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/492.png"
    },
    {
      "id": 493,
      "name": "阿爾宙斯",
      "tag": "🌟 創世",
      "icon": "🌟",
      "color": "#FFFBEB",
      "border": "#D97706",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png"
    },
    {
      "id": 495,
      "name": "藤藤蛇",
      "tag": "🍃 優雅",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#15803D",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png"
    },
    {
      "id": 501,
      "name": "水水獺",
      "tag": "💧 扇貝",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png"
    },
    {
      "id": 570,
      "name": "索羅亞",
      "tag": "🦊 幻影",
      "icon": "🦊",
      "color": "#F1F5F9",
      "border": "#1E293B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/570.png"
    },
    {
      "id": 571,
      "name": "索羅亞克",
      "tag": "🦊 魘幻",
      "icon": "🦊",
      "color": "#F1F5F9",
      "border": "#0F172A",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png"
    },
    {
      "id": 653,
      "name": "火狐狸",
      "tag": "🔥 魔導",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#F97316",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png"
    },
    {
      "id": 658,
      "name": "甲賀忍蛙",
      "tag": "🌊 飛水",
      "icon": "🌊",
      "color": "#DBEAFE",
      "border": "#1D4ED8",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png"
    },
    {
      "id": 700,
      "name": "仙子伊布",
      "tag": "🎀 曼妙",
      "icon": "🎀",
      "color": "#FDF2F8",
      "border": "#F472B6",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png"
    },
    {
      "id": 702,
      "name": "咚咚鼠",
      "tag": "⚡ 頰囊",
      "icon": "⚡",
      "color": "#FEF3C7",
      "border": "#F59E0B",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/702.png"
    },
    {
      "id": 719,
      "name": "蒂安希",
      "tag": "💎 晶瑩",
      "icon": "💎",
      "color": "#FDF2F8",
      "border": "#FB7185",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/719.png"
    },
    {
      "id": 722,
      "name": "木木梟",
      "tag": "🍃 飛葉",
      "icon": "🍃",
      "color": "#FEF3C7",
      "border": "#84CC16",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png"
    },
    {
      "id": 778,
      "name": "謎擬Ｑ",
      "tag": "👻 謎裝",
      "icon": "👻",
      "color": "#FEFCE8",
      "border": "#CA8A04",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png"
    },
    {
      "id": 802,
      "name": "瑪夏多",
      "tag": "🥊 暗影",
      "icon": "🥊",
      "color": "#F1F5F9",
      "border": "#334155",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/802.png"
    },
    {
      "id": 807,
      "name": "捷拉奧拉",
      "tag": "⚡ 疾雷",
      "icon": "⚡",
      "color": "#FEF9C3",
      "border": "#EAB308",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png"
    },
    {
      "id": 810,
      "name": "敲音猴",
      "tag": "🥁 節拍",
      "icon": "🥁",
      "color": "#DCFCE7",
      "border": "#16A34A",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png"
    },
    {
      "id": 813,
      "name": "炎兔兒",
      "tag": "🔥 蹴擊",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EF4444",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png"
    },
    {
      "id": 816,
      "name": "淚眼蜥",
      "tag": "💧 水狙",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png"
    },
    {
      "id": 888,
      "name": "蒼響",
      "tag": "⚔️ 劍聖",
      "icon": "⚔️",
      "color": "#DBEAFE",
      "border": "#2563EB",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/888.png"
    },
    {
      "id": 906,
      "name": "新葉喵",
      "tag": "🍃 花草",
      "icon": "🍃",
      "color": "#DCFCE7",
      "border": "#22C55E",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png"
    },
    {
      "id": 909,
      "name": "呆火鱷",
      "tag": "🔥 歌唱",
      "icon": "🔥",
      "color": "#FFEDD5",
      "border": "#EA580C",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png"
    },
    {
      "id": 912,
      "name": "潤水鴨",
      "tag": "💧 舞者",
      "icon": "💧",
      "color": "#E0F2FE",
      "border": "#0284C7",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png"
    },
    {
      "id": 921,
      "name": "布撥",
      "tag": "⚡ 電氣",
      "icon": "⚡",
      "color": "#FEF3C7",
      "border": "#F97316",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/921.png"
    },
    {
      "id": 1008,
      "name": "密勒頓",
      "tag": "⚡ 未來",
      "icon": "⚡",
      "color": "#EDE9FE",
      "border": "#7C3AED",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png"
    }
  ],
  "cangjie_words": [
    {
      "char": "明",
      "codes": [
        "日",
        "月"
      ],
      "keys": [
        "A",
        "B"
      ],
      "first_code": "日",
      "last_code": "月",
      "first_key": "A",
      "last_key": "B",
      "secret": "首碼【日】(A) ＋ 尾碼【月】(B)"
    },
    {
      "char": "早",
      "codes": [
        "日",
        "十"
      ],
      "keys": [
        "A",
        "J"
      ],
      "first_code": "日",
      "last_code": "十",
      "first_key": "A",
      "last_key": "J",
      "secret": "首碼【日】(A) ＋ 尾碼【十】(J)"
    },
    {
      "char": "木",
      "codes": [
        "木"
      ],
      "keys": [
        "D"
      ],
      "first_code": "木",
      "last_code": "木",
      "first_key": "D",
      "last_key": "D",
      "secret": "獨體字【木】(D)"
    }
  ]
};

const MODE2_WEEKLY_BANKS = {
  "w2_hw1": {
    "key": "w2_hw1",
    "week": "w2",
    "weekName": "第2周",
    "hwName": "功課1",
    "title": "第2周功課1",
    "dateRange": "07/09/2026 7:00 AM - 13/09/2026 11:30 PM",
    "startDate": "2026-09-07T07:00:00+08:00",
    "endDate": "2026-09-13T23:30:00+08:00",
    "words": [
      {
        "char": "枝",
        "codes": [
          "木",
          "水"
        ],
        "keys": [
          "D",
          "E"
        ],
        "full": "木水 (DE)",
        "cj_full": "木十水 (DJE)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【水】(E)"
      },
      {
        "char": "晶",
        "codes": [
          "日",
          "日"
        ],
        "keys": [
          "A",
          "A"
        ],
        "full": "日日 (AA)",
        "cj_full": "日日日 (AAA)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【日】(A)"
      },
      {
        "char": "暗",
        "codes": [
          "日",
          "日"
        ],
        "keys": [
          "A",
          "A"
        ],
        "full": "日日 (AA)",
        "cj_full": "日卜廿日 (AYTA)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【日】(A)"
      },
      {
        "char": "最",
        "codes": [
          "日",
          "水"
        ],
        "keys": [
          "A",
          "E"
        ],
        "full": "日水 (AE)",
        "cj_full": "日尸十水 (ASJE)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【水】(E)"
      },
      {
        "char": "深",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水月金木 (EBCD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "殼",
        "codes": [
          "土",
          "水"
        ],
        "keys": [
          "G",
          "E"
        ],
        "full": "土水 (GE)",
        "cj_full": "土弓竹弓水 (GNHNE)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【水】(E)"
      },
      {
        "char": "間",
        "codes": [
          "日",
          "日"
        ],
        "keys": [
          "A",
          "A"
        ],
        "full": "日日 (AA)",
        "cj_full": "日弓日 (ANA)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【日】(A)"
      },
      {
        "char": "榮",
        "codes": [
          "火",
          "木"
        ],
        "keys": [
          "F",
          "D"
        ],
        "full": "火木 (FD)",
        "cj_full": "火火月木 (FFBD)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【木】(D)"
      },
      {
        "char": "赤",
        "codes": [
          "土",
          "金"
        ],
        "keys": [
          "G",
          "C"
        ],
        "full": "土金 (GC)",
        "cj_full": "土中弓金 (GLNC)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【金】(C)"
      },
      {
        "char": "景",
        "codes": [
          "日",
          "火"
        ],
        "keys": [
          "A",
          "F"
        ],
        "full": "日火 (AF)",
        "cj_full": "日卜口火 (AYRF)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【火】(F)"
      },
      {
        "char": "照",
        "codes": [
          "日",
          "火"
        ],
        "keys": [
          "A",
          "F"
        ],
        "full": "日火 (AF)",
        "cj_full": "日口火 (ARF)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【火】(F)"
      },
      {
        "char": "然",
        "codes": [
          "月",
          "火"
        ],
        "keys": [
          "B",
          "F"
        ],
        "full": "月火 (BF)",
        "cj_full": "月大火 (BKF)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【火】(F)"
      },
      {
        "char": "增",
        "codes": [
          "土",
          "日"
        ],
        "keys": [
          "G",
          "A"
        ],
        "full": "土日 (GA)",
        "cj_full": "土金田日 (GCWA)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【日】(A)"
      },
      {
        "char": "沒",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水弓水 (ENE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "受",
        "codes": [
          "月",
          "水"
        ],
        "keys": [
          "B",
          "E"
        ],
        "full": "月水 (BE)",
        "cj_full": "月月水 (BBE)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【水】(E)"
      },
      {
        "char": "愛",
        "codes": [
          "月",
          "水"
        ],
        "keys": [
          "B",
          "E"
        ],
        "full": "月水 (BE)",
        "cj_full": "月月心水 (BBPE)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【水】(E)"
      },
      {
        "char": "坡",
        "codes": [
          "土",
          "水"
        ],
        "keys": [
          "G",
          "E"
        ],
        "full": "土水 (GE)",
        "cj_full": "土木竹水 (GDHE)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【水】(E)"
      },
      {
        "char": "肚",
        "codes": [
          "月",
          "土"
        ],
        "keys": [
          "B",
          "G"
        ],
        "full": "月土 (BG)",
        "cj_full": "月土 (BG)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【土】(G)"
      },
      {
        "char": "晴",
        "codes": [
          "日",
          "月"
        ],
        "keys": [
          "A",
          "B"
        ],
        "full": "日月 (AB)",
        "cj_full": "日手一月 (AQMB)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【月】(B)"
      },
      {
        "char": "汪",
        "codes": [
          "水",
          "土"
        ],
        "keys": [
          "E",
          "G"
        ],
        "full": "水土 (EG)",
        "cj_full": "水一土 (EMG)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【土】(G)"
      },
      {
        "char": "漂",
        "codes": [
          "水",
          "火"
        ],
        "keys": [
          "E",
          "F"
        ],
        "full": "水火 (EF)",
        "cj_full": "水一田火 (EMWF)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【火】(F)"
      },
      {
        "char": "橫",
        "codes": [
          "木",
          "金"
        ],
        "keys": [
          "D",
          "C"
        ],
        "full": "木金 (DC)",
        "cj_full": "木廿一金 (DTMC)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【金】(C)"
      },
      {
        "char": "淨",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水月尸木 (EBSD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "具",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月一一金 (BMMC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "消",
        "codes": [
          "水",
          "月"
        ],
        "keys": [
          "E",
          "B"
        ],
        "full": "水月 (EB)",
        "cj_full": "水火月 (EFB)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【月】(B)"
      },
      {
        "char": "精",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火木手一月 (FDQMB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "鯊",
        "codes": [
          "水",
          "火"
        ],
        "keys": [
          "E",
          "F"
        ],
        "full": "水火 (EF)",
        "cj_full": "水竹弓田火 (EHNWF)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【火】(F)"
      },
      {
        "char": "渡",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水戈廿水 (EITE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "演",
        "codes": [
          "水",
          "金"
        ],
        "keys": [
          "E",
          "C"
        ],
        "full": "水金 (EC)",
        "cj_full": "水十一金 (EJMC)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【金】(C)"
      },
      {
        "char": "湖",
        "codes": [
          "水",
          "月"
        ],
        "keys": [
          "E",
          "B"
        ],
        "full": "水月 (EB)",
        "cj_full": "水十口月 (EJRB)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【月】(B)"
      },
      {
        "char": "雞",
        "codes": [
          "月",
          "土"
        ],
        "keys": [
          "B",
          "G"
        ],
        "full": "月土 (BG)",
        "cj_full": "月大人土 (BKOG)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【土】(G)"
      },
      {
        "char": "滑",
        "codes": [
          "水",
          "月"
        ],
        "keys": [
          "E",
          "B"
        ],
        "full": "水月 (EB)",
        "cj_full": "水月月月 (EBBB)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【月】(B)"
      },
      {
        "char": "骨",
        "codes": [
          "月",
          "月"
        ],
        "keys": [
          "B",
          "B"
        ],
        "full": "月月 (BB)",
        "cj_full": "月月月 (BBB)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【月】(B)"
      },
      {
        "char": "柱",
        "codes": [
          "木",
          "土"
        ],
        "keys": [
          "D",
          "G"
        ],
        "full": "木土 (DG)",
        "cj_full": "木卜土 (DYG)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【土】(G)"
      },
      {
        "char": "漁",
        "codes": [
          "水",
          "火"
        ],
        "keys": [
          "E",
          "F"
        ],
        "full": "水火 (EF)",
        "cj_full": "水弓田火 (ENWF)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【火】(F)"
      }
    ]
  },
  "w2_hw2": {
    "key": "w2_hw2",
    "week": "w2",
    "weekName": "第2周",
    "hwName": "功課2",
    "title": "第2周功課2",
    "dateRange": "07/09/2026 7:00 AM - 13/09/2026 11:30 PM",
    "startDate": "2026-09-07T07:00:00+08:00",
    "endDate": "2026-09-13T23:30:00+08:00",
    "words": [
      {
        "char": "池",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水心木 (EPD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "淡",
        "codes": [
          "水",
          "火"
        ],
        "keys": [
          "E",
          "F"
        ],
        "full": "水火 (EF)",
        "cj_full": "水火火 (EFF)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【火】(F)"
      },
      {
        "char": "潑",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水弓人水 (ENOE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "澡",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水口口木 (ERRD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "肖",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火月 (FB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "明",
        "codes": [
          "日",
          "月"
        ],
        "keys": [
          "A",
          "B"
        ],
        "full": "日月 (AB)",
        "cj_full": "日月 (AB)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【月】(B)"
      },
      {
        "char": "祭",
        "codes": [
          "月",
          "火"
        ],
        "keys": [
          "B",
          "F"
        ],
        "full": "月火 (BF)",
        "cj_full": "月人一一火 (BOMMF)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【火】(F)"
      },
      {
        "char": "林",
        "codes": [
          "木",
          "木"
        ],
        "keys": [
          "D",
          "D"
        ],
        "full": "木木 (DD)",
        "cj_full": "木木 (DD)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【木】(D)"
      },
      {
        "char": "服",
        "codes": [
          "月",
          "水"
        ],
        "keys": [
          "B",
          "E"
        ],
        "full": "月水 (BE)",
        "cj_full": "月尸中水 (BSLE)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【水】(E)"
      },
      {
        "char": "煙",
        "codes": [
          "火",
          "土"
        ],
        "keys": [
          "F",
          "G"
        ],
        "full": "火土 (FG)",
        "cj_full": "火一田土 (FMWG)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【土】(G)"
      },
      {
        "char": "橋",
        "codes": [
          "木",
          "月"
        ],
        "keys": [
          "D",
          "B"
        ],
        "full": "木月 (DB)",
        "cj_full": "木竹大月 (DHKB)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【月】(B)"
      },
      {
        "char": "曾",
        "codes": [
          "金",
          "日"
        ],
        "keys": [
          "C",
          "A"
        ],
        "full": "金日 (CA)",
        "cj_full": "金田日 (CWA)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【日】(A)"
      },
      {
        "char": "鐘",
        "codes": [
          "金",
          "土"
        ],
        "keys": [
          "C",
          "G"
        ],
        "full": "金土 (CG)",
        "cj_full": "金卜廿土 (CYTG)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【土】(G)"
      },
      {
        "char": "糕",
        "codes": [
          "火",
          "火"
        ],
        "keys": [
          "F",
          "F"
        ],
        "full": "火火 (FF)",
        "cj_full": "火木廿土火 (FDTGF)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【火】(F)"
      },
      {
        "char": "杜",
        "codes": [
          "木",
          "土"
        ],
        "keys": [
          "D",
          "G"
        ],
        "full": "木土 (DG)",
        "cj_full": "木土 (DG)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【土】(G)"
      },
      {
        "char": "清",
        "codes": [
          "水",
          "月"
        ],
        "keys": [
          "E",
          "B"
        ],
        "full": "水月 (EB)",
        "cj_full": "水手一月 (EQMB)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【月】(B)"
      },
      {
        "char": "量",
        "codes": [
          "日",
          "土"
        ],
        "keys": [
          "A",
          "G"
        ],
        "full": "日土 (AG)",
        "cj_full": "日一田土 (AMWG)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【土】(G)"
      },
      {
        "char": "棉",
        "codes": [
          "木",
          "月"
        ],
        "keys": [
          "D",
          "B"
        ],
        "full": "木月 (DB)",
        "cj_full": "木竹日月 (DHAB)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【月】(B)"
      },
      {
        "char": "樣",
        "codes": [
          "木",
          "水"
        ],
        "keys": [
          "D",
          "E"
        ],
        "full": "木水 (DE)",
        "cj_full": "木廿土水 (DTGE)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【水】(E)"
      },
      {
        "char": "標",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木一田火 (DMWF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "爭",
        "codes": [
          "月",
          "木"
        ],
        "keys": [
          "B",
          "D"
        ],
        "full": "月木 (BD)",
        "cj_full": "月尸木 (BSD)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【木】(D)"
      },
      {
        "char": "錄",
        "codes": [
          "金",
          "水"
        ],
        "keys": [
          "C",
          "E"
        ],
        "full": "金水 (CE)",
        "cj_full": "金女弓水 (CVNE)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【水】(E)"
      },
      {
        "char": "森",
        "codes": [
          "木",
          "木"
        ],
        "keys": [
          "D",
          "D"
        ],
        "full": "木木 (DD)",
        "cj_full": "木木木 (DDD)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【木】(D)"
      },
      {
        "char": "皮",
        "codes": [
          "木",
          "水"
        ],
        "keys": [
          "D",
          "E"
        ],
        "full": "木水 (DE)",
        "cj_full": "木竹水 (DHE)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【水】(E)"
      },
      {
        "char": "李",
        "codes": [
          "木",
          "木"
        ],
        "keys": [
          "D",
          "D"
        ],
        "full": "木木 (DD)",
        "cj_full": "木弓木 (DND)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【木】(D)"
      },
      {
        "char": "棵",
        "codes": [
          "木",
          "木"
        ],
        "keys": [
          "D",
          "D"
        ],
        "full": "木木 (DD)",
        "cj_full": "木田木 (DWD)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【木】(D)"
      },
      {
        "char": "棋",
        "codes": [
          "木",
          "金"
        ],
        "keys": [
          "D",
          "C"
        ],
        "full": "木金 (DC)",
        "cj_full": "木廿一金 (DTMC)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【金】(C)"
      },
      {
        "char": "柏",
        "codes": [
          "木",
          "日"
        ],
        "keys": [
          "D",
          "A"
        ],
        "full": "木日 (DA)",
        "cj_full": "木竹日 (DHA)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【日】(A)"
      },
      {
        "char": "板",
        "codes": [
          "木",
          "水"
        ],
        "keys": [
          "D",
          "E"
        ],
        "full": "木水 (DE)",
        "cj_full": "木竹水 (DHE)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【水】(E)"
      },
      {
        "char": "昌",
        "codes": [
          "日",
          "日"
        ],
        "keys": [
          "A",
          "A"
        ],
        "full": "日日 (AA)",
        "cj_full": "日日 (AA)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【日】(A)"
      },
      {
        "char": "注",
        "codes": [
          "水",
          "土"
        ],
        "keys": [
          "E",
          "G"
        ],
        "full": "水土 (EG)",
        "cj_full": "水卜土 (EYG)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【土】(G)"
      },
      {
        "char": "米",
        "codes": [
          "火",
          "木"
        ],
        "keys": [
          "F",
          "D"
        ],
        "full": "火木 (FD)",
        "cj_full": "火木 (FD)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【木】(D)"
      },
      {
        "char": "埋",
        "codes": [
          "土",
          "土"
        ],
        "keys": [
          "G",
          "G"
        ],
        "full": "土土 (GG)",
        "cj_full": "土田土 (GWG)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【土】(G)"
      },
      {
        "char": "堆",
        "codes": [
          "土",
          "土"
        ],
        "keys": [
          "G",
          "G"
        ],
        "full": "土土 (GG)",
        "cj_full": "土人土 (GOG)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【土】(G)"
      },
      {
        "char": "鼓",
        "codes": [
          "土",
          "水"
        ],
        "keys": [
          "G",
          "E"
        ],
        "full": "土水 (GE)",
        "cj_full": "土廿十水 (GTJE)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【水】(E)"
      }
    ]
  },
  "w2_hw3": {
    "key": "w2_hw3",
    "week": "w2",
    "weekName": "第2周",
    "hwName": "功課3",
    "title": "第2周功課3",
    "dateRange": "07/09/2026 7:00 AM - 13/09/2026 11:30 PM",
    "startDate": "2026-09-07T07:00:00+08:00",
    "endDate": "2026-09-13T23:30:00+08:00",
    "words": [
      {
        "char": "蛋",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓人中一戈 (NOLMI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "的",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹日心戈 (HAPI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "更",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一中田大 (MLWK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "正",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一卜中一 (MYLM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "弱",
        "codes": [
          "弓",
          "一"
        ],
        "keys": [
          "N",
          "M"
        ],
        "full": "弓一 (NM)",
        "cj_full": "弓一弓戈一 (NMNIM)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【一】(M)"
      },
      {
        "char": "利",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹木中弓 (HDLN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "射",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹竹木戈 (HHDI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "梨",
        "codes": [
          "竹",
          "木"
        ],
        "keys": [
          "H",
          "D"
        ],
        "full": "竹木 (HD)",
        "cj_full": "竹弓木 (HND)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【木】(D)"
      },
      {
        "char": "予",
        "codes": [
          "弓",
          "弓"
        ],
        "keys": [
          "N",
          "N"
        ],
        "full": "弓弓 (NN)",
        "cj_full": "弓戈弓弓 (NINN)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "多",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓戈弓戈 (NINI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "卵",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹竹尸中戈 (HHSLI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "卑",
        "codes": [
          "竹",
          "十"
        ],
        "keys": [
          "H",
          "J"
        ],
        "full": "竹十 (HJ)",
        "cj_full": "竹竹十 (HHJ)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【十】(J)"
      },
      {
        "char": "天",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一大 (MK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "丟",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹土戈 (HGI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "鬼",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹戈 (HI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "几",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹弓 (HN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "事",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十中中弓 (JLLN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "陣",
        "codes": [
          "弓",
          "十"
        ],
        "keys": [
          "N",
          "J"
        ],
        "full": "弓十 (NJ)",
        "cj_full": "弓中十田十 (NLJWJ)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【十】(J)"
      },
      {
        "char": "箭",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹廿月弓 (HTBN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "廠",
        "codes": [
          "戈",
          "大"
        ],
        "keys": [
          "I",
          "K"
        ],
        "full": "戈大 (IK)",
        "cj_full": "戈火月大 (IFBK)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【大】(K)"
      },
      {
        "char": "郎",
        "codes": [
          "戈",
          "中"
        ],
        "keys": [
          "I",
          "L"
        ],
        "full": "戈中 (IL)",
        "cj_full": "戈戈弓中 (IINL)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【中】(L)"
      },
      {
        "char": "等",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹土木戈 (HGDI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "甜",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹口廿一 (HRTM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "五",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一木一 (MDM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "琴",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一土人戈弓 (MGOIN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "序",
        "codes": [
          "戈",
          "弓"
        ],
        "keys": [
          "I",
          "N"
        ],
        "full": "戈弓 (IN)",
        "cj_full": "戈弓戈弓 (ININ)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "斬",
        "codes": [
          "十",
          "中"
        ],
        "keys": [
          "J",
          "L"
        ],
        "full": "十中 (JL)",
        "cj_full": "十十竹一中 (JJHML)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【中】(L)"
      },
      {
        "char": "幹",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十十人一十 (JJOMJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "教",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十木人大 (JDOK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "乾",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十十人弓 (JJON)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "宜",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十月一 (JBM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "兔",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓山戈 (NUI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "都",
        "codes": [
          "十",
          "中"
        ],
        "keys": [
          "J",
          "L"
        ],
        "full": "十中 (JL)",
        "cj_full": "十日弓中 (JANL)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【中】(L)"
      },
      {
        "char": "了",
        "codes": [
          "弓",
          "弓"
        ],
        "keys": [
          "N",
          "N"
        ],
        "full": "弓弓 (NN)",
        "cj_full": "弓弓 (NN)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "究",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十金大弓 (JCKN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      }
    ]
  },
  "w2_hw4": {
    "key": "w2_hw4",
    "week": "w2",
    "weekName": "第2周",
    "hwName": "功課4",
    "title": "第2周功課4",
    "dateRange": "07/09/2026 7:00 AM - 13/09/2026 11:30 PM",
    "startDate": "2026-09-07T07:00:00+08:00",
    "endDate": "2026-09-13T23:30:00+08:00",
    "words": [
      {
        "char": "夕",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓戈 (NI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "空",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十金一 (JCM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "專",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十戈木戈 (JIDI)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "硬",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一口一中大 (MRMLK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "鼻",
        "codes": [
          "竹",
          "中"
        ],
        "keys": [
          "H",
          "L"
        ],
        "full": "竹中 (HL)",
        "cj_full": "竹山田一中 (HUWML)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【中】(L)"
      },
      {
        "char": "九",
        "codes": [
          "大",
          "弓"
        ],
        "keys": [
          "K",
          "N"
        ],
        "full": "大弓 (KN)",
        "cj_full": "大弓 (KN)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "左",
        "codes": [
          "大",
          "一"
        ],
        "keys": [
          "K",
          "M"
        ],
        "full": "大一 (KM)",
        "cj_full": "大一 (KM)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【一】(M)"
      },
      {
        "char": "南",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十月廿十 (JBTJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "雪",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一月尸一 (MBSM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "我",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹手戈 (HQI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "歷",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一木卜中一 (MDYLM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "雲",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一月一一戈 (MBMMI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "到",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一土中弓 (MGLN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "玉",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一土戈 (MGI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "平",
        "codes": [
          "一",
          "十"
        ],
        "keys": [
          "M",
          "J"
        ],
        "full": "一十 (MJ)",
        "cj_full": "一火十 (MFJ)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【十】(J)"
      },
      {
        "char": "臭",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹山戈大 (HUIK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "特",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹手土木戈 (HQGDI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "舟",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹月卜戈 (HBYI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "街",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹人土土弓 (HOGGN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "陰",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓中人戈戈 (NLOII)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "符",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹人木戈 (HODI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "得",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹人日一戈 (HOAMI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "二",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一一 (MM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "工",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一中一 (MLM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "畫",
        "codes": [
          "中",
          "一"
        ],
        "keys": [
          "L",
          "M"
        ],
        "full": "中一 (LM)",
        "cj_full": "中土田一 (LGWM)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【一】(M)"
      },
      {
        "char": "寬",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十廿月戈 (JTBI)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "郵",
        "codes": [
          "竹",
          "中"
        ],
        "keys": [
          "H",
          "L"
        ],
        "full": "竹中 (HL)",
        "cj_full": "竹一弓中 (HMNL)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【中】(L)"
      },
      {
        "char": "干",
        "codes": [
          "一",
          "十"
        ],
        "keys": [
          "M",
          "J"
        ],
        "full": "一十 (MJ)",
        "cj_full": "一十 (MJ)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【十】(J)"
      },
      {
        "char": "風",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹弓竹中戈 (HNHLI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "術",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹人戈金弓 (HOICN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "第",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹弓中竹 (HNLH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "亞",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一中中一 (MLLM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "凡",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹弓戈 (HNI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "竿",
        "codes": [
          "竹",
          "十"
        ],
        "keys": [
          "H",
          "J"
        ],
        "full": "竹十 (HJ)",
        "cj_full": "竹一十 (HMJ)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【十】(J)"
      },
      {
        "char": "衝",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹人竹土弓 (HOHGN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      }
    ]
  },
  "w3_hw1": {
    "key": "w3_hw1",
    "week": "w3",
    "weekName": "第3周",
    "hwName": "功課1",
    "title": "第3周功課1",
    "dateRange": "14/09/2026 8:00 AM - 20/09/2026 11:30 PM",
    "startDate": "2026-09-14T08:00:00+08:00",
    "endDate": "2026-09-20T23:30:00+08:00",
    "words": [
      {
        "char": "貝",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月山金 (BUC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "熱",
        "codes": [
          "土",
          "火"
        ],
        "keys": [
          "G",
          "F"
        ],
        "full": "土火 (GF)",
        "cj_full": "土戈火 (GIF)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【火】(F)"
      },
      {
        "char": "糧",
        "codes": [
          "火",
          "土"
        ],
        "keys": [
          "F",
          "G"
        ],
        "full": "火土 (FG)",
        "cj_full": "火木日一土 (FDAMG)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【土】(G)"
      },
      {
        "char": "炎",
        "codes": [
          "火",
          "火"
        ],
        "keys": [
          "F",
          "F"
        ],
        "full": "火火 (FF)",
        "cj_full": "火火 (FF)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【火】(F)"
      },
      {
        "char": "波",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水木竹水 (EDHE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "潔",
        "codes": [
          "水",
          "火"
        ],
        "keys": [
          "E",
          "F"
        ],
        "full": "水火 (EF)",
        "cj_full": "水手竹火 (EQHF)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【火】(F)"
      },
      {
        "char": "杯",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木一火 (DMF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "常",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火月口中月 (FBRLB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "采",
        "codes": [
          "月",
          "木"
        ],
        "keys": [
          "B",
          "D"
        ],
        "full": "月木 (BD)",
        "cj_full": "月木 (BD)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【木】(D)"
      },
      {
        "char": "朋",
        "codes": [
          "月",
          "月"
        ],
        "keys": [
          "B",
          "B"
        ],
        "full": "月月 (BB)",
        "cj_full": "月月 (BB)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【月】(B)"
      },
      {
        "char": "昊",
        "codes": [
          "日",
          "大"
        ],
        "keys": [
          "A",
          "K"
        ],
        "full": "日大 (AK)",
        "cj_full": "日一大 (AMK)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【大】(K)"
      },
      {
        "char": "昔",
        "codes": [
          "廿",
          "日"
        ],
        "keys": [
          "T",
          "A"
        ],
        "full": "廿日 (TA)",
        "cj_full": "廿日 (TA)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【日】(A)"
      },
      {
        "char": "巴",
        "codes": [
          "日",
          "山"
        ],
        "keys": [
          "A",
          "U"
        ],
        "full": "日山 (AU)",
        "cj_full": "日山 (AU)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【山】(U)"
      },
      {
        "char": "象",
        "codes": [
          "弓",
          "人"
        ],
        "keys": [
          "N",
          "O"
        ],
        "full": "弓人 (NO)",
        "cj_full": "弓日心人 (NAPO)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【人】(O)"
      },
      {
        "char": "用",
        "codes": [
          "月",
          "手"
        ],
        "keys": [
          "B",
          "Q"
        ],
        "full": "月手 (BQ)",
        "cj_full": "月手 (BQ)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "冥",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月日卜金 (BAYC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "冤",
        "codes": [
          "月",
          "戈"
        ],
        "keys": [
          "B",
          "I"
        ],
        "full": "月戈 (BI)",
        "cj_full": "月弓山戈 (BNUI)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "炙",
        "codes": [
          "月",
          "火"
        ],
        "keys": [
          "B",
          "F"
        ],
        "full": "月火 (BF)",
        "cj_full": "月火 (BF)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【火】(F)"
      },
      {
        "char": "只",
        "codes": [
          "口",
          "金"
        ],
        "keys": [
          "R",
          "C"
        ],
        "full": "口金 (RC)",
        "cj_full": "口金 (RC)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【金】(C)"
      },
      {
        "char": "共",
        "codes": [
          "廿",
          "金"
        ],
        "keys": [
          "T",
          "C"
        ],
        "full": "廿金 (TC)",
        "cj_full": "廿金 (TC)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【金】(C)"
      },
      {
        "char": "弟",
        "codes": [
          "金",
          "竹"
        ],
        "keys": [
          "C",
          "H"
        ],
        "full": "金竹 (CH)",
        "cj_full": "金弓中竹 (CNLH)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "並",
        "codes": [
          "廿",
          "金"
        ],
        "keys": [
          "T",
          "C"
        ],
        "full": "廿金 (TC)",
        "cj_full": "廿廿金 (TTC)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【金】(C)"
      },
      {
        "char": "朮",
        "codes": [
          "戈",
          "金"
        ],
        "keys": [
          "I",
          "C"
        ],
        "full": "戈金 (IC)",
        "cj_full": "戈十金 (IJC)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【金】(C)"
      },
      {
        "char": "術",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹人戈金弓 (HOICN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "材",
        "codes": [
          "木",
          "竹"
        ],
        "keys": [
          "D",
          "H"
        ],
        "full": "木竹 (DH)",
        "cj_full": "木木竹 (DDH)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "村",
        "codes": [
          "木",
          "戈"
        ],
        "keys": [
          "D",
          "I"
        ],
        "full": "木戈 (DI)",
        "cj_full": "木木戈 (DDI)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "五",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一木一 (MDM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "韋",
        "codes": [
          "木",
          "手"
        ],
        "keys": [
          "D",
          "Q"
        ],
        "full": "木手 (DQ)",
        "cj_full": "木一口手 (DMRQ)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "汝",
        "codes": [
          "水",
          "女"
        ],
        "keys": [
          "E",
          "V"
        ],
        "full": "水女 (EV)",
        "cj_full": "水女 (EV)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【女】(V)"
      },
      {
        "char": "求",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈十水 (IJE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      },
      {
        "char": "叉",
        "codes": [
          "水",
          "戈"
        ],
        "keys": [
          "E",
          "I"
        ],
        "full": "水戈 (EI)",
        "cj_full": "水戈 (EI)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "反",
        "codes": [
          "竹",
          "水"
        ],
        "keys": [
          "H",
          "E"
        ],
        "full": "竹水 (HE)",
        "cj_full": "竹水 (HE)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【水】(E)"
      },
      {
        "char": "丕",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一火一 (MFM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "否",
        "codes": [
          "一",
          "口"
        ],
        "keys": [
          "M",
          "R"
        ],
        "full": "一口 (MR)",
        "cj_full": "一火口 (MFR)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【口】(R)"
      },
      {
        "char": "肉",
        "codes": [
          "人",
          "人"
        ],
        "keys": [
          "O",
          "O"
        ],
        "full": "人人 (OO)",
        "cj_full": "人月人 (OBO)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【人】(O)"
      }
    ]
  },
  "w3_hw2": {
    "key": "w3_hw2",
    "week": "w3",
    "weekName": "第3周",
    "hwName": "功課2",
    "title": "第3周功課2",
    "dateRange": "14/09/2026 8:00 AM - 20/09/2026 11:30 PM",
    "startDate": "2026-09-14T08:00:00+08:00",
    "endDate": "2026-09-20T23:30:00+08:00",
    "words": [
      {
        "char": "鳥",
        "codes": [
          "竹",
          "火"
        ],
        "keys": [
          "H",
          "F"
        ],
        "full": "竹火 (HF)",
        "cj_full": "竹日卜火 (HAYF)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【火】(F)"
      },
      {
        "char": "烈",
        "codes": [
          "一",
          "火"
        ],
        "keys": [
          "M",
          "F"
        ],
        "full": "一火 (MF)",
        "cj_full": "一弓火 (MNF)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【火】(F)"
      },
      {
        "char": "當",
        "codes": [
          "火",
          "田"
        ],
        "keys": [
          "F",
          "W"
        ],
        "full": "火田 (FW)",
        "cj_full": "火月口田 (FBRW)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【田】(W)"
      },
      {
        "char": "嘗",
        "codes": [
          "火",
          "日"
        ],
        "keys": [
          "F",
          "A"
        ],
        "full": "火日 (FA)",
        "cj_full": "火月口心日 (FBRPA)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【日】(A)"
      },
      {
        "char": "尖",
        "codes": [
          "火",
          "大"
        ],
        "keys": [
          "F",
          "K"
        ],
        "full": "火大 (FK)",
        "cj_full": "火大 (FK)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【大】(K)"
      },
      {
        "char": "少",
        "codes": [
          "火",
          "竹"
        ],
        "keys": [
          "F",
          "H"
        ],
        "full": "火竹 (FH)",
        "cj_full": "火竹 (FH)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "戀",
        "codes": [
          "女",
          "心"
        ],
        "keys": [
          "V",
          "P"
        ],
        "full": "女心 (VP)",
        "cj_full": "女火心 (VFP)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【心】(P)"
      },
      {
        "char": "絲",
        "codes": [
          "女",
          "火"
        ],
        "keys": [
          "V",
          "F"
        ],
        "full": "女火 (VF)",
        "cj_full": "女火女戈火 (VFVIF)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【火】(F)"
      },
      {
        "char": "壞",
        "codes": [
          "土",
          "女"
        ],
        "keys": [
          "G",
          "V"
        ],
        "full": "土女 (GV)",
        "cj_full": "土卜田女 (GYWV)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【女】(V)"
      },
      {
        "char": "壯",
        "codes": [
          "女",
          "土"
        ],
        "keys": [
          "V",
          "G"
        ],
        "full": "女土 (VG)",
        "cj_full": "女一土 (VMG)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【土】(G)"
      },
      {
        "char": "壬",
        "codes": [
          "竹",
          "土"
        ],
        "keys": [
          "H",
          "G"
        ],
        "full": "竹土 (HG)",
        "cj_full": "竹土 (HG)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【土】(G)"
      },
      {
        "char": "淦",
        "codes": [
          "水",
          "金"
        ],
        "keys": [
          "E",
          "C"
        ],
        "full": "水金 (EC)",
        "cj_full": "水金 (EC)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【金】(C)"
      },
      {
        "char": "周",
        "codes": [
          "月",
          "口"
        ],
        "keys": [
          "B",
          "R"
        ],
        "full": "月口 (BR)",
        "cj_full": "月土口 (BGR)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【口】(R)"
      },
      {
        "char": "汨",
        "codes": [
          "水",
          "日"
        ],
        "keys": [
          "E",
          "A"
        ],
        "full": "水日 (EA)",
        "cj_full": "水日 (EA)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【日】(A)"
      },
      {
        "char": "胴",
        "codes": [
          "月",
          "口"
        ],
        "keys": [
          "B",
          "R"
        ],
        "full": "月口 (BR)",
        "cj_full": "月月一口 (BBMR)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【口】(R)"
      },
      {
        "char": "圣",
        "codes": [
          "水",
          "土"
        ],
        "keys": [
          "E",
          "G"
        ],
        "full": "水土 (EG)",
        "cj_full": "水土 (EG)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【土】(G)"
      },
      {
        "char": "杰",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木火 (DF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "唱",
        "codes": [
          "口",
          "日"
        ],
        "keys": [
          "R",
          "A"
        ],
        "full": "口日 (RA)",
        "cj_full": "口日日 (RAA)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【日】(A)"
      },
      {
        "char": "淌",
        "codes": [
          "水",
          "口"
        ],
        "keys": [
          "E",
          "R"
        ],
        "full": "水口 (ER)",
        "cj_full": "水火月口 (EFBR)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【口】(R)"
      },
      {
        "char": "沖",
        "codes": [
          "水",
          "中"
        ],
        "keys": [
          "E",
          "L"
        ],
        "full": "水中 (EL)",
        "cj_full": "水中 (EL)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【中】(L)"
      },
      {
        "char": "熒",
        "codes": [
          "火",
          "火"
        ],
        "keys": [
          "F",
          "F"
        ],
        "full": "火火 (FF)",
        "cj_full": "火火月火 (FFBF)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【火】(F)"
      },
      {
        "char": "軍",
        "codes": [
          "月",
          "十"
        ],
        "keys": [
          "B",
          "J"
        ],
        "full": "月十 (BJ)",
        "cj_full": "月十田十 (BJWJ)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【十】(J)"
      },
      {
        "char": "同",
        "codes": [
          "月",
          "口"
        ],
        "keys": [
          "B",
          "R"
        ],
        "full": "月口 (BR)",
        "cj_full": "月一口 (BMR)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【口】(R)"
      },
      {
        "char": "示",
        "codes": [
          "一",
          "火"
        ],
        "keys": [
          "M",
          "F"
        ],
        "full": "一火 (MF)",
        "cj_full": "一一火 (MMF)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【火】(F)"
      },
      {
        "char": "汙",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水一木 (EMD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "桑",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水水水木 (EEED)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "冉",
        "codes": [
          "土",
          "月"
        ],
        "keys": [
          "G",
          "B"
        ],
        "full": "土月 (GB)",
        "cj_full": "土月 (GB)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【月】(B)"
      },
      {
        "char": "沿",
        "codes": [
          "水",
          "口"
        ],
        "keys": [
          "E",
          "R"
        ],
        "full": "水口 (ER)",
        "cj_full": "水金口 (ECR)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【口】(R)"
      },
      {
        "char": "不",
        "codes": [
          "一",
          "火"
        ],
        "keys": [
          "M",
          "F"
        ],
        "full": "一火 (MF)",
        "cj_full": "一火 (MF)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【火】(F)"
      },
      {
        "char": "鉛",
        "codes": [
          "金",
          "口"
        ],
        "keys": [
          "C",
          "R"
        ],
        "full": "金口 (CR)",
        "cj_full": "金金口 (CCR)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【口】(R)"
      },
      {
        "char": "罕",
        "codes": [
          "月",
          "十"
        ],
        "keys": [
          "B",
          "J"
        ],
        "full": "月十 (BJ)",
        "cj_full": "月金一十 (BCMJ)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【十】(J)"
      },
      {
        "char": "沁",
        "codes": [
          "水",
          "心"
        ],
        "keys": [
          "E",
          "P"
        ],
        "full": "水心 (EP)",
        "cj_full": "水心 (EP)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【心】(P)"
      },
      {
        "char": "妥",
        "codes": [
          "月",
          "女"
        ],
        "keys": [
          "B",
          "V"
        ],
        "full": "月女 (BV)",
        "cj_full": "月女 (BV)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【女】(V)"
      },
      {
        "char": "沐",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水木 (ED)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "胚",
        "codes": [
          "月",
          "一"
        ],
        "keys": [
          "B",
          "M"
        ],
        "full": "月一 (BM)",
        "cj_full": "月一火一 (BMFM)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【一】(M)"
      }
    ]
  },
  "w3_hw3": {
    "key": "w3_hw3",
    "week": "w3",
    "weekName": "第3周",
    "hwName": "功課3",
    "title": "第3周功課3",
    "dateRange": "14/09/2026 8:00 AM - 20/09/2026 11:30 PM",
    "startDate": "2026-09-14T08:00:00+08:00",
    "endDate": "2026-09-20T23:30:00+08:00",
    "words": [
      {
        "char": "式",
        "codes": [
          "戈",
          "一"
        ],
        "keys": [
          "I",
          "M"
        ],
        "full": "戈一 (IM)",
        "cj_full": "戈心一 (IPM)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【一】(M)"
      },
      {
        "char": "行",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹人一一弓 (HOMMN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "微",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹人山山大 (HOUUK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "川",
        "codes": [
          "中",
          "中"
        ],
        "keys": [
          "L",
          "L"
        ],
        "full": "中中 (LL)",
        "cj_full": "中中中 (LLL)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【中】(L)"
      },
      {
        "char": "冷",
        "codes": [
          "戈",
          "戈"
        ],
        "keys": [
          "I",
          "I"
        ],
        "full": "戈戈 (II)",
        "cj_full": "戈一人戈戈 (IMOII)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "租",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹木月一 (HDBM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "戊",
        "codes": [
          "戈",
          "竹"
        ],
        "keys": [
          "I",
          "H"
        ],
        "full": "戈竹 (IH)",
        "cj_full": "戈竹 (IH)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "拜",
        "codes": [
          "竹",
          "十"
        ],
        "keys": [
          "H",
          "J"
        ],
        "full": "竹十 (HJ)",
        "cj_full": "竹手一手十 (HQMQJ)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【十】(J)"
      },
      {
        "char": "牧",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹手人大 (HQOK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "強",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓戈中戈 (NILI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "鬥",
        "codes": [
          "中",
          "弓"
        ],
        "keys": [
          "L",
          "N"
        ],
        "full": "中弓 (LN)",
        "cj_full": "中弓 (LN)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "所",
        "codes": [
          "竹",
          "中"
        ],
        "keys": [
          "H",
          "L"
        ],
        "full": "竹中 (HL)",
        "cj_full": "竹尸竹一中 (HSHML)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【中】(L)"
      },
      {
        "char": "翻",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹田尸一一 (HWSMM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "麥",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十人弓戈 (JONI)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "數",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中女人大 (LVOK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "斤",
        "codes": [
          "竹",
          "中"
        ],
        "keys": [
          "H",
          "L"
        ],
        "full": "竹中 (HL)",
        "cj_full": "竹一中 (HML)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【中】(L)"
      },
      {
        "char": "神",
        "codes": [
          "戈",
          "中"
        ],
        "keys": [
          "I",
          "L"
        ],
        "full": "戈中 (IL)",
        "cj_full": "戈火中田中 (IFLWL)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【中】(L)"
      },
      {
        "char": "參",
        "codes": [
          "戈",
          "竹"
        ],
        "keys": [
          "I",
          "H"
        ],
        "full": "戈竹 (IH)",
        "cj_full": "戈戈戈竹 (IIIH)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "物",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹手心竹竹 (HQPHH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "厭",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一日月大 (MABK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "底",
        "codes": [
          "戈",
          "一"
        ],
        "keys": [
          "I",
          "M"
        ],
        "full": "戈一 (IM)",
        "cj_full": "戈竹心一 (IHPM)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【一】(M)"
      },
      {
        "char": "生",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹手一 (HQM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "祖",
        "codes": [
          "戈",
          "一"
        ],
        "keys": [
          "I",
          "M"
        ],
        "full": "戈一 (IM)",
        "cj_full": "戈火月一 (IFBM)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【一】(M)"
      },
      {
        "char": "筷",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹心木大 (HPDK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "丈",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十大 (JK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "府",
        "codes": [
          "戈",
          "戈"
        ],
        "keys": [
          "I",
          "I"
        ],
        "full": "戈戈 (II)",
        "cj_full": "戈人木戈 (IODI)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "車",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十田十 (JWJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "附",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓中人木戈 (NLODI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "穿",
        "codes": [
          "十",
          "竹"
        ],
        "keys": [
          "J",
          "H"
        ],
        "full": "十竹 (JH)",
        "cj_full": "十金一女竹 (JCMVH)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "窗",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十金竹田大 (JCHWK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "較",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十十卜金大 (JJYCK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "守",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十木戈 (JDI)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "划",
        "codes": [
          "戈",
          "弓"
        ],
        "keys": [
          "I",
          "N"
        ],
        "full": "戈弓 (IN)",
        "cj_full": "戈中弓 (ILN)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "疾",
        "codes": [
          "大",
          "大"
        ],
        "keys": [
          "K",
          "K"
        ],
        "full": "大大 (KK)",
        "cj_full": "大人大 (KOK)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【大】(K)"
      },
      {
        "char": "麵",
        "codes": [
          "十",
          "中"
        ],
        "keys": [
          "J",
          "L"
        ],
        "full": "十中 (JL)",
        "cj_full": "十弓一田中 (JNMWL)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【中】(L)"
      }
    ]
  },
  "w3_hw4": {
    "key": "w3_hw4",
    "week": "w3",
    "weekName": "第3周",
    "hwName": "功課4",
    "title": "第3周功課4",
    "dateRange": "14/09/2026 8:00 AM - 20/09/2026 11:30 PM",
    "startDate": "2026-09-14T08:00:00+08:00",
    "endDate": "2026-09-20T23:30:00+08:00",
    "words": [
      {
        "char": "州",
        "codes": [
          "戈",
          "中"
        ],
        "keys": [
          "I",
          "L"
        ],
        "full": "戈中 (IL)",
        "cj_full": "戈中戈中 (ILIL)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【中】(L)"
      },
      {
        "char": "蜜",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十心竹戈 (JPHI)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "故",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十口人大 (JROK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "飄",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一火竹弓戈 (MFHNI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "犬",
        "codes": [
          "戈",
          "大"
        ],
        "keys": [
          "I",
          "K"
        ],
        "full": "戈大 (IK)",
        "cj_full": "戈大 (IK)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【大】(K)"
      },
      {
        "char": "猴",
        "codes": [
          "大",
          "大"
        ],
        "keys": [
          "K",
          "K"
        ],
        "full": "大大 (KK)",
        "cj_full": "大竹人弓大 (KHONK)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【大】(K)"
      },
      {
        "char": "需",
        "codes": [
          "一",
          "中"
        ],
        "keys": [
          "M",
          "L"
        ],
        "full": "一中 (ML)",
        "cj_full": "一月一月中 (MBMBL)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【中】(L)"
      },
      {
        "char": "而",
        "codes": [
          "一",
          "中"
        ],
        "keys": [
          "M",
          "L"
        ],
        "full": "一中 (ML)",
        "cj_full": "一月中中 (MBLL)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【中】(L)"
      },
      {
        "char": "央",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中月大 (LBK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "麼",
        "codes": [
          "戈",
          "戈"
        ],
        "keys": [
          "I",
          "I"
        ],
        "full": "戈戈 (II)",
        "cj_full": "戈木女戈 (IDVI)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "蜂",
        "codes": [
          "中",
          "十"
        ],
        "keys": [
          "L",
          "J"
        ],
        "full": "中十 (LJ)",
        "cj_full": "中戈竹水十 (LIHEJ)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【十】(J)"
      },
      {
        "char": "秤",
        "codes": [
          "竹",
          "十"
        ],
        "keys": [
          "H",
          "J"
        ],
        "full": "竹十 (HJ)",
        "cj_full": "竹木一火十 (HDMFJ)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【十】(J)"
      },
      {
        "char": "轉",
        "codes": [
          "十",
          "戈"
        ],
        "keys": [
          "J",
          "I"
        ],
        "full": "十戈 (JI)",
        "cj_full": "十十十戈戈 (JJJII)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "初",
        "codes": [
          "中",
          "竹"
        ],
        "keys": [
          "L",
          "H"
        ],
        "full": "中竹 (LH)",
        "cj_full": "中尸竹 (LSH)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "節",
        "codes": [
          "竹",
          "中"
        ],
        "keys": [
          "H",
          "L"
        ],
        "full": "竹中 (HL)",
        "cj_full": "竹日戈中 (HAIL)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【中】(L)"
      },
      {
        "char": "陽",
        "codes": [
          "弓",
          "竹"
        ],
        "keys": [
          "N",
          "H"
        ],
        "full": "弓竹 (NH)",
        "cj_full": "弓中日一竹 (NLAMH)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "士",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十一 (JM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "太",
        "codes": [
          "大",
          "戈"
        ],
        "keys": [
          "K",
          "I"
        ],
        "full": "大戈 (KI)",
        "cj_full": "大戈 (KI)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "歹",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一弓戈 (MNI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "片",
        "codes": [
          "中",
          "中"
        ],
        "keys": [
          "L",
          "L"
        ],
        "full": "中中 (LL)",
        "cj_full": "中中一中 (LLML)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【中】(L)"
      },
      {
        "char": "翅",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十水尸一一 (JESMM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "申",
        "codes": [
          "中",
          "中"
        ],
        "keys": [
          "L",
          "L"
        ],
        "full": "中中 (LL)",
        "cj_full": "中田中 (LWL)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【中】(L)"
      },
      {
        "char": "珍",
        "codes": [
          "一",
          "竹"
        ],
        "keys": [
          "M",
          "H"
        ],
        "full": "一竹 (MH)",
        "cj_full": "一土人竹竹 (MGOHH)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "形",
        "codes": [
          "一",
          "竹"
        ],
        "keys": [
          "M",
          "H"
        ],
        "full": "一竹 (MH)",
        "cj_full": "一廿竹竹竹 (MTHHH)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "身",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹難竹 (HXH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "史",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中大 (LK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "列",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一弓中弓 (MNLN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "瓦",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一女弓戈 (MVNI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "丁",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一弓 (MN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "三",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一一一 (MMM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "垂",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹十廿一 (HJTM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "武",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一心卜中一 (MPYLM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "蚊",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中戈卜大 (LIYK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "致",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一土人大 (MGOK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "千",
        "codes": [
          "竹",
          "十"
        ],
        "keys": [
          "H",
          "J"
        ],
        "full": "竹十 (HJ)",
        "cj_full": "竹十 (HJ)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【十】(J)"
      }
    ]
  },
  "w4_hw1": {
    "key": "w4_hw1",
    "week": "w4",
    "weekName": "第4周",
    "hwName": "功課1",
    "title": "第4周功課1",
    "dateRange": "21/09/2026 8:00 AM - 27/09/2026 11:30 PM",
    "startDate": "2026-09-21T08:00:00+08:00",
    "endDate": "2026-09-27T23:30:00+08:00",
    "words": [
      {
        "char": "免",
        "codes": [
          "弓",
          "山"
        ],
        "keys": [
          "N",
          "U"
        ],
        "full": "弓山 (NU)",
        "cj_full": "弓日竹山 (NAHU)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【山】(U)"
      },
      {
        "char": "雨",
        "codes": [
          "一",
          "卜"
        ],
        "keys": [
          "M",
          "Y"
        ],
        "full": "一卜 (MY)",
        "cj_full": "一中月卜 (MLBY)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【卜】(Y)"
      },
      {
        "char": "直",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十月一一 (JBMM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "兩",
        "codes": [
          "一",
          "人"
        ],
        "keys": [
          "M",
          "O"
        ],
        "full": "一人 (MO)",
        "cj_full": "一中月人 (MLBO)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【人】(O)"
      },
      {
        "char": "具",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月一一金 (BMMC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "重",
        "codes": [
          "竹",
          "土"
        ],
        "keys": [
          "H",
          "G"
        ],
        "full": "竹土 (HG)",
        "cj_full": "竹十田土 (HJWG)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【土】(G)"
      },
      {
        "char": "面",
        "codes": [
          "一",
          "中"
        ],
        "keys": [
          "M",
          "L"
        ],
        "full": "一中 (ML)",
        "cj_full": "一田卜中 (MWYL)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【中】(L)"
      },
      {
        "char": "馬",
        "codes": [
          "尸",
          "火"
        ],
        "keys": [
          "S",
          "F"
        ],
        "full": "尸火 (SF)",
        "cj_full": "尸手尸火 (SQSF)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【火】(F)"
      },
      {
        "char": "兌",
        "codes": [
          "金",
          "山"
        ],
        "keys": [
          "C",
          "U"
        ],
        "full": "金山 (CU)",
        "cj_full": "金口竹山 (CRHU)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【山】(U)"
      },
      {
        "char": "頁",
        "codes": [
          "一",
          "金"
        ],
        "keys": [
          "M",
          "C"
        ],
        "full": "一金 (MC)",
        "cj_full": "一月山金 (MBUC)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【金】(C)"
      },
      {
        "char": "予",
        "codes": [
          "弓",
          "弓"
        ],
        "keys": [
          "N",
          "N"
        ],
        "full": "弓弓 (NN)",
        "cj_full": "弓戈弓弓 (NINN)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "瓦",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一女弓戈 (MVNI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "先",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹土竹山 (HGHU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "臣",
        "codes": [
          "尸",
          "中"
        ],
        "keys": [
          "S",
          "L"
        ],
        "full": "尸中 (SL)",
        "cj_full": "尸中尸中 (SLSL)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【中】(L)"
      },
      {
        "char": "舟",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹月卜戈 (HBYI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "辰",
        "codes": [
          "一",
          "女"
        ],
        "keys": [
          "M",
          "V"
        ],
        "full": "一女 (MV)",
        "cj_full": "一一一女 (MMMV)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【女】(V)"
      },
      {
        "char": "其",
        "codes": [
          "廿",
          "金"
        ],
        "keys": [
          "T",
          "C"
        ],
        "full": "廿金 (TC)",
        "cj_full": "廿一一金 (TMMC)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【金】(C)"
      },
      {
        "char": "垂",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹十廿一 (HJTM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "乘",
        "codes": [
          "竹",
          "心"
        ],
        "keys": [
          "H",
          "P"
        ],
        "full": "竹心 (HP)",
        "cj_full": "竹木中心 (HDLP)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【心】(P)"
      },
      {
        "char": "島",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹日卜山 (HAYU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "互",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一女弓一 (MVNM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "充",
        "codes": [
          "卜",
          "山"
        ],
        "keys": [
          "Y",
          "U"
        ],
        "full": "卜山 (YU)",
        "cj_full": "卜戈竹山 (YIHU)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【山】(U)"
      },
      {
        "char": "與",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難卜金 (HXYC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "商",
        "codes": [
          "卜",
          "口"
        ],
        "keys": [
          "Y",
          "R"
        ],
        "full": "卜口 (YR)",
        "cj_full": "卜金月口 (YCBR)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【口】(R)"
      },
      {
        "char": "為",
        "codes": [
          "戈",
          "火"
        ],
        "keys": [
          "I",
          "F"
        ],
        "full": "戈火 (IF)",
        "cj_full": "戈大弓火 (IKNF)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【火】(F)"
      },
      {
        "char": "真",
        "codes": [
          "十",
          "金"
        ],
        "keys": [
          "J",
          "C"
        ],
        "full": "十金 (JC)",
        "cj_full": "十月一金 (JBMC)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【金】(C)"
      },
      {
        "char": "車",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十田十 (JWJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "業",
        "codes": [
          "廿",
          "木"
        ],
        "keys": [
          "T",
          "D"
        ],
        "full": "廿木 (TD)",
        "cj_full": "廿金廿木 (TCTD)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【木】(D)"
      },
      {
        "char": "矛",
        "codes": [
          "弓",
          "竹"
        ],
        "keys": [
          "N",
          "H"
        ],
        "full": "弓竹 (NH)",
        "cj_full": "弓戈弓竹 (NINH)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "色",
        "codes": [
          "弓",
          "山"
        ],
        "keys": [
          "N",
          "U"
        ],
        "full": "弓山 (NU)",
        "cj_full": "弓日山 (NAU)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【山】(U)"
      },
      {
        "char": "角",
        "codes": [
          "弓",
          "土"
        ],
        "keys": [
          "N",
          "G"
        ],
        "full": "弓土 (NG)",
        "cj_full": "弓月土 (NBG)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【土】(G)"
      },
      {
        "char": "丈",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十大 (JK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "夫",
        "codes": [
          "手",
          "人"
        ],
        "keys": [
          "Q",
          "O"
        ],
        "full": "手人 (QO)",
        "cj_full": "手人 (QO)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【人】(O)"
      },
      {
        "char": "井",
        "codes": [
          "廿",
          "廿"
        ],
        "keys": [
          "T",
          "T"
        ],
        "full": "廿廿 (TT)",
        "cj_full": "廿廿 (TT)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "及",
        "codes": [
          "弓",
          "水"
        ],
        "keys": [
          "N",
          "E"
        ],
        "full": "弓水 (NE)",
        "cj_full": "弓竹水 (NHE)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【水】(E)"
      },
      {
        "char": "氏",
        "codes": [
          "竹",
          "心"
        ],
        "keys": [
          "H",
          "P"
        ],
        "full": "竹心 (HP)",
        "cj_full": "竹女心 (HVP)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【心】(P)"
      },
      {
        "char": "之",
        "codes": [
          "戈",
          "人"
        ],
        "keys": [
          "I",
          "O"
        ],
        "full": "戈人 (IO)",
        "cj_full": "戈弓人 (INO)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【人】(O)"
      },
      {
        "char": "歹",
        "codes": [
          "一",
          "戈"
        ],
        "keys": [
          "M",
          "I"
        ],
        "full": "一戈 (MI)",
        "cj_full": "一弓戈 (MNI)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "巨",
        "codes": [
          "尸",
          "尸"
        ],
        "keys": [
          "S",
          "S"
        ],
        "full": "尸尸 (SS)",
        "cj_full": "尸尸 (SS)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "市",
        "codes": [
          "卜",
          "月"
        ],
        "keys": [
          "Y",
          "B"
        ],
        "full": "卜月 (YB)",
        "cj_full": "卜中月 (YLB)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【月】(B)"
      }
    ]
  },
  "w4_hw2": {
    "key": "w4_hw2",
    "week": "w4",
    "weekName": "第4周",
    "hwName": "功課2",
    "title": "第4周功課2",
    "dateRange": "21/09/2026 8:00 AM - 27/09/2026 11:30 PM",
    "startDate": "2026-09-21T08:00:00+08:00",
    "endDate": "2026-09-27T23:30:00+08:00",
    "words": [
      {
        "char": "萬",
        "codes": [
          "廿",
          "月"
        ],
        "keys": [
          "T",
          "B"
        ],
        "full": "廿月 (TB)",
        "cj_full": "廿田中月 (TWLB)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【月】(B)"
      },
      {
        "char": "丈",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十大 (JK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "力",
        "codes": [
          "大",
          "尸"
        ],
        "keys": [
          "K",
          "S"
        ],
        "full": "大尸 (KS)",
        "cj_full": "大尸 (KS)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "孝",
        "codes": [
          "十",
          "木"
        ],
        "keys": [
          "J",
          "D"
        ],
        "full": "十木 (JD)",
        "cj_full": "十大弓木 (JKND)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【木】(D)"
      },
      {
        "char": "功",
        "codes": [
          "一",
          "尸"
        ],
        "keys": [
          "M",
          "S"
        ],
        "full": "一尸 (MS)",
        "cj_full": "一大尸 (MKS)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "劣",
        "codes": [
          "火",
          "尸"
        ],
        "keys": [
          "F",
          "S"
        ],
        "full": "火尸 (FS)",
        "cj_full": "火竹大尸 (FHKS)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "勞",
        "codes": [
          "火",
          "尸"
        ],
        "keys": [
          "F",
          "S"
        ],
        "full": "火尸 (FS)",
        "cj_full": "火火月大尸 (FFBKS)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "井",
        "codes": [
          "廿",
          "廿"
        ],
        "keys": [
          "T",
          "T"
        ],
        "full": "廿廿 (TT)",
        "cj_full": "廿廿 (TT)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "米",
        "codes": [
          "火",
          "木"
        ],
        "keys": [
          "F",
          "D"
        ],
        "full": "火木 (FD)",
        "cj_full": "火木 (FD)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【木】(D)"
      },
      {
        "char": "半",
        "codes": [
          "火",
          "手"
        ],
        "keys": [
          "F",
          "Q"
        ],
        "full": "火手 (FQ)",
        "cj_full": "火手 (FQ)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "平",
        "codes": [
          "一",
          "十"
        ],
        "keys": [
          "M",
          "J"
        ],
        "full": "一十 (MJ)",
        "cj_full": "一火十 (MFJ)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【十】(J)"
      },
      {
        "char": "乎",
        "codes": [
          "竹",
          "木"
        ],
        "keys": [
          "H",
          "D"
        ],
        "full": "竹木 (HD)",
        "cj_full": "竹火木 (HFD)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【木】(D)"
      },
      {
        "char": "缶",
        "codes": [
          "人",
          "山"
        ],
        "keys": [
          "O",
          "U"
        ],
        "full": "人山 (OU)",
        "cj_full": "人十山 (OJU)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【山】(U)"
      },
      {
        "char": "也",
        "codes": [
          "心",
          "木"
        ],
        "keys": [
          "P",
          "D"
        ],
        "full": "心木 (PD)",
        "cj_full": "心木 (PD)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【木】(D)"
      },
      {
        "char": "世",
        "codes": [
          "心",
          "廿"
        ],
        "keys": [
          "P",
          "T"
        ],
        "full": "心廿 (PT)",
        "cj_full": "心廿 (PT)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "七",
        "codes": [
          "十",
          "山"
        ],
        "keys": [
          "J",
          "U"
        ],
        "full": "十山 (JU)",
        "cj_full": "十山 (JU)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【山】(U)"
      },
      {
        "char": "央",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中月大 (LBK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "者",
        "codes": [
          "十",
          "日"
        ],
        "keys": [
          "J",
          "A"
        ],
        "full": "十日 (JA)",
        "cj_full": "十大日 (JKA)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【日】(A)"
      },
      {
        "char": "夜",
        "codes": [
          "卜",
          "大"
        ],
        "keys": [
          "Y",
          "K"
        ],
        "full": "卜大 (YK)",
        "cj_full": "卜人弓大 (YONK)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【大】(K)"
      },
      {
        "char": "匆",
        "codes": [
          "心",
          "大"
        ],
        "keys": [
          "P",
          "K"
        ],
        "full": "心大 (PK)",
        "cj_full": "心大大 (PKK)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【大】(K)"
      },
      {
        "char": "囪",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹田大大 (HWKK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "由",
        "codes": [
          "中",
          "田"
        ],
        "keys": [
          "L",
          "W"
        ],
        "full": "中田 (LW)",
        "cj_full": "中田 (LW)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【田】(W)"
      },
      {
        "char": "甲",
        "codes": [
          "田",
          "中"
        ],
        "keys": [
          "W",
          "L"
        ],
        "full": "田中 (WL)",
        "cj_full": "田中 (WL)",
        "secret": "速成首碼【田】(W) ＋ 尾碼【中】(L)"
      },
      {
        "char": "申",
        "codes": [
          "中",
          "中"
        ],
        "keys": [
          "L",
          "L"
        ],
        "full": "中中 (LL)",
        "cj_full": "中田中 (LWL)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【中】(L)"
      },
      {
        "char": "車",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十田十 (JWJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "曳",
        "codes": [
          "中",
          "心"
        ],
        "keys": [
          "L",
          "P"
        ],
        "full": "中心 (LP)",
        "cj_full": "中田心 (LWP)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【心】(P)"
      },
      {
        "char": "洩",
        "codes": [
          "水",
          "心"
        ],
        "keys": [
          "E",
          "P"
        ],
        "full": "水心 (EP)",
        "cj_full": "水中田心 (ELWP)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【心】(P)"
      },
      {
        "char": "軒",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十十一十 (JJMJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "更",
        "codes": [
          "一",
          "大"
        ],
        "keys": [
          "M",
          "K"
        ],
        "full": "一大 (MK)",
        "cj_full": "一中田大 (MLWK)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【大】(K)"
      },
      {
        "char": "奄",
        "codes": [
          "大",
          "山"
        ],
        "keys": [
          "K",
          "U"
        ],
        "full": "大山 (KU)",
        "cj_full": "大中田山 (KLWU)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【山】(U)"
      },
      {
        "char": "淹",
        "codes": [
          "水",
          "山"
        ],
        "keys": [
          "E",
          "U"
        ],
        "full": "水山 (EU)",
        "cj_full": "水大中山 (EKLU)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【山】(U)"
      },
      {
        "char": "史",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中大 (LK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "吏",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十中大 (JLK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "事",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十中中弓 (JLLN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "婁",
        "codes": [
          "中",
          "女"
        ],
        "keys": [
          "L",
          "V"
        ],
        "full": "中女 (LV)",
        "cj_full": "中田中女 (LWLV)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【女】(V)"
      },
      {
        "char": "縷",
        "codes": [
          "女",
          "女"
        ],
        "keys": [
          "V",
          "V"
        ],
        "full": "女女 (VV)",
        "cj_full": "女火中田女 (VFLWV)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【女】(V)"
      },
      {
        "char": "向",
        "codes": [
          "竹",
          "口"
        ],
        "keys": [
          "H",
          "R"
        ],
        "full": "竹口 (HR)",
        "cj_full": "竹月口 (HBR)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【口】(R)"
      },
      {
        "char": "生",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹手一 (HQM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "師",
        "codes": [
          "竹",
          "月"
        ],
        "keys": [
          "H",
          "B"
        ],
        "full": "竹月 (HB)",
        "cj_full": "竹口一中月 (HRMLB)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【月】(B)"
      },
      {
        "char": "永",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈弓水 (INE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      }
    ]
  },
  "w4_hw3": {
    "key": "w4_hw3",
    "week": "w4",
    "weekName": "第4周",
    "hwName": "功課3",
    "title": "第4周功課3",
    "dateRange": "21/09/2026 8:00 AM - 27/09/2026 11:30 PM",
    "startDate": "2026-09-21T08:00:00+08:00",
    "endDate": "2026-09-27T23:30:00+08:00",
    "words": [
      {
        "char": "羊",
        "codes": [
          "廿",
          "手"
        ],
        "keys": [
          "T",
          "Q"
        ],
        "full": "廿手 (TQ)",
        "cj_full": "廿手 (TQ)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "牢",
        "codes": [
          "十",
          "手"
        ],
        "keys": [
          "J",
          "Q"
        ],
        "full": "十手 (JQ)",
        "cj_full": "十竹手 (JHQ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "扒",
        "codes": [
          "手",
          "金"
        ],
        "keys": [
          "Q",
          "C"
        ],
        "full": "手金 (QC)",
        "cj_full": "手金 (QC)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【金】(C)"
      },
      {
        "char": "丹",
        "codes": [
          "月",
          "卜"
        ],
        "keys": [
          "B",
          "Y"
        ],
        "full": "月卜 (BY)",
        "cj_full": "月卜 (BY)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【卜】(Y)"
      },
      {
        "char": "扳",
        "codes": [
          "手",
          "水"
        ],
        "keys": [
          "Q",
          "E"
        ],
        "full": "手水 (QE)",
        "cj_full": "手竹水 (QHE)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【水】(E)"
      },
      {
        "char": "展",
        "codes": [
          "尸",
          "女"
        ],
        "keys": [
          "S",
          "V"
        ],
        "full": "尸女 (SV)",
        "cj_full": "尸廿女 (STV)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【女】(V)"
      },
      {
        "char": "姘",
        "codes": [
          "女",
          "廿"
        ],
        "keys": [
          "V",
          "T"
        ],
        "full": "女廿 (VT)",
        "cj_full": "女廿廿 (VTT)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "曲",
        "codes": [
          "廿",
          "田"
        ],
        "keys": [
          "T",
          "W"
        ],
        "full": "廿田 (TW)",
        "cj_full": "廿田 (TW)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【田】(W)"
      },
      {
        "char": "芒",
        "codes": [
          "廿",
          "女"
        ],
        "keys": [
          "T",
          "V"
        ],
        "full": "廿女 (TV)",
        "cj_full": "廿卜女 (TYV)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【女】(V)"
      },
      {
        "char": "已",
        "codes": [
          "尸",
          "山"
        ],
        "keys": [
          "S",
          "U"
        ],
        "full": "尸山 (SU)",
        "cj_full": "尸山 (SU)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【山】(U)"
      },
      {
        "char": "屈",
        "codes": [
          "尸",
          "山"
        ],
        "keys": [
          "S",
          "U"
        ],
        "full": "尸山 (SU)",
        "cj_full": "尸山山 (SUU)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【山】(U)"
      },
      {
        "char": "茁",
        "codes": [
          "廿",
          "山"
        ],
        "keys": [
          "T",
          "U"
        ],
        "full": "廿山 (TU)",
        "cj_full": "廿山山 (TUU)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【山】(U)"
      },
      {
        "char": "甘",
        "codes": [
          "廿",
          "一"
        ],
        "keys": [
          "T",
          "M"
        ],
        "full": "廿一 (TM)",
        "cj_full": "廿一 (TM)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【一】(M)"
      },
      {
        "char": "苟",
        "codes": [
          "廿",
          "口"
        ],
        "keys": [
          "T",
          "R"
        ],
        "full": "廿口 (TR)",
        "cj_full": "廿心口 (TPR)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【口】(R)"
      },
      {
        "char": "泵",
        "codes": [
          "一",
          "水"
        ],
        "keys": [
          "M",
          "E"
        ],
        "full": "一水 (ME)",
        "cj_full": "一口水 (MRE)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【水】(E)"
      },
      {
        "char": "屁",
        "codes": [
          "尸",
          "心"
        ],
        "keys": [
          "S",
          "P"
        ],
        "full": "尸心 (SP)",
        "cj_full": "尸心心 (SPP)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【心】(P)"
      },
      {
        "char": "迴",
        "codes": [
          "卜",
          "口"
        ],
        "keys": [
          "Y",
          "R"
        ],
        "full": "卜口 (YR)",
        "cj_full": "卜田口 (YWR)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【口】(R)"
      },
      {
        "char": "徊",
        "codes": [
          "竹",
          "口"
        ],
        "keys": [
          "H",
          "R"
        ],
        "full": "竹口 (HR)",
        "cj_full": "竹人田口 (HOWR)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【口】(R)"
      },
      {
        "char": "幻",
        "codes": [
          "女",
          "尸"
        ],
        "keys": [
          "V",
          "S"
        ],
        "full": "女尸 (VS)",
        "cj_full": "女戈尸 (VIS)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "乩",
        "codes": [
          "卜",
          "山"
        ],
        "keys": [
          "Y",
          "U"
        ],
        "full": "卜山 (YU)",
        "cj_full": "卜口山 (YRU)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【山】(U)"
      },
      {
        "char": "忌",
        "codes": [
          "尸",
          "心"
        ],
        "keys": [
          "S",
          "P"
        ],
        "full": "尸心 (SP)",
        "cj_full": "尸山心 (SUP)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【心】(P)"
      },
      {
        "char": "窄",
        "codes": [
          "十",
          "尸"
        ],
        "keys": [
          "J",
          "S"
        ],
        "full": "十尸 (JS)",
        "cj_full": "十金竹尸 (JCHS)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "帚",
        "codes": [
          "尸",
          "月"
        ],
        "keys": [
          "S",
          "B"
        ],
        "full": "尸月 (SB)",
        "cj_full": "尸一月中月 (SMBLB)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【月】(B)"
      },
      {
        "char": "巨",
        "codes": [
          "尸",
          "尸"
        ],
        "keys": [
          "S",
          "S"
        ],
        "full": "尸尸 (SS)",
        "cj_full": "尸尸 (SS)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "刃",
        "codes": [
          "尸",
          "戈"
        ],
        "keys": [
          "S",
          "I"
        ],
        "full": "尸戈 (SI)",
        "cj_full": "尸竹戈 (SHI)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "長",
        "codes": [
          "尸",
          "女"
        ],
        "keys": [
          "S",
          "V"
        ],
        "full": "尸女 (SV)",
        "cj_full": "尸一女 (SMV)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【女】(V)"
      },
      {
        "char": "句",
        "codes": [
          "心",
          "口"
        ],
        "keys": [
          "P",
          "R"
        ],
        "full": "心口 (PR)",
        "cj_full": "心口 (PR)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【口】(R)"
      },
      {
        "char": "穴",
        "codes": [
          "十",
          "金"
        ],
        "keys": [
          "J",
          "C"
        ],
        "full": "十金 (JC)",
        "cj_full": "十金 (JC)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【金】(C)"
      },
      {
        "char": "豆",
        "codes": [
          "一",
          "廿"
        ],
        "keys": [
          "M",
          "T"
        ],
        "full": "一廿 (MT)",
        "cj_full": "一口廿 (MRT)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "恭",
        "codes": [
          "廿",
          "心"
        ],
        "keys": [
          "T",
          "P"
        ],
        "full": "廿心 (TP)",
        "cj_full": "廿金心 (TCP)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【心】(P)"
      },
      {
        "char": "皿",
        "codes": [
          "月",
          "廿"
        ],
        "keys": [
          "B",
          "T"
        ],
        "full": "月廿 (BT)",
        "cj_full": "月廿 (BT)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "逆",
        "codes": [
          "卜",
          "山"
        ],
        "keys": [
          "Y",
          "U"
        ],
        "full": "卜山 (YU)",
        "cj_full": "卜廿山 (YTU)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【山】(U)"
      },
      {
        "char": "以",
        "codes": [
          "女",
          "人"
        ],
        "keys": [
          "V",
          "O"
        ],
        "full": "女人 (VO)",
        "cj_full": "女戈人 (VIO)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【人】(O)"
      },
      {
        "char": "妄",
        "codes": [
          "卜",
          "女"
        ],
        "keys": [
          "Y",
          "V"
        ],
        "full": "卜女 (YV)",
        "cj_full": "卜女女 (YVV)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【女】(V)"
      },
      {
        "char": "方",
        "codes": [
          "卜",
          "尸"
        ],
        "keys": [
          "Y",
          "S"
        ],
        "full": "卜尸 (YS)",
        "cj_full": "卜竹尸 (YHS)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "週",
        "codes": [
          "卜",
          "口"
        ],
        "keys": [
          "Y",
          "R"
        ],
        "full": "卜口 (YR)",
        "cj_full": "卜月土口 (YBGR)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【口】(R)"
      },
      {
        "char": "五",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一木一 (MDM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "幸",
        "codes": [
          "土",
          "十"
        ],
        "keys": [
          "G",
          "J"
        ],
        "full": "土十 (GJ)",
        "cj_full": "土廿十 (GTJ)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【十】(J)"
      },
      {
        "char": "宜",
        "codes": [
          "十",
          "一"
        ],
        "keys": [
          "J",
          "M"
        ],
        "full": "十一 (JM)",
        "cj_full": "十月一 (JBM)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【一】(M)"
      },
      {
        "char": "皇",
        "codes": [
          "竹",
          "土"
        ],
        "keys": [
          "H",
          "G"
        ],
        "full": "竹土 (HG)",
        "cj_full": "竹日一土 (HAMG)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【土】(G)"
      }
    ]
  },
  "w4_hw4": {
    "key": "w4_hw4",
    "week": "w4",
    "weekName": "第4周",
    "hwName": "功課4",
    "title": "第4周功課4",
    "dateRange": "21/09/2026 8:00 AM - 27/09/2026 11:30 PM",
    "startDate": "2026-09-21T08:00:00+08:00",
    "endDate": "2026-09-27T23:30:00+08:00",
    "words": [
      {
        "char": "刺",
        "codes": [
          "木",
          "弓"
        ],
        "keys": [
          "D",
          "N"
        ],
        "full": "木弓 (DN)",
        "cj_full": "木月中弓 (DBLN)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "夷",
        "codes": [
          "大",
          "弓"
        ],
        "keys": [
          "K",
          "N"
        ],
        "full": "大弓 (KN)",
        "cj_full": "大弓 (KN)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "姨",
        "codes": [
          "女",
          "弓"
        ],
        "keys": [
          "V",
          "N"
        ],
        "full": "女弓 (VN)",
        "cj_full": "女大弓 (VKN)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "痍",
        "codes": [
          "大",
          "弓"
        ],
        "keys": [
          "K",
          "N"
        ],
        "full": "大弓 (KN)",
        "cj_full": "大大弓 (KKN)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "卷",
        "codes": [
          "火",
          "山"
        ],
        "keys": [
          "F",
          "U"
        ],
        "full": "火山 (FU)",
        "cj_full": "火手尸山 (FQSU)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【山】(U)"
      },
      {
        "char": "再",
        "codes": [
          "一",
          "月"
        ],
        "keys": [
          "M",
          "B"
        ],
        "full": "一月 (MB)",
        "cj_full": "一土月 (MGB)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【月】(B)"
      },
      {
        "char": "冉",
        "codes": [
          "土",
          "月"
        ],
        "keys": [
          "G",
          "B"
        ],
        "full": "土月 (GB)",
        "cj_full": "土月 (GB)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【月】(B)"
      },
      {
        "char": "也",
        "codes": [
          "心",
          "木"
        ],
        "keys": [
          "P",
          "D"
        ],
        "full": "心木 (PD)",
        "cj_full": "心木 (PD)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【木】(D)"
      },
      {
        "char": "世",
        "codes": [
          "心",
          "廿"
        ],
        "keys": [
          "P",
          "T"
        ],
        "full": "心廿 (PT)",
        "cj_full": "心廿 (PT)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "葉",
        "codes": [
          "廿",
          "木"
        ],
        "keys": [
          "T",
          "D"
        ],
        "full": "廿木 (TD)",
        "cj_full": "廿心廿木 (TPTD)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【木】(D)"
      },
      {
        "char": "泄",
        "codes": [
          "水",
          "廿"
        ],
        "keys": [
          "E",
          "T"
        ],
        "full": "水廿 (ET)",
        "cj_full": "水心廿 (EPT)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "碟",
        "codes": [
          "一",
          "木"
        ],
        "keys": [
          "M",
          "D"
        ],
        "full": "一木 (MD)",
        "cj_full": "一口心廿木 (MRPTD)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【木】(D)"
      },
      {
        "char": "東",
        "codes": [
          "木",
          "田"
        ],
        "keys": [
          "D",
          "W"
        ],
        "full": "木田 (DW)",
        "cj_full": "木田 (DW)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【田】(W)"
      },
      {
        "char": "來",
        "codes": [
          "木",
          "人"
        ],
        "keys": [
          "D",
          "O"
        ],
        "full": "木人 (DO)",
        "cj_full": "木人人 (DOO)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【人】(O)"
      },
      {
        "char": "睞",
        "codes": [
          "月",
          "人"
        ],
        "keys": [
          "B",
          "O"
        ],
        "full": "月人 (BO)",
        "cj_full": "月山木人人 (BUDOO)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【人】(O)"
      },
      {
        "char": "束",
        "codes": [
          "木",
          "中"
        ],
        "keys": [
          "D",
          "L"
        ],
        "full": "木中 (DL)",
        "cj_full": "木中 (DL)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【中】(L)"
      },
      {
        "char": "柬",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木田火 (DWF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "鍊",
        "codes": [
          "金",
          "火"
        ],
        "keys": [
          "C",
          "F"
        ],
        "full": "金火 (CF)",
        "cj_full": "金木田火 (CDWF)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【火】(F)"
      },
      {
        "char": "煉",
        "codes": [
          "火",
          "火"
        ],
        "keys": [
          "F",
          "F"
        ],
        "full": "火火 (FF)",
        "cj_full": "火木田火 (FDWF)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【火】(F)"
      },
      {
        "char": "爽",
        "codes": [
          "大",
          "大"
        ],
        "keys": [
          "K",
          "K"
        ],
        "full": "大大 (KK)",
        "cj_full": "大大大大 (KKKK)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【大】(K)"
      },
      {
        "char": "拳",
        "codes": [
          "火",
          "手"
        ],
        "keys": [
          "F",
          "Q"
        ],
        "full": "火手 (FQ)",
        "cj_full": "火手手 (FQQ)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "脊",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火金月 (FCB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "夾",
        "codes": [
          "大",
          "人"
        ],
        "keys": [
          "K",
          "O"
        ],
        "full": "大人 (KO)",
        "cj_full": "大人人 (KOO)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【人】(O)"
      },
      {
        "char": "俠",
        "codes": [
          "人",
          "人"
        ],
        "keys": [
          "O",
          "O"
        ],
        "full": "人人 (OO)",
        "cj_full": "人大人人 (OKOO)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【人】(O)"
      },
      {
        "char": "峽",
        "codes": [
          "山",
          "人"
        ],
        "keys": [
          "U",
          "O"
        ],
        "full": "山人 (UO)",
        "cj_full": "山大人人 (UKOO)",
        "secret": "速成首碼【山】(U) ＋ 尾碼【人】(O)"
      },
      {
        "char": "首",
        "codes": [
          "廿",
          "山"
        ],
        "keys": [
          "T",
          "U"
        ],
        "full": "廿山 (TU)",
        "cj_full": "廿竹月山 (THBU)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【山】(U)"
      },
      {
        "char": "冒",
        "codes": [
          "日",
          "山"
        ],
        "keys": [
          "A",
          "U"
        ],
        "full": "日山 (AU)",
        "cj_full": "日月山 (ABU)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【山】(U)"
      },
      {
        "char": "隻",
        "codes": [
          "人",
          "水"
        ],
        "keys": [
          "O",
          "E"
        ],
        "full": "人水 (OE)",
        "cj_full": "人土水 (OGE)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【水】(E)"
      },
      {
        "char": "員",
        "codes": [
          "口",
          "金"
        ],
        "keys": [
          "R",
          "C"
        ],
        "full": "口金 (RC)",
        "cj_full": "口月山金 (RBUC)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【金】(C)"
      },
      {
        "char": "眉",
        "codes": [
          "日",
          "山"
        ],
        "keys": [
          "A",
          "U"
        ],
        "full": "日山 (AU)",
        "cj_full": "日竹月山 (AHBU)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【山】(U)"
      },
      {
        "char": "親",
        "codes": [
          "卜",
          "山"
        ],
        "keys": [
          "Y",
          "U"
        ],
        "full": "卜山 (YU)",
        "cj_full": "卜木月山山 (YDBUU)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【山】(U)"
      },
      {
        "char": "看",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹手月山 (HQBU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "們",
        "codes": [
          "人",
          "弓"
        ],
        "keys": [
          "O",
          "N"
        ],
        "full": "人弓 (ON)",
        "cj_full": "人日弓 (OAN)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "現",
        "codes": [
          "一",
          "山"
        ],
        "keys": [
          "M",
          "U"
        ],
        "full": "一山 (MU)",
        "cj_full": "一土月山山 (MGBUU)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【山】(U)"
      },
      {
        "char": "隊",
        "codes": [
          "弓",
          "人"
        ],
        "keys": [
          "N",
          "O"
        ],
        "full": "弓人 (NO)",
        "cj_full": "弓中廿心人 (NLTPO)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【人】(O)"
      },
      {
        "char": "維",
        "codes": [
          "女",
          "土"
        ],
        "keys": [
          "V",
          "G"
        ],
        "full": "女土 (VG)",
        "cj_full": "女火人土 (VFOG)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【土】(G)"
      },
      {
        "char": "覺",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹月月山山 (HBBUU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "附",
        "codes": [
          "弓",
          "戈"
        ],
        "keys": [
          "N",
          "I"
        ],
        "full": "弓戈 (NI)",
        "cj_full": "弓中人木戈 (NLODI)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "降",
        "codes": [
          "弓",
          "手"
        ],
        "keys": [
          "N",
          "Q"
        ],
        "full": "弓手 (NQ)",
        "cj_full": "弓中竹水手 (NLHEQ)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "郊",
        "codes": [
          "卜",
          "中"
        ],
        "keys": [
          "Y",
          "L"
        ],
        "full": "卜中 (YL)",
        "cj_full": "卜大弓中 (YKNL)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【中】(L)"
      }
    ]
  },
  "w5_hw1": {
    "key": "w5_hw1",
    "week": "w5",
    "weekName": "第5周",
    "hwName": "功課1",
    "title": "第5周功課1",
    "dateRange": "28/09/2026 12:00 AM - 04/10/2026 11:30 PM",
    "startDate": "2026-09-28T00:00:00+08:00",
    "endDate": "2026-10-04T23:30:00+08:00",
    "words": [
      {
        "char": "刺",
        "codes": [
          "木",
          "弓"
        ],
        "keys": [
          "D",
          "N"
        ],
        "full": "木弓 (DN)",
        "cj_full": "木月中弓 (DBLN)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "夷",
        "codes": [
          "大",
          "弓"
        ],
        "keys": [
          "K",
          "N"
        ],
        "full": "大弓 (KN)",
        "cj_full": "大弓 (KN)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "姨",
        "codes": [
          "女",
          "弓"
        ],
        "keys": [
          "V",
          "N"
        ],
        "full": "女弓 (VN)",
        "cj_full": "女大弓 (VKN)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "痍",
        "codes": [
          "大",
          "弓"
        ],
        "keys": [
          "K",
          "N"
        ],
        "full": "大弓 (KN)",
        "cj_full": "大大弓 (KKN)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "卷",
        "codes": [
          "火",
          "山"
        ],
        "keys": [
          "F",
          "U"
        ],
        "full": "火山 (FU)",
        "cj_full": "火手尸山 (FQSU)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【山】(U)"
      },
      {
        "char": "再",
        "codes": [
          "一",
          "月"
        ],
        "keys": [
          "M",
          "B"
        ],
        "full": "一月 (MB)",
        "cj_full": "一土月 (MGB)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【月】(B)"
      },
      {
        "char": "冉",
        "codes": [
          "土",
          "月"
        ],
        "keys": [
          "G",
          "B"
        ],
        "full": "土月 (GB)",
        "cj_full": "土月 (GB)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【月】(B)"
      },
      {
        "char": "也",
        "codes": [
          "心",
          "木"
        ],
        "keys": [
          "P",
          "D"
        ],
        "full": "心木 (PD)",
        "cj_full": "心木 (PD)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【木】(D)"
      },
      {
        "char": "世",
        "codes": [
          "心",
          "廿"
        ],
        "keys": [
          "P",
          "T"
        ],
        "full": "心廿 (PT)",
        "cj_full": "心廿 (PT)",
        "secret": "速成首碼【心】(P) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "葉",
        "codes": [
          "廿",
          "木"
        ],
        "keys": [
          "T",
          "D"
        ],
        "full": "廿木 (TD)",
        "cj_full": "廿心廿木 (TPTD)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【木】(D)"
      },
      {
        "char": "泄",
        "codes": [
          "水",
          "廿"
        ],
        "keys": [
          "E",
          "T"
        ],
        "full": "水廿 (ET)",
        "cj_full": "水心廿 (EPT)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "碟",
        "codes": [
          "一",
          "木"
        ],
        "keys": [
          "M",
          "D"
        ],
        "full": "一木 (MD)",
        "cj_full": "一口心廿木 (MRPTD)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【木】(D)"
      },
      {
        "char": "東",
        "codes": [
          "木",
          "田"
        ],
        "keys": [
          "D",
          "W"
        ],
        "full": "木田 (DW)",
        "cj_full": "木田 (DW)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【田】(W)"
      },
      {
        "char": "來",
        "codes": [
          "木",
          "人"
        ],
        "keys": [
          "D",
          "O"
        ],
        "full": "木人 (DO)",
        "cj_full": "木人人 (DOO)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【人】(O)"
      },
      {
        "char": "睞",
        "codes": [
          "月",
          "人"
        ],
        "keys": [
          "B",
          "O"
        ],
        "full": "月人 (BO)",
        "cj_full": "月山木人人 (BUDOO)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【人】(O)"
      },
      {
        "char": "束",
        "codes": [
          "木",
          "中"
        ],
        "keys": [
          "D",
          "L"
        ],
        "full": "木中 (DL)",
        "cj_full": "木中 (DL)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【中】(L)"
      },
      {
        "char": "柬",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木田火 (DWF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "鍊",
        "codes": [
          "金",
          "火"
        ],
        "keys": [
          "C",
          "F"
        ],
        "full": "金火 (CF)",
        "cj_full": "金木田火 (CDWF)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【火】(F)"
      },
      {
        "char": "煉",
        "codes": [
          "火",
          "火"
        ],
        "keys": [
          "F",
          "F"
        ],
        "full": "火火 (FF)",
        "cj_full": "火木田火 (FDWF)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【火】(F)"
      },
      {
        "char": "爽",
        "codes": [
          "大",
          "大"
        ],
        "keys": [
          "K",
          "K"
        ],
        "full": "大大 (KK)",
        "cj_full": "大大大大 (KKKK)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【大】(K)"
      },
      {
        "char": "拳",
        "codes": [
          "火",
          "手"
        ],
        "keys": [
          "F",
          "Q"
        ],
        "full": "火手 (FQ)",
        "cj_full": "火手手 (FQQ)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "脊",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火金月 (FCB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "夾",
        "codes": [
          "大",
          "人"
        ],
        "keys": [
          "K",
          "O"
        ],
        "full": "大人 (KO)",
        "cj_full": "大人人 (KOO)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【人】(O)"
      },
      {
        "char": "俠",
        "codes": [
          "人",
          "人"
        ],
        "keys": [
          "O",
          "O"
        ],
        "full": "人人 (OO)",
        "cj_full": "人大人人 (OKOO)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【人】(O)"
      },
      {
        "char": "峽",
        "codes": [
          "山",
          "人"
        ],
        "keys": [
          "U",
          "O"
        ],
        "full": "山人 (UO)",
        "cj_full": "山大人人 (UKOO)",
        "secret": "速成首碼【山】(U) ＋ 尾碼【人】(O)"
      },
      {
        "char": "身",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹難竹 (HXH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "寫",
        "codes": [
          "十",
          "火"
        ],
        "keys": [
          "J",
          "F"
        ],
        "full": "十火 (JF)",
        "cj_full": "十竹難火 (JHXF)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【火】(F)"
      },
      {
        "char": "兒",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹難竹山 (HXHU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "姊",
        "codes": [
          "女",
          "竹"
        ],
        "keys": [
          "V",
          "H"
        ],
        "full": "女竹 (VH)",
        "cj_full": "女中難竹 (VLXH)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "鹿",
        "codes": [
          "戈",
          "心"
        ],
        "keys": [
          "I",
          "P"
        ],
        "full": "戈心 (IP)",
        "cj_full": "戈難心 (IXP)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【心】(P)"
      },
      {
        "char": "齊",
        "codes": [
          "卜",
          "難"
        ],
        "keys": [
          "Y",
          "X"
        ],
        "full": "卜難 (YX)",
        "cj_full": "卜難 (YX)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【難】(X)"
      },
      {
        "char": "與",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難卜金 (HXYC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "插",
        "codes": [
          "手",
          "難"
        ],
        "keys": [
          "Q",
          "X"
        ],
        "full": "手難 (QX)",
        "cj_full": "手竹十難 (QHJX)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【難】(X)"
      },
      {
        "char": "嫂",
        "codes": [
          "女",
          "水"
        ],
        "keys": [
          "V",
          "E"
        ],
        "full": "女水 (VE)",
        "cj_full": "女竹難水 (VHXE)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【水】(E)"
      },
      {
        "char": "慶",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈難水 (IXE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      },
      {
        "char": "稻",
        "codes": [
          "竹",
          "難"
        ],
        "keys": [
          "H",
          "X"
        ],
        "full": "竹難 (HX)",
        "cj_full": "竹木月竹難 (HDBHX)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【難】(X)"
      },
      {
        "char": "興",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難月金 (HXBC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "擠",
        "codes": [
          "手",
          "難"
        ],
        "keys": [
          "Q",
          "X"
        ],
        "full": "手難 (QX)",
        "cj_full": "手卜難 (QYX)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【難】(X)"
      },
      {
        "char": "舊",
        "codes": [
          "廿",
          "難"
        ],
        "keys": [
          "T",
          "X"
        ],
        "full": "廿難 (TX)",
        "cj_full": "廿人土難 (TOGX)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【難】(X)"
      },
      {
        "char": "繩",
        "codes": [
          "女",
          "山"
        ],
        "keys": [
          "V",
          "U"
        ],
        "full": "女山 (VU)",
        "cj_full": "女火口難山 (VFRXU)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【山】(U)"
      },
      {
        "char": "蠅",
        "codes": [
          "中",
          "山"
        ],
        "keys": [
          "L",
          "U"
        ],
        "full": "中山 (LU)",
        "cj_full": "中戈口難山 (LIRXU)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【山】(U)"
      },
      {
        "char": "來",
        "codes": [
          "木",
          "人"
        ],
        "keys": [
          "D",
          "O"
        ],
        "full": "木人 (DO)",
        "cj_full": "木人人 (DOO)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【人】(O)"
      },
      {
        "char": "卷",
        "codes": [
          "火",
          "山"
        ],
        "keys": [
          "F",
          "U"
        ],
        "full": "火山 (FU)",
        "cj_full": "火手尸山 (FQSU)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【山】(U)"
      },
      {
        "char": "圈",
        "codes": [
          "田",
          "山"
        ],
        "keys": [
          "W",
          "U"
        ],
        "full": "田山 (WU)",
        "cj_full": "田火手山 (WFQU)",
        "secret": "速成首碼【田】(W) ＋ 尾碼【山】(U)"
      },
      {
        "char": "勝",
        "codes": [
          "月",
          "尸"
        ],
        "keys": [
          "B",
          "S"
        ],
        "full": "月尸 (BS)",
        "cj_full": "月火手尸 (BFQS)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "問",
        "codes": [
          "日",
          "口"
        ],
        "keys": [
          "A",
          "R"
        ],
        "full": "日口 (AR)",
        "cj_full": "日弓口 (ANR)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【口】(R)"
      },
      {
        "char": "都",
        "codes": [
          "十",
          "中"
        ],
        "keys": [
          "J",
          "L"
        ],
        "full": "十中 (JL)",
        "cj_full": "十日弓中 (JANL)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【中】(L)"
      },
      {
        "char": "雄",
        "codes": [
          "大",
          "土"
        ],
        "keys": [
          "K",
          "G"
        ],
        "full": "大土 (KG)",
        "cj_full": "大戈人土 (KIOG)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【土】(G)"
      },
      {
        "char": "進",
        "codes": [
          "卜",
          "土"
        ],
        "keys": [
          "Y",
          "G"
        ],
        "full": "卜土 (YG)",
        "cj_full": "卜人土 (YOG)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【土】(G)"
      },
      {
        "char": "視",
        "codes": [
          "戈",
          "山"
        ],
        "keys": [
          "I",
          "U"
        ],
        "full": "戈山 (IU)",
        "cj_full": "戈火月山山 (IFBUU)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【山】(U)"
      }
    ]
  },
  "w5_hw2": {
    "key": "w5_hw2",
    "week": "w5",
    "weekName": "第5周",
    "hwName": "功課2",
    "title": "第5周功課2",
    "dateRange": "28/09/2026 12:00 AM - 04/10/2026 11:30 PM",
    "startDate": "2026-09-28T00:00:00+08:00",
    "endDate": "2026-10-04T23:30:00+08:00",
    "words": [
      {
        "char": "身",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹難竹 (HXH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "慶",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈難水 (IXE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      },
      {
        "char": "龜",
        "codes": [
          "弓",
          "山"
        ],
        "keys": [
          "N",
          "U"
        ],
        "full": "弓山 (NU)",
        "cj_full": "弓難山 (NXU)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【山】(U)"
      },
      {
        "char": "鹿",
        "codes": [
          "戈",
          "心"
        ],
        "keys": [
          "I",
          "P"
        ],
        "full": "戈心 (IP)",
        "cj_full": "戈難心 (IXP)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【心】(P)"
      },
      {
        "char": "麓",
        "codes": [
          "木",
          "心"
        ],
        "keys": [
          "D",
          "P"
        ],
        "full": "木心 (DP)",
        "cj_full": "木木戈難心 (DDIXP)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【心】(P)"
      },
      {
        "char": "薦",
        "codes": [
          "廿",
          "火"
        ],
        "keys": [
          "T",
          "F"
        ],
        "full": "廿火 (TF)",
        "cj_full": "廿戈難火 (TIXF)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【火】(F)"
      },
      {
        "char": "姊",
        "codes": [
          "女",
          "竹"
        ],
        "keys": [
          "V",
          "H"
        ],
        "full": "女竹 (VH)",
        "cj_full": "女中難竹 (VLXH)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "淵",
        "codes": [
          "水",
          "中"
        ],
        "keys": [
          "E",
          "L"
        ],
        "full": "水中 (EL)",
        "cj_full": "水中難中 (ELXL)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【中】(L)"
      },
      {
        "char": "肅",
        "codes": [
          "中",
          "難"
        ],
        "keys": [
          "L",
          "X"
        ],
        "full": "中難 (LX)",
        "cj_full": "中難 (LX)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【難】(X)"
      },
      {
        "char": "鏽",
        "codes": [
          "金",
          "難"
        ],
        "keys": [
          "C",
          "X"
        ],
        "full": "金難 (CX)",
        "cj_full": "金中難 (CLX)",
        "secret": "速成首碼【金】(C) ＋ 尾碼【難】(X)"
      },
      {
        "char": "繩",
        "codes": [
          "女",
          "山"
        ],
        "keys": [
          "V",
          "U"
        ],
        "full": "女山 (VU)",
        "cj_full": "女火口難山 (VFRXU)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【山】(U)"
      },
      {
        "char": "蠅",
        "codes": [
          "中",
          "山"
        ],
        "keys": [
          "L",
          "U"
        ],
        "full": "中山 (LU)",
        "cj_full": "中戈口難山 (LIRXU)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【山】(U)"
      },
      {
        "char": "兼",
        "codes": [
          "廿",
          "金"
        ],
        "keys": [
          "T",
          "C"
        ],
        "full": "廿金 (TC)",
        "cj_full": "廿難金 (TXC)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【金】(C)"
      },
      {
        "char": "嫌",
        "codes": [
          "女",
          "金"
        ],
        "keys": [
          "V",
          "C"
        ],
        "full": "女金 (VC)",
        "cj_full": "女廿難金 (VTXC)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【金】(C)"
      },
      {
        "char": "賺",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月金廿難金 (BCTXC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "舀",
        "codes": [
          "月",
          "難"
        ],
        "keys": [
          "B",
          "X"
        ],
        "full": "月難 (BX)",
        "cj_full": "月竹難 (BHX)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【難】(X)"
      },
      {
        "char": "臼",
        "codes": [
          "竹",
          "難"
        ],
        "keys": [
          "H",
          "X"
        ],
        "full": "竹難 (HX)",
        "cj_full": "竹難 (HX)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【難】(X)"
      },
      {
        "char": "兒",
        "codes": [
          "竹",
          "山"
        ],
        "keys": [
          "H",
          "U"
        ],
        "full": "竹山 (HU)",
        "cj_full": "竹難竹山 (HXHU)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【山】(U)"
      },
      {
        "char": "舅",
        "codes": [
          "竹",
          "尸"
        ],
        "keys": [
          "H",
          "S"
        ],
        "full": "竹尸 (HS)",
        "cj_full": "竹難田大尸 (HXWKS)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "倪",
        "codes": [
          "人",
          "山"
        ],
        "keys": [
          "O",
          "U"
        ],
        "full": "人山 (OU)",
        "cj_full": "人竹難山 (OHXU)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【山】(U)"
      },
      {
        "char": "與",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難卜金 (HXYC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "興",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難月金 (HXBC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "叟",
        "codes": [
          "竹",
          "水"
        ],
        "keys": [
          "H",
          "E"
        ],
        "full": "竹水 (HE)",
        "cj_full": "竹難中水 (HXLE)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【水】(E)"
      },
      {
        "char": "嫂",
        "codes": [
          "女",
          "水"
        ],
        "keys": [
          "V",
          "E"
        ],
        "full": "女水 (VE)",
        "cj_full": "女竹難水 (VHXE)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【水】(E)"
      },
      {
        "char": "臾",
        "codes": [
          "竹",
          "人"
        ],
        "keys": [
          "H",
          "O"
        ],
        "full": "竹人 (HO)",
        "cj_full": "竹難人 (HXO)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【人】(O)"
      },
      {
        "char": "蕭",
        "codes": [
          "廿",
          "難"
        ],
        "keys": [
          "T",
          "X"
        ],
        "full": "廿難 (TX)",
        "cj_full": "廿中難 (TLX)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【難】(X)"
      },
      {
        "char": "簫",
        "codes": [
          "竹",
          "難"
        ],
        "keys": [
          "H",
          "X"
        ],
        "full": "竹難 (HX)",
        "cj_full": "竹中難 (HLX)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【難】(X)"
      },
      {
        "char": "霽",
        "codes": [
          "一",
          "難"
        ],
        "keys": [
          "M",
          "X"
        ],
        "full": "一難 (MX)",
        "cj_full": "一月卜難 (MBYX)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【難】(X)"
      },
      {
        "char": "齊",
        "codes": [
          "卜",
          "難"
        ],
        "keys": [
          "Y",
          "X"
        ],
        "full": "卜難 (YX)",
        "cj_full": "卜難 (YX)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【難】(X)"
      },
      {
        "char": "擠",
        "codes": [
          "手",
          "難"
        ],
        "keys": [
          "Q",
          "X"
        ],
        "full": "手難 (QX)",
        "cj_full": "手卜難 (QYX)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【難】(X)"
      },
      {
        "char": "劑",
        "codes": [
          "卜",
          "弓"
        ],
        "keys": [
          "Y",
          "N"
        ],
        "full": "卜弓 (YN)",
        "cj_full": "卜難中弓 (YXLN)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "慶",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈難水 (IXE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      },
      {
        "char": "嫌",
        "codes": [
          "女",
          "金"
        ],
        "keys": [
          "V",
          "C"
        ],
        "full": "女金 (VC)",
        "cj_full": "女廿難金 (VTXC)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【金】(C)"
      },
      {
        "char": "齋",
        "codes": [
          "卜",
          "火"
        ],
        "keys": [
          "Y",
          "F"
        ],
        "full": "卜火 (YF)",
        "cj_full": "卜難火 (YXF)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【火】(F)"
      },
      {
        "char": "濟",
        "codes": [
          "水",
          "難"
        ],
        "keys": [
          "E",
          "X"
        ],
        "full": "水難 (EX)",
        "cj_full": "水卜難 (EYX)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【難】(X)"
      },
      {
        "char": "盥",
        "codes": [
          "竹",
          "廿"
        ],
        "keys": [
          "H",
          "T"
        ],
        "full": "竹廿 (HT)",
        "cj_full": "竹難月廿 (HXBT)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "舊",
        "codes": [
          "廿",
          "難"
        ],
        "keys": [
          "T",
          "X"
        ],
        "full": "廿難 (TX)",
        "cj_full": "廿人土難 (TOGX)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【難】(X)"
      },
      {
        "char": "搜",
        "codes": [
          "手",
          "水"
        ],
        "keys": [
          "Q",
          "E"
        ],
        "full": "手水 (QE)",
        "cj_full": "手竹難水 (QHXE)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【水】(E)"
      },
      {
        "char": "樁",
        "codes": [
          "木",
          "難"
        ],
        "keys": [
          "D",
          "X"
        ],
        "full": "木難 (DX)",
        "cj_full": "木手大難 (DQKX)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【難】(X)"
      },
      {
        "char": "鼠",
        "codes": [
          "竹",
          "女"
        ],
        "keys": [
          "H",
          "V"
        ],
        "full": "竹女 (HV)",
        "cj_full": "竹難女卜女 (HXVYV)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【女】(V)"
      },
      {
        "char": "稻",
        "codes": [
          "竹",
          "難"
        ],
        "keys": [
          "H",
          "X"
        ],
        "full": "竹難 (HX)",
        "cj_full": "竹木月竹難 (HDBHX)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【難】(X)"
      },
      {
        "char": "諂",
        "codes": [
          "卜",
          "難"
        ],
        "keys": [
          "Y",
          "X"
        ],
        "full": "卜難 (YX)",
        "cj_full": "卜口弓竹難 (YRNHX)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【難】(X)"
      },
      {
        "char": "插",
        "codes": [
          "手",
          "難"
        ],
        "keys": [
          "Q",
          "X"
        ],
        "full": "手難 (QX)",
        "cj_full": "手竹十難 (QHJX)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【難】(X)"
      },
      {
        "char": "焰",
        "codes": [
          "火",
          "難"
        ],
        "keys": [
          "F",
          "X"
        ],
        "full": "火難 (FX)",
        "cj_full": "火弓竹難 (FNHX)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【難】(X)"
      },
      {
        "char": "寫",
        "codes": [
          "十",
          "火"
        ],
        "keys": [
          "J",
          "F"
        ],
        "full": "十火 (JF)",
        "cj_full": "十竹難火 (JHXF)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【火】(F)"
      },
      {
        "char": "舂",
        "codes": [
          "手",
          "難"
        ],
        "keys": [
          "Q",
          "X"
        ],
        "full": "手難 (QX)",
        "cj_full": "手大竹難 (QKHX)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【難】(X)"
      },
      {
        "char": "輿",
        "codes": [
          "竹",
          "金"
        ],
        "keys": [
          "H",
          "C"
        ],
        "full": "竹金 (HC)",
        "cj_full": "竹難十金 (HXJC)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【金】(C)"
      },
      {
        "char": "慶",
        "codes": [
          "戈",
          "水"
        ],
        "keys": [
          "I",
          "E"
        ],
        "full": "戈水 (IE)",
        "cj_full": "戈難水 (IXE)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【水】(E)"
      },
      {
        "char": "鹿",
        "codes": [
          "戈",
          "心"
        ],
        "keys": [
          "I",
          "P"
        ],
        "full": "戈心 (IP)",
        "cj_full": "戈難心 (IXP)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【心】(P)"
      },
      {
        "char": "齊",
        "codes": [
          "卜",
          "難"
        ],
        "keys": [
          "Y",
          "X"
        ],
        "full": "卜難 (YX)",
        "cj_full": "卜難 (YX)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【難】(X)"
      }
    ]
  },
  "w5_hw3": {
    "key": "w5_hw3",
    "week": "w5",
    "weekName": "第5周",
    "hwName": "功課3",
    "title": "第5周功課3",
    "dateRange": "28/09/2026 12:00 AM - 04/10/2026 11:30 PM",
    "startDate": "2026-09-28T00:00:00+08:00",
    "endDate": "2026-10-04T23:30:00+08:00",
    "words": [
      {
        "char": "業",
        "codes": [
          "廿",
          "木"
        ],
        "keys": [
          "T",
          "D"
        ],
        "full": "廿木 (TD)",
        "cj_full": "廿金廿木 (TCTD)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【木】(D)"
      },
      {
        "char": "事",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十中中弓 (JLLN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "詔",
        "codes": [
          "卜",
          "口"
        ],
        "keys": [
          "Y",
          "R"
        ],
        "full": "卜口 (YR)",
        "cj_full": "卜口尸竹口 (YRSHR)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【口】(R)"
      },
      {
        "char": "霸",
        "codes": [
          "一",
          "月"
        ],
        "keys": [
          "M",
          "B"
        ],
        "full": "一月 (MB)",
        "cj_full": "一月廿十月 (MBTJB)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【月】(B)"
      },
      {
        "char": "靈",
        "codes": [
          "一",
          "一"
        ],
        "keys": [
          "M",
          "M"
        ],
        "full": "一一 (MM)",
        "cj_full": "一月口口一 (MBRRM)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【一】(M)"
      },
      {
        "char": "浙",
        "codes": [
          "水",
          "中"
        ],
        "keys": [
          "E",
          "L"
        ],
        "full": "水中 (EL)",
        "cj_full": "水手竹中 (EQHL)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【中】(L)"
      },
      {
        "char": "概",
        "codes": [
          "木",
          "山"
        ],
        "keys": [
          "D",
          "U"
        ],
        "full": "木山 (DU)",
        "cj_full": "木日戈山 (DAIU)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【山】(U)"
      },
      {
        "char": "勢",
        "codes": [
          "土",
          "尸"
        ],
        "keys": [
          "G",
          "S"
        ],
        "full": "土尸 (GS)",
        "cj_full": "土戈大尸 (GIKS)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "甫",
        "codes": [
          "戈",
          "月"
        ],
        "keys": [
          "I",
          "B"
        ],
        "full": "戈月 (IB)",
        "cj_full": "戈十月 (IJB)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【月】(B)"
      },
      {
        "char": "功",
        "codes": [
          "一",
          "尸"
        ],
        "keys": [
          "M",
          "S"
        ],
        "full": "一尸 (MS)",
        "cj_full": "一大尸 (MKS)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "甥",
        "codes": [
          "竹",
          "尸"
        ],
        "keys": [
          "H",
          "S"
        ],
        "full": "竹尸 (HS)",
        "cj_full": "竹一田大尸 (HMWKS)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "盈",
        "codes": [
          "弓",
          "廿"
        ],
        "keys": [
          "N",
          "T"
        ],
        "full": "弓廿 (NT)",
        "cj_full": "弓尸月廿 (NSBT)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【廿】(T)"
      },
      {
        "char": "颺",
        "codes": [
          "竹",
          "竹"
        ],
        "keys": [
          "H",
          "H"
        ],
        "full": "竹竹 (HH)",
        "cj_full": "竹弓日一竹 (HNAMH)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "稿",
        "codes": [
          "竹",
          "月"
        ],
        "keys": [
          "H",
          "B"
        ],
        "full": "竹月 (HB)",
        "cj_full": "竹木卜口月 (HDYRB)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【月】(B)"
      },
      {
        "char": "醇",
        "codes": [
          "一",
          "木"
        ],
        "keys": [
          "M",
          "D"
        ],
        "full": "一木 (MD)",
        "cj_full": "一田卜口木 (MWYRD)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【木】(D)"
      },
      {
        "char": "東",
        "codes": [
          "木",
          "田"
        ],
        "keys": [
          "D",
          "W"
        ],
        "full": "木田 (DW)",
        "cj_full": "木田 (DW)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【田】(W)"
      },
      {
        "char": "柬",
        "codes": [
          "木",
          "火"
        ],
        "keys": [
          "D",
          "F"
        ],
        "full": "木火 (DF)",
        "cj_full": "木田火 (DWF)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【火】(F)"
      },
      {
        "char": "勝",
        "codes": [
          "月",
          "尸"
        ],
        "keys": [
          "B",
          "S"
        ],
        "full": "月尸 (BS)",
        "cj_full": "月火手尸 (BFQS)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "魑",
        "codes": [
          "竹",
          "月"
        ],
        "keys": [
          "H",
          "B"
        ],
        "full": "竹月 (HB)",
        "cj_full": "竹戈卜山月 (HIYUB)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【月】(B)"
      },
      {
        "char": "裊",
        "codes": [
          "竹",
          "女"
        ],
        "keys": [
          "H",
          "V"
        ],
        "full": "竹女 (HV)",
        "cj_full": "竹日卜女 (HAYV)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【女】(V)"
      },
      {
        "char": "髮",
        "codes": [
          "尸",
          "大"
        ],
        "keys": [
          "S",
          "K"
        ],
        "full": "尸大 (SK)",
        "cj_full": "尸竹戈大大 (SHIKK)",
        "secret": "速成首碼【尸】(S) ＋ 尾碼【大】(K)"
      },
      {
        "char": "雄",
        "codes": [
          "大",
          "土"
        ],
        "keys": [
          "K",
          "G"
        ],
        "full": "大土 (KG)",
        "cj_full": "大戈人土 (KIOG)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【土】(G)"
      },
      {
        "char": "嫌",
        "codes": [
          "女",
          "金"
        ],
        "keys": [
          "V",
          "C"
        ],
        "full": "女金 (VC)",
        "cj_full": "女廿難金 (VTXC)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【金】(C)"
      },
      {
        "char": "嫂",
        "codes": [
          "女",
          "水"
        ],
        "keys": [
          "V",
          "E"
        ],
        "full": "女水 (VE)",
        "cj_full": "女竹難水 (VHXE)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【水】(E)"
      },
      {
        "char": "輸",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十十人一弓 (JJOMN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "賽",
        "codes": [
          "十",
          "金"
        ],
        "keys": [
          "J",
          "C"
        ],
        "full": "十金 (JC)",
        "cj_full": "十廿金金 (JTCC)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【金】(C)"
      },
      {
        "char": "轟",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十十十十十 (JJJJJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "蓮",
        "codes": [
          "廿",
          "十"
        ],
        "keys": [
          "T",
          "J"
        ],
        "full": "廿十 (TJ)",
        "cj_full": "廿卜十十 (TYJJ)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【十】(J)"
      },
      {
        "char": "條",
        "codes": [
          "人",
          "木"
        ],
        "keys": [
          "O",
          "D"
        ],
        "full": "人木 (OD)",
        "cj_full": "人中人木 (OLOD)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【木】(D)"
      },
      {
        "char": "翻",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹田尸一一 (HWSMM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "到",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一土中弓 (MGLN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "別",
        "codes": [
          "口",
          "弓"
        ],
        "keys": [
          "R",
          "N"
        ],
        "full": "口弓 (RN)",
        "cj_full": "口尸中弓 (RSLN)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "候",
        "codes": [
          "人",
          "大"
        ],
        "keys": [
          "O",
          "K"
        ],
        "full": "人大 (OK)",
        "cj_full": "人中弓大 (OLNK)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【大】(K)"
      },
      {
        "char": "哪",
        "codes": [
          "口",
          "中"
        ],
        "keys": [
          "R",
          "L"
        ],
        "full": "口中 (RL)",
        "cj_full": "口尸手中 (RSQL)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【中】(L)"
      },
      {
        "char": "做",
        "codes": [
          "人",
          "大"
        ],
        "keys": [
          "O",
          "K"
        ],
        "full": "人大 (OK)",
        "cj_full": "人十口大 (OJRK)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【大】(K)"
      },
      {
        "char": "假",
        "codes": [
          "人",
          "水"
        ],
        "keys": [
          "O",
          "E"
        ],
        "full": "人水 (OE)",
        "cj_full": "人口卜水 (ORYE)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【水】(E)"
      },
      {
        "char": "條",
        "codes": [
          "人",
          "木"
        ],
        "keys": [
          "O",
          "D"
        ],
        "full": "人木 (OD)",
        "cj_full": "人中人木 (OLOD)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【木】(D)"
      },
      {
        "char": "游",
        "codes": [
          "水",
          "木"
        ],
        "keys": [
          "E",
          "D"
        ],
        "full": "水木 (ED)",
        "cj_full": "水卜尸木 (EYSD)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【木】(D)"
      },
      {
        "char": "跳",
        "codes": [
          "口",
          "人"
        ],
        "keys": [
          "R",
          "O"
        ],
        "full": "口人 (RO)",
        "cj_full": "口一中一人 (RMLMO)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【人】(O)"
      },
      {
        "char": "蝴",
        "codes": [
          "中",
          "月"
        ],
        "keys": [
          "L",
          "B"
        ],
        "full": "中月 (LB)",
        "cj_full": "中戈十口月 (LIJRB)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【月】(B)"
      },
      {
        "char": "樹",
        "codes": [
          "木",
          "戈"
        ],
        "keys": [
          "D",
          "I"
        ],
        "full": "木戈 (DI)",
        "cj_full": "木土廿戈 (DGTI)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "列",
        "codes": [
          "一",
          "弓"
        ],
        "keys": [
          "M",
          "N"
        ],
        "full": "一弓 (MN)",
        "cj_full": "一弓中弓 (MNLN)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "徵",
        "codes": [
          "竹",
          "大"
        ],
        "keys": [
          "H",
          "K"
        ],
        "full": "竹大 (HK)",
        "cj_full": "竹人山土大 (HOUGK)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【大】(K)"
      },
      {
        "char": "制",
        "codes": [
          "竹",
          "弓"
        ],
        "keys": [
          "H",
          "N"
        ],
        "full": "竹弓 (HN)",
        "cj_full": "竹月中弓 (HBLN)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "鄉",
        "codes": [
          "女",
          "中"
        ],
        "keys": [
          "V",
          "L"
        ],
        "full": "女中 (VL)",
        "cj_full": "女竹戈戈中 (VHIIL)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【中】(L)"
      },
      {
        "char": "划",
        "codes": [
          "戈",
          "弓"
        ],
        "keys": [
          "I",
          "N"
        ],
        "full": "戈弓 (IN)",
        "cj_full": "戈中弓 (ILN)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "批",
        "codes": [
          "手",
          "心"
        ],
        "keys": [
          "Q",
          "P"
        ],
        "full": "手心 (QP)",
        "cj_full": "手心心 (QPP)",
        "secret": "速成首碼【手】(Q) ＋ 尾碼【心】(P)"
      },
      {
        "char": "刻",
        "codes": [
          "卜",
          "弓"
        ],
        "keys": [
          "Y",
          "N"
        ],
        "full": "卜弓 (YN)",
        "cj_full": "卜人中弓 (YOLN)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "例",
        "codes": [
          "人",
          "弓"
        ],
        "keys": [
          "O",
          "N"
        ],
        "full": "人弓 (ON)",
        "cj_full": "人一弓弓 (OMNN)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "迎",
        "codes": [
          "卜",
          "中"
        ],
        "keys": [
          "Y",
          "L"
        ],
        "full": "卜中 (YL)",
        "cj_full": "卜竹女中 (YHVL)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【中】(L)"
      }
    ]
  },
  "w5_hw4": {
    "key": "w5_hw4",
    "week": "w5",
    "weekName": "第5周",
    "hwName": "功課4",
    "title": "第5周功課4",
    "dateRange": "28/09/2026 12:00 AM - 04/10/2026 11:30 PM",
    "startDate": "2026-09-28T00:00:00+08:00",
    "endDate": "2026-10-04T23:30:00+08:00",
    "words": [
      {
        "char": "亡",
        "codes": [
          "卜",
          "女"
        ],
        "keys": [
          "Y",
          "V"
        ],
        "full": "卜女 (YV)",
        "cj_full": "卜女 (YV)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【女】(V)"
      },
      {
        "char": "羊",
        "codes": [
          "廿",
          "手"
        ],
        "keys": [
          "T",
          "Q"
        ],
        "full": "廿手 (TQ)",
        "cj_full": "廿手 (TQ)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "牢",
        "codes": [
          "十",
          "手"
        ],
        "keys": [
          "J",
          "Q"
        ],
        "full": "十手 (JQ)",
        "cj_full": "十竹手 (JHQ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【手】(Q)"
      },
      {
        "char": "精",
        "codes": [
          "火",
          "月"
        ],
        "keys": [
          "F",
          "B"
        ],
        "full": "火月 (FB)",
        "cj_full": "火木手一月 (FDQMB)",
        "secret": "速成首碼【火】(F) ＋ 尾碼【月】(B)"
      },
      {
        "char": "彩",
        "codes": [
          "月",
          "竹"
        ],
        "keys": [
          "B",
          "H"
        ],
        "full": "月竹 (BH)",
        "cj_full": "月木竹竹竹 (BDHHH)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "萬",
        "codes": [
          "廿",
          "月"
        ],
        "keys": [
          "T",
          "B"
        ],
        "full": "廿月 (TB)",
        "cj_full": "廿田中月 (TWLB)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【月】(B)"
      },
      {
        "char": "力",
        "codes": [
          "大",
          "尸"
        ],
        "keys": [
          "K",
          "S"
        ],
        "full": "大尸 (KS)",
        "cj_full": "大尸 (KS)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "丈",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十大 (JK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "步",
        "codes": [
          "卜",
          "竹"
        ],
        "keys": [
          "Y",
          "H"
        ],
        "full": "卜竹 (YH)",
        "cj_full": "卜中一竹 (YLMH)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "吏",
        "codes": [
          "十",
          "大"
        ],
        "keys": [
          "J",
          "K"
        ],
        "full": "十大 (JK)",
        "cj_full": "十中大 (JLK)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【大】(K)"
      },
      {
        "char": "民",
        "codes": [
          "口",
          "心"
        ],
        "keys": [
          "R",
          "P"
        ],
        "full": "口心 (RP)",
        "cj_full": "口女心 (RVP)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【心】(P)"
      },
      {
        "char": "巧",
        "codes": [
          "一",
          "尸"
        ],
        "keys": [
          "M",
          "S"
        ],
        "full": "一尸 (MS)",
        "cj_full": "一一女尸 (MMVS)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "功",
        "codes": [
          "一",
          "尸"
        ],
        "keys": [
          "M",
          "S"
        ],
        "full": "一尸 (MS)",
        "cj_full": "一大尸 (MKS)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【尸】(S)"
      },
      {
        "char": "沒",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水弓水 (ENE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "目",
        "codes": [
          "月",
          "山"
        ],
        "keys": [
          "B",
          "U"
        ],
        "full": "月山 (BU)",
        "cj_full": "月山 (BU)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【山】(U)"
      },
      {
        "char": "牙",
        "codes": [
          "一",
          "竹"
        ],
        "keys": [
          "M",
          "H"
        ],
        "full": "一竹 (MH)",
        "cj_full": "一女木竹 (MVDH)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【竹】(H)"
      },
      {
        "char": "孝",
        "codes": [
          "十",
          "木"
        ],
        "keys": [
          "J",
          "D"
        ],
        "full": "十木 (JD)",
        "cj_full": "十大弓木 (JKND)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【木】(D)"
      },
      {
        "char": "泳",
        "codes": [
          "水",
          "水"
        ],
        "keys": [
          "E",
          "E"
        ],
        "full": "水水 (EE)",
        "cj_full": "水戈弓水 (EINE)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【水】(E)"
      },
      {
        "char": "倫",
        "codes": [
          "人",
          "月"
        ],
        "keys": [
          "O",
          "B"
        ],
        "full": "人月 (OB)",
        "cj_full": "人人一月 (OOMB)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【月】(B)"
      },
      {
        "char": "橋",
        "codes": [
          "木",
          "月"
        ],
        "keys": [
          "D",
          "B"
        ],
        "full": "木月 (DB)",
        "cj_full": "木竹大月 (DHKB)",
        "secret": "速成首碼【木】(D) ＋ 尾碼【月】(B)"
      },
      {
        "char": "圖",
        "codes": [
          "田",
          "田"
        ],
        "keys": [
          "W",
          "W"
        ],
        "full": "田田 (WW)",
        "cj_full": "田口卜田 (WRYW)",
        "secret": "速成首碼【田】(W) ＋ 尾碼【田】(W)"
      },
      {
        "char": "滴",
        "codes": [
          "水",
          "月"
        ],
        "keys": [
          "E",
          "B"
        ],
        "full": "水月 (EB)",
        "cj_full": "水卜金月 (EYCB)",
        "secret": "速成首碼【水】(E) ＋ 尾碼【月】(B)"
      },
      {
        "char": "瓶",
        "codes": [
          "廿",
          "弓"
        ],
        "keys": [
          "T",
          "N"
        ],
        "full": "廿弓 (TN)",
        "cj_full": "廿廿一女弓 (TTMVN)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "喝",
        "codes": [
          "口",
          "女"
        ],
        "keys": [
          "R",
          "V"
        ],
        "full": "口女 (RV)",
        "cj_full": "口日心女 (RAPV)",
        "secret": "速成首碼【口】(R) ＋ 尾碼【女】(V)"
      },
      {
        "char": "夠",
        "codes": [
          "弓",
          "口"
        ],
        "keys": [
          "N",
          "R"
        ],
        "full": "弓口 (NR)",
        "cj_full": "弓弓心口 (NNPR)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【口】(R)"
      },
      {
        "char": "齡",
        "codes": [
          "卜",
          "戈"
        ],
        "keys": [
          "Y",
          "I"
        ],
        "full": "卜戈 (YI)",
        "cj_full": "卜山人戈戈 (YUOII)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "痛",
        "codes": [
          "大",
          "月"
        ],
        "keys": [
          "K",
          "B"
        ],
        "full": "大月 (KB)",
        "cj_full": "大弓戈月 (KNIB)",
        "secret": "速成首碼【大】(K) ＋ 尾碼【月】(B)"
      },
      {
        "char": "需",
        "codes": [
          "一",
          "中"
        ],
        "keys": [
          "M",
          "L"
        ],
        "full": "一中 (ML)",
        "cj_full": "一月一月中 (MBMBL)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【中】(L)"
      },
      {
        "char": "敵",
        "codes": [
          "卜",
          "大"
        ],
        "keys": [
          "Y",
          "K"
        ],
        "full": "卜大 (YK)",
        "cj_full": "卜月人大 (YBOK)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【大】(K)"
      },
      {
        "char": "總",
        "codes": [
          "女",
          "心"
        ],
        "keys": [
          "V",
          "P"
        ],
        "full": "女心 (VP)",
        "cj_full": "女火竹田心 (VFHWP)",
        "secret": "速成首碼【女】(V) ＋ 尾碼【心】(P)"
      },
      {
        "char": "為",
        "codes": [
          "戈",
          "火"
        ],
        "keys": [
          "I",
          "F"
        ],
        "full": "戈火 (IF)",
        "cj_full": "戈大弓火 (IKNF)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【火】(F)"
      },
      {
        "char": "真",
        "codes": [
          "十",
          "金"
        ],
        "keys": [
          "J",
          "C"
        ],
        "full": "十金 (JC)",
        "cj_full": "十月一金 (JBMC)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【金】(C)"
      },
      {
        "char": "車",
        "codes": [
          "十",
          "十"
        ],
        "keys": [
          "J",
          "J"
        ],
        "full": "十十 (JJ)",
        "cj_full": "十田十 (JWJ)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【十】(J)"
      },
      {
        "char": "業",
        "codes": [
          "廿",
          "木"
        ],
        "keys": [
          "T",
          "D"
        ],
        "full": "廿木 (TD)",
        "cj_full": "廿金廿木 (TCTD)",
        "secret": "速成首碼【廿】(T) ＋ 尾碼【木】(D)"
      },
      {
        "char": "舟",
        "codes": [
          "竹",
          "戈"
        ],
        "keys": [
          "H",
          "I"
        ],
        "full": "竹戈 (HI)",
        "cj_full": "竹月卜戈 (HBYI)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【戈】(I)"
      },
      {
        "char": "鳥",
        "codes": [
          "竹",
          "火"
        ],
        "keys": [
          "H",
          "F"
        ],
        "full": "竹火 (HF)",
        "cj_full": "竹日卜火 (HAYF)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【火】(F)"
      },
      {
        "char": "央",
        "codes": [
          "中",
          "大"
        ],
        "keys": [
          "L",
          "K"
        ],
        "full": "中大 (LK)",
        "cj_full": "中月大 (LBK)",
        "secret": "速成首碼【中】(L) ＋ 尾碼【大】(K)"
      },
      {
        "char": "雨",
        "codes": [
          "一",
          "卜"
        ],
        "keys": [
          "M",
          "Y"
        ],
        "full": "一卜 (MY)",
        "cj_full": "一中月卜 (MLBY)",
        "secret": "速成首碼【一】(M) ＋ 尾碼【卜】(Y)"
      },
      {
        "char": "卓",
        "codes": [
          "卜",
          "十"
        ],
        "keys": [
          "Y",
          "J"
        ],
        "full": "卜十 (YJ)",
        "cj_full": "卜日十 (YAJ)",
        "secret": "速成首碼【卜】(Y) ＋ 尾碼【十】(J)"
      },
      {
        "char": "允",
        "codes": [
          "戈",
          "山"
        ],
        "keys": [
          "I",
          "U"
        ],
        "full": "戈山 (IU)",
        "cj_full": "戈竹山 (IHU)",
        "secret": "速成首碼【戈】(I) ＋ 尾碼【山】(U)"
      },
      {
        "char": "事",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十中中弓 (JLLN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "妻",
        "codes": [
          "十",
          "女"
        ],
        "keys": [
          "J",
          "V"
        ],
        "full": "十女 (JV)",
        "cj_full": "十中女 (JLV)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【女】(V)"
      },
      {
        "char": "重",
        "codes": [
          "竹",
          "土"
        ],
        "keys": [
          "H",
          "G"
        ],
        "full": "竹土 (HG)",
        "cj_full": "竹十田土 (HJWG)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【土】(G)"
      },
      {
        "char": "予",
        "codes": [
          "弓",
          "弓"
        ],
        "keys": [
          "N",
          "N"
        ],
        "full": "弓弓 (NN)",
        "cj_full": "弓戈弓弓 (NINN)",
        "secret": "速成首碼【弓】(N) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "具",
        "codes": [
          "月",
          "金"
        ],
        "keys": [
          "B",
          "C"
        ],
        "full": "月金 (BC)",
        "cj_full": "月一一金 (BMMC)",
        "secret": "速成首碼【月】(B) ＋ 尾碼【金】(C)"
      },
      {
        "char": "晴",
        "codes": [
          "日",
          "月"
        ],
        "keys": [
          "A",
          "B"
        ],
        "full": "日月 (AB)",
        "cj_full": "日手一月 (AQMB)",
        "secret": "速成首碼【日】(A) ＋ 尾碼【月】(B)"
      },
      {
        "char": "輸",
        "codes": [
          "十",
          "弓"
        ],
        "keys": [
          "J",
          "N"
        ],
        "full": "十弓 (JN)",
        "cj_full": "十十人一弓 (JJOMN)",
        "secret": "速成首碼【十】(J) ＋ 尾碼【弓】(N)"
      },
      {
        "char": "條",
        "codes": [
          "人",
          "木"
        ],
        "keys": [
          "O",
          "D"
        ],
        "full": "人木 (OD)",
        "cj_full": "人中人木 (OLOD)",
        "secret": "速成首碼【人】(O) ＋ 尾碼【木】(D)"
      },
      {
        "char": "翻",
        "codes": [
          "竹",
          "一"
        ],
        "keys": [
          "H",
          "M"
        ],
        "full": "竹一 (HM)",
        "cj_full": "竹田尸一一 (HWSMM)",
        "secret": "速成首碼【竹】(H) ＋ 尾碼【一】(M)"
      },
      {
        "char": "地",
        "codes": [
          "土",
          "木"
        ],
        "keys": [
          "G",
          "D"
        ],
        "full": "土木 (GD)",
        "cj_full": "土心木 (GPD)",
        "secret": "速成首碼【土】(G) ＋ 尾碼【木】(D)"
      }
    ]
  }
};

// 啟動時對全題庫執行自動校驗與鍵位映射歸一化
(function sanitizeAllQuestionBanks() {
  try {
    if (typeof MODE2_WEEKLY_BANKS !== 'undefined') {
      Object.values(MODE2_WEEKLY_BANKS).forEach(b => {
        if (b && Array.isArray(b.words)) {
          b.words.forEach(w => {
            if (typeof autoDeriveWordKeys === 'function') autoDeriveWordKeys(w);
          });
        }
      });
    }
  } catch(e) {
    console.warn('字庫字根映射自動校準提醒:', e);
  }
})();
