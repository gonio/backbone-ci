/**
 * Created by DOKE on 2016/6/6.
 */
var gulp   = require("gulp"),
    livereload = require('gulp-livereload'), // 网页自动刷新（服务器控制客户端同步刷新）
    webserver = require('gulp-webserver'), // 本地服务器
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    through2 = require('through2'),
    build_dir = './dest';

// 注册任务
gulp.task('webserver', function() {
    gulp.src( './' ) // 服务器目录（./代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});

// 监听任务
gulp.task('watch',function(){
    gulp.watch('./**/*.*');// 监听根目录下所有文件
});

//////////////////////////// clean /////////////////////////////////
gulp.task('clean', function (cb) {
    del([build_dir + '/*', 'index.html', '!'+ build_dir + '/robots.txt'], cb);
});

// 合并，压缩 js 文件
gulp.task('minifyjs', function() {
    gulp.src(['app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(build_dir));

});

// 压缩 css 文件
gulp.task('minifycss', function() {
    gulp.src(['css/page.css'])
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(minifyCSS())
        .pipe(gulp.dest(build_dir));
});

// 处理 html 文件
gulp.task('replace', function() {
    gulp.src('index_gulp.html')
        .pipe(rename('index.html'))
        .pipe(contentReplace(replaceIndexLink)).pipe(gulp.dest('.'));
});

// 处理文件中内容时调用
function contentReplace(modifier) {
    return through2.obj(function(file, encoding, done) {
        var content = modifier(String(file.contents));
        file.contents = new Buffer(content);
        this.push(file);
        done();
    });
}

//替换时间戳
function replaceIndexLink (data) {
    return data.replace(/(<timeCache>)/g, new Date().getTime());
}

// 默认任务
gulp.task('default',['clean', 'minifycss', 'minifyjs', 'replace']);