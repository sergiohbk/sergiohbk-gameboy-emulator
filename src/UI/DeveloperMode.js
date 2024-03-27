import React from "react";
import "./Gameboy-screen.css";

const DeveloperMode = ({ id, className }) => {
  return (
    <div>
      <LCD id={"lcd1"}></LCD>
    </div>
  );
};

const LCD = ({ id, className }) => {
  return (
    <div className={`screen screen-centering ${className || ""}`}>
      <canvas id={id} className="lcd-drop-shadow"></canvas>
    </div>
  );
};

export default DeveloperMode;
