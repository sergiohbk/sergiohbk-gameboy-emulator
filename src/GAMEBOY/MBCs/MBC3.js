import { MBC } from "./MBC";
import { RealTimeClock} from "./RTC";

export class MBC3 extends MBC {
    constructor(cartridge, bus) {
        super(cartridge, bus);

        this.RTC = new RealTimeClock();
    }

    enableRAM(value) {
        value = value & 0x0F;
        if (value == 0xA) {
            this.externalRAM = true;
            this.RealTimeClock.accessRTC = true;
        } else {
            this.externalRAM = false;
            this.RealTimeClock.accessRTC = false;
        }
    }

    selectROMBank(value) {
        if(value === 0){this.ROMbankSelect = 1; return;}

        value = value & 0x7F;
        this.ROMbankSelect = value;
    }
    selectRAMBank(value) {
        if(value <= 0x03)
            this.RAMbankSelect = value;
        
        this.RealTimeClock.selectRTC(value);
    }
    WriteRAM(value, address) {
        if(!this.externalRAM) return;

        if(this.RealTimeClock.RTCselect !== 0)
            this.RealTimeClock.WriteRegister(value);
        else
            this.RAMbanks[this.RAMbankSelect][address - 0xA000] = value;
    }
    ReadRAM(address) {
        if(!this.externalRAM) return 0xFF;

        if(this.RealTimeClock.RTCselect !== 0)
            return this.RealTimeClock.ReadRegister();
        else
            return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
    }
}