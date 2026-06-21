import { drinks, moodPresets } from "@/lib/data/drinks";

type RecommendInput = {
  moodText: string;
  tags: string[];
};

const moodDictionary: Record<string, string[]> = {
  放松: ["放松", "累", "下班", "松弛", "休息", "躺", "慢"],
  清爽: ["清爽", "冰", "气泡", "不腻", "夏", "热", "醒"],
  低度: ["低度", "少喝", "轻", "明天", "不醉", "低酒精"],
  微醺: ["微醺", "一点", "刚好", "轻微"],
  治愈: ["治愈", "难过", "压力", "烦", "温柔", "安慰"],
  酸感: ["酸", "柠檬", "青梅", "开胃"],
  甜感: ["甜", "水果", "桃", "莓", "蜂蜜", "可爱"],
  庆祝: ["庆祝", "完成", "升职", "生日", "纪念", "开心"],
  专注: ["专注", "清醒", "收尾", "工作", "效率"],
  低糖: ["低糖", "控糖", "不甜", "干净"]
};

export function inferMoodTags(moodText: string, selectedTags: string[]) {
  const normalized = moodText.trim().toLowerCase();
  const inferred = new Set(
    selectedTags.filter((tag) => moodPresets.includes(tag))
  );

  for (const [tag, keywords] of Object.entries(moodDictionary)) {
    if (keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))) {
      inferred.add(tag);
    }
  }

  if (!inferred.size && normalized) {
    inferred.add("放松");
    inferred.add("微醺");
  }

  return Array.from(inferred);
}

export function recommendDrinks(input: RecommendInput) {
  const detectedTags = inferMoodTags(input.moodText, input.tags);
  const scored = drinks
    .map((drink) => {
      const score = detectedTags.reduce(
        (total, tag) => total + (drink.moodTags.includes(tag) ? 2 : 0),
        drink.isNew ? 1 : 0
      );
      return { drink, score };
    })
    .sort((a, b) => b.score - a.score || Number(b.drink.isNew) - Number(a.drink.isNew));

  const recommendations = scored
    .filter((item) => item.score > 0 || !detectedTags.length)
    .slice(0, 4)
    .map((item) => item.drink);

  return {
    detectedTags,
    recommendations: recommendations.length ? recommendations : drinks.slice(0, 4),
    generatedAt: new Date().toISOString()
  };
}
