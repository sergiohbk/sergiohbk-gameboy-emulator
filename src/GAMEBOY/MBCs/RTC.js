import { cyclesPerSecond } from "../variables/GPUConstants";

export class RealTimeClock {
  constructor() {
    this.clock = {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      timerhalt: 0,
      countercarry: 0,
    };

    this.accessRTC = false;

    this.cloneRTC = 0xff;
    this.cloning = false;

    this.cycles = 0;
  }

  latchRTC(value) {
    if (value === 0x00) this.cloning = true;
    if (value === 0x01 && this.cloning) {
      this.cloneRTC = this.clock;
      this.cloning = false;
    }
  }

  WriteRegister(value, rambank) {
    switch (rambank) {
      case 0x08:
        this.clock.seconds = value;
        if (this.cloneRTC !== 0xff) this.cloneRTC.seconds = value;
        break;
      case 0x09:
        this.clock.minutes = value;
        if (this.cloneRTC !== 0xff) this.cloneRTC.minutes = value;
        break;
      case 0x0a:
        this.clock.hours = value;
        if (this.cloneRTC !== 0xff) this.cloneRTC.hours = value;
        break;
      case 0x0b:
        this.clock.days = (this.clock.days & 0x100) | (value & 0xff);
        if (this.cloneRTC !== 0xff)
          this.cloneRTC.days = (this.cloneRTC.days & 0x100) | (value & 0xff);
        break;
      case 0x0c:
        this.clock.days = (this.clock.days & 0xff) | ((value & 0x01) << 8);
        this.clock.timerhalt = (value & 0x40) >> 6;
        this.clock.countercarry = (value & 0x80) >> 7;
        if (this.cloneRTC !== 0xff) {
          this.cloneRTC.days =
            (this.cloneRTC.days & 0xff) | ((value & 0x01) << 8);
          this.cloneRTC.timerhalt = (value & 0x40) >> 6;
          this.cloneRTC.countercarry = (value & 0x80) >> 7;
        }
        break;
      default:
        break;
    }
  }

  ReadRegister(rambank) {
    if (this.cloneRTC === 0xff) {
      console.warn("RTC is not latched");
      return 0x00;
    }

    switch (rambank) {
      case 0x08:
        return this.cloneRTC.seconds & 0x3f;
      case 0x09:
        return this.cloneRTC.minutes & 0x3f;
      case 0x0a:
        return this.cloneRTC.hours & 0x1f;
      case 0x0b:
        return this.cloneRTC.days & 0xff;
      case 0x0c:
        let value = (this.cloneRTC.days & 0x100) >> 8;
        value |= this.cloneRTC.timerhalt << 6;
        value |= this.cloneRTC.countercarry << 7;
        value &= 0xc1;
        return value;
      default:
        return 0xff;
    }
  }

  tick(cycles) {
    if (this.clock.timerhalt === 1) return;

    this.cycles += cycles;

    if (this.cycles >= cyclesPerSecond) {
      this.clock.seconds = (this.clock.seconds + 1) & 0x3f;
    } else {
      return;
    }

    if (this.clock.seconds === 60) {
      this.clock.seconds = 0;
      this.clock.minutes = (this.clock.minutes + 1) & 0x3f;
    }

    if (this.clock.minutes === 60) {
      this.clock.minutes = 0;
      this.clock.hours = (this.clock.hours + 1) & 0x1f;
    }

    if (this.clock.hours === 24) {
      this.clock.hours = 0;
      this.clock.days++;
    }

    if (this.clock.days > 0x1ff) {
      this.clock.days = 0;
      this.clock.countercarry = 1;
    }

    this.cycles %= cyclesPerSecond;
  }
}
