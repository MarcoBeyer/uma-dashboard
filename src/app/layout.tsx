import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { Header, MenuItem } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMA Dashboard",
  description: "UMA Dashboard",
};

const menuItems: MenuItem[] = [
  { title: "Users", href: "/users" },
  { title: "Votes", href: "/votes" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header title={metadata.title as string} menuItems={menuItems} />
          <div className="p-4">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
