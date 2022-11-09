/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import path from 'path';
import './index.css';
import { createCards } from './saloperiedeDom'
let pathInput = (<HTMLInputElement>document.getElementById('pathInput'))
let backwardButton = document.getElementById('backward')
let cards = document.getElementsByClassName('card')  
let createFolder = document.getElementById('createFolder')
let modalDialog = document.getElementById('modalDialog')


const backwardFunction = () => {
    let splittedPath = pathInput.value.split("\\");
    let newPath = '';
    for (let i = 0; i < splittedPath.length - 1; i++) {
        if(i > 0) {
            newPath = newPath+'\\'+splittedPath[i]
        }
    }
    loadingFunction(newPath)
}

const cardEventFunction = (event : any) => {
    if((<any>event).path[0].id == 'directory') {
        pathInput.value = pathInput.value+"\\"+(<any>event).path[1].innerText
        loadingFunction(pathInput.value)
    } else {
        (<any>window).loadFile.openFile(pathInput.value+"\\"+(<any>event).path[1].innerText)
    }
}

const createFolderFunction = () => {
    modalDialog.style.display = "flex"
    Array.from(cards).forEach(function(element) {
        element.removeEventListener('click', (event) => cardEventFunction(event))
    })
    createFolder.removeEventListener('click', createFolderFunction)
    backwardButton.removeEventListener('click', backwardFunction)

}

const loadingFunction = (newPath : string | boolean) => {
    (<any>window).loadFile.findFolders(newPath == false ? null : newPath).then((data :any) => {
        let root = document.getElementById('root');
        pathInput.value = newPath ? newPath : data.rootDir
        if(document.getElementById('card-content')) {
            document.getElementById('card-content').remove()
        }
        if(data.status) {
            root.appendChild(createCards(data))
        }  
        Array.from(cards).forEach(function(element) {
            element.addEventListener('click', (event) => cardEventFunction(event))
        })
    })
}

backwardButton.addEventListener('click', backwardFunction)

createFolder.addEventListener('click', createFolderFunction)

window.addEventListener('click', (event) => {
   if((<any>event).path[0].id != 'createFolder' && (<any>event).path[0].id != 'createFolderSubmit' && (<any>event).path[0].id != 'createFolderInput') {
    modalDialog.style.display = "none"
   }
   backwardButton.addEventListener('click', backwardFunction)
    createFolder.addEventListener('click', createFolderFunction)
    Array.from(cards).forEach(function(element) {
        element.addEventListener('click', (event) => cardEventFunction(event))
    })
})

document.getElementById('createFolderSubmit').addEventListener('click', () => {
    (<any>window).loadFile.createFolder(pathInput.value+"\\"+(<HTMLInputElement>document.getElementById('createFolderInput')).value)
    modalDialog.style.display = "none"
    loadingFunction(pathInput.value)
})

loadingFunction(false)

