export class MBC {
    constructor(rom, bus){
        this.cartridge = rom;
        this.bus = bus;
        this.ramBankNumber = 0;
        this.externalRam = this.cartridge.externalRam;
        this.romBankNumber = 1;
        this.mode = 0;
        this.zeroBankNumber = 0;
    }

    init(){
        if(!this.cartridge.MBC1 && !this.cartridge.MBC5) return;

        if(!this.cartridge.externalRAM) 
            return;

        this.ramBanks = new Array(this.cartridge.ram_size);

        for(let i = 0; i < this.cartridge.ram_size; i++){
            this.ramBanks[i] = new Uint8Array(0x2000);
            this.ramBanks[i].fill(0);
        }

        this.load();
    }

    save(){
        if(this.cartridge.battery)
        {
            //save the ram uint8array to a file
            //put all rombanks in 1 array
            const save = new Uint8Array(this.ramBanks.length * 0x2000);
            for(let i = 0; i < this.ramBanks.length; i++){
                save.set(this.ramBanks[i], i * 0x2000);
            }

            const blob = new Blob([save], {type: "application/octet-stream"});
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "POKEMON_BLUE.sav");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    load(){
        if(this.cartridge.battery)
        { 
            /* 
            aplicar guardar partidas guardadas como cookies
            o en el navegador del usuario de forma que puedan
            ser recuperadas en esta funcion
            
            const save = fetch("./roms/POKEMON_BLUE.sav");
            //comprobar si el save tiene datos
            save.arrayBuffer().then(buffer => {
                const savebuffer = new Uint8Array(buffer);

                for(let i = 0; i < this.ramBanks.length; i++){
                    this.ramBanks[i] = savebuffer.slice(i * 0x2000, (i + 1) * 0x2000);
                }
            });
            */
        }
    }

    enablingRam(value){
        
        console.log("MBC1 or MBC5 enabling ram");
        value = value & 0x0F;
        if(value == 0xA){
            this.externalRam = true;
        }else{
            this.externalRam = false;
        }
    }

    setTheRomBankNumber(value){
        if(!this.cartridge.MBC1 && !this.cartridge.MBC5) return;
        
        if(this.cartridge.MBC1){
            if(value == 0)
            {
                this.romBankNumber = 1;
                return;
            }
        
            let mask = this.getMasktoRomBankNumber();

            value = value & mask;

            this.romBankNumber = value;

            if(this.mode == 1){
                if(this.cartridge.rom_size == 64){
                    value = (value & 0x01) << 5;
                    this.romBankNumber |= value;
                }

                if(this.cartridge.rom_size == 128){
                    value = value << 5;
                    this.romBankNumber |= value;
                }
            }
        }
    }

    setTheRomBankNumberMBC5(value, highbit){
        if(!this.cartridge.MBC5) return;

        value = value & 0xFF;
        if(!highbit){
            this.romBankNumber = (this.romBankNumber & 0x100) | value;
            return;
        }else{
            this.romBankNumber = (this.romBankNumber & 0xFF) | ((value & 0x01) << 8);
        }
    }

    setZeroBankNumber(bank){
        if(this.cartridge.rom_size < 64) return;

        if(this.cartridge.rom_size == 64){
            bank = (bank & 0x01) << 5;

            this.zeroBankNumber = bank;
        }

        if(this.cartridge.rom_size == 128){
            bank = bank << 5;

            this.zeroBankNumber = bank;
        }
    }
    getMasktoRomBankNumber(){
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

    setTheRamBankNumber(value){
        if(!this.cartridge.MBC1) return;

        value = value & 0x03;

        this.ramBankNumber = value;

        this.setZeroBankNumber(this.ramBankNumber);
    }

    setTheRamBankNumberMBC5(value){
        if(!this.cartridge.MBC5) return;

        value = value & 0x0F;

        this.ramBankNumber = value;
    }

    setModeFlag(value){
        if(!this.cartridge.MBC1) return;

        value = value & 0x01;

        this.mode = value;
    }


    ramWrite(address, value){
        if(!this.cartridge.MBC1 && !this.cartridge.MBC5) return;

        if(this.cartridge.MBC1){
            if(this.mode == 1){
                if(this.cartridge.ram_size == 4){
                    this.ramBanks[this.ramBankNumber][address - 0xA000] = value;
                }else{
                    this.ramBanks[0][address - 0xA000] = value;
                }
            }else{
                this.ramBanks[this.ramBankNumber][address - 0xA000] = value;
            }
            return;
        }
        
        if(this.cartridge.MBC5){
            this.ramBanks[this.ramBankNumber][address - 0xA000] = value;
        }
    }

    readRomBankZero(address){
        if(this.mode == 1){
            this.setZeroBankNumber(this.ramBankNumber);

            return this.cartridge.rom[this.zeroBankNumber * 0x4000 + address];
        }else{
            return this.cartridge.rom[address];
        }
    }

    ramRead(address){
        if(!this.cartridge.MBC1 && !this.cartridge.MBC5) return;

        if(this.cartridge.MBC1){
            if(this.mode == 1){
                if(this.cartridge.ram_size == 4){
                    return this.ramBanks[this.ramBankNumber][address - 0xA000];
                }else{
                    return this.ramBanks[0][address - 0xA000];
                }
            }else{
                return this.ramBanks[this.ramBankNumber][address - 0xA000];
            }
        }

        if(this.cartridge.MBC5){
            return this.ramBanks[this.ramBankNumber][address - 0xA000];
        }
    }
}
