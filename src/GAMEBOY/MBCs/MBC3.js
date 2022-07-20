import { MBC } from "./MBC";
import { RealTimeClock} from "./RTC";

export class MBC3 extends MBC {
    constructor(cartridge, bus) {
        super(cartridge, bus);

        if(cartridge.timer)
            this.realtimeclock = new RealTimeClock();
    }

    enableRAM(value) {
        if (value === 0x0A) {
            this.externalRAM = true;
            if(this.cartridge.timer)
                this.realtimeclock.accessRTC = true;
        } else {
            this.externalRAM = false;
            if(this.cartridge.timer)
                this.realtimeclock.accessRTC = false;
        }
    }

    selectROMBank(value) {
        if(value === 0){
            this.ROMbankSelect = 1; 
            return;
        }

        this.ROMbankSelect = value & 0x7F;
    }
    selectRAMBank(value) {
        this.RAMbankSelect = value;
    }
    WriteRAM(value, address) {
        if (!this.externalRAM)
            return;

        if(this.RAMbanks.length === 0) {
            console.warn("MBC3: RAM banks are not initialized, game trying to write");
            return;
        }

        if(this.RAMbankSelect <= 0x03){
            this.RAMbanks[this.RAMbankSelect][address - 0xA000] = value;
        }
        else if (this.realtimeclock.accessRTC && this.RAMbankSelect >= 0x08 && this.RAMbankSelect <= 0x0C) {
            this.realtimeclock.WriteRegister(value, this.RAMbankSelect);
        }else{
            console.warn("MBC3: Trying to write to invalid RAM bank");
        }
    }
    ReadRAM(address) {
        if(!this.externalRAM) return 0xFF;

        if(this.RAMbanks.length === 0) {
            console.warn("MBC3: RAM banks are not initialized, game trying to read");
            return;
        }

        if(this.RAMbankSelect <= 0x03){
            return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
        }
        else if (this.realtimeclock.accessRTC && this.RAMbankSelect >= 0x08 && this.RAMbankSelect <= 0x0C) {
            return this.realtimeclock.ReadRegister(this.RAMbankSelect);
        }else{
            console.warn("MBC3: Trying to write to invalid RAM bank");
        }
    }
}