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

gulp.task('minjs', function() {
    gulp.src([
      'js/*.js'
    ])
    .pipe(babel({
        presets: ['es2015']
    }))
    // concat pulls all our files together before minifying them
    .pipe( concat('main.js') )
    .pipe(gulp.dest('./'))
});   


gulp.task('watch', function () {
    gulp.watch('js/*.js',['js', 'minjs']);
});

gulp.task('default', ['js', 'minjs']);
gulp.task('start', ['watch']);
