import TimelineWindow from './timeline-window';
import FormWindow from './form-window';

class Main {
  constructor() {
    this.timlineWindow = new TimelineWindow();
    this.formWindow = new FormWindow();
  }
}

const main = new Main();
