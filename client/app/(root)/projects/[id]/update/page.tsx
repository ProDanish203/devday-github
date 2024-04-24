"use client";
import { createBranch, createProject, getProject } from "@/API/project";
import { Heading, Loader } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/AuthProvider";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Editor } from "@/components/forms";
import { useRouter } from "next/navigation";

const UpdateProject = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { user } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [`project-${id}`],
    queryFn: () => getProject(id),
  });

  useEffect(() => {
    if (data && data.success && data.response)
      setContent(data.response.content);
  }, [data]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createBranch,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-projects", "projects", "users"],
      });
    },
  });

  const handleAdd = async () => {
    const isAuthorized =
      user._id === data?.response.admin._id ||
      data?.response.members.some(
        (member: any) =>
          member.user._id === user._id && member.status !== "pending"
      );
    if (!isAuthorized)
      return toast.error("You are not authorized to perform this action");

    if (!content) return toast.error("Project content is required");

    const { success, response } = await mutateAsync({
      id,
      content: `"${content}"`,
    });
    if (!success) return toast.error(response);
    toast.success("Project updated");
    router.push("/");
  };

  return (
    <section className="my-5">
      {isLoading ? (
        <div className="flex min-h-[50vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-start md:gap-x-10">
            <Heading
              title="Update project"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
              dolore?"
            />
            <div className="flex gap-2">
              <Button
                disabled={isPending}
                size="sm"
                variant="outline"
                className="max-xs:w-full"
                onClick={handleAdd}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Create version
              </Button>
            </div>
          </div>
          <main className="-mt-5 gap-6 p-6 max-w-4xl w-full">
            <div className="space-y-2 my-4">
              <Label htmlFor="content" className="text-text">
                Content
              </Label>
              <Editor value={content} setValue={setContent} />
            </div>
          </main>
        </>
      )}
    </section>
  );
};

export default UpdateProject;
