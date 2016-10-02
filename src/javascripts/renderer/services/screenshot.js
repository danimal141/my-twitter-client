import { remote, desktopCapturer } from 'electron';

export default class Screenshot {
  static capture() {
    return Screenshot.getStream()
      .catch(err => {
        console.log(err.stack);
      })
      .then(Screenshot.getVideo)
      .then((video) => {
        const canvas = document.createElement('canvas');
        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;
        canvas.width = videoWidth;
        canvas.height = videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0, videoWidth, videoHeight);
        return remote.nativeImage.createFromDataURL(canvas.toDataURL());
      });
  }

  static getStream() {
    const display = remote.screen.getPrimaryDisplay();
    const bounds = display.bounds;
    const scale = display.scaleFactor;

    return new Promise((onFulfilled, onRejected) => {
      desktopCapturer.getSources({ types: ['screen'] }, (err, sources) => {
        if (err) {
          throw err;
        }
        const source = sources[0];
        navigator.webkitGetUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: bounds.width * scale,
              maxWidth: bounds.width * scale,
              minHeight: bounds.height * scale,
              maxHeight: bounds.height * scale
            }
          }
        }, onFulfilled, onRejected);
      });
    });
  }

  static getVideo(stream) {
    const video = document.createElement('video');
    video.autoplay = true;
    video.src = URL.createObjectURL(stream);

    return new Promise((onFulfilled, onRejected) => {
      video.addEventListener('playing', () => {
        onFulfilled(video);
      });
      video.addEventListener('error', (err) => {
        onRejected(err);
      });
    });
  }
};
