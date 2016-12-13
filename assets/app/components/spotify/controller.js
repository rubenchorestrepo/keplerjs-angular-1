export class spotifyController {
    constructor() {
        this.albums = this.albums ? this.albums : [];
        console.log("I'm the spotify controller");
    }

    addAlbumCollection(albums) {

        albums.map(function(item) {
            if (item.images && item.images.length == 3) {
                item.largePoster = item.images[0].url;
                item.poster = item.images[1].url;
                item.icon = item.images[2].url;
            }
        });

        this.albums = albums;

    }

    getAlbums() {
        return this.albums;
    }


    getAlbum(albumId) {

        for (let i = 0; i < this.albums.length; i++) {
            if (this.albums[i].id == albumId) {
                return this.albums[i];
            }
        }

        return null;
    }

    getTracks(albumId) {
        if (!albumId) {
            throw new Error('Expecting album identifier');
        }

        let album = this.getAlbum(albumId);

        if (!album || !album.tracks) {
            throw new Error('Call addTrackCollection first in order to get tracks!');
        } else {

            return album.tracks;
        }

    }

    addTrackCollection(albumId, tracks) {
        if (!albumId) {
            throw new Error('Expecting argument: albumId');
        }

        let album = this.getAlbum(albumId);

        if (album) {
            album.tracks = tracks;
        }
    }

    getTrack(trackId, albumId) {
        let album = this.getAlbum(albumId);

        if (!album) {

            throw new Error(`Album not found ${albumId}`);
        }


        for (let i = 0; i < album.tracks.length; i++) {
            if (album.tracks[i].id == trackId) {
                return album.tracks[i];
            }
        }

        return null;

    }

    playTrack(trackId, albumId) {
        debugger;
        if (!trackId || !albumId) {
            throw new Error('Expecting argument: trackId or albumId');
        }

        let track = this.getTrack(trackId, albumId);

        if (!track) {
            throw new Error(`Track not found ${trackId}`);

        } else {

            if (this.supportsAudio() && track.preview_url) {
                this.currentPlayingTrack = new Audio(track.preview_url);
                let playerPromise = this.currentPlayingTrack.play();
                this.currentPlayingTrack.addEventListener('ended', this.trackEnded);
                this.currentPlayingTrack.addEventListener('pause', this.trackPause);
                return playerPromise;
                
            }

        }
    }

    supportsAudio() {
        return Audio != null;
    }

    getCurrentPlayingTrack() {
        return this.currentPlayingTrack;
    }

    pauseTrack() {

        if (this.currentPlayingTrack) {

            if (this.supportsAudio()) {

                this.currentPlayingTrack.pause();
                this.currentPlayingTrack = null;
            }
        }
    }


    trackEnded() {
        this.currentPlayingTrack = null;
    }

    trackPause() {


    }

}