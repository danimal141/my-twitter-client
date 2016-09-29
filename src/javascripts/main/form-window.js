import { app, BrowserWindow } from 'electron';

export default class FormWindow {
  constructor() {
    this.window = null;
    this.start();
  }

  start() {
    app.on('ready', () => {
      this.createWindow();
    });

    app.on('showForm', () => {
      this.window.show();
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
        this.window.hide();
        e.preventDefault();
      }
    });

    this.window.loadURL(`file://${__dirname}/../../html/form.html`);
  }
}
