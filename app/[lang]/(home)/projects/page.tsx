import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container, Flex, Heading, Text } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale } from "@/app/[lang]/locales";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return dict.meta.projects;
}

export default async function Home({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <Flex direction="column">
      <Container size="4" px="4" className="overflow-hidden">
        <section className="relative py-32 md:py-42">
          <Heading as="h1" size="9" mb="5">
            {dict.projects.page_heading}
          </Heading>

          <Image src="/hero-bg.svg" alt="Code Image" width={600} height={192} className="slide-from-top absolute top-20 left-[60%] z-[-1]" fetchPriority="high" preload />

          <Link href={`/${lang}/projects/1`}>
            <Flex py="7" gap="8" align="center" direction={{ initial: "column-reverse", md: "row" }} className="border-b border-(--color-dark)">
              <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />

              <Flex direction="column">
                <Text className="text-(14px) font-(family-name:--font-geist-mono) text-(--color-gold)" as="div" mb="2">
                  01
                </Text>
                <div className="mb-6 text-[32px] font-bold">Perfect Panel: SaaS Platform</div>
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
            </Flex>
          </Link>

          <Link href={`/${lang}/projects/2`}>
            <Flex py="7" gap="8" align="center" direction={{ initial: "column-reverse", md: "row-reverse" }} className="border-b border-(--color-dark)">
              <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />

              <Flex direction="column">
                <Text className="text-(14px) font-(family-name:--font-geist-mono) text-(--color-gold)" as="div" mb="2">
                  02
                </Text>
                <div className="mb-6 text-[32px] font-bold">Pampadu: Insurance Back Office</div>
                <Text className="text-[16px] text-(--color-secondary)" as="div" mb="5">
                  Internal back-office platform for managing insurance business processes. Built Vue 3 interfaces for tariffs, agents and clients, analytical dashboards with Chart.js, and optimized
                  rendering for large datasets.
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vue 3
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vuetify
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Pinia
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Chart.js
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Link>

          <Link href={`/${lang}/projects/3`}>
            <Flex py="7" gap="8" align="center" direction={{ initial: "column-reverse", md: "row" }}>
              <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />

              <Flex direction="column">
                <Text className="text-(14px) font-(family-name:--font-geist-mono) text-(--color-gold)" as="div" mb="2">
                  03
                </Text>
                <div className="mb-6 text-[32px] font-bold">Mission-CRM: Customer Platform</div>
                <Text className="text-[16px] text-(--color-secondary)" as="div" mb="5">
                  CRM platform for centralizing customer information and business processes. Developed management workflows, complex data tables with filtering and search, and reusable UI components
                  with Ant Design.
                </Text>
                <Flex wrap="wrap" gap="2">
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Vue 2
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Ant Design
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    Pinia
                  </Text>
                  <Text as="div" className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold)">
                    REST API
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Link>
        </section>
      </Container>
    </Flex>
  );
}
