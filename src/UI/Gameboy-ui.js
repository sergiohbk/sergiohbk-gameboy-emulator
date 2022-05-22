import { GameboyControls } from "./Gameboy-controls";
import { GameboyScreen } from "./Gameboy-screen";
import { GameboyTop } from "./Gameboy-top";

export function GameboyConsole(){
    return(
        <div className="container-gb">
            <GameboyTop />
            <GameboyScreen />
            <GameboyControls />
        </div>
    );
}