export function loadInstructions(instruction, bus) {
    //LD BC, nn
    //0x01
    instruction[0x01] = {
        name: "LD BC, nn",
        opcode: 0x01,
        cycles: 12,
        execute: function(cpu){
            cpu.registers.c = bus.read(cpu.registers.pc + 1);
            cpu.registers.b = bus.read(cpu.registers.pc + 2);
            cpu.registers.pc += 3;
        }
    }
    //LD (BC), A
    //0x02
    instruction[0x02] = {
        name: "LD (BC), A",
        opcode: 0x02,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getBC(), cpu.registers.a);
            cpu.registers.pc += 1; 
        }
    }
    //LD B, n
    //0x06
    instruction[0x06] = {
        name: "LD B, n",
        opcode: 0x06,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de n en B
            cpu.registers.b = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
        }
    }
    //LD (nn), SP
    //0x08
    instruction[0x08] = {
        name: "LD (nn), SP",
        opcode: 0x08,
        cycles: 20,
        execute: function(cpu){
            let temp_var = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
            bus.write(temp_var, cpu.registers.sp & 0xFF);
            bus.write(temp_var + 1 & 0xFFFF, cpu.registers.sp >> 8);
            cpu.registers.pc += 3;
        }
    }
    //LD A, (BC)
    //0x0A
    instruction[0x0A] = {
        name: "LD A, (BC)",
        opcode: 0x0A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a = bus.read(cpu.registers.getBC());
            cpu.registers.pc += 1;
        }
    }
    //LD C, n
    //0x0E
    instruction[0x0E] = {
        name: "LD C, n",
        opcode: 0x0E,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable a
            cpu.registers.c = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
        }
    }
    //LD DE, nn
    //0x11
    instruction[0x11] = {
        name: "LD DE, nn",
        opcode: 0x11,
        cycles: 12,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable a
            cpu.registers.setDE(bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8));
            cpu.registers.pc += 3;
        }
    }
    //LD (DE), A
    //0x12
    instruction[0x12] = {
        name: "LD (DE), A",
        opcode: 0x12,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion DE en la variable a
            bus.write(cpu.registers.getDE(), cpu.registers.a);
            cpu.registers.pc += 1;
        }
    }
    //LD D, n
    //0x16
    instruction[0x16] = {
        name: "LD D, n",
        opcode: 0x16,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable d
            cpu.registers.d = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
        }
    }
    //LD A, (DE)
    //0x1A
    instruction[0x1A] = {
        name: "LD A, (DE)",
        opcode: 0x1A,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion DE en la variable a
            cpu.registers.a = bus.read(cpu.registers.getDE());
            cpu.registers.pc += 1;
        }
    }
    //LD E, n
    //0x1E
    instruction[0x1E] = {
        name: "LD E, n",
        opcode: 0x1E,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable a
            cpu.registers.e = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
        }
    }
    //LD HL, nn
    //0x21
    instruction[0x21] = {
        name: "LD HL, nn",
        opcode: 0x21,
        cycles: 12,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 y PC + 2 en HL
            cpu.registers.setHL(bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8));
            cpu.registers.pc += 3;
        }
    }
    //LDI (HL), A
    //0x22
    instruction[0x22] = {
        name: "LDI (HL), A",
        opcode: 0x22,
        cycles: 8,
        execute: function(cpu){
            //escribe en memoria el registro A en la posicion HL
            bus.write(cpu.registers.getHL(), cpu.registers.a);
            //incrementa el registro HL
            cpu.registers.setHL((cpu.registers.getHL() + 1) & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //LD H, n
    //0x26
    instruction[0x26] = {
        name: "LD H, n",
        opcode: 0x26,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable H
            cpu.registers.h = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
            /* revisar */
        }
    }
    //LD A, (HL+)
    //0x2A
    instruction[0x2A] = {
        name: "LD A, (HL+)",
        opcode: 0x2A,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion HL en la variable a
            cpu.registers.a = bus.read(cpu.registers.getHL());
            //incrementamos la posicion HL
            cpu.registers.setHL((cpu.registers.getHL() + 1) & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //LD L, n
    //0x2E
    instruction[0x2E] = {
        name: "LD L, n",
        opcode: 0x2E,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable L
            cpu.registers.l = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
            //mirar en repos a ver si es L o HL
        }
    }

    //LD SP, nn
    //0x31
    instruction[0x31] = {
        name: "LD SP, nn",
        opcode: 0x31,
        cycles: 12,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 y PC + 2 en SP
            cpu.registers.sp = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
            cpu.registers.pc += 3;
        }
    }
    //LD (HL-), A
    //0x32
    instruction[0x32] = {
        name: "LD (HL-), A",
        opcode: 0x32,
        cycles: 8,
        execute: function(cpu){
            //escribe en memoria el registro A en la posicion HL
            bus.write(cpu.registers.getHL(), cpu.registers.a);
            //decrementamos la posicion HL
            cpu.registers.setHL(cpu.registers.getHL() - 1);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), n
    //0x36
    instruction[0x36] = {
        name: "LD (HL), n",
        opcode: 0x36,
        cycles: 12,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la posicion HL
            bus.write(cpu.registers.getHL(), bus.read(cpu.registers.pc + 1));
            cpu.registers.pc += 2;
        }
    }
    //LD A, (HL-)
    //0x3A
    instruction[0x3A] = {
        name: "LD A, (HL-)",
        opcode: 0x3A,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion HL en la variable a
            cpu.registers.a = bus.read(cpu.registers.getHL());
            //decrementamos la posicion HL
            cpu.registers.setHL(cpu.registers.getHL() - 1);
            cpu.registers.pc += 1;
        }
    }
    //LD A, n
    //0x3E
    instruction[0x3E] = {
        name: "LD A, n",
        opcode: 0x3E,
        cycles: 8,
        execute: function(cpu){
            //guardamos el valor de la posicion PC + 1 en la variable A
            cpu.registers.a = bus.read(cpu.registers.pc + 1);
            cpu.registers.pc += 2;
        }
    }
    //LD B, B
    //0x40
    instruction[0x40] = {
        name: "LD B, B",
        opcode: 0x40,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD B, C
    //0x41
    instruction[0x41] = {
        name: "LD B, C",
        opcode: 0x41,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD B, D
    //0x42
    instruction[0x42] = {
        name: "LD B, D",
        opcode: 0x42,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD B, E
    //0x43
    instruction[0x43] = {
        name: "LD B, E",
        opcode: 0x43,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD B, H
    //0x44
    instruction[0x44] = {
        name: "LD B, H",
        opcode: 0x44,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD B, L
    //0x45
    instruction[0x45] = {
        name: "LD B, L",
        opcode: 0x45,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD B, (HL)
    //0x46
    instruction[0x46] = {
        name: "LD B, (HL)",
        opcode: 0x46,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
        }
    }
    //LD B, A
    //0x47
    instruction[0x47] = {
        name: "LD B, A",
        opcode: 0x47,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.b = cpu.registers.a;
            cpu.registers.pc += 1;
        }
        //revisada
    }
    //LD C, B
    //0x48
    instruction[0x48] = {
        name: "LD C, B",
        opcode: 0x48,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.c = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD C, C
    //0x49
    instruction[0x49] = {
        name: "LD C, C",
        opcode: 0x49,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD C, D
    //0x4A
    instruction[0x4A] = {
        name: "LD C, D",
        opcode: 0x4A,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.c = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD C, E
    //0x4B
    instruction[0x4B] = {
        name: "LD C, E",
        opcode: 0x4B,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.c = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD C, H
    //0x4C
    instruction[0x4C] = {
        name: "LD C, H",
        opcode: 0x4C,
        cycles: 4,
        execute: function(cpu){ 
            cpu.registers.c = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD C, L
    //0x4D
    instruction[0x4D] = {
        name: "LD C, L",
        opcode: 0x4D,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.c = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD C, (HL)
    //0x4E
    instruction[0x4E] = {
        name: "LD C, (HL)",
        opcode: 0x4E,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
            //revisar
        }
    }
    //LD C, A
    //0x4F
    instruction[0x4F] = {
        name: "LD C, A",
        opcode: 0x4F,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.c = cpu.registers.a;
            cpu.registers.pc += 1;
        }//revisada
    }
    //LD D, B
    //0x50
    instruction[0x50] = {
        name: "LD D, B",
        opcode: 0x50,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD D, C
    //0x51
    instruction[0x51] = {
        name: "LD D, C",
        opcode: 0x51,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD D, D
    //0x52
    instruction[0x52] = {
        name: "LD D, D",
        opcode: 0x52,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD D, E
    //0x53
    instruction[0x53] = {
        name: "LD D, E",
        opcode: 0x53,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD D, H
    //0x54
    instruction[0x54] = {
        name: "LD D, H",
        opcode: 0x54,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD D, L
    //0x55
    instruction[0x55] = {
        name: "LD D, L",
        opcode: 0x55,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD D, (HL)
    //0x56
    instruction[0x56] = {
        name: "LD D, (HL)",
        opcode: 0x56,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
        }
    }
    //LD D, A
    //0x57
    instruction[0x57] = {
        name: "LD D, A",
        opcode: 0x57,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.d = cpu.registers.a;
            cpu.registers.pc += 1;
        }
    }
    //LD E, B
    //0x58
    instruction[0x58] = {
        name: "LD E, B",
        opcode: 0x58,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD E, C
    //0x59
    instruction[0x59] = {
        name: "LD E, C",
        opcode: 0x59,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD E, D
    //0x5A
    instruction[0x5A] = {
        name: "LD E, D",
        opcode: 0x5A,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD E, E
    //0x5B
    instruction[0x5B] = {
        name: "LD E, E",
        opcode: 0x5B,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD E, H
    //0x5C
    instruction[0x5C] = {
        name: "LD E, H",
        opcode: 0x5C,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD E, L
    //0x5D
    instruction[0x5D] = {
        name: "LD E, L",
        opcode: 0x5D,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD E, (HL)
    //0x5E
    instruction[0x5E] = {
        name: "LD E, (HL)",
        opcode: 0x5E,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
            //revisar
        }
    }
    //LD E, A
    //0x5F
    instruction[0x5F] = {
        name: "LD E, A",
        opcode: 0x5F,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.e = cpu.registers.a;
            cpu.registers.pc += 1;
        }
    }
    //LD H, B
    //0x60
    instruction[0x60] = {
        name: "LD H, B",
        opcode: 0x60,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD H, C
    //0x61
    instruction[0x61] = {
        name: "LD H, C",
        opcode: 0x61,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD H, D
    //0x62
    instruction[0x62] = {
        name: "LD H, D",
        opcode: 0x62,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD H, E
    //0x63
    instruction[0x63] = {
        name: "LD H, E",
        opcode: 0x63,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD H, H
    //0x64
    instruction[0x64] = {
        name: "LD H, H",
        opcode: 0x64,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD H, L
    //0x65
    instruction[0x65] = {
        name: "LD H, L",
        opcode: 0x65,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD H, (HL)
    //0x66
    instruction[0x66] = {
        name: "LD H, (HL)",
        opcode: 0x66,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
            //revisar
        }
    }
    //LD H, A
    //0x67
    instruction[0x67] = {
        name: "LD H, A",
        opcode: 0x67,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.h = cpu.registers.a;
            cpu.registers.pc += 1;
        }
    }
    //LD L, B
    //0x68
    instruction[0x68] = {
        name: "LD L, B",
        opcode: 0x68,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD L, C
    //0x69
    instruction[0x69] = {
        name: "LD L, C",
        opcode: 0x69,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD L, D
    //0x6A
    instruction[0x6A] = {
        name: "LD L, D",
        opcode: 0x6A,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD L, E
    //0x6B
    instruction[0x6B] = {
        name: "LD L, E",
        opcode: 0x6B,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD L, H
    //0x6C
    instruction[0x6C] = {
        name: "LD L, H",
        opcode: 0x6C,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD L, L
    //0x6D
    instruction[0x6D] = {
        name: "LD L, L",
        opcode: 0x6D,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LD L, (HL)
    //0x6E
    instruction[0x6E] = {
        name: "LD L, (HL)",
        opcode: 0x6E,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
        }
    }
    //LD L, A
    //0x6F
    instruction[0x6F] = {
        name: "LD L, A",
        opcode: 0x6F,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.l = cpu.registers.a;
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), B
    //0x70
    instruction[0x70] = {
        name: "LD (HL), B",
        opcode: 0x70,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.b);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), C
    //0x71
    instruction[0x71] = {
        name: "LD (HL), C",
        opcode: 0x71,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.c);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), D
    //0x72
    instruction[0x72] = {
        name: "LD (HL), D",
        opcode: 0x72,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.d);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), E
    //0x73
    instruction[0x73] = {
        name: "LD (HL), E",
        opcode: 0x73,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.e);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), H
    //0x74
    instruction[0x74] = {
        name: "LD (HL), H",
        opcode: 0x74,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.h);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), L
    //0x75
    instruction[0x75] = {
        name: "LD (HL), L",
        opcode: 0x75,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.l);
            cpu.registers.pc += 1;
        }
    }
    //LD (HL), A
    //0x77
    instruction[0x77] = {
        name: "LD (HL), A",
        opcode: 0x77,
        cycles: 8,
        execute: function(cpu){
            bus.write(cpu.registers.getHL(), cpu.registers.a);
            cpu.registers.pc += 1;
        }
    }
    //LD A, B
    //0x78
    instruction[0x78] = {
        name: "LD A, B",
        opcode: 0x78,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.b;
            cpu.registers.pc += 1;
        }
    }
    //LD A, C
    //0x79
    instruction[0x79] = {
        name: "LD A, C",
        opcode: 0x79,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.c;
            cpu.registers.pc += 1;
        }
    }
    //LD A, D
    //0x7A
    instruction[0x7A] = {
        name: "LD A, D",
        opcode: 0x7A,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.d;
            cpu.registers.pc += 1;
        }
    }
    //LD A, E
    //0x7B
    instruction[0x7B] = {
        name: "LD A, E",
        opcode: 0x7B,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.e;
            cpu.registers.pc += 1;
        }
    }
    //LD A, H
    //0x7C
    instruction[0x7C] = {
        name: "LD A, H",
        opcode: 0x7C,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.h;
            cpu.registers.pc += 1;
        }
    }
    //LD A, L
    //0x7D
    instruction[0x7D] = {
        name: "LD A, L",
        opcode: 0x7D,
        cycles: 4,
        execute: function(cpu){
            cpu.registers.a = cpu.registers.l;
            cpu.registers.pc += 1;
        }
    }
    //LD A, (HL)
    //0x7E
    instruction[0x7E] = {
        name: "LD A, (HL)",
        opcode: 0x7E,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a = bus.read(cpu.registers.getHL());
            cpu.registers.pc += 1;
        }
    }
    //LD A, A
    //0x7F
    instruction[0x7F] = {
        name: "LD A, A",
        opcode: 0x7F,
        cycles: 4,
        execute: function(cpu){
            //no hace nada
            cpu.registers.pc += 1;
        }
    }
    //LDH (n), A
    //0xE0
    instruction[0xE0] = {
        name: "LDH (n), A",
        opcode: 0xE0,
        cycles: 12,
        execute: function(cpu){
            let address = 0xFF00 + bus.read(cpu.registers.pc + 1);
            bus.write(address, cpu.registers.a);
            cpu.registers.pc += 2;
        }
    }
    //LD (C), A
    //0xE2
    instruction[0xE2] = {
        name: "LD (C), A",
        opcode: 0xE2,
        cycles: 8,
        execute: function(cpu){
            bus.write(0xFF00 + cpu.registers.c, cpu.registers.a);
            cpu.registers.pc += 1;
        }
    }
    //LD (nn), A
    //0xEA
    instruction[0xEA] = {
        name: "LD (nn), A",
        opcode: 0xEA,
        cycles: 16,
        execute: function(cpu){
            let address = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
            bus.write(address, cpu.registers.a);
            cpu.registers.pc += 3;
        }
    }
    //LDH A, (n)
    //0xF0
    instruction[0xF0] = {
        name: "LDH A, (n)",
        opcode: 0xF0,
        cycles: 12,
        execute: function(cpu){
            let address = 0xFF00 + bus.read(cpu.registers.pc + 1);
            cpu.registers.a = bus.read(address);
            cpu.registers.pc += 2;
        }
    }
    //LD A, (C)
    //0xF2
    instruction[0xF2] = {
        name: "LD A, (C)",
        opcode: 0xF2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a = bus.read(0xFF00 + cpu.registers.c);
            cpu.registers.pc += 1;
        }
    }
    //LD HL,SP+n
    //0xF8
    instruction[0xF8] = {
        name: "LD HL, SP+n",
        opcode: 0xF8,
        cycles: 12,
        execute: function(cpu){
            let tempvar = (bus.read(cpu.registers.pc + 1)<<24)>>24;
            cpu.registers.setHL((cpu.registers.sp + tempvar) & 0xFFFF);
            tempvar = cpu.registers.sp ^ tempvar ^ cpu.registers.getHL();
            cpu.registers.carry = ((tempvar & 0x100) === 0x100);
            cpu.registers.halfcarry = ((tempvar & 0x10) === 0x10);
            cpu.registers.zero = false;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 2;
        }
        //revisada
    }
    //LD SP, HL
    //0xF9
    instruction[0xF9] = {
        name: "LD SP, HL",
        opcode: 0xF9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.sp = cpu.registers.getHL();
            cpu.registers.pc += 1;
        }
    }
    //LD A, (nn)
    //0xFA
    instruction[0xFA] = {
        name: "LD A, (nn)",
        opcode: 0xFA,
        cycles: 16,
        execute: function(cpu){
            let address = bus.read(cpu.registers.pc + 1) | (bus.read(cpu.registers.pc + 2) << 8);
            cpu.registers.a = bus.read(address);
            cpu.registers.pc += 3;
        }
    }
}