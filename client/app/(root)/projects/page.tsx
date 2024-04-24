"use client";
import { getAllProjects } from "@/API/project";
import { AddProject } from "@/components/forms";
import { Filter, Heading, Pagination } from "@/components/helpers";
import { ProjectCard } from "@/components/shared";
import { UserSkeleton } from "@/components/skeletons";
import { ProjectTypes } from "@/lib/types";
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

const ProjectsPage = ({ searchParams }: SearchParams) => {
  const { page, limit, search, filter } = searchParams;

  const { data, isLoading } = useQuery({
    queryKey: ["projects", page, limit, search, filter],
    queryFn: () => getAllProjects({ page, limit, search, filter }),
  });

  return (
    <>
      <section className="my-5">
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          <Heading
            title="Explore other projects"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?"
          />
          <div className="flex gap-2">
            <Suspense fallback={<p>...</p>}>
              <Filter />
            </Suspense>
            <AddProject />
          </div>
        </div>
        <main className="flex-[0.5] -mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {isLoading ? (
            <UserSkeleton />
          ) : data &&
            data.success &&
            data.response &&
            data.response.data?.length > 0 ? (
            data.response.data.map((project: ProjectTypes) => (
              <ProjectCard data={project} key={project._id} />
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

export default ProjectsPage;
