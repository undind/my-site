import "server-only";

import type { Locale } from "@/app/[lang]/locales";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ru: () => import("./dictionaries/ru.json").then((module) => module.default),
};

type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;
const cache = new Map<Locale, Dictionary>();

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const cached = cache.get(locale);
  if (cached) return cached;

  const dict = await dictionaries[locale]();
  cache.set(locale, dict);
  return dict;
};
