import { OAMstart } from "./variables/GPUConstants";

export class Sprite{
    constructor(position){
        this.address = OAMstart + position * 4;
    }
    getData(bus){
        this.y = bus.read(this.address);
        this.y -= 16;
        this.x = bus.read(this.address + 1);
        this.x -= 8;
        this.tileIndex = bus.read(this.address + 2);
        this.attributes = bus.read(this.address + 3);
        this.Xflip = (this.attributes & 0x20) >> 5;
        this.Yflip = (this.attributes & 0x40) >> 6;
        this.bgwnPriority = (this.attributes & 0x80) >> 7;
        this.palette = (this.attributes & 0x10) >> 4;
    }

    isThisSpriteExists(){
        //tecnicamente esta idea debe funcionar, ya que nunca estaria en pantalla en caso de si haber sprite
        if(this.y == -8 && this.x == -16 && this.tileIndex == 0 && this.attributes == 0){
            return false;
        }else{
            return true;
        }
    }
}