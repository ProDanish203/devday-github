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
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { getUsers } from "@/API/users";
import { useQuery } from "@tanstack/react-query";
import { UserTypes } from "@/lib/types";

export const AddMembers = () => {
  const [users, setUsers] = useState();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, limit: 1000 }),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="max-xs:w-full">
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bg border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-text">Add Project</DialogTitle>
          <DialogDescription className="text-para">
            Add a new member
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="member">Assignee</Label>
            {/* @ts-ignore */}
            <Select id="member">
              <SelectTrigger>
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent>
                {data &&
                  data.success &&
                  data.response &&
                  data.response.data.length > 0 &&
                  data.response.data.map((user: UserTypes) => (
                    <SelectItem value={user._id} key={user._id}>
                      {user.username}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-text text-bg hover:bg-text/90 active:scale-[0.99]"
          >
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
