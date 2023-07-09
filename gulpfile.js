const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Компилировать SCSS в CSS
gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// Минифицировать и объединить CSS
gulp.task('minify-css', function () {
  return gulp.src('css/style.css')
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css'));
});

// Минифицировать и объединить JS
gulp.task('minify-js', function () {
  return gulp.src('js/script.js')
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('js'));
});

// Отслеживать изменения в SCSS, CSS и JS
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', gulp.series('sass', 'minify-css'));
  gulp.watch('js/script.js', gulp.series('minify-js'));
});

// Задача по умолчанию
gulp.task('default', gulp.parallel('sass', 'minify-css', 'minify-js', 'watch'));
