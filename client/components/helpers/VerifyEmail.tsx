"use client";
import { MailIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { sendVerifyLink } from "@/API/auth";
import { toast } from "sonner";

export const VerifyEmail = () => {
  // Sending link
  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendVerifyLink,
  });

  const verifyEmail = async () => {
    const { success, response } = await mutateAsync();
    if (!success) return toast.error(response);
    else
      toast.success("Please check your email");
  };

  return (
    <div className="flex items-center justify-between bg-neutral-800 px-4 py-3 border border-dashed border-[#00b894] max-w-7xl mx-auto w-full my-5">
      <div className="flex items-center space-x-2 text-sm text-[#00b894]">
        <MailIcon className="h-5 w-5" />
        <span>Please verify your email address</span>
      </div>
      <Button
        disabled={isPending}
        size="sm"
        className="bg-[#00b894] hover:bg-[#00b894]/80"
        onClick={verifyEmail}
      >
        Verify Email
      </Button>
    </div>
  );
};
