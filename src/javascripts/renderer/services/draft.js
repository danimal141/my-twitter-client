import fs from 'fs';

export default class Draft {
  static getPath() {
    return `${__dirname}/../../../../tmp/draft.txt`;
  }

  static read() {
    return new Promise((onFulfilled, onRejected) => {
      fs.readFile(Draft.getPath(), 'utf8', (err, text) => {
        if (err) {
          onRejected(err);
          return;
        }
        onFulfilled(text);
      });
    });
  }

  static write(text) {
    return new Promise((onFulfilled, onRejected) => {
      fs.writeFile(Draft.getPath(), text, 'utf8', (err) => {
        if (err) {
          onRejected(err);
          return;
        }
        onFulfilled(text);
      });
    });
  }
}
