export type ProductNutrition = {
  protein: number; // г
  fats: number;    // г
  carbs: number;   // г
  kcal: number;    // ккал
  note?: string;   // например: "* на 100 г продукта"
};

export type ProductFacts = {
  shelfLife?: string;   // "15 дней"
  packCount?: string;   // "15 шт"
  netWeight?: string;   // "290 g" или "400 g"
};

export type Product = {
  slug: string;
  name: string;
  description: string; // короткое описание (для карточки/подзаголовка)
  category: string;
  images: string[];

  // NEW (для красивой страницы товара)
  nutrition?: ProductNutrition;
  facts?: ProductFacts;
  ingredients?: string; // состав (длинный текст)

  // Оставляем старое поле, если где-то уже используется:
  // можно постепенно убрать позже
  legacyNutrition?: Record<string, string>;
};

export type RecipeFrontmatter = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
};

export type Recipe = RecipeFrontmatter & {
  content: string;
};