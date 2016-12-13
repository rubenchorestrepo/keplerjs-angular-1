import { Factory } from 'config/factory';

export class spotifyService extends Factory {

    config(httpFactory) {
        "ngInject";
        //Define your methods here
        var factory = {};

        factory.searchArtist = function (query) {

            return httpFactory.get('search',
                { q: query, type: 'album' },
                'https://api.spotify.com/v1');
        };

        factory.getTracks = function (albumId) {

            return httpFactory.get('', null, `https://api.spotify.com/v1/albums/${albumId}`);
        };

        factory.getArtist = function (artistId) {

            return httpFactory.get('', null, `https://api.spotify.com/v1/artists/${artistId}`);
        };

        return factory;
    }
}