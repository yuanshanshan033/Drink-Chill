export type CountryCode = "CN" | "JP" | "KR" | "GB" | "FR" | "DE";

export type CountryDrink = {
  name: string;
  category: string;
  abv: string;
  flavor: string;
  story: string;
  products: string[];
};

export type CountryProfile = {
  code: CountryCode;
  name: string;
  localName: string;
  coordinates: [number, number];
  mapPosition: {
    x: number;
    y: number;
  };
  image: string;
  summary: string;
  drinks: CountryDrink[];
};

export type DrinkRecommendation = {
  id: string;
  name: string;
  category: string;
  country: string;
  abv: string;
  flavor: string;
  season: string;
  isNew: boolean;
  moodTags: string[];
  ingredients: string[];
  steps: string[];
  note: string;
};

export type Inspiration = {
  id: number;
  title: string;
  note: string;
  moodTags: string[];
  imageUrl: string;
  recipeBackup: string;
  createdAt: string;
  updatedAt: string;
};
