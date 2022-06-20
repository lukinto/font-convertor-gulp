const { src, dest, parallel, series } = require('gulp');

const del = require('del');
const changed = require('gulp-changed');
const ttf2Woff2 = require('gulp-ttf2woff2');
const ttf2Woff = require('gulp-ttf-to-woff');

const srcDir = './src/';
const destDir = './build/';
const paths = {
  clean: destDir,
  fonts: {
    src: `${srcDir}**/*.ttf`,
    dest: destDir,
  },
};

const clean = () => del(paths.clean);

const woff2 = () => {
  return src(paths.fonts.src)
    .pipe(changed(paths.fonts.dest, { extension: '.woff2' }))
    .pipe(ttf2Woff2())
    .pipe(dest(paths.fonts.dest));
};

const woff = () => {
  return src(paths.fonts.src)
    .pipe(changed(paths.fonts.dest, { extension: '.woff' }))
    .pipe(ttf2Woff())
    .pipe(dest(paths.fonts.dest));
};

const ttf = () => {
  return src(paths.fonts.src)
    .pipe(changed(paths.fonts.dest, { extension: '.ttf' }))
    .pipe(dest(paths.fonts.dest));
};

const fonts = parallel(woff2, woff, ttf);

exports.clean = clean;
exports.woff2 = woff2;
exports.woff = woff;
exports.ttf = ttf;
exports.default = series(clean, fonts);
