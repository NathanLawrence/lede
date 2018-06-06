import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

// Input file.
var bundler = browserify('src/jsx/app.jsx', {
    extensions: ['.js', '.jsx'],
    debug: true,
    standalone: 'lede'
});

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src',
    presets: ["es2015", "react"]
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
    return bundler.bundle()
        .on('error', function (err) {
            console.log("=====");
            console.error(err.toString());
            console.log("=====");
            this.emit("end");
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest('public/assets/js'))
    ;
}


gulp.task('transpile', () => bundle());

