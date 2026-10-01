import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

import { Tag } from "@/app/[lang]/(home)/_components/ui/tag";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";

export default async function Projects({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4">
      <section className="py-20 md:py-30">
        <Flex align="center" justify="center">
          <Box maxWidth="800px" className="text-center">
            <Tag>{dict.intouch.tag}</Tag>
            <Heading as="h2" size="9" mt="5">
              {dict.intouch.heading}
            </Heading>
            <Text mt="5" as="div" className="text-[18px] text-(--color-secondary)">
              {dict.intouch.description}
            </Text>
            <Button size="4" className="bg-(--color-gold) text-background" variant="solid" mt="8" asChild>
              <a href="mailto:flyker777@yandex.ru">
                <span className="font-(family-name:--font-geist-mono) text-[15px] font-bold text-background">flyker777@yandex.ru</span>
              </a>
            </Button>
          </Box>
        </Flex>
      </section>
    </Container>
  );
}
