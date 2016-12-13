import { IHttpExtension } from 'httpExtensions/IHttpExtension';

export class LoaderHttpExtension extends IHttpExtension {

    request() {
        //Show Loader
        let loaderComponent = document.getElementById("loaderComponent");
        
        if (!loaderComponent) {
            let body = document.getElementsByTagName('body')[0];
            loaderComponent = document.createElement("div");
            loaderComponent.setAttribute("id", "loaderComponent");
            let shadow = document.createElement("div");
            shadow.setAttribute("id", "shadow");
            shadow.appendChild(loaderComponent);
            body.appendChild(shadow);

        } else {
            angular.element("#loaderComponent").show();
        }
    }

    response() {
        // Hide loader
        let loaderComponent = angular.element("#shadow");
        if (loaderComponent) {
            loaderComponent.hide();
        }
    }

}