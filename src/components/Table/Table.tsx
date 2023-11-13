import { FC } from "react";
import { Task } from "gantt-task-react";
import { TbTableOptions } from "react-icons/tb";
import {
  PiCaretCircleDoubleDownLight,
  PiCaretCircleDownLight,
  PiCaretCircleUpLight,
} from "react-icons/pi";
import "./Table.scss";

interface Props {
  tasks: Task[];
}

export const Table: FC<Props> = ({ tasks }) => (
  <div className="table">
    <div className="table-header">
      <div className="names">
        <TbTableOptions size={20} className="icon" />
        <PiCaretCircleDoubleDownLight size={20} className="icon" />
        <span>ISH NOMI</span>
      </div>
      <div>MA'SUL XODIM</div>
      <div>HOLATI</div>
      <div>BOSHLANISH SANA</div>
      <div>TUGASH SANA</div>
    </div>
  </div>
);
