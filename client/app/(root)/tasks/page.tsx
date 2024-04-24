"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { AddTask } from "@/components/forms";
import { Trash } from "lucide-react";
import { useAuth } from "@/store/AuthProvider";
import { Heading } from "@/components/helpers";

const Task = () => {
  return (
    <div className="flex gap-y-2 flex-col items-start">
      <div>
        <div className="flex items-center gap-2">
          <Checkbox id="task-1" />
          <label className="text-sm font-medium" htmlFor="task-1">
            Finish website design
          </label>
        </div>
      </div>
      <Badge variant="outline" className="border-neutral-500 text-neutral-800">
        Assigned to @danish
      </Badge>
    </div>
  );
};

const CompletedTask = () => {
  return (
    <div className="flex gap-y-2 flex-col items-start">
      <div className="flex items-center gap-x-2 justify-between">
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked id="task-4" className="self-start mt-1" />
          <label className="text-sm font-medium line-through" htmlFor="task-4">
            Set up project management tool management
          </label>
        </div>
        <div className="flex items-center self-start gap-2">
          <Badge variant="default" className="bg-bg text-[10px]">
            Completed
          </Badge>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-2 w-full">
        <Badge
          variant="outline"
          className="border-neutral-500 text-neutral-800"
        >
          Assigned to @danish
        </Badge>
        <Button variant="outline" size="icon">
          <Trash className="size-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

const TasksPage = () => {
  const { user } = useAuth();
  return (
    <section className="my-5">
      <div className="p-6 flex max-md:flex-col md:items-center gap-y-5 justify-between">
        <Heading
          title="Manage Tasks"
          desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
            dolore?"
        />
      </div>
      <main className="flex-1 flex flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Remaining Tasks</CardTitle>
              <CardDescription>
                Tasks that are still in progress or not yet completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 max-h-[500px] overflow-y-auto">
                <Task />
                <Task />
                <Task />
                <Task />
              </div>
            </CardContent>
          </Card>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>
                Tasks that have been marked as completed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 max-h-[500px] overflow-y-auto">
                <CompletedTask />
                <CompletedTask />
              </div>
            </CardContent>
          </Card>
          {user && user.role === "admin" && <AddTask />}
        </div>
      </main>
    </section>
  );
};

export default TasksPage;
