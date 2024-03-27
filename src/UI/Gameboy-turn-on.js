import "./Gameboy-turn-on.css";
import React from "react";
import { store, turnOnGameboy, turnOffGameboy } from "./Global";

export class GameboyTurnOn extends React.Component {
  constructor(props) {
    super(props);
    this.turn = false;
  }

  handleClick = () => {
    this.turn = !this.turn;
    const powerbutton = document.getElementById("power-button");
    if (this.turn) {
      powerbutton.classList.add("on");
      powerbutton.title = "Apagar Gameboy";
      store.dispatch(turnOnGameboy());
    } else {
      powerbutton.classList.remove("on");
      powerbutton.title = "Encender Gameboy";
      store.dispatch(turnOffGameboy());
    }
  };

  render() {
    return (
      <div
        id="power-button"
        className="power-button"
        title="Encender Gameboy"
        onClick={this.handleClick}
      ></div>
    );
  }
}
