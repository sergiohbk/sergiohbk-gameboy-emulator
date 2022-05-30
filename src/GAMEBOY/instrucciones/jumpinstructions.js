export function jumpinstructions(instruction, bus){
    //JP NZ, nn
    instruction[0xC2] = {
        name: "JP NZ, nn",
        opcode: 0xC2,
        cycles: 12,
        execute: function(cpu){
            if(!cpu.registers.zero){
                cpu.registers.pc = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 3;
            }
        }
    }
    //JP nn
    //0xC3
    instruction[0xC3] = {
        name: "JP nn",
        opcode: 0xC3,
        cycles: 16,
        execute: function(cpu){
            //instruccion que sirve para saltar a una direccion, en este caso a la direccion que le pasamos por parametro es de 16 bits
            cpu.registers.pc = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
        }
    }
    //JP (HL)
    //0xE9
    instruction[0xE9] = {
        name: "JP (HL)",
        opcode: 0xE9,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.pc = cpu.registers.getHL();
        }
    }
    //JP NC, nn
    //0xD2
    instruction[0xD2] = {
        name: "JP NC, nn",
        opcode: 0xD2,
        cycles: 12,
        execute: function(cpu){
            if(!cpu.registers.carry){
                cpu.registers.pc = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 3;
            }
        }
    }
    //JP C, nn
    //0xDA
    instruction[0xDA] = {
        name: "JP C, nn",
        opcode: 0xDA,
        cycles: 12,
        execute: function(cpu){
            if(cpu.registers.carry)
            {
                cpu.registers.pc = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 3;
            }
        }
    }
    //JP Z, nn
    //0xCA
    instruction[0xCA] = {
        name: "JP Z, nn",
        opcode: 0xCA,
        cycles: 12,
        execute: function(cpu){
            if(cpu.registers.zero)
            {
                cpu.registers.pc = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 3;
            }
        }
    }
    //JR NZ, n
    //0x20
    instruction[0x20] = {
        name: "JR NZ, n",
        opcode: 0x20,
        cycles: 8,
        execute: function(cpu){
            if(!cpu.registers.zero){
                cpu.registers.pc = (cpu.registers.pc + ((bus.read(cpu.registers.pc + 1) << 24) >> 24) + 2) & 0xFFFF;
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 2;
            }
        }
        //revisada
    }
    //JR Z, n
    //0x28
    instruction[0x28] = {
        name: "JR Z, n",
        opcode: 0x28,
        cycles: 8,
        execute: function(cpu){
            if(cpu.registers.zero){
                cpu.registers.pc = (cpu.registers.pc + ((bus.read(cpu.registers.pc + 1) << 24) >> 24) + 2) & 0xFFFF;
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 2;
            }
        }
    }
    //JR NC, n
    //0x30
    instruction[0x30] = {
        name: "JR NC, n",
        opcode: 0x30,
        cycles: 8,
        execute: function(cpu){
            if(!cpu.registers.carry){
                cpu.registers.pc = (cpu.registers.pc + ((bus.read(cpu.registers.pc + 1) << 24) >> 24) + 2) & 0xFFFF;
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 2;
            }
        }
    }
    //JR C, n
    //0x38
    instruction[0x38] = {
        name: "JR C, n",
        opcode: 0x38,
        cycles: 8,
        execute: function(cpu){
            if(cpu.registers.carry){
                cpu.registers.pc = (cpu.registers.pc + ((bus.read(cpu.registers.pc + 1) << 24) >> 24) + 2) & 0xFFFF;
                cpu.cpu_cycles += 4;
            }else{
                cpu.registers.pc += 2;
            }
        }
    }
    //JR n
    //0x18
    instruction[0x18] = {
        name: "JR n",
        opcode: 0x18,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.pc = (cpu.registers.pc + ((bus.read(cpu.registers.pc + 1) << 24) >> 24) + 2) & 0xFFFF;
        }
    }
}