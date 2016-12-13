import {Factory} from 'config/factory';

export class testingThisService extends Factory
{

    config(httpFactory)
    {
        "ngInject";
         //Define your methods here
         var factory = {};
         return factory;
    }
}