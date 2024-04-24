"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CheckCheck } from "lucide-react";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyMember } from "@/API/project";
import { toast } from "sonner";
import { Input } from "../ui/input";

export const VerifyMember = ({ id }: { id: string }) => {
  const [pass, setPass] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verifyMember,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`project-${id}`, "my-projects", "projects", "users"],
      });
    },
  });

  const verify = async () => {
    if (!pass) return toast.error("Pass code is required");

    const { success, response } = await mutateAsync({
      id,
      passCode: pass,
    });
    if (!success) return toast.error(response);
    toast.success("Verification completed");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="max-xs:w-full">
          <CheckCheck className="h-4 w-4 mr-2" />
          Verify Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bg border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-text">Login</DialogTitle>
          <DialogDescription className="text-para">
            Login via code
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="pass" className="text-white mb-2">
              Passcode
            </Label>
            <Input
              id="pass"
              type="text"
              className=""
              placeholder="Passcode"
              value={pass}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPass(e.target.value)
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-white text-bg hover:bg-white/90 active:scale-[0.99]"
            disabled={isPending}
            onClick={verify}
          >
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
