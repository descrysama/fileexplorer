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

const loadingFunction = (newPath : string | boolean) => {
    (<any>window).loadFile.findFolders(newPath == false ? null : newPath).then((data :any) => {
        let root = document.getElementById('root');
        pathInput.value = newPath ? newPath : data.rootDir
        if(document.getElementById('card-content')) {
            document.getElementById('card-content').remove()
        }
        root.appendChild(createCards(data))
        let cards = document.getElementsByClassName('card')    
        Array.from(cards).forEach(function(element) {
            element.addEventListener('click', (event) => {
                if((<any>event).path[0].id == 'directory') {
                    pathInput.value = pathInput.value+"\\"+(<any>event).path[1].innerText
                    loadingFunction(pathInput.value)
                } else {
                    (<any>window).loadFile.openFile(pathInput.value+"\\"+(<any>event).path[1].innerText)
                }
            })
        })
    })
}

backwardButton.addEventListener('click', () => {
    let splittedPath = pathInput.value.split("\\");
    console.log(pathInput.value)
    let newPath = '';
    for (let i = 0; i < splittedPath.length - 1; i++) {
        if(i > 0) {
            newPath = newPath+'\\'+splittedPath[i]
        }
    }
    console.log(newPath)
    loadingFunction(newPath)
})

loadingFunction(false)

