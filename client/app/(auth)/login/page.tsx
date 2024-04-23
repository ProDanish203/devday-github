"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/forms";
import { ChangeEvent, FormEvent, useState } from "react";
import { loginUser } from "@/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/AuthProvider";
import Cookies from "js-cookie";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useAuth();
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: loginUser,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!username) return toast.error("Username is required");
    if (!password) return toast.error("Password is required");

    const { success, response } = await mutateAsync({
      username,
      password,
    });
    if (!success) return toast.error(response);
    toast.success("Login success");

    setUser(response.user);
    Cookies.set("accessToken", response.accessToken, { expires: 7 });
    localStorage.setItem("access-token", response.accessToken);
    router.push("/");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              required
              name="username"
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
              autoComplete="current-password"
              name="password"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full bg-bg">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
