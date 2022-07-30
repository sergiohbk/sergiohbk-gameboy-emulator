import './App.css';
import { GameboyConsole } from './UI/Gameboy-ui';
import './UI/Gameboy-ui.css';
import React from 'react';
import { GAMEBOY } from './GAMEBOY/gb';
import { Game } from './UI/Game';
import { store } from './UI/Global';
import { VRAMdisplay } from './GAMEBOY/extras/VRAMdisplay';

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {game: false, running: false};
    this.colores = [[156, 160, 76], [129, 133, 53], [48, 98, 48], [15, 56, 15]];

    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      if(this.state.running){
        this.GAMEBOY.cpu.bus.mbcC.MBC.save();
      }
    });
  }

  render(){
    store.subscribe(() => {
      if(store.getState().game != null && !this.state.game){
        this.GAMEBOY.loadRom(store.getState().game);
        this.setState({game: true});
      }
      if(store.getState().turnOnGameboy){
        if(this.state.game && !this.state.running){
          this.GAMEBOY.cpu.bus.mbcC.MBC.load();
          this.GAMEBOY.run();
          this.VRAMdisplay = new VRAMdisplay(document.getElementById('VRAM-canvas'), this.GAMEBOY);
          this.setState({running: true});
          console.log("game started");
        }
      }
    });

    

    return (
      <div className="App">
        <div className="container">
          <GameboyConsole />
        </div>
        <div className="loads">
          <Game />
        </div>
        <div className="VRAM">
          <canvas id="VRAM-canvas" width="64" height="64"></canvas>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.GAMEBOY = new GAMEBOY(document.getElementById('screen-canvas'), this.colores);
  }
}
