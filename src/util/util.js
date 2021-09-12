function HEX(val_dec) {
    return val_dec.toString(16);
}
function DEC(val_hex) {
    return parseInt(val_hex, 16);
}
export {HEX, DEC}