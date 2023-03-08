import { MBC } from "./MBC";

export class MBC1 extends MBC {
  constructor(cartridge, bus) {
    super(cartridge, bus);

    this.mode = 0;
    this.ZERObankSelect = 0;
    this.HIGHbankSelect = 0;
  }

  selectROMBank(value) {
    this.ROMbankSelect = value & 0x1f;

    if (this.ROMbankSelect === 0) {
      this.ROMbankSelect = 1;
    }
  }
  selectRAMBank(value) {
    this.RAMbankSelect = value & 0x03;
  }
  getMask() {
    let mask = 0x00;
    switch (this.cartridge.rom_size) {
      case 2:
        mask = 0x01;
        break;
      case 4:
        mask = 0x03;
        break;
      case 8:
        mask = 0x07;
        break;
      case 16:
        mask = 0x0f;
        break;
      case 32:
        mask = 0x1f;
        break;
      case 64:
        mask = 0x1f;
        break;
      case 128:
        mask = 0x1f;
        break;
      default:
        mask = 0x00;
    }
    return mask;
  }
  selectMode(value) {
    this.mode = value & 0x01;
  }
  ReadROM0(address) {
    if (this.mode === 1) {
      this.ZERObankSelect = (this.RAMbankSelect << 5) % this.cartridge.rom_size;
    } else {
      this.ZERObankSelect = 0;
    }

    return this.cartridge.rom[this.ZERObankSelect * 0x4000 + address];
  }
  ReadROM1(address) {
    this.HIGHbankSelect =
      ((this.RAMbankSelect << 5) % this.cartridge.rom_size |
        this.ROMbankSelect) %
      this.cartridge.rom_size;
    return this.cartridge.rom[
      this.HIGHbankSelect * 0x4000 + (address - 0x4000)
    ];
  }
  WriteRAM(value, address) {
    if (!this.externalRAM) return;

    if (this.RAMbanks.length === 0) {
      console.warn("No RAM banks found, game trying to write to RAM");
      return;
    }

    this.RAMbankSelect = this.mode === 1 ? this.RAMbankSelect : 0;
    this.RAMbanks[this.RAMbankSelect][address - 0xa000] = value;
  }
  ReadRAM(address) {
    if (!this.externalRAM) return 0xff;

    if (this.RAMbanks.length === 0) {
      console.warn("No RAM banks found, game trying to read from RAM");
      return 0xff;
    }

    if (this.mode === 0) {
      this.RAMbankSelect = 0;
    }

    return this.RAMbanks[this.RAMbankSelect][address - 0xa000];
  }
}
