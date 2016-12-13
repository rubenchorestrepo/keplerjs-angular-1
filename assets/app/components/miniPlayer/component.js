import { Component } from 'config/component';
import {miniPlayerController} from 'components/miniPlayer/controller';
import { spotifyService } from 'components/spotify/service';
import 'components/miniPlayer/style.css';

export class miniPlayer extends Component
{
    miniPlayerController($scope, appConfig, app, componentLoader, PubSub, $state, spotifyService,$interval)
    {
        "ngInject";
        //miniPlayer  controller logic. (Controller logic should be outside of angular controller).
        let componentController = new miniPlayerController();
     
        

        /*  Load this component inside another component view:
            import {miniPlayer} from 'components/miniPlayer/component'; (This line should be on the top of the component file)
            componentLoader.initialize(miniPlayer,$scope); This will initialize the imported component
            Inside your view in order to load the async component you have to do the following:
         
            <div oc-lazy-load="miniPlayerLazyLoad"> <miniPlayer></miniPlayer></div>

            To view the component controller test results go to /specs/miniPlayer/specRunner.html
        */
        $scope.component = {
            name: 'miniPlayer',
            state: 'miniPlayer'
        };

        $scope.volume = 1;

        $scope.$watch("volume",function(newValue,oldValue){

           componentController.setVolume(newValue);
        });

        componentController.trackLoaded = function(){
          
          console.log("Track loaded");
        };

        PubSub.publish('component_miniPlayer_Loaded');

        function apply(expression) {
            $scope.$apply(() => typeof expression == 'function' ? expression() : null); 
        }

        if($state.params && $state.params.albumId)
        {
             let albumId = $state.params.albumId;
             spotifyService.getTracks(albumId)
                .then(function (response) {
                    let data = response.data;
                    if (data && data.tracks && data.tracks.items) {
                        debugger;
                        let album = {id: albumId, images:data.images, name: data.name};
                        componentController.addAlbum(album);
                        componentController.addTrackCollection(albumId, data.tracks.items);
                        $scope.album = album;
                        apply(() => album.tracks = componentController.getTracks(albumId));
                    }
                });
        }


        $scope.back = function(){
            componentController.pauseTrack();
            $state.go('spotify');
        };

         $scope.playTrack = function ($event, album, track) {

            $event.preventDefault();
            let currentPlayingTrack = componentController.getCurrentPlayingTrack();
            album.playingSong = !album.playingSong;
            track.playingSong = !track.playingSong;
            var playerInterval;

            if (!album.playingSong) {
                componentController.pauseTrack();
                album.counter  = 0;

            } else if (!currentPlayingTrack) {

                //TODO: Improve this logic here.
                album.counter = 0;
                $scope.volume = 1;
                componentController.playTrack(track.id, album.id);
                let limit = 300;
                let timeCounter = 0;

                 playerInterval = $interval(function () {

                    if (timeCounter <= limit && album.playingSong) {
                       timeCounter += 1;
                       album.counter += 1;

                    } else {
                        album.counter  = 0;
                        timeCounter = 0;
                        $interval.cancel(playerInterval);
                    }

                }, 100);


            } else {
                album.playingSong = false;
                track.playingSong = false;
            }
        };


        function getArtist(artistId)
        {
             spotifyService.getArtist(artistId)
                .then(function (data) {
                    if (data) {
                       
                        
                       
                    }
                });
        }

    }

    lazyLoad()
    {

        return [
            super.getTemplateUrl("components/miniPlayer/view.html")
        ];
    }

    getComponentDefinition()
    {

        return {
            templateUrl: super.getTemplateUrl("components/miniPlayer/view.html"),
            controller: this.miniPlayerController,
            name: 'miniPlayer'
        };

    }

    injectDependencies(angularApp)
    {
        new spotifyService(angularApp);
    }

}