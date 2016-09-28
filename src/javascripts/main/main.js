import { app } from 'electron';
import TimelineWindow from './timeline-window';
import FormWindow from './form-window';
import AppMenu from './app-menu';

class Main {
  constructor() {
    this.timlineWindow = new TimelineWindow();
    this.formWindow = new FormWindow();
    this.start();
  }

  start() {
    app.on('ready', () => {
      AppMenu.setup();
    });
  }
}

const main = new Main();
