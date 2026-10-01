import { Box, Container, Flex, Text } from "@radix-ui/themes";

import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";

export default async function Footer({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4" className="border-t border-(--color-dark)" flexGrow="0">
      <footer className="pt-15 pb-12 md:pt-30 md:pb-15">
        <Flex justify="between" direction={{ initial: "column", sm: "row" }} gap="6" mb="7">
          <Box maxWidth="280px">
            <Text as="div" weight="bold" className="font-(family-name:--font-geist-mono) text-[16px]" mb="3">
              {dict.footer.sitename}
            </Text>
            <Text className="text-[12px] text-(--color-grey)">{dict.footer.description}</Text>
          </Box>
          <Flex direction="column" gap="3">
            <Text as="div" className="font-(family-name:--font-geist-mono) text-[12px] text-(--color-grey)">
              {"//"} {dict.footer.socials}
            </Text>
            <a href="https://github.com/undind" target="_blank">
              <Text as="div" className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-secondary) hover:text-(--color-gold-light)">
                {dict.footer.github}
              </Text>
            </a>
            <a href="https://linkedin.com/in/sa-undind" target="_blank">
              <Text as="div" className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-secondary) hover:text-(--color-gold-light)">
                {dict.footer.linkedin}
              </Text>
            </a>
            <a href="https://t.me/undind" target="_blank">
              <Text as="div" className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-secondary) hover:text-(--color-gold-light)">
                {dict.footer.telegram}
              </Text>
            </a>
          </Flex>
        </Flex>

        <Box className="border-t border-(--color-dark)" pt={{ initial: "5", sm: "7" }}>
          <Flex justify="between" align="center" direction={{ initial: "column", sm: "row" }} gap="4">
            <Flex align="center" gap="2">
              <div className="h-2 w-2 rounded-full bg-(--color-gold-light)" />
              <Text as="div" className="font-(family-name:--font-geist-mono) text-[12px] text-(--color-grey)">
                {dict.footer.system}
              </Text>
            </Flex>
            <Text className="font-(family-name:--font-geist-mono) text-[12px] text-(--color-grey)">{dict.footer.reserved}</Text>
          </Flex>
        </Box>
      </footer>
    </Container>
  );
}
