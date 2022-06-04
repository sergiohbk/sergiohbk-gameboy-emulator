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
        <div className="loads">
          <Game />
          <div className='save'>
            <span>antes de cerrar la pagina, recuerda guardar la partida </span>
            <button onClick={this.handleSave}>Guardar partida</button>
          </div>
          <div className='load'>
            <span>antes de iniciar el juego, puedes cargar tu partida guardada ↦ </span>
            <input id='input-sav' type="file" onChange={this.handleClick} accept=".sav" />
          </div>
        </div>
      </div>
    );
  }

  handleClick = (event) => {
    if(this.state.running) return;
    if(!this.state.game) return;

    try{
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.load(reader.result);
    };
    reader.readAsArrayBuffer(file);
    }catch(e){
      console.log(e);
    }
  }

  handleSave = () => {
    if(!this.state.running) return;
    if(!this.state.game) return;

    this.GAMEBOY.cpu.bus.MBC.save();
  }

  componentDidMount(){
    this.GAMEBOY = new GAMEBOY(document.getElementById('screen-canvas'), this.colores);
  }

  load(data){
    this.GAMEBOY.cpu.bus.MBC.load(data);
  }
}
