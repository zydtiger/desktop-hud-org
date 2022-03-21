const { ipcMain, shell, nativeImage } = require('electron');
const path = require('path')
const shortcuts = require('./shortcuts')
const storepath = require('../utils/storepath');
const category = require('./category')

ipcMain.on('move', async (e, cate, filepath) => {
  console.log('[MOVE]', filepath, cate)
  await shortcuts.add(cate, filepath)
  e.sender.send('update-shortcuts')
})

ipcMain.on('open', (_, cate, filename) => {
  console.log('[OPEN]', cate, filename)
  let filepath = path.resolve(storepath, cate, filename)
  shell.openPath(filepath)
})

ipcMain.handle('get-categories', () => {
  let entries = category.getAll()
  console.log('[GET-CATEGORIES]', entries)
  return entries
})

ipcMain.on('add-category', (e) => {
  console.log('[ADD-CATEGORY]')
  category.add()
  e.sender.send('update-categories')
})

ipcMain.on('del-category', (e, cate) => {
  console.log('[DEL-CATEGORY]', cate)
  category.remove(cate)
  e.sender.send('update-categories')
})

ipcMain.on('chg-name', (e, ocate, ncate) => {
  console.log('[RENAME]', ocate, ncate)
  category.rename(ocate, ncate)
  e.sender.send('update-categories')
})

ipcMain.handle('get-shortcuts', async (_, cate) => {
  console.log('[GET-SHORTCUTS]', cate)
  return shortcuts.getAll(cate)
})

ipcMain.on('start-drag', (e, cate, file, icon) => {
  console.log('[START-DRAG]', cate, file)
  let filepath = path.resolve(storepath, cate, file)
  try {
    e.sender.startDrag({
      file: filepath,
      icon: nativeImage.createFromBuffer(Buffer.from(icon, 'base64'))
    })
  } catch (err) {
    // do nothing
    console.error(err)
  }
})

ipcMain.on('del-active', (e, active) => {
  console.log('[DEL]', active)
  shortcuts.remove(active[0], active[1])
  e.sender.send('update-shortcuts')
})
