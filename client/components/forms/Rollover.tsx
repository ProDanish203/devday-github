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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBranches, rollBack } from "@/API/project";
import { toast } from "sonner";

export const Rollover = ({
  id,
  branchId,
}: {
  id: string;
  branchId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: rollBack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const handleRollback = async () => {
    const { success, response } = await mutateAsync({
      id,
      branchId,
    });
    if (!success) return toast.error(response);
    toast.success("Rollover success");
  };
  return (
    <Button
      size="sm"
      variant="outline"
      className="bg-white hover:bg-white/90 text-bg max-sm:w-full"
      disabled={isPending}
      onClick={handleRollback}
    >
      Rollover
    </Button>
  );
};
