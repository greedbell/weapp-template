const gulp = require('gulp');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const del = require('del');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const runSequence = require('run-sequence').use(gulp);
const requireModules = require('gulp-require-modules');
const path = require('path');

const develop_root = './develop';
const src_root = './src';
const release_root = './release';
const src = {
  js: `${src_root}/**/*.{js,es6}`,
  scss: `${src_root}/**/*.scss`,
  json: `${src_root}/**/*.json`,
  images: `${src_root}/**/*.{png,jpg,jpeg,gif}`,
  html: `${src_root}/**/*.html`
};

// compile

function compileJS(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(babel())
    .pipe(requireModules({
      dist: true,
      modulesDirectory: `${develop_root}/weapp_modules`,
      modulesManifestPath: `${develop_root}/require-modules.json`,
      fromDirectory: src_root,
      distDirectory: develop_root
    }))
    .pipe(gulp.dest(distDir))
}

function compileHtml(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(rename({
      extname: '.wxml'
    }))
    .pipe(gulp.dest(distDir));
}

function compileScss(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(sass())
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(distDir));
}

function compileJSON(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(gulp.dest(distDir));
}

function compileImages(filePath, distDir) {
  return gulp.src(filePath)
    .pipe(plumber())
    .pipe(changed(distDir))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(distDir));
}

// build

gulp.task('build:js', () => {
  compileJS(src.js, develop_root);
});

gulp.task('build:html', () => {
  compileHtml(src.html, develop_root);
});

gulp.task('build:scss', () => {
  compileScss(src.scss, develop_root);
});

gulp.task('build:json', () => {
  compileJSON(src.json, develop_root);
});

gulp.task('build:images', () => {
  compileImages(src.images, develop_root);
});

gulp.task('build', ['build:js', 'build:html', 'build:scss', 'build:json', 'build:images']);

gulp.task('rebuild', () => {
  runSequence('clear:develop', 'build');
});

// watch

gulp.task('watch:js', () => {
  gulp.watch(src.js, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(develop_root, relate);
      compileJS(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:html', () => {
  gulp.watch(src.html, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(develop_root, relate);
      compileHtml(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:scss', () => {
  gulp.watch(src.scss, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(develop_root, relate);
      compileScss(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:json', () => {
  gulp.watch(src.json, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(develop_root, relate);
      compileJSON(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch:images', () => {
  gulp.watch(src.images, (event) => {
    if (event.type !== 'deleted') {
      const filePath = event.path;
      const relate = path.relative(src_root, filePath);
      const dist = path.resolve(develop_root, relate);
      compileImages(filePath, path.dirname(dist));
    }
  })
});

gulp.task('watch', ['watch:js', 'watch:html', 'watch:scss', 'watch:json', 'watch:images']);

// release

gulp.task('release:js', () => {
  gulp.src(src.js)
    .pipe(plumber())
    .pipe(changed(release_root))
    .pipe(babel())
    .pipe(requireModules({
      dist: true,
      modulesDirectory: `${release_root}/weapp_modules`,
      modulesManifestPath: `${release_root}/require-modules.json`,
      fromDirectory: src_root,
      distDirectory: release_root
    }))
    .pipe(uglify())
    .pipe(gulp.dest(release_root))
});

gulp.task('release:scss', () => {
  gulp.src(src.scss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      extname: '.wxss'
    }))
    .pipe(gulp.dest(release_root))
});

gulp.task('release:html', () => {
  gulp.src(src.html)
    .pipe(plumber())
    .pipe(htmlmin())
    .pipe(rename({
      extname: '.wxml'
    }))
    .pipe(gulp.dest(release_root))
});

gulp.task('release:json', () => {
  compileJSON(src.json, release_root);
});

gulp.task('release:images', () => {
  compileImages(src.images, release_root);
});

gulp.task('release', ['release:js', 'release:html', 'release:scss', 'release:json', 'release:images']);

gulp.task('rerelease', () => {
  runSequence('clear:release', 'release');
});

// clear

gulp.task('clear:develop', () => {
  del(develop_root);
});

gulp.task('clear:release', () => {
  del(release_root);
});

gulp.task('clear', ['clear:develop', 'clear:release']);
