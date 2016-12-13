import {Factory} from 'config/factory';

export class ServiceImagen extends Factory
{
    config(httpFactory)
    {
        "ngInject";
        
        return {

            getImagen : function(){

                 return httpFactory.get('users/degrammer',
                 null
                 ,'https://api.github.com');
            }
        };
        
    }
}