import { JasmineSpec } from 'specs/jasmineSpec';
import { docsController } from 'componentSpec/docs/controller';

export class Spec extends JasmineSpec {

    constructor() {

        debugger;

        describe("docs Suite Definition", function () {

            let componentController;

            beforeEach(function () {

                componentController = new docsController();
            });

            it("Should implement docsController class", function () {
                expect(componentController).toBeDefined();
            });


            it("Should be load executeJasmine", function () {

                //demonstrates use of custom matcher
                expect(executeJasmine != null && executeJasmine != undefined).toBe(true);
            });


            it("Should call super function after Jasmine Suites", function () {
                //demonstrates use of custom matcher
                expect(this.jasmineExecuted).not.toBeDefined();
            });

            it("Should define getTableOfContents method", function () {
                //demonstrates use of custom matcher
                expect(componentController.getTableOfContents).toBeDefined();
            });

            it("Should get a table of contents", function () {
                //demonstrates use of custom matcher
                let expectedContent = [{ text: "hello world", target: "target" }];
                componentController.createContent("hello world", "target");

                expect(componentController.getTableOfContents()).toEqual(expectedContent);
            });


        });

        super();
    }
}