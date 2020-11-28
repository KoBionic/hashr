import { app, BrowserWindow, screen } from 'electron';
import serve from 'electron-serve';
import path from 'path';

const loadURL = serve({ directory: 'build' });

let mainWindow: BrowserWindow | null;
const WINDOW_HEIGHT = 630;
const WINDOW_WIDTH = 700;

function createWindow() {
  try {
    const bounds = screen.getPrimaryDisplay().bounds;
    const x = Math.ceil(bounds.x + (bounds.width - WINDOW_WIDTH) / 2);
    const y = Math.ceil(bounds.y + (bounds.height - WINDOW_HEIGHT) / 2);
    mainWindow = new BrowserWindow({
      autoHideMenuBar: true,
      backgroundColor: '#21252b',
      frame: true,
      height: WINDOW_HEIGHT,
      icon: path.join(__dirname, '../resources/icon.png'),
      maximizable: false,
      resizable: false,
      show: false,
      transparent: false,
      useContentSize: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js'),
      },
      width: WINDOW_WIDTH,
      x: x,
      y: y,
    });

    if (app.isPackaged) {
      loadURL(mainWindow);
    } else {
      mainWindow.loadURL('http://localhost:3000/');
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow
      .once('ready-to-show', () => {
        if (mainWindow) mainWindow.show();
      })
      .on('closed', () => {
        mainWindow = null;
      });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

app
  .on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
  .on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  })
  .whenReady()
  .then(createWindow);
