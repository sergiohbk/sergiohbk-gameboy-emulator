import { Cartridge } from "./cartridge";
import { INTERRUPT_ENABLE_REGISTER, MEMORY_SIZE } from "./variables/busConstants";
import { DIV_pointer } from "./timers";
import { DMA } from "./dma";
import { Controller } from "./controller";
import { IF_pointer } from "./interrumpts";
import { MBC } from "./mbc";

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
    }
    
    setRom(rom){
        this.cartridge = new Cartridge(rom);
        this.MBC = new MBC(this.cartridge, this);
    }

    write(address, value){
        if(address == DIV_pointer || address == IF_pointer){
            this.memory[address] = 0;
            return;
        }
        if(address == 0xff00){
            this.controller.write(value);
            return;
        }
        if(address == this.dma.DMA_pointer){
            this.dma.transfer();
        }
        if(address == INTERRUPT_ENABLE_REGISTER){
            this.memory[address] = value;
            return;
        }
        if(address <= 0x1FFF){
            this.MBC.enablingRam(value);
            return;
        }
        if(address >= 0x2000 && address < 0x3FFF){
            if(this.cartridge.MBC1){
                this.MBC.setTheRomBankNumber(value);
                return;
            }
            if(this.cartridge.MBC5){
                if(address >= 2000 && address < 0x3000){
                    this.MBC.setTheRomBankNumberMBC5(value, false);
                    return;
                }
                if(address >= 0x3000 && address < 0x4000){
                    this.MBC.setTheRomBankNumberMBC5(value, true);
                    return;
                }
            }

            if(this.cartridge.MBC3){
                this.MBC.setTheRomBankNumberMBC3(value);
                return;
            }
            return;
        }
        if(address >= 0x4000 && address < 0x5FFF){
            if(this.cartridge.MBC1){
                this.MBC.setTheRamBankNumber(value);
                return;
            }
            if(this.cartridge.MBC5){
                this.MBC.setTheRamBankNumberMBC5(value);
                return;
            }
            if(this.cartridge.MBC3){
                this.MBC.setTheRamBankNumberMBC3(value);
                return;
            }

            return;
        }
        if(address >= 0x6000 && address < 0x7FFF){
            if(this.cartridge.MBC1){
                this.MBC.setModeFlag(value);
                return;
            }
            return;
        }
        if(address >= 0xA000 && address < 0xBFFF){
            //escribiendo en la ram externa
            if(!this.MBC.externalRam)
                return;

            this.MBC.ramWrite(address, value);
        }
        if(address < 0x10000 && address >= 0x8000){
            this.memory[address] = value;
            return;
        }
        if(address > 0x10000){
            throw new Error("No se puede escribir en la direccion: " + address);
        }
    }
    read(address){
        if(address < 0x100){
            if(this.bootromActive)
                return this.memory[address];
        }

        if(address < 0x4000){
            if(this.cartridge.MBC1)
                return this.MBC.readRomBankZero(address);

            return this.cartridge.rom[address];
        }

        if(address > 0x3FFF && address < 0x8000){
            if(this.cartridge.MBC1 || this.cartridge.MBC5)
                return this.cartridge.rom[(address - 0x4000) + this.MBC.romBankNumber * 0x4000];
            
            return this.cartridge.rom[address];
        }

        if(address == 0xff00){
            this.memory[address] = this.controller.read();
            return this.memory[address];
        }

        if(address >= 0xA000 && address < 0xC000){
            if(!this.MBC.externalRam) return 0xFF;

            return this.MBC.ramRead(address);
        }
        
        if(address < 0x10000){
            return this.memory[address];
        }else{
            throw new Error("Error: address out of range " + address);
        }
    }
}