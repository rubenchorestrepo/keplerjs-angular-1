import { Component } from 'config/component';
import {[componentName]Controller} from 'components/[componentName]/controller';
[imports]
[styleImports]

export class [componentName] extends Component
{
    [componentName]Controller($scope, appConfig, app, componentLoader, PubSub[serviceInjection])
    {
        "ngInject";
        //[componentName]  controller logic. (Controller logic should be outside of angular controller).
        let componentController = new [componentName]Controller();

        /*  Load this component inside another component view:
            import {[componentName]} from 'components/[componentName]/component'; (This line should be on the top of the component file)
            componentLoader.initialize([componentName],$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="[componentName]LazyLoad"> <[componentName]></[componentName]></div>

            To view the component controller test results go to /specs/[componentName]/specRunner.html
        */
        $scope.component = {
            name: '[componentName]',
            state: '[state]'
        };

        PubSub.publish('component_[componentName]_Loaded');

        function apply(expression) {
            $scope.$apply(() => typeof expression == 'function' ? expression() : null);
        }
    }

    lazyLoad()
    {
        return [
            super.getTemplateUrl("components/[componentName]/view.html")
        ];
    }

    getComponentDefinition()
    {

        return {
            templateUrl: super.getTemplateUrl("components/[componentName]/view.html"),
            controller: this.[componentName]Controller,
            name: '[componentName]'
        };

    }

    injectDependencies(angularApp)
    {
        [serviceInjectionInstance]
    }

}