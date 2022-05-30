import {saveAs} from 'file-saver'

export var interrupt_enable_access = false;

export function set_interrupt_access(value){
    interrupt_enable_access = value;
}

export var instructionsSaved = [];

export var startInstructionSaves = false;

export function saveAsATxt(){
    let text = "";
    for(let i = 0; i < instructionsSaved.length; i++){
        text += instructionsSaved[i] + "\n";
    }
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "patatas.txt");
}

export function rangeInstructionsToLog(pc, name){
    if(startInstructionSaves){
        instructionsSaved.push(name + " " + pc.toString(16).toUpperCase());
    }
}

export function startSavingInstructions(value){
    startInstructionSaves = value;
}