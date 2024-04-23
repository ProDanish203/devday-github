"use client";
import { Button } from "../ui/button";
import { PaginationTypes } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ data }: { data: PaginationTypes }) => {
  const { currentPage, hasNextPage, hasPrevPage, totalPages } = data;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());

    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };
  return (
    <div className="flex sm:justify-end items-center justify-center w-full md:pr-10 mt-auto mb-10">
      <nav aria-label="Page navigation">
        <ul className="flex list-none p-0">
          <li>
            <Button
              disabled={!hasPrevPage}
              onClick={() => handlePageChange(currentPage - 1)}
              className="mx-2 bg-white text-bg hover:bg-white/90"
            >
              Prev
            </Button>
          </li>
          {hasPrevPage && (
            <li>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                className="mx-2 bg-white text-bg hover:bg-white/90"
              >
                {currentPage - 1}
              </Button>
            </li>
          )}
          <li>
            <Button className="mx-2 bg-bg text-white hover:bg-bg/90 border-neutral-700 border">
              {currentPage}
            </Button>
          </li>
          {hasPrevPage && (
            <li className="max-sm:hidden">
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                className="mx-2 bg-bg text-white hover:bg-bg/90 border-neutral-700 border"
              >
                {currentPage + 1}
              </Button>
            </li>
          )}
          {totalPages > 5 && (
            <>
              <li className="max-sm:hidden">
                <Button className="mx-2 bg-bg text-white hover:bg-bg/90 border-neutral-700 border">
                  ...
                </Button>
              </li>
              <li className="max-sm:hidden">
                <Button
                  onClick={() => handlePageChange(totalPages)}
                  className="mx-2 bg-bg text-white hover:bg-bg/90 border-neutral-700 border"
                >
                  {totalPages}
                </Button>
              </li>
            </>
          )}
          <li>
            <Button
              disabled={!hasNextPage}
              onClick={() => handlePageChange(currentPage + 1)}
              className="mx-2 bg-white text-bg hover:bg-white/90"
            >
              Next
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
