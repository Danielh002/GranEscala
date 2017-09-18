var gulp=require('gulp')

gulp.task('copy', function () {
    gulp.src('./bower_components/angular/angular.min.js')
        .pipe(gulp.dest('./public/js/libraries'));
    gulp.src('./bower_components/ngstorage/ngStorage.min.js')
        .pipe(gulp.dest('./public/js/libraries'));
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./public/css/libraries'));
});