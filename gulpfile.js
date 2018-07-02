//导入插件
const gulp = require('gulp'); //gulp 插件
const sass = require('gulp-sass'); //编译sass插件 
const concat = require('gulp-concat'); //合并JS
const rename = require('gulp-rename'); //重命名
const cssnano = require('gulp-cssnano'); //压缩CSS
const uglify = require('gulp-uglify'); //压缩JS
//编译sass 重命名 压缩 
gulp.task('scss', function() {
	gulp.src('src/scss/*.scss').pipe(sass()).pipe(rename({
		"suffix": ".min"
	})).pipe(cssnano()).pipe(gulp.dest('css'));
})
//压缩JS 重命名 合并
gulp.task('js', function() {

	gulp.src('src/js/*.js').pipe(uglify()).pipe(rename({
		"suffix": ".min"
	})).pipe(concat('all.min.js')).pipe(gulp.dest('js'));
})

gulp.task('watch', function() {
	gulp.watch(['src/scss/*.scss','src/js/*.js'], ['scss','js']);
})