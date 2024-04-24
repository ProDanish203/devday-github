"use client";
import { getMyProjects } from "@/API/project";
import { AddProject } from "@/components/forms";
import { Filter, Heading, Pagination } from "@/components/helpers";
import { ProjectCard } from "@/components/shared";
import { ProjectSkeleton, UserSkeleton } from "@/components/skeletons";
import { ProjectTypes } from "@/lib/types";
import { useAuth } from "@/store/AuthProvider";
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

export default function Dashboard({ searchParams }: SearchParams) {
  const { user } = useAuth();
  const { page, limit, search, filter } = searchParams;

  const { data, isLoading } = useQuery({
    queryKey: ["my-projects", page, limit, search, filter],
    queryFn: () => getMyProjects({ page, limit, search, filter }),
  });

  return (
    <>
      <section className="my-5">
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          <Heading
            title="Manage your projects"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?"
          />
          <div className="flex gap-2">
            <Suspense fallback={<p>...</p>}>
              <Filter />
            </Suspense>
            {user && user.role === "admin" && <AddProject />}
          </div>
        </div>
        <main className="flex-[0.5] -mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {isLoading ? (
            <ProjectSkeleton />
          ) : data &&
            data.success &&
            data.response &&
            data.response.data?.length > 0 ? (
            data.response.data.map((project: ProjectTypes) => (
              <ProjectCard data={project} key={project._id} />
            ))
          ) : (
            <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              No projects{" "}
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
}
