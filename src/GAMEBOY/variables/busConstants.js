export const ROM_BANK_00 = 0x0000;
export const ROM_BANK_NN = 0x4000;
export const VIDEO_RAM = 0x8000;
export const EXTERNAL_RAM = 0xA000;
export const WORK_RAM = 0xC000;
export const WORK_RAM_2 = 0xD000;
export const SPRITE_ATTRIBUTE_TABLE= 0xFE00;
export const IO_REGISTERS = 0xFF00;
export const HIGH_RAM = 0xFF80;
export const INTERRUPT_ENABLE_REGISTER = 0xFFFF;
export const MEMORY_SIZE = 0x10000;
//jump vectors
export const RST_INSTRUCTIONS ={
    "RST_00": 0x0000,
    "RST_08": 0x0008,
    "RST_10": 0x0010,
    "RST_18": 0x0018,
    "RST_20": 0x0020,
    "RST_28": 0x0028,
    "RST_30": 0x0030,
    "RST_38": 0x0038
}
//interrupt vectors
export const INTERRUPT_VECTORS ={
    "VBLANK": 0x0040,
    "LCD_STAT": 0x0048,
    "TIMER": 0x0050,
    "SERIAL": 0x0058,
    "JOYPAD": 0x0060
}

export const CARDRIDGE_HEADER = 0x0100;
