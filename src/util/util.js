function HEX(val_dec) {
    let tmp = val_dec.toString(16);
    // console.log(tmp);
    if(tmp.length === 1){
        tmp = '0' + tmp;
    }
    return tmp.toUpperCase();
}
function DEC(val_hex) {
    return parseInt(val_hex, 16);
}
function TwoComp8Bit(val){
    return (((val&0xFF)^0xFF)+1)&0xFF;
}
// console.log(TwoComp(2));

function HexToBin(val_hex){
    let ans = 0;
    val_hex = HEX(DEC(val_hex));
    ans = DEC(val_hex[0]);
    ans = ans << 4;
    ans = ans | DEC(val_hex[1]);
    return ans;
}

// let tt = "ayush";

export {HEX, DEC, TwoComp8Bit, HexToBin}