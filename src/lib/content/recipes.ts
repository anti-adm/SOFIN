import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { type AppLocale } from "../i18n/locales";
import { type Recipe, type RecipeFrontmatter } from "./types";

const baseDir = path.join(process.cwd(), "src", "content", "recipes");

export async function getRecipeSlugs(locale: AppLocale) {
  const dir = path.join(baseDir, locale);
  const files = await fs.readdir(dir);
  return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
}

export async function getRecipes(locale: AppLocale): Promise<RecipeFrontmatter[]> {
  const slugs = await getRecipeSlugs(locale);
  const out: RecipeFrontmatter[] = [];
  for (const slug of slugs) {
    const file = path.join(baseDir, locale, `${slug}.mdx`);
    const raw = await fs.readFile(file, "utf8");
    const { data } = matter(raw);
    out.push(data as RecipeFrontmatter);
  }
  out.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return out;
}

export async function getRecipe(locale: AppLocale, slug: string): Promise<Recipe> {
  const file = path.join(baseDir, locale, `${slug}.mdx`);
  const raw = await fs.readFile(file, "utf8");
  const { data, content } = matter(raw);
  return { ...(data as any), content } as Recipe;
}
