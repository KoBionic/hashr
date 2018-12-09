import { app, BrowserWindow, Menu, screen } from 'electron';
import path from 'path';
import url from 'url';

let mainWindow: Electron.BrowserWindow;
const WINDOW_HEIGHT = 650;
const WINDOW_WIDTH = 700;

function createWindow() {
    const bounds = screen.getPrimaryDisplay().bounds;
    const x = Math.ceil(bounds.x + ((bounds.width - WINDOW_WIDTH) / 2));
    const y = Math.ceil(bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2));

    mainWindow = new BrowserWindow({
        autoHideMenuBar: true,
        frame: true,
        height: WINDOW_HEIGHT,
        icon: path.join(__dirname, 'icon.png'),
        maximizable: false,
        resizable: false,
        transparent: false,
        useContentSize: true,
        width: WINDOW_WIDTH,
        x: x,
        y: y,
    });

    let isMainWindow = true;
    mainWindow.webContents.on('devtools-opened', () => {
        if (isMainWindow) {
            mainWindow.webContents.closeDevTools();
            mainWindow.webContents.openDevTools({
                mode: 'detach',
            });
            isMainWindow = false;
        } else {
            isMainWindow = true;
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    mainWindow.on('closed', () => {
        mainWindow = undefined;
    });

    if (process.platform === 'darwin') {
        // Create our menu entries so that we can use MAC shortcuts
        Menu.setApplicationMenu(Menu.buildFromTemplate([
            {
                label: 'Edit',
                submenu: [
                    { role: 'undo' },
                    { role: 'redo' },
                    { type: 'separator' },
                    { role: 'cut' },
                    { role: 'copy' },
                    { role: 'paste' },
                    { role: 'pasteandmatchstyle' },
                    { role: 'delete' },
                    { role: 'selectall' }
                ]
            }
        ]));
    }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === undefined) {
        createWindow();
    }
});
