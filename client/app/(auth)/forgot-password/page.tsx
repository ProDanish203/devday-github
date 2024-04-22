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
import { ChangeEvent, FormEvent, useState } from "react";
import { forgotPassword } from "@/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: forgotPassword,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      return toast.error("Invalid Email address");

    const { success, response } = await mutateAsync(email);
    if (!success) return toast.error(response);
    setEmail("");
    toast.success("A verification email has been sent to your email");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Enter your registered email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="abc@xyz.com"
              required
              name="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full bg-bg">
            Send Reset Link
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p className="mb-2">- OR - </p>
          create a new account,{" "}
          <Link href="/register" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
