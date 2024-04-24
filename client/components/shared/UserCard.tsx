import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserTypes } from "@/lib/types";
import { Badge } from "../ui/badge";

export const UserCard = ({
  data,
  status,
}: {
  data: UserTypes;
  status?: string;
}) => {
  return (
    <Card className="w-[300px] h-[350px] flex flex-col items-center justify-between p-6 rounded-lg shadow-lg overflow-y-hidden relative">
      <div className="flex flex-col items-center space-y-4">
        {/* Status Badge */}
        {status && (
          <Badge
            className={`px-2 py-1 text-xs ${
              status === "pending"
                ? "bg-red-500 hover:bg-red-500/90"
                : "bg-green-500 hover:bg-green-500/90"
            } absolute top-2 right-2`}
          >
            {status}
          </Badge>
        )}
        <Avatar className="w-24 h-24 border border-bg">
          <AvatarImage
            alt={data.username}
            src={data.avatar?.url || "/images/user.webp"}
            className="object-cover"
          />
          <AvatarFallback>...</AvatarFallback>
        </Avatar>
        <div className="text-center space-y-1">
          <h4 className="text-xl font-semibold">{data.fullName}</h4>
          <p className="text-gray-500 dark:text-gray-400">@{data.username}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {data.bio && data.bio.length > 80
              ? `${data.bio.substring(0, 80)}...`
              : data.bio}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">12</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Projects
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">1</span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Teams
          </span>
        </div>
      </div>
    </Card>
  );
};
