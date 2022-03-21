const osUtils = require('node-os-utils')
const os = require('os')
const { getDiskInfo } = require('node-disk-info')
const { ipcMain } = require('electron')

let stat = false
let ipcReged = false

module.exports = function (win) {
  
  setInterval(() => {
    win.webContents.send('gen', os.hostname().toUpperCase(), os.platform().toUpperCase(), os.arch(), osUtils.cpu.count(), os.uptime())

    osUtils.cpu.usage().then(usage => {
      win.webContents.send('cpu', usage)
    })
    osUtils.mem.info().then(v => win.webContents.send('mem', v.usedMemMb, v.totalMemMb))

    getDiskInfo().then(disks => {
      let tot = disks.map(v => v.blocks).reduce((a, c) => a += c)
      let used = disks.map(v => v.used).reduce((a, c) => a += c)
      win.webContents.send('disk', used, tot)
    })
  }, 1000)

  if (!ipcReged) {
    ipcMain.on('hide-monitor', () => {
      win.hide();
      stat = false;
    })
    ipcMain.on('show-monitor', () => {
      win.show()
      stat = true
    })
    ipcMain.handle('monitor-stat', () => {
      return stat;
    })

    ipcReged = true
  }
}