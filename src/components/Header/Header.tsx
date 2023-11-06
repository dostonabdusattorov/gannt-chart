import React from "react";
import { ViewMode } from "gantt-task-react";
import { HiMiniArrowsPointingOut } from "react-icons/hi2";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import "gantt-task-react/dist/index.css";
import "./Header.scss";

interface HeaderProps {
  onViewModeChange: (viewMode: ViewMode) => void;
  onResize: () => void;
  isFullScreen: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onViewModeChange,
  onResize,
  isFullScreen,
}) => {
  return (
    <header className="header">
      <div className="charts">
        <span>Smana</span>
        <span className="active">Gannt grafigi</span>
      </div>
      <div className="filter_resizer">
        <select
          name="filter"
          id="filter"
          onChange={(event) => {
            onViewModeChange(event.target.value as ViewMode);
          }}
        >
          <option value={ViewMode.Day}>Kun</option>
          <option value={ViewMode.Week}>Hafta</option>
          <option value={ViewMode.Month}>Oy</option>
        </select>
        <span onClick={onResize}>
          {isFullScreen ? (
            <HiMiniArrowsPointingIn className="resizer" size={25} />
          ) : (
            <HiMiniArrowsPointingOut className="resizer" size={25} />
          )}
        </span>
      </div>
    </header>
  );
};
