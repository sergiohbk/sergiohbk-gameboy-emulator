import "./App.css";
import { GameboyConsole } from "./UI/Gameboy-ui";
import "./UI/Gameboy-ui.css";
import React from "react";
import { GAMEBOY } from "./GAMEBOY/gb";
import { Game } from "./UI/Game";
import { store } from "./UI/Global";
import { Modal } from "./UI/Modal";
import { VRAMdisplay } from "./GAMEBOY/extras/VRAMdisplay";
import DeveloperMode from "./UI/DeveloperMode";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  devmode: state.devmode,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { game: false, running: false, debug: false };
    this.colores = [
      [156, 160, 76],
      [129, 133, 53],
      [48, 98, 48],
      [15, 56, 15],
    ];

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      if (this.state.running) {
        this.GAMEBOY.cpu.bus.mbcC.MBC.save();
      }
    });
  }

  render() {
    store.subscribe(() => {
      if (store.getState().game != null && !this.state.game) {
        this.GAMEBOY.loadRom(store.getState().game);
        this.setState({ game: true });
      }
      if (store.getState().turnOnGameboy) {
        if (this.state.game && !this.state.running) {
          this.GAMEBOY.cpu.bus.mbcC.MBC.load();
          this.GAMEBOY.run();
          this.setState({ running: true });
          console.log("game started");

          if (this.state.debug)
            setInterval(() => {
              this.Vramdisplay.drawVram();
            }, 1000);
        }
      }
    });

    return (
      <main>
        <Modal />
        {!this.props.devmode ? (
          <GameboyConsole />
        ) : (
          <DeveloperMode></DeveloperMode>
        )}
        <Game />
      </main>
    );
  }

  componentDidMount() {
    this.GAMEBOY = new GAMEBOY(
      document.getElementById("screen-canvas"),
      this.colores
    );
    if (this.state.debug)
      this.Vramdisplay = new VRAMdisplay(
        document.getElementById("vram"),
        this.GAMEBOY
      );
  }
}

export default connect(mapStateToProps)(App);
