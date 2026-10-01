import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";

import SkillsTerminalBody from "@/app/[lang]/(home)/_blocks/home/skills/SkillsTerminalBody";
import { getDictionary } from "@/app/[lang]/dictionaries";
import type { Locale } from "@/app/[lang]/locales";
import CloseSVG from "@/public/skills/close.svg";
import MaximizeSVG from "@/public/skills/maximize.svg";
import MinimizeSVG from "@/public/skills/minimize.svg";
import TerminalSVG from "@/public/skills/terminal.svg";

import "@/app/[lang]/(home)/_blocks/home/skills/skills.css";

export default async function Skills({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  return (
    <Container size="4" px="4" className="bg-(--background-secondary)">
      <section className="py-20 md:py-30">
        <Text className="font-(family-name:--font-geist-mono) text-[14px] text-(--color-gold)" mb="4" as="div">
          {"//"} {dict.skills.eyebrow}
        </Text>

        <Heading as="h2" size="8">
          {dict.skills.heading}
        </Heading>

        <Flex mt={{ initial: "6", sm: "9" }} gap="6" direction={{ initial: "column", sm: "row" }}>
          <Box flexGrow="1">
            <div className="overflow-hidden rounded-xl border border-(--color-dark-light) bg-(--background-skills-terminal)">
              <Flex className="border-b border-b-(--color-dark-light) px-2.5 py-4" justify="between" align="center">
                <Flex align="center" gap="2">
                  <CloseSVG />
                  <MinimizeSVG />
                  <MaximizeSVG />
                </Flex>

                <Text className="font-(family-name:--font-geist-mono) text-[12px] text-(--color-gold-darker)">{dict.skills.json.title}</Text>

                <TerminalSVG />
              </Flex>

              <SkillsTerminalBody json={dict.skills.json} />
            </div>
          </Box>

          <Flex direction="column" gap="6">
            <Box maxWidth="480px">
              <Heading mb="3" size="6" as="h4">
                {dict.skills.sass.title}
              </Heading>
              <Text as="div" className="text-(--color-secondary)">
                {dict.skills.sass.description}
              </Text>
            </Box>

            <Box maxWidth="480px">
              <Heading mb="3" size="6" as="h4">
                {dict.skills.performance.title}
              </Heading>
              <Text as="div" className="text-(--color-secondary)">
                {dict.skills.performance.description}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </section>
    </Container>
  );
}
