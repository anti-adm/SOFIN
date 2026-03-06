import fs from "node:fs/promises";
import path from "node:path";
import { type AppLocale } from "../i18n/locales";
import { type Product } from "./types";

export async function getProducts(locale: AppLocale): Promise<Product[]> {
  const file = path.join(process.cwd(), "src", "content", "products", `${locale}.json`);
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Product[];
}

export async function getProduct(locale: AppLocale, slug: string): Promise<Product | null> {
  const items = await getProducts(locale);
  const p = items.find((x) => x.slug === slug);
  return p ?? null;
}