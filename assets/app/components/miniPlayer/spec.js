import { JasmineSpec } from 'specs/jasmineSpec';
import {miniPlayerController} from 'componentSpec/miniPlayer/controller';

export class Spec extends JasmineSpec {

    constructor() {

        debugger;

        describe("miniPlayer Suite Definition", function() {

            let componentController;

            beforeEach(function() {

               componentController = new miniPlayerController();
            });

            it("Should implement miniPlayerController class", function() {
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

           it("Should implement getTracks method", function () {
                //demonstrates use of custom matcher
                expect(componentController.getTracks).toBeDefined();
            });

            it("Should implement addTrackCollection method", function () {
                //demonstrates use of custom matcher
                expect(componentController.addTrackCollection).toBeDefined();
            });

             it("Should implement addAlbum method", function () {
                //demonstrates use of custom matcher
                expect(componentController.addAlbum).toBeDefined();
            });

            it("Should return a collection of tracks from an specific album", function () {
                //demonstrates use of custom matcher

                let trackCollection = [
                    { duration: 12, preview_url: '', name: '' }
                ];
                let albumId = 1;
                let album =  { id: 1, name: 'blur', uri: 'http://spotify.com', images: [{ height: 650, width: 650, url: '' }]};

                componentController.addAlbum(album);
                componentController.addTrackCollection(albumId, trackCollection);
                expect(componentController.getTracks(albumId)).toEqual(trackCollection);
            });



            it("Should implement playTrack method", function () {
                //demonstrates use of custom matcher
                expect(componentController.playTrack).toBeDefined();
            });


            it("Should implement pauseTrack method", function () {
                //demonstrates use of custom matcher
                expect(componentController.pauseTrack).toBeDefined();
            });


            it("Should implement getCurrentPlayingTrack method", function () {
                //demonstrates use of custom matcher
                expect(componentController.getCurrentPlayingTrack).toBeDefined();
            });

            it("Should support Html5 Audio for play or pause audio events", function () {
                //demonstrates use of custom matcher
                expect(componentController.supportsAudio()).toBe(true);
            });

            it("Should implement trackEnded method", function () {
                //demonstrates use of custom matcher
                expect(componentController.trackEnded).toBeDefined();
            });

            it("Should implement trackPause method", function () {
                //demonstrates use of custom matcher
                expect(componentController.trackEnded).toBeDefined();
            });

             it("Should implement setVolume method", function () {
                //demonstrates use of custom matcher
                expect(componentController.setVolume).toBeDefined();
            });

              it("Should implement isValidVolume method", function () {
                //demonstrates use of custom matcher
                expect(componentController.isValidVolume).toBeDefined();
            });

            
             it("Should have volumen between 0 and 1", function () {
                //demonstrates use of custom matcher
                expect(componentController.isValidVolume(0)).toBe(true);
                expect(componentController.isValidVolume(1)).toBe(true);
                expect(componentController.isValidVolume(2)).toBe(false);
            });

        });

        super();
    }
}