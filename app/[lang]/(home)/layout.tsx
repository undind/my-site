import { Geist_Mono, Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { Box, Theme } from "@radix-ui/themes";

import Footer from "@/app/[lang]/(home)/_blocks/home/footer";
import NavBar from "@/app/[lang]/(home)/_components/ui/navbar";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { hasLocale, locales } from "@/app/[lang]/locales";
import { Providers as ThemeProvider } from "@/app/providers";

import "@/app/[lang]/(home)/home.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Theme className="flex flex-col">
            <NavBar lang={lang} dict={dict.nav} />

            <Box className="flex-1">{children}</Box>

            <Footer lang={lang} />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
