import './Gameboy-controls.css';
import {store}  from './Global';

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
            <div className="non-speaker">
            </div>
            <div className="speaker">
            </div>
            <div className="speaker">
            </div>
            <div className="speaker">
            </div>
            <div className="speaker">
            </div>
            <div className="speaker">
            </div>
        </div>
    );
}

export function GameboyControls (){
    store.subscribe(() => {
        if(store.getState().BkeyPressed){
            document.getElementsByName("B").classList.add("pressed");
        }
        else{
            document.getElementsByName("B").classList.remove("pressed");
        }
        if(store.getState().AkeyPressed){
            document.getElementsByName("A").classList.add("pressed");
        }
        else{
            document.getElementsByName("A").classList.remove("pressed");
        }
    }
    );

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
                <div className="opt-container">
                    <Button name="SELECT" class="btn-opt" />
                </div>
                <div className="opt-container">
                    <Button name="START" class="btn-opt"/>
                </div>
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