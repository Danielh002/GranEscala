var gulp=require('gulp')

gulp.task('copy', function () {
    gulp.src('./bower_components/angular/angular.min.js')
        .pipe(gulp.dest('./cooknet/public/js/libraries'));
    gulp.src('./bower_components/angular-route/angular-route.min.js')
        .pipe(gulp.dest('./cooknet/public/js/libraries'));
    gulp.src('./bower_components/ngstorage/ngStorage.min.js')
        .pipe(gulp.dest('./cooknet/public/js/libraries'));
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./cooknet/public/css/libraries'));
});