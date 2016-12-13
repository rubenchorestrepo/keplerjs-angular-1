
export class AngularObject
{

    constructor(angularApp)
    {
        this.create(angularApp,this);
    }

    create(angularApp, factory)
    {
        if(angularApp && factory)
        {
            var factoryInstance = null;

            if(typeof factory == 'function')
            {
                factoryInstance = new factory();
                
            }else
            {
                factoryInstance = factory;
            }

            if(!factoryInstance.config)
            {
                throw 'config method is required in order to create the factory';
            }
            debugger;
            let factoryName = this.formatFactoryName(factoryInstance.constructor.name);

            if(this.register)
            {
                this.register(angularApp,factoryName, factoryInstance);
                
                console.log('Factory Created:' + factoryName);

                return factoryInstance;

            }else
            {
                throw Error('You must implement register method');
            }

           
        }
       
    }

    formatFactoryName(name)
    {
        var firstLetter = name.substring(0,1);

        name = name.replace(firstLetter,firstLetter.toLowerCase());

        return name;

    }

}