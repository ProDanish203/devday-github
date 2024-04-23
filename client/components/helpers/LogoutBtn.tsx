"use client";
import { useAuth } from "@/store/AuthProvider";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const LogoutBtn = () => {
  const router = useRouter();
  const { setUser } = useAuth();
  const handleLogout = async () => {
    setUser(undefined);
    toast.success("Logged out successfully");
    localStorage.removeItem("access-token");
    Cookies.remove("accessToken");
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <div onClick={handleLogout} className="text-text cursor-pointer">
      Logout
    </div>
  );
};
