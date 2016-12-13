export class miniPlayerController
{
  constructor()
  {
      console.log("I'm the miniPlayer controller");
  }   


  addAlbum(album){

    if (album.images && album.images.length == 3) {
        album.largePoster = album.images[0].url;
        album.poster = album.images[1].url;
        album.icon = album.images[2].url;
    }

    this.album = album;
  }

  getAlbum()
  {
    return this.album;
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

        if (!trackId || !albumId) {
            throw new Error('Expecting argument: trackId or albumId');
        }

        let track = this.getTrack(trackId, albumId);

        if (!track) {
            throw new Error(`Track not found ${trackId}`);

        } else {

            if (this.supportsAudio() && track.preview_url) {
                debugger;
                this.currentPlayingTrack = new Audio(track.preview_url);
                let audioPromise = this.currentPlayingTrack.play();
                this.currentPlayingTrack.addEventListener('ended', this.trackEnded);
                this.currentPlayingTrack.addEventListener('pause', this.trackPause);
                let context = this;
                audioPromise.then(function(data){
                    if(context.trackLoaded)
                    {
                      context.trackLoaded();
                    }
                });
               
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

    isValidVolume(volume)
    {
      return volume >= 0 && volume <= 1;
    }



    setVolume(volume)
    {
      if(this.isValidVolume(volume))
      {
        if (this.currentPlayingTrack) {

              if (this.supportsAudio()) {
                  this.currentPlayingTrack.volume = volume;
              }
          }

      }
    }

}