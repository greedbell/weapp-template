# DEVELOP

安装 npm 依赖

```
$ npm install -g node-gyp
```

## Eslint

安装 npm 依赖

```
export PKG=eslint-config-airbnb-base;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
$ npm install --save-dev eslint-config-airbnb-base eslint eslint-plugin-import
```

配置 [.eslintrc](.eslintrc)

## Babel

* [transform-export-extensions](https://babeljs.io/docs/plugins/transform-export-extensions/)
* [syntax-export-extensions](https://babeljs.io/docs/plugins/syntax-export-extensions/)
* [transform-runtime](https://babeljs.io/docs/plugins/transform-runtime/)
* [preset-es2015](https://babeljs.io/docs/plugins/preset-es2015/)
* [preset-stage-0](https://babeljs.io/docs/plugins/preset-stage-0/)

安装 npm 依赖

```
$ npm install --save babel-runtime
$ npm install --save-dev babel-core babel-plugin-transform-export-extensions babel-plugin-syntax-export-extensions babel-plugin-transform-runtime babel-preset-es2015 babel-preset-stage-0
```

配置 [.babelrc](.babelrc)

## Gulp

安装 npm 依赖

```
$ npm install --save-dev gulp gulp-babel gulp-imagemin imagemin-pngquant gulp-changed gulp-rename gulp-uglify gulp-sass del gulp-plumber gulp-clean-css gulp-htmlmin run-sequence gulp-require-modules
```

配置 [gulpfile.js](gulpfile.js)
