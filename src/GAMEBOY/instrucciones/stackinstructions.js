export function stackinstructions(instruction, bus){
    //PUSH BC
    //0xC5
    instruction[0xC5] = {
        name: "PUSH BC",
        opcode: 0xC5,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.getBC(), bus);
            cpu.registers.pc += 1;
        }
    };
    //PUSH DE
    //0xD5
    instruction[0xD5] = {
        name: "PUSH DE",
        opcode: 0xD5,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.getDE(), bus);
            cpu.registers.pc += 1;
        }
    };
    //PUSH HL
    //0xE5
    instruction[0xE5] = {
        name: "PUSH HL",
        opcode: 0xE5,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.getHL(), bus);
            cpu.registers.pc += 1;
        }
    };
    //PUSH AF
    //0xF5
    instruction[0xF5] = {
        name: "PUSH AF",
        opcode: 0xF5,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.getAF() & 0xFFF0, bus);
            cpu.registers.pc += 1;
        }
    };
    //POP BC
    //0xC1
    instruction[0xC1] = {
        name: "POP BC",
        opcode: 0xC1,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.setBC(cpu.registers.stackPop16(bus));
            cpu.registers.pc += 1;
        }
    };
    //POP DE
    //0xD1
    instruction[0xD1] = {
        name: "POP DE",
        opcode: 0xD1,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.setDE(cpu.registers.stackPop16(bus));
            cpu.registers.pc += 1;
        }
    };
    //POP HL
    //0xE1
    instruction[0xE1] = {
        name: "POP HL",
        opcode: 0xE1,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.setHL(cpu.registers.stackPop16(bus));
            cpu.registers.pc += 1;
        }
    };
    //POP AF
    //0xF1
    instruction[0xF1] = {
        name: "POP AF",
        opcode: 0xF1,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.setAF(cpu.registers.stackPop16(bus) & 0xFFF0);
            cpu.registers.pc += 1;
        }
        //revisada
    };
    //CALL NZ,nn
    //0xC4
    instruction[0xC4] = {
        name: "CALL NZ,nn",
        opcode: 0xC4,
        cycles: 12,
        execute: function(cpu){
            if(!cpu.registers.zero)
            {   
                let address = (bus.read(cpu.registers.pc + 2) << 8) | (bus.read(cpu.registers.pc + 1));
                cpu.registers.pc = (cpu.registers.pc + 3) & 0xFFFF;
                cpu.registers.stackPush16(cpu.registers.pc, bus);
                cpu.registers.pc = address;
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 3;
            }
        }
    };
    //CALL NC,nn
    //0xD4
    instruction[0xD4] = {
        name: "CALL NC,nn",
        opcode: 0xD4,
        cycles: 12,
        execute: function(cpu){
            if(!cpu.registers.carry)
            {   
                let address = bus.read(cpu.registers.pc + 2) << 8 | (bus.read(cpu.registers.pc + 1));
                cpu.registers.pc = cpu.registers.pc + 3 & 0xFFFF;
                cpu.registers.stackPush16(cpu.registers.pc, bus);
                cpu.registers.pc = address;
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 3;
            }
        }
    };
    //CALL Z,nn
    //0xCC
    instruction[0xCC] = {
        name: "CALL Z,nn",
        opcode: 0xCC,
        cycles: 12,
        execute: function(cpu){
            if(cpu.registers.zero)
            {   
                let address = bus.read(cpu.registers.pc + 2) << 8 | (bus.read(cpu.registers.pc + 1));
                cpu.registers.pc = cpu.registers.pc + 3 & 0xFFFF;
                cpu.registers.stackPush16(cpu.registers.pc, bus);
                cpu.registers.pc = address;
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 3;
            }
        }
    };
    //CALL C,nn
    //0xDC
    instruction[0xDC] = {
        name: "CALL C,nn",
        opcode: 0xDC,
        cycles: 12,
        execute: function(cpu){
            if(cpu.registers.carry)
            {   
                let address = bus.read(cpu.registers.pc + 2) << 8 | (bus.read(cpu.registers.pc + 1));
                cpu.registers.pc = cpu.registers.pc + 3 & 0xFFFF;
                cpu.registers.stackPush16(cpu.registers.pc, bus);
                cpu.registers.pc = address;
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 3;
            }
        }
    };
    //CALL nn
    //0xCD
    instruction[0xCD] = {
        name: "CALL nn",
        opcode: 0xCD,
        cycles: 24,
        execute: function(cpu){
            let address = bus.read(cpu.registers.pc + 2) << 8 | (bus.read(cpu.registers.pc + 1));
            cpu.registers.pc = (cpu.registers.pc + 3) & 0xFFFF;
            cpu.registers.stackPush16(cpu.registers.pc,bus);
            cpu.registers.pc = address;
        }
    };
    //RST 00H
    //0xC7
    instruction[0xC7] = {
        name: "RST 00H",
        opcode: 0xC7,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x00;
        }
    }
    //RST 10H
    //0xD7
    instruction[0xD7] = {
        name: "RST 10H",
        opcode: 0xD7,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x10;
        }
    };
    //RST 20H
    //0xE7
    instruction[0xE7] = {
        name: "RST 20H",
        opcode: 0xE7,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x20;
        }
    };
    //RST 30H
    //0xF7
    instruction[0xF7] = {
        name: "RST 30H",
        opcode: 0xF7,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x30;
        }
    };
    //RST 08H
    //0xCF
    instruction[0xCF] = {
        name: "RST 08H",
        opcode: 0xCF,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x08;
        }
    };
    //RST 18H
    //0xDF
    instruction[0xDF] = {
        name: "RST 18H",
        opcode: 0xDF,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x18;
        }
    };
    //RST 28H
    //0xEF
    instruction[0xEF] = {
        name: "RST 28H",
        opcode: 0xEF,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x28;
        }
    };
    //RST 38H
    //0xFF
    instruction[0xFF] = {
        name: "RST 38H",
        opcode: 0xFF,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
            cpu.registers.pc = 0x38;
        }
    };
    //RET NZ
    //0xC0
    instruction[0xC0] = {
        name: "RET NZ",
        opcode: 0xC0,
        cycles: 8,
        execute: function(cpu){
            if(!cpu.registers.zero)
            {
                cpu.registers.pc = cpu.registers.stackPop16(bus);
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 1;
            }
        }
    };
    //RET NC
    //0xD0
    instruction[0xD0] = {
        name: "RET NC",
        opcode: 0xD0,
        cycles: 8,
        execute: function(cpu){
            if(!cpu.registers.carry)
            {
                cpu.registers.pc = cpu.registers.stackPop16(bus);
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 1;
            }
        }
    };
    //RET Z
    //0xC8
    instruction[0xC8] = {
        name: "RET Z",
        opcode: 0xC8,
        cycles: 8,
        execute: function(cpu){
            if(cpu.registers.zero)
            {
                cpu.registers.pc = cpu.registers.stackPop16(bus);
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 1;
            }
        }
    };
    //RET C
    //0xD8
    instruction[0xD8] = {
        name: "RET C",
        opcode: 0xD8,
        cycles: 8,
        execute: function(cpu){
            if(cpu.registers.carry)
            {
                cpu.registers.pc = cpu.registers.stackPop16(bus);
                cpu.cpu_cycles += 12;
            }else{
                cpu.registers.pc += 1;
            }
        }
    };
    //RET
    //0xC9
    instruction[0xC9] = {
        name: "RET",
        opcode: 0xC9,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.pc = cpu.registers.stackPop16(bus);
        }
    };
    //RETI
    //0xD9
    instruction[0xD9] = {
        name: "RETI",
        opcode: 0xD9,
        cycles: 16,
        execute: function(cpu){
            cpu.registers.pc = cpu.registers.stackPop16(bus);
            cpu.bus.IME = true;
        }
    };
}