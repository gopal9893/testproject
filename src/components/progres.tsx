import React from "react";
import { Props } from "../props/progress";
import { style } from "../styles/progress";

const Progress = (props: Props) => {
  const prog = props.progress <= 70 ? "#EA4848" : "#3CC39A";

  const circle = {
    position: "relative" as "relative",
    width: "7rem",
    height: "7rem",
    margin: "0.5rem",
    borderRadius: "50%",
    // backgroundColor: "red",
    overflow: "hidden",
    background: `conic-gradient(from 225.08deg at 50% 50%,${prog} ${
      (270 * props.progress) / 100 + "deg"
    }, rgba(255, 255, 255, 0.1) 0deg, rgba(230, 228, 231, 0.2) 0.04deg, rgba(230, 228, 231, 0.2) 360deg)`,
  };

  return (
    <div style={circle}>
      <div style={style.inner}>{props.progress}</div>
    </div>
  );
};

export default Progress;
