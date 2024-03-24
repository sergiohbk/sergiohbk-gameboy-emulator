import React from "react";
import { store, loadGame, devModeActivate, devModeDeactivate } from "./Global";
import "./Game.css";

export class Game extends React.Component {
  handleClick = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      store.dispatch(loadGame(reader.result));
      event.preventDefault();
    };
    reader.readAsArrayBuffer(file);
    //arreglar error cuando cancelas subir archivo
  };

  handleReference = () => {
    document.getElementById("input").click();
  };

  handleDevMode = () => {
    if (!store.getState().devmode) {
      store.dispatch(devModeActivate());
      document.getElementById("devmode-btn").classList.add("dev-active");
    } else {
      store.dispatch(devModeDeactivate());
      document.getElementById("devmode-btn").classList.remove("dev-active");
    }
  };

  render() {
    return (
      <main>
        <input
          id="input"
          type="file"
          onChange={this.handleClick}
          accept=".gb"
          className="input"
        />

        <button
          onClick={this.handleReference}
          className="margin custom-btn btn-3"
        >
          <span>Cargar juego</span>
        </button>

        <button
          onClick={this.handleDevMode}
          id="devmode-btn"
          className="margin custom-btn btn-3"
        >
          <span>Developer Mode</span>
        </button>
      </main>
    );
  }
}
