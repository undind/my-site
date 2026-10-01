import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Theme } from "@radix-ui/themes";

import "@/app/admin/style.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin",
  description: "Admin",
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
