export class Registers{
    constructor(){
        this.a = 0x00;
        this.b = 0x00;
        this.c = 0x00;
        this.d = 0x00;
        this.e = 0x00;
        this.h = 0x00;
        this.l = 0x00;
        //el bit 7 es el flag de zero
        //el bit 6 es el flag de subtraction
        //el bit 5 es el flag de half carry
        //el bit 4 es el flag de carry
        this.zero = false;
        this.subtraction = false;
        this.halfcarry = false;
        this.carry = false;
        this.bootstrap = false;
        this.sp = 0x0000; //stack pointer
        this.pc = 0x0000; // hay que ver cuantos bytes tiene
        if(!this.bootstrap){
            this.setInitialValues();
        }
        this.stack = [];
        this.halted = false;
    }
    
    setInitialValues(){
        //la gameboy inicializa valores de los registros en el bootstrap, de momento los añado aqui
        this.a = 0x01;
        this.b = 0x00;
        this.c = 0x13;
        this.d = 0x00;
        this.e = 0xD8;
        this.h = 0x01;
        this.l = 0x4D;
        this.sp = 0xFFFE;
        this.pc = 0x0100;
        this.carry = true;
        this.zero = true;
        this.subtraction = false;
        this.halfcarry = true;
    }

    //la cpu es capaz de escribir y leer 16 bits aunque sus registros son de 8 bits
    //asi que guardamos los 16 bits en una combinacion de registros
    getBC(){
        return ((this.b << 8) | this.c); //retornamos los registros como una variable de 16 bits
    }
    setBC(value){
        this.b = (value >> 8); //guardamos los 8 bits mas significativos
        this.c = (value & 0x00FF); //guardamos los 8 bits menos significativos
    }
    getAF(){
        return ((this.a << 8) | ((this.zero) ? 0x80 : 0) | ((this.subtraction) ? 0x40 : 0) | ((this.halfcarry) ? 0x20 : 0) | ((this.carry) ? 0x10 : 0)); //retornamos los registros como una variable de 16 bits
    }
    setAF(value){
        this.a = (value >> 8); //guardamos los 8 bits mas significativos
        let val = value & 0x00FF; //guardamos los 8 bits menos significativos
        this.zero = (val > 0x7F); //guardamos el bit 7
        this.subtraction = ((val & 0x40) == 0x40); //guardamos el bit 6
        this.halfcarry = ((val & 0x20) == 0x20); //guardamos el bit 5
        this.carry = ((val & 0x10) == 0x10); //guardamos el bit 4
    }
    getDE(){
        return ((this.d << 8) | this.e); //retornamos los registros como una variable de 16 bits
    }
    setDE(value){
        this.d = (value >> 8); //guardamos los 8 bits mas significativos
        this.e = (value & 0x00FF); //guardamos los 8 bits menos significativos
    }
    getHL(){
        return ((this.h << 8) | this.l); //retornamos los registros como una variable de 16 bits
    }
    setHL(value){
        this.h = (value >> 8); //guardamos los 8 bits mas significativos
        this.l = (value & 0x00FF); //guardamos los 8 bits menos significativos
    }
    stackPush8(value, bus){
        this.sp = (this.sp - 1) & 0xFFFF;
        //this.stack.push(value) 
        bus.write(this.sp, value);
    }
    stackPop8(bus){
        if(this.sp >= 0xFFFF){
            throw new Error("Stack overflow");
        }
        //this.stack.pop();
        var value = bus.read(this.sp);
        this.sp = (this.sp + 1) & 0xFFFF;
        return (value & 0xFF);
    }
    stackPush16(value, bus){
        this.stackPush8(((value >> 8) & 0xFF), bus);
        this.stackPush8((value & 0xFF), bus);
    }
    stackPop16(bus){
        var value = this.stackPop8(bus);
        value = (value | (this.stackPop8(bus) << 8));
        return (value & 0xFFFF);
    }
}
