"use client";
import { navLink } from "@/utils/data";
import { GlobeLock, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserDropdown } from "../helpers";
import { Searchbar } from "../helpers/";

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b border-neutral-500 bg-bg px-4 md:px-6 z-30">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <GlobeLock className="size-6 text-text" />
          <span className="sr-only">Github</span>
        </Link>
        {navLink.map((link, idx) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path + idx}
              href={link.path}
              className={`${
                isActive ? "text-text" : "text-para"
              } text-muted-foreground transition-colors hover:text-text`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
      {/* Mobile view */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden bg-bg text-white"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-bg">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <GlobeLock className="size-8 text-text" />
              <span className="sr-only">Github</span>
            </Link>
            {navLink.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path + idx}
                  href={link.path}
                  className={`${
                    isActive ? "text-text" : "text-para"
                  } text-muted-foreground transition-colors hover:text-text`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 bg-bg">
        <Searchbar />
        <UserDropdown />
      </div>
    </header>
  );
};
