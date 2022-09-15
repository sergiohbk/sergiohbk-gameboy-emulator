export function stackinstructions(instruction, bus) {
  //PUSH BC
  //0xC5
  instruction[0xc5] = {
    name: "PUSH BC",
    opcode: 0xc5,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.getBC(), bus);
      cpu.registers.pc += 1;
    },
  };
  //PUSH DE
  //0xD5
  instruction[0xd5] = {
    name: "PUSH DE",
    opcode: 0xd5,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.getDE(), bus);
      cpu.registers.pc += 1;
    },
  };
  //PUSH HL
  //0xE5
  instruction[0xe5] = {
    name: "PUSH HL",
    opcode: 0xe5,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.getHL(), bus);
      cpu.registers.pc += 1;
    },
  };
  //PUSH AF
  //0xF5
  instruction[0xf5] = {
    name: "PUSH AF",
    opcode: 0xf5,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.getAF() & 0xfff0, bus);
      cpu.registers.pc += 1;
    },
  };
  //POP BC
  //0xC1
  instruction[0xc1] = {
    name: "POP BC",
    opcode: 0xc1,
    cycles: 12,
    execute: function (cpu) {
      cpu.registers.setBC(cpu.registers.stackPop16(bus));
      cpu.registers.pc += 1;
    },
  };
  //POP DE
  //0xD1
  instruction[0xd1] = {
    name: "POP DE",
    opcode: 0xd1,
    cycles: 12,
    execute: function (cpu) {
      cpu.registers.setDE(cpu.registers.stackPop16(bus));
      cpu.registers.pc += 1;
    },
  };
  //POP HL
  //0xE1
  instruction[0xe1] = {
    name: "POP HL",
    opcode: 0xe1,
    cycles: 12,
    execute: function (cpu) {
      cpu.registers.setHL(cpu.registers.stackPop16(bus));
      cpu.registers.pc += 1;
    },
  };
  //POP AF
  //0xF1
  instruction[0xf1] = {
    name: "POP AF",
    opcode: 0xf1,
    cycles: 12,
    execute: function (cpu) {
      cpu.registers.setAF(cpu.registers.stackPop16(bus) & 0xfff0);
      cpu.registers.pc += 1;
    },
    //revisada
  };
  //CALL NZ,nn
  //0xC4
  instruction[0xc4] = {
    name: "CALL NZ,nn",
    opcode: 0xc4,
    cycles: 12,
    execute: function (cpu) {
      if (!cpu.registers.zero) {
        let address =
          (bus.read(cpu.registers.pc + 2) << 8) |
          bus.read(cpu.registers.pc + 1);
        cpu.registers.pc = (cpu.registers.pc + 3) & 0xffff;
        cpu.registers.stackPush16(cpu.registers.pc, bus);
        cpu.registers.pc = address;
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 3;
      }
    },
  };
  //CALL NC,nn
  //0xD4
  instruction[0xd4] = {
    name: "CALL NC,nn",
    opcode: 0xd4,
    cycles: 12,
    execute: function (cpu) {
      if (!cpu.registers.carry) {
        let address =
          (bus.read(cpu.registers.pc + 2) << 8) |
          bus.read(cpu.registers.pc + 1);
        cpu.registers.pc = (cpu.registers.pc + 3) & 0xffff;
        cpu.registers.stackPush16(cpu.registers.pc, bus);
        cpu.registers.pc = address;
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 3;
      }
    },
  };
  //CALL Z,nn
  //0xCC
  instruction[0xcc] = {
    name: "CALL Z,nn",
    opcode: 0xcc,
    cycles: 12,
    execute: function (cpu) {
      if (cpu.registers.zero) {
        let address =
          (bus.read(cpu.registers.pc + 2) << 8) |
          bus.read(cpu.registers.pc + 1);
        cpu.registers.pc = (cpu.registers.pc + 3) & 0xffff;
        cpu.registers.stackPush16(cpu.registers.pc, bus);
        cpu.registers.pc = address;
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 3;
      }
    },
  };
  //CALL C,nn
  //0xDC
  instruction[0xdc] = {
    name: "CALL C,nn",
    opcode: 0xdc,
    cycles: 12,
    execute: function (cpu) {
      if (cpu.registers.carry) {
        let address =
          (bus.read(cpu.registers.pc + 2) << 8) |
          bus.read(cpu.registers.pc + 1);
        cpu.registers.pc = (cpu.registers.pc + 3) & 0xffff;
        cpu.registers.stackPush16(cpu.registers.pc, bus);
        cpu.registers.pc = address;
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 3;
      }
    },
  };
  //CALL nn
  //0xCD
  instruction[0xcd] = {
    name: "CALL nn",
    opcode: 0xcd,
    cycles: 24,
    execute: function (cpu) {
      let address =
        (bus.read(cpu.registers.pc + 2) << 8) | bus.read(cpu.registers.pc + 1);
      cpu.registers.pc = (cpu.registers.pc + 3) & 0xffff;
      cpu.registers.stackPush16(cpu.registers.pc, bus);
      cpu.registers.pc = address;
    },
  };
  //RST 00H
  //0xC7
  instruction[0xc7] = {
    name: "RST 00H",
    opcode: 0xc7,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x00;
    },
  };
  //RST 10H
  //0xD7
  instruction[0xd7] = {
    name: "RST 10H",
    opcode: 0xd7,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x10;
    },
  };
  //RST 20H
  //0xE7
  instruction[0xe7] = {
    name: "RST 20H",
    opcode: 0xe7,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x20;
    },
  };
  //RST 30H
  //0xF7
  instruction[0xf7] = {
    name: "RST 30H",
    opcode: 0xf7,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x30;
    },
  };
  //RST 08H
  //0xCF
  instruction[0xcf] = {
    name: "RST 08H",
    opcode: 0xcf,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x08;
    },
  };
  //RST 18H
  //0xDF
  instruction[0xdf] = {
    name: "RST 18H",
    opcode: 0xdf,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x18;
    },
  };
  //RST 28H
  //0xEF
  instruction[0xef] = {
    name: "RST 28H",
    opcode: 0xef,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x28;
    },
  };
  //RST 38H
  //0xFF
  instruction[0xff] = {
    name: "RST 38H",
    opcode: 0xff,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.stackPush16(cpu.registers.pc + 1, bus);
      cpu.registers.pc = 0x38;
    },
  };
  //RET NZ
  //0xC0
  instruction[0xc0] = {
    name: "RET NZ",
    opcode: 0xc0,
    cycles: 8,
    execute: function (cpu) {
      if (!cpu.registers.zero) {
        cpu.registers.pc = cpu.registers.stackPop16(bus);
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 1;
      }
    },
  };
  //RET NC
  //0xD0
  instruction[0xd0] = {
    name: "RET NC",
    opcode: 0xd0,
    cycles: 8,
    execute: function (cpu) {
      if (!cpu.registers.carry) {
        cpu.registers.pc = cpu.registers.stackPop16(bus);
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 1;
      }
    },
  };
  //RET Z
  //0xC8
  instruction[0xc8] = {
    name: "RET Z",
    opcode: 0xc8,
    cycles: 8,
    execute: function (cpu) {
      if (cpu.registers.zero) {
        cpu.registers.pc = cpu.registers.stackPop16(bus);
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 1;
      }
    },
  };
  //RET C
  //0xD8
  instruction[0xd8] = {
    name: "RET C",
    opcode: 0xd8,
    cycles: 8,
    execute: function (cpu) {
      if (cpu.registers.carry) {
        cpu.registers.pc = cpu.registers.stackPop16(bus);
        cpu.cpu_cycles += 12;
      } else {
        cpu.registers.pc += 1;
      }
    },
  };
  //RET
  //0xC9
  instruction[0xc9] = {
    name: "RET",
    opcode: 0xc9,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.pc = cpu.registers.stackPop16(bus);
    },
  };
  //RETI
  //0xD9
  instruction[0xd9] = {
    name: "RETI",
    opcode: 0xd9,
    cycles: 16,
    execute: function (cpu) {
      cpu.registers.pc = cpu.registers.stackPop16(bus);
      cpu.bus.IME = true;
      //quizas active IME directamente sin dejar una ejecucion extra, no lo se
    },
  };
}
