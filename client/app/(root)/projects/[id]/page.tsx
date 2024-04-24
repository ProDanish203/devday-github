"use client";
import { getProject } from "@/API/project";
import { AddMembers, AddProject, VerifyMember } from "@/components/forms";
import { Heading, Loader } from "@/components/helpers";
import { UserCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { GitBranch, PlusIcon } from "lucide-react";
import Link from "next/link";

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
                member.user._id === user?._id && member.status === "pending"
            ) && <VerifyMember id={id} />}
        </div>
      )}

      {data && data.success && data.response && (
        <div className="-mt-5 p-6">
          <div
            className="bg-[#181717] text-white rounded-md md:p-6 p-4 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: data.response.content || "" }}
          />
          {user?._id === data?.response.admin._id ||
          data?.response.members.some(
            (member: any) =>
              member.user._id === user._id && member.status !== "pending"
          ) ? (
            <div className="mt-5">
              <Heading
                title="Settings"
                desc="Create a new version of the project or roll back to any previous version"
              />
              <div className="my-10 flex gap-x-2 items-center">
                <Link href={`/projects/${data.response._id}/update`}>
                  <Button size="sm" variant="outline" className="max-xs:w-full">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    New Version
                  </Button>
                </Link>
                {data.response.children?.length > 0 && (
                  <Link href={`/projects/${data.response._id}/branches`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="max-xs:w-full"
                    >
                      <GitBranch className="h-4 w-4 mr-2" />
                      View Branches
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : null}

          {/* All Members */}
          {data.response.members.length > 0 && (
            <div className="mt-5">
              <Heading
                title="Members"
                desc="The members that are contributing to this project are as follows:"
              />
              <div className="flex-[0.5] flex items-center flex-wrap gap-6 py-6">
                <UserCard data={data.response.admin} status="admin" />
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
