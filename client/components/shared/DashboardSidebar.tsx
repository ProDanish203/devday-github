"use client";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import { Searchbar, UserDropdown, VerifyEmail } from "@/components/helpers";
import { useAuth } from "@/store/AuthProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calendar,
  ClipboardCheck,
  GlobeLock,
  Home,
  Menu,
  Settings,
  Users,
} from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Notifications } from "./Notifications";

export const DashboardSidebar = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-neutral-700 lg:block bg-bg/80 sticky top-0 left-0 h-screen">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-neutral-700 px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <GlobeLock className="size-6 text-text" />
              <span className="text-text">Github</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-y-3 items-start px-4 text-sm font-medium">
              <Link
                className={`${
                  pathname === "/" &&
                  "bg-gray-100 text-gray-900 hover:text-gray-900"
                } dashboard-link`}
                href="/"
              >
                <Home className="size-4" />
                Dashboard
              </Link>
              <Link
                className={`${
                  pathname.includes("projects") &&
                  "bg-gray-100 text-gray-900 hover:text-gray-900"
                } dashboard-link`}
                href="/projects"
              >
                <Calendar className="size-4" />
                Projects
              </Link>
              <Link
                className={`${
                  pathname.includes("users") &&
                  "bg-gray-100 text-gray-900 hover:text-gray-900"
                } dashboard-link`}
                href="/users"
              >
                <Users className="size-4" />
                Users
              </Link>
              <Link
                className={`${
                  pathname.includes("tasks") &&
                  "bg-gray-100 text-gray-900 hover:text-gray-900"
                } dashboard-link`}
                href="/tasks"
              >
                <ClipboardCheck className="size-4" />
                Tasks
              </Link>
              <Link
                className={`${
                  pathname.includes("settings") &&
                  "bg-gray-100 text-gray-900 hover:text-gray-900"
                } dashboard-link`}
                href="/settings"
              >
                <Settings className="size-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <p className="text-neutral-700 text-sm text-center">
              Made with <span className="text-red-300">❤</span> by{" "}
              <Link
                href="https://danish-siddiqui.vercel.app"
                target="_blank"
                className="underline"
              >
                Danish Siddiqui
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="sticky top-0 right-0 z-10 flex h-14 lg:h-[60px] items-center gap-4 border-b border-neutral-700 px-6 bg-bg/80">
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
                <Link
                  className={`${
                    pathname === "/" &&
                    "bg-gray-100 text-gray-900 hover:text-gray-900"
                  } dashboard-link`}
                  href="/"
                >
                  <Home className="size-4" />
                  Dashboard
                </Link>
                <Link
                  className={`${
                    pathname.includes("projects") &&
                    "bg-gray-100 text-gray-900 hover:text-gray-900"
                  } dashboard-link`}
                  href="/projects"
                >
                  <Calendar className="size-4" />
                  Projects
                </Link>
                <Link
                  className={`${
                    pathname.includes("users") &&
                    "bg-gray-100 text-gray-900 hover:text-gray-900"
                  } dashboard-link`}
                  href="/users"
                >
                  <Users className="size-4" />
                  Users
                </Link>
                <Link
                  className={`${
                    pathname.includes("tasks") &&
                    "bg-gray-100 text-gray-900 hover:text-gray-900"
                  } dashboard-link`}
                  href="/tasks"
                >
                  <ClipboardCheck className="size-4" />
                  Tasks
                </Link>
                <Link
                  className={`${
                    pathname.includes("settings") &&
                    "bg-gray-100 text-gray-900 hover:text-gray-900"
                  } dashboard-link`}
                  href="/settings"
                >
                  <Settings className="size-4" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Suspense fallback={<p>...</p>}>
              <Searchbar />
            </Suspense>
          </div>
          <Notifications />
          <UserDropdown />
        </header>

        {user &&
          !user.isEmailVerified &&
          !pathname.includes("/verify-email") && <VerifyEmail />}
        {children}
      </div>
    </div>
  );
};
