import { MBC } from "./MBC";

export class MBC5 extends MBC {

    selectROMBank(value, address) {
        console.log("MBC5 selectROMBank " + value + " " + address.toString(16));

        if(address <= 0x2FFF){
            this.ROMbankSelect = (this.ROMbankSelect & 0x100) | value;
        }
        else{
            this.ROMbankSelect = (this.ROMbankSelect & 0xFF) | ((value & 0x01) << 8);
        }

        console.log(`MBC5: ROM bank select: ${this.ROMbankSelect}`);
    }

    selectRAMBank(value) {
        this.RAMbankSelect = value & 0x0F;
    }
}