import { JasmineSpec } from 'specs/jasmineSpec';
import {startController} from 'componentSpec/start/controller';

export class Spec extends JasmineSpec {

    constructor() {

        debugger;

        describe("start Suite Definition", function() {

            let componentController = new startController();

            beforeEach(function() {

               
            });

              it("Should implement startController class", function() {
                expect(componentController).toBeDefined();
            });

            
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