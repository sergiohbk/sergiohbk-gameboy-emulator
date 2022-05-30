export function incdecinstructions(instruction, bus){
    //INC BC
    //0x03
    instruction[0x03] = {
        name: "INC BC",
        opcode: 0x03,
        cycles: 8,
        execute: function(cpu){
            //incrementamos en 1 el valor de BC
            cpu.registers.setBC((cpu.registers.getBC() + 1) & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC B
    //0x04
    instruction[0x04] = {
        name: "INC B",
        opcode: 0x04,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de B
            cpu.registers.b = (cpu.registers.b + 1) & 0xFF;
            //si el valor de B es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.b == 0);
            //si el valor de B es igual a 0x10, se pone el bit de carry a 0
            cpu.registers.halfcarry = (cpu.registers.b & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC B
    //0x05
    instruction[0x05] = {
        name: "DEC B",
        opcode: 0x05,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de B
            cpu.registers.b = cpu.registers.b - 1 & 0xFF;
            //si el valor de B es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.b == 0);
            //si el valor de B es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.b & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //DEC BC
    //0x0B
    instruction[0x0B] = {
        name: "DEC BC",
        opcode: 0x0B,
        cycles: 8,
        execute: function(cpu){
            //decrementamos en 1 el valor de BC
            cpu.registers.setBC(cpu.registers.getBC() - 1 & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC C
    //0x0C
    instruction[0x0C] = {
        name: "INC C",
        opcode: 0x0C,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de C
            cpu.registers.c = cpu.registers.c + 1 & 0xFF;
            //si el valor de C es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.c == 0);
            //si el valor de C es igual a 0x10, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.c & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC C
    //0x0D
    instruction[0x0D] = {
        name: "DEC C",
        opcode: 0x0D,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de C
            cpu.registers.c = cpu.registers.c - 1 & 0xFF;
            //si el valor de C es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.c == 0);
            //si el valor de C es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.c & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //INC DE
    //0x13
    instruction[0x13] = {
        name: "INC DE",
        opcode: 0x13,
        cycles: 8,
        execute: function(cpu){
            //incrementamos en 1 el valor de DE
            cpu.registers.setDE(cpu.registers.getDE() + 1 & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC D
    //0x14
    instruction[0x14] = {
        name: "INC D",
        opcode: 0x14,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de D
            cpu.registers.d = cpu.registers.d + 1 & 0xFF;
            //si el valor de D es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.d == 0);
            //si el valor de D es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.d & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }//revisada
    }
    //DEC D
    //0x15
    instruction[0x15] = {
        name: "DEC D",
        opcode: 0x15,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de D
            cpu.registers.d = cpu.registers.d - 1 & 0xFF;
            //si el valor de D es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.d == 0);
            //si el valor de D es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.d & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //DEC DE
    //0x1B
    instruction[0x1B] = {
        name: "DEC DE",
        opcode: 0x1B,
        cycles: 8,
        execute: function(cpu){
            //decrementamos en 1 el valor de DE
            cpu.registers.setDE(cpu.registers.getDE() - 1 & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC E
    //0x1C
    instruction[0x1C] = {
        name: "INC E",
        opcode: 0x1C,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de E
            cpu.registers.e = (cpu.registers.e + 1) & 0xFF;
            //si el valor de E es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.e == 0;
            //si el valor de E es igual a 0x10, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.e & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC E
    //0x1D
    instruction[0x1D] = {
        name: "DEC E",
        opcode: 0x1D,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de E
            cpu.registers.e = cpu.registers.e - 1 & 0xFF;
            //si el valor de E es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.e == 0;
            //si el valor de E es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.e & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //INC HL
    //0x23
    instruction[0x23] = {
        name: "INC HL",
        opcode: 0x23,
        cycles: 8,
        execute: function(cpu){
            //incrementamos en 1 el valor de HL
            cpu.registers.setHL(cpu.registers.getHL() + 1 & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC H
    //0x24
    instruction[0x24] = {
        name: "INC H",
        opcode: 0x24,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de H
            cpu.registers.h = cpu.registers.h + 1 & 0xFF;
            //si el valor de H es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.h == 0;
            //si el valor de H es igual a 0x10, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.h & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC H
    //0x25
    instruction[0x25] = {
        name: "DEC H",
        opcode: 0x25,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de H
            cpu.registers.h = cpu.registers.h - 1 & 0xFF;
            //si el valor de H es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.h == 0;
            //si el valor de H es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.h & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }//revisada
    }
    //DEC HL
    //0x2B
    instruction[0x2B] = {
        name: "DEC HL",
        opcode: 0x2B,
        cycles: 8,
        execute: function(cpu){
            //decrementamos en 1 el valor de HL
            cpu.registers.setHL((cpu.registers.getHL() - 1) & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //INC L
    //0x2C
    instruction[0x2C] = {
        name: "INC L",
        opcode: 0x2C,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de L
            cpu.registers.l = cpu.registers.l + 1 & 0xFF;
            //si el valor de L es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.l == 0;
            //si el valor de L es igual a 0x10, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.l & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC L
    //0x2D
    instruction[0x2D] = {
        name: "DEC L",
        opcode: 0x2D,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de L
            cpu.registers.l = cpu.registers.l - 1 & 0xFF;
            //si el valor de L es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.l == 0;
            //si el valor de L es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.l & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //INC SP
    //0x33
    instruction[0x33] = {
        name: "INC SP",
        opcode: 0x33,
        cycles: 8,
        execute: function(cpu){
            //incrementamos en 1 el valor de SP
            cpu.registers.sp = cpu.registers.sp + 1 & 0xFFFF;
            cpu.registers.pc += 1;
        }
    }
    //INC (HL)
    //0x34
    instruction[0x34] = {
        name: "INC (HL)",
        opcode: 0x34,
        cycles: 12,
        execute: function(cpu){
            //incrementamos en 1 el valor de la posicion de memoria de HL
            let temp = (bus.read(cpu.registers.getHL()) + 1) & 0xFF;
            bus.write(cpu.registers.getHL(), temp); 
            //comprobamos el bit de zero
            cpu.registers.zero = temp == 0;
            //comprobamos el bit de halfcarry
            cpu.registers.halfcarry = (temp & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC (HL)
    //0x35
    instruction[0x35] = {
        name: "DEC (HL)",
        opcode: 0x35,
        cycles: 12,
        execute: function(cpu){
            //decrementamos en 1 el valor de la posicion de memoria de HL
            let temp = (bus.read(cpu.registers.getHL()) - 1) & 0xFF;
            bus.write(cpu.registers.getHL(), temp); 
            //comprobamos el bit de zero
            cpu.registers.zero = temp == 0;
            //comprobamos el bit de halfcarry
            cpu.registers.halfcarry = (temp & 0xF) == 0xF;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
    //DEC SP
    //0x3B
    instruction[0x3B] = {
        name: "DEC SP",
        opcode: 0x3B,
        cycles: 8,
        execute: function(cpu){
            //decrementamos en 1 el valor de SP
            cpu.registers.sp = (cpu.registers.sp - 1) & 0xFFFF;
            cpu.registers.pc += 1;
        }
    }
    //INC A
    //0x3C
    instruction[0x3C] = {
        name: "INC A",
        opcode: 0x3C,
        cycles: 4,
        execute: function(cpu){
            //incrementamos en 1 el valor de A
            cpu.registers.a = cpu.registers.a + 1 & 0xFF;
            //si el valor de A es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = cpu.registers.a == 0;
            //si el valor de A es igual a 0x10, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) == 0;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //DEC A
    //0x3D
    instruction[0x3D] = {
        name: "DEC A",
        opcode: 0x3D,
        cycles: 4,
        execute: function(cpu){
            //decrementamos en 1 el valor de A
            cpu.registers.a = (cpu.registers.a - 1) & 0xFF;
            //si el valor de A es igual a 0, se pone el bit de zero a 1
            cpu.registers.zero = (cpu.registers.a == 0);
            //si el valor de A es igual a 0x0F, se pone el bit de halfcarry a 1
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) == 0xF);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.pc += 1;
        }
    }
}