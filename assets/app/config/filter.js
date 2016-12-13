
import {AngularObject} from 'config/angularObject';

export class Filter extends AngularObject
{

    register(angularApp,name,factoryInstance)
    {
          angularApp.filter(factoryName, factoryInstance.config);
    }
}