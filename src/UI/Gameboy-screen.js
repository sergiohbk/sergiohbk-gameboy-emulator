import './Gameboy-screen.css';


function Screenbattery(){
    return(
        <div className="screen-battery">
            <div className="led">
            </div>
            <div className="screen-battery-text">
                BATTERY
            </div>
        </div>
    );
}

function Screen(){
    return(
        <div className="screen">
            <div className="screen-top">
                <div className="screen-top-stripes">
                </div>
                <span>DOT MATRIX WITH STEREO SOUND</span>
            </div>
            <div className="screen-bottom">
                <Screenbattery />
                <div className="lcd">
                </div>
            </div>
        </div>
    );
    //sustituir div por canvas
}

export function GameboyScreen(){
    return(
        <div className="container-screen">
            <Screen />
            <div className="nintendo">
                <span className="nintendo-logo">Nintendo</span>
                <span className="model">GAME BOY</span>
                <span className="model-sub">™</span>
            </div>
        </div>
    );
}