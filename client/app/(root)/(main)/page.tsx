"use client";
import { Searchbar, UserDropdown, VerifyEmail } from "@/components/helpers";
import { useAuth } from "@/store/AuthProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  Bell,
  Calendar,
  ClipboardCheck,
  GlobeLock,
  Home,
  Settings,
  Users,
} from "lucide-react";
import { ProjectCard } from "@/components/shared";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r border-neutral-700 lg:block bg-bg/80">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b border-neutral-700 px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <GlobeLock className="size-6 text-text" />
              <span className="text-text">Github</span>
            </Link>
            <Button
              className="ml-auto size-8 bg-bg/40 hover:bg-bg"
              size="icon"
              variant="outline"
            >
              <Bell className="size-4 text-text" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 "
                href="/"
              >
                <Home className="size-4" />
                Dashboard
              </Link>
              <Link className="dashboard-link" href="/projects">
                <Calendar className="size-4" />
                Projects
              </Link>
              <Link className="dashboard-link" href="/users">
                <Users className="size-4" />
                Users
              </Link>
              <Link className="dashboard-link" href="/tasks">
                <ClipboardCheck className="size-4" />
                Tasks
              </Link>
              <Link className="dashboard-link" href="/settings">
                <Settings className="size-4" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">{/* Botttom area  */}</div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b border-neutral-700 px-6 bg-bg/80">
          <Link className="lg:hidden" href="/">
            <GlobeLock className="size-6 text-text" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            <Searchbar />
          </div>
          <UserDropdown />
        </header>
        <>
          {user && !user.isEmailVerified && <VerifyEmail />}
          <main className="flex-[0.5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <ProjectCard />
          </main>
        </>
      </div>
    </div>
  );
}
