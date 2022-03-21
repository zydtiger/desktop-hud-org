const path = require('path')
const { app, shell, dialog } = require('electron')
const fs = require('fs-extra');
const JArray = require('../utils/json_array')
const storepath = require('../utils/storepath');

/**
 * gets all shortcuts from the specified category
 * @param {string} cate 
 * @returns obj[]
 */
exports.getAll = (cate) => {
  return JArray.from(path.resolve(storepath, cate, "_data.json"))
}

/**
 * appends a new lnk to the specified category
 * @param {string} cate 
 * @param {string} npath 
 */
exports.add = async (cate, npath) => {
  const catepath = path.resolve(storepath, cate)
  const datapath = path.resolve(catepath, '_data.json')
  const filename = path.basename(npath)

  if (npath != path.resolve(catepath, filename)) { // if user is not dropping it back
    if (path.extname(npath) != '.lnk') {
      console.error('[ERR] User dragged a non-lnk file')
      dialog.showMessageBoxSync(null, {
        type: 'warning',
        message: 'This is not a shortcut file!'
      })
      return
    }

    let icon = null
    try {
      icon = (await app.getFileIcon(shell.readShortcutLink(npath).target, { size: "large" })).toPNG().toString('base64')
    } catch (err) {
      console.error('[ERR] Cannot fetch Icon')
      dialog.showMessageBoxSync(null, {
        type: 'warning',
        message: 'Cannot fetch app icon! Maybe corrupted?'
      })
      return
    }

    if (fs.existsSync(path.resolve(catepath, filename))) {
      console.error('[ERR] Filename already exists')
      dialog.showMessageBoxSync(null, {
        type: 'warning',
        message: 'Filename already exists!'
      })
      return
    }

    fs.copySync(npath, path.resolve(catepath, filename))
    JArray.push(datapath, {
      filename,
      icon,
    })

    if (path.resolve(path.dirname(npath), '..') == storepath)
      fs.rmSync(npath)
  }
}

/**
 * removes the $filename from the specified category
 * @param {string} cate 
 * @param {string} filename 
 */
exports.remove = (cate, filename) => {
  const catepath = path.resolve(storepath, cate)
  fs.rmSync(path.resolve(catepath, filename))
  JArray.removeObjectContains(path.resolve(catepath, '_data.json'), filename)
}