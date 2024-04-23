"use client";
import Link from "next/link";
import { GlobeLock, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import { navLink, settingsLinks } from "@/utils/data";
import { usePathname } from "next/navigation";
import { UserDropdown } from "../helpers";

export const SettingsDashboard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col">
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
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-bg pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] text-text"
              />
            </div>
          </form>
          <UserDropdown />
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-bg p-4 md:gap-8 md:p-10 relative">
        <div className="mx-auto grid w-full max-w-7xl gap-2">
          <h1 className="text-3xl font-semibold text-text">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          {/* Settings Links */}
          <nav
            className="grid gap-4 text-sm text-muted-foreground sticky"
            x-chunk="dashboard-04-chunk-0"
          >
            {settingsLinks.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  href={link.path}
                  key={link.path + idx}
                  className={`${
                    isActive ? "font-semibold text-text" : "text-para"
                  } w-fit md:text-[16px]`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="md:pl-8 grid gap-6 text-text md:border-l border-neutral-700 min-h-[50vh]">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
