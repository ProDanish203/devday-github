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
import { registerUser } from "@/API/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [info, setInfo] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerUser,
  });

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    // Validations
    if (!info.username) return toast.error("Username is required");
    if (!info.password) return toast.error("Password is required");
    if (!info.email) return toast.error("Email is required");
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(info.email))
      return toast.error("Invalid Email address");
    if (!info.name) return toast.error("Fullname is required");
    if (!/\s/.test(info.name))
      return toast.error("Please enter your full name (e.g., John Doe)");
    if (info.password.length < 6)
      return toast.error("Password must be atleast 6 characters");
    if (!/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(info.password))
      return toast.error(
        "Password must contain at least one uppercase letter, one digit, and one special character"
      );

    const { success, response } = await mutateAsync({
      username: info.username,
      password: info.password,
      email: info.email,
      fullName: info.name,
    });
    if (!success) return toast.error(response);
    toast.success("Registeration success");
    router.push("/login");
  };

  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter the details to register your account
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
              value={info.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. John doe"
              required
              name="name"
              value={info.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="abc@xyz.com"
              required
              name="email"
              value={info.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              value={info.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              name="password"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full bg-bg">
            Register
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
