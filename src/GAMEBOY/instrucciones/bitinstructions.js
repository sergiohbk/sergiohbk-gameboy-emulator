export function bitinstuctions(instruction, bus, cbinstructions){
    //PREFIX CB
    //0xCB
    instruction[0xCB] = {
        name: "PREFIX CB",
        opcode: 0xCB,
        cycles: 0,
        execute: function(cpu){
            cpu.registers.pc += 1;
            var opcode = bus.read(cpu.registers.pc);
            if(cbinstructions[opcode] == undefined){
                throw new Error("Instruccion no implementada: " + opcode.toString(16) + " en " + cpu.registers.pc.toString(16));
            }
            instruction[0xCB].cycles = cbinstructions[opcode].cycles;
            cbinstructions[opcode].execute(cpu);
        }
    };
    //RLC B
    //0x00
    cbinstructions[0x00] = {
        name: "RLC B",
        opcode: 0x00,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.b > 0x7F);
            cpu.registers.b = ((cpu.registers.b << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC C
    //0x01
    cbinstructions[0x01] = {
        name: "RLC C",
        opcode: 0x01,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.c > 0x7F);
            cpu.registers.c = ((cpu.registers.c << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC D
    //0x02
    cbinstructions[0x02] = {
        name: "RLC D",
        opcode: 0x02,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.d > 0x7F);
            cpu.registers.d = ((cpu.registers.d << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC E
    //0x03
    cbinstructions[0x03] = {
        name: "RLC E",
        opcode: 0x03,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.e > 0x7F);
            cpu.registers.e = ((cpu.registers.e << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC H
    //0x04
    cbinstructions[0x04] = {
        name: "RLC H",
        opcode: 0x04,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.h > 0x7F);
            cpu.registers.h = ((cpu.registers.h << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC L
    //0x05
    cbinstructions[0x05] = {
        name: "RLC L",
        opcode: 0x05,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.l > 0x7F);
            cpu.registers.l = ((cpu.registers.l << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //RLC (HL)
    //0x06
    cbinstructions[0x06] = {
        name: "RLC (HL)",
        opcode: 0x06,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.carry = (value > 0x7F);
            value = ((value << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RLC A
    //0x07
    cbinstructions[0x07] = {
        name: "RLC A",
        opcode: 0x07,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = ((cpu.registers.a << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC B
    //0x08
    cbinstructions[0x08] = {
        name: "RRC B",
        opcode: 0x08,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.b & 0x01) == 1;
            cpu.registers.b = ((cpu.registers.b >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC C
    //0x09
    cbinstructions[0x09] = {
        name: "RRC C",
        opcode: 0x09,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.c & 0x01) == 1;
            cpu.registers.c = ((cpu.registers.c >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC D
    //0x0A
    cbinstructions[0x0A] = {
        name: "RRC D",
        opcode: 0x0A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.d & 0x01) == 1;
            cpu.registers.d = ((cpu.registers.d >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC E
    //0x0B
    cbinstructions[0x0B] = {
        name: "RRC E",
        opcode: 0x0B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.e & 0x01) == 1;
            cpu.registers.e = ((cpu.registers.e >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC H
    //0x0C
    cbinstructions[0x0C] = {
        name: "RRC H",
        opcode: 0x0C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.h & 0x01) == 1;
            cpu.registers.h = ((cpu.registers.h >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC L
    //0x0D
    cbinstructions[0x0D] = {
        name: "RRC L",
        opcode: 0x0D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.l & 0x01) == 1;
            cpu.registers.l = ((cpu.registers.l >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //RRC (HL)
    //0x0E
    cbinstructions[0x0E] = {
        name: "RRC (HL)",
        opcode: 0x0E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.carry = (value & 0x01) == 1;
            value = ((value >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RRC A
    //0x0F
    cbinstructions[0x0F] = {
        name: "RRC A",
        opcode: 0x0F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a & 0x01) == 1;
            cpu.registers.a = ((cpu.registers.a >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL B
    //0x10
    cbinstructions[0x10] = {
        name: "RL B",
        opcode: 0x10,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.b > 0x7F);
            cpu.registers.b = ((cpu.registers.b << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL C
    //0x11
    cbinstructions[0x11] = {
        name: "RL C",
        opcode: 0x11,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.c > 0x7F);
            cpu.registers.c = ((cpu.registers.c << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);    
            cpu.registers.pc += 1;
        }
    }
    //RL D
    //0x12
    cbinstructions[0x12] = {
        name: "RL D",
        opcode: 0x12,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.d > 0x7F);
            cpu.registers.d = ((cpu.registers.d << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL E
    //0x13
    cbinstructions[0x13] = {
        name: "RL E",
        opcode: 0x13,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.e > 0x7F);
            cpu.registers.e = ((cpu.registers.e << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL H
    //0x14
    cbinstructions[0x14] = {
        name: "RL H",
        opcode: 0x14,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.h > 0x7F);
            cpu.registers.h = ((cpu.registers.h << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL L
    //0x15
    cbinstructions[0x15] = {
        name: "RL L",
        opcode: 0x15,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.l > 0x7F);
            cpu.registers.l = ((cpu.registers.l << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //RL (HL)
    //0x16
    cbinstructions[0x16] = {
        name: "RL (HL)",
        opcode: 0x16,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            var carry = (value > 0x7F);
            value = ((value << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RL A
    //0x17
    cbinstructions[0x17] = {
        name: "RL A",
        opcode: 0x17,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = ((cpu.registers.a << 1) & 0xFF) | ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR B
    //0x18
    cbinstructions[0x18] = {
        name: "RR B",
        opcode: 0x18,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.b & 0x01) == 0x01;
            cpu.registers.b = ((cpu.registers.b >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR C
    //0x19
    cbinstructions[0x19] = {
        name: "RR C",
        opcode: 0x19,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.c & 0x01) == 0x01;
            cpu.registers.c = ((cpu.registers.c >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR D
    //0x1A
    cbinstructions[0x1A] = {
        name: "RR D",
        opcode: 0x1A,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.d & 0x01) == 0x01;
            cpu.registers.d = ((cpu.registers.d >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR E
    //0x1B
    cbinstructions[0x1B] = {
        name: "RR E",
        opcode: 0x1B,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.e & 0x01) == 0x01;
            cpu.registers.e = ((cpu.registers.e >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR H
    //0x1C
    cbinstructions[0x1C] = {
        name: "RR H",
        opcode: 0x1C,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.h & 0x01) == 0x01;
            cpu.registers.h = ((cpu.registers.h >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR L
    //0x1D
    cbinstructions[0x1D] = {
        name: "RR L",
        opcode: 0x1D,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.l & 0x01) == 0x01;
            cpu.registers.l = ((cpu.registers.l >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //RR (HL)
    //0x1E
    cbinstructions[0x1E] = {
        name: "RR (HL)",
        opcode: 0x1E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            var carry = (value & 0x01) == 0x01;
            value = ((value >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RR A
    //0x1F
    cbinstructions[0x1F] = {
        name: "RR A",
        opcode: 0x1F,
        cycles: 8,
        execute: function(cpu){
            var carry = (cpu.registers.a & 0x01) == 0x01;
            cpu.registers.a = ((cpu.registers.a >> 1) & 0xFF) | ((cpu.registers.carry) ? 0x80 : 0);
            cpu.registers.carry = carry;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA B
    //0x20
    cbinstructions[0x20] = {
        name: "SLA B",
        opcode: 0x20,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.b > 0x7F);
            cpu.registers.b = (cpu.registers.b << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA C
    //0x21
    cbinstructions[0x21] = {
        name: "SLA C",
        opcode: 0x21,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.c > 0x7F);
            cpu.registers.c = (cpu.registers.c << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA D
    //0x22
    cbinstructions[0x22] = {
        name: "SLA D",
        opcode: 0x22,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.d > 0x7F);
            cpu.registers.d = (cpu.registers.d << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA E
    //0x23
    cbinstructions[0x23] = {
        name: "SLA E",
        opcode: 0x23,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.e > 0x7F);
            cpu.registers.e = (cpu.registers.e << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA H
    //0x24
    cbinstructions[0x24] = {
        name: "SLA H",
        opcode: 0x24,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.h > 0x7F);
            cpu.registers.h = (cpu.registers.h << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA L
    //0x25
    cbinstructions[0x25] = {
        name: "SLA L",
        opcode: 0x25,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.l > 0x7F);
            cpu.registers.l = (cpu.registers.l << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //SLA (HL)
    //0x26
    cbinstructions[0x26] = {
        name: "SLA (HL)",
        opcode: 0x26,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.carry = (value > 0x7F);
            value = (value << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SLA A
    //0x27
    cbinstructions[0x27] = {
        name: "SLA A",
        opcode: 0x27,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = (cpu.registers.a << 1) & 0xFF;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA B
    //0x28
    cbinstructions[0x28] = {
        name: "SRA B",
        opcode: 0x28,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.b & 0x01) == 0x01;
            cpu.registers.b = (cpu.registers.b >> 1) | (cpu.registers.b & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA C
    //0x29
    cbinstructions[0x29] = {
        name: "SRA C",
        opcode: 0x29,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.c & 0x01) == 0x01;
            cpu.registers.c = (cpu.registers.c >> 1) | (cpu.registers.c & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA D
    //0x2A
    cbinstructions[0x2A] = {
        name: "SRA D",
        opcode: 0x2A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.d & 0x01) == 0x01;
            cpu.registers.d = (cpu.registers.d >> 1) | (cpu.registers.d & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA E
    //0x2B
    cbinstructions[0x2B] = {
        name: "SRA E",
        opcode: 0x2B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.e & 0x01) == 0x01;
            cpu.registers.e = (cpu.registers.e >> 1) | (cpu.registers.e & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA H
    //0x2C
    cbinstructions[0x2C] = {
        name: "SRA H",
        opcode: 0x2C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.h & 0x01) == 0x01;
            cpu.registers.h = (cpu.registers.h >> 1) | (cpu.registers.h & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA L
    //0x2D
    cbinstructions[0x2D] = {
        name: "SRA L",
        opcode: 0x2D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.l & 0x01) == 0x01;
            cpu.registers.l = (cpu.registers.l >> 1) | (cpu.registers.l & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRA (HL)
    //0x2E
    cbinstructions[0x2E] = {
        name: "SRA (HL)",
        opcode: 0x2E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.carry = (value & 0x01) == 0x01;
            value = (value >> 1) | (value & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SRA A
    //0x2F
    cbinstructions[0x2F] = {
        name: "SRA A",
        opcode: 0x2F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a & 0x01) == 0x01;
            cpu.registers.a = (cpu.registers.a >> 1) | (cpu.registers.a & 0x80);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP B
    //0x30
    cbinstructions[0x30] = {
        name: "SWAP B",
        opcode: 0x30,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b = ((cpu.registers.b & 0xF) << 4) | (cpu.registers.b >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP C
    //0x31
    cbinstructions[0x31] = {
        name: "SWAP C",
        opcode: 0x31,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c = ((cpu.registers.c & 0xF) << 4)  | (cpu.registers.c >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP D
    //0x32
    cbinstructions[0x32] = {
        name: "SWAP D",
        opcode: 0x32,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d = ((cpu.registers.d & 0xF) << 4)  | (cpu.registers.d >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP E
    //0x33
    cbinstructions[0x33] = {
        name: "SWAP E",
        opcode: 0x33,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e = ((cpu.registers.e & 0xF) << 4)  | (cpu.registers.e >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP H
    //0x34
    cbinstructions[0x34] = {
        name: "SWAP H",
        opcode: 0x34,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h = ((cpu.registers.h & 0xF) << 4)  | (cpu.registers.h >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP L
    //0x35
    cbinstructions[0x35] = {
        name: "SWAP L",
        opcode: 0x35,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l = ((cpu.registers.l & 0xF) << 4)  | (cpu.registers.l >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //SWAP (HL)
    //0x36
    cbinstructions[0x36] = {
        name: "SWAP (HL)",
        opcode: 0x36,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value = ((value & 0xF) << 4)  | (value >> 4);
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SWAP A
    //0x37
    cbinstructions[0x37] = {
        name: "SWAP A",
        opcode: 0x37,
        cycles: 8,
        execute: function(cpu){
            //movemos los 4 primeros bits a los 4 ultimos y viceversa
            cpu.registers.a = ((cpu.registers.a & 0xF) << 4) | ((cpu.registers.a) >> 4);
            cpu.registers.carry = false;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.carry = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL B
    //0x38
    cbinstructions[0x38] = {
        name: "SRL B",
        opcode: 0x38,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.b & 0x01) == 0x01;
            cpu.registers.b >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.b == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL C
    //0x39
    cbinstructions[0x39] = {
        name: "SRL C",
        opcode: 0x39,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.c & 0x01) == 0x01;
            cpu.registers.c >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.c == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL D
    //0x3A
    cbinstructions[0x3A] = {
        name: "SRL D",
        opcode: 0x3A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.d & 0x01) == 0x01;
            cpu.registers.d >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.d == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL E
    //0x3B
    cbinstructions[0x3B] = {
        name: "SRL E",
        opcode: 0x3B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.e & 0x01) == 0x01;
            cpu.registers.e >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.e == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL H
    //0x3C
    cbinstructions[0x3C] = {
        name: "SRL H",
        opcode: 0x3C,   
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.h & 0x01) == 0x01;
            cpu.registers.h >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.h == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL L
    //0x3D
    cbinstructions[0x3D] = {
        name: "SRL L",
        opcode: 0x3D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.l & 0x01) == 0x01;
            cpu.registers.l >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.l == 0);
            cpu.registers.pc += 1;
        }
    }
    //SRL (HL)
    //0x3E
    cbinstructions[0x3E] = {
        name: "SRL (HL)",
        opcode: 0x3E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.carry = (value & 0x01) == 0x01;
            value >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (value == 0);
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SRL A
    //0x3F
    cbinstructions[0x3F] = {
        name: "SRL A",
        opcode: 0x3F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.carry = (cpu.registers.a & 0x01) == 0x01;
            cpu.registers.a >>= 1;
            cpu.registers.halfcarry = false;
            cpu.registers.subtraction = false;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, B
    //0x40
    cbinstructions[0x40] = {
        name: "BIT 0, B",
        opcode: 0x40,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, C
    //0x41
    cbinstructions[0x41] = {
        name: "BIT 0, C",
        opcode: 0x41,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, D
    //0x42
    cbinstructions[0x42] = {
        name: "BIT 0, D",
        opcode: 0x42,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, E
    //0x43
    cbinstructions[0x43] = {
        name: "BIT 0, E",
        opcode: 0x43,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, H
    //0x44
    cbinstructions[0x44] = {
        name: "BIT 0, H",
        opcode: 0x44,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, L
    //0x45
    cbinstructions[0x45] = {
        name: "BIT 0, L",
        opcode: 0x45,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, (HL)
    //0x46
    cbinstructions[0x46] = {
        name: "BIT 0, (HL)",
        opcode: 0x46,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 0, A
    //0x47
    cbinstructions[0x47] = {
        name: "BIT 0, A",
        opcode: 0x47,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x01) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, B
    //0x48
    cbinstructions[0x48] = {
        name: "BIT 1, B",
        opcode: 0x48,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, C
    //0x49
    cbinstructions[0x49] = {
        name: "BIT 1, C",
        opcode: 0x49,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, D
    //0x4A
    cbinstructions[0x4A] = {
        name: "BIT 1, D",
        opcode: 0x4A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, E
    //0x4B
    cbinstructions[0x4B] = {
        name: "BIT 1, E",
        opcode: 0x4B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, H
    //0x4C
    cbinstructions[0x4C] = {
        name: "BIT 1, H",
        opcode: 0x4C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, L
    //0x4D
    cbinstructions[0x4D] = {
        name: "BIT 1, L",
        opcode: 0x4D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, (HL)
    //0x4E
    cbinstructions[0x4E] = {
        name: "BIT 1, (HL)",
        opcode: 0x4E,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 1, A
    //0x4F
    cbinstructions[0x4F] = {
        name: "BIT 1, A",
        opcode: 0x4F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x02) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, B
    //0x50
    cbinstructions[0x50] = {
        name: "BIT 2, B",
        opcode: 0x50,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, C
    //0x51
    cbinstructions[0x51] = {
        name: "BIT 2, C",
        opcode: 0x51,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, D
    //0x52
    cbinstructions[0x52] = {
        name: "BIT 2, D",
        opcode: 0x52,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, E
    //0x53
    cbinstructions[0x53] = {
        name: "BIT 2, E",
        opcode: 0x53,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, H
    //0x54
    cbinstructions[0x54] = {
        name: "BIT 2, H",
        opcode: 0x54,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, L
    //0x55
    cbinstructions[0x55] = {
        name: "BIT 2, L",
        opcode: 0x55,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, (HL)
    //0x56
    cbinstructions[0x56] = {
        name: "BIT 2, (HL)",
        opcode: 0x56,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 2, A
    //0x57
    cbinstructions[0x57] = {
        name: "BIT 2, A",
        opcode: 0x57,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x04) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, B
    //0x58
    cbinstructions[0x58] = {
        name: "BIT 3, B",
        opcode: 0x58,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, C
    //0x59
    cbinstructions[0x59] = {
        name: "BIT 3, C",
        opcode: 0x59,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, D
    //0x5A
    cbinstructions[0x5A] = {
        name: "BIT 3, D",
        opcode: 0x5A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, E
    //0x5B
    cbinstructions[0x5B] = {
        name: "BIT 3, E",
        opcode: 0x5B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, H
    //0x5C
    cbinstructions[0x5C] = {
        name: "BIT 3, H",
        opcode: 0x5C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, L
    //0x5D
    cbinstructions[0x5D] = {
        name: "BIT 3, L",
        opcode: 0x5D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 3, (HL)
    //0x5E
    cbinstructions[0x5E] = {
        name: "BIT 3, (HL)",
        opcode: 0x5E,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }   
    //BIT 3, A
    //0x5F
    cbinstructions[0x5F] = {
        name: "BIT 3, A",
        opcode: 0x5F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x08) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, B
    //0x60
    cbinstructions[0x60] = {
        name: "BIT 4, B",
        opcode: 0x60,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, C
    //0x61
    cbinstructions[0x61] = {
        name: "BIT 4, C",
        opcode: 0x61,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, D
    //0x62
    cbinstructions[0x62] = {
        name: "BIT 4, D",
        opcode: 0x62,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, E
    //0x63
    cbinstructions[0x63] = {
        name: "BIT 4, E",
        opcode: 0x63,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, H
    //0x64
    cbinstructions[0x64] = {
        name: "BIT 4, H",
        opcode: 0x64,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, L
    //0x65
    cbinstructions[0x65] = {
        name: "BIT 4, L",
        opcode: 0x65,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, (HL)
    //0x66
    cbinstructions[0x66] = {
        name: "BIT 4, (HL)",
        opcode: 0x66,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 4, A
    //0x67
    cbinstructions[0x67] = {
        name: "BIT 4, A",
        opcode: 0x67,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x10) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, B
    //0x68
    cbinstructions[0x68] = {
        name: "BIT 5, B",
        opcode: 0x68,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, C
    //0x69
    cbinstructions[0x69] = {
        name: "BIT 5, C",
        opcode: 0x69,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, D
    //0x6A
    cbinstructions[0x6A] = {
        name: "BIT 5, D",
        opcode: 0x6A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, E
    //0x6B
    cbinstructions[0x6B] = {
        name: "BIT 5, E",
        opcode: 0x6B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, H
    //0x6C
    cbinstructions[0x6C] = {
        name: "BIT 5, H",
        opcode: 0x6C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, L
    //0x6D
    cbinstructions[0x6D] = {
        name: "BIT 5, L",
        opcode: 0x6D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, (HL)
    //0x6E
    cbinstructions[0x6E] = {
        name: "BIT 5, (HL)",    
        opcode: 0x6E,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 5, A
    //0x6F
    cbinstructions[0x6F] = {
        name: "BIT 5, A",
        opcode: 0x6F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x20) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, B
    //0x70
    cbinstructions[0x70] = {
        name: "BIT 6, B",
        opcode: 0x70,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, C
    //0x71
    cbinstructions[0x71] = {
        name: "BIT 6, C",
        opcode: 0x71,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, D
    //0x72
    cbinstructions[0x72] = {
        name: "BIT 6, D",
        opcode: 0x72,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, E
    //0x73
    cbinstructions[0x73] = {
        name: "BIT 6, E",
        opcode: 0x73,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, H
    //0x74
    cbinstructions[0x74] = {
        name: "BIT 6, H",
        opcode: 0x74,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, L
    //0x75
    cbinstructions[0x75] = {
        name: "BIT 6, L",
        opcode: 0x75,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, (HL)
    //0x76
    cbinstructions[0x76] = {
        name: "BIT 6, (HL)",
        opcode: 0x76,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 6, A
    //0x77
    cbinstructions[0x77] = {
        name: "BIT 6, A",
        opcode: 0x77,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x40) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, B
    //0x78
    cbinstructions[0x78] = {
        name: "BIT 7, B",
        opcode: 0x78,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.b & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, C
    //0x79
    cbinstructions[0x79] = {
        name: "BIT 7, C",
        opcode: 0x79,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.c & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, D
    //0x7A
    cbinstructions[0x7A] = {
        name: "BIT 7, D",
        opcode: 0x7A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.d & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, E
    //0x7B
    cbinstructions[0x7B] = {
        name: "BIT 7, E",
        opcode: 0x7B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.e & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, H
    //0x7C
    cbinstructions[0x7C] = {
        name: "BIT 7, H",
        opcode: 0x7C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.h & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, L
    //0x7D
    cbinstructions[0x7D] = {
        name: "BIT 7, L",
        opcode: 0x7D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.l & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, (HL)
    //0x7E
    cbinstructions[0x7E] = {
        name: "BIT 7, (HL)",
        opcode: 0x7E,
        cycles: 12,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            cpu.registers.zero = (value & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //BIT 7, A
    //0x7F
    cbinstructions[0x7F] = {
        name: "BIT 7, A",
        opcode: 0x7F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.zero = (cpu.registers.a & 0x80) == 0x00;
            cpu.registers.halfcarry = true;
            cpu.registers.subtraction = false;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, B
    //0x80
    cbinstructions[0x80] = {
        name: "RES 0, B",
        opcode: 0x80,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, C
    //0x81
    cbinstructions[0x81] = {
        name: "RES 0, C",
        opcode: 0x81,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, D
    //0x82
    cbinstructions[0x82] = {
        name: "RES 0, D",
        opcode: 0x82,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, E
    //0x83
    cbinstructions[0x83] = {
        name: "RES 0, E",
        opcode: 0x83,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, H
    //0x84
    cbinstructions[0x84] = {
        name: "RES 0, H",
        opcode: 0x84,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, L
    //0x85
    cbinstructions[0x85] = {
        name: "RES 0, L",
        opcode: 0x85,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 0, (HL)
    //0x86
    cbinstructions[0x86] = {
        name: "RES 0, (HL)",
        opcode: 0x86,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xFE;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 0, A
    //0x87
    cbinstructions[0x87] = {
        name: "RES 0, A",
        opcode: 0x87,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xFE;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, B
    //0x88
    cbinstructions[0x88] = {
        name: "RES 1, B",
        opcode: 0x88,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, C
    //0x89
    cbinstructions[0x89] = {
        name: "RES 1, C",
        opcode: 0x89,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, D
    //0x8A
    cbinstructions[0x8A] = {    
        name: "RES 1, D",
        opcode: 0x8A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, E
    //0x8B
    cbinstructions[0x8B] = {
        name: "RES 1, E",
        opcode: 0x8B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, H
    //0x8C
    cbinstructions[0x8C] = {
        name: "RES 1, H",
        opcode: 0x8C,
        cycles: 8,
        execute: function(cpu){ 
            cpu.registers.h &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, L
    //0x8D
    cbinstructions[0x8D] = {
        name: "RES 1, L",
        opcode: 0x8D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 1, (HL)
    //0x8E
    cbinstructions[0x8E] = {
        name: "RES 1, (HL)",
        opcode: 0x8E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xFD;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 1, A
    //0x8F
    cbinstructions[0x8F] = {
        name: "RES 1, A",
        opcode: 0x8F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xFD;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, B
    //0x90
    cbinstructions[0x90] = {
        name: "RES 2, B",
        opcode: 0x90,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, C
    //0x91
    cbinstructions[0x91] = {
        name: "RES 2, C",
        opcode: 0x91,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, D
    //0x92
    cbinstructions[0x92] = {
        name: "RES 2, D",
        opcode: 0x92,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, E
    //0x93
    cbinstructions[0x93] = {
        name: "RES 2, E",
        opcode: 0x93,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, H
    //0x94
    cbinstructions[0x94] = {
        name: "RES 2, H",
        opcode: 0x94,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, L
    //0x95
    cbinstructions[0x95] = {
        name: "RES 2, L",
        opcode: 0x95,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 2, (HL)
    //0x96
    cbinstructions[0x96] = {
        name: "RES 2, (HL)",
        opcode: 0x96,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xFB;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 2, A
    //0x97
    cbinstructions[0x97] = {
        name: "RES 2, A",
        opcode: 0x97,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xFB;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, B
    //0x98
    cbinstructions[0x98] = {
        name: "RES 3, B",
        opcode: 0x98,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, C
    //0x99
    cbinstructions[0x99] = {
        name: "RES 3, C",
        opcode: 0x99,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, D
    //0x9A
    cbinstructions[0x9A] = {
        name: "RES 3, D",
        opcode: 0x9A,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, E
    //0x9B
    cbinstructions[0x9B] = {
        name: "RES 3, E",
        opcode: 0x9B,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, H
    //0x9C
    cbinstructions[0x9C] = {
        name: "RES 3, H",
        opcode: 0x9C,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, L
    //0x9D
    cbinstructions[0x9D] = {
        name: "RES 3, L",
        opcode: 0x9D,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 3, (HL)
    //0x9E
    cbinstructions[0x9E] = {
        name: "RES 3, (HL)",
        opcode: 0x9E,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xF7;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 3, A
    //0x9F
    cbinstructions[0x9F] = {
        name: "RES 3, A",
        opcode: 0x9F,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xF7;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, B
    //0xA0  
    cbinstructions[0xA0] = {
        name: "RES 4, B",
        opcode: 0xA0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, C
    //0xA1
    cbinstructions[0xA1] = {
        name: "RES 4, C",
        opcode: 0xA1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, D
    //0xA2
    cbinstructions[0xA2] = {
        name: "RES 4, D",
        opcode: 0xA2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, E
    //0xA3
    cbinstructions[0xA3] = {
        name: "RES 4, E",
        opcode: 0xA3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, H
    //0xA4
    cbinstructions[0xA4] = {    
        name: "RES 4, H",
        opcode: 0xA4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, L
    //0xA5
    cbinstructions[0xA5] = {
        name: "RES 4, L",
        opcode: 0xA5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 4, (HL)
    //0xA6
    cbinstructions[0xA6] = {
        name: "RES 4, (HL)",
        opcode: 0xA6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xEF;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 4, A
    //0xA7
    cbinstructions[0xA7] = {
        name: "RES 4, A",
        opcode: 0xA7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xEF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, B
    //0xA8
    cbinstructions[0xA8] = {
        name: "RES 5, B",
        opcode: 0xA8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, C
    //0xA9
    cbinstructions[0xA9] = {
        name: "RES 5, C",
        opcode: 0xA9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, D
    //0xAA
    cbinstructions[0xAA] = {
        name: "RES 5, D",
        opcode: 0xAA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, E
    //0xAB
    cbinstructions[0xAB] = {
        name: "RES 5, E",
        opcode: 0xAB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, H
    //0xAC
    cbinstructions[0xAC] = {
        name: "RES 5, H",
        opcode: 0xAC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, L
    //0xAD
    cbinstructions[0xAD] = {
        name: "RES 5, L",
        opcode: 0xAD,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 5, (HL)
    //0xAE
    cbinstructions[0xAE] = {
        name: "RES 5, (HL)",    
        opcode: 0xAE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xDF;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 5, A
    //0xAF
    cbinstructions[0xAF] = {
        name: "RES 5, A",
        opcode: 0xAF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xDF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, B
    //0xB0
    cbinstructions[0xB0] = {
        name: "RES 6, B",
        opcode: 0xB0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, C
    //0xB1
    cbinstructions[0xB1] = {
        name: "RES 6, C",
        opcode: 0xB1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, D
    //0xB2
    cbinstructions[0xB2] = {
        name: "RES 6, D",
        opcode: 0xB2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, E
    //0xB3
    cbinstructions[0xB3] = {
        name: "RES 6, E",
        opcode: 0xB3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, H
    //0xB4
    cbinstructions[0xB4] = {
        name: "RES 6, H",
        opcode: 0xB4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, L
    //0xB5
    cbinstructions[0xB5] = {
        name: "RES 6, L",
        opcode: 0xB5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 6, (HL)
    //0xB6
    cbinstructions[0xB6] = {
        name: "RES 6, (HL)",
        opcode: 0xB6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0xBF;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 6, A
    //0xB7
    cbinstructions[0xB7] = {
        name: "RES 6, A",
        opcode: 0xB7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0xBF;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, B
    //0xB8
    cbinstructions[0xB8] = {
        name: "RES 7, B",
        opcode: 0xB8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, C
    //0xB9
    cbinstructions[0xB9] = {
        name: "RES 7, C",
        opcode: 0xB9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, D
    //0xBA
    cbinstructions[0xBA] = {
        name: "RES 7, D",
        opcode: 0xBA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, E
    //0xBB
    cbinstructions[0xBB] = {
        name: "RES 7, E",
        opcode: 0xBB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, H
    //0xBC
    cbinstructions[0xBC] = {
        name: "RES 7, H",
        opcode: 0xBC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, L
    //0xBD
    cbinstructions[0xBD] = {
        name: "RES 7, L",
        opcode: 0xBD,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //RES 7, (HL)
    //0xBE
    cbinstructions[0xBE] = {
        name: "RES 7, (HL)",
        opcode: 0xBE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value &= 0x7F;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //RES 7, A
    //0xBF
    cbinstructions[0xBF] = {
        name: "RES 7, A",
        opcode: 0xBF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a &= 0x7F;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, B
    //0xC0
    cbinstructions[0xC0] = {
        name: "SET 0, B",
        opcode: 0xC0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, C
    //0xC1
    cbinstructions[0xC1] = {
        name: "SET 0, C",
        opcode: 0xC1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, D
    //0xC2
    cbinstructions[0xC2] = {
        name: "SET 0, D",
        opcode: 0xC2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, E
    //0xC3
    cbinstructions[0xC3] = {
        name: "SET 0, E",
        opcode: 0xC3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, H
    //0xC4
    cbinstructions[0xC4] = {
        name: "SET 0, H",
        opcode: 0xC4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, L
    //0xC5
    cbinstructions[0xC5] = {
        name: "SET 0, L",
        opcode: 0xC5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 0, (HL)
    //0xC6
    cbinstructions[0xC6] = {
        name: "SET 0, (HL)",
        opcode: 0xC6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x01;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 0, A
    //0xC7
    cbinstructions[0xC7] = {
        name: "SET 0, A",
        opcode: 0xC7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x01;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, B
    //0xC8
    cbinstructions[0xC8] = {
        name: "SET 1, B",
        opcode: 0xC8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, C
    //0xC9
    cbinstructions[0xC9] = {
        name: "SET 1, C",
        opcode: 0xC9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, D
    //0xCA
    cbinstructions[0xCA] = {
        name: "SET 1, D",
        opcode: 0xCA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, E
    //0xCB
    cbinstructions[0xCB] = {
        name: "SET 1, E",
        opcode: 0xCB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, H
    //0xCC
    cbinstructions[0xCC] = {
        name: "SET 1, H",
        opcode: 0xCC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, L
    //0xCD
    cbinstructions[0xCD] = {
        name: "SET 1, L",
        opcode: 0xCD,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 1, (HL)
    //0xCE
    cbinstructions[0xCE] = {
        name: "SET 1, (HL)",
        opcode: 0xCE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x02;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 1, A
    //0xCF
    cbinstructions[0xCF] = {
        name: "SET 1, A",
        opcode: 0xCF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x02;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, B
    //0xD0
    cbinstructions[0xD0] = {
        name: "SET 2, B",
        opcode: 0xD0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, C
    //0xD1
    cbinstructions[0xD1] = {
        name: "SET 2, C",
        opcode: 0xD1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, D
    //0xD2
    cbinstructions[0xD2] = {
        name: "SET 2, D",
        opcode: 0xD2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, E
    //0xD3
    cbinstructions[0xD3] = {
        name: "SET 2, E",
        opcode: 0xD3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, H
    //0xD4
    cbinstructions[0xD4] = {
        name: "SET 2, H",
        opcode: 0xD4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, L
    //0xD5
    cbinstructions[0xD5] = {
        name: "SET 2, L",
        opcode: 0xD5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 2, (HL)
    //0xD6
    cbinstructions[0xD6] = {
        name: "SET 2, (HL)",
        opcode: 0xD6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x04;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 2, A
    //0xD7
    cbinstructions[0xD7] = {
        name: "SET 2, A",
        opcode: 0xD7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x04;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, B
    //0xD8
    cbinstructions[0xD8] = {
        name: "SET 3, B",
        opcode: 0xD8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, C
    //0xD9
    cbinstructions[0xD9] = {
        name: "SET 3, C",
        opcode: 0xD9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, D
    //0xDA
    cbinstructions[0xDA] = {
        name: "SET 3, D",
        opcode: 0xDA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, E
    //0xDB
    cbinstructions[0xDB] = {
        name: "SET 3, E",
        opcode: 0xDB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, H
    //0xDC
    cbinstructions[0xDC] = {
        name: "SET 3, H",
        opcode: 0xDC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, L  
    //0xDD
    cbinstructions[0xDD] = {
        name: "SET 3, L",
        opcode: 0xDD,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 3, (HL)
    //0xDE
    cbinstructions[0xDE] = {
        name: "SET 3, (HL)",
        opcode: 0xDE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x08;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 3, A
    //0xDF
    cbinstructions[0xDF] = {
        name: "SET 3, A",
        opcode: 0xDF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x08;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, B
    //0xE0
    cbinstructions[0xE0] = {
        name: "SET 4, B",
        opcode: 0xE0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, C
    //0xE1
    cbinstructions[0xE1] = {
        name: "SET 4, C",
        opcode: 0xE1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, D
    //0xE2
    cbinstructions[0xE2] = {
        name: "SET 4, D",
        opcode: 0xE2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, E
    //0xE3
    cbinstructions[0xE3] = {
        name: "SET 4, E",
        opcode: 0xE3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, H
    //0xE4
    cbinstructions[0xE4] = {
        name: "SET 4, H",
        opcode: 0xE4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, L
    //0xE5
    cbinstructions[0xE5] = {
        name: "SET 4, L",
        opcode: 0xE5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 4, (HL)
    //0xE6
    cbinstructions[0xE6] = {
        name: "SET 4, (HL)",
        opcode: 0xE6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x10;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 4, A
    //0xE7
    cbinstructions[0xE7] = {
        name: "SET 4, A",
        opcode: 0xE7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x10;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, B
    //0xE8
    cbinstructions[0xE8] = {
        name: "SET 5, B",
        opcode: 0xE8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, C
    //0xE9
    cbinstructions[0xE9] = {
        name: "SET 5, C",
        opcode: 0xE9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, D
    //0xEA
    cbinstructions[0xEA] = {
        name: "SET 5, D",
        opcode: 0xEA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, E
    //0xEB
    cbinstructions[0xEB] = {
        name: "SET 5, E",
        opcode: 0xEB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, H
    //0xEC
    cbinstructions[0xEC] = {
        name: "SET 5, H",
        opcode: 0xEC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, L
    //0xED
    cbinstructions[0xED] = {
        name: "SET 5, L",
        opcode: 0xED,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 5, (HL)
    //0xEE
    cbinstructions[0xEE] = {
        name: "SET 5, (HL)",
        opcode: 0xEE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x20;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 5, A
    //0xEF
    cbinstructions[0xEF] = {
        name: "SET 5, A",
        opcode: 0xEF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x20;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, B
    //0xF0
    cbinstructions[0xF0] = {
        name: "SET 6, B",
        opcode: 0xF0,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, C
    //0xF1
    cbinstructions[0xF1] = {    
        name: "SET 6, C",
        opcode: 0xF1,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, D
    //0xF2
    cbinstructions[0xF2] = {
        name: "SET 6, D",
        opcode: 0xF2,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, E
    //0xF3
    cbinstructions[0xF3] = {
        name: "SET 6, E",
        opcode: 0xF3,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, H
    //0xF4
    cbinstructions[0xF4] = {
        name: "SET 6, H",
        opcode: 0xF4,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, L
    //0xF5
    cbinstructions[0xF5] = {
        name: "SET 6, L",
        opcode: 0xF5,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 6, (HL)
    //0xF6
    cbinstructions[0xF6] = {
        name: "SET 6, (HL)",
        opcode: 0xF6,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x40;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 6, A
    //0xF7
    cbinstructions[0xF7] = {
        name: "SET 6, A",
        opcode: 0xF7,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x40;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, B
    //0xF8
    cbinstructions[0xF8] = {
        name: "SET 7, B",
        opcode: 0xF8,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.b |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, C
    //0xF9
    cbinstructions[0xF9] = {
        name: "SET 7, C",
        opcode: 0xF9,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.c |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, D
    //0xFA
    cbinstructions[0xFA] = {
        name: "SET 7, D",
        opcode: 0xFA,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.d |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, E
    //0xFB
    cbinstructions[0xFB] = {
        name: "SET 7, E",
        opcode: 0xFB,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.e |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, H
    //0xFC
    cbinstructions[0xFC] = {
        name: "SET 7, H",
        opcode: 0xFC,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.h |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, L
    //0xFD
    cbinstructions[0xFD] = {
        name: "SET 7, L",
        opcode: 0xFD,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.l |= 0x80;
            cpu.registers.pc += 1;
        }
    }
    //SET 7, (HL)
    //0xFE
    cbinstructions[0xFE] = {
        name: "SET 7, (HL)",
        opcode: 0xFE,
        cycles: 16,
        execute: function(cpu){
            var value = bus.read(cpu.registers.getHL());
            value |= 0x80;
            bus.write(cpu.registers.getHL(), value);
            cpu.registers.pc += 1;
        }
    }
    //SET 7, A
    //0xFF
    cbinstructions[0xFF] = {
        name: "SET 7, A",
        opcode: 0xFF,
        cycles: 8,
        execute: function(cpu){
            cpu.registers.a |= 0x80;
            cpu.registers.pc += 1;
        }
    }

}