import { MBC } from "./MBC";

export class MBC1 extends MBC {
    constructor(cartridge, bus) {
        super(cartridge, bus);

        this.mode = 0;
        this.ZERObankSelect = 0;
        this.HIGHbankSelect = 0;
    }

    selectROMBank(value) {
        if(value === 0x00){this.ROMbankSelect = 1; return;}

        const MASK = this.getMask();
        value &= MASK;
        this.ROMbankSelect = value;

        if(this.mode !== 1) return;
        //comprobar si lo anterior se realiza
        if(this.cartridge.rom_size === 64)
            this.ROMbankSelect |= (value & 0x01) << 5;
        else if(this.cartridge.rom_size === 128)
            this.ROMbankSelect |= value << 5;
    }
    selectZERObank() {
        if(this.cartridge.rom_size < 64) return;

        if(this.cartridge.rom_size === 64)
            this.ZERObankSelect = (this.ROMbankSelect & 0x01) << 5;
        else if(this.cartridge.rom_size === 128)
            this.ZERObankSelect = (this.ROMbankSelect & 0x03) << 5;
    }
    selectHIGHbank() {
        if(this.cartridge.rom_size < 64)
            this.HIGHbankSelect = this.ROMbankSelect;
        else if(this.cartridge.rom_size === 64)
            this.HIGHbankSelect = this.ROMbankSelect | ((this.RAMbankSelect & 0x01) << 5);
        else if(this.cartridge.rom_size === 128)
            this.HIGHbankSelect = this.ROMbankSelect | ((this.RAMbankSelect & 0x03) << 5);
    }
    selectRAMBank(value) {
        value &= 0x03;
        this.RAMbankSelect = value;
    }
    getMask(){
        let mask = 0x00;
        switch(this.cartridge.rom_size){
            case 2:
                mask = 0x01;
                break;
            case 4:
                mask = 0x03;
                break;
            case 8:
                mask = 0x07;
                break;
            case 16:
                mask = 0x0F;
                break;
            case 32:
                mask = 0x1F;
                break;
            case 64:
                mask = 0x1F;
                break;
            case 128:
                mask = 0x1F;
                break;
        }
        return mask;
    }
    selectMode(value) {
        value &= 0x01;
        this.mode = value;
    }
    ReadROM0(address) {
        switch(this.mode){
            case 0:
                return this.cartridge.rom[address];
            case 1:
                this.selectZERObank();
                return this.cartridge.rom[this.ZERObankSelect * 0x4000 + address];      
        }
    }
    ReadROM1(address) {
        this.selectHIGHbank();
        return this.cartridge.rom[this.HIGHbankSelect * 0x4000 + (address - 0x4000)];
    }
    WriteRAM(value, address) {
        if(!this.externalRAM) return;
        switch(this.mode){
            case 0:
                this.RAMbanks[0][address - 0xA000] = value;
                break;
            case 1:
                this.RAMbanks[this.RAMbankSelect][address - 0xA000] = value;
                break;
        }
    }
    ReadRAM(address) {
        if(!this.externalRAM) return 0xFF;
        switch(this.mode){
            case 0:
                if(this.cartridge.ram_size < 4)
                    return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
                else
                    return this.RAMbanks[0][address - 0xA000];
            case 1:
                    return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
        }
    }
}