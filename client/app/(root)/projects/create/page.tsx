"use client";
import { createProject } from "@/API/project";
import { Heading } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/AuthProvider";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@/components/forms";
import { useRouter } from "next/navigation";

const CreateProject = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [passCode, setPassCode] = useState("");
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-projects", "projects", "users"],
      });
    },
  });
  const handleAdd = async () => {
    if (user.role !== "admin")
      return toast.error("You are not authorized to perform this action");

    if (!name) return toast.error("Project name is required");
    if (!desc) return toast.error("Project Description is required");
    if (!content) return toast.error("Project content is required");
    if (!passCode) return toast.error("Project passcode is required");
    if (passCode.length !== 6)
      return toast.error("Project passcode should be exactly 6 digits");

    const { success, response } = await mutateAsync({
      content: `"${content}"`,
      desc,
      name,
      passCode,
    });
    if (!success) return toast.error(response);
    toast.success("Project created");
    router.push("/")
  };

  return (
    <section className="my-5">
      <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-start md:gap-x-10">
        <Heading
          title="Create a new project"
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
            Add Project
          </Button>
        </div>
      </div>
      <main className="-mt-5 gap-6 p-6 max-w-4xl w-full">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-text">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter project name"
            className="bg-bg border-neutral-700 text-text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            name="username"
          />
        </div>

        <div className="space-y-2 my-4">
          <Label htmlFor="desc" className="text-text">
            Description
          </Label>
          <Textarea
            id="desc"
            placeholder="Enter project description"
            className="bg-bg border-neutral-700 text-text resize-none"
            value={desc}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDesc(e.target.value)
            }
            name="username"
          />
        </div>
        <div className="space-y-2 my-4">
          <Label htmlFor="passcode" className="text-text">
            Passcode
          </Label>
          <Input
            id="passcode"
            placeholder="Enter project login code"
            className="bg-bg border-neutral-700 text-text md:w-[80%]"
            value={passCode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassCode(e.target.value)
            }
            name="username"
          />
        </div>

        <div className="space-y-2 my-4">
          <Label htmlFor="content" className="text-text">
            Content
          </Label>
          <Editor value={content} setValue={setContent} />
        </div>
      </main>
    </section>
  );
};

export default CreateProject;
