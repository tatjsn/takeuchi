import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

gulp.task('js', () =>
  gulp.src('src/client/entry.js')
      .pipe(webpackStream({
        module: {
          loaders: [
            { test : /\.js$/, exclude: /node_modules/, loader: 'babel' }
          ]
        },
        output: {
          filename: 'bundle.js'
        }
      }, webpack))
      .pipe(gulp.dest('dist')));

gulp.task('html', () =>
  gulp.src('src/server/views/*.html')
      .pipe(gulp.dest('dist')));

gulp.task('js-watch', ['js'], reload);
gulp.task('html-watch', ['html'], reload);

gulp.task('serve', ['js', 'html'], () => {
  browserSync({
    port: 8081,
    notify: false,
    proxy: 'localhost:8080'
  });

  gulp.watch(['src/client/**/*.js', '!**/.*'], ['js-watch']);
  gulp.watch(['src/server/views/*.html', '!**/.*'], ['html-watch']);
});
