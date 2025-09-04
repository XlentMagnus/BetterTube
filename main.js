const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: "BetterTube",
    icon: path.join(__dirname, 'icon.icns'),
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.loadURL('https://youtube.com/');

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
  });

  mainWindow.on('close', function (event) {
    if (!app.isQuiting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });

  createTray();
}

function createTray() {
  const iconPath = path.join(__dirname, 'icon.icns');
  const trayIcon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
  tray = new Tray(trayIcon);
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Visa BetterTube',
      click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Quit',
      click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  tray.setToolTip('BetterTube');
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
