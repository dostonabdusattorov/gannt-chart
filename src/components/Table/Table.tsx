import { FC } from "react";
import { TbTableOptions } from "react-icons/tb";
import { PiCaretCircleDoubleDownLight, PiRows } from "react-icons/pi";
import "./Table.scss";
import { Tasks } from "../../data";

interface Props {
  tasks: Tasks[];
  onStatusChange: (
    id: string,
    value: string,
    project: string | undefined
  ) => void;
}

export const Table: FC<Props> = ({ tasks, onStatusChange }) => (
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
    <div className="table-body">
      {tasks.map(
        ({
          id,
          name,
          assignee,
          start,
          end,
          progress,
          project,
          type,
          isDisabled,
        }) => (
          <div className="table-row" key={id}>
            <div>{name}</div>
            <div>{assignee}</div>
            <div>
              <select
                id="status"
                value={
                  progress === 100
                    ? "1"
                    : progress < 100 && progress > 0
                    ? "0"
                    : "-1"
                }
                disabled={isDisabled || type === "project"}
                className={
                  progress === 100
                    ? "bajarildi"
                    : progress < 100 && progress > 0
                    ? "bajarilmoqda"
                    : "ochiq"
                }
                onChange={(event) =>
                  onStatusChange(id, event.target.value, project)
                }
              >
                <option value="0">Bajarilmoqda</option>
                <option value="-1"> Ochiq</option>
                <option value="1">Bajarildi</option>
              </select>
            </div>
            <div>
              {`${start.getDate()} ${start.toLocaleString("default", {
                month: "long",
              })} ${start.getFullYear()}`}
            </div>
            <div>
              {`${end.getDate()} ${end.toLocaleString("default", {
                month: "long",
              })} ${end.getFullYear()}`}
            </div>
          </div>
        )
      )}
    </div>
  </div>
);
