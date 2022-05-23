import './Gameboy-controls.css';

function Dpad(){
    return(
        <div className="D-pad">
        </div>
    );
}

function Button(props){
    return(
        <button className="button">
            {props.name}
        </button>
    );
}

function Speakers(){
    return(
        <div className="speakers">
        </div>
    );
}

export function GameboyControls (){
    return(
        <div className="container-controls">
            <div className="controls">
                <Dpad />
                <div className="buttons">
                    <Button name="B" />
                    <Button name="A" />
                </div>
            </div>
            <Speakers />
            <div className="option-buttons">
                <Button name="SELECT" />
                <Button name="START" />
            </div>
            <div className="bottom">
                <div className="phones">
                </div>
                <div className="decoration">
                </div>
            </div>
        </div>
    );
}