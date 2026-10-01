"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Flex, Text } from "@radix-ui/themes";
import { cn } from "cn";

import { type Locale, locales } from "@/app/[lang]/locales";

const labels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const segments = pathname.split("/");

  return (
    <Flex align="center" gap="2" className="text-[14px] text-(--color-grey)">
      {locales.map((locale, index) => {
        segments[1] = locale;
        const href = segments.join("/") || "/";
        const isActive = locale === lang;

        return (
          <Flex key={locale} align="center" gap="2">
            <Link href={href} aria-current={isActive ? "true" : undefined} className={cn("hover:text-(--color-gold-light)", { "text-(--color-gold)": isActive })}>
              {labels[locale]}
            </Link>
            {index < locales.length - 1 && <Text as="div">/</Text>}
          </Flex>
        );
      })}
    </Flex>
  );
}
