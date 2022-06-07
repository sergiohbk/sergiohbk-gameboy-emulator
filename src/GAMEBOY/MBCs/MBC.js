export class MBC{

    constructor(cartridge, bus){
        this.cartridge = cartridge;
        this.bus = bus;

        this.externalRAM = false;
        this.ROMbankSelect = 1;
        this.RAMbankSelect = 0;

        this.RAMbanks = [];

        this.inicializeRAM();
    }
    
    enableRAM(value){
        value = value & 0x0F;
        if (value == 0xA) {
            this.externalRAM = true;
        } else {
            this.externalRAM = false;
        }
    }
    inicializeRAM(){
        if(!this.cartridge.externalRAM) return;

        this.RAMbanks = new Array(this.cartridge.ram_size);

        for(let i = 0; i < this.cartridge.ram_size; i++){
            this.RAMbanks[i] = new Uint8Array(0x2000);
            this.RAMbanks[i].fill(0);
        }
    }
    ReadROM0(address){
        return this.cartridge.rom[address];
    }
    ReadROM1(address){
        return this.cartridge.rom[(address - 0x4000) + this.ROMbankSelect * 0x4000];
    }
    WriteRAM(value, address){
        if(!this.externalRAM) return;

        this.RAMbanks[this.RAMbankSelect][address - 0xA000] = value;
    }
    ReadRAM(address){
        if(!this.externalRAM) return;
        
        return this.RAMbanks[this.RAMbankSelect][address - 0xA000];
    }
}

