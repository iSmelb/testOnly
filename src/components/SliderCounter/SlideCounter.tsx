import { memo } from "react";
import "./slideCounter.scss";

export interface IAppProps {
  current: number;
  max: number;
  className?: string;
}

function SlideCounter({ className, current, max }: IAppProps) {
  return (
    <div className={`slide_counter ${className ?? ""}`}>
      <span className="current">0{current + 1}</span>
      {"/"}
      <span className="max">0{max}</span>
    </div>
  );
}

export default memo(SlideCounter);
