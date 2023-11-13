import { Gantt, Task, ViewMode } from "gantt-task-react";
import { useRef, useState } from "react";
import { initTasks } from "../../data";
import { getStartEndDateForProject } from "../../utils";
import { Header } from "../Header";
import { Chart } from "../Chart";
import "./App.scss";
import { Table } from "../Table";

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
    <div ref={ref}>
      <Header
        onViewModeChange={handleViewModeChange}
        onResize={handleResize}
        isFullScreen={isFullScreen}
      />
      <section className="body">
        <Table tasks={tasks} />
        <Chart
          tasks={tasks}
          viewMode={view}
          columnWidth={columnWidth}
          onDateChange={handleTaskChange}
          onProgressChange={handleProgressChange}
          onExpanderClick={handleExpanderClick}
        />
      </section>
    </div>
  );
};
