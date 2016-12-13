/*
Copyright (c) 2016 MetaCode

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var starter = function () {
    var definitions = {};
    var appConfig = {

        APP_PATH: 'dist/',
        APP_CONFIG_PATH: 'dist/config/',
        APP_NAME: 'angularApp',
        APP_SCOPE: 'body',
        ANGULAR_MODULES: ["ngSanitize", "ui.router", "oc.lazyLoad", "PubSub","ngMaterial"],
        API_END_POINT: 'http://localhost:51690/api',
        HTTP_DEFAULTS: [{ name: 'withCredentials', value: true }]
    };

    definitions.appConfig = appConfig;

    definitions.initSystemJs = function (initFile) {

        if (!System || !initFile) {
            throw 'SystemJS is not defined or initFile is empty';
        }

        System.defaultJSExtensions = true;
        window.System = System;

        if (!System.config) {
            throw 'Something went wrong, config method is undefined for System';
        }

        System.config({
            meta: {
                '*.css': { loader: 'css' }
            },
            map: {
                components: 'dist/components',
                app: appConfig.APP_PATH,
                config: appConfig.APP_CONFIG_PATH,
                httpExtensions: 'dist/httpExtensions',
                css: 'dist/css.js',
                specs:'../../' + appConfig.APP_CONFIG_PATH,
                componentSpec:'../../dist/components'
            },
            packages: {
                'dist': {
                    defaultExtension: 'js',
                    format: 'cjs'
                }
            }
        });

        return System.import(initFile + '.js');

    };

    return definitions;



};


if (typeof exports != 'undefined') {

    module.exports = starter;

} else {

    var webStarter = starter();

    let testMode = window.testMode;
    let initFile = testMode == true ? window.testFile : webStarter.appConfig.APP_CONFIG_PATH + 'init';

    webStarter
        .initSystemJs(initFile)
        .then(function (moduleResponse) {
            //InitModule is ready!
            debugger;
            if (!testMode) {
                if (moduleResponse && moduleResponse.AppInit) {
                    new moduleResponse.AppInit(webStarter.appConfig);
                }
            } else {
                if (!moduleResponse.Spec) {
                    throw new Error('Expecting Spec function');
                } else {
                    new moduleResponse.Spec(webStarter.appConfig);
                }
            }
        }, console.error.bind(console));
}

