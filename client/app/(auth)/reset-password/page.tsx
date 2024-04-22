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
import { resetPassword } from "@/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

export default function ForgetPassword({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const router = useRouter();

  if (!token) redirect("/login");
  const { mutateAsync, isPending } = useMutation({
    mutationFn: resetPassword,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!password) return toast.error("Email is required");
    if (password.length < 6)
      return toast.error("Password must be atleast 6 characters");
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(password))
      return toast.error(
        "Password must contain at least one uppercase letter, one digit, and one special character"
      );

    if (password !== cPassword) return toast.error("Passwords do not match");

    const { success, response } = await mutateAsync({
      newPassword: password,
      token,
    });
    if (!success) return toast.error(response);
    else {
      toast.success("Password updated");
      router.push("/login");
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Change Password</CardTitle>
        <CardDescription>
          Change password to gain access to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
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

          <div className="grid gap-2">
            <Label htmlFor="password">Confirm Password</Label>
            <PasswordInput
              id="cpassword"
              value={cPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCPassword(e.target.value)
              }
              required
              autoComplete="confirm-password"
              name="cpassword"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full bg-bg">
            Reset Password
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="underline">
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
