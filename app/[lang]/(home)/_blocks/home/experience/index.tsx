import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";

export default async function Experience({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4" className="border-t border-b border-(--color-dark) bg-(--background-secondary)">
      <section className="py-20 md:py-30">
        <Text className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-gold)" mb="4" as="div">
          {"//"} {dict.experience.eyebrow}
        </Text>

        <Heading as="h2" size="8" mb="9">
          {dict.experience.heading}
        </Heading>

        <Box maxWidth="960px">
          <Flex direction="column" gap="7">
            <Flex gap="5">
              <Box width="24px">
                <Flex direction="column" align="center" justify="center" height="100%" width="24px">
                  <div className="h-3 w-3 rounded-full bg-(--color-gold-light)" />
                  <div className="h-full w-0.5 bg-(--color-dark-light)" />
                </Flex>
              </Box>
              <Box>
                <Flex justify="between" direction={{ initial: "column", sm: "row" }} gap="2" mb="3" className="font-(family-name:--font-geist-mono) text-[12px]">
                  <Flex align="center" gap="2">
                    <Text className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 text-(--color-gold-light)">commit e7f3c1a</Text>
                    <Text className="text-(--color-grey)">2020 — Present</Text>
                  </Flex>
                  <Flex className="text-(--color-grey)">[Author: @sergey_antonov]</Flex>
                </Flex>
                <Box>
                  <Text as="div" className="text-[20px]" weight="bold" mb="3">
                    Middle Frontend Developer — Perfect Panel
                  </Text>
                  <Text className="text-[14px] text-(--color-secondary)" as="div">
                    Developing SaaS products, admin panels and a website-building platform using React, Vue 2/3. Integrating REST APIs, WebSocket real-time systems, and writing E2E tests with
                    Playwright.
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Flex gap="5">
              <Box width="24px">
                <Flex direction="column" align="center" justify="center" height="100%" width="24px">
                  <div className="h-3 w-3 rounded-full bg-(--color-gold-light)" />
                  <div className="h-full w-0.5 bg-(--color-dark-light)" />
                </Flex>
              </Box>
              <Box>
                <Flex justify="between" direction={{ initial: "column", sm: "row" }} gap="2" mb="3" className="font-(family-name:--font-geist-mono) text-[12px]">
                  <Flex align="center" gap="2">
                    <Text className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 text-(--color-gold-light)">commit 4a1d82b</Text>
                    <Text className="text-(--color-grey)">2022 — 2026</Text>
                  </Flex>
                  <Flex className="text-(--color-grey)">[Author: @sergey_antonov]</Flex>
                </Flex>
                <Box>
                  <Text as="div" className="text-[20px]" weight="bold" mb="3">
                    Frontend Developer — Freelance Projects
                  </Text>
                  <Text className="text-[14px] text-(--color-secondary)" as="div">
                    Pampadu back-office, EKTP-Connect logistics panel, Mission-CRM, SeaRadar yacht platform. Vue 3, React 18, Vuetify, Chart.js, Ant Design across multiple production apps.
                  </Text>
                </Box>
              </Box>
            </Flex>

            <Flex gap="5">
              <Box width="24px">
                <Flex direction="column" align="center" justify="center" height="100%" width="24px">
                  <div className="h-3 w-3 rounded-full bg-(--color-gold-light)" />
                  <div className="h-full w-0.5 bg-(--color-dark-light)" />
                </Flex>
              </Box>
              <Box>
                <Flex justify="between" direction={{ initial: "column", sm: "row" }} gap="2" mb="3" className="font-(family-name:--font-geist-mono) text-[12px]">
                  <Flex align="center" gap="2">
                    <Text className="rounded-sm border border-(--color-dark) bg-(--color-gold-dark) px-2.5 py-1 text-(--color-gold-light)">commit 9b8c74a</Text>
                    <Text className="text-(--color-grey)">2018 — 2020</Text>
                  </Flex>
                  <Flex className="text-(--color-grey)">[Author: @sergey_antonov]</Flex>
                </Flex>
                <Box>
                  <Text as="div" className="text-[20px]" weight="bold" mb="3">
                    Web Admin / System Admin — City Hospital №1
                  </Text>
                  <Text className="text-[14px] text-(--color-secondary)" as="div">
                    Developed and maintained the organization&apos;s website and web infrastructure. Provided technical administration support and troubleshot web-related issues.
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </section>
    </Container>
  );
}
