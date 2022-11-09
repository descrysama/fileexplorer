// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('loadFile', {
    findFolders: (rootdir : any) => ipcRenderer.invoke('load-files', rootdir),
    openFile: (path: string) => ipcRenderer.invoke('open-file', path),
    createFolder: (name: string) => ipcRenderer.invoke('create-folder', name) 
})