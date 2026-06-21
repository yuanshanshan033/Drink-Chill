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
    caption: "Mint, lime and white rum over ice. Fresh, green and quietly cooling."
  },
  {
    name: "长岛冰茶",
    category: "Long Island Iced Tea",
    mood: "citrus / cola / high energy",
    abv: "18%",
    image: "/img/%E9%95%BF%E5%B2%9B%E5%86%B0%E8%8C%B6.png",
    caption: "Clear spirits, lemon and cola in one bright classic. Bold and unmistakably social."
  },
  {
    name: "金汤力",
    category: "Gin Tonic",
    mood: "juniper / bubbles / bitter",
    abv: "12%",
    image: "/img/%E9%87%91%E6%B1%A4%E5%8A%9B.png",
    caption: "Gin, tonic and citrus peel. Dry botanicals with a clean sparkling finish."
  },
  {
    name: "尼格罗尼",
    category: "Negroni",
    mood: "orange peel / herbal / alert",
    abv: "22%",
    image: "/img/Negroni.png",
    caption: "Gin, vermouth and bitter aperitivo. Ruby-toned, structured and quietly dramatic."
  },
  {
    name: "玛格丽特",
    category: "Margarita",
    mood: "tequila / salt / bright sour",
    abv: "15%",
    image: "/img/Margarita.png",
    caption: "Tequila, lime and orange liqueur. Sharp, coastal and bright with a salt edge."
  },
  {
    name: "威士忌酸",
    category: "Whisky Sour",
    mood: "lemon / oak / mellow",
    abv: "16%",
    image: "/img/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%B8.png",
    caption: "Whisky, lemon and soft sweetness. Oak depth with a bright sour line."
  },
  {
    name: "阿佩罗 Spritz",
    category: "Aperol Spritz",
    mood: "orange / low abv / sunset",
    abv: "8%",
    image: "/img/Aperol%20Spritz.png",
    caption: "Orange aperitivo, prosecco and soda. Low-pressure and golden-hour friendly."
  },
  {
    name: "梅子 Highball",
    category: "Umeshu Highball",
    mood: "plum / soda / gentle sweet",
    abv: "7%",
    image: "/img/Umeshu%20Highball.png",
    caption: "Umeshu lifted with soda. Soft plum notes for an unhurried mood."
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
              className="relative w-[min(980px,calc(100vw-2rem))] overflow-hidden bg-white shadow-[0_30px_100px_rgba(13,17,23,0.22)]"
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
              <img
                src={expandedDrink.image}
                alt={expandedDrink.name}
                className="max-h-[68vh] w-full object-cover"
                draggable={false}
              />
              <div className="grid gap-4 p-5 sm:grid-cols-[1fr_2fr] sm:p-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">
                    {expandedDrink.name}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-ink">{expandedDrink.category}</h2>
                </div>
                <div className="text-sm font-semibold leading-7 text-slate-600">
                  <p>{expandedDrink.caption}</p>
                  <p className="mt-3 uppercase tracking-[0.16em] text-slate-400">
                    {expandedDrink.mood} / {expandedDrink.abv}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
