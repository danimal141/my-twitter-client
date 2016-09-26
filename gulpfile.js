const gulp = require('gulp');
const electron = require('electron-connect').server.create();

gulp.task('serve', () => {
 electron.start();

 gulp.watch('./src/javascripts/main/**/*.js', electron.restart);
 gulp.watch(['./src/html/**/*.html', './src/css/**/*.css', './src/javascripts/renderer/**/*.{js,jsx}'], electron.reload);
});

gulp.task('default', ['serve']);
