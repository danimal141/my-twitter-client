import { app, Menu, MenuItem } from 'electron';

export default class AppMenu {
  static setup() {
    const tweetMenu = new MenuItem({
      label: 'Tweet',
      submenu: [
        {
          label: 'New Tweet',
          click() {
            app.emit('showForm');
          }
        }
      ]
    });
    const menu = Menu.buildFromTemplate(AppMenu.buildTemplate());
    menu.append(tweetMenu);
    Menu.setApplicationMenu(menu);
  }

  static buildTemplate() {
    const template = [
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Cmd+Z',
            role: 'undo'
          },
          {
            label: 'Redo',
            accelerator: 'Ctrl+R',
            role: 'redo'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Cmd+X',
            role: 'cut'
          },
          {
            label: 'Copy',
            accelerator: 'Cmd+C',
            role: 'copy'
          },
          {
            label: 'Paste',
            accelerator: 'Cmd+V',
            role: 'paste'
          },
          {
            label: 'Select All',
            accelerator: 'Cmd+A',
            role: 'selectall'
          },
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'Cmd+R',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.reload();
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
              if (focusedWindow) focusedWindow.webContents.toggleDevTools();
            }
          }
        ]
      },
      {
        role: 'window',
        submenu: [
          {
            role: 'minimize'
          },
          {
            role: 'close'
          }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click() {
              require('electron').shell.openExternal('http://dataich.github.io');
            }
          }
        ]
      }
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          {
            role: 'about'
          },
          {
            type: 'separator'
          },
          {
            role: 'services',
            submenu: []
          },
          {
            type: 'separator'
          },
          {
            role: 'hide'
          },
          {
            role: 'hideothers'
          },
          {
            role: 'unhide'
          },
          {
            type: 'separator'
          },
          {
            role: 'quit'
          }
        ]
      });

      template[3].submenu = [
        {
          label: 'Close',
          role: 'close'
        },
        {
          label: 'Minimize',
          role: 'minimize'
        },
        {
          label: 'Zoom',
          role: 'zoom'
        },
        {
          type: 'separator'
        },
        {
          label: 'Bring All to Front',
          role: 'front'
        }
      ];
    }

    return template;
  }
}
