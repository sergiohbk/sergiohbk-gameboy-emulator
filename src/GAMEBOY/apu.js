// audio processing unit

export class APU {
  constructor() {
    this.audioCtx = new AudioContext();
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.type = "sine";
    this.oscillator.frequency.setValueAtTime(440, this.audioCtx.currentTime);
    this.oscillator.connect(this.audioCtx.destination);
    this.oscillator.start();

    //channels
    this.envesweep = new EnvelopeSweep();
    this.tone = new Tone();
    this.wave = new Wave();
    this.noise = new Noise();

    //registers
    this.nr50 = 0; //controla el volumen de los canales
    this.nr51 = 0; //controla donde se escucha cada canal, algo asi como envolvente
    this.nr52 = false; //controla el estado de los canales, si estan encendidos o apagados
  }
}

class EnvelopeSweep {
  constructor() {
    this.enabled = false;
    this.period = 0;
    this.direction = 0;
    this.shift = 0;

    this.timer = 0;
    this.counter = 0;
  }
}

class Tone {
  constructor() {
    this.enabled = false;
    this.length = 0;
    this.period = 0;
    this.volume = 0;

    this.timer = 0;
    this.counter = 0;

    this.wavetable = [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0],
    ];

    this.frequencytimer = this.getFrequency();
    this.wavedutyposition = 0;
  }

  getFrequency() {
    return 131072 / (2048 - this.period);
  }

  getWaveDuty() {
    return this.wavetable[this.wavedutyposition];
  }
}

class Wave {
  constructor() {
    this.enabled = false;
    this.length = 0;
    this.volume = 0;

    this.timer = 0;
    this.counter = 0;
  }
}

class Noise {
  constructor() {
    this.enabled = false;
    this.length = 0;
    this.period = 0;
    this.volume = 0;

    this.timer = 0;
    this.counter = 0;
  }
}
