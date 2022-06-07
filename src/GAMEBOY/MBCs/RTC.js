import { cyclesPerSecond } from "../variables/GPUConstants";

export class RealTimeClock{
    constructor(){
        this.clock = {
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            timerhalt: 0,
            countercarry: 0
        }
        this.RTCselect = 0;
        this.accessRTC = false;

        this.cloneRTC = 0xFF;
        this.cloning = false;
        
        this.cycles = 0;
    }

    selectRTC(value){
        if(value >= 0x08 && value <= 0x0C)
            this.RTCselect = value;
        else
            this.RTCselect = 0;
    }

    latchRTC(value){
        if(value === 0x00)
            this.cloning = true;
        if(value === 0x01 && this.cloning){
            this.cloneRTC = this.clock;
            this.cloning = false;
        }
    }

    WriteRegister(value){
        switch(this.RTCselect){
            case 0x08:
                this.clock.seconds = value;
                if(this.cloneRTC !== 0xFF)
                    this.cloneRTC.seconds = value;
                break;
            case 0x09:
                this.clock.minutes = value;
                if(this.cloneRTC !== 0xFF)
                    this.cloneRTC.minutes = value;
                break;
            case 0x0A:
                this.clock.hours = value;
                if(this.cloneRTC !== 0xFF)
                    this.cloneRTC.hours = value;
                break;
            case 0x0B:
                this.clock.days = (this.clock.days & 0x100) | (value & 0xFF);
                if(this.cloneRTC !== 0xFF)
                    this.cloneRTC.days = (this.cloneRTC.days & 0x100) | (value & 0xFF);
                break;
            case 0x0C:
                this.clock.days = (this.clock.days & 0xFF) | ((value & 0x01) << 8);
                this.clock.timerhalt = (value & 0x40) >> 6;
                this.clock.countercarry = (value & 0x80) >> 7;
                if(this.cloneRTC !== 0xFF)
                    this.cloneRTC.days = (this.cloneRTC.days & 0xFF) | ((value & 0x01) << 8);
                    this.cloneRTC.timerhalt = (value & 0x40) >> 6;
                    this.cloneRTC.countercarry = (value & 0x80) >> 7;
                break;
        }
    }

    ReadRegister(){
        if(this.cloneRTC === 0xFF)
            return 0xFF;
        
        switch(this.RTCselect){
            case 0x08:
                return this.cloneRTC.seconds & 0x3F;
            case 0x09:
                return this.cloneRTC.minutes & 0x3F;
            case 0x0A:
                return this.cloneRTC.hours & 0x1F;
            case 0x0B:
                return this.cloneRTC.days & 0xFF;
            case 0x0C:
                let value = this.cloneRTC.days & 0x100 >> 8;
                value |= this.cloneRTC.timerhalt << 6;
                value |= this.cloneRTC.countercarry << 7;
                return value;
        }
    }

    tick(cycles){
        if(this.clock.timerhalt === 1) return;

        this.cycles += cycles;

        if(this.cycles >= cyclesPerSecond)
            this.clock.seconds = (this.clock.seconds + 1) & 0x3F;
        else
            return;
        
        if(this.clock.seconds === 60){
            this.clock.seconds = 0;
            this.clock.minutes = (this.clock.minutes + 1) & 0x3F;
        }

        if(this.clock.minutes === 60){
            this.clock.minutes = 0;
            this.clock.hours = (this.clock.hours + 1) & 0x1F;
        }

        if(this.clock.hours === 24){
            this.clock.hours = 0;
            this.clock.days++;
        }

        if(this.clock.days === 0x1FF){
            this.clock.days = 0;
            this.clock.countercarry = 1;
        }

        this.cycles = 0;
    }
}