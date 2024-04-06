const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const electronReload = require('electron-reload');

function createWindow() {
    const win = new BrowserWindow({
        width: 1600,
        height: 900,
        webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: true, // Make sure this is set to true
          contextIsolation: false,
        }
    });

    win.loadFile('index.html');

    

    // Enable live reloading
    electronReload(__dirname, {
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
    });

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

