"use client";
import { verifyEmail } from "@/API/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerifyPage = ({ searchParams }: { searchParams: { token: string } }) => {
  const { token } = searchParams;
  const router = useRouter();

  const [emailVerified, setEmailVerified] = useState(false);

  const { mutateAsync: mutateVerify, isPending: isVerifying } = useMutation({
    mutationFn: verifyEmail,
  });

  const verifyToken = async () => {
    const { success, response } = await mutateVerify(token);
    if (!success) {
      toast.error(response);
      router.push("/");
    } else {
      toast.success("Email verified");
      setEmailVerified(true);
    }
  };

  useEffect(() => {
    if (!emailVerified) verifyToken();
  }, []);

  if (!token) redirect("/");
  return (
    <div className="mx-auto max-w-md w-full my-10 mt-40">
      {emailVerified && (
        <Card className="w-[350px] bg-neutral-900">
          <CardHeader>
            <CardTitle className="text-text">Email Verified</CardTitle>
            <CardDescription className="text-para">
              Your email has been verified, now you are allowed to have access
              of the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-[#00b894] hover:bg-[#00b894]/80 mx-auto w-full"
              onClick={() => router.push("/")}
            >
              Back To Dashboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default VerifyPage;
