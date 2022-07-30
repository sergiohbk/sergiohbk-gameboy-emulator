import { OAMend, OAMstart } from "../variables/GPUConstants";

export class VRAMdisplay{
    constructor(canvas, gameboy){
        this.canvas = canvas;
        this.gameboy = gameboy;
        this.ctx = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        this.imageData = this.ctx.createImageData(this.width, this.height);
        this.imageData.data.fill(0);
        this.interval = 5000;
        setInterval(() => {
            console.log("drawing in VRAM");
            this.drawSprites();
        }, this.interval);
    }

    update(){
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    drawSprites(){
        const sprites = getSpritesInOAM(this.gameboy.cpu.bus.memory);
        const spriteHeight = getSpriteHeight(this.gameboy.cpu.bus.memory);
        for(let i = 0; i < sprites.length; i++){
            const spriteIndex = getSpritePixelIndexInMemory(sprites[i], spriteHeight);
            const spritebytes = getSpriteBytes(this.gameboy.cpu.bus.memory, spriteHeight, spriteIndex);
            const spritePixels = getPixelsfromBytes(spritebytes);
            const sprite = getColorOfPixels(spritePixels);
            for (let y = 0; y < spriteHeight; y++){
                for (let x = 0; x < 8; x++){
                    //j*8 el sprite general
                    //this.width el tamaño del canvas
                    //eje y es y * this.width
                    //j*8+x el pixel en el sprite
                    //(j*8+x)*4 + y*this.width es el pixel en el canvas
                    const position = (i*8+x)*4 + (y*this.width)*4;
                    const color = sprite[x + y*8];
                    this.imageData.data[position] = color.r;
                    this.imageData.data[position+1] = color.g;
                    this.imageData.data[position+2] = color.b;
                    this.imageData.data[position+3] = 255;
                }
            }
        }
        this.update();
    }
}

/**
 * accesses the OAM section of the memory to obtain the sprites that have been created with DMA
 * @param {uint8array} memory represents the memory of the gameboy
 * @returns {object[]} 40 sprites data object in an array
 */
export function getSpritesInOAM(memory) {
    let spriteList = [];
    for(let i = OAMstart; i < OAMend; i+=4){
        spriteList.push({
            y: memory[i],
            x: memory[i+1],
            tileIndex: memory[i+2],
            attributes: memory[i+3]
        }
        );
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
    const tileIndex = spriteHeight === 16 ? sprite.tileIndex & 0xFE : sprite.tileIndex;
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
export function getSpriteBytes(memory, spriteHeight, spriteIndex){
    const spriteBytes = [];
    const spriteWidth = 8;
    const bytesPerPixel = 2;
    const spriteSize = spriteHeight * spriteWidth * bytesPerPixel;

    for(let i = 0; i < spriteSize; i++){
        spriteBytes.push(memory[spriteIndex + i]);
    }

    return spriteBytes;
}

/**
 * get the height of sprites in LCDC
 * @param {uint8array} memory memory of the gameboy
 * @returns {number} height of sprites
 */
export function getSpriteHeight(memory){
    return (memory[0xFF40] & 0b1000) === 0 ? 8 : 16;
}
/**
 * get the pixels of the bytes given in parameters to create the 4 types of color
 * @param {number[]} bytes bytes to get pixels 
 * @returns {number[]} array of pixels
 */
export function getPixelsfromBytes(bytes){
    let pixels = [];
    for(let i = 0; i < bytes.length; i+=2){
        const byte1 = bytes[i];
        const byte2 = bytes[i+1];
        for(let x = 0; x < 8; x++){
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
export function getColorOfPixels(pixels){
    let colorPixels = [];
    for(let i = 0; i < pixels.length; i++){
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
export function getColorPixel(pixel){
    let color = {
        r: 0,
        g: 0,
        b: 0,
        a: 255
    }
    switch(pixel){
        case 0:
            return color;
        case 1:
            color.r = 88;
            color.g = 88;
            color.b = 88;
            return color;
        case 2:
            color.r = 140;
            color.g = 140;
            color.b = 140;
            return color;
        case 3:
            color.r = 255;
            color.g = 255;
            color.b = 255;
            return color;
        default:
            return color;
    }
}
