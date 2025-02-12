import { memo } from "react";
import "./NavigationPanel.scss";

interface INavigationPanel {
  className: string;
}

function NavigationPanel({ className }: INavigationPanel) {
  return (
    <div className={`control_panel ${className ?? ""}`}>
      <button className={"nav_prev_" + className}>
        <span className="arrow_span" />
      </button>
      <button className={"nav_next_" + className}>
        <span className="arrow_span" />
      </button>
    </div>
  );
}

export default memo(NavigationPanel);
