import { cyclesPerSecond } from './variables/GPUConstants';

export class MBC {
    constructor(rom, bus){
        this.cartridge = rom;
        this.bus = bus;
        this.ramBankNumber = 0;
        this.externalRam = this.cartridge.externalRam;
        this.romBankNumber = 1;
        this.mode = 0;
        this.zeroBankNumber = 0;
        this.RTC ={
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            timerhalt: 0,
            countercarry: 0
        }
        this.RTCselectRegister = 0xFF;
        this.RTCLatched = 0xFF;
        this.RTCaccess = false;
        this.clocks = 0;
        this.latching = true;
    }

    init(){
        if(!this.cartridge.MBC1 && !this.cartridge.MBC5 && !this.cartridge.MBC3) return;

        if(!this.cartridge.externalRAM) 
            return;

        this.ramBanks = new Array(this.cartridge.ram_size);

        for(let i = 0; i < this.cartridge.ram_size; i++){
            this.ramBanks[i] = new Uint8Array(0x2000);
            this.ramBanks[i].fill(0);
        }
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
    load(save){
        if(this.cartridge.battery)
        { 
            //añadir el timer al MBC3
            //comprobar si el save tiene datos
            let savebuffer = new Uint8Array(save);

            for(let i = 0; i < this.ramBanks.length; i++){
                this.ramBanks[i] = savebuffer.slice(i * 0x2000, (i + 1) * 0x2000);
            }
        }
    }

    enablingRam(value){
        value = value & 0x0F;
        if(value == 0xA){
            if(this.cartridge.externalRAM){
                this.externalRam = true;
            }
            if(this.cartridge.timer){
                this.RTCaccess = true;
            }
        }else{
            this.externalRam = false;
            
            if(this.cartridge.timer)
                this.RTCaccess = false;
        }
    }

    setTheRomBankNumber(value){
        if(!this.cartridge.MBC1) return;
        
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

    setTheRomBankNumberMBC3(value){
        if(!this.cartridge.MBC3) return;

        if(value === 0){
            this.romBankNumber = 1;
            return;
        }

        value = value & 0x7F;

        this.romBankNumber = value;
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

    setTheRamBankNumberMBC3(value){
        if(!this.cartridge.MBC3) return;

        if(value <= 0x03){
            this.ramBankNumber = value;
            this.RTCselectRegister = 0xFF;
            return;
        }
        if(value >= 0x08 && value <= 0x0C){
            if(!this.cartridge.timer) return;
            this.selectRegisterRTC(value);
        }
    }

    selectRegisterRTC(value){
        switch(value){
            case 0x08:
                this.RTCselectRegister = 0;
                break;
            case 0x09:
                this.RTCselectRegister = 1;
                break;
            case 0x0A:
                this.RTCselectRegister = 2;
                break;
            case 0x0B:
                this.RTCselectRegister = 3;
                break;
            case 0x0C:
                this.RTCselectRegister = 4;
                break;
            default:
                console.log("Error: Invalid RTC register");
                this.RTCselectRegister = 0xFF;
        }
    }

    getLatchedRTCselect(RTC){
        if(this.RTCLatched === 0xFF){
            return 0xFF;
        }

        switch(RTC){
            case 0:
                return this.RTCLatched.seconds & 0x3F;
            case 1:
                return this.RTCLatched.minutes & 0x3F;
            case 2:
                return this.RTCLatched.hours & 0x1F;
            case 3:
                return this.RTCLatched.days & 0xFF;
            case 4:
                let value = (this.RTCLatched.days & 0x100) >> 8;
                value |= this.RTCLatched.timerhalt << 6;
                value |= this.RTCLatched.countercarry << 7;
                value &= 0xC1;
                return value;
            default:
                return 0xFF;
        }
    }

    RTCdataLatch(value){
        if(!this.cartridge.MBC3) return;
        if(!this.cartridge.timer) return;

        if(value === 0x00){
            this.latching = true;
        }
        if(value === 0x01 && this.latching){
            this.RTCLatched = this.RTC;
            this.latching = false;
        }
    }

    setRTCregisterSelected(value){
        if(this.RTCselectRegister === 0xFF) return;

        switch(this.RTCselectRegister){
            case 0:
                this.RTC.seconds = value;
                if(this.RTCLatched !== 0xFF)
                    this.RTCLatched.seconds = value;
                break;
            case 1:
                this.RTC.minutes = value;
                if(this.RTCLatched !== 0xFF)
                    this.RTCLatched.minutes = value;
                break;
            case 2:
                this.RTC.hours = value;
                if(this.RTCLatched !== 0xFF)
                    this.RTCLatched.hours = value;
                break;
            case 3:
                this.RTC.days = (this.RTC.days & 0x0100) | (value & 0xFF);
                if(this.RTCLatched !== 0xFF)
                    this.RTCLatched.days = (this.RTCLatched.days & 0x0100) | (value & 0xFF);
                break;
            case 4:
                this.RTC.days = (this.RTC.days & 0xFF) | ((value & 0x01) << 8);
                this.RTC.timerhalt = (value & 0x40) >> 6;
                this.RTC.countercarry = (value & 0x80) >> 7;
                if(this.RTCLatched !== 0xFF){
                    this.RTCLatched.days = (this.RTCLatched.days & 0xFF) | ((value & 0x01) << 8);
                    this.RTCLatched.timerhalt = (value & 0x40) >> 6;
                    this.RTCLatched.countercarry = (value & 0x80) >> 7;
                }
                break;
            default:
                console.log("Error: Invalid RTC register to set");
        }
    }

    setModeFlag(value){
        if(!this.cartridge.MBC1) return;

        value = value & 0x01;

        this.mode = value;
    }


    ramWrite(address, value){

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
            return;
        }

        if(this.cartridge.MBC3){
            if(this.cartridge.timer && this.RTCaccess && this.RTCselectRegister != 0xFF){
                this.setRTCregisterSelected(value);
                return;
            }

            if(!this.cartridge.externalRAM) return;
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

        if(this.cartridge.MBC3){
            if(this.cartridge.timer && this.RTCaccess && this.RTCselectRegister != 0xFF){
                return this.getLatchedRTCselect(this.RTCselectRegister);
            }

            if(!this.cartridge.externalRAM) return 0xFF;

            return this.ramBanks[this.ramBankNumber][address - 0xA000];
            
        }
    }

    timerTick(cycles){
        if(!this.cartridge.MBC3) return;
        if(this.RTC.timerhalt === 1) return;

        this.clocks += cycles;
        if(this.clocks >= cyclesPerSecond){
            this.RTC.seconds++;
        }else{
            return;
        }
        if(this.RTC.seconds >= 60){
            if(this.RTC.seconds === 60) this.RTC.minutes++;
            this.RTC.seconds = 0;
        }
        if(this.RTC.minutes >= 60){
            if(this.RTC.minutes === 60) this.RTC.hours++;
            this.RTC.minutes = 0;
        }
        if(this.RTC.hours >= 24){
            if(this.RTC.hours === 24) this.RTC.days++;
            this.RTC.hours = 0;
        }
        if(this.RTC.days >= 0x1FF){
            this.RTC.days = 0;
            this.RTC.countercarry = 1;
        }

        this.clocks %= cyclesPerSecond;
    }
}
