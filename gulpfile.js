const { watch, src, dest, parallel, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");
const imageResize = require('gulp-image-resize');
const rename = require("gulp-rename");
const { spawn } = require('child_process');

// Clean _site
function clean() {
  return del(["./_site/"]);
}

// Need to install GraphicsMagick or ImageMagick
// apt-get install imagemagick
// apt-get install graphicsmagick

function imagesLarge() {
  return src('./src/_raw-images/galleries/**/*.jpg')
    .pipe(imageResize({
      width : 2400
    }))
    .pipe(dest('./src/img/galleries/'));
}

function imagesThumbs() {
  return src('./src/_raw-images/galleries/**/*.jpg')
    .pipe(imageResize({
      width : 2400,
      height : 500,
      crop : true,
      quality: 0.3      
    }))
    .pipe(rename({
      suffix: '-thumb'
    }))
    .pipe(dest('./src/img/galleries/'));
}

function cssTask() {
  return src('./src/scss/style.scss', { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./_site/css'));
}

function watchFiles() {
  watch('./**/*.scss', parallel(cssTask));
}

// Execute the Node.js script
function runImageScript(cb) {
  const script = spawn('node', ['generateImages.js']);

  script.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  script.stderr.on('data', data => {
    console.error(`stderr: ${data}`);
  });

  script.on('close', code => {
    console.log(`Script process exited with code ${code}`);
    cb(code === 0 ? null : 'Error occurred during script execution');
  });
}

// Tasks
exports.clean = clean;
exports.watch = watchFiles;
exports.build = series(cssTask);
exports.images = series(parallel(imagesThumbs, imagesLarge), runImageScript);
exports.start = series(clean, parallel(cssTask));
exports.sass = parallel(cssTask, watchFiles);
exports.default = series(clean, parallel(imagesThumbs, imagesLarge), runImageScript, cssTask, watchFiles);
