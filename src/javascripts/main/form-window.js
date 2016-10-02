import { app, BrowserWindow, globalShortcut } from 'electron';

export default class FormWindow {
  constructor() {
    this.window = null;
    this.start();
  }

  start() {
    app.on('ready', () => {
      this.createWindow();
      this.registerGlobalShortcut();
    });

    app.on('showForm', () => {
      this.window.show();
    });

    app.on('will-quit', () => {
      globalShortcut.unregisterAll();
    });
  }

  createWindow() {
    this.window = new BrowserWindow({
      title: 'Tweet',
      center: true,
      resizable: false,
      minimizable: false,
      maximizable: false,
      width: 300,
      height: 250,
      show: false
    });

    this.window.on('close', (e) => {
      if (this.window.isVisible()) {
        e.preventDefault();
        this.window.hide();
      }
    });

    this.window.loadURL(`file://${__dirname}/../../html/form.html`);
  }

  registerGlobalShortcut() {
    const accelerator = 'Cmd+Shift+N';
    if (globalShortcut.isRegistered(accelerator)) {
      return;
    }
    globalShortcut.register(accelerator, () => {
      this.window.show();
    });
  }
}
