"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export const AddProject = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="max-xs:w-full">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-bg border-neutral-700">
        <DialogHeader>
          <DialogTitle className="text-text">Add Project</DialogTitle>
          <DialogDescription className="text-para">
            Add a new project
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="name" className="text-text">
              Project Name
            </Label>
            <Input
              id="name"
              className="col-span-3 bg-bg/80 text-text border-neutral-700"
              placeholder="Project name"
            />
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="description" className="text-text">
              Project description
            </Label>
            <Textarea
              id="description"
              className="bg-bg/80 text-text border-neutral-700 resize-none"
              placeholder="A brief description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-text text-bg hover:bg-text/90 active:scale-[0.99]"
          >
            Add Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
