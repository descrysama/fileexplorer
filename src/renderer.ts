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
let addFile = document.getElementById('addFile')

const createContext = (event: any) => {
    const div = document.createElement('div');
    div.style.top = (<any>event).clientY + "px"
    div.style.left = (<any>event).clientX + "px"
    div.id = "contextMenu"
    window.addEventListener('click', function removeRightClick() {
        div.remove()
        window.removeEventListener('click', removeRightClick)
        window.removeEventListener('contextmenu', removeRightClick)
    })
    const ul = document.createElement('ul');
    ul.style.listStyleType = "none"
    const options = ['Delete', 'Rename']
    for (const option of options) {
        const li = document.createElement('li')
        li.textContent = option
        li.addEventListener('click', () => {
            if(option == "Delete") {
                (<any>window).loadFile.delete(pathInput.value + '\\' + event.path[1].outerText)
                loadingFunction(pathInput.value)
            } 
            //else if (option == "Rename") {
            //     (<any>window).loadFile.rename()
            // }
        })
        ul.appendChild(li)
    }
    div.appendChild(ul)
    document.getElementById('root').appendChild(div)
}

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
    if((<any>event).path[0].id == 'file') {
        (<any>window).loadFile.openFile(pathInput.value+"\\"+(<any>event).path[1].innerText)
    } else {
        pathInput.value = pathInput.value+"\\"+(<any>event).path[1].innerText
        loadingFunction(pathInput.value)
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

const createFileFunction = () => {

    addFile.style.display = "flex"
    Array.from(cards).forEach(function(element) {
        element.removeEventListener('click', (event) => cardEventFunction(event))
    })
    if(document.getElementById('createFile')) {
        document.getElementById('createFile').removeEventListener('click', createFileFunction)
    }
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
            if(document.getElementById('createFile')){
                document.getElementById('createFile').remove()
            }
            let card = document.createElement('div')
            card.id ='createFile'
            let img = document.createElement('img')
            card.appendChild(img)
            root.appendChild(card)
            root.appendChild(createCards(data))
            if(document.getElementById('createFile')) {
                document.getElementById('createFile').addEventListener('click', createFileFunction)
            }
        }  
        Array.from(cards).forEach(function(element) {
            element.addEventListener('click', (event) => cardEventFunction(event))
            element.addEventListener('contextmenu', (event) => {
                if(document.getElementById('contextMenu')) {
                    document.getElementById('contextMenu').remove()
                    createContext(event)
                } else {
                    createContext(event)
                }
            })
        })
    })
}

backwardButton.addEventListener('click', backwardFunction)

createFolder.addEventListener('click', createFolderFunction)

window.addEventListener('click', (event) => {
   if((<any>event).path[0].id != 'createFolder' && (<any>event).path[0].id != 'createFolderSubmit' && (<any>event).path[0].id != 'createFolderInput' &&
   (<any>event).path[1].id != 'createFile' && (<any>event).path[0].id != 'createFileSubmit' && (<any>event).path[0].id != 'createFileInput') {
    modalDialog.style.display = "none"
    addFile.style.display = "none"
   }
   backwardButton.addEventListener('click', backwardFunction)
    createFolder.addEventListener('click', createFolderFunction)
    if(document.getElementById('createFile')) {
        document.getElementById('createFile').addEventListener('click', createFileFunction)
    }
    Array.from(cards).forEach(function(element) {
        element.addEventListener('click', (event) => cardEventFunction(event));
    })
})

document.getElementById('createFolderSubmit').addEventListener('click', () => {
    (<any>window).loadFile.createFolder(pathInput.value+"\\"+(<HTMLInputElement>document.getElementById('createFolderInput')).value)
    modalDialog.style.display = "none"
    loadingFunction(pathInput.value)
})

document.getElementById('createFileSubmit').addEventListener('click', () => {
    (<any>window).loadFile.createFile(pathInput.value+"\\"+(<HTMLInputElement>document.getElementById('createFileInput')).value)
    addFile.style.display = "none"
    loadingFunction(pathInput.value)
})

loadingFunction(false)

