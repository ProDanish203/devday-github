import React from "react";
import { UserAvatar } from "../helpers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ProjectTypes } from "@/lib/types";
import Link from "next/link";

export const ProjectCard = ({ data }: { data: ProjectTypes }) => {
  return (
    <div className="max-w-[450px]  bg-white h-fit rounded-lg shadow-sm dark:bg-gray-950">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{data.name}</h3>
          <Badge className="px-2 py-1 text-xs" variant="outline">
            In Progress
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {data.desc.length > 100
            ? `${data.desc.substring(0, 100)}...`
            : data.desc}
        </p>
      </div>
      <div className="border-t dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {data.members &&
            data.members.length > 0 &&
            data.members.map((member) => (
              <>
                {member.status !== "pending"}
                <UserAvatar
                  src={member.user.avatar?.url || "/images/user.webp"}
                  key={member._id}
                />
              </>
            ))}
        </div>
        <Link href={`projects/${data._id}`}>
          <Button size="sm" variant="ghost">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};
