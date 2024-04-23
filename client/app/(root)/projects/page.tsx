import { AddProject } from "@/components/forms";
import { Filter, Pagination } from "@/components/helpers";
import { ProjectCard } from "@/components/shared";

const ProjectsPage = () => {
  return (
    <>
      <section className="my-5">
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          <div>
            <h2 className="sm:text-4xl text-2xl text-text font-semibold mb-1">
              Explore other projects
            </h2>
            <p className="text-para text-sm w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?
            </p>
          </div>
          <div className="flex gap-2">
            <Filter />
            <AddProject />
          </div>
        </div>
        <main className="flex-[0.5] -mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          <ProjectCard />
        </main>
      </section>
      {/* <Pagination /> */}
    </>
  );
};

export default ProjectsPage;
