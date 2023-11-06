import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useRef, useState } from "react";
import { initTasks } from "../../data";
import { getStartEndDateForProject } from "../../utils";
import { Header } from "../Header/Header";
import "./App.scss";

const initialTasks: Task[] = initTasks();

export const App = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState(initialTasks);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [columnWidth, setColumnWidth] = useState(100);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleResize = () => {
    if (isFullScreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    } else {
      ref?.current?.parentElement?.parentElement?.requestFullscreen();
      setIsFullScreen(true);
    }
  };

  const handleViewModeChange = (viewMode: ViewMode) => {
    setView(viewMode);
    const columnWidth =
      viewMode === ViewMode.Day ? 100 : viewMode === ViewMode.Week ? 400 : 800;
    setColumnWidth(columnWidth);
  };

  const handleTaskChange = (task: Task) => {
    let newTasks = tasks.map((t) => {
      if (t.dependencies && t.dependencies.includes(task.id)) {
        return { ...t, start: task.end };
      }
      return t.id === task.id ? task : t;
    });

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
    const project = task.project;
    setTasks((prev) =>
      prev.map((t) => {
        if (project && t.id === project) {
          const progressAll = prev.reduce((acc, curr) => {
            if (curr.project === project && curr.id !== task.id) {
              console.log(curr);

              return acc + curr.progress;
            }

            return acc;
          }, 0);

          console.log(progressAll);

          return { ...t, progress: (task.progress + progressAll) / 2 };
        }
        if (t.dependencies && t.dependencies.includes(task.id)) {
          return { ...t, isDisabled: task.progress < 100 };
        }
        return t.id === task.id ? task : t;
      })
    );
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  return (
    <div className="body" ref={ref}>
      <Header
        onViewModeChange={handleViewModeChange}
        onResize={handleResize}
        isFullScreen={isFullScreen}
      />
      <Gantt
        tasks={tasks}
        viewMode={view}
        viewDate={new Date(2024)}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onExpanderClick={handleExpanderClick}
        columnWidth={columnWidth}
        listCellWidth=""
      />
    </div>
  );
};
