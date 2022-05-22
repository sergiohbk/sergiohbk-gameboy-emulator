import './Gameboy-top.css';

function CornerRight(){
    return(
        <div className="corner right">

        </div>
    );
}

function CornerLeft(){
    return(
        <div className="corner left">
            
        </div>
    );
}

function Symbols(){
    return(
        <div className="on-off-symbols">
            <span>◀ OFF - ON ▶</span>
        </div>
    );
}

export function GameboyTop(){
    return(
        <div className='container-top'>
            <CornerRight />
            <Symbols />
            <CornerLeft />
        </div>
    );
}