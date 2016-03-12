/**
 * Created by Asiman on 04.03.2016.
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util');

gulp.task('scripts', function (done) {
    return gulp.src('./angular/js/controlpanel/**/*.js')
        .pipe(concat('controlpanel.js').on('error', gutil.log))
        .pipe(gulp.dest('./angular/js/min'))
        .pipe(rename('controlpanel.min.js').on('error', gutil.log))
        .pipe(uglify({mangle: false}).on('error', function(error){
            done(error);
        }))
        .pipe(gulp.dest('./angular/js/min'))
});

gulp.task('watch', function(){
    gulp.watch('./angular/js/controlpanel/**/*.js', ['scripts']);
});

gulp.task('default', ['watch']);