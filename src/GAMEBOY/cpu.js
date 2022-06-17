import { Bus } from "./bus";
import { Registers } from "./registers";
import { loadInstructions } from "./instrucciones/loadInstructions";
import { jumpinstructions } from "./instrucciones/jumpinstructions";
import { incdecinstructions } from "./instrucciones/incdecinstructions";
import { aluinstructions } from "./instrucciones/ALUinstructions";
import { stackinstructions } from "./instrucciones/stackinstructions";
import { otherinstructions } from "./instrucciones/otherinstructions";
import { bitinstuctions } from "./instrucciones/bitinstructions";
import { IF_pointer, interrupts_pointer, masterInterruptPointer } from "./interrumpts";
import { DIV_pointer, TAC_pointer, TIMA_pointer, TMA_pointer } from "./timers";

export class CPU{
    constructor(){
        this.registers = new Registers();
        this.current_opcode = 0x00;
        this.instructions = [];
        this.cbinstructions = [];
        this.pause = false;
        this.ticks = 0;
        this.timerticks = 0;
        this.bus = new Bus();
        this.pause = false;
        this.defineInstructions();
        if(!this.bus.bootromActive)
            this.inicialiceMemory();
        this.cpu_cycles = 0;
        this.test = "";
    }

    tick(){
        if(this.pause) return;
        this.interruptsCycle();

        if(this.registers.halted){
            this.cpu_cycles += 1;
            this.timerCycle();
            let cycles = this.cpu_cycles;
            this.cpu_cycles = 0;
            return cycles;
        }
        this.cpu_execute();
        this.timerCycle();
        let cycles = this.cpu_cycles;
        this.cpu_cycles = 0;
        return cycles;
    }

    inicialiceMemory(){
        this.ticks = 0xABCC;
        this.bus.memory[0xFF05] = 0x00;
        this.bus.memory[0xFF06] = 0x00;
        this.bus.memory[0xFF07] = 0xF8;
        this.bus.memory[0xFF0F] = 0xE1;
        this.bus.memory[0xFF10] = 0x80;
        this.bus.memory[0xFF11] = 0xBF;
        this.bus.memory[0xFF12] = 0xF3;
        this.bus.memory[0xFF14] = 0xBF;
        this.bus.memory[0xFF16] = 0x3F;
        this.bus.memory[0xFF17] = 0x00;
        this.bus.memory[0xFF19] = 0xBF;
        this.bus.memory[0xFF1A] = 0x7F;
        this.bus.memory[0xFF1B] = 0xFF;
        this.bus.memory[0xFF1C] = 0x9F;
        this.bus.memory[0xFF1E] = 0xBF;
        this.bus.memory[0xFF20] = 0xFF;
        this.bus.memory[0xFF21] = 0x00;
        this.bus.memory[0xFF22] = 0x00;
        this.bus.memory[0xFF23] = 0xBF;
        this.bus.memory[0xFF24] = 0x77;
        this.bus.memory[0xFF25] = 0xF3;
        this.bus.memory[0xFF26] = 0xF1;
        this.bus.memory[0xFF40] = 0x91;
        this.bus.memory[0xFF41] = 0x85;
        this.bus.memory[0xFF42] = 0x00;
        this.bus.memory[0xFF43] = 0x00;
        this.bus.memory[0xFF45] = 0x00;
        this.bus.memory[0xFF47] = 0xFC;
        this.bus.memory[0xFF48] = 0xFF;
        this.bus.memory[0xFF49] = 0xFF;
        this.bus.memory[0xFF4A] = 0x00;
        this.bus.memory[0xFF4B] = 0x00;
        this.bus.memory[0xFFFF] = 0x00;
    }

    activateBootrom(){
        this.bus.bootromActive = true;
        this.registers.bootstrap = true;
    }

    interruptsCycle(){
        
        let interrupt_request = this.bus.read(IF_pointer);
        let interrupt_enable = this.bus.read(masterInterruptPointer);
        let interrupt = (interrupt_request & interrupt_enable) & 0x1F;

        if(interrupt > 0){
            this.registers.halted = false;
            this.cpu_cycles += 4;
        }else{
            return;
        }
        if(!this.bus.IME) return;

        if((interrupt & 0x1) == 0x1){
            this.interrupt_VBlank();
        }
        else if((interrupt & 0x2) == 0x2){
            this.interrupt_LCDSTAT();
        }
        else if((interrupt & 0x4) == 0x4){
            this.interrupt_Timer();
        }
        else if((interrupt & 0x8) == 0x8){
            this.interrupt_Serial();
        }
        else if((interrupt & 0x10) == 0x10){
            this.interrupt_Joypad();
        }
    }

    cpu_execute(){
        /* 
          lee el opcode en la posicion del program counter
          y lo guarda en la variable current_opcode
          comprueba despues en la tabla de instrucciones
          a cual corresponde, si no existe, salta una excepcion
          añade los ciclos de instruccion, ejecuta la instruccion
          si es un opcode CB entonces busca en la tabla de instrucciones CB
          para los ciclos        
        */
        this.current_opcode = this.bus.read(this.registers.pc);

        if(this.instructions[this.current_opcode] !== undefined){

            this.cpu_cycles += this.instructions[this.current_opcode].cycles;
            this.instructions[this.current_opcode].execute(this);
            if(this.current_opcode == 0xCB){
                this.cpu_cycles += this.instructions[this.current_opcode].cycles;
            }

            if(this.bus.dma.isTransferring){
                this.cpu_cycles += 160;
                this.bus.dma.isTransferring = false;
            }

        }else
        {
            throw new Error("instruccion desconocida o invalida con el opcode " + this.current_opcode + " en la posicion " + this.registers.pc.toString(16));
        }
    }

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    breakpoint(pc, breakpoint){
        if(this.registers.pc == pc){
            this.pause = breakpoint;
            console.log("breakpoint at " + pc.toString(16) + " " + this.instructions[this.current_opcode].name + " " + this.registers.sp.toString(16)
            + " registro HL: " + this.registers.getHL().toString(16)
            + " registro BC: " + this.registers.getBC().toString(16)
            + " registro DE: " + this.registers.getDE().toString(16)
            + " registro AF: " + this.registers.getAF().toString(16)
            + " zeroflag: " + this.registers.zero
            + " carryflag: " + this.registers.carry
            + " halfcarryflag: " + this.registers.halfcarry
            + " subflag: " + this.registers.subtraction
            + " IME: " + this.bus.IME
            + " interrupt_enable: " + this.bus.read(masterInterruptPointer).toString(16)
            + " interrupt_request: " + this.bus.read(IF_pointer).toString(16)
            + " mbc rom bank: " + this.bus.MBC.romBankNumber);
        }
    }

    defineInstructions(){
        loadInstructions(this.instructions, this.bus);
        jumpinstructions(this.instructions, this.bus);
        incdecinstructions(this.instructions, this.bus);
        aluinstructions(this.instructions, this.bus);
        stackinstructions(this.instructions, this.bus);
        otherinstructions(this.instructions);
        bitinstuctions(this.instructions, this.bus, this.cbinstructions);
    }

    interrupt_VBlank(){
        this.registers.stackPush16(this.registers.pc, this.bus);
        this.registers.pc = interrupts_pointer.VBlank;
        this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] & 0xFE;
        this.cpu_cycles += 20;
        this.bus.IME = false;
    }
    interrupt_LCDSTAT(){
        this.registers.stackPush16(this.registers.pc, this.bus);
        this.registers.pc = interrupts_pointer.LCDSTAT;
        this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] & 0xFD;
        this.cpu_cycles += 20;
        this.bus.IME = false;
    }
    interrupt_Timer(){
        this.registers.stackPush16(this.registers.pc, this.bus);
        this.registers.pc = interrupts_pointer.Timer;
        this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] & 0xFB;
        this.cpu_cycles += 20;
        this.bus.IME = false;
    }
    interrupt_Serial(){
        this.registers.stackPush16(this.registers.pc, this.bus);
        this.registers.pc = interrupts_pointer.Serial;
        this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] & 0xF7;
        this.cpu_cycles += 20;
        this.bus.IME = false;
    }
    interrupt_Joypad(){
        this.registers.stackPush16(this.registers.pc, this.bus);
        this.registers.pc = interrupts_pointer.Joypad;
        this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] & 0xEF;
        this.cpu_cycles += 20;
        this.bus.IME = false;
    }

    timerCycle(){
        //si los ciclos son 0 retornar
        if(this.cpu_cycles === 0) return;

        this.ticks += this.cpu_cycles;

        this.bus.memory[DIV_pointer] = this.ticks >> 8;

        if(this.ticks >= 0xFFFF){
            this.ticks = 0;
        }

        const TACenable = this.bus.read(TAC_pointer) & 0x4;
        if( TACenable === 0) return;

        this.ctu_TIMA = this.cyclesToUpTIMA();
        this.timerticks += this.cpu_cycles;

        if(this.timerticks >= this.ctu_TIMA){
            if(this.bus.read(TIMA_pointer) == 0xFF){
                this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] | 0x4;
                this.bus.memory[TIMA_pointer] = this.bus.memory[TMA_pointer];
            }else{
                this.bus.memory[TIMA_pointer]++;
            }
            this.timerticks = 0;
        }
    }
    cyclesToUpTIMA(){
        const TAC = this.bus.read(TAC_pointer) & 0x3;
        switch(TAC){
            case 0:
                return 1024;
            case 1:
                return 16;
            case 2:
                return 64;
            case 3:
                return 256;
        }
    }
    teststack(){
        this.bus.write(0x100, 0xF8);
        this.bus.write(0x101, 0x80);
        this.bus.write(0x102, 0x00);
        this.bus.write(0x103, 0xC5);
        this.bus.write(0x104, 0xF1);
        this.bus.write(0x105, 0x00);
        this.bus.write(0x480, 0xF1);
        this.bus.write(0x481, 0x00);

        //registers push y pop funcionan
        //calls parecen funcionar
    }
    updateTest (){
        if(this.bus.read(0xFF02) == 0x81){
            let letra = this.bus.read(0xFF01);
            this.test += String.fromCharCode(letra);
            this.bus.write(0xFF02, 0x00);
        }
    }
    haltHandler(){
        if(this.bus.IME){
            return true;
        }
        else if(!this.bus.IME && this.bus.read(IF_pointer) != 0x00 && this.bus.read(masterInterruptPointer) != 0x00){
            //halt bug (programar)
            this.registers.halted = false;
            return false;
        }
        else if(!this.bus.IME){
            return true;
        }
    }
}