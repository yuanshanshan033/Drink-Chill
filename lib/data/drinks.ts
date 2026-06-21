import type { DrinkRecommendation } from "@/lib/types";

export const drinks: DrinkRecommendation[] = [
  {
    id: "mizu-spritz",
    name: "白桃米香 Spritz",
    category: "低度调饮",
    country: "日本",
    abv: "约 7%",
    flavor: "白桃、米香、轻气泡",
    season: "夏季",
    isNew: true,
    moodTags: ["放松", "清爽", "低度", "治愈"],
    ingredients: ["清酒 60ml", "白桃果泥 30ml", "苏打水 90ml", "柠檬汁 10ml", "冰块"],
    steps: [
      "杯中加入冰块、清酒、白桃果泥和柠檬汁。",
      "轻轻搅匀后补满苏打水。",
      "用白桃片或柠檬皮装饰，保持气泡感。"
    ],
    note: "适合下班后想轻一点、甜一点，但不想太腻的状态。"
  },
  {
    id: "qingmei-highball",
    name: "青梅威士忌 Highball",
    category: "Highball",
    country: "英国 / 日本",
    abv: "约 9%",
    flavor: "青梅、麦芽、柑橘",
    season: "春夏",
    isNew: true,
    moodTags: ["清爽", "微醺", "酸感", "专注"],
    ingredients: ["威士忌 45ml", "青梅糖浆 15ml", "苏打水 120ml", "柠檬角", "大冰块"],
    steps: [
      "高球杯装满大冰块，倒入威士忌和青梅糖浆。",
      "沿杯壁加入冰镇苏打水。",
      "轻搅两圈，挤入柠檬角。"
    ],
    note: "酸甜清爽，适合需要把脑子从工作模式切出来的时候。"
  },
  {
    id: "seoul-yuzu-soju",
    name: "柚子烧酒 Fizz",
    category: "低度调饮",
    country: "韩国",
    abv: "约 6%",
    flavor: "柚子、蜂蜜、轻甜",
    season: "四季",
    isNew: false,
    moodTags: ["低度", "甜感", "聚会", "轻松"],
    ingredients: ["烧酒 50ml", "柚子茶 25ml", "气泡水 120ml", "薄荷", "冰块"],
    steps: [
      "把柚子茶和少量气泡水在杯底化开。",
      "加入冰块和烧酒。",
      "补气泡水并用薄荷拍香。"
    ],
    note: "入口友好，适合不想喝烈但想有一点聚会感。"
  },
  {
    id: "cognac-pear-sour",
    name: "梨香干邑 Sour",
    category: "Sour",
    country: "法国",
    abv: "约 14%",
    flavor: "梨、橡木、柠檬、柔和酸",
    season: "秋季",
    isNew: true,
    moodTags: ["治愈", "酸感", "庆祝", "成熟"],
    ingredients: ["干邑 45ml", "梨汁 35ml", "柠檬汁 20ml", "蜂蜜水 15ml", "蛋白或消泡剂可选"],
    steps: [
      "所有材料加入摇壶，先无冰干摇。",
      "加入冰块后再次摇至外壁结霜。",
      "过滤入杯，用梨片或肉桂粉点缀。"
    ],
    note: "像把庆祝感调低音量，适合完成一件难事后的夜晚。"
  },
  {
    id: "riesling-cooler",
    name: "雷司令 Cooldown",
    category: "葡萄酒调饮",
    country: "德国",
    abv: "约 8%",
    flavor: "青柠、白桃、矿物、轻甜",
    season: "夏季",
    isNew: false,
    moodTags: ["清爽", "低度", "酸感", "放松"],
    ingredients: ["半干雷司令 90ml", "青柠汁 10ml", "苏打水 60ml", "黄瓜片", "冰块"],
    steps: [
      "杯中加入冰块、黄瓜片和青柠汁。",
      "倒入雷司令并轻搅。",
      "补入苏打水，保持酒体清亮。"
    ],
    note: "酸度漂亮，适合搭配外卖里的辣味和炸物。"
  },
  {
    id: "baijiu-lychee-tonic",
    name: "荔枝白酒 Tonic",
    category: "中式 Highball",
    country: "中国",
    abv: "约 10%",
    flavor: "荔枝、花香、微苦气泡",
    season: "夏季",
    isNew: true,
    moodTags: ["清爽", "花果", "惊喜", "微醺"],
    ingredients: ["清香型白酒 30ml", "荔枝汁 45ml", "汤力水 100ml", "青柠汁 8ml", "冰块"],
    steps: [
      "杯中装满冰块，加入白酒、荔枝汁和青柠汁。",
      "补入汤力水。",
      "轻搅后用荔枝或青柠片装饰。"
    ],
    note: "让白酒更轻盈，适合想尝试中国风味但不想被酒精感压住。"
  },
  {
    id: "gin-garden-zero",
    name: "花园金酒 Tonic",
    category: "经典调饮",
    country: "英国",
    abv: "约 12%",
    flavor: "杜松子、黄瓜、草本、微苦",
    season: "春季",
    isNew: false,
    moodTags: ["清爽", "专注", "微苦", "低糖"],
    ingredients: ["金酒 45ml", "汤力水 120ml", "黄瓜条", "迷迭香", "冰块"],
    steps: [
      "杯中加入大冰块，倒入金酒。",
      "加入黄瓜条和轻拍后的迷迭香。",
      "补入汤力水，轻轻提拉混合。"
    ],
    note: "干净利落，适合想要一点仪式感但不想太甜。"
  },
  {
    id: "makgeolli-berry",
    name: "莓果马格利 Shake",
    category: "米酒特调",
    country: "韩国",
    abv: "约 5%",
    flavor: "草莓、米乳、轻酸",
    season: "春季",
    isNew: false,
    moodTags: ["甜感", "低度", "治愈", "柔和"],
    ingredients: ["马格利 120ml", "草莓果酱 20ml", "柠檬汁 8ml", "冰块"],
    steps: [
      "果酱和柠檬汁先在摇壶中搅开。",
      "加入马格利和冰块轻摇，不要过度。",
      "倒入矮杯，保留米酒的乳白质感。"
    ],
    note: "柔软、甜酸、没有压迫感，适合情绪需要被照顾的晚上。"
  }
];

export const moodPresets = [
  "放松",
  "清爽",
  "低度",
  "微醺",
  "治愈",
  "酸感",
  "甜感",
  "庆祝",
  "专注",
  "低糖"
];

export const categoryFacets = {
  ingredients: [
    "谷物：白酒、威士忌、烧酒、马格利",
    "葡萄：干邑、香槟、雷司令",
    "米：清酒、黄酒、梅酒",
    "草本：金酒、草本利口酒",
    "水果：青梅、荔枝、白桃、柚子"
  ],
  flavors: [
    "清爽：苏打、高球、雷司令",
    "甜感：梅酒、莓果马格利、柚子烧酒",
    "微苦：金汤力、草本利口酒",
    "烟熏：苏格兰威士忌",
    "酸感：Sour、青梅、柠檬"
  ],
  abv: [
    "低度 3-8%：马格利调饮、Spritz、葡萄酒 Cooler",
    "中度 9-15%：Highball、Sour、金汤力",
    "高度 16%+：白酒、威士忌、干邑、金酒纯饮"
  ]
};
