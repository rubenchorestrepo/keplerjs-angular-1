import {AngularObject} from 'config/angularObject';

export class Factory extends AngularObject
{
    register(angularApp,name,factoryInstance)
    {   
       if(!angularApp || !name || !factoryInstance || !factoryInstance.config)
       {
           throw Error("Missing parameters in Factory:register");
       }

        angularApp.factory(name,factoryInstance.config);
    }
}