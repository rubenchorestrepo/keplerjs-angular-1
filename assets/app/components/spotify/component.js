import { Component } from 'config/component';
import { spotifyController } from 'components/spotify/controller';

import { spotifyService } from 'components/spotify/service';
import 'components/spotify/style.css';

export class spotify extends Component {
    spotifyController($scope, appConfig, app, componentLoader, PubSub, spotifyService, $interval, $state) {
        "ngInject";
        //spotify  controller logic. (Controller logic should be outside of angular controller).
        let componentController = new spotifyController();
        $scope.artist = {};
        /*  Load this component inside another component view:
            import {spotify} from 'components/spotify/component'; (This line should be on the top of the component file)
            componentLoader.initialize(spotify,$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="spotifyLazyLoad"> <spotify></spotify></div>

            To view the component controller test results go to /specs/spotify/specRunner.html
        */
        $scope.component = {
            name: 'spotify',
            state: 'spotify'
        };

        $scope.back = function() {
            componentController.pauseTrack();
            $state.go('start');
        };

        PubSub.publish('component_spotify_Loaded');

        function apply(expression) {
            $scope.$apply(() => typeof expression == 'function' ? expression() : null);
        }

        $scope.searchArtist = function($event) {
            $event.preventDefault();
            spotifyService.searchArtist($scope.artist.name)
                .then(function(response) {
                    let data = response.data;
                    if (data && data.albums && data.albums.items) {
                        componentController.addAlbumCollection(data.albums.items);
                        $scope.results = componentController.getAlbums();
                    }
                });
        };

        $scope.getTracks = function($event, album) {
            $event.preventDefault();
            spotifyService.getTracks(album.id)
                .then(function(response) {
                    let data = response.data;
                    if (data && data.tracks && data.tracks.items) {
                        componentController.addTrackCollection(album.id, data.tracks.items);
                       album.tracks = componentController.getTracks(album.id);
                    }
                });
        };


        $scope.playTrack = function($event, album, track) {

            $event.preventDefault();
            let currentPlayingTrack = componentController.getCurrentPlayingTrack();
            track.playingSong = !track.playingSong;
            var playerInterval;

            if (!track.playingSong) {
                componentController.pauseTrack();
                track.counter = 0;

            } else if (!currentPlayingTrack) {

                track.counter = 0;
                track.loadingSong = true;
                let playerPromise = componentController.playTrack(track.id, album.id);

                playerPromise.then(function() {

                    track.loadingSong = false;
                    let rate = ((window.innerWidth * 100) / 300) / 100;
                    let limit = 300;
                    let timeCounter = 0;

                    playerInterval = $interval(function() {

                        if (timeCounter <= limit && track.playingSong) {
                            timeCounter += 1;
                            track.counter += rate;

                        } else {
                            track.counter = 0;
                            timeCounter = 0;
                            $interval.cancel(playerInterval);
                        }

                    }, 100);


                });

            } else {
                track.playingSong = false;
            }
        };

        componentController.trackEnded = function() {

        };


    }

    lazyLoad() {

        return [
            super.getTemplateUrl("components/spotify/view.html")
        ];
    }

    getComponentDefinition() {

        return {
            templateUrl: super.getTemplateUrl("components/spotify/view.html"),
            controller: this.spotifyController,
            name: 'spotify'
        };

    }

    injectDependencies(angularApp) {
        new spotifyService(angularApp);
    }

}