// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const header = require("gulp-header");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const pkg = require("./package.json");
const del = require("del");
const imageResize = require('gulp-image-resize');

// Set the banner content
const banner = ['/*!\n',
  ' * Plansmash Media - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/plansmash/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  '\n'
].join('');

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



  // CSS task
function css() {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest("./dist/css"))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './src/js/*.js'
    ])
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browsersync.stream());
}

// Tasks
gulp.task("css", css);
gulp.task("js", js);
gulp.task("clean", clean)

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    }
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Watch files
function watchFiles() {
  gulp.watch("./src/scss/**/*", css);
  gulp.watch(["./src/js/**/*.js", "!./js/*.min.js"], js);
  gulp.watch("./src/*.html", browserSyncReload);
}

gulp.task("images", gulp.parallel('imagesThumbs', 'imagesLarge'));

gulp.task("default", gulp.series(clean, gulp.parallel('vendor', 'copy', css, js), 'images'));

// dev task
gulp.task("dev", gulp.parallel('default', watchFiles, browserSync));
