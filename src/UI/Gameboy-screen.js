import './Gameboy-screen.css';

export function GameboyScreen(){
    return(
        <div className="container-screen">
            <div className="screen">
                <div className="lcd">
                </div>
            </div>
            <div className="nintendo">
                <span className="nintendo-logo">Nintendo </span>
                <span className="model">GAME BOY</span>
                <sub className="model-sub">™</sub>
            </div>
        </div>
    );
}