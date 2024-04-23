"use client";
import { AddProject } from "@/components/forms";
import { Filter, Pagination } from "@/components/helpers";
import { ProjectCard } from "@/components/shared";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <section className="my-5">
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          <div>
            <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              Manage your projects
            </h2>
            <p className="text-para text-sm w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?
            </p>
          </div>
          <div className="flex gap-2">
            <Suspense>
              <Filter />
            </Suspense>
            <AddProject />
          </div>
        </div>
        <main className="flex-[0.5] -mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </main>
      </section>
      {/* <Pagination /> */}
    </>
  );
}
