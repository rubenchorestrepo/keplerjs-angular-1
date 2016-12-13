export class ComponentLoader
{
    config($ocLazyLoad,appConfig)
    {
        "ngInject";
       
        var factory = {};

        factory.load = function(componentManifest){
            var promise = System.import(componentManifest.path);

            promise.then(function(moduleResponse){
                var component = moduleResponse[componentManifest.name];
                if(component)
                {
                    var componentInstance = new component(angular.module(appConfig.APP_NAME));
                    $ocLazyLoad.load(componentInstance.component);
                }
                
            });
        };

        factory.initialize = function(component, scope)
        {   
            if(!scope)
            {
                throw 'Missing parameter: scope';
            }

            let componentInstance = new component(angular.module(appConfig.APP_NAME));
            let lazyLoad = `${component.name}LazyLoad`;
            scope[lazyLoad] = componentInstance.lazyLoad();
            $ocLazyLoad.load(componentInstance.component);
        }
        
        return factory;
    }
    

    static getComponentState(angularApp,componentManifest)
    {
        var componentTemplate = componentManifest.name.toLowerCase();
        var stateName = componentManifest.state ? componentManifest.state : componentManifest.name;
       
        var componentState = {
            url: componentManifest.url,
            template: `<${componentTemplate}></${componentTemplate}>`,
            resolve: {
                lazyLoad: ['$ocLazyLoad', function($ocLazyLoad) {

                        var promise = System.import(componentManifest.path);

                        promise.then(function(moduleResponse){
                            var component = moduleResponse[componentManifest.name];
                            if(component && typeof component == 'function')
                            {
                                var componentInstance = new component(angularApp);
                                $ocLazyLoad.load(componentInstance.component);
                            }
                           
                        });

                        return promise;
                }]
            }
        };

        return componentState;

    }

   
    
}