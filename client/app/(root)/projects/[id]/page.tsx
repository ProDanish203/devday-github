"use client";
import { getProject } from "@/API/project";
import { AddMembers } from "@/components/forms";
import { Heading } from "@/components/helpers";
import { useQuery } from "@tanstack/react-query";

const SingleProject = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data, isLoading } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: () => getProject(id),
  });

  return (
    <section className="my-5">
      <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
        {isLoading ? (
          <p className="text-white text-2xl font-bold p-6">Loading...</p>
        ) : (
          data &&
          data.success &&
          data.response && (
            <Heading
              title={data.response.name}
              desc={data.response.desc || ""}
            />
          )
        )}

        <div className="flex gap-2">
          <AddMembers />
        </div>
      </div>
      {isLoading ? (
        <p className="text-white text-2xl font-bold p-6">Loading...</p>
      ) : (
        data &&
        data.success &&
        data.response && <main className="-mt-5 p-6"></main>
      )}
    </section>
  );
};

export default SingleProject;
