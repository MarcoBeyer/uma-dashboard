"use client";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type MenuItem = {
  title: string;
  href: string;
};

export const Header = (props: { title: string; menuItems: MenuItem[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-black sticky top-0 z-40 w-full border-b">
      <nav
        className="mx-auto flex items-center justify-between p-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <div className="-m-1.5 p-1.5">
            <Link href={"/"}>
              <Image
                src="/logos/logo.png"
                className="block dark:hidden"
                alt="UMA Dashboard Logo"
                width={200}
                height={26}
              />
              <Image
                src="/logos/logo-dark.png"
                className="hidden dark:block"
                alt="UMA Dashboard Logo"
                width={200}
                height={26}
              />
            </Link>
          </div>
        </div>
        <div className="flex lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link href={"/"} onClick={() => setOpen(false)}>
                    UMA Dashboard
                  </Link>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {props.menuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {props.menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};
