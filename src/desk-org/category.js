const path = require('path')
const fs = require('fs-extra')
const JArray = require('../utils/json_array')
const storepath = require('../utils/storepath');
const dir = require('../utils/dir')

/**
 * gets all the category names
 * @returns string[]
 */
exports.getAll = () => {
  dir.ensure(storepath, () => {
    fs.writeFileSync(path.resolve(storepath, '_data.json'), '[]', 'utf8')
    this.add()
  })
  let entries = JArray.from(path.resolve(storepath, '_data.json'))
  if (entries.length == 0) {
    this.add()
    entries = JArray.from(path.resolve(storepath, '_data.json'))
  }
  return entries
}

/**
 * add a new category, automatically creates new names
 */
exports.add = () => {
  let ncatename = 'New Category'
  for (let i = 1; ; i++) {
    if (fs.existsSync(path.resolve(storepath, ncatename))) ncatename = 'New Category ' + i
    else break
  }

  let ncatepath = path.resolve(storepath, ncatename)
  fs.mkdirSync(ncatepath, { recursive: true })
  fs.writeFileSync(path.resolve(ncatepath, '_data.json'), '[]', 'utf8')
  JArray.push(path.resolve(storepath, '_data.json'), ncatename)
}

/**
 * removes the specified category
 * @param {string} cate 
 */
exports.remove = (cate) => {
  let catepath = path.resolve(storepath, cate)
  if (fs.existsSync(catepath)) fs.rmSync(catepath, { recursive: true, force: true })
  JArray.remove(path.resolve(storepath, '_data.json'), cate)
}

/**
 * renames the $ocate to $ncate
 * @param {string} ocate
 * @param {string} ncate 
 */
exports.rename = (ocate, ncate) => {
  let opath = path.resolve(storepath, ocate);
  let npath = path.resolve(storepath, ncate)
  fs.renameSync(opath, npath)

  let oindex = JArray.indexOf(path.resolve(storepath, '_data.json'), ocate)
  JArray.edit(path.resolve(storepath, '_data.json'), oindex, ncate)
}
