const gulp = require("gulp");
const less = require("gulp-less");
const del = require("del");
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

//пути файлов
const paths = {
  styles: {
    src: "src/styles/**/*.less",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
};

function clean() {
  //финал версия кода
  return del(["dist"]);
}

function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(less())
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}

//отслеживание изменений
function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.styles.src, scripts);
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);

exports.clean = clean;
exports.styles = styles;
exports.watch = watch;
exports.scripts = scripts;
exports.build = build;
exports.default = build;
