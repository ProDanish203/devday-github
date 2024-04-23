"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { settingsLinks } from "@/utils/data";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const SettingsDashboard = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
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
