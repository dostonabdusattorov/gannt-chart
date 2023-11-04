import {
  Gantt,
  Task,
  EventOption,
  StylingOption,
  ViewMode,
  DisplayOption,
} from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useState } from "react";

let tasksInit: Task[] = [
  {
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 2),
    name: "Idea",
    id: "Task 0",
    type: "task",
    progress: 45,
    isDisabled: true,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
  },
  {
    start: new Date(2020, 1, 1),
    end: new Date(2020, 1, 2),
    name: "Idea",
    id: "Task 1",
    type: "task",
    progress: 45,
    isDisabled: true,
    styles: { progressColor: "#ffbb54", progressSelectedColor: "#ff9e0d" },
    dependencies: ["Task 0"],
  },
];

function App() {
  const [tasks, setTasks] = useState(tasksInit);
  return (
    <div>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        onClick={(task: Task) => {
          console.log("click", task);

          setTasks((prev) => {
            return prev.map((el: Task) => {
              if (el.id === task.id) {
                return { ...el, progress: el.progress + 1 };
              }

              return el;
            });
          });
        }}
        onSelect={(task: Task) => {
          console.log("select", task);
        }}
        onProgressChange={(task: Task) => {
          console.log("progress change", task);
        }}
        onExpanderClick={(task: Task) => {
          console.log("expander click", task);
        }}
      />
    </div>
  );
}

export default App;
