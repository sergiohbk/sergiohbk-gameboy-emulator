/**
 * comprueba la validez de datos
 * @param {Array} values array de valores a comprobar
 *
 */
export function assertions(values) {
  values.forEach((element, index) => {
    if (element !== undefined && element !== null && element < 0x10000) {
      return true;
    } else {
      throw new Error(`el valor numero ${index} ha dado error porque
            tiene como valor ${element}`);
    }
  });
}

export function assertionDMA(address) {
  if (address !== undefined && address !== null && address > 0x7fff) {
    return true;
  } else {
    throw new Error(`DMA error ${address}`);
  }
}

export function assertionOPCODE(pc) {
  if (pc !== null && pc < 0x8000) return true;
  else throw new Error(`error en el program counter ${pc.toString(16)}`);
}

export class debugFunctions {
  constructor(gameboy) {
    this.gameboy = gameboy;
  }

  getRegisters() {
    //return all registers in json format
    const registers = {
      a: this.gameboy.cpu.registers.a,
      b: this.gameboy.cpu.registers.b,
      c: this.gameboy.cpu.registers.c,
      d: this.gameboy.cpu.registers.d,
      e: this.gameboy.cpu.registers.e,
      f: this.gameboy.cpu.registers.f,
      h: this.gameboy.cpu.registers.h,
      l: this.gameboy.cpu.registers.l,
      pc: this.gameboy.cpu.registers.pc,
      sp: this.gameboy.cpu.registers.sp,
      halted: this.gameboy.cpu.registers.halted,
      zero: this.gameboy.cpu.registers.zero,
      subtraction: this.gameboy.cpu.registers.subtraction,
      halfcarry: this.gameboy.cpu.registers.halfcarry,
      carry: this.gameboy.cpu.registers.carry,
    };
    return registers;
  }

  getMemoryPosition(address) {
    return this.gameboy.memory.memory[address];
  }
  getCPUState() {
    const state = {
      pause: this.gameboy.cpu.pause,
      cycles: this.gameboy.cpu.cpu_cycles,
      currentOpcode: this.gameboy.cpu.current_opcode,
    };
    return state;
  }
  getMBCState() {
    return this.gameboy.cpu.bus.mbcC.getMBCState();
  }
  getRTCState() {
    return this.gameboy.cpu.bus.mbcC.getRTCState();
  }
}
