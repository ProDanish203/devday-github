"use client";
import { FilterIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleFilterChange = (filter: string) => {
    router.push(
      pathname + "?" + createQueryString("filter", filter.toString()),
      { scroll: false }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline" className="max-xs:w-full">
          <FilterIcon className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-bg max-xs:w-[170px]">
        <DropdownMenuItem
          onClick={() => handleFilterChange("atoz")}
          className="text-text hover:!bg-neutral-800 hover:!text-text"
        >
          <p>A-To-Z</p>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleFilterChange("ztoa")}
          className="text-text hover:!bg-neutral-800 hover:!text-text"
        >
          <p>Z-To-A</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
