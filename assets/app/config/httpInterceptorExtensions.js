import {LoaderHttpExtension} from 'httpExtensions/loaderHttpExtension';

export class HttpInterceptorExtensions {

    constructor() {
       
        return [new LoaderHttpExtension()];
    }


}