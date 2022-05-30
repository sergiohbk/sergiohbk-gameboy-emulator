export const TIMA_pointer = 0xFF05;
// timer counter, se incrementa a 16384Hz
export const TMA_pointer = 0xFF06;
// se incrementa cuando TIMA hace overflow, el valor sobrante
export const TAC_pointer = 0xFF07;
// bit 0/1: input clock select
// 00: 4.096KHz
// 01: 262.144KHz
// 10: 65.536KHz
// 11: 16.384KHz
// bit 2: timer enable
// 0 stop
// 1 start
export const LCD_CONTROL_pointer = 0xFF40;
// bit 0: BG display
// bit 1: Sprite display
// bit 2: Sprite size
// 0: 8x8
// 1: 8x16
// bit 3: BG tile map display select
// 0: 0x9800 - 0x9BFF
// 1: 0x9C00 - 0x9FFF
// bit 4: BG and window tile data select
// 0: 0x8800 - 0x97FF
// 1: 0x8000 - 0x8FFF
// bit 5: window display enable
// 0: off
// 1: on
// bit 6: window tile map select
// 0: 0x9800 - 0x9BFF
// 1: 0x9C00 - 0x9FFF
// bit 7: display enable
// 0: off
// 1: on
export const DIV_pointer = 0xFF04;