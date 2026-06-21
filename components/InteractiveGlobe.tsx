"use client";

import { type CSSProperties, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, X } from "lucide-react";

type CocktailSlide = {
  name: string;
  category: string;
  mood: string;
  abv: string;
  image: string;
  caption: string;
  ingredients: string[];
  steps: string[];
  taste: string;
  quote: string;
};

type CollageItem = {
  slideIndex: number;
  imageStyle: CSSProperties;
  textStyle: CSSProperties;
  imageZ: number;
  textZ?: number;
  align?: "left" | "right";
  arrow?: "down" | "left" | "right" | "up";
  objectPosition?: string;
};

const cocktailSlides: CocktailSlide[] = [
  {
    name: "莫吉托",
    category: "Mojito",
    mood: "mint / lime / fresh rum",
    abv: "10%",
    image: "/img/%E8%8E%AB%E5%90%89%E6%89%98.png",
    caption: "Mint, lime and white rum over ice. Fresh, green and quietly cooling.",
    ingredients: ["白朗姆 45ml", "青柠汁 20ml", "细砂糖或糖浆 15ml", "薄荷叶 8-10片", "苏打水 适量", "碎冰"],
    steps: ["薄荷叶、青柠汁和糖浆在杯底轻压出香气。", "加入白朗姆和碎冰，轻轻搅拌。", "补入苏打水，用薄荷枝和青柠片装饰。"],
    taste: "清凉、明亮、带一点草本气息，酸甜平衡，酒精感被气泡和薄荷柔化。",
    quote: "像把夏夜折进杯中，第一口是风，第二口才是微醺。"
  },
  {
    name: "长岛冰茶",
    category: "Long Island Iced Tea",
    mood: "citrus / cola / high energy",
    abv: "18%",
    image: "/img/%E9%95%BF%E5%B2%9B%E5%86%B0%E8%8C%B6.png",
    caption: "Clear spirits, lemon and cola in one bright classic. Bold and unmistakably social.",
    ingredients: ["伏特加 15ml", "金酒 15ml", "白朗姆 15ml", "龙舌兰 15ml", "橙味利口酒 15ml", "柠檬汁 25ml", "可乐 适量"],
    steps: ["除可乐外的材料加入摇壶，与冰块快速摇匀。", "过滤入装满冰块的高杯。", "补入可乐，轻搅后用柠檬片装饰。"],
    taste: "入口像柠檬红茶，随后出现清晰酒体和可乐甜感，强度高但层次直接。",
    quote: "热闹的人群里，它总像一句不需要解释的开场白。"
  },
  {
    name: "金汤力",
    category: "Gin Tonic",
    mood: "juniper / bubbles / bitter",
    abv: "12%",
    image: "/img/%E9%87%91%E6%B1%A4%E5%8A%9B.png",
    caption: "Gin, tonic and citrus peel. Dry botanicals with a clean sparkling finish.",
    ingredients: ["金酒 45ml", "汤力水 120ml", "青柠角或柠檬皮", "大冰块"],
    steps: ["杯中装满大冰块，倒入金酒。", "沿杯壁缓慢加入冰镇汤力水。", "轻轻提拉混合，用柑橘皮释放香气。"],
    taste: "杜松子和柑橘清晰，气泡干净，尾段带微苦，是利落克制的清爽感。",
    quote: "它不急着讨好谁，只把夜晚修剪得干净一点。"
  },
  {
    name: "尼格罗尼",
    category: "Negroni",
    mood: "orange peel / herbal / alert",
    abv: "22%",
    image: "/img/Negroni.png",
    caption: "Gin, vermouth and bitter aperitivo. Ruby-toned, structured and quietly dramatic.",
    ingredients: ["金酒 30ml", "甜味美思 30ml", "金巴利 30ml", "橙皮", "大冰块"],
    steps: ["调酒杯中加入三种酒和冰块。", "搅拌至杯壁冰冷。", "过滤入加大冰块的古典杯，挤橙皮油装饰。"],
    taste: "苦甜、草本、橙皮香明显，结构紧致，入口沉稳，余味悠长。",
    quote: "像一封红色信笺，慢慢拆开才读到真正的锋利。"
  },
  {
    name: "玛格丽特",
    category: "Margarita",
    mood: "tequila / salt / bright sour",
    abv: "15%",
    image: "/img/Margarita.png",
    caption: "Tequila, lime and orange liqueur. Sharp, coastal and bright with a salt edge.",
    ingredients: ["龙舌兰 45ml", "橙味利口酒 20ml", "青柠汁 25ml", "盐边", "冰块"],
    steps: ["杯口抹青柠后蘸盐。", "材料加入摇壶，与冰块摇至冰冷。", "过滤入杯，用青柠片装饰。"],
    taste: "酸感鲜明，龙舌兰带来植物和矿物气息，盐边让甜酸更有轮廓。",
    quote: "像海边的一道白光，明亮、锋利，又让人忍不住靠近。"
  },
  {
    name: "威士忌酸",
    category: "Whisky Sour",
    mood: "lemon / oak / mellow",
    abv: "16%",
    image: "/img/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%B8.png",
    caption: "Whisky, lemon and soft sweetness. Oak depth with a bright sour line.",
    ingredients: ["波本或调和威士忌 50ml", "柠檬汁 25ml", "糖浆 20ml", "蛋白 15ml 可选", "冰块"],
    steps: ["材料加入摇壶，若使用蛋白先无冰干摇。", "加入冰块后再次摇至外壁结霜。", "过滤入杯，用柠檬皮或酒浸樱桃装饰。"],
    taste: "柠檬酸度明亮，威士忌带来橡木和焦糖底色，口感圆润但不沉重。",
    quote: "它像一天结束后的标点，把疲惫收住，也把心放松。"
  },
  {
    name: "阿佩罗 Spritz",
    category: "Aperol Spritz",
    mood: "orange / low abv / sunset",
    abv: "8%",
    image: "/img/Aperol%20Spritz.png",
    caption: "Orange aperitivo, prosecco and soda. Low-pressure and golden-hour friendly.",
    ingredients: ["阿佩罗 60ml", "普罗塞克 90ml", "苏打水 30ml", "橙片", "冰块"],
    steps: ["酒杯装满冰块。", "依次加入普罗塞克、阿佩罗和苏打水。", "轻搅一次，用橙片装饰。"],
    taste: "橙香、微苦、轻甜，气泡感轻快，酒精度低，适合慢慢喝。",
    quote: "黄昏落进杯沿时，它负责把时间调慢一点。"
  },
  {
    name: "梅子 Highball",
    category: "Umeshu Highball",
    mood: "plum / soda / gentle sweet",
    abv: "7%",
    image: "/img/Umeshu%20Highball.png",
    caption: "Umeshu lifted with soda. Soft plum notes for an unhurried mood.",
    ingredients: ["梅酒 60ml", "苏打水 120ml", "柠檬片", "大冰块"],
    steps: ["高球杯中加入大冰块。", "倒入梅酒，再沿杯壁补入苏打水。", "轻轻提拉混合，用柠檬片装饰。"],
    taste: "梅子香柔和，酸甜圆润，气泡让整体更轻盈，适合低压力微醺。",
    quote: "像把没说出口的温柔，交给一颗梅子慢慢化开。"
  }
];

const collageItems: CollageItem[] = [
  {
    slideIndex: 5,
    imageStyle: { right: "calc(50% + 277px)", bottom: "calc(50% - 131px)", width: "92px", height: "92px" },
    textStyle: { right: "calc(50% + 277px + 92px + 10px)", top: "calc(50% + 131px - 92px)", width: "12%" },
    imageZ: 18,
    textZ: 21,
    align: "right",
    arrow: "right",
    objectPosition: "44% 50%"
  },
  {
    slideIndex: 4,
    imageStyle: { right: "calc(50% + 277px)", top: "calc(50% - 131px)", width: "160px", height: "160px" },
    textStyle: { right: "calc(50% + 277px + 160px + 10px)", top: "calc(50% - 131px)", width: "12%" },
    imageZ: 24,
    textZ: 26,
    align: "right",
    arrow: "right",
    objectPosition: "50% 48%"
  },
  {
    slideIndex: 3,
    imageStyle: { left: "calc(50% + 5px)", bottom: "calc(50% + 141px)", width: "160px", height: "160px" },
    textStyle: { left: "calc(50% + 175px)", bottom: "calc(50% + 141px)", width: "11%" },
    imageZ: 16,
    textZ: 20,
    align: "left",
    arrow: "left",
    objectPosition: "50% 54%"
  },
  {
    slideIndex: 0,
    imageStyle: { left: "calc(50% - 267px)", top: "calc(50% - 131px)", width: "262px", height: "262px" },
    textStyle: { left: "calc(50% - 267px)", top: "13%", width: "10.5%" },
    imageZ: 40,
    textZ: 41,
    align: "left",
    arrow: "down",
    objectPosition: "49% 56%"
  },
  {
    slideIndex: 1,
    imageStyle: { left: "calc(50% + 5px)", top: "calc(50% - 131px)", width: "262px", height: "262px" },
    textStyle: { left: "calc(50% + 5px)", top: "calc(50% + 141px)", width: "17%" },
    imageZ: 39,
    textZ: 40,
    align: "left",
    arrow: "down",
    objectPosition: "52% 50%"
  },
  {
    slideIndex: 6,
    imageStyle: { left: "calc(50% + 277px)", top: "calc(50% - 131px)", width: "92px", height: "92px" },
    textStyle: { left: "calc(50% + 379px)", top: "calc(50% - 131px)", width: "20%" },
    imageZ: 19,
    textZ: 23,
    align: "left",
    arrow: "left",
    objectPosition: "50% 52%"
  },
  {
    slideIndex: 2,
    imageStyle: { left: "calc(50% + 277px)", bottom: "calc(50% - 131px)", width: "160px", height: "160px" },
    textStyle: { left: "calc(50% + 447px)", top: "calc(50% + 131px - 160px)", width: "10%" },
    imageZ: 27,
    textZ: 30,
    align: "left",
    arrow: "left",
    objectPosition: "50% 52%"
  },
  {
    slideIndex: 7,
    imageStyle: { right: "calc(50% + 5px)", top: "calc(50% + 141px)", width: "120px", height: "120px" },
    textStyle: { right: "calc(50% + 135px)", top: "calc(50% + 141px)", width: "12%" },
    imageZ: 14,
    textZ: 24,
    align: "right",
    arrow: "right",
    objectPosition: "50% 50%"
  }
];

const arrowIcons = {
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight,
  up: ChevronUp
};

export function InteractiveGlobe() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const expandedDrink = expandedIndex === null ? null : cocktailSlides[expandedIndex];

  return (
    <div className="relative h-full min-h-[680px] w-full overflow-hidden bg-white">
      <div className="absolute inset-0 left-1/2 w-[min(1280px,100%)] -translate-x-1/2">
        {collageItems.map((item) => {
          const drink = cocktailSlides[item.slideIndex];

          return (
            <motion.button
              type="button"
              key={drink.category}
              onClick={() => setExpandedIndex(item.slideIndex)}
              data-collage-image={drink.category}
              className="absolute overflow-hidden bg-slate-100 text-left shadow-[0_18px_48px_rgba(13,17,23,0.13)] outline-none transition-shadow hover:shadow-[0_26px_70px_rgba(13,17,23,0.18)]"
              style={{ ...item.imageStyle, zIndex: item.imageZ }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              aria-label={`放大查看${drink.name}`}
              aria-haspopup="dialog"
            >
              <img
                src={drink.image}
                alt={drink.name}
                className="h-full w-full object-cover"
                style={{ objectPosition: item.objectPosition }}
                draggable={false}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/70" />
              <div className="absolute left-3 top-3 rounded-full bg-white/78 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-ink backdrop-blur">
                {drink.abv}
              </div>
            </motion.button>
          );
        })}

        {collageItems.map((item) => {
          const drink = cocktailSlides[item.slideIndex];
          const ArrowIcon = item.arrow ? arrowIcons[item.arrow] : null;

          return (
            <motion.article
              key={`${drink.category}-text`}
              data-collage-text={drink.category}
              className={`absolute text-[10px] font-bold leading-[1.45] text-ink/68 sm:text-[11px] ${item.align === "right" ? "text-right" : "text-left"
                }`}
              style={{ ...item.textStyle, zIndex: item.textZ ?? item.imageZ + 1 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: item.slideIndex * 0.04 }}
            >
              {ArrowIcon ? (
                <ArrowIcon
                  className={`mb-1 inline h-4 w-4 text-ink ${item.align === "right" ? "ml-auto" : ""
                    }`}
                />
              ) : null}
              <h2 className="text-base font-black leading-tight text-ink sm:text-lg">
                {drink.category}
              </h2>
              <p className="mt-2">{drink.caption}</p>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {expandedDrink ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-white/82 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${expandedDrink.name} 详情`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className="relative max-h-[88vh] w-[min(1040px,calc(100vw-2rem))] overflow-hidden bg-white shadow-[0_30px_100px_rgba(13,17,23,0.22)]"
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpandedIndex(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/88 text-ink shadow-sm backdrop-blur transition hover:bg-ink hover:text-white"
                aria-label="关闭放大图片"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="grid max-h-[88vh] overflow-y-auto lg:grid-cols-[330px_1fr]">
                <aside className="border-b border-slate-200 bg-slate-50 p-5 lg:border-b-0 lg:border-r lg:p-6">
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 shadow-[0_18px_42px_rgba(13,17,23,0.12)]">
                    <img
                      src={expandedDrink.image}
                      alt={expandedDrink.name}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/70" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-black text-ink">
                    <div className="border border-slate-200 bg-white p-3">
                      <p className="uppercase tracking-[0.18em] text-slate-400">ABV</p>
                      <p className="mt-1 text-lg">{expandedDrink.abv}</p>
                    </div>
                    <div className="border border-slate-200 bg-white p-3">
                      <p className="uppercase tracking-[0.18em] text-slate-400">Mood</p>
                      <p className="mt-1 text-[11px] leading-5 text-slate-600">{expandedDrink.mood}</p>
                    </div>
                  </div>
                </aside>

                <section className="p-6 pr-14 sm:p-8 sm:pr-16">
                  <h2 className="mt-3 text-4xl font-black leading-none text-ink">
                    {expandedDrink.name}
                  </h2>
                  <p
                    className="mt-2 text-3xl leading-none text-sky-600"
                    style={{ fontFamily: "'Snell Roundhand', 'Brush Script MT', cursive" }}
                  >
                    {expandedDrink.category}
                  </p>

                  <blockquote className="mt-6 border-l-4 border-sky-300 bg-sky-50 px-5 py-4 text-base font-bold leading-8 text-ink">
                    {expandedDrink.quote}
                    <p className="mt-2 text-[11px] font-black uppercase tracking-[0.18em] text-sky-500">
                      A line for this drink
                    </p>
                  </blockquote>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <article className="border border-slate-200 p-4">
                      <h3 className="text-sm font-black text-ink">配料</h3>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Ingredients
                      </p>
                      <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-600">
                        {expandedDrink.ingredients.map((ingredient) => (
                          <li key={ingredient}>· {ingredient}</li>
                        ))}
                      </ul>
                    </article>

                    <article className="border border-slate-200 p-4">
                      <h3 className="text-sm font-black text-ink">口感</h3>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Flavor
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                        {expandedDrink.taste}
                      </p>
                    </article>

                    <article className="border border-slate-200 p-4">
                      <h3 className="text-sm font-black text-ink">做法</h3>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Method
                      </p>
                      <ol className="mt-3 space-y-2 text-sm font-semibold leading-6 text-slate-600">
                        {expandedDrink.steps.map((step, index) => (
                          <li key={step}>
                            <span className="mr-2 font-black text-sky-600">{index + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </article>

                    <article className="border border-slate-200 p-4">
                      <h3 className="text-sm font-black text-ink">度数</h3>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                        Alcohol
                      </p>
                      <p className="mt-3 text-3xl font-black text-ink">{expandedDrink.abv}</p>
                      <p className="mt-3 text-sm font-semibold leading-7 text-slate-600">
                        建议慢饮，先感受香气和酸甜层次，再决定下一杯。
                      </p>
                    </article>
                  </div>

                  <p className="mt-6 text-sm font-semibold leading-7 text-slate-500">
                    {expandedDrink.caption}
                  </p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
