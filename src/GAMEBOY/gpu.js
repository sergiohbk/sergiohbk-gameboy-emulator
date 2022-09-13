import { IF_pointer } from "./interrumpts";
import { Sprite } from "./sprite";
import {
  completeFrameScanlines,
  cyclesHBlank,
  cyclesScanline,
  cyclesScanlineOAM,
  cyclesScanlineVRAM,
  cyclesVblank,
  MaxOAMsprites,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from "./variables/GPUConstants";

export class GPU {
  //(OAM - Object Attribute Memory) at $FE00-FE9F
  //(VRAM - Video RAM TILE DATA) at $8000-97FF
  //(VRAM - Video RAM MAP DATA) at $9800-9BFF
  //(VRAM - Video RAM ATTRIBUTE DATA) at $9C00-9FFF
  constructor(
    bus,
    canvas,
    colores = [
      [255, 255, 255],
      [192, 192, 192],
      [96, 96, 96],
      [0, 0, 0],
    ]
  ) {
    this.bus = bus;
    this.createDisplay(canvas);
    this.tileset = [];
    this.bytehigh = 0;
    this.bytelow = 0;
    this.x = 0;
    this.y = 0;
    this.tile = 0;
    this.flags = 0;
    this.LCDC = 0;
    this.bytesTile = [];
    this.tilesetloading = false;
    this.cyclesCounter = 0;
    this.LCDCstatus = 0;
    this.tilemapStartIndex = 0;
    this.mapStartCalculated = false;
    this.windowLinesDraws = 0;
    this.lastSprite = undefined;
    this.colores = colores;
    this.dummyly = false;
  }
  getLCDCmode() {
    let mode = this.bus.read(0xff41) & 0x3;
    switch (mode) {
      case 0:
        return "HBlank";
      case 1:
        return "VBlank";
      case 2:
        return "OAM";
      case 3:
        return "VRAM";
      default:
        return "OAM";
    }
  }
  setLCDCmode(mode) {
    let lastLCDCstatus = this.bus.read(0xff41);
    switch (mode) {
      case "HBlank":
        this.bus.write(0xff41, lastLCDCstatus & 0xfc);
        break;
      case "VBlank":
        this.bus.write(0xff41, (lastLCDCstatus & 0xfc) | 0x1);
        break;
      case "OAM":
        this.bus.write(0xff41, (lastLCDCstatus & 0xfc) | 0x2);
        break;
      case "VRAM":
        this.bus.write(0xff41, (lastLCDCstatus & 0xfc) | 0x3);
        break;
      default:
        this.bus.write(0xff41, (lastLCDCstatus & 0xfc) | 0x2);
        break;
    }
  }

  createDisplay(canvas) {
    if (canvas === undefined) return;

    this.screen = canvas;
    this.ctx = this.screen.getContext("2d");
    this.ctx.shadowInset = true;
    this.screen.width = SCREEN_WIDTH;
    this.screen.height = SCREEN_HEIGHT;
    this.imageData = this.ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  tick(cycles) {
    this.cyclesCounter += cycles;

    switch (this.getLCDCmode()) {
      case "OAM":
        if (this.cyclesCounter >= cyclesScanlineOAM) {
          const ly = this.bus.read(0xff44);
          if (ly === 153) {
            this.bus.memory[0xff44] = 0;
            this.windowLinesDraws = 0;
            this.cyclesCounter %= cyclesScanlineOAM;
          } else {
            this.bus.memory[0xff44]++;
          }

          this.setLCDCmode("VRAM");
          const lycom = this.lyCompare();
          this.lyInterrupt(lycom);
        }
        break;
      case "VRAM":
        if (this.cyclesCounter >= cyclesScanlineVRAM) {
          this.cyclesCounter %= cyclesScanlineVRAM;
          this.setLCDCmode("HBlank");
        }
        break;
      case "HBlank":
        if (this.cyclesCounter >= cyclesHBlank) {
          this.cyclesCounter %= cyclesHBlank;
          this.bufferringScanLine();

          const ly = this.bus.read(0xff44);
          if (ly < SCREEN_HEIGHT - 1) this.setLCDCmode("OAM");
          else this.setLCDCmode("VBlank");
        }
        break;
      case "VBlank":
        if (this.cyclesCounter >= cyclesVblank) {
          this.cyclesCounter %= cyclesVblank;
          this.bus.memory[0xff44]++;
          const ly = this.bus.read(0xff44);
          const lycom = this.lyCompare();
          this.lyInterrupt(lycom);
          if (ly === 144)
            this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] | 0x1;
          if (ly === 153) this.setLCDCmode("OAM");
        }
        break;
      default:
        break;
    }
  }

  getActualMode() {
    let mode = this.getLCDCmode();
    let interruptmode = 0;
    switch (mode) {
      case "HBlank":
        interruptmode = 0;
        break;
      case "VBlank":
        interruptmode = 1;
        break;
      case "OAM":
        interruptmode = 2;
        break;
      case "VRAM":
        interruptmode = 0;
        break;
      default:
        interruptmode = 0;
        break;
    }
    return interruptmode;
  }
  bufferringScanLine() {
    this.LCDC = this.bus.read(0xff40);
    if ((this.LCDC & 0x80) !== 0x80) return;

    var scanline = new Array(SCREEN_WIDTH);

    if ((this.LCDC & 0x1) === 0x1) {
      scanline = this.loadbgline();
    }
    if ((this.LCDC & 0x20) === 0x20) {
      this.loadWindowLine(scanline);
    }
    if ((this.LCDC & 0x2) === 0x2) {
      this.loadspriteline(scanline);
    }
    this.drawtoScreen(scanline);
  }

  loadbgline() {
    let backgroundline = [];
    const scrolledY = (this.bus.read(0xff42) + this.bus.read(0xff44)) & 0xff;
    //const ly = this.bus.read(0xFF44);
    const tilemapMemPos = (this.LCDC & 0x08) === 0x08 ? 0x9c00 : 0x9800;
    const backgroundMemPos = (this.LCDC & 0x10) === 0x10 ? 0x8000 : 0x8800;

    for (let screenX = 0; screenX < SCREEN_WIDTH; screenX++) {
      if ((this.LCDC & 0x1) === 0x1) {
        const scrolledX = (this.bus.read(0xff43) + screenX) & 0xff;
        const tileMapIndex = this.getTileIndexFromPixelLocation(
          scrolledX,
          scrolledY
        );

        const tilePixelPosition = this.getUpperLeftPixelPosition(tileMapIndex);

        const xPosInTile = scrolledX - tilePixelPosition[0];
        const yPosInTile = scrolledY - tilePixelPosition[1];

        const bytePositionInTile = yPosInTile * 2;

        const relativeOffset =
          (this.bus.read(0xff40) & 0x10) === 0x00 ? 128 : 0;
        const tileCharIndex =
          (this.bus.read(tilemapMemPos + tileMapIndex) + relativeOffset) & 0xff;

        const tileCharBytePosition = tileCharIndex * 16;

        const currentTileLineBytePosition =
          backgroundMemPos + tileCharBytePosition + bytePositionInTile;

        const lowerByte = this.bus.read(currentTileLineBytePosition);
        const upperByte = this.bus.read(currentTileLineBytePosition + 1);
        const paletteColors = this.getColourPalette();
        const palette = this.getPixelInTileLine(
          xPosInTile,
          lowerByte,
          upperByte,
          false
        );

        backgroundline.push(paletteColors[palette]);
      } else {
        let line = [];
        for (let i = 0; i < SCREEN_WIDTH; i++) {
          line.push(this.colores[0]);
        }
        backgroundline.push(line);
      }
    }
    return backgroundline;
  }

  getColourPalette() {
    const paletteRegister = this.bus.read(0xff47);
    let Colors = [];
    const color0 = this.getPixelColor(paletteRegister & 0x3);
    const color1 = this.getPixelColor((paletteRegister & 0xc) >> 2);
    const color2 = this.getPixelColor((paletteRegister & 0x30) >> 4);
    const color3 = this.getPixelColor((paletteRegister & 0xc0) >> 6);
    Colors.push(color0);
    Colors.push(color1);
    Colors.push(color2);
    Colors.push(color3);
    return Colors;
  }

  getColourSpritePalette(palette) {
    let paletteRegister =
      palette === 0 ? this.bus.read(0xff48) : this.bus.read(0xff49);
    let Colors = [];
    const color0 = this.getPixelColor(paletteRegister & 0x3);
    const color1 = this.getPixelColor((paletteRegister & 0xc) >> 2);
    const color2 = this.getPixelColor((paletteRegister & 0x30) >> 4);
    const color3 = this.getPixelColor((paletteRegister & 0xc0) >> 6);

    Colors.push(color0);
    Colors.push(color1);
    Colors.push(color2);
    Colors.push(color3);
    return Colors;
  }

  loadWindowLine(scanline) {
    let ly = this.bus.read(0xff44);
    let wy = this.bus.read(0xff4a);
    let wx = this.bus.read(0xff4b);
    if (ly < wy || wx > 166) return;
    let windowline = [];
    let windowTileMapMemPos = (this.LCDC & 0x40) === 0x40 ? 0x9c00 : 0x9800;
    let backgroundMemPos = (this.LCDC & 0x10) === 0x10 ? 0x8000 : 0x8800;
    var windowTileMap;

    const paletteColors = this.getColourPalette();

    if (backgroundMemPos === 0x8800) {
      let signed = this.bus.memory.subarray(
        windowTileMapMemPos,
        windowTileMapMemPos + 0x1000
      );
      windowTileMap = new Int8Array(signed);
    } else {
      let unsigned = this.bus.memory.subarray(
        windowTileMapMemPos,
        windowTileMapMemPos + 0x1000
      );
      windowTileMap = new Uint8Array(unsigned);
    }

    const yPositionInTile = this.windowLinesDraws;

    const correctedX = wx - 7;

    for (let screenX = 0; screenX < SCREEN_WIDTH; screenX++) {
      if (correctedX > screenX) {
        windowline.push(-1);
        continue;
      }
      const xPositionInTile = screenX - correctedX;

      const tileMapIndex = this.getTileIndexFromPixelLocation(
        xPositionInTile,
        yPositionInTile
      );
      const tilePixelPosition = this.getUpperLeftPixelPosition(tileMapIndex);

      const xPosInTile = xPositionInTile - tilePixelPosition[0];
      const yPosInTile = yPositionInTile - tilePixelPosition[1];

      const bytePositionInTile = yPosInTile * 2;
      const signed = backgroundMemPos === 0x8800 ? 128 : 0;
      const tileCharIndex = windowTileMap[tileMapIndex] + signed;
      const tileCharBytePosition = tileCharIndex * 16;

      const currentTileLineBytePosition =
        backgroundMemPos + tileCharBytePosition + bytePositionInTile;

      const lowerByte = this.bus.read(currentTileLineBytePosition);
      const upperByte = this.bus.read(currentTileLineBytePosition + 1);

      const palette = this.getPixelInTileLine(
        xPosInTile,
        lowerByte,
        upperByte,
        false
      );

      windowline.push(paletteColors[palette]);
    }
    this.windowLinesDraws++;
    this.putPixelsInScanLine(scanline, windowline, 0);
  }

  putPixelsInScanLine(scanline, pixels, x) {
    if (pixels === undefined) return;
    for (let i = 0; i < pixels.length; i++) {
      if (pixels[i] !== -1) scanline[x + i] = pixels[i];
    }
  }

  loadspriteline(scanline) {
    const LCDC = this.bus.read(0xff40);
    const spriteHeight = (LCDC & 0x04) === 0x04 ? 16 : 8;
    let spriteline = [];
    const sprites = this.getNumberOfSpritesInOAM();
    const ly = this.bus.read(0xff44);
    let MaxSpritesInLine = 0;
    let listSprites = [];

    for (let i = 0; i < sprites.length; i++) {
      if (MaxSpritesInLine === 10) break;
      if (
        ly >= sprites[i].y &&
        sprites[i].y + spriteHeight > ly &&
        sprites[i].x >= -7 &&
        sprites[i].x <= SCREEN_WIDTH
      ) {
        listSprites.push(sprites[i]);
        MaxSpritesInLine++;
      }
    }

    if (listSprites.length === 0) return;

    listSprites
      .sort((a, b) => {
        return a.x - b.x;
      })
      .reverse();

    for (let i = 0; i < listSprites.length; i++) {
      const sprite = listSprites[i];
      const palleteColor = this.getColourSpritePalette(sprite.palette);
      const lastLineOfSprite = spriteHeight - 1;

      let scanlineIntersectsYat = ly - sprite.y;

      if (sprite.Yflip === 0x1) {
        scanlineIntersectsYat = lastLineOfSprite - scanlineIntersectsYat;
      }

      const tileIndex =
        spriteHeight === 16 ? sprite.tileIndex & 0xfe : sprite.tileIndex;
      const bytePositionInTile = scanlineIntersectsYat * 2;
      const tileCharBytePosition = tileIndex * 16;
      const currentTileLineBytePosition =
        0x8000 + tileCharBytePosition + bytePositionInTile;

      const lowerByte = this.bus.read(currentTileLineBytePosition);
      const upperByte = this.bus.read(currentTileLineBytePosition + 1);

      for (let xTile = 0; xTile < 8; xTile++) {
        const paletteIndex = this.getPixelInTileLine(
          xTile,
          lowerByte,
          upperByte,
          sprite.Xflip === 0x1
        );
        const palette = palleteColor[paletteIndex];
        const screenX = sprite.x + xTile;

        if (screenX < 0 || screenX >= SCREEN_WIDTH) continue;

        const isBehind =
          sprite.bgwnPriority === 0x1 &&
          scanline[screenX][0] !== this.colores[0][0];

        if (!isBehind) {
          if (paletteIndex === 0) {
            spriteline.push(-1);
          } else {
            spriteline.push(palette);
          }
        } else {
          spriteline.push(-1);
        }
      }

      const xPos = sprite.x < 0 ? 0 : sprite.x;
      this.putPixelsInScanLine(scanline, spriteline, xPos);
      spriteline = [];
    }
  }

  getNumberOfSpritesInOAM() {
    let sprites = [];
    for (let i = 0; i < MaxOAMsprites; i++) {
      let sprite = new Sprite(i);
      sprite.getData(this.bus);
      if (sprite.isThisSpriteExists()) {
        sprites.push(sprite);
      }
    }
    return sprites;
  }

  getTileIndexFromPixelLocation(scrolledX, scrolledY) {
    const tileSize = 8;
    const backgroundNumberOfTiles = 32;

    const tileX = Math.floor(scrolledX / tileSize);
    const tileY = Math.floor(scrolledY / tileSize);

    return tileY * backgroundNumberOfTiles + tileX;
  }

  getPixelInTileLine(xposition, lowerByte, upperByte, flipped) {
    const xPixelInTile = flipped ? xposition : 7 - xposition;

    const shadelower = (lowerByte >> xPixelInTile) & 0x1;
    const shadeupper = ((upperByte >> xPixelInTile) & 0x1) << 1;

    return shadelower | shadeupper;
  }

  getUpperLeftPixelPosition(tileIndex) {
    const tileSize = 8;
    const backgroundNumberOfTiles = 32;

    const posY = Math.floor(tileIndex / backgroundNumberOfTiles);
    const posX = tileIndex - posY * backgroundNumberOfTiles;

    return [posX * tileSize, posY * tileSize];
  }

  calculateTileMapIndex(tilemapMemPos, x, ly, scrollY, scrollX, signedoffset) {
    const abs_ln = (ly + scrollY) % 256;
    const map_row_start = (abs_ln / 8) * 32;
    let abs_col = ((x + scrollX) / 8) % 32;
    console.log(signedoffset);
    this.tilemapStartIndex =
      tilemapMemPos + map_row_start + Math.floor(abs_col);
  }

  getPixel(bgmem, tilenum, ly, scrollY, x, scrollX) {
    //get the pixel in the tilenum with x and y location
    let tile_x = (ly + scrollY) / 8;
    let tile_y = (x + scrollX) / 8;
    //let tile_index = tilenum + tile_x + tile_y * 32;
    let tile_pixel_location = bgmem + tilenum * 16 + tile_x + tile_y;
    let bytelow = this.bus.read(tile_pixel_location);
    let bytehigh = this.bus.read(tile_pixel_location + 1);
    let pixel =
      (((bytehigh >> (7 - (x % 8))) & 1) << 1) |
      ((bytelow >> (7 - (x % 8))) & 1);
    return pixel;
  }

  getTileMapIndex() {
    let scrollY = (this.bus.read(0xff44) + this.bus.read(0xff42)) & 0xff;
    let scrollX = this.bus.read(0xff43) & 0xff;
    let tileMapIndex = Math.floor((scrollY / 8) * 32 + scrollX / 8);
    return tileMapIndex;
  }

  drawtoScreen(scanline) {
    const ly = this.bus.read(0xff44);

    if (scanline == null || scanline === undefined) return;

    for (let i = 0; i < SCREEN_WIDTH; i++) {
      let pixel = scanline[i];

      if (pixel === undefined) continue;
      if (pixel[0] === -1) continue;

      let index = i * 4 + ly * SCREEN_WIDTH * 4;
      this.imageData.data[index] = pixel[0];
      this.imageData.data[index + 1] = pixel[1];
      this.imageData.data[index + 2] = pixel[2];
      this.imageData.data[index + 3] = 255;
    }
  }

  renderTheFrame() {
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  getPixelTile(xpos, tileHigh, tileLow) {
    let pixel =
      (((tileHigh >> (7 - xpos)) & 1) << 1) | ((tileLow >> (7 - xpos)) & 1);
    return this.getPixelColor(pixel);
  }
  lyCompare() {
    let lyc = this.bus.read(0xff45);
    let ly = this.bus.read(0xff44);
    if (ly === lyc) {
      this.bus.memory[0xff41] |= 0x4;
      return true;
    } else {
      this.bus.memory[0xff41] &= 0xfb;
      return false;
    }
  }
  lyInterrupt(lycompare) {
    let lycInterrupt = (this.bus.read(0xff41) & 0x40) === 0x40;
    if (lycompare && lycInterrupt) {
      this.bus.memory[IF_pointer] = this.bus.memory[IF_pointer] | 0x2;
    }
  }
  resetBGmapbuffer() {
    for (let y = 0; y < 256; y++) {
      this.bgmapbuffer.push([]);
      for (let x = 0; x < 256; x++) {
        this.bgmapbuffer[y].push(-1);
      }
    }
  }

  getPixelColor(pixel) {
    /*
    esta es la paleta de colores
    que la gameboy puede reproducir
    0 - blanco 1 - gris claro 2 - gris oscuro 3 - negro
    segun el pixel dado por parametro, el valor de este
    indicara que color debe ser devuelto para posteriormente
    renderizarlo, como voy a permitir el cambio de colores
    ya que quizas es mas comodo usar escala de grises
    pero la gameboy tiene la pantalla verde, entonces
    usare una variable para definirlos
    */

    switch (pixel) {
      case 0:
        return this.colores[0];
      case 1:
        return this.colores[1];
      case 2:
        return this.colores[2];
      case 3:
        return this.colores[3];
      default:
        return this.colores[0];
    }
  }
}
