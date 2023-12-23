const { watch, src, dest, parallel, series } = require('gulp');
// const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const del = require("del");
const imageResize = require('gulp-image-resize');
const rename = require("gulp-rename");

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
    width : 1900
  }))
  .pipe(dest('./src/img/galleries/'));
};

function imagesThumbs() {
return src('./src/_raw-images/galleries/**/*.jpg')
  .pipe(imageResize({
    width : 1900,
    height : 500,
    crop : true,
    quality: 0.3      
  }))
  .pipe(rename({
    suffix: '-thumb'
  }))
  .pipe(dest('./src/img/galleries/'));
};

function cssTask() {
return src('./src/scss/style.scss', { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed'})).on('error', sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./_site/css'))
};

function watchFiles() {
watch('./**/*.scss', parallel(cssTask));
};

// Tasks
exports.clean = clean;

exports.images = parallel(imagesThumbs, imagesLarge);

exports.default = series(
	clean,
	parallel(cssTask),
);
