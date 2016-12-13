export class JasmineSpec
{
    constructor()
    {
        
        if (executeJasmine) {
            executeJasmine();
            this.jasmineExecuted = true;
        }
    }
}