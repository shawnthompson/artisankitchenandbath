// Load plugins
const gulp = require("gulp");
const rename = require("gulp-rename");
const pkg = require("./package.json");
const del = require("del");
const imageResize = require('gulp-image-resize');

// Clean dist
function clean() {
  return del(["./dist/"]);
}

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function(cb) {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/**/*',
    ])
    .pipe(gulp.dest('./dist/vendor'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'))

  // jQuery Easing
  gulp.src([
      './node_modules/jquery.easing/*.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery-easing'))

  cb();

});

// Copy files
gulp.task('copy', function(cb) {

  // HTML
  gulp.src([
    './src/*.html'
  ])
  .pipe(gulp.dest('./dist'))
  
  // Images
  gulp.src([
    './src/img/**/*.*'
  ])
  .pipe(gulp.dest('./dist/img'))

  cb();

});

// Image pipeline
gulp.task('imagesLarge', function (cb) {
  gulp.src('./src/galleries/**/*.jpg')
  .pipe(imageResize({
    width : 1900
  }))
  .pipe(gulp.dest('dist/img/'));
  cb();
});

gulp.task('imagesThumbs', function (cb) {
  gulp.src('./src/galleries/**/*.jpg')
  .pipe(imageResize({
    width : 1900,
    height : 500,
    crop : true,
    quality: 0.3      
  }))
  .pipe(rename({
    suffix: '-thumb'
  }))
  .pipe(gulp.dest('dist/img/'));
  cb();
});

// Tasks
gulp.task("clean", clean)

gulp.task("images", gulp.parallel('imagesThumbs', 'imagesLarge'));

gulp.task("default", gulp.series(clean, gulp.parallel('vendor', 'copy'), 'images'));

// dev task
gulp.task("dev", gulp.parallel('default'));
