
export class HttpFactory {

    config($http, appConfig) {
        "ngInject";

        var factory = {};


        factory.post = function (serviceName, params, customEndPoint) {

            setCustomEndPoint(customEndPoint);
            return $http.post(`${appConfig.API_END_POINT}/${serviceName}`, params);
        };

        factory.put = function (serviceName, params, customEndPoint) {

            setCustomEndPoint(customEndPoint);
            return $http.put(`${appConfig.API_END_POINT}/${serviceName}`, params);
        };


        factory.get = function (serviceName, params, customEndPoint) {

            setCustomEndPoint(customEndPoint);
            return $http.get(`${appConfig.API_END_POINT}/${serviceName}`, { params: params });
        };


        factory.delete = function (serviceName, params, customEndPoint) {

            setCustomEndPoint(customEndPoint);
            return $http.delete(`${appConfig.API_END_POINT}/${serviceName}`, { params: params });
        };

        function setCustomEndPoint(customEndPoint)
        {
            if (customEndPoint) {
                appConfig.API_END_POINT = customEndPoint;
            } else {
                //Configure defaults
                if (appConfig.HTTP_DEFAULTS) {
                    angular.forEach(appConfig.HTTP_DEFAULTS, function (httpDefault) {
                        $http.defaults[httpDefault.name] = httpDefault.value;
                    });
                }
            }

        }

        return factory;
    }

}