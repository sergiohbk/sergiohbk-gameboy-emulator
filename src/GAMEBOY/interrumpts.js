export var IME = false;
//registro especial indicador de interrupciones
export const masterInterruptPointer = 0xFFFF;
export const IF_pointer = 0xFF0F;
// bit 1: interrupt on VBlank
// bit 2: interrupt on LCD STAT
// bit 3: interrupt on timer
// bit 4: interrupt on serial
// bit 5: interrupt on joypad
export const interrupts_pointer = {
    VBlank: 0x0040,
    LCDSTAT: 0x0048,
    Timer: 0x0050,
    Serial: 0x0058,
    Joypad: 0x0060
}

export function setIME(value){
    IME = value;
    //console.log("ime is set to " + value)
}
