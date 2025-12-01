import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header title={metadata.title as string} menuItems={menuItems} />
        <div className="p-4">{children}</div>
      </body>
    </html>
  );
}
