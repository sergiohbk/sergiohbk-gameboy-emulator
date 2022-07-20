import { Cartridge } from "./cartridge";
import { INTERRUPT_ENABLE_REGISTER, MEMORY_SIZE } from "./variables/busConstants";
import { DIV_pointer} from "./timers";
import { DMA } from "./dma";
import { Controller } from "./controller";
import { IF_pointer } from "./interrumpts";
import { MBCcontroller } from "./MBCs/MBCcontroller";

export class Bus{
    // 16 bit address bus
    // contenido de la memoria
    // 0x0000 - 0x3FFF : ROM Bank 0
    // 0x4000 - 0x7FFF : ROM Bank 1 - Cambiable
    // 0x8000 - 0x97FF : Character RAM
    // 0x9800 - 0x9BFF : BG Map 1
    // 0x9C00 - 0x9FFF : BG Map 2
    // 0xA000 - 0xBFFF : Cartridge RAM
    // 0xC000 - 0xCFFF : RAM Bank 0
    // 0xD000 - 0xDFFF : RAM Bank 1-7 - Cambiable - Solo Gameboy Color
    // 0xE000 - 0xFDFF : Prohibido - Echo RAM
    // 0xFE00 - 0xFE9F : OAM memory
    // 0xFEA0 - 0xFEFF : No usable
    // 0xFF00 - 0xFF7F : I/O Registros
    // 0xFF80 - 0xFFFE : Zero Page
    constructor(){
        this.memory = new Uint8Array(MEMORY_SIZE);
        this.bootromActive = false;
        this.dma = new DMA(this);
        this.controller = new Controller(this);
        for(let i = 0x100; i < 0x8000; i++){
            this.memory[i] = 0xFF;
        }
        this.IME = false;
        this.requestIME = false;
    }
    
    setRom(rom){
        this.cartridge = new Cartridge(rom);
        this.mbcC = new MBCcontroller(this.cartridge, this);
    }

    write(address, value){
        
        if(address <= 0x1FFF){
            this.mbcC.enabelingRAM(value);
            return;
        }
        if(address >= 0x2000 && address <= 0x3FFF){
            this.mbcC.romBanking(value, address);
            return;
        }
        if(address >= 0x4000 && address <= 0x5FFF){
            this.mbcC.ramBanking(value);
            return;
        }
        if(address >= 0x6000 && address <= 0x7FFF){
            this.mbcC.optionSelect(value);
            return;
        }
        if(address >= 0xA000 && address <= 0xBFFF){
            this.mbcC.writeRAM(value, address);
            return;
        }
        if(address === DIV_pointer ){
            this.memory[address] = 0;
            return;
        }
        if(address === IF_pointer){
            this.memory[address] = value;
            return;
        }
        if(address === INTERRUPT_ENABLE_REGISTER){
            this.memory[address] = value;
            return;
        }
        if(address === 0xFF00){
            this.controller.write(value);
            return;
        }
        if(address === this.dma.DMA_pointer){
            this.dma.transfer();
            this.memory[address] = value;
            return;
        }
        if(address >= 0x8000 && address <= 0xFFFF){
            this.memory[address] = value;
        }
        else{
            throw new Error("Error: address out of range " + address.toString(16) + " " + value.toString(16));
        }
    }
    read(address){
        if (address <= 0xFF){
            if(this.bootromActive)
                return this.memory[address];
        }
        if(address <= 0x3FFF){
            return this.mbcC.readROM0(address);
        }            
        if(address <= 0x7FFF){
            return this.mbcC.readROM1(address);
        }
        if(address >= 0xA000 && address <= 0xBFFF){
            return this.mbcC.readRAM(address);
        }
        if(address === 0xFF00){
            return this.memory[address] = this.controller.read();
        }
        if(address >= 0x8000 && address <= 0xFFFF){
            return this.memory[address];
        }
        else{
            throw new Error("Error: address out of range " + address.toString(16));
        }
    }
}