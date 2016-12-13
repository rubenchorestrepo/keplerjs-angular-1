export class IHttpExtension {

    request() { }

    requestError() { }

    response() { }

    responseError() { }


    constructor() {

        let events = {};

        events.request = this.request;
        events.requestError = this.requestError;
        events.response = this.response;
        events.responseError = this.responseError;

        return events;
    }


}