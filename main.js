const electron = require('electron')
const path = require('path')
const url = require('url')
const mobileNav = require('./script/mobileNav');
const {app, Menu, Tray, remote} = require('electron')
const os = require('os');
var Bricklayer = require("bricklayer");

const BrowserWindow = electron.BrowserWindow;

// enables Chrome-Developertools and ability to resize and move the main window
const withDeveloperTools = false;

//=================== Create Window ============================================

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let tray

app.on('ready', main)

function main () {
  // Mac Version as an Taskbar-App
  if(os.platform() == 'darwin') {
    tray = new Tray(path.join(__dirname, 'media', 'toolbar_icon.png'));
    tray.setToolTip('Find the perfect fitting GIF from Giphy and Copy it.');
    mainWindow = null;
    tray.on('click', () => {
      if(mainWindow === null) {
        mainWindow = openForMac();
      } else {
        hideWindow()
      }
    })
  }
  else if (os.platform() == 'win32') {
    openForWindows();
  }

  if (os.platform() == 'darwin'){
    app.dock.hide()
  }
}

function showWindow() {

}

// Create a for Mac-Taskbar optimized window
function openForMac() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  if(withDeveloperTools){
    var windowWidth = width;
    var windowHeight = height;
    var windowX = 0;
    var shouldResize = true;
  } else {
    var windowWidth = (width * 0.4);
    var windowHeight = (height * 0.7);
    var windowX = width - windowWidth;
    var shouldResize = false;
  }
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    frame: false,
    resizable: shouldResize,
    alwaysOnTop: true,
  })
  if(withDeveloperTools){
    mainWindow.webContents.openDevTools()
  }
  mainWindow.scrollBounce = true
  tray.setHighlightMode('always');
  var mainDirectory = __dirname ;
  mainWindow.loadURL("file://"+ mainDirectory +"/index.html");
  mainWindow.on('blur', () => {hideWindow()} );
  return mainWindow;
}

function openForWindows() {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  if(withDeveloperTools){
    var windowWidth = width;
    var windowHeight = height;
    var windowX = 0;
    var shouldResize = true;
  } else {
    var windowWidth = width * 0.3;
    var windowHeight = height * 0.7;
    var windowX = width - windowWidth;
    var shouldResize = false;
  }
  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    frame: true,
    x:windowX,
    y:0,
    resizable: shouldResize,
    alwaysOnTop: false,
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

function hideWindow() {
  mainWindow.hide();
  mainWindow = null;
  tray.setHighlightMode('never');
}

function initializeWindow() {
  console.log(mobileNav);
  mobileNav.initializeNavigation();
  mobileNav.addNavOpenEventListener();
  hideMenuIfNecessary();
}
