export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export const hasLocale = (locale: string): locale is Locale => (locales as readonly string[]).includes(locale);
