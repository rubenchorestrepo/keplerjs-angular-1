import { Component } from 'config/component';
import { docsController } from 'components/docs/controller';
import 'components/docs/style.css';

export class docs extends Component {
    docsController($scope, appConfig, app, componentLoader, PubSub) {
        "ngInject";
        //docs  controller logic. (Controller logic should be outside of angular controller).
        let componentController = new docsController();
        
        let isMobile = false;
        let showMenu = false;

        /*  Load this component inside another component view:
            import {docs} from 'components/docs/component'; (This line should be on the top of the component file)
            componentLoader.initialize(docs,$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="docsLazyLoad"> <docs></docs></div>

            To view the component controller test results go to /specs/docs/specRunner.html
        */
        $scope.component = {
            name: 'docs',
            state: 'docs'
        };

        PubSub.publish('component_docs_Loaded');

        function apply(expression) {
            $scope.$apply(() => typeof expression == 'function' ? expression() : null);
        }

        componentController.createTableOfContents();
        $scope.tableOfContents = componentController.getTableOfContents();
        $scope.scrollToContent = function (event, content) {
            event.preventDefault();
            let targetContent = angular.element(`#${content.target}`);
            $("html, body").animate({ scrollTop: targetContent.offset().top }, 1000);
            
            if( isMobile)
            {
                $('.docs-menu').hide();
                showMenu = false;
                $('#mobileMenu').toggleClass('open');
            }
            

        };

        $scope.scrollTop = function(e){

            e.preventDefault();
            $("html, body").animate({ scrollTop: 0}, 1000);
        };

        $scope.showMenu = function () {

            isMobile = true;
            showMenu = !showMenu;
            $('#mobileMenu').toggleClass('open');

            if(showMenu)
            {
                $('.docs-menu').show();
             
            }else
            {
                 $('.docs-menu').hide();
            }
        };
       
    }

    lazyLoad() {

        return [
            super.getTemplateUrl("components/docs/view.html")
        ];
    }

    getComponentDefinition() {

        return {
            templateUrl: super.getTemplateUrl("components/docs/view.html"),
            controller: this.docsController,
            name: 'docs'
        };

    }

    injectDependencies(angularApp) {

    }

}