import React from "react";
import { store, loadGame } from "./Global";

export class Game extends React.Component{

    handleClick = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            store.dispatch(loadGame(reader.result));
            event.preventDefault();
        };
        reader.readAsArrayBuffer(file);
    }

    render(){
        return(
            <div className="Game">
                <input id="input" type="file" onChange={this.handleClick} accept=".gb" />
            </div>
        );
    }
}