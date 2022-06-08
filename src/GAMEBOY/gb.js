import { CPU } from "./cpu";
import { GPU } from "./gpu";
import { cyclesPerFrame } from "./variables/GPUConstants";

export class GAMEBOY {
  // especificaciones
  // cpu z80 (8080 like)
  // cpu freq 4,194,304 MHz
  // ram 8kb
  // rom 16kb
  // video ram 8kb
  // resolucion de pantalla 160x144
  // 4 tonos de gris
  // sincronizacion vertical 59,73 Hz
  // sincronizacion horizontal 9,198 Hz

  /* /////////////////////////////////
  ///////┍━━━━━━━ ⋆⋅☆⋅⋆ ━━━━━━━┑////////
  /////// CREATED BY SERGIO-HBK ////////
  ///////┗━━━━━━━ ⋆⋅☆⋅⋆ ━━━━━━━┛/////////
    //////////////////////////////// */

  constructor(canvas, colores) {
    this.cpu = new CPU();
    this.gpu = new GPU(this.cpu.bus, canvas, colores);
    this.lastTime = 0;
    this.fps = 59.7;
    this.then = 0;
    this.now = 0;
    this.interval = 0;
    this.elapsed = 0;
    this.cycles = 0;
    this.running = true;
  }

  run() {
    this.interval = 1000 / this.fps;
    this.then = window.performance.now();
    requestAnimationFrame((time) => this.runFrame(time));
  }

  runFrame(time) { 
    if (!this.running) return;
    this.now = time;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.interval){
      this.then = this.now - (this.elapsed % this.interval);
      
      while (this.cycles < cyclesPerFrame) {
        let cyclesFrame = this.cpu.tick();
        this.gpu.tick(cyclesFrame);
        this.cycles += cyclesFrame;
      }

      if(this.cpu.bus.cartridge.timer)
        this.cpu.bus.mbcC.MBC.realtimeclock.tick(this.cycles);

      this.gpu.renderTheFrame();

      this.cycles %= cyclesPerFrame;
    }

    requestAnimationFrame((time) => this.runFrame(time));
  }

  loadBootRom(bootstrap) {
    /*
    añadimos a la memoria el bootrom de gameboy
    convertimos el fetch en un arraybuffer
    lo hacemos un array uint8
    activamos la bootrom para que se ejecute en lugar
    del cartucho hasta llegar a la instruccion 100
    */

    const bootRom = bootstrap;
    const bootRomBuffer = bootRom.arrayBuffer();
    const bootRomArray = new Uint8Array(bootRomBuffer);
    for (let i = 0; i < bootRomArray.length; i++) {
      this.cpu.bus.memory[i] = bootRomArray[i];
    }
    this.cpu.bus.bootromActive = true;
  }

  loadRom(game) {
    const rombuffer = new Uint8Array(game);
    this.cpu.bus.setRom(rombuffer);
    console.log(this.cpu.bus.cartridge);
  }
}
