"use client";
import { getProject } from "@/API/project";
import { AddMembers, AddProject, VerifyMember } from "@/components/forms";
import { Heading, Loader } from "@/components/helpers";
import { UserCard } from "@/components/shared";
import { useAuth } from "@/store/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const SingleProject = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: () => getProject(id),
  });

  return (
    <section className="my-5">
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
          {data && data.success && data.response && (
            <Heading
              title={data.response.name}
              desc={data.response.desc || ""}
            />
          )}
          {user && user.role === "admin" && (
            <div className="flex gap-2">
              <AddMembers id={id} />
              <AddProject />
            </div>
          )}
          {user &&
            user.role === "member" &&
            data &&
            data.response.members.some(
              (member: any) =>
                member.user._id === user._id && member.status === "pending"
            ) && <VerifyMember id={id} />}
        </div>
      )}

      {data && data.success && data.response && (
        <div className="-mt-5 p-6">
          <div
            className="bg-[#181717] text-white rounded-md md:p-6 p-4 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: data.response.content || "" }}
          />
          {data.response.members.length > 0 && (
            <div className="mt-5">
              <Heading
                desc="The members that are contributing to this project are as follows:"
                title="Members"
              />
              <div className="flex-[0.5] flex items-center flex-wrap gap-6 py-6">
                {data.response.members.map((user: any, idx: number) => (
                  <UserCard
                    data={user.user}
                    status={user.status}
                    key={user._id}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SingleProject;
