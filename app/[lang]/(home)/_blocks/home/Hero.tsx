import Image from "next/image";

import { Box, Button, Container, Heading, Text } from "@radix-ui/themes";

import { Tag } from "@/app/[lang]/(home)/_components/ui/tag";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";
import DownloadSVG from "@/public/download.svg";

import "@/app/[lang]/(home)/animation.css";

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4" className="overflow-hidden">
      <section className="py-32 md:py-54">
        <Box maxWidth="960px" className="relative">
          <Tag>{dict.hero.tag}</Tag>

          <Box mt="7">
            <Heading weight="bold" as="h1" size="9">
              {dict.hero.heading}
              <span className="animate-blink ml-1 inline-block h-[1em] w-0.75 bg-(--color-gold) align-middle" />
            </Heading>
          </Box>

          <Box mt="5">
            <Text className="text-(--color-secondary)" size="6">
              {dict.hero.description}
            </Text>
          </Box>

          <Button color="gray" variant="outline" radius="medium" size="3" mt="5">
            <span className="font-(family-name:--font-geist-mono) text-[14px] text-white">{dict.hero.cta}</span>
            <DownloadSVG className="animate-bounce text-white" width={14} height={14} />
          </Button>

          <Image src="/hero-bg.svg" alt="Code Image" width={600} height={192} className="slide-from-top absolute -top-20 left-[60%] z-[-1]" fetchPriority="high" preload />
        </Box>
      </section>
    </Container>
  );
}
