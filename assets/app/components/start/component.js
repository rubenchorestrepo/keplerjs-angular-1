import { Component } from 'config/component';
import {startController} from 'components/start/controller';


import 'components/start/style.css';

export class start extends Component
{
    startController($scope, appConfig, app, componentLoader, PubSub)
    {
        "ngInject";
        //start  controller logic. (Controller logic should be outside of angular controller).
        let componentController = new startController();

        /*  Load this component inside another component view:
            import {start} from 'components/start/component'; (This line should be on the top of the component file)
            componentLoader.initialize(start,$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="startLazyLoad"> <start></start></div>

            To view the component controller test results go to /specs/start/specRunner.html
        */
        $scope.component = {
            name: 'start',
            state: 'start'
        };

        PubSub.publish('component_start_Loaded');

        function apply(expression) {
            $scope.$apply(() => typeof expression == 'function' ? expression() : null);
        }
         angular.element("#home").show();
    }

    lazyLoad()
    {

        return [
            super.getTemplateUrl("components/start/view.html")
        ];
    }

    getComponentDefinition()
    {

        return {
            templateUrl: super.getTemplateUrl("components/start/view.html"),
            controller: this.startController,
            name: 'start'
        };

    }

    injectDependencies(angularApp)
    {
        
    }

}