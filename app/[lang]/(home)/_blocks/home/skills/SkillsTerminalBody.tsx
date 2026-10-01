"use client";

import { useEffect, useRef, useState } from "react";

import { Box, Flex, Text } from "@radix-ui/themes";

type SkillLine = { name: string; skills: string };

type SkillsJson = {
  frontend: SkillLine;
  state: SkillLine;
  communication: SkillLine;
  tooling: SkillLine;
};

const TYPE_SPEED_MS = 15;
const LINE_PAUSE_MS = 200;

export default function SkillsTerminalBody({ json }: { json: SkillsJson }) {
  const lines: SkillLine[] = [json.frontend, json.state, json.communication, json.tooling];

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || lineIndex >= lines.length) return;

    const fullLength = lines[lineIndex].name.length + 2 + lines[lineIndex].skills.length;

    if (charIndex >= fullLength) {
      const timeout = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setCharIndex((i) => i + 1), TYPE_SPEED_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, lineIndex, charIndex]);

  const isDone = lineIndex >= lines.length;

  return (
    <Flex ref={containerRef} p="5" gap="1" direction="column" className="font-(family-name:--font-geist-mono) text-[14px]">
      <Text className="text-(--color-gold-darker)" as="div">
        {"{"}
      </Text>

      {lines.map((line, i) => {
        if (i > lineIndex) return null;

        const isActive = i === lineIndex;
        const nameShown = isActive ? line.name.slice(0, Math.min(charIndex, line.name.length)) : line.name;
        const sepShown = isActive ? ": ".slice(0, Math.max(0, Math.min(charIndex - line.name.length, 2))) : ": ";
        const skillsShown = isActive ? line.skills.slice(0, Math.max(0, charIndex - line.name.length - 2)) : line.skills;

        return (
          <Box pl="5" key={line.name}>
            <Text className="text-(--color-gold-light)">{nameShown}</Text>
            {sepShown}
            <Text className="text-(--color-gold-orange)">{skillsShown}</Text>
            {isActive && <span className="skills-terminal__cursor" />}
          </Box>
        );
      })}

      <Text className="text-(--color-gold-darker)" as="div">
        {"}"}
        {isDone && <span className="skills-terminal__cursor" />}
      </Text>
    </Flex>
  );
}
