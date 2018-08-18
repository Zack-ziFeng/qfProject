let gulp = require('gulp');
let sass = require('gulp-sass');

gulp.task('compileSass', function(){
	gulp.src(['./src/sass/*.scss']).pipe(sass({outputStyle: 'compact'}).on('error', sass.logError)).pipe(gulp.dest('./src/css/'));
});

gulp.task('auto', function(){
	gulp.watch('./src/sass/*.scss', ['compileSass']);
});