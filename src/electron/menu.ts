import { app, dialog, Menu } from 'electron';
import Event from '../shared/models/Event';
import TargetFile from '../shared/models/TargetFile';

function getMenu(mainWindow: Electron.BrowserWindow): Electron.Menu {
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [
    {
      label: 'File',
      role: 'fileMenu',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CommandOrControl+O',
          click: async () => {
            try {
              const result = await dialog.showOpenDialog({ properties: ['openFile'] });
              if (!result.canceled && result.filePaths[0]) {
                const file = await TargetFile.from(result.filePaths[0]);
                mainWindow.webContents.send(Event.FILE_OPEN, file);
              }
            } catch (err) {
              console.error(err);
            }
          },
        },
      ],
    },
    {
      label: 'Edit',
      role: 'editMenu',
      submenu: [
        {
          label: 'Undo',
          role: 'undo',
        },
        {
          label: 'Redo',
          role: 'redo',
        },
        { type: 'separator' },
        {
          label: 'Cut',
          role: 'cut',
        },
        {
          label: 'Copy',
          role: 'copy',
        },
        {
          label: 'Paste',
          role: 'paste',
        },
        {
          label: 'Paste and Match Style',
          role: 'pasteAndMatchStyle',
        },
        {
          label: 'Select All',
          role: 'selectAll',
        },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            {
              label: 'Start Speaking',
              role: 'startSpeaking',
            },
            {
              label: 'Stop Speaking',
              role: 'stopSpeaking',
            },
          ],
        },
      ],
    },
    {
      label: 'View',
      role: 'viewMenu',
    },
    {
      label: 'Window',
      role: 'windowMenu',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CommandOrControl+M',
          role: 'minimize',
        },
      ],
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [],
    },
  ];

  if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [
        {
          label: `About ${name}`,
          role: 'about',
        },
        { type: 'separator' },
        {
          label: 'Services',
          role: 'services',
          submenu: [],
        },
        { type: 'separator' },
        {
          label: `Hide ${name}`,
          accelerator: 'Command+H',
          role: 'hide',
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Alt+H',
          role: 'hideOthers',
        },
        {
          label: 'Show All',
          role: 'unhide',
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => app.quit(),
        },
      ],
    });
  }

  return Menu.buildFromTemplate(template);
}

export default getMenu;
