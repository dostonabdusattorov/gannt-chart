import { Task } from "gantt-task-react";

export interface Tasks extends Task {
  assignee: string;
}

export const initTasks = () => {
  const currentDate = new Date();
  const tasks: Tasks[] = [
    {
      start: new Date(2023, 10, 1),
      end: new Date(2023, 10, 10),
      name: "Project 1",
      assignee: "John Doe",
      id: "Project_1",
      progress: 45,
      type: "project",
      hideChildren: false,
    },
    {
      start: new Date(2023, 10, 1),
      end: new Date(2023, 10, 4),
      name: "Task 1.1",
      assignee: "John Doe",
      id: "Task_1.1",
      progress: 90,
      type: "task",
      project: "Project_1",
    },
    {
      start: new Date(2023, 10, 4),
      end: new Date(2023, 10, 10),
      name: "Task 1.2",
      assignee: "John Doe",
      id: "Task_1.2",
      progress: 0,
      dependencies: ["Task_1.1"],
      type: "task",
      project: "Project_1",
      isDisabled: true,
    },
    {
      start: new Date(2023, 10, 2),
      end: new Date(2023, 10, 9),
      name: "Project 2",
      assignee: "John Doe",
      id: "Project_2",
      progress: 45,
      type: "project",
      hideChildren: false,
    },
    {
      start: new Date(2023, 10, 2),
      end: new Date(2023, 10, 5),
      name: "Task 2.1",
      assignee: "John Doe",
      id: "Task_2.1",
      progress: 90,
      type: "task",
      project: "Project_2",
    },
    {
      start: new Date(2023, 10, 5),
      end: new Date(2023, 10, 9),
      name: "Task 2.2",
      assignee: "John Doe",
      id: "Task_2.2",
      progress: 0,
      dependencies: ["Task_2.1"],
      type: "task",
      project: "Project_2",
      isDisabled: true,
    },
    {
      start: new Date(2023, 10, 11),
      end: new Date(2023, 10, 13),
      name: "Review",
      assignee: "John Doe",
      id: "review",
      type: "task",
      progress: 0,
      dependencies: ["Project_1", "Project_2"],
    },
    {
      start: new Date(2023, 10, 15),
      end: new Date(2023, 10, 15),
      name: "Release",
      assignee: "John Doe",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["review"],
    },
    {
      start: new Date(2023, 10, 18),
      end: new Date(2023, 10, 19),
      name: "Party Time",
      assignee: "John Doe",
      id: "Task 9",
      progress: 0,
      isDisabled: true,
      type: "task",
    },
  ];
  return tasks;
};
