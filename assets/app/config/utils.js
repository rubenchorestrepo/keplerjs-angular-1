export class Utils
{
    static join(joinElement,...elements)
    {
       if(Array.isArray(elements))
       {
           return elements.join(joinElement);
       }else{
           throw 'Array expected on Utils.join';
       }
    }
}