"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutBtn } from "./LogoutBtn";
import { useAuth } from "@/store/AuthProvider";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/API/auth";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useEffect } from "react";

export const UserDropdown = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();
  
  // Fetching current User
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    initialData: user ? { success: true, response: user } : undefined,
  });
  if (!isLoading && data && !data.success) {
    localStorage.removeItem("access-token");
    Cookies.remove("accessToken");
    toast.error("Session expired");
    router.push("/");
  }
  useEffect(() => {
    if (!isLoading && data && data.success && data.response) {
      setUser(data.response);
    }
  }, [data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-bg text-text border-text border-2 hover:bg-bg/50"
        >
          <Avatar>
            <AvatarImage src="/images/user.webp" alt="user" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-bg">
        <DropdownMenuLabel className="text-text">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-text">
          <Link href="/settings/general">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-text hover:!bg-neutral-800 hover:!text-text">
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
