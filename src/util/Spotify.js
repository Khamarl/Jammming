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
            const redirectUser = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            windows.location = redirectUser;
        }
    }

}

export default Spotify;
