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
import { Timer } from "./timers";

export class CPU{
    constructor(){
        //registros y bus
        this.bus = new Bus();
        this.registers = new Registers();
        this.timer = new Timer(this.bus);

        //opcode actual
        this.current_opcode = 0x00;

        //lista de instrucciones
        this.instructions = [];
        this.cbinstructions = [];
        this.defineInstructions();


        this.pause = false;
        this.cpu_cycles = 0;

        this.log = [];
        this.startLogging = false;

        //incializacion de memoria
        if(!this.bus.bootromActive)
            this.inicialiceMemory();
    }

    tick(){
        if(this.pause) return;
        this.interruptsCycle();

        if(this.registers.halted){
            this.cpu_cycles += 1;
            this.timer.tick(this.cpu_cycles);
            let cycles = this.cpu_cycles;
            this.cpu_cycles = 0;
            return cycles;
        }
        this.cpu_execute();
        this.timer.tick(this.cpu_cycles);
        let cycles = this.cpu_cycles;
        this.cpu_cycles = 0;
        return cycles;
    }

    inicialiceMemory(){
        this.timer.ticks = 0xABCC;
        this.bus.memory[0xFF04] = 0xAB;
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
            if(this.current_opcode === 0xCB){
                this.cpu_cycles += this.instructions[this.current_opcode].cycles;
            }

            //this.instructionLog(this.registers.pc, this.instructions[this.current_opcode].name);

            if(this.bus.dma.isTransferring){
                this.cpu_cycles += 160;
                this.bus.dma.isTransferring = false;
            }

            if(this.bus.requestIME){
                this.bus.requestIME = false;
                this.bus.IME = true;
            }
        }else
        {
            throw new Error("instruccion desconocida o invalida con el opcode " + this.current_opcode.toString(16) + " en la posicion " + this.registers.pc.toString(16));
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

        if((interrupt & 0x1) === 0x1){
            this.interrupt_VBlank();
        }
        else if((interrupt & 0x2) === 0x2){
            this.interrupt_LCDSTAT();
        }
        else if((interrupt & 0x4) === 0x4){
            this.interrupt_Timer();
        }
        else if((interrupt & 0x8) === 0x8){
            this.interrupt_Serial();
        }
        else if((interrupt & 0x10) === 0x10){
            this.interrupt_Joypad();
        }
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

    sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    breakpoint(pc, breakpoint){
        if(this.registers.pc === pc){
            this.pause = breakpoint;
            console.log(
            `breakpoint at ${pc.toString(16)} 
            opcode ${this.instructions[this.current_opcode].name} 
            stack pointer ${this.registers.sp.toString(16)}
            registro HL: ${this.registers.getHL().toString(16)}
            registro BC: ${this.registers.getBC().toString(16)}
            registro DE: ${this.registers.getDE().toString(16)}
            registro AF: ${this.registers.getAF().toString(16)}
            zeroflag: ${this.registers.zero}
            carryflag: ${this.registers.carry}
            halfcarryflag: ${this.registers.halfcarry}
            subflag: ${this.registers.subtraction}
            IME: ${this.bus.IME}
            interrupt_enable: ${this.bus.read(masterInterruptPointer).toString(16)}
            interrupt_request: ${this.bus.read(IF_pointer).toString(16)}
            mbc rom bank: ${this.bus.mbcC.MBC.ROMbankSelect}`);

            console.log(this.log);
        }
    }

    instructionLog(pc, name){   
        this.log.push({
            pc: pc,
            name: name
        });
    }
}