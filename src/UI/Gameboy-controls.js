import './Gameboy-controls.css';

function Dpad(){
    return(
        <div className="D-pad">
            <div className="x axis">
                <Bands />
                <Bands />
            </div>
            <div className="y axis">
                <Bands />
                <Bands />
            </div>
            <div className="center axis">
                <div className="center-circle">
                </div>
            </div>
        </div>
    );
}

function Bands(){
    return(
        <div className="group">
            <div className="band"></div>
            <div className="band"></div>
            <div className="band"></div>
        </div>
    );
}

function Button(props){
    return(
        <div className={props.class}>
            <div className="name">
                {props.name}
            </div>
        </div>
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
                    <div className="button-group">
                        <Button name="B" class="btn" />
                        <Button name="A" class="btn" />
                    </div>
                </div>
            </div>
            <Speakers />
            <div className="option-buttons">
                <Button name="SELECT" class="btn-opt" />
                <Button name="START" class="btn-opt"/>
            </div>
            <div className="bottom">
                <div className="phones">
                🎧PHONES
                </div>
                <div className="decoration">
                </div>
            </div>
        </div>
    );
}