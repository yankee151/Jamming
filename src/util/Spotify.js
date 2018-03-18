import clientId from './secret.js';

const redirectURI = 'http://localhost:3000/'

let accessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (urlAccessToken && urlExpiresIn) {
      accessToken = urlAccessToken[1];
      expiresIn = urlExpiresIn[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      console.log("access token was retrieved");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer: ${accessToken}`
      }
    })
    .then(response => response.json())
    .then(jsonResponse => {
      if (!jsonResponse.tracks) return [];
      return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          url: track.uri
        }
      })
    });
  },

  savePlaylist(name, trackURIs) {
    if (!name || !trackURIs || trackURIs.length === 0) return;
    const headers = {
      Authorization: `Bearer: ${accessToken}`
    }
    let userId = ''
    let playlistId = ''

    fetch(`https://api.spotify.com/v1/me`, {
      headers: headers
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      userId = jsonResponse.id
    }).then(() => {
      fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            uris: trackURIs
          })
        });
      })
    }
}

export default Spotify;
