var menubar = require('menubar')

var mb = menubar()

if (process.platform === 'win32') {
  mb.setOption('windowPosition', 'winStartMenu')
}

mb.on('ready', function ready () {
  console.log('app is ready')
})
