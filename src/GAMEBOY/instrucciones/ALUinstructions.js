export function aluinstructions(instruction, bus){
    //ADD HL, BC
    //0x09
    instruction[0x09] = {
        name: "ADD HL, BC",
        opcode: 0x09,
        cycles: 8,
        execute: function(cpu){
            //sumamos el valor de BC a HL
            let suma = cpu.registers.getHL() + cpu.registers.getBC();
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.getHL() & 0xFFF) > (suma & 0xFFF);
            //cambiamos el bit de carry si la suma es mayor que 0xFFFF
            cpu.registers.carry = (suma > 0xFFFF);
            cpu.registers.setHL(suma & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //ADD HL, DE
    //0x19
    instruction[0x19] = {
        name: "ADD HL, DE",
        opcode: 0x19,
        cycles: 8,
        execute: function(cpu){
            //sumamos el valor de DE a HL
            let suma = cpu.registers.getHL() + cpu.registers.getDE();
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.getHL() & 0xFFF) > (suma & 0xFFF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFFFF);
            cpu.registers.setHL(suma & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //ADD HL, HL
    //0x29
    instruction[0x29] = {
        name: "ADD HL, HL",
        opcode: 0x29,
        cycles: 8,
        execute: function(cpu){
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.getHL() & 0xFFF) > 0x7FF;
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (cpu.registers.getHL() > 0x7FFF);
            cpu.registers.setHL((cpu.registers.getHL() << 1) & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //ADD HL, SP
    //0x39
    instruction[0x39] = {
        name: "ADD HL, SP",
        opcode: 0x39,
        cycles: 8,
        execute: function(cpu){
            //sumamos el valor de SP a HL
            let suma = cpu.registers.getHL() + cpu.registers.sp;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.getHL() & 0xFFF) > (suma & 0xFFF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFFFF);
            cpu.registers.setHL(suma & 0xFFFF);
            cpu.registers.pc += 1;
        }
    }
    //ADD A, B
    //0x80
    instruction[0x80] = {
        name: "ADD A, B",
        opcode: 0x80,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de B a A
            let suma = cpu.registers.a + cpu.registers.b;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.b) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, C
    //0x81
    instruction[0x81] = {
        name: "ADD A, C",
        opcode: 0x81,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de C a A
            let suma = cpu.registers.a + cpu.registers.c;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.c) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, D
    //0x82
    instruction[0x82] = {
        name: "ADD A, D",
        opcode: 0x82,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de D a A
            let suma = cpu.registers.a + cpu.registers.d;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.d) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, E
    //0x83
    instruction[0x83] = {
        name: "ADD A, E",
        opcode: 0x83,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de E a A
            let suma = cpu.registers.a + cpu.registers.e;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.e) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, H
    //0x84
    instruction[0x84] = {
        name: "ADD A, H",
        opcode: 0x84,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de H a A
            let suma = cpu.registers.a + cpu.registers.h;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.h) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, L
    //0x85
    instruction[0x85] = {
        name: "ADD A, L",
        opcode: 0x85,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de L a A
            let suma = cpu.registers.a + cpu.registers.l;
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = (cpu.registers.a + cpu.registers.l) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, (HL)
    //0x86
    instruction[0x86] = {
        name: "ADD A, (HL)",
        opcode: 0x86,
        cycles: 8,
        execute: function(cpu){
            //sumamos el valor de la posicion HL a A
            let suma = cpu.registers.a + bus.read(cpu.registers.getHL());
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = ((cpu.registers.a + bus.read(cpu.registers.getHL())) & 0xFF);
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, A
    //0x87
    instruction[0x87] = {
        name: "ADD A, A",
        opcode: 0x87,
        cycles: 4,
        execute: function(cpu){
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            //cambiamos el bit de half carry si hay carry en la posicion 12
            cpu.registers.halfcarry = (cpu.registers.a & 0x8) == 0x8;
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (cpu.registers.a > 0x7F);
            cpu.registers.a = (cpu.registers.a << 1) & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, B
    //0x88
    instruction[0x88] = {
        name: "ADC A, B",
        opcode: 0x88,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de B a A + carry
            let suma = cpu.registers.a + cpu.registers.b + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.b & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, C
    //0x89
    instruction[0x89] = {
        name: "ADC A, C",
        opcode: 0x89,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de C a A + carry
            let suma = cpu.registers.a + cpu.registers.c + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.c & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, D
    //0x8A
    instruction[0x8A] = {
        name: "ADC A, D",
        opcode: 0x8A,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de D a A + carry
            let suma = cpu.registers.a + cpu.registers.d + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.d & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, E
    //0x8B
    instruction[0x8B] = {
        name: "ADC A, E",
        opcode: 0x8B,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de E a A + carry
            let suma = cpu.registers.a + cpu.registers.e + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.e & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, H
    //0x8C
    instruction[0x8C] = {
        name: "ADC A, H",
        opcode: 0x8C,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de H a A + carry
            let suma = cpu.registers.a + cpu.registers.h + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.h & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, L
    //0x8D
    instruction[0x8D] = {
        name: "ADC A, L",
        opcode: 0x8D,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de L a A + carry
            let suma = cpu.registers.a + cpu.registers.l + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (cpu.registers.l & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, (HL)
    //0x8E
    instruction[0x8E] = {
        name: "ADC A, (HL)",
        opcode: 0x8E,
        cycles: 8,
        execute: function(cpu){
            let data = bus.read(cpu.registers.getHL())
            //sumamos el valor de (HL) a A + carry
            let suma = cpu.registers.a + data + ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (data & 0xF) + ((cpu.registers.carry) ? 1 : 0) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADC A, A
    //0x8F
    instruction[0x8F] = {
        name: "ADC A, A",
        opcode: 0x8F,
        cycles: 4,
        execute: function(cpu){
            //sumamos el valor de A a A + carry
            let suma = (cpu.registers.a << 1) | ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 0
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((((cpu.registers.a << 1) & 0x1E) | ((cpu.registers.carry) ? 1 : 0)) > 0xF);
            //ponemos el carry si excede los 16 bits
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, B
    //0x90
    instruction[0x90] = {
        name: "SUB A, B",
        opcode: 0x90,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de B a A
            let resta = cpu.registers.a - cpu.registers.b;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, C
    //0x91
    instruction[0x91] = {
        name: "SUB A, C",
        opcode: 0x91,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de C a A
            let resta = cpu.registers.a - cpu.registers.c;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, D
    //0x92
    instruction[0x92] = {
        name: "SUB A, D",
        opcode: 0x92,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de D a A
            let resta = cpu.registers.a - cpu.registers.d;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, E
    //0x93
    instruction[0x93] = {
        name: "SUB A, E",
        opcode: 0x93,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de E a A
            let resta = cpu.registers.a - cpu.registers.e;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, H
    //0x94
    instruction[0x94] = {
        name: "SUB A, H",
        opcode: 0x94,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de H a A
            let resta = cpu.registers.a - cpu.registers.h;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, L
    //0x95
    instruction[0x95] = {
        name: "SUB A, L",
        opcode: 0x95,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de L a A
            let resta = cpu.registers.a - cpu.registers.l;
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, (HL)
    //0x96
    instruction[0x96] = {
        name: "SUB A, (HL)",
        opcode: 0x96,
        cycles: 8,
        execute: function(cpu){
            //restamos el valor de la posicion de memoria HL a A
            let resta = cpu.registers.a - bus.read(cpu.registers.getHL());
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (resta == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SUB A, A
    //0x97
    instruction[0x97] = {
        name: "SUB A, A",
        opcode: 0x97,
        cycles: 4,
        execute: function(cpu){

            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.a = 0
            cpu.registers.zero = true;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //continuar desde aqui
    //SBC A, B
    //0x98
    instruction[0x98] = {
        name: "SBC A, B",
        opcode: 0x98,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de B a A
            let resta = cpu.registers.a - cpu.registers.b - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.b & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, C
    //0x99
    instruction[0x99] = {
        name: "SBC A, C",
        opcode: 0x99,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de C a A
            let resta = cpu.registers.a - cpu.registers.c - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.c & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, D
    //0x9A
    instruction[0x9A] = {
        name: "SBC A, D",
        opcode: 0x9A,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de D a A
            let resta = cpu.registers.a - cpu.registers.d - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.d & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, E
    //0x9B
    instruction[0x9B] = {
        name: "SBC A, E",
        opcode: 0x9B,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de E a A
            let resta = cpu.registers.a - cpu.registers.e - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.e & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, H
    //0x9C
    instruction[0x9C] = {
        name: "SBC A, H",
        opcode: 0x9C,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de H a A
            let resta = cpu.registers.a - cpu.registers.h - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.h & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, L
    //0x9D
    instruction[0x9D] = {
        name: "SBC A, L",
        opcode: 0x9D,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de L a A
            let resta = cpu.registers.a - cpu.registers.l - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.l & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, (HL)
    //0x9E
    instruction[0x9E] = {
        name: "SBC A, (HL)",
        opcode: 0x9E,
        cycles: 8,
        execute: function(cpu){
            //restamos el valor de (HL) a A
            let resta = cpu.registers.a - bus.read(cpu.registers.getHL()) - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (bus.read(cpu.registers.getHL()) & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //SBC A, A
    //0x9F
    instruction[0x9F] = {
        name: "SBC A, A",
        opcode: 0x9F,
        cycles: 4,
        execute: function(cpu){
            //restamos el valor de A a A
            let resta = cpu.registers.a - cpu.registers.a - ((cpu.registers.carry) ? 1 : 0);
            //cambiamos el bit de subtraction a 1
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (cpu.registers.a & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND B
    //0xA0
    instruction[0xA0] = {
        name: "AND B",
        opcode: 0xA0,
        cycles: 4,
        execute: function(cpu){
            //AND B
            cpu.registers.a = cpu.registers.a & cpu.registers.b;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND C
    //0xA1
    instruction[0xA1] = {
        name: "AND C",
        opcode: 0xA1,
        cycles: 4,
        execute: function(cpu){
            //AND C
            cpu.registers.a = cpu.registers.a & cpu.registers.c;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND D
    //0xA2
    instruction[0xA2] = {
        name: "AND D",
        opcode: 0xA2,
        cycles: 4,
        execute: function(cpu){
            //AND D
            cpu.registers.a = cpu.registers.a & cpu.registers.d;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND E
    //0xA3
    instruction[0xA3] = {
        name: "AND E",
        opcode: 0xA3,
        cycles: 4,
        execute: function(cpu){
            //AND E
            cpu.registers.a = cpu.registers.a & cpu.registers.e;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND H
    //0xA4
    instruction[0xA4] = {
        name: "AND H",
        opcode: 0xA4,
        cycles: 4,
        execute: function(cpu){
            //AND H
            cpu.registers.a = cpu.registers.a & cpu.registers.h;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND L
    //0xA5
    instruction[0xA5] = {
        name: "AND L",
        opcode: 0xA5,
        cycles: 4,
        execute: function(cpu){
            //AND L
            cpu.registers.a = cpu.registers.a & cpu.registers.l;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND (HL)
    //0xA6
    instruction[0xA6] = {
        name: "AND (HL)",
        opcode: 0xA6,
        cycles: 8,
        execute: function(cpu){
            //AND (HL)
            cpu.registers.a = cpu.registers.a & bus.read(cpu.registers.getHL());
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //AND A
    //0xA7
    instruction[0xA7] = {
        name: "AND A",
        opcode: 0xA7,
        cycles: 4,
        execute: function(cpu){
            //AND A
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR B
    //0xA8
    instruction[0xA8] = {
        name: "XOR B",
        opcode: 0xA8,
        cycles: 4,
        execute: function(cpu){
            //XOR B
            cpu.registers.a = cpu.registers.a ^ cpu.registers.b;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR C
    //0xA9
    instruction[0xA9] = {
        name: "XOR C",
        opcode: 0xA9,
        cycles: 4,
        execute: function(cpu){
            //XOR C
            cpu.registers.a = cpu.registers.a ^ cpu.registers.c;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR D
    //0xAA
    instruction[0xAA] = {
        name: "XOR D",
        opcode: 0xAA,
        cycles: 4,
        execute: function(cpu){
            //XOR D
            cpu.registers.a = cpu.registers.a ^ cpu.registers.d;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR E
    //0xAB
    instruction[0xAB] = {
        name: "XOR E",
        opcode: 0xAB,
        cycles: 4,
        execute: function(cpu){
            //XOR E
            cpu.registers.a = cpu.registers.a ^ cpu.registers.e;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR H
    //0xAC
    instruction[0xAC] = {
        name: "XOR H",
        opcode: 0xAC,
        cycles: 4,
        execute: function(cpu){
            //XOR H
            cpu.registers.a = cpu.registers.a ^ cpu.registers.h;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR L
    //0xAD
    instruction[0xAD] = {
        name: "XOR L",
        opcode: 0xAD,
        cycles: 4,
        execute: function(cpu){
            //XOR L
            cpu.registers.a = cpu.registers.a ^ cpu.registers.l;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //XOR (HL)
    //0xAE
    instruction[0xAE] = {
        name: "XOR (HL)",
        opcode: 0xAE,
        cycles: 8,
        execute: function(cpu){
            //XOR (HL)
            cpu.registers.a = cpu.registers.a ^ bus.read(cpu.registers.getHL());
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //revisada
        }
    }
    //XOR A
    //0xAF
    instruction[0xAF] = {
        name: "XOR A",
        opcode: 0xAF,
        cycles: 4,
        execute: function(cpu){
            //XOR A
            cpu.registers.a = 0
            cpu.registers.zero = true;
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //arreglado
        }
    }
    //OR B
    //0xB0
    instruction[0xB0] = {
        name: "OR B",
        opcode: 0xB0,
        cycles: 4,
        execute: function(cpu){
            //OR B
            cpu.registers.a = cpu.registers.a | cpu.registers.b;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR C
    //0xB1
    instruction[0xB1] = {
        name: "OR C",
        opcode: 0xB1,
        cycles: 4,
        execute: function(cpu){
            //OR C
            cpu.registers.a = cpu.registers.a | cpu.registers.c;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR D
    //0xB2
    instruction[0xB2] = {
        name: "OR D",
        opcode: 0xB2,
        cycles: 4,
        execute: function(cpu){
            //OR D
            cpu.registers.a = cpu.registers.a | cpu.registers.d;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR E
    //0xB3
    instruction[0xB3] = {
        name: "OR E",
        opcode: 0xB3,
        cycles: 4,
        execute: function(cpu){
            //OR E
            cpu.registers.a = cpu.registers.a | cpu.registers.e;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR H
    //0xB4
    instruction[0xB4] = {
        name: "OR H",
        opcode: 0xB4,
        cycles: 4,
        execute: function(cpu){
            //OR H
            cpu.registers.a = cpu.registers.a | cpu.registers.h;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR L
    //0xB5
    instruction[0xB5] = {
        name: "OR L",
        opcode: 0xB5,
        cycles: 4,
        execute: function(cpu){
            //OR L
            cpu.registers.a = cpu.registers.a | cpu.registers.l;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR (HL)
    //0xB6
    instruction[0xB6] = {
        name: "OR (HL)",
        opcode: 0xB6,
        cycles: 8,
        execute: function(cpu){
            //OR (HL)
            cpu.registers.a = cpu.registers.a | bus.read(cpu.registers.getHL());
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //OR A
    //0xB7
    instruction[0xB7] = {
        name: "OR A",
        opcode: 0xB7,
        cycles: 4,
        execute: function(cpu){
            //OR A
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP B
    //0xB8
    instruction[0xB8] = {
        name: "CP B",
        opcode: 0xB8,
        cycles: 4,
        execute: function(cpu){
            //CP B
            let resta = cpu.registers.a - cpu.registers.b;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP C
    //0xB9
    instruction[0xB9] = {
        name: "CP C",
        opcode: 0xB9,
        cycles: 4,
        execute: function(cpu){
            //CP C
            let resta = cpu.registers.a - cpu.registers.c;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP D
    //0xBA
    instruction[0xBA] = {
        name: "CP D",
        opcode: 0xBA,
        cycles: 4,
        execute: function(cpu){
            //CP D
            let resta = cpu.registers.a - cpu.registers.d;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP E
    //0xBB
    instruction[0xBB] = {
        name: "CP E",
        opcode: 0xBB,
        cycles: 4,
        execute: function(cpu){
            //CP E
            let resta = cpu.registers.a - cpu.registers.e;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP H
    //0xBC
    instruction[0xBC] = {
        name: "CP H",
        opcode: 0xBC,
        cycles: 4,
        execute: function(cpu){
            //CP H
            let resta = cpu.registers.a - cpu.registers.h;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP L
    //0xBD
    instruction[0xBD] = {
        name: "CP L",
        opcode: 0xBD,
        cycles: 4,
        execute: function(cpu){
            //CP L
            let resta = cpu.registers.a - cpu.registers.l;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP (HL)
    //0xBE
    instruction[0xBE] = {
        name: "CP (HL)",
        opcode: 0xBE,
        cycles: 8,
        execute: function(cpu){
            //CP (HL)
            let resta = cpu.registers.a - bus.read(cpu.registers.getHL());
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //CP A
    //0xBF
    instruction[0xBF] = {
        name: "CP A",
        opcode: 0xBF,
        cycles: 4,
        execute: function(cpu){
            //CP A
            let resta = cpu.registers.a - cpu.registers.a;
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 1;
            //cambiar flags
        }
    }
    //ADD A, n
    //0xC6
    instruction[0xC6] = {
        name: "ADD A, n",
        opcode: 0xC6,
        cycles: 8,
        execute: function(cpu){
            //ADD A, n
            let suma = cpu.registers.a + bus.read(cpu.registers.pc + 1);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) > (suma & 0xF);
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //SUB A, n
    //0xD6
    instruction[0xD6] = {
        name: "SUB A, n",
        opcode: 0xD6,
        cycles: 8,
        execute: function(cpu){
            //SUB A, n
            let resta = cpu.registers.a - bus.read(cpu.registers.pc + 1);
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //AND A, n
    //0xE6
    instruction[0xE6] = {
        name: "AND A, n",
        opcode: 0xE6,
        cycles: 8,
        execute: function(cpu){
            //AND A, n
            cpu.registers.a = cpu.registers.a & bus.read(cpu.registers.pc + 1);
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = true;
            cpu.registers.carry = false;
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //OR A, n
    //0xF6
    instruction[0xF6] = {
        name: "OR A, n",
        opcode: 0xF6,
        cycles: 8,
        execute: function(cpu){
            //OR A, n
            cpu.registers.a = cpu.registers.a | bus.read(cpu.registers.pc + 1);
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //ADC A, n
    //0xCE
    instruction[0xCE] = {
        name: "ADC A, n",
        opcode: 0xCE,
        cycles: 8,
        execute: function(cpu){
            //ADC A, n
            let lectura = bus.read(cpu.registers.pc + 1);
            let suma = cpu.registers.a + lectura + (cpu.registers.carry ? 1 : 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) + (lectura & 0xF) + (cpu.registers.carry ? 1 : 0) > 0xF);
            cpu.registers.carry = (suma > 0xFF);
            cpu.registers.a = suma & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 2;
        }
    }
    //SBC A, n
    //0xDE
    instruction[0xDE] = {
        name: "SBC A, n",
        opcode: 0xDE,
        cycles: 8,
        execute: function(cpu){
            //SBC A, n
            let lectura = bus.read(cpu.registers.pc + 1)
            let resta = cpu.registers.a - lectura - ((cpu.registers.carry) ? 1 : 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = ((cpu.registers.a & 0xF) - (lectura & 0xF) - ((cpu.registers.carry) ? 1 : 0) < 0);
            cpu.registers.carry = (resta < 0);
            cpu.registers.a = resta & 0xFF;
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //XOR A, n
    //0xEE
    instruction[0xEE] = {
        name: "XOR A, n",
        opcode: 0xEE,
        cycles: 8,
        execute: function(cpu){
            //XOR A, n
            cpu.registers.a = cpu.registers.a ^ bus.read(cpu.registers.pc + 1);
            cpu.registers.zero = (cpu.registers.a == 0);
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = false;
            cpu.registers.carry = false;
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //CP A, n
    //0xFE
    instruction[0xFE] = {
        name: "CP A, n",
        opcode: 0xFE,
        cycles: 8,
        execute: function(cpu){
            //CP A, n
            let resta = cpu.registers.a - bus.read(cpu.registers.pc + 1);
            cpu.registers.zero = (resta == 0);
            cpu.registers.subtraction = true;
            cpu.registers.halfcarry = (cpu.registers.a & 0xF) < (resta & 0xF);
            cpu.registers.carry = (resta < 0);
            cpu.registers.pc += 2;
            //cambiar flags
        }
    }
    //ADD SP, n
    //0xE8
    instruction[0xE8] = {
        name: "ADD SP, n",
        opcode: 0xE8,
        cycles: 16,
        execute: function(cpu){
            //ADD SP, n
            let lectura = (bus.read(cpu.registers.pc + 1)<<24)>>24;
            let suma = (cpu.registers.sp + lectura) & 0xFFFF;
            lectura = (cpu.registers.sp ^ lectura ^ suma) & 0xFFFF;
            cpu.registers.zero = false;
            cpu.registers.subtraction = false;
            cpu.registers.halfcarry = (lectura & 0x10) == 0x10;
            cpu.registers.carry = (lectura & 0x100) == 0x100;
            cpu.registers.sp = suma & 0xFFFF;
            cpu.registers.pc += 2;
            //revisada
        }
    }
}