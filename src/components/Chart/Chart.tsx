import { FC } from "react";
import { Gantt, Task, ViewMode } from "gantt-task-react";
import { Table } from "../Table";
import "./Chart.scss";

interface Props {
  tasks: Task[];
  viewMode: ViewMode;
  columnWidth: number;
  onDateChange: (task: Task) => void;
  onProgressChange: (task: Task) => Promise<void>;
  onExpanderClick: (task: Task) => void;
}

export const Chart: FC<Props> = ({
  tasks,
  viewMode,
  columnWidth,
  onDateChange,
  onProgressChange,
  onExpanderClick,
}) => (
  <div className="chart">
    <Gantt
      tasks={tasks}
      viewMode={viewMode}
      viewDate={new Date(2024)}
      onDateChange={onDateChange}
      onProgressChange={onProgressChange}
      onExpanderClick={onExpanderClick}
      columnWidth={columnWidth}
      listCellWidth=""
    />
  </div>
);
