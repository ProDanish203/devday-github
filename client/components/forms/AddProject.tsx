"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const AddProject = () => {
  return (
    <Link href="/projects/create">
      <Button size="sm" variant="outline" className="max-xs:w-full">
        <PlusIcon className="h-4 w-4 mr-2" />
        New Project
      </Button>
    </Link>
  );
};
