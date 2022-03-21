const { app } = require('electron')
const path = require('path')
module.exports = path.resolve(app.getPath('appData'), 'DeskHudO', 'Shortcuts')
