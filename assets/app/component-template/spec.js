import { JasmineSpec } from 'specs/jasmineSpec';
import {[componentName]Controller} from 'componentSpec/[componentName]/controller';

export class Spec extends JasmineSpec {

    constructor() {

        describe("[componentName] Suite Definition", function() {

            let componentController;

            beforeEach(function() {

                componentController = new [componentName]Controller();

            });

            it("Should implement [componentName]Controller class", function() {
                expect(componentController).toBeDefined();
            });

            
            it("Should be load executeJasmine", function() {
                expect(executeJasmine != null && executeJasmine != undefined).toBe(true);
            });


            it("Should call super function after Jasmine Suites", function() {
                expect(this.jasmineExecuted).not.toBeDefined();
            });
            

        });

        super();
    }
}