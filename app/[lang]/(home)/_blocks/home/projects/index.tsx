import Image from "next/image";
import Link from "next/link";

import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

import { getRouteByKey } from "@/app/[lang]/(home)/constants/routes";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";

export default async function Projects({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4">
      <section className="py-20 md:py-30">
        <Text className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-gold)" mb="4" as="div">
          {"//"} {dict.projects.eyebrow}
        </Text>

        <Heading as="h2" size="8" mb="5">
          {dict.projects.heading}
        </Heading>

        <Flex py="7" gap="8" align="center" direction={{ initial: "column-reverse", md: "row" }} className="border-b border-(--color-dark)">
          <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />

          <Flex direction="column">
            <Text className="text-(14px) font-(family-name:--font-geist-mono) text-(--color-gold)" as="div" mb="2">
              01
            </Text>
            <div className="mb-6 text-[32px] font-bold">Perfect Panel: SaaS Platform</div>
            <Text className="text-[16px] text-(--color-secondary)" as="div" mb="5">
              Full-scale SaaS product suite including administration panels and a website-building platform. Developing complex interfaces with React and Vue, integrating REST APIs and WebSocket-based
              real-time chat systems.
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
        <Flex py="7" gap="8" align="center" direction={{ initial: "column-reverse", md: "row" }} className="border-b border-(--color-dark)">
          <Image src="/hero-bg.svg" alt="Code Image" width={640} height={400} className="rounded-2xl border border-(--color-dark-light)" loading="eager" />

          <Flex direction="column">
            <Text className="text-(14px) font-(family-name:--font-geist-mono) text-(--color-gold)" as="div" mb="2">
              03
            </Text>
            <div className="mb-6 text-[32px] font-bold">Mission-CRM: Customer Platform</div>
            <Text className="text-[16px] text-(--color-secondary)" as="div" mb="5">
              CRM platform for centralizing customer information and business processes. Developed management workflows, complex data tables with filtering and search, and reusable UI components with
              Ant Design.
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

        <Button size="4" className="bg-(--color-gold)" variant="solid" mt="5" asChild>
          <Link href={{ pathname: `/${lang}${getRouteByKey("projects")?.href}` }}>
            <span className="font-(family-name:--font-geist-mono) text-[15px] font-bold text-background">{dict.projects.button}</span>
          </Link>
        </Button>
      </section>
    </Container>
  );
}
