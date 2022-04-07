

const clientId ='b8adf04d4dc24a63be4e8e45e50ce691';
const redirectUri="http://localhost:3000/";
let accessToken;
const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        //This set of code retrieves access token and expiration time from Url
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiryToken = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiryToken ) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiryToken[1]);
            //this next part clears parameters so that a new access token can be retrieved
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken; 
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {
            Authorisation: `Bearer ${accessToken}` 
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if(!jsonResponse.tracks) {
            return []
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
        name: track.name,
        artist: track.artist[0].name, 
        album: track.album.name,
        uri: track.uri
        }));
        
    });

    },
    // POST method creates and saves new playlist by fetching users id using spotify playlist endpoints 
    savePlaylist(playlistName, trackUris) {
        if(playlistName || trackUris.length ) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorisation: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me', {headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {

            headers: headers,
            method: 'POST',
            body: JSON.stringify({playlistName: playlistName})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
                //.then(response => response.json()
                //).then(jsonResponse => {
                 //   playlistId = jsonResponse.id
               // })
            })
        })
    }
}
       
    

    



export default Spotify;
