import { JasmineSpec } from 'specs/jasmineSpec';
import { spotifyController } from 'componentSpec/spotify/controller';

export class Spec extends JasmineSpec {

    constructor() {

        describe("spotify Suite Definition", function () {

            let componentController;

            beforeEach(function () {

                componentController = new spotifyController();
            });

            it("Should implement spotifyController class", function () {
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

            it("Should implement addAlbumCollection method", function () {
                //demonstrates use of custom matcher
                expect(componentController.addAlbumCollection).toBeDefined();
            });

            it("Should implement getAlbums method", function () {
                //demonstrates use of custom matcher
                expect(componentController.getAlbums).toBeDefined();
            });

            it("Should have a albums property", function () {
                //demonstrates use of custom matcher
                expect(componentController.getAlbums()).toBeDefined();
            });

            it("Should return a collection of albums", function () {
                //demonstrates use of custom matcher
                let collection = [
                    { name: 'blur', uri: 'http://spotify.com', images: [{ height: 650, width: 650, url: '' }] }
                ];
                componentController.addAlbumCollection(collection);
                expect(componentController.getAlbums()).toEqual(collection);
            });

            it("Should implement getTracks method", function () {
                //demonstrates use of custom matcher
                expect(componentController.getTracks).toBeDefined();
            });

            it("Should implement addTrackCollection method", function () {
                //demonstrates use of custom matcher
                expect(componentController.addTrackCollection).toBeDefined();
            });

            it("Should return a collection of tracks from an specific album", function () {
                //demonstrates use of custom matcher

                let trackCollection = [
                    { duration: 12, preview_url: '', name: '' }
                ];
                let albumId = 1;
                let albumCollection = [
                    { id: 1, name: 'blur', uri: 'http://spotify.com', images: [{ height: 650, width: 650, url: '' }] }
                ];

                componentController.addAlbumCollection(albumCollection);
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

              it("playTrack method Should return a promise (this test will execute the song ;) )", function () {
                //demonstrates use of custom matcher
                let trackCollection = [
                    { duration: 12, preview_url: 'https://p.scdn.co/mp3-preview/183c0855e94b58dcb267e2b0721d4a3c99260acf', name: '', id: 1 }
                ];
                let albumId = 1;
                let albumCollection = [
                    { id: 1, name: 'blur', uri: 'http://spotify.com', images: [{ height: 650, width: 650, url: '' }] }
                ];

                componentController.addAlbumCollection(albumCollection);
                componentController.addTrackCollection(albumId, trackCollection);
                expect(componentController.playTrack(1,1).then).toBeDefined();
            });


        });

        super();
    }
}