import { assertions } from "../extras/testing";

export class MBC {
  constructor(cartridge, bus) {
    this.cartridge = cartridge;
    this.bus = bus;

    this.externalRAM = false;
    this.ROMbankSelect = 1;
    this.RAMbankSelect = 0;

    this.RAMbanks = [];

    this.inicializeRAM();
  }

  save() {
    if (!this.cartridge.battery) return;

    const SAVE = new Uint8Array(this.RAMbanks.length * 0x2000);
    for (let i = 0; i < this.RAMbanks.length; i++) {
      SAVE.set(this.RAMbanks[i], i * 0x2000);
    }
    const JSONSAVE = JSON.stringify(SAVE);
    localStorage.setItem(this.cartridge.title + ".sav", JSONSAVE);
  }

  load() {
    if (!this.cartridge.battery) return;
    if (!localStorage.getItem(this.cartridge.title + ".sav")) return;

    const JSONSAVE = JSON.parse(
      localStorage.getItem(this.cartridge.title + ".sav")
    );
    const SAVE = new Uint8Array(Object.values(JSONSAVE));

    for (let i = 0; i < this.RAMbanks.length; i++) {
      this.RAMbanks[i] = SAVE.slice(i * 0x2000, (i + 1) * 0x2000);
    }
  }

  enableRAM(value) {
    value = value & 0x0f;
    if (value === 0xa) {
      this.externalRAM = true;
    } else {
      this.externalRAM = false;
    }
  }
  inicializeRAM() {
    if (!this.cartridge.externalRAM) return;

    this.RAMbanks = new Array(this.cartridge.ram_size);

    for (let i = 0; i < this.cartridge.ram_size; i++) {
      this.RAMbanks[i] = new Uint8Array(0x2000);
      this.RAMbanks[i].fill(0);
    }
  }
  ReadROM0(address) {
    return this.cartridge.rom[address];
  }
  ReadROM1(address) {
    return this.cartridge.rom[address - 0x4000 + this.ROMbankSelect * 0x4000];
  }
  WriteRAM(value, address) {
    if (!this.externalRAM) return;

    this.RAMbanks[this.RAMbankSelect][address - 0xa000] = value;
  }
  ReadRAM(address) {
    assertions([address]);

    if (!this.externalRAM) return 0xff;

    return this.RAMbanks[this.RAMbankSelect][address - 0xa000];
  }
  selectROMBank() {
    //do nothing
  }
  selectRAMBank() {
    //do nothing
  }
}
