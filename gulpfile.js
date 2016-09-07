var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel');

gulp.task('js', function() {
    gulp.src([
      'js/*.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }))
    // concat pulls all our files together before minifying them
    .pipe( concat('main.min.js') )
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});   


gulp.task('watch', function () {
    gulp.watch('js/*.js',['js']);
});

gulp.task('default', ['js']);
gulp.task('start', ['watch']);
