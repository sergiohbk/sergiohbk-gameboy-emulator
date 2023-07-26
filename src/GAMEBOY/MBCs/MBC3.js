import { assertions } from "../extras/testing";
import { MBC } from "./MBC";
import { RealTimeClock } from "./RTC";

export class MBC3 extends MBC {
  constructor(cartridge, bus) {
    super(cartridge, bus);

    if (cartridge.timer) this.realtimeclock = new RealTimeClock();
  }

  enableRAM(value) {
    assertions([value]);
    if ((value & 0xf) === 0xa) {
      this.externalRAM = true;
      if (this.cartridge.timer) this.realtimeclock.accessRTC = true;
    } else if (value === 0x00) {
      this.externalRAM = false;
      if (this.cartridge.timer) this.realtimeclock.accessRTC = false;
    }
  }

  selectROMBank(value) {
    assertions([value]);
    if (value === 0) {
      this.ROMbankSelect = 1;
      return;
    }

    this.ROMbankSelect = value & 0x7f;
  }
  selectRAMBank(value) {
    assertions([value]);
    this.RAMbankSelect = value;
  }
  WriteRAM(value, address) {
    assertions([address, value]);

    if (this.RAMbankSelect <= 0x03) {
      if (!this.externalRAM) return;

      if (this.RAMbanks.length === 0) {
        console.warn(
          "MBC3: RAM banks are not initialized, game trying to write"
        );
        return;
      }

      this.RAMbanks[this.RAMbankSelect][address - 0xa000] = value;
    } else if (
      this.realtimeclock.accessRTC &&
      this.RAMbankSelect >= 0x08 &&
      this.RAMbankSelect <= 0x0c
    ) {
      this.realtimeclock.WriteRegister(value, this.RAMbankSelect);
    } else {
      console.warn(
        "MBC3: Trying to write to invalid RAM bank" + this.RAMbankSelect
      );
    }
  }
  ReadRAM(address) {
    assertions([address]);

    if (this.RAMbankSelect >= 0x08 && this.RAMbankSelect <= 0x0c) {
      if (this.realtimeclock.accessRTC)
        return this.realtimeclock.ReadRegister(this.RAMbankSelect);
      else return 0xff;
    } else {
      if (!this.externalRAM) return 0xff;

      if (this.RAMbanks.length === 0) {
        console.warn(
          "MBC3: RAM banks are not initialized, game trying to read"
        );
        return;
      }

      return this.RAMbanks[this.RAMbankSelect][address - 0xa000];
    }
  }
}
