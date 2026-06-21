import type { CountryProfile } from "@/lib/types";

export const countries: CountryProfile[] = [
  {
    code: "CN",
    name: "中国",
    localName: "China",
    coordinates: [104.1954, 35.8617],
    mapPosition: { x: 69, y: 43 },
    image:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    summary:
      "以粮谷发酵与曲药工艺见长，酒文化常与宴席、节气和地方风土绑定。",
    drinks: [
      {
        name: "白酒",
        category: "蒸馏酒",
        abv: "38-53%",
        flavor: "浓香、酱香、清香等多风格",
        story:
          "以高粱、小麦等粮谷为核心，借助酒曲发酵和蒸馏形成复杂香气，是中国餐桌上最具代表性的烈酒。",
        products: ["汾酒 青花", "泸州老窖 特曲", "茅台王子酒"]
      },
      {
        name: "黄酒",
        category: "酿造酒",
        abv: "12-18%",
        flavor: "米香、焦糖、坚果感",
        story:
          "以稻米和麦曲酿造，温饮和入菜都常见，适合慢节奏的夜晚与家常菜搭配。",
        products: ["古越龙山", "会稽山", "女儿红"]
      }
    ]
  },
  {
    code: "JP",
    name: "日本",
    localName: "Japan",
    coordinates: [138.2529, 36.2048],
    mapPosition: { x: 78, y: 42 },
    image:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=1200&q=80",
    summary:
      "米、水、酵母和精细控温构成清酒风格，也发展出烧酎、梅酒与日式威士忌。",
    drinks: [
      {
        name: "清酒",
        category: "酿造酒",
        abv: "13-16%",
        flavor: "米香、梨、白花、旨味",
        story:
          "通过米曲把淀粉糖化，再与酵母并行发酵。精米步合和酵母选择决定了吟酿香与米旨味。",
        products: ["獭祭 纯米大吟酿", "久保田 千寿", "八海山"]
      },
      {
        name: "梅酒",
        category: "利口酒",
        abv: "8-14%",
        flavor: "酸甜、杏仁、熟果",
        story:
          "青梅、糖和基酒浸泡而成，冰饮、苏打或热饮都友好，是入门者很容易喜欢的风味。",
        products: ["Choya 梅酒", "山崎蒸溜所梅酒", "白鹤梅酒"]
      }
    ]
  },
  {
    code: "KR",
    name: "韩国",
    localName: "Korea",
    coordinates: [127.7669, 35.9078],
    mapPosition: { x: 75, y: 42 },
    image:
      "https://images.unsplash.com/photo-1538485399081-7c8ed0c21c7e?auto=format&fit=crop&w=1200&q=80",
    summary:
      "低度、清爽、易搭餐是韩国酒类的重要体验，烧酒和马格利最具辨识度。",
    drinks: [
      {
        name: "烧酒",
        category: "蒸馏酒",
        abv: "12-21%",
        flavor: "清爽、微甜、干净",
        story:
          "现代烧酒常以中低度和清爽口感进入聚餐场景，水果风味款也让年轻消费者更容易入门。",
        products: ["真露 Fresh", "初饮初乐", "好天好饮 桃子烧酒"]
      },
      {
        name: "马格利",
        category: "米酒",
        abv: "5-8%",
        flavor: "米乳、微酸、轻气泡",
        story:
          "米发酵后不过度过滤，保留柔和米香和乳白质感，适合搭配煎饼、炸物与辣味料理。",
        products: ["长寿马格利", "Kooksoondang", "Boksoondoga"]
      }
    ]
  },
  {
    code: "GB",
    name: "英国",
    localName: "United Kingdom",
    coordinates: [-3.436, 55.3781],
    mapPosition: { x: 45, y: 35 },
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
    summary:
      "从金酒到苏格兰威士忌，英国酒类的草本、泥煤和桶陈风味都很鲜明。",
    drinks: [
      {
        name: "金酒",
        category: "蒸馏酒",
        abv: "37.5-47%",
        flavor: "杜松子、柑橘、草本",
        story:
          "以杜松子为核心香气，伦敦干金风格干净利落，是经典鸡尾酒和高球调饮的重要基酒。",
        products: ["Tanqueray", "Bombay Sapphire", "Hendrick's"]
      },
      {
        name: "苏格兰威士忌",
        category: "蒸馏酒",
        abv: "40-46%",
        flavor: "麦芽、蜂蜜、烟熏、海盐",
        story:
          "麦芽发酵蒸馏后经橡木桶陈年，不同产区带来从花果到泥煤烟熏的宽广光谱。",
        products: ["Glenfiddich 12", "The Macallan 12", "Laphroaig 10"]
      }
    ]
  },
  {
    code: "FR",
    name: "法国",
    localName: "France",
    coordinates: [2.2137, 46.2276],
    mapPosition: { x: 48, y: 42 },
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    summary:
      "葡萄种植、风土表达和传统产区制度让法国成为葡萄酒与白兰地的重要起源地。",
    drinks: [
      {
        name: "干邑",
        category: "白兰地",
        abv: "40%",
        flavor: "葡萄干、橡木、香草、烘烤",
        story:
          "以特定产区葡萄酒蒸馏并橡木桶陈年，时间带来干果、香料与木质层次。",
        products: ["Hennessy VSOP", "Rémy Martin 1738", "Martell Cordon Bleu"]
      },
      {
        name: "香槟",
        category: "起泡酒",
        abv: "12-13%",
        flavor: "青苹果、酵母、矿物、气泡",
        story:
          "传统瓶中二次发酵带来细密气泡，庆祝感强，但也适合搭配炸物和海鲜。",
        products: ["Moët & Chandon", "Veuve Clicquot", "Perrier-Jouët"]
      }
    ]
  },
  {
    code: "DE",
    name: "德国",
    localName: "Germany",
    coordinates: [10.4515, 51.1657],
    mapPosition: { x: 51, y: 38 },
    image:
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80",
    summary:
      "德国酒类兼具精确酿造与餐酒文化，啤酒、雷司令和草本利口酒都很有代表性。",
    drinks: [
      {
        name: "雷司令",
        category: "葡萄酒",
        abv: "8-12.5%",
        flavor: "青柠、白桃、矿物、蜂蜜",
        story:
          "冷凉产区让酸度和香气保持锐利，从干型到甜型跨度大，适合搭配辛辣和油脂感食物。",
        products: ["Dr. Loosen", "Schloss Johannisberg", "Egon Müller"]
      },
      {
        name: "草本利口酒",
        category: "利口酒",
        abv: "30-38%",
        flavor: "草药、香料、苦甜",
        story:
          "多种草本浸泡调配，冰镇纯饮或加入高球，常用来给夜晚增加一点清醒的苦香。",
        products: ["Jägermeister", "Underberg", "Killepitsch"]
      }
    ]
  }
];

export function getCountryByCode(code: string) {
  return countries.find((country) => country.code === code);
}
