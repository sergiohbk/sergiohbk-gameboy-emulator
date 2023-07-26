/**
 * principal class for canvasEasy
 */
export class canvasEasy {
  /**
   * constructor of the class, it creates the canvas, the context and the imageData
   * @param {canvas} canvas the canvas to use
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.imageData = this.ctx.createImageData(this.width, this.height);
    this.imageData.data.fill(0);
    this.drawedPosition = [];
  }
  /**
   * add the imagedata to the canvas
   */
  update() {
    this.ctx.putImageData(this.imageData, 0, 0);
    this.drawedPosition = [];
  }

  //add the array of sprite to the canvas in the position x,y
  //added as a scanlines with the size of the sprite
  /**
   * this function add the array of sprite to the canvas in the position x,y
   * @param {Array<Object>} sprite the sprite is a array of objects with the properties r,g,b,a
   * @param {*} lenght the lenght of the sprite
   * @param {*} width the width of the sprite
   * @param {*} x the x position of the sprite
   * @param {*} y the y position of the sprite
   */
  setSprite(sprite, length, width, x = 0, y = 0) {
    sprite.forEach((sprite) => {
      if (
        typeof sprite.r !== "number" ||
        typeof sprite.g !== "number" ||
        typeof sprite.b !== "number" ||
        typeof sprite.a !== "number"
      ) {
        throw new Error(
          `the sprite is not valid, it must be an array of objects with the properties r,g,b,a as a number`
        );
      }
    });
    let index = 0;
    for (let i = y; i < y + length; i++) {
      for (let j = x; j < x + width; j++) {
        this.imageData.data[i * this.width * 4 + j * 4] = Math.trunc(
          sprite[index].r
        );
        this.imageData.data[i * this.width * 4 + j * 4 + 1] = Math.trunc(
          sprite[index].b
        );
        this.imageData.data[i * this.width * 4 + j * 4 + 2] = Math.trunc(
          sprite[index].g
        );
        this.imageData.data[i * this.width * 4 + j * 4 + 3] = Math.trunc(
          sprite[index].a
        );
        index++;
      }
    }

    this.drawedPosition.push({ x, y, length, width });
  }

  setNextSprite(sprite, length, width, x = 0, y = 0) {
    if (this.drawedPosition.length === 0) {
      this.setSprite(sprite, length, width, x, y);
      return;
    }
    let lastPosition = this.drawedPosition[this.drawedPosition.length - 1];
    if (lastPosition) {
      if (lastPosition.x + lastPosition.width + width > this.width) {
        x = 0;
        y = lastPosition.y + lastPosition.length;
      } else {
        x = lastPosition.x + lastPosition.width;
        y = lastPosition.y;
      }
    }
    this.setSprite(sprite, length, width, x, y);
  }

  setNextTile(sprite, length, width, x = 0, y = 0) {
    if (this.drawedPosition.length === 0) {
      this.setSprite(sprite, length, width, x, y);
      return;
    }
    let lastPosition = this.drawedPosition[this.drawedPosition.length - 1];
    if (lastPosition) {
      if (lastPosition.x + lastPosition.width + width > this.width) {
        x = 0;
        y = lastPosition.y + lastPosition.length;
      } else {
        x = lastPosition.x + lastPosition.width;
        y = lastPosition.y;
      }
    }
    this.setSprite(sprite, length, width, x, y);
  }

  isDrawed(x, y, length, width) {
    return this.drawedPosition.some(
      //test if the position is in the array or in between the position
      (position) =>
        (x >= position.x &&
          x <= position.x + position.width &&
          y >= position.y &&
          y <= position.y + position.length) ||
        (x + width >= position.x &&
          x + width <= position.x + position.width &&
          y >= position.y &&
          y <= position.y + position.length) ||
        (x >= position.x &&
          x <= position.x + position.width &&
          y + length >= position.y &&
          y + length <= position.y + position.length) ||
        (x + width >= position.x &&
          x + width <= position.x + position.width &&
          y + length >= position.y &&
          y + length <= position.y + position.length)
    );
  }
}
