import { GameboyControls } from "./Gameboy-controls";
import { GameboyScreen } from "./Gameboy-screen";
import { GameboyTop } from "./Gameboy-top";

/*///////////////////////
/////////////////////////
////Gameboy  Emulator////
/////By Sergio-hbk///////
/////////////////////////
////////////////////////*/

export function GameboyConsole(){
    return(
        <div className="container-gb">
            <GameboyTop />
            <GameboyScreen />
            <GameboyControls />
        </div>
    );
}