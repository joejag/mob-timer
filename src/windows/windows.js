const electron = require('electron')
const windowSnapper = require('./window-snapper')

let timerWindow, configWindow, fullscreenWindow
let snapThreshold

exports.createTimerWindow = () => {
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  timerWindow = new electron.BrowserWindow({
    x: width - 220,
    y: height - 90,
    width: 220,
    height: 90,
    resizable: false,
    alwaysOnTop: false,
    frame: false
  });

  timerWindow.loadURL(`file://${__dirname}/timer/index.html`)
  timerWindow.on('closed', _ => timerWindow = null)

  let getCenter = bounds => {
    return {
      x: bounds.x + (bounds.width / 2),
      y: bounds.y + (bounds.height / 2)
    }
  }

  timerWindow.on('move', e => {
    if (snapThreshold <= 0) {
      return
    }

    let getCenter = bounds => {
      return {
        x: bounds.x + (bounds.width / 2),
        y: bounds.y + (bounds.height / 2)
      }
    }

    let windowBounds = timerWindow.getBounds()
    let screenBounds = electron.screen.getDisplayNearestPoint(getCenter(windowBounds)).workArea

    let snapTo = windowSnapper(windowBounds, screenBounds, snapThreshold)
    if (snapTo.x != windowBounds.x || snapTo.y != windowBounds.y) {
      timerWindow.setPosition(snapTo.x, snapTo.y)
    }
  })
}

exports.showConfigWindow = () => {
  if (configWindow) {
    configWindow.show();
    return;
  }
  exports.createConfigWindow();
}

exports.createConfigWindow = () => {
  configWindow = new electron.BrowserWindow({
    width: 400,
    height: 500,
    autoHideMenuBar: true
  });

  configWindow.loadURL(`file://${__dirname}/config/index.html`)
  configWindow.on('closed', _ => configWindow = null)
}

exports.createFullscreenWindow = () => {
  let {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
  fullscreenWindow = new electron.BrowserWindow({
    width,
    height,
    resizable: false,
    alwaysOnTop: true,
    frame: false
  });

  fullscreenWindow.loadURL(`file://${__dirname}/fullscreen/index.html`)
  fullscreenWindow.on('closed', _ => fullscreenWindow = null)
}

exports.closeFullscreenWindow = () => {
  if (fullscreenWindow) {
    fullscreenWindow.close()
  }
}

exports.dispatchEvent = (event, data) => {
  if (event === 'configUpdated') {
    snapThreshold = data.snapThreshold
  }

  if (timerWindow) {
    timerWindow.webContents.send(event, data)
  }
  if (configWindow) {
    configWindow.webContents.send(event, data)
  }
  if (fullscreenWindow) {
    fullscreenWindow.webContents.send(event, data)
  }
}
