const { app, BrowserWindow, ipcMain } = require('electron');
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const electron = require('electron')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const deskOrg = new BrowserWindow({
    fullscreenable: false,
    maximizable: false,
    x: 20,
    y: 50,
    width: 500 + 2 * 2 + 4, // 2 border widths and 1 scroll width
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    transparent: true,
    frame: false
  })
  deskOrg.loadURL(DESK_ORG_WEBPACK_ENTRY);
  require('./desk-org/preload');

  const bounds = electron.screen.getPrimaryDisplay().bounds
  let [width, height] = [300, 150]
  const monitor = new electron.BrowserWindow({
    parent: deskOrg,
    fullscreenable: false,
    maximizable: false,
    x: bounds.width - width - 20,
    y: 50,
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    alwaysOnTop: true,
    transparent: true,
    frame: false,
  });

  monitor.loadURL(MONITOR_WEBPACK_ENTRY);
  require('./monitor/preload')(monitor);
  monitor.hide()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  try {
    await installExtension(VUEJS3_DEVTOOLS)
  } catch (err) {
    console.error('[ERR] Vue3 devtools failed to install')
  }

  createWindow()
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
ipcMain.on('close', () => {
  app.exit()
})