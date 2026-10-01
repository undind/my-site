import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.projects;
}

export default async function Home({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) && !slug) notFound();

  console.log(slug);

  return (
    <Flex direction="column">
      <Container size="4" px="4" className="overflow-hidden">
        <section className="relative py-32 md:py-42">
          <Heading as="h1" size="9" mb="5">
            Perfect Panel: SaaS Platform
          </Heading>

          <Image src="/hero-bg.svg" alt="Code Image" width={600} height={192} className="slide-from-top absolute top-20 left-[60%] z-[-1]" fetchPriority="high" preload />

          <Flex py="7" gap="8" direction="column">
            <Box maxWidth="900px">
              <Flex direction="column">
                <Text className="text-[16px] text-(--color-secondary)" as="div" mb="5">
                  Full-scale SaaS product suite including administration panels and a website-building platform. Developing complex interfaces with React and Vue, integrating REST APIs and
                  WebSocket-based real-time chat systems.
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    React
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vue 2 & 3
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    WebSocket
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Playwright
                  </Text>
                </Flex>
              </Flex>
            </Box>

            <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />
          </Flex>
        </section>
      </Container>
    </Flex>
  );
}
