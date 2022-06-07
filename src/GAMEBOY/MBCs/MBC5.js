import { MBC } from "./MBC";

export class MBC5 extends MBC {
    constructor(cartridge, bus) {
        super(cartridge, bus);
    }

    selectROMBank(value, address) {
        if(address <= 0x2FFF)
            this.ROMbankSelect = (this.ROMbankSelect & 0x100) | (value & 0xFF);
        else
            this.ROMbankSelect = (this.ROMbankSelect & 0xFF) | ((value & 0x01) << 8);
    }

    selectRAMBank(value) {
        this.RAMbankSelect = value;
    }
}