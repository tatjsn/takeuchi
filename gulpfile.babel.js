import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

gulp.task('webpack', () =>
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
