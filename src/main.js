import { Memory } from "./Memory.js";
import { Processor } from "./Processor.js";
// import {Assembler} from "./"
const ram = new Memory(64 * 1e3, {start: 0, end: 6000});
const processor = new Processor(ram);
// const assembler = new Assembler();
// let object_code = assembler.coverter()
let code_string = '3E FF C6 01 06 23 88 76 06 23 80 CE 04 76 7E 80 76';
let code = code_string.split(' ');
// ram.write('3001', )
ram.write('B60', 'FF');
ram.write('B62', '01');
let start_address = 'B88';
for(let i=0; i<code.length; i++){
    const address = (parseInt(start_address, 16) + i).toString(16);
    // console.log(address);
    ram.write(address, code[i]);
}
// for(let i=0; i<code.length; i++){
//     const address = (parseInt(start_address, 16) + i).toString(16);
//     console.log(ram.read(address));
// }
processor.executor(start_address, {reg_db: true, flag_db: true});


