import fs from 'fs'
import Path from 'path';
import { aFile } from './class/aFile';

export const fileInstance = (path: string, name: string) => {
        let document = fs.statSync(path + "\\" + name );
        let isFile = document.isFile()
        let type = isFile ? 'file' : 'directory'
        let ext = Path.extname(name);
        return new aFile(name, type, ext)
}