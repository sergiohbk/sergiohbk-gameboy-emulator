import React from "react";
import { store, loadGame } from "./Global";
import "./Game.css";

export class Game extends React.Component{

    handleClick = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            store.dispatch(loadGame(reader.result));
            event.preventDefault();
        };
        reader.readAsArrayBuffer(file);
        //arreglar error cuando cancelas subir archivo
    }

    render(){
        return(
            <div className="Game">
                <span>cargar el juego</span>
                <input id="input" type="file" onChange={this.handleClick} accept=".gb" />
            </div>
        );
    }
}