import { setIME } from "../interrumpts";

export function otherinstructions(instruction){
    //NOP
    //0x00
    instruction[0x00] = {
        name: "NOP",
        opcode: 0x00,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.pc += 1;
        }
    };
    //RLCA
    //0x07
    instruction[0x07] = {
        name: "RLCA",
        opcode: 0x07,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = (cpu.registers.a << 1) & 0xFF | cpu.registers.a >> 7;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = false;
            cpu.registers.pc += 1;
        }
        //corregida
    };
    //RRCA
    //0x0F
    instruction[0x0F] = {
        name: "RRCA",
        opcode: 0x0F,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = (cpu.registers.a >> 1) | (cpu.registers.a & 1) << 7;
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = false;
            cpu.registers.pc += 1;
        }
        //corregida
    };
    //STOP
    //0x10
    instruction[0x10] = {
        name: "STOP",
        opcode: 0x10,
        cycles: 4,
        execute: function(cpu){
            //handle stops
            cpu.registers.pc += 1;
        }
    };
    //RLA
    //0x17
    instruction[0x17] = {
        name: "RLA",
        opcode: 0x17,
        cycles: 4,
        execute: function(cpu){
            let carry = ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = ((cpu.registers.a << 1 ) & 0xFF) | carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = false;
            cpu.registers.pc += 1; 
        }
        //comprobada
    };
    //RRA
    //0x1F
    instruction[0x1F] = {
        name: "RRA",
        opcode: 0x1F,
        cycles: 4,
        execute: function(cpu){
            var carry = (cpu.registers.carry) ? 0x80 : 0;
            cpu.registers.carry = (cpu.registers.a & 1) == 1;
            cpu.registers.a = ((cpu.registers.a >> 1)) | carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = false;
            cpu.registers.pc += 1; 
        }
        //corregida
    };
    //DAA
    //0x27
    instruction[0x27] = {
        name: "DAA",
        opcode: 0x27,
        cycles: 4,
        execute: function(cpu){
           if(!cpu.registers.subtraction){
                if(cpu.registers.carry || cpu.registers.a > 0x99){
                    cpu.registers.a = (cpu.registers.a + 0x60) & 0xFF;
                    cpu.registers.carry = true;
                }
                if(cpu.registers.halfcarry || (cpu.registers.a & 0xF) > 0x9){
                    cpu.registers.a = (cpu.registers.a + 0x06) & 0xFF;
                    cpu.registers.halfcarry = false;
                }
            }else if(cpu.registers.carry && cpu.registers.halfcarry){
                cpu.registers.a = (cpu.registers.a + 0x9A) & 0xFF;
                cpu.registers.halfcarry = false;
            }else if(cpu.registers.carry){
                cpu.registers.a = (cpu.registers.a + 0xA0) & 0xFF;
            }else if(cpu.registers.halfcarry){
                cpu.registers.a = (cpu.registers.a + 0xFA) & 0xFF;
                cpu.registers.halfcarry = false;
            }
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }//revisada
    };
    //CPL
    //0x2F
    instruction[0x2F] = {
        name: "CPL",
        opcode: 0x2F,
        cycles: 4,
        execute: function(cpu){
            //invertimos los bits de A
            cpu.registers.a ^= 0xFF;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    };
    //SCF
    //0x37
    instruction[0x37] = {
        name: "SCF",
        opcode: 0x37,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.carry = true;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    };
    //CCF
    //0x3F
    instruction[0x3F] = {
        name: "CCF",
        opcode: 0x3F,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.carry = !cpu.registers.carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    };
    //HALT
    //0x76
    instruction[0x76] = {
        name: "HALT",
        opcode: 0x76,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.halted = true;
            cpu.registers.pc += 1;
        }
    };
    //DI
    //0xF3
    instruction[0xF3] = {
        name: "DI",
        opcode: 0xF3,
        cycles: 4,
        execute: function(cpu){
            setIME(false);
            cpu.registers.pc += 1;
        }
    };
    //EI
    //0xFB
    instruction[0xFB] = {
        name: "EI",
        opcode: 0xFB,
        cycles: 4,
        execute: function(cpu){
            setIME(true);
            cpu.registers.pc += 1;
        }
    };
    
}