import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.about;
}

export default async function Home({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <Flex direction="column">
      <Container size="4" px="4" className="overflow-hidden">
        <section className="relative py-32 md:py-54">
          <Box maxWidth="960px">
            <Heading size="9" as="h1" mb="5">
              {dict.about.title}
            </Heading>
            <Text as="div" className="text-(--color-secondary)" size="6" mb="3">
              {dict.about.description}
            </Text>
            <Text as="div" className="text-(--color-secondary)" size="6" mb="3">
              {dict.about.description_2}
            </Text>
            <Text as="div" className="text-(--color-secondary)" size="6">
              {dict.about.description_3}
            </Text>

            <Image src="/hero-bg.svg" alt="Code Image" width={600} height={192} className="slide-from-top absolute top-20 left-[60%] z-[-1]" fetchPriority="high" preload />
          </Box>
        </section>
      </Container>

      <Container size="4" px="4" className="bg-(--background-secondary)">
        <section className="py-10 md:py-20">
          <Box>
            <Heading as="h2" size="8">
              {dict.skills.heading}
            </Heading>

            <Grid columns={{ initial: "1", sm: "2" }} gap="4" rows="repeat(auto, 1fr)" width="auto" mt="9">
              <Box>
                <Heading as="h3" mb="4" className="uppercase">
                  {dict.about.skills.frontend.title}
                </Heading>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    JavaScrip (ES+6)
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    TypeScript
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    React
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vue 2 & 3
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    jQuery
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Ionic
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Bootstrap
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Ant Design
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vuetify
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    HTML5/CSS
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Heading as="h3" mb="4" className="uppercase">
                  {dict.about.skills["state&api"].title}
                </Heading>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Redux
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Pinia
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vuex
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Axios
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    REST API
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    WebSocket
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Heading as="h3" mb="4" className="uppercase">
                  {dict.about.skills.testing.title}
                </Heading>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Playwright
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Jest
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Webpack
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Babel
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Git
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Heading as="h3" mb="4" className="uppercase">
                  {dict.about.skills.development.title}
                </Heading>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Node.js
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Python
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    PHP
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Chart.js
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    DevTools
                  </Text>
                </Flex>
              </Box>
            </Grid>
          </Box>
        </section>
      </Container>
    </Flex>
  );
}
