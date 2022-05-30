import "./Gameboy-turn-on.css";
import React from "react";
import { store, turnOnGameboy, turnOffGameboy } from "./Global";

export class GameboyTurnOn extends React.Component{
    constructor(props){
        super(props);
        this.turn = false;
    }

    handleClick = () => {
        this.turn = !this.turn;
        //this.props.gameboyOn(this.turn);
        if(this.turn){
            document.getElementById("power-button").classList.add("on");
            store.dispatch(turnOnGameboy());
        }else{
            document.getElementById("power-button").classList.remove("on");
            store.dispatch(turnOffGameboy());
        }
    }

    render(){
        return(
            <div id="power-button" className="power-button" onClick={this.handleClick}>
            </div>
        );
    }
}