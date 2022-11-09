import fs from 'fs'
import { aFile } from './class/aFile';

export const fileInstance = (path: string, name: string) => {
        let document = fs.statSync(path + "\\" + name );
        console.log(path + "\\" + name )
        let isFile = document.isFile()
        let type = isFile ? 'file' : 'directory'
        return new aFile(name, type)
}