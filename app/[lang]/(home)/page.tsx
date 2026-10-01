import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Flex } from "@radix-ui/themes";

import Experience from "@/app/[lang]/(home)/_blocks/home/experience";
import Hero from "@/app/[lang]/(home)/_blocks/home/Hero";
import Intouch from "@/app/[lang]/(home)/_blocks/home/intouch";
import Projects from "@/app/[lang]/(home)/_blocks/home/projects";
import Skills from "@/app/[lang]/(home)/_blocks/home/skills/Skills";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.home;
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <Flex direction="column">
      <Hero lang={lang} />

      <Skills lang={lang} />

      <Projects lang={lang} />

      <Experience lang={lang} />

      <Intouch lang={lang} />
    </Flex>
  );
}
