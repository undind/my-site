"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";

import LanguageSwitcher from "@/app/[lang]/(home)/_components/ui/switchers/language";
import ThemeSwitcher from "@/app/[lang]/(home)/_components/ui/switchers/theme";
import { routes } from "@/app/[lang]/(home)/constants/routes";
import type { Locale } from "@/app/[lang]/locales";
import { type NavDict } from "@/app/[lang]/types";

import "@/app/[lang]/(home)/_components/ui/navbar/styles.css";

export default function NavBar({ lang, dict }: { lang: Locale; dict: NavDict }) {
  const currentPath = usePathname();

  const [show, setShow] = useState(false);

  return (
    <>
      <Box className="sticky inset-0 z-20">
        <Container size="4" px="4" className="border-b border-b-(--navbar-bb-color) bg-(--navbar-bg) backdrop-blur-xl">
          <div className="max-h-(--navbar-height) py-(--navbar-py)">
            <Flex align="center" justify="between" gap="3">
              <Link href={`/${lang}`}>
                <Text as="div" weight="bold" className="text-[18px]">
                  <span className="text-(--color-gold-light)">const</span> antonov_dev = <span className="text-(--color-gold)">{"{ }"}</span>
                </Text>
              </Link>

              <Flex align="center" gap="6" display={{ initial: "none", md: "flex" }}>
                {routes?.map((route) => {
                  const href = `/${lang}${route.href}`;
                  return (
                    <Link href={href} key={route.href} className={`hover:text-(--color-gold-light) text-[14px]${currentPath?.includes(href) ? "text-(--color-gold)" : ""}`}>
                      {"//"} {dict[route.key]}
                    </Link>
                  );
                })}
              </Flex>

              <Flex align="center" gap="5">
                <Flex display={{ initial: "none", md: "flex" }}>
                  <ThemeSwitcher dict={dict} />
                </Flex>

                <LanguageSwitcher lang={lang} />

                <Flex display={{ initial: "flex", md: "none" }}>
                  <Button color="gray" variant="outline" className="overflow-hidden" onClick={() => setShow(!show)}>
                    <div className={`hamburger${show ? "show" : ""}`}>
                      <span />
                      <span />
                      <span />
                    </div>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </div>
        </Container>
      </Box>

      <Box className={`mobile-menu z-19 block bg-(--navbar-bg) lg:hidden backdrop-blur-xl${show ? "show" : ""}`}>
        <Container size="4" px="4">
          <Flex align="center" justify="center" direction="column" gap="6" mt="5">
            <ThemeSwitcher dict={dict} />

            <Flex align="start" justify="center" direction="column" gap="6">
              {routes?.map((route) => {
                const href = `/${lang}${route.href}`;
                return (
                  <Link href={href} key={route.href} className={`hover:text-(--color-gold-light) text-[14px]${currentPath == href ? "text-(--color-gold)" : ""}`}>
                    {"//"} {dict[route.key]}
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
