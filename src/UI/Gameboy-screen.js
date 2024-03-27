import { useEffect } from "react";
import "./Gameboy-screen.css";
import { useSelector } from "react-redux";

function Screenbattery() {
  return (
    <div className="screen-battery">
      <div id="led" className="led"></div>
      <div className="screen-battery-text">BATTERY</div>
    </div>
  );
}

function Screen() {
  return (
    <div className="screen">
      <div className="screen-top">
        <div className="screen-top-stripes"></div>
        <span>DOT MATRIX WITH STEREO SOUND</span>
      </div>
      <div className="screen-bottom">
        <Screenbattery />
        <div className="css-inutil">
          <div className="lcd-shadow"></div>
          <canvas id="screen-canvas"></canvas>
        </div>
      </div>
    </div>
  );
}

export function GameboyScreen() {
  const ledState = useSelector((state) => state.turnOnGameboy);

  useEffect(() => {
    const ledElement = document.getElementById("led");
    if (ledElement) {
      if (ledState) {
        ledElement.classList.add("on");
      } else {
        ledElement.classList.remove("on");
      }
    }
  }, [ledState]);

  return (
    <div className="container-screen">
      <Screen />
      <div className="nintendo">
        <span className="nintendo-logo">Nintendo</span>
        <span className="model">GAME BOY</span>
        <span className="model-sub">™</span>
      </div>
    </div>
  );
}
