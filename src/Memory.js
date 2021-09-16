import {HEX} from '../src/util/util.js'
class MemoryLocation{
    constructor(loc, data){
        this.location = loc;
        this.data = data;
        this.written = false;
    }
    reset(){
        this.data = 0x00;
        this.written = false;
    }
    set(data){
        this.data = data;
        this.written = true;
    }
    get(){
        return this.data;
    }
}


export class Memory{
    constructor(size_bytes, operating_range){
        this.memory_size = Math.min(size_bytes, 64 * 1e3);
        this.start = Math.max(0, operating_range.start);
        this.end = Math.min(operating_range.end, 64 * 1e3);
        this.refresh();
        // this.program_counter = null;
        // this.stack_pointer = this.end;
    }
    __isInRange(loc){
        return loc >= this.start && loc < this.end;
    }
    refresh(){
        this.memory_locations = [];
        for(let i=0; i<this.memory_size; i++){
            this.memory_locations.push(new MemoryLocation(i, 0x00));
        }
    }
    write(loc, data){
        if(this.__isInRange(loc)){
            this.memory_locations[loc].set(data);
            return true;
        }
        else{
            console.error(`Unauthorized Memory Access At Location ${HEX(loc)}`);
            return false;
        }
    }
    isWritten(loc){
        return this.memory_locations[loc].written;
    }
    
    read(loc){
        // console.log(loc_hex);
        if(this.__isInRange(loc)){
            return this.memory_locations[loc].get();
        }
        else{
            console.error(`Unauthorized Memory Access At Location ${HEX(loc)}`);
            return null;
        }
    }
    resetLocation(loc){
        this.memory_locations[loc].reset();
    }

}