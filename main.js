const electron =                    require('electron')
const path =                        require('path')
const url =                         require('url')
const mobileNav =                   require('./app/mobileNav');
const {app, Menu, Tray, remote} =   require('electron')
const os =                          require('os');
var   Bricklayer =                  require("bricklayer");

const BrowserWindow =               electron.BrowserWindow;

// enables Chrome-Developertools and ability to resize and move the main window
const withDeveloperTools = false;

//=================== Create Window ============================================

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

app.on('ready', main)

function main () {
  if(os.platform() == 'darwin') {
    openForMac()
    app.dock.hide()
  }
  else if (os.platform() == 'win32') {
    openForWindows();
  }  else if ( os.platform() == "linux" ) {
    openForLinux();
  } else {
    console.error("");
  }
}


function openForMac() {
  tray = new Tray(path.join(__dirname, 'media', 'toolbar_icon.png'));
  tray.setToolTip('Find the perfect fitting GIF from Giphy and Copy it.');
  mainWindow = null;
  tray.on('click', () => {
    if(mainWindow === null) {
      const size = calculateWindowSize();
      mainWindow = new BrowserWindow({
        width:        size.windowWidth,
        height:       size.windowHeight,
        frame:        true,
        x:            size.windowX,
        y:            0,
        resizable:    size.shouldResize,
        alwaysOnTop:  false,
      })
      if(withDeveloperTools){
        mainWindow.webContents.openDevTools()
      }
      mainWindow.scrollBounce = true
      tray.setHighlightMode('always');
      var mainDirectory = __dirname ;
      return mainWindow;
    } else {
      hideWindow()
    }
  })
}

function openForWindows() {
  const size = calculateWindowSize();
  mainWindow = new BrowserWindow({
    width:        size.windowWidth,
    height:       size.windowHeight,
    frame:        true,
    x:            size.windowX,
    y:            0,
    resizable:    size.shouldResize,
    alwaysOnTop:  false,
  })
  if(withDeveloperTools){
    mainWindow.webContents.openDevTools()
  }
  mainWindow.scrollBounce = true
  var mainDirectory = __dirname ;
  mainWindow.loadURL("file://"+ mainDirectory +"/index.html");
  mainWindow.setMenu(null);
  return mainWindow;
}

function openForLinux() {
  const size = calculateWindowSize();
  mainWindow = new BrowserWindow({
    width:        size.windowWidth,
    height:       size.windowHeight,
    frame:        true,
    x:            size.windowX,
    y:            0,
    resizable:    size.shouldResize,
    alwaysOnTop:  false,
  })
  if(withDeveloperTools){
    mainWindow.webContents.openDevTools()
  }
  mainWindow.scrollBounce = true
  var mainDirectory = __dirname ;
  mainWindow.loadURL("file://"+ mainDirectory +"/index.html");
  mainWindow.setMenu(null);
  return mainWindow;
}

/**
 * Gets size of window depending on turned on developer-mode
 */
function calculateWindowSize() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  var size;
  if(withDeveloperTools){
    size = {
      windowWidth : width,
      windowHeight : height,
      windowX : 0,
      shouldResize : true
    }
  } else {
    size = {
      windowWidth : width * 0.3,
      windowHeight : height * 0.7,
      windowX : width - (width * 0.3),
      shouldResize : false
    }
  }
  return size;
}

function hideWindow() {
  mainWindow.hide();
  mainWindow = null;
  try {
    tray.setHighlightMode('never');
  } catch (e) {
    console.warn('tray-icon can not be hidden.');
  }
}

function initializeWindow() {
  console.log(mobileNav);
  mobileNav.initializeNavigation();
  mobileNav.addNavOpenEventListener();
  //hideMenuIfNecessary();
}
