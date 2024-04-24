"use client";
import { Bell, BellPlus } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getNotifications, readNotifications } from "@/API/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/store/AuthProvider";
import { Loader } from "../helpers";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface User {
  _id: string;
  username: string;
  avatar?: {
    public_id: string;
    url: string;
  };
}

interface Notif {
  _id: string;
  content: string;
  createdAt: string;
  from: User;
  to: User;
}

const NotifCard = ({ data }: { data: Notif }) => {
  return (
    <div className="p-2 border-b-[1px] border-neutral-700 rounded-md bg-neutral-900">
      <div className="flex items-start gap-x-2">
        <div>
          <Avatar className="size-10">
            <AvatarImage
              src={data.from.avatar?.url || "/images/user.webp"}
              className="object-cover"
            />
            <AvatarFallback>...</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-sm text-white ">@{data.from.username}</p>
          <p className="text-white text-[12px] mt-1">{data.content}</p>
        </div>
      </div>
    </div>
  );
};

export const Notifications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: readNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-user"],
      });
    },
  });

  const markAsRead = async () => {
    await mutateAsync();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="ml-auto size-8 bg-bg/40 hover:bg-bg"
          size="icon"
          variant="outline"
          onClick={markAsRead}
        >
          {user && user.hasNotifications ? (
            <BellPlus className="size-4 text-text" />
          ) : (
            <Bell className="size-4 text-text" />
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-bg">
        <h2 className="text-white text-3xl font-semibold mb-4">
          Notifications
        </h2>
        <div className="flex justify-center gap-y-2 flex-col">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader />
            </div>
          ) : data &&
            data.success &&
            data.response &&
            data.response?.length > 0 ? (
            data.response.map((project: any) => (
              <NotifCard data={project} key={project._id} />
            ))
          ) : (
            <h2 className="text-white text-3xl font-semibold mb-4">
              No Notifications
            </h2>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
