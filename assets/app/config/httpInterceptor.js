import {HttpInterceptorExtensions} from 'config/HttpInterceptorExtensions';

export class HttpInterceptor {


    handleInterceptorExtensions(httpInterceptorExtensions, eventName) {
        if (!angular) {
            throw 'Angular is required in order to work';
        }

        if (!angular.isArray(httpInterceptorExtensions)) {
            throw 'Array expected: httpInterceptorExtensions';
        }

        angular.forEach(httpInterceptorExtensions, function(extension) {

            if (extension[eventName] && typeof (extension[eventName]) == 'function') {
                extension[eventName]();
            }
        });
    }

    constructor($q) {
        let context = this;
        //Load interceptor extensions.
        let httpInterceptorExtensions = new HttpInterceptorExtensions();

        if (!$q) {
            throw 'HttpInterceptor: $q is required in order to work';
        }

        return {
            // optional method
            'request': function(config) {
                // do something on success
                console.log('Request success');
                context.handleInterceptorExtensions(httpInterceptorExtensions, 'request');
                return config;
            },

            // optional method
            'requestError': function(rejection) {
                // do something on error
                console.log('Request Error');
                context.handleInterceptorExtensions(httpInterceptorExtensions, 'requestError');
                return $q.reject(rejection);
            },



            // optional method
            'response': function(response) {
                // do something on success
                console.log('Response success');
                context.handleInterceptorExtensions(httpInterceptorExtensions, 'response');
                return response;
            },

            // optional method
            'responseError': function(rejection) {
                // do something on error
                console.log('Response error');
                context.handleInterceptorExtensions(httpInterceptorExtensions, 'responseError');
                return $q.reject(rejection);
            }
        };

    }


}