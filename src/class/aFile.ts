import fs from 'fs'

export class aFile {
    name: string;
    type: string;
    ext: string;

    constructor(name: string, type: string, ext: string) {
        this.name = name;
        this.type = type;
        this.ext = ext;
    }

}