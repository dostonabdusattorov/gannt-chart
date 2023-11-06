import React from "react";
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";
type HeaderProps = {
  isChecked: boolean;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};
export const Header: React.FC<HeaderProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
}) => {
  return (
    <div className="header">
      <div className="charts">
        <span>Smane</span>
        <span className="active">Gannt grafigi</span>
      </div>
      <div className="filter">
        <select
          name="filter"
          id="filter"
          onChange={(event) => {
            onViewModeChange(event.target.value as ViewMode);
          }}
        >
          <option value={ViewMode.Day} selected>
            Kun
          </option>
          <option value={ViewMode.Week} selected>
            Hafta
          </option>
          <option value={ViewMode.Month} selected>
            Oy
          </option>
        </select>
      </div>
    </div>
  );
};
