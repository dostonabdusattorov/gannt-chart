import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useRef, useState } from "react";
import { initTasks } from "../../data";
import { getStartEndDateForProject } from "../../utils";
import { Header } from "../Header/Header";
import "./App.scss";

export const App = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [isFullScreen, setIsFullScreen] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  const resizeHandler = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      ref?.current?.parentElement?.parentElement?.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project =
        newTasks[newTasks.findIndex((t) => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map((t) =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="body" ref={ref}>
      <Header
        onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
        onResize={resizeHandler}
        isFullScreen={isFullScreen}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onExpanderClick={handleExpanderClick}
        columnWidth={60}
      />
    </div>
  );
};
