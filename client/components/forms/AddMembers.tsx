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
import { PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { getUsers } from "@/API/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMembers } from "@/API/project";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
}

export const AddMembers = ({ id }: { id: string }) => {
  const [users, setUsers] = useState<User[]>([]);
  const queryClient = useQueryClient();

  const handleMembersChange = (value: string) => {
    // @ts-ignore
    setUsers((prev) => [...prev, { id: value._id, username: value.username }]);
  };
  const removeUser = (userId: string) => {
    // @ts-ignore
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({ page: 1, limit: 1000 }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`project-${id}`] });
    },
  });

  const handleAdd = async () => {
    if (!users || users.length == 0) return toast.error("Add atleast 1 user");
    const userIds = users.map((user) => user.id);

    const { success, response } = await mutateAsync({
      id,
      users: userIds,
    });
    if (!success) return toast.error(response);
    toast.success("Members added");
  };

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
          <DialogTitle className="text-text">Add Member</DialogTitle>
          <DialogDescription className="text-para">
            Add a new member
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid">
            <Label htmlFor="member" className="text-white mb-2">Add Members</Label>
            {/* @ts-ignore */}
            <Select id="member" onValueChange={handleMembersChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Member" />
              </SelectTrigger>
              <SelectContent>
                {data &&
                  data.success &&
                  data.response &&
                  data.response.data.length > 0 &&
                  // @ts-ignore
                  data.response.data.map((user) => (
                    <SelectItem value={user} key={user._id}>
                      @{user.username}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <div
                  // @ts-ignore
                  key={user.id}
                  className="bg-neutral-800 rounded-md px-2 py-2 flex items-center justify-between gap-x-2"
                >
                  {/* @ts-ignore */}
                  <p className="text-white text-sm">@{user.username}</p>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-500/80 active:scale-[0.99] text-text"
                    onClick={() => removeUser(user.id)}
                  >
                    <Trash className="size-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-text text-bg hover:bg-text/90 active:scale-[0.99]"
            disabled={isPending}
            onClick={handleAdd}
          >
            Add Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
