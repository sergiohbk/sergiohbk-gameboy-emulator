export const SCREEN_WIDTH = 160;
export const SCREEN_HEIGHT = 144;
export const SCREEN_MULTIPLY = 4;
export const SCREEN_DEBUG_TILES_HEIGHT = 24;
export const SCREEN_DEBUG_TILES_WIDTH = 680;
export const cyclesHBlank = 204;
export const cyclesScanlineOAM = 80;
export const cyclesScanlineVRAM = 172;
export const cyclesScanline =
  cyclesHBlank + cyclesScanlineOAM + cyclesScanlineVRAM;
export const cyclesVblank = 4560;
export const scanlinesPerFrame = SCREEN_HEIGHT;
export const completeFrameScanlines = 154;
export const cyclesPerFrame = cyclesScanline * scanlinesPerFrame + cyclesVblank;
export const OAMstart = 0xfe00;
export const OAMend = 0xfe9f;
export const MaxSpritesInLine = 10;
export const MaxOAMsprites = 40;
