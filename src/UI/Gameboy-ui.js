import { GameboyControls } from "./Gameboy-controls";
import { GameboyScreen } from "./Gameboy-screen";
import { GameboyTop } from "./Gameboy-top";
import { GameboyTurnOn } from "./Gameboy-turn-on";

/*///////////////////////
/////////////////////////
////Gameboy  Emulator////
/////By Sergio-hbk///////
/////////////////////////
////////////////////////*/

export function GameboyConsole(){
    return(
        <div className="container-gb">
            <GameboyTurnOn />
            <GameboyTop />
            <GameboyScreen />
            <GameboyControls />
        </div>
    );
}