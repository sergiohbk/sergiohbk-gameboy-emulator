import { MBC } from "./MBC.js";
import { MBC1 } from "./MBC1.js";
import { MBC3 } from "./MBC3.js";
import { MBC5 } from "./MBC5.js";

export class MBCcontroller {
  constructor(cartridge, bus) {
    this.cartridge = cartridge;
    this.bus = bus;
    this.MBC = null;
    this.selectMBC();
  }

  selectMBC() {
    if (this.cartridge.MBC1) this.MBC = new MBC1(this.cartridge, this.bus);
    else if (this.cartridge.MBC2) console.log("MBC2 not implemented");
    else if (this.cartridge.MBC3) this.MBC = new MBC3(this.cartridge, this.bus);
    else if (this.cartridge.MBC5) this.MBC = new MBC5(this.cartridge, this.bus);
    else this.MBC = new MBC(this.cartridge, this.bus);
  }
  //lectura
  readROM0(address) {
    return this.MBC.ReadROM0(address);
  }
  readROM1(address) {
    return this.MBC.ReadROM1(address);
  }
  readRAM(address) {
    return this.MBC.ReadRAM(address);
  }
  //escritura
  enabelingRAM(value) {
    if (this.cartridge.ram_size > 0) this.MBC.enableRAM(value);
  }
  romBanking(value, address) {
    this.MBC.selectROMBank(value, address);
  }
  ramBanking(value) {
    this.MBC.selectRAMBank(value);
  }
  optionSelect(value) {
    if (this.cartridge.MBC1) {
      this.MBC.selectMode(value);
    }

    if (this.cartridge.MBC3) {
      if (!this.cartridge.timer) console.warn("MBC3: RTC is not initialized");
      else this.MBC.realtimeclock.latchRTC(value);
    }
  }
  writeRAM(value, address) {
    this.MBC.WriteRAM(value, address);
  }

  getMBCState() {
    const state = {
      MBC: this.MBC,
      cartridge: this.cartridge,
      rombankselected: this.MBC.ROMbankSelect,
      rambankselected: this.MBC.RAMbankSelect,
      rambankenabled: this.MBC.RAMenabled,
      mode: this.MBC.mode,
      rom0mbc1:
        this.MBC.ZERObankSelect != null ? this.MBC.ZERObankSelect : null,
      rom1mbc1:
        this.MBC.HIGHbankSelect != null ? this.MBC.HIGHbankSelect : null,
    };
    return state;
  }
  getRTCState() {
    if (this.cartridge.MBC3) {
      return this.MBC.realtimeclock.getRTCState();
    }
  }
}
