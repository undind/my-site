import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/[...slug]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.notfound;
}

export default async function NotFound({ params }: PageProps<"/[lang]/[...slug]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4" className="align-center flex min-h-75 justify-center overflow-hidden">
      <section className="h-full text-center">
        <h1 className="text-4xl font-bold md:text-6xl">{dict.notfound.title}</h1>
      </section>
    </Container>
  );
}
