import { JasmineSpec } from 'specs/jasmineSpec';

export class Spec extends JasmineSpec {

    constructor() {

        debugger;
        
        describe("[componentName] Suite Definition", function() {
           
            it("Should be load executeJasmine", function() {

                //demonstrates use of custom matcher
                expect(executeJasmine != null && executeJasmine != undefined).toBe(true);
            });

              it("Should call super function after Jasmine Suites", function() {
                //demonstrates use of custom matcher
                expect(this.jasmineExecuted).not.toBeDefined();
            });

        });

        super();

    }
}