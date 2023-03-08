import { OAMend, OAMstart } from "../variables/GPUConstants";
import { canvasEasy } from "../libraries/canvasEasy";

export class VRAMdisplay {
  constructor(canvas, gameboy) {
    this.canvas = canvas;
    this.gameboy = gameboy;
    this.memory = this.gameboy.cpu.bus.memory;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvasez = new canvasEasy(this.canvas);
  }

  update(imageData) {
    this.ctx.putImageData(imageData, 0, 0);
  }

  drawSprites() {
    const sprites = getSpritesInOAM(this.memory);
    const spriteHeight = getSpriteHeight(this.memory);
    for (let i = 0; i < sprites.length; i++) {
      const spriteIndex = getSpritePixelIndexInMemory(sprites[i], spriteHeight);
      const spritebytes = getSpriteBytes(
        this.memory,
        spriteHeight,
        spriteIndex
      );
      const spritePixels = getPixelsfromBytes(spritebytes);
      const sprite = getColorOfPixels(spritePixels);
      this.canvasez.setNextSprite(sprite, spriteHeight, 8, 0, 0);
    }
    this.canvasez.update();
  }

  drawVram() {
    for (let i = 0x8000; i < 0x9800; i += 16) {
      const tilebytes = getTileBytes(this.memory, i);
      const tilePixels = getPixelsfromBytes(tilebytes);
      const tile = getColorOfPixels(tilePixels);
      this.canvasez.setNextTile(tile, 8, 8, 0, 0);
    }
    this.canvasez.update();
  }
}

export function getTileBytes(memory, tileIndex) {
  const tilebytes = [];
  for (let i = 0; i < 16; i++) {
    tilebytes.push(memory[tileIndex + i]);
  }
  return tilebytes;
}

/**
 * accesses the OAM section of the memory to obtain the sprites that have been created with DMA
 * @param {uint8array} memory represents the memory of the gameboy
 * @returns {object[]} 40 sprites data object in an array
 */
export function getSpritesInOAM(memory) {
  let spriteList = [];
  for (let i = OAMstart; i < OAMend; i += 4) {
    //omit if all bytes are 0
    if (
      memory[i] === 0 &&
      memory[i + 1] === 0 &&
      memory[i + 2] === 0 &&
      memory[i + 3] === 0
    ) {
      continue;
    }
    spriteList.push({
      y: memory[i],
      x: memory[i + 1],
      tileIndex: memory[i + 2],
      attributes: memory[i + 3],
    });
  }

  return spriteList;
}

/**
 * do the operations to get the position of sprite pixels in the VRAM
 * @param {object} sprite the sprite to get the pixels
 * @param {number} spriteHeight the sprite height getting in LCDC
 * @returns {number} index of the sprite pixels in memory
 */
export function getSpritePixelIndexInMemory(sprite, spriteHeight) {
  const tileIndex =
    spriteHeight === 16 ? sprite.tileIndex & 0xfe : sprite.tileIndex;
  const spriteMemoryIndex = 0x8000 | (tileIndex << 4);
  return spriteMemoryIndex;
}

/**
 * get all the bytes of the sprite in VRAM
 * @param {uint8array} memory represents the memory of the gameboy
 * @param {number} spriteHeight size of the sprite
 * @param {number} spriteIndex index of the sprite in VRAM (getSpritePixelIndexInMemory)
 * @returns {number[]} array of bytes of the sprite
 */
export function getSpriteBytes(memory, spriteHeight, spriteIndex) {
  const spriteBytes = [];
  const bytesPerPixel = 2;
  const spriteSize = spriteHeight * bytesPerPixel;

  for (let i = 0; i < spriteSize; i++) {
    spriteBytes.push(memory[spriteIndex + i]);
  }

  return spriteBytes;
}

/**
 * get the height of sprites in LCDC
 * @param {uint8array} memory memory of the gameboy
 * @returns {number} height of sprites
 */
export function getSpriteHeight(memory) {
  return (memory[0xff40] & 0b100) === 0 ? 8 : 16;
}
/**
 * get the pixels of the bytes given in parameters to create the 4 types of color
 * @param {number[]} bytes bytes to get pixels
 * @returns {number[]} array of pixels
 */
export function getPixelsfromBytes(bytes) {
  let pixels = [];
  for (let i = 0; i < bytes.length; i += 2) {
    const byte1 = bytes[i];
    const byte2 = bytes[i + 1];
    for (let x = 0; x < 8; x++) {
      const bit1 = (byte1 >> (7 - x)) & 0b1;
      const bit2 = (byte2 >> (7 - x)) & 0b1;
      const pixel = bit1 | (bit2 << 1);
      pixels.push(pixel);
    }
  }
  return pixels;
}

/**
 * get the color of all pixels given in parameters
 * @param {number[]} pixels pixels to get the color
 * @returns {string[]} array of colors
 */
export function getColorOfPixels(pixels) {
  let colorPixels = [];
  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    const color = getColorPixel(pixel);
    colorPixels.push(color);
  }

  return colorPixels;
}

/**
 * get the color of pixel
 * @param {number} pixel number of the pixel to get the color 0-3
 * @returns {object} color of the pixel
 */
export function getColorPixel(pixel) {
  let color = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  };
  switch (pixel) {
    case 0:
      return color;
    case 1:
      color.r = 140;
      color.g = 140;
      color.b = 140;
      return color;
    case 2:
      color.r = 80;
      color.g = 80;
      color.b = 80;
      return color;
    case 3:
      color.r = 0;
      color.g = 0;
      color.b = 0;
      return color;
    default:
      return color;
  }
}
