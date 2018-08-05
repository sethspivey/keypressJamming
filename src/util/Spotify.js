let accessToken = '';
const client_id = '23c4d478eaf64687a8067d9175f72098';
const redirectURI = 'https://sgspiveyjamming.surge.sh/';

const Spotify = {

  getAccessToken() {
    if(accessToken !== '') {
      return accessToken;
    } else {
        const URLAccessToken = window.location.href.match(/access_token=([^&]*)/)
        const URLExpiration = window.location.href.match(/expires_in=([^&]*)/)
      if (URLAccessToken && URLExpiration) {
        accessToken = URLAccessToken[1];
        const expiration = Number(URLExpiration[1]);
        window.setTimeout(() => accessToken = '', expiration * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
      } else {
        window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      }
    }
  },

  search(term) {
    const curAccessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${curAccessToken}`}
    }).then( response => {
      return response.json();
    }).then( jsonResponse => {
      return jsonResponse.tracks.items.map(track => {
        return ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          albumArt: track.album.images[0].url,
          uri: track.uri,
          preview_url: track.preview_url,
          duration: track.duration_ms,
          explicit: track.explicit
        })
       });
    })
  },
savePlaylist(playlistName, URIs) {
      if (!playlistName || !URIs) {
        return;
       }

      const curAccessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${curAccessToken}`}

      return fetch('https://api.spotify.com/v1/me',{
        headers: headers,
        responseType: 'json'
      }).then( response => {
        return response.json();
      }).then( jsonResponse => {
        return jsonResponse.id
      }).then(userID => {
        fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
          method: 'post',
          headers: {
            Authorization: `Bearer ${curAccessToken}`,
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            name: playlistName
          })
        }).then( response => {
          return response.json();
        }).then( jsonResponse => {
          return jsonResponse.id
        }).then( playlistID => {
          fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
            method: 'post',
            headers: {
              Authorization: `Bearer ${curAccessToken}`,
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({
              uris: URIs
            })
          }).then( response => {
            return response.json();
          }).then( jsonResponse => {
            playlistID = jsonResponse.snapshot_id
          })
        })
      })

  }

};

export default Spotify;
