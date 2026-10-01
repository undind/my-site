import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Theme } from "@radix-ui/themes";

import { AppHeader } from "@/app/admin/_components/header";
import { AppSidebar } from "@/app/admin/_components/sidebar";
import { SidebarInset, SidebarProvider } from "@/app/admin/_components/ui/sidebar";

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

export default function AdminAuthRootLayout({ children }: LayoutProps<"/admin">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body>
        <Theme>
          <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
              <AppHeader />

              <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </Theme>
      </body>
    </html>
  );
}
