const gulp = require('gulp');
const electron = require('electron-connect').server.create();

gulp.task('serve', () => {
 electron.start();

 gulp.watch('./app/javascripts/main/**/*.js', electron.restart);
 gulp.watch(['./app/html/**/*.html', './app/css/**/*.css', './app/javascripts/**/*.{js,jsx}'], electron.reload);
});

gulp.task('default', ['serve']);
