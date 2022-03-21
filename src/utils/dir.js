const fs = require('fs-extra')

/**
 * ensures the directory exists
 * @param {string} dirpath the target dirpath
 * @param {() => void} additional the additional code to run after creating new
 */
exports.ensure = (dirpath, additional) => {
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true })
    additional?.()
  }
}