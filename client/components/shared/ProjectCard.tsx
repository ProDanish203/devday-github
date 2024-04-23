import React from "react";
import { UserAvatar } from "../helpers";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const ProjectCard = () => {
  return (
    <div className=" bg-white h-fit rounded-lg shadow-sm dark:bg-gray-950">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Project A</h3>
          <Badge className="px-2 py-1 text-xs" variant="outline">
            In Progress
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          This is a description of Project A, which is currently in progress.
        </p>
      </div>
      <div className="border-t dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserAvatar src="/images/user.webp" />
          <UserAvatar src="/images/user.webp" />
          <UserAvatar src="/images/user.webp" />
        </div>
        <Button size="sm" variant="ghost">
          View
        </Button>
      </div>
    </div>
  );
};
