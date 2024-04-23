"use client";
import { useAuth } from "@/store/AuthProvider";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { logoutUser } from "@/API/auth";
import { useMutation } from "@tanstack/react-query";

export const LogoutBtn = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logoutUser,
  });

  const handleLogout = async () => {
    const { success, response } = await mutateAsync();
    if (!success) return toast.error(response);

    setUser(undefined);
    toast.success("Logged out successfully");
    localStorage.removeItem("access-token");
    Cookies.remove("accessToken");
    router.push("/login");
  };
  return (
    <div onClick={handleLogout} className="text-text cursor-pointer">
      Logout
    </div>
  );
};
