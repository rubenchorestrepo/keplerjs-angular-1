import { IRoutes } from 'config/IRoutes';

export class Routes extends IRoutes {
    
    getRoutes() {

        let routesPath = window.location.protocol + '//' + window.location.host;
        return angular.element.getJSON(`${routesPath}/routes.json`);
    }

}