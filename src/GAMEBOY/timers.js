import { IF_pointer } from "./interrumpts";

export const TIMA_pointer = 0xFF05;
export const TMA_pointer = 0xFF06;
export const TAC_pointer = 0xFF07;
export const DIV_pointer = 0xFF04;

export class Timer{
    constructor(bus){
        this.bus = bus;
        this.ticks = 0; //Ticks del DIV por defecto, 0xABCC si hay boostrap
        this.timerticks = 0; //Ticks del timer
        this.ctu_TIMA = 0x1000; //ciclos para aumentar TIMA
    }

    tick(cycles){
        //div behaviour
        this.divTick(cycles);

        //timer behaviour
        this.timerTick(cycles);
    }

    divTick(cycles){
        if(cycles === 0) return 0;

        this.ticks += cycles;
        
        this.bus.memory[DIV_pointer] += (this.ticks >> 8) & 0xFF; 

        this.bus.memory[DIV_pointer] &= 0xFF;

        this.ticks &= 0xFF;
    }

    timerTick(cycles){
        if((this.bus.memory[TAC_pointer] & 0x4) === 0)
            return false;
       
        this.ctu_TIMA = this.cyclesToUpTIMA();
        this.timerticks += cycles;

        if(this.timerticks >= this.ctu_TIMA){
            if(this.bus.memory[TIMA_pointer] === 0xFF){
                this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] | 0x4;
                this.bus.memory[TIMA_pointer] = this.bus.memory[TMA_pointer];
            }else{
                this.bus.memory[TIMA_pointer]++;
            }

            this.timerticks -= this.ctu_TIMA;
        }
    }

    cyclesToUpTIMA(){
        const TAC = this.bus.memory[TAC_pointer] & 0x3;
        switch(TAC){
            case 0:
                return 1024;
            case 1:
                return 16;
            case 2:
                return 64;
            case 3:
                return 256;
            default:
                return 1024;
        }
    }
}