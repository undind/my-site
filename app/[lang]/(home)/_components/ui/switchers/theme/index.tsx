"use client";
import { useLayoutEffect, useState } from "react";
import { useTheme } from "next-themes";

import { ToggleGroup } from "radix-ui";

import { themes } from "@/app/[lang]/(home)/constants/themes";
import { type NavDict } from "@/app/[lang]/types";
import MonitorSVG from "@/public/theme/monitor.svg";
import MoonSVG from "@/public/theme/moon.svg";
import SunSVG from "@/public/theme/sun.svg";

import "@/app/[lang]/(home)/_components/ui/switchers/theme/style.css";

const THEME_ICONS = {
  system: MonitorSVG,
  dark: MoonSVG,
  light: SunSVG,
} as const;

export default function ThemeSwitcher({ dict }: { dict: NavDict }) {
  const { theme: currentTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <ToggleGroup.Root className="switcher-theme-toggler" type="single" value={mounted ? (currentTheme ?? "system") : ""} onValueChange={setTheme}>
      {themes?.map((theme) => {
        const Icon = THEME_ICONS[theme.key];
        return (
          <ToggleGroup.Item className="switcher-theme-toggler__item" value={theme.key} key={theme.key}>
            <div className="flex items-center gap-1">
              <Icon />
              <span className="font-(family-name:--font-geist-mono) text-[12px]">{dict.theme[theme.key]}</span>
            </div>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}
