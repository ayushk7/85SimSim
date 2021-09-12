import { HEX, DEC } from "./util/util.js";

export class Processor {
    constructor(memory) {
        this.memory = memory;
        this.resetRegisters();
        this.resetFlags();
        this.reset();
    }

    reset() {
        this.resetStack();
        this.memory.refresh();
        this.resetRegisters();
        this.resetFlags();
    }
    resetRegisters() {
        this.reg = {
            'A': '00',
            'B': '00',
            'C': '00',
            'D': '00',
            'E': '00',
            'H': '00',
            'L': '00',
            'pc': (this.memory.start).toString(16),
            'sp': (this.memory.end - 1).toString(16),
        };
    }
    resetFlags() {
        this.flags = {
            'flagCY': 0,
            'flagPARITY': 0,
            'flagAC': 0,
            'flagZERO': 0,
            'flagSIGN': 0,
        };

    }
    resetStack() {
        this.stack = [];
        this.reg['sp'] = (parseInt(this.memory.end, 16) - 1).toString(16);
    }
    incPC() {
        // console.log(this.reg['pc']);
        this.reg['pc'] = (parseInt(this.reg['pc'], 16) + 1).toString(16);
    }
    getRegisterStates() {
        return this.reg;
    }
    getFagStates() {
        return this.flags;
    }

    execute() {
        // const code = this.reg['pc'].toUpperCase();
        // console.log(this.reg['pc']);
        switch (this.memory.read(this.reg['pc'])) {
            // MOV A, reg and MOV A, M
            case "7F": this.moveRegfromReg('A', 'A');
                break;
            case "78": this.moveRegfromReg('A', 'B');
                break;
            case "79": this.moveRegfromReg('A', 'C');
                break;
            case "7A": this.moveRegfromReg('A', 'D');
                break;
            case "7B": this.moveRegfromReg('A', 'E');
                break;
            case "7C": this.moveRegfromReg('A', 'H');
                break;
            case "7D": this.moveRegfromReg('A', 'L');
                break;
            case "7E": this.moveRegfromM('A');
                break;
            // MOV B, reg and MOV B, M
            case "47": this.moveRegfromReg('B', 'A');
                break;
            case "40": this.moveRegfromReg('B', 'B');
                break;
            case "41": this.moveRegfromReg('B', 'C');
                break;
            case "42": this.moveRegfromReg('B', 'D');
                break;
            case "43": this.moveRegfromReg('B', 'E');
                break;
            case "44": this.moveRegfromReg('B', 'H');
                break;
            case "45": this.moveRegfromReg('B', 'L');
                break;
            case "46": this.moveRegfromM('B');
                break;
            // MOV C, reg and MOV C, M
            case "4F": this.moveRegfromReg('C', 'A');
                break;
            case "48": this.moveRegfromReg('C', 'B');
                break;
            case "49": this.moveRegfromReg('C', 'C');
                break;
            case "4A": this.moveRegfromReg('C', 'D');
                break;
            case "4B": this.moveRegfromReg('C', 'E');
                break;
            case "4C": this.moveRegfromReg('C', 'H');
                break;
            case "4D": this.moveRegfromReg('C', 'L');
                break;
            case "4E": this.moveRegfromM('C');
                break;
            // MOV D, reg and MOV D, M
            case "57": this.moveRegfromReg('D', 'A');
                break;
            case "50": this.moveRegfromReg('D', 'B');
                break;
            case "51": this.moveRegfromReg('D', 'C');
                break;
            case "52": this.moveRegfromReg('D', 'D');
                break;
            case "53": this.moveRegfromReg('D', 'E');
                break;
            case "54": this.moveRegfromReg('D', 'H');
                break;
            case "55": this.moveRegfromReg('D', 'L');
                break;
            case "56": this.moveRegfromM('D');
                break;
            // MOV E, reg and MOV E, M
            case "5F": this.moveRegfromReg('E', 'A');
                break;
            case "58": this.moveRegfromReg('E', 'B');
                break;
            case "59": this.moveRegfromReg('E', 'C');
                break;
            case "5A": this.moveRegfromReg('E', 'D');
                break;
            case "5B": this.moveRegfromReg('E', 'E');
                break;
            case "5C": this.moveRegfromReg('E', 'H');
                break;
            case "5D": this.moveRegfromReg('E', 'L');
                break;
            case "5E": this.moveRegfromM('E');
                break;
            // MOV H, reg and MOV H, M
            case "67": this.moveRegfromReg('H', 'A');
                break;
            case "60": this.moveRegfromReg('H', 'B');
                break;
            case "61": this.moveRegfromReg('H', 'C');
                break;
            case "62": this.moveRegfromReg('H', 'D');
                break;
            case "63": this.moveRegfromReg('H', 'E');
                break;
            case "64": this.moveRegfromReg('H', 'H');
                break;
            case "65": this.moveRegfromReg('H', 'L');
                break;
            case "66": this.moveRegfromM('H');
                break;
            // MOV L, reg and MOV L, M
            case "6F": this.moveRegfromReg('L', 'A');
                break;
            case "68": this.moveRegfromReg('L', 'B');
                break;
            case "69": this.moveRegfromReg('L', 'C');
                break;
            case "6A": this.moveRegfromReg('L', 'D');
                break;
            case "6B": this.moveRegfromReg('L', 'E');
                break;
            case "6C": this.moveRegfromReg('L', 'H');
                break;
            case "6D": this.moveRegfromReg('L', 'L');
                break;
            case "6E": this.moveRegfromM('L');
                break;
            //MOV M, reg
            case "77": this.moveMfromReg('A');
                break;
            case "70": this.moveMfromReg('B');
                break;
            case "71": this.moveMfromReg('C');
                break;
            case "72": this.moveMfromReg('D');
                break;
            case "73": this.moveMfromReg('E');
                break;
            case "74": this.moveMfromReg('H');
                break;
            case "75": this.moveMfromReg('L');
                break;
            //MVI INSTRUCTIONS
            case "3E": this.moveImmediate('A');
                break;
            case "06": this.moveImmediate('B');
                break;
            case "0E": this.moveImmediate('C');
                break;
            case "16": this.moveImmediate('D');
                break;
            case "1E": this.moveImmediate('E');
                break;
            case "26": this.moveImmediate('H');
                break;
            case "2E": this.moveImmediate('L');
                break;
            case "36": this.moveImmediate('M');
                break;
            case "3A": this.lda();
                break;
            case "0A": this.ldax('B');
                break;
            case "1A": this.ldax('D');
                break;
            case "2A": this.lhld();
                break;
            case "01": this.lxi('B');
                break;
            case "11": this.lxi('D');
                break;
            case "21": this.lxi('H');
                break;
            case "31": this.lxi('sp');
                break;
            case "32": this.sta();
                break;
            case "02": this.stax('B');
                break;
            case "12": this.stax('D');
                break;
            case "22": this.shld();
                break;
            case "EB": this.xchg();
                break;


            case "CE": this.aci();
                break;
            case "8F": this.adc('A');
                break;
            case "88": this.adc('B');
                break;
            case "89": this.adc('C');
                break;
            case "8A": this.adc('D');
                break;
            case "8B": this.adc('E');
                break;
            case "8C": this.adc('H');
                break;
            case "8D": this.adc('L');
                break;
            case "8E": this.adc('M');
                break;
            case "87": this.add('A');
                break;
            case "80": this.add('B');
                break;
            case "81": this.add('C');
                break;
            case "82": this.add('D');
                break;
            case "83": this.add('E');
                break;
            case "84": this.add('H');
                break;
            case "85": this.add('L');
                break;
            case "86": this.add('M');
                break;
            case "C6": this.adi();
                break;

            //STOP
            case "76": return "STOP";
                break;
            //
            case "DE": this.sbi();
                break;
            case "9F": this.sbb('A');
                break;
            case "98": this.sbb('B');
                break;
            case "99": this.sbb('C');
                break;
            case "9A": this.sbb('D');
                break;
            case "9B": this.sbb('E');
                break;
            case "9C": this.sbb('H');
                break;
            case "9D": this.sbb('L');
                break;
            case "9E": this.sbb('M');
                break;
            case "97": this.sub('A');
                break;
            case "90": this.sub('B');
                break;
            case "91": this.sub('C');
                break;
            case "92": this.sub('D');
                break;
            case "93": this.sub('E');
                break;
            case "94": this.sub('H');
                break;
            case "95": this.sub('L');
                break;
            case "96": this.sub('M');
                break;
            case "D6": this.sui();
                break;


        }
    }
    executor(start_address_hex, debug) {
        // let count = 0;
        this.reg['pc'] = start_address_hex;
        while (this.reg['pc'] !== (this.memory.end).toString(16)) {
            if (this.execute() === "STOP") return;
            // count++;
            // console.log(this.reg['pc']);
            if (debug.reg_db) {
                console.table(this.reg);
            }
            if (debug.flag_db) {
                console.table(this.flags);
            }
        }
    }
    setFlags(...rest) {
        this.resetFlags();
        for (let e of rest) {
            this.flags[e] = 1;
        }
    }
    getPairData(reg1, reg2) {
        return this.reg[reg1] + this.reg[reg2];
    }
    moveRegfromReg(reg1, reg2) {
        this.incPC();
        this.reg[reg1] = this.reg[reg2];
    }
    moveRegfromM(reg1) {
        this.incPC();
        this.reg[reg1] = this.memory.read(this.getPairData('H', 'L'));
    }
    moveMfromReg(reg1) {
        this.incPC();
        this.memory.write(this.getPairData('H', 'L'), this.reg[reg1]);
    }
    moveImmediate(reg1) {
        this.incPC();
        if (reg1 != 'M') {
            this.reg[reg1] = this.memory.read(this.reg['pc']);
        }
        else {
            this.memory.write(this.getPairData('H', 'L'), this.memory.read(this.reg['pc']));
        }
        this.incPC();
    }
    check_ac_sum(...val_hex) {
        let tmp = 15;
        let s = 0;
        // let val1 = parseInt(val_hex_1, 16) & tmp;
        for (let e of val_hex) {
            s += (DEC(e) & tmp);
        }
        // let val2 = parseInt(val_hex_2, 16) & tmp; 
        this.flags['flagAC'] = (s >= 16) ? 1 : 0;
    }
    check_sign(val_hex) {
        let val = DEC(val_hex);
        this.flags['flagSIGN'] = ((val >> 7) & 1) ? 1 : 0;
    }
    check_zero(val_hex) {
        let val = DEC(val_hex);
        this.flags['flagZERO'] = (val === 0) ? 1 : 0;
    }
    check_carry_sum(...val_hex) {
        let s = 0;
        for (let e of val_hex) {
            s += DEC(e);
        }
        this.flags['flagCY'] = (s >= 256) ? 1 : 0;
    }
    check_parity(val_hex) {
        let val_array = val_hex.split('');
        let count = 0;
        // console.log(val_array, val_hex);
        for (let e of val_array) {
            let val = DEC(e);
            for (let i = 0; i < 4; i++) {
                if ((val >> i) & 1) {
                    count++;
                }
            }
            // console.log(count);
        }
        this.flags['flagPARITY'] = (count % 2 === 0) ? 1 : 0;
    }
    aci() {
        this.incPC();
        let a_content = DEC(this.reg['A']);
        let other = DEC(this.memory.read(this.reg['pc']));
        this.resetFlags();
        this.check_ac_sum(this.reg['A'], HEX(other), HEX(this.flags['flagCY']));
        this.check_carry_sum(this.reg['A'], HEX(other), HEX(this.flags['flagCY']));
        a_content += other + this.flags['flagCY'];
        a_content = a_content % 256;
        this.reg['A'] = HEX(a_content);
        this.check_sign(this.reg['A']);
        this.check_zero(this.reg['A']);
        this.check_parity(this.reg['A']);
        this.incPC();
    }
    adi() {
        this.incPC();
        let a_content = DEC(this.reg['A']);
        let other = DEC(this.memory.read(this.reg['pc']));
        this.resetFlags();
        this.check_ac_sum(this.reg['A'], HEX(other));
        this.check_carry_sum(this.reg['A'], HEX(other));
        a_content += other;
        a_content = a_content % 256;
        this.reg['A'] = HEX(a_content);
        this.check_sign(this.reg['A']);
        this.check_zero(this.reg['A']);
        this.check_parity(this.reg['A']);
        this.incPC();
    }
    adc(reg2) {
        this.incPC();
        let a_content = DEC(this.reg['A']);
        let other = (reg2 !== 'M') ? DEC(this.reg[reg2]) : DEC(this.memory.read(this.getPairData('H', 'L')));
        this.resetFlags();
        this.check_ac_sum(this.reg['A'], HEX(other), HEX(this.flags['flagCY']));
        this.check_carry_sum(this.reg['A'], HEX(other), HEX(this.flags['flagCY']));
        a_content += other + this.flags['flagCY'];
        a_content = a_content % 256;
        this.reg['A'] = HEX(a_content);
        this.check_sign(this.reg['A']);
        this.check_zero(this.reg['A']);
        this.check_parity(this.reg['A']);
    }
    add(reg2) {
        this.incPC();
        let a_content = parseInt(this.reg['A'], 16);
        let other = (reg2 !== 'M') ? DEC(this.reg[reg2]) : DEC(this.memory.read(this.getPairData('H', 'L')));
        this.resetFlags();
        this.check_ac_sum(this.reg['A'], HEX(other));
        this.check_carry_sum(this.reg['A'], HEX(other));
        a_content += other;
        a_content = a_content % 256;
        this.reg['A'] = HEX(a_content);
        this.check_sign(this.reg['A']);
        this.check_zero(this.reg['A']);
        this.check_parity(this.reg['A']);
    }
}