import './App.css';
import { GameboyConsole } from './UI/Gameboy-ui';
import './UI/Gameboy-ui.css';
import React from 'react';
import { GAMEBOY } from './GAMEBOY/gb';
import { Game } from './UI/Game';
import { store } from './UI/Global';

export class App extends React.Component {

  constructor(props){
    super(props);
    this.state= {game: false, running: false};
    this.colores = [[156, 160, 76], [129, 133, 53], [48, 98, 48], [15, 56, 15]];
  }

  render(){
    store.subscribe(() => {
      if(store.getState().game != null && !this.state.game){
        this.GAMEBOY.loadRom(store.getState().game);
        this.state.game = true;
      }
      if(store.getState().turnOnGameboy){
        if(this.state.game && !this.state.running){
          this.GAMEBOY.run();
          this.state.running = true;
          console.log("game started");
        }
      }
    });

    return (
      <div className="App">
        <div className="container">
          <GameboyConsole />
        </div>
        <Game setGame={this.setGame} />
      </div>
    );
  }

  componentDidMount(){
    this.GAMEBOY = new GAMEBOY(document.getElementById('screen-canvas'), this.colores);
  }

  /* 
    añadir poder guardar partida, cargar partida, MBC3.
  */
}
