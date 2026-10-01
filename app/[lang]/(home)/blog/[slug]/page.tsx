import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Container, Flex, Heading } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.blog;
}

export default async function Home({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !slug) notFound();

  return (
    <Flex direction="column">
      <Container size="4" px="4" className="overflow-hidden">
        <section className="relative py-32 md:py-42">
          <Heading as="h1" size="9" mb="5">
            Blog
          </Heading>

          <Image src="/hero-bg.svg" alt="Code Image" width={600} height={192} className="slide-from-top absolute top-20 left-[60%] z-[-1]" fetchPriority="high" preload />
        </section>
      </Container>
    </Flex>
  );
}
