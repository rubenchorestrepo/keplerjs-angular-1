import { Component } from 'config/component';
import {ServiceImagen} from 'components/notFound/serviceImagen';
import 'components/notFound/kepler.css';


export class notFound extends Component
{
    notFoundController($scope, appConfig, app, componentLoader, serviceImagen)
    {
        "ngInject";
        debugger;

        /*  Load this component inside another component view:
            import {notFound} from 'components/notFound/component'; (This line should be on the top of the component file)
            componentLoader.initialize(notFound,$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="notFoundLazyLoad"> <notFound></notFound></div>
        */
        $scope.saludar = function(){
            debugger;
            serviceImagen.getImagen()
            .success(function(response){
                $scope.imagen =  response;
            });
        };
    }

    lazyLoad()
    {
        return [
            super.getTemplateUrl("components/notFound/view.html")
        ];
    }

    getComponentDefinition()
    {

        return {
            templateUrl: super.getTemplateUrl("components/notFound/view.html"),
            controller: this.notFoundController,
            name: 'notFound',
            bindings:{onReady: '&'}
        };

    }

    injectDependencies(angularApp)
    {
        new ServiceImagen(angularApp);
    }

}