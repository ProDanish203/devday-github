"use client";
import { getUsers } from "@/API/users";
import { Filter, Pagination } from "@/components/helpers";
import { UserCard } from "@/components/shared";
import { UserSkeleton } from "@/components/skeletons";
import { UserTypes } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

interface SearchParams {
  searchParams: {
    page: number;
    limit: number;
    search: string;
    filter: string;
  };
}

const UserPage = ({ searchParams }: SearchParams) => {
  const { page, limit, search, filter } = searchParams;

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, limit, search, filter],
    queryFn: () => getUsers({ page, limit, search, filter }),
  });
  return (
    <>
      <section className="my-5">
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          <div>
            <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              Explore Users
            </h2>
            <p className="text-para text-sm w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?
            </p>
          </div>
          <div>
            <Suspense fallback={<p>...</p>}>
              <Filter />
            </Suspense>
          </div>
        </div>
        <div className=""></div>
        <main className="flex-[0.5] -mt-5 flex items-center flex-wrap  gap-6 p-6">
          {isLoading ? (
            <UserSkeleton />
          ) : data &&
            data.success &&
            data.response &&
            data.response.data.length > 0 ? (
            data.response.data.map((user: UserTypes) => (
              <UserCard data={user} key={user._id} />
            ))
          ) : (
            <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              No results found{" "}
            </h2>
          )}
        </main>
      </section>
      {data && data.success && data.response.pagination && (
        <Suspense fallback={<p>...</p>}>
          <Pagination data={data.response.pagination} />
        </Suspense>
      )}
    </>
  );
};

export default UserPage;
