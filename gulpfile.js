'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const packageFile = require(__dirname + '/package.json');
const ngAnnotate = require('gulp-ng-annotate');
const replace = require('gulp-replace');
const yargs = require('yargs').argv;
const routes = require('./assets/app/routes.json');
const htmlMinify = require('gulp-minify-html');
const fs = require('fs');
const path = require('path');
const rename = require('gulp-rename');

//Configure gulp
let config = {
    appJsPath: ['./assets/app/**/*.js', '!./assets/app/component-template/*', '!./assets/app/components/jasmine/*'],
    dest: './public/dist',
    webServerPath: './public',
    dependencies: packageFile.jsVendors,
    jsSingles: packageFile.jsSingles,
    jsVendorPath: 'vendors.js',
    lessPath: './assets/app/css/**/*.less',
    views: ['./assets/app/**/*.html', '!./assets/app/component-template/*.html', '!./assets/app/component-template/*.less'],
    index: ['./assets/index.html', './assets/specRunner.html'],
    routes: './assets/app/routes.json',
    lessModulesPath: ['!./assets/app/component-template/*.less', './assets/app/**/*.less'],
    keplerFiles: './assets/kepler/**/*',
    images: ['./assets/app/**/*.{png,gif,jpg}'],
    jasmine: './assets/app/components/jasmine/**',
    spec: './assets/app/components/*/{spec.js,specRunner.html}'
};

const reservedWords = [
    'video',
    'p',
    'html',
    'span',
    'div',
    'img',
    'picture',
    'article',
    'section',
    'ul',
    'li',
    'ol',
    'a',
    'body',
    'head',
    'table',
    'iframe',
    'frameset',
    'header',
    'menu',
    'audio',
    'aside',
    'b',
    'applet',
    'area',
    'canvas',
    'caption',
    'code',
    'col',
    'figure',
    'font',
    'frame',
    'link',
    'map',
    'object',
    'option',
    'source',
    'textarea',
    'title',
    'var',
    'time'
];



gulp.task('default', ['watch', 'webserver', 'vendor', 'index', 'routes', 'views', 'less-modules', 'js-singles', 'kepler', 'images', 'jasmine', 'spec']);

gulp.task('babel', function() {

    let build = yargs.build;

    let stream = gulp.src(config.appJsPath)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(ngAnnotate());

    if (build) {
        stream.pipe(uglifyCode(true, true, true))
            .pipe(gulp.dest(config.dest));
    } else {
        stream.pipe(gulp.dest(config.dest));
    }


    return stream;

});

gulp.task('jasmine', function() {

    return gulp.src(config.jasmine)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulp.dest(config.dest + '/components/jasmine'));

});

gulp.task('spec', function() {

    return gulp.src(config.spec)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulp.dest('./public/specs'));
});

gulp.task('js-singles', function() {

    return gulp.src(config.jsSingles)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(uglifyCode(true, true, true))
        .pipe(gulp.dest(config.dest));
});


gulp.task('kepler', function() {

    return gulp.src(config.keplerFiles)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulp.dest(`${config.dest}/kepler`));

});

gulp.task('views', function() {

    return gulp.src(config.views)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(htmlMinify())
        .pipe(gulp.dest(config.dest));

});

gulp.task('images', function() {

    return gulp.src(config.images)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulp.dest(config.dest));

});

gulp.task('routes', function() {

    return gulp.src(config.routes)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(gulp.dest(config.webServerPath));
});

gulp.task('index', function() {

    return gulp.src(config.index)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(htmlMinify())
        .pipe(gulp.dest(config.webServerPath));

});


gulp.task('vendor', function() {

    return gulp.src(config.dependencies)
        .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
        .pipe(concat(config.jsVendorPath))
        .pipe(gulp.dest(config.dest))
});


gulp.task('less', function() {

    return gulp.src(config.lessPath)
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(less({
            paths: ['./app/css/includes'],
            compress: true
        }))
        .pipe(autoprefixer())
        .pipe(concat('app.css'))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(config.dest));
});

gulp.task('less-modules', function() {

    return gulp.src(config.lessModulesPath)
        .pipe(plumber({
            errorHandler: notify.onError('<%= error.message %>')
        }))
        .pipe(less({
            compress: true
        }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest(config.dest));
});



gulp.task('webserver', ['babel', 'less'], function() {

    let build = yargs.build;

    if (!build) {
        if (!config || !config.webServerPath) {
            throw 'config.webServerPath property is required';
        }

        gulp.src(config.webServerPath)
            .pipe(plumber({ errorHandler: notify.onError('<%= error.message %>') }))
            .pipe(webserver({
                livereload: true,
                directoryListing: false,
                open: true,
                port: 3000
            }));

        printSuccess(`Server running at http://localhost:3000`);
    }
});


gulp.task('service', function() {

    let componentName = yargs.component;
    let service = yargs.service;
    createService(service, componentName);
});


gulp.task('registerComponents', function() {
    registerComponents();
});



gulp.task('watch', function() {
    let build = yargs.build;
    if (!build) {
        gulp.watch(config.lessPath, ['less']);
        gulp.watch(config.appJsPath, ['babel']);
        gulp.watch(config.views, ['views']);
        gulp.watch(config.index, ['index']);
        gulp.watch(config.lessModulesPath, ['less-modules']);
        gulp.watch(config.spec, ['spec']);
    }

});


gulp.task('component', function() {

    let componentName = yargs.name;
    let service = yargs.service;
    let url = yargs.url;
    let state = yargs.state;
    let style = yargs.style;
    let imports = '', styleImport = '';
    let distFile = `components/${componentName}/${componentName}`;
    let distFilePath = __dirname + '/assets/app/components/' + componentName;
    let componentPath = 'dist/components/' + componentName + '/component.js';
    let templatePaths = ['./assets/app/component-template/*'];
    let serviceInjection = '';
    let serviceInjectionInstance = '';

    if (!componentName || !isNaN(componentName)) {
        printError("Invalid component name");

    } else if (reservedWords.indexOf(componentName) != -1) {

        printError('The component name is invalid, this is a reserved word');

    } else {


        if (service) {
            imports = `import {${componentName}Service} from 'components/${componentName}/service';`;
            serviceInjection = `,${componentName}Service`;
            serviceInjectionInstance = `new ${componentName}Service(angularApp);`;

        } else {
            templatePaths.push('!./assets/app/component-template/service.js');
        }

        if (style) {
            styleImport = `import 'components/${componentName}/style.css';`;
        } else {
            templatePaths.push('!./assets/app/component-template/style.less');
        }

        state = state ? state : componentName;

        gulp.src(templatePaths)
            .pipe(replace('[componentName]', componentName))
            .pipe(replace('[state]', state))
            .pipe(replace('[imports]', imports))
            .pipe(replace('[styleImports]', styleImport))
            .pipe(replace('[serviceInjection]', serviceInjection))
            .pipe(replace('[serviceInjectionInstance]', serviceInjectionInstance))
            .pipe(gulp.dest(distFilePath));

        registerComponentRoute(componentName, url ? url : componentName, componentPath, state);
        printSuccess('Component created:' + distFilePath);
        registerComponents();

    }
});


/**
 * Helper functions
 */

function createService(service, componentName) {
    if (service && componentName) {
        let imports = '';
        let distFile = `components/${componentName}/${componentName}`;
        let distFilePath = __dirname + '/assets/app/components/' + componentName;
        let servicePath = __dirname + '/assets/app/components/' + componentName + '/' + service + '.js';
        let templatePaths = ['./assets/app/component-template/service.js'];

        gulp.src(templatePaths)
            .pipe(replace('[componentName]', service))
            .pipe(rename(servicePath))
            .pipe(gulp.dest(distFilePath));

        printSuccess('Service created:' + servicePath);

    } else {
        printError('Service name and component name are required');
    }

}


function uglifyCode(dropComments, dropDebugger, dropConsole) {
    return uglify({
        output: { comments: !dropComments },
        compress: {
            drop_console: dropConsole,
            drop_debugger: dropDebugger
        },
        mangle: { keep_fnames: true }
    });
}


function registerComponentRoute(componentName, url, path, state) {
    routes.push({ "name": componentName, "url": `/${url}`, "path": path, "state": state });
    fs.writeFile('./assets/app/routes.json', JSON.stringify(routes));
}

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

function registerComponents() {
    var folders = getFolders('./assets/app/components');
    var foldersStructure = [];

    for (let i = 0; i < folders.length; i++) {
        foldersStructure.push({ componentName: folders[i] });
    }


    fs.writeFile('./public/modules.json', JSON.stringify(foldersStructure));

}

function printError(errorMessage) {
    console.log('\x1b[41m', errorMessage, '\x1b[0m');
}

function printSuccess(successMessage) {
    console.log('\x1b[32m', successMessage, '\x1b[0m');
}
