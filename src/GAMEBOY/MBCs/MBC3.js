import { MBC } from "./MBC";
import { RealTimeClock} from "./RTC";

export class MBC3 extends MBC {
    constructor(cartridge, bus) {
        super(cartridge, bus);

        this.realtimeclock = new RealTimeClock();
    }

    enableRAM(value) {
        value = value & 0x0F;
        if (value == 0xA) {
            this.externalRAM = true;
            this.realtimeclock.accessRTC = true;
        } else {
            this.externalRAM = false;
            this.realtimeclock.accessRTC = false;
        }
    }

    selectROMBank(value) {
        if(value === 0){this.ROMbankSelect = 1; return;}

        value &= 0x7F;
        this.ROMbankSelect = value;
    }
    selectRAMBank(value) {
        if(value <= 0x03){
            this.RAMbankSelect = value;
            this.realtimeclock.RTCselect = 0;
            return;
        }
        
        this.realtimeclock.selectRTC(value);
    }
    WriteRAM(value, address) {
        //log que imprima el address el value y el RTCselect

        if(this.realtimeclock.RTCselect > 0){
            this.realtimeclock.WriteRegister(value);
            return;
        }

        if(!this.cartridge.externalRAM) return;
        
        this.RAMbanks[this.RAMbankSelect][address - 0xA000] = value;
    }
    ReadRAM(address) {
        if(!this.externalRAM) return 0xFF;

        if(this.realtimeclock.RTCselect > 0){
            return this.realtimeclock.ReadRegister();
        }
            
        if(!this.cartridge.externalRAM) return 0xFF;
        
        return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
    }
}