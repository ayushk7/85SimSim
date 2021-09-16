import { Memory } from "./Memory.js";
import { Processor } from "./Processor.js";
// import {Assembler} from "./"
const ram = new Memory(64 * 1e3, {start: 0, end: 6000});
const processor = new Processor(ram);
// const assembler = new Assembler();
// let object_code = assembler.coverter()
// ram.write(0x0B60, 0xFF);
let code_string = '';
let code = [
    {
        start_address: 0x0010,
        opcodes: [0x3E, 0x05, 0x06, 0x08, 0xCD, 0x60, 0x0B, 0x76],
    },
    {
        start_address: 0x0B60,
        opcodes: [0x80, 0xC9],
    }
];
// ram.write('3001', )
// ram.write('B62', '01');
// let start_address = 0x0B88;
for(let i=0; i<code.length; i++){
    const start_address = code[i].start_address;
    for(let j=0; j < code[i].opcodes.length; j++){
        ram.write(start_address + j, code[i].opcodes[j]);
    }
}
// for(let i=0; i<code.length; i++){
//     const address = (parseInt(start_address, 16) + i).toString(16);
//     console.log(ram.read(address));
// }
processor.executor(code[0].start_address, {reg_db: true, flag_db: true});


