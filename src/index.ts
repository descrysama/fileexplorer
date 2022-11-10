import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
const open = require('open');
const rootDir = require('path').resolve('/users/');
import process from 'process'
import { fileInstance } from './usableFunction';
const { session } = require('electron')


// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 1200,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.setMenu(null)
  // Open the DevTools.
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': '*'
      }
    })
  })
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("load-files", (err, newRootDir) => {
  const readFile = async() => {
      let data = fs.readdirSync(newRootDir ? newRootDir : rootDir)
      let array = [];
      for (const file of data) {
        array.push(fileInstance(newRootDir ? newRootDir : rootDir, file))
      }
      let returnValue = {array, rootDir: newRootDir ? newRootDir : rootDir, status: array.length > 0 ? true : false}
      return returnValue;
  }
  return readFile()
})

ipcMain.handle("open-file", (err, path) => {
  open(path)
})

ipcMain.handle("create-folder", (err, path) => {
  fs.mkdirSync(path)
})

ipcMain.handle("create-file", (err, path) => {
  fs.writeFileSync(path, '')
})

ipcMain.handle("delete", (err, path) => {
  fs.rmSync(path, { recursive: true })
})