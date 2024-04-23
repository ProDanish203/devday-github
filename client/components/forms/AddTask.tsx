import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

export const AddTask = () => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
        <CardDescription>
          Create a new task and assign it to a team member.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="task-name">Task</Label>
            <Input id="task-name" placeholder="Enter task" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-assignee">Assignee</Label>
            {/* @ts-ignore */}
            <Select id="task-assignee">
              <SelectTrigger>
                <SelectValue placeholder="Select assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john">John Doe</SelectItem>
                <SelectItem value="jane">Jane Smith</SelectItem>
                <SelectItem value="bob">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-auto" type="submit">
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
