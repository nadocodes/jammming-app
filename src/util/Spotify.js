const clientID = `${process.env.REACT_APP_SPOTIFY_CLIENT_ID}`;
const redirectUri = 'http://localhost:3000/';
// const redirectUri = 'https://pushplaylisten.netlify.app';
let accessToken;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessURL;
        }
    },

    async search(term) {
        if (!accessToken) {
            accessToken = Spotify.getAccessToken();
        }
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri,
            cover: track.album.images[2].url,
            audio: track.preview_url
        }));
    },

    savePlaylist(playlistName, trackUris, id) {
        if (!playlistName || !trackUris.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        let userID;
        return fetch('https://api.spotify.com/v1/me', {
            headers: headers
        }).then (response => response.json()
        ).then (jsonResponse => {
            userID = jsonResponse.id;
            if (id) {
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${id}`, {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({name: playlistName})
                }).then (() => {
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${id}/tracks`, {
                        headers: headers,
                        method: 'PUT',
                        body: JSON.stringify({uris: trackUris})
                    })
                })
            } else {
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: playlistName})
                }).then (response => response.json()
                ).then (jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({uris: trackUris})
                    })
                })
            }
        })
    },

    async currentUser() {       
        if (!accessToken) {
            accessToken = Spotify.getAccessToken();
        }

        let userID;
        let userName;
        let userImage;
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        userName = jsonResponse.display_name ? jsonResponse.display_name : jsonResponse.id ;
        userImage = jsonResponse.images[0].url ? jsonResponse.images[0].url : 'https://i.imgur.com/8Q9QY7q.png';
        return {
            id: userID,
            name: userName,
            image: userImage,
        };
    },

    async getPlaylists() {
        if (!accessToken) {
            accessToken = Spotify.getAccessToken();
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        let userID;
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: headers
        });
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            headers: headers,
            method: "GET",
        });
        const jsonResponse_1 = await response_1.json();
        if (!jsonResponse_1.items) {
            return [];
        }
        return jsonResponse_1.items.map((playlist) => ({
            playlistName: playlist.name,
            playlistId: playlist.id,
            playlistImage: playlist.images[0] ? playlist.images[0].url : 'https://i.imgur.com/8Q9QY7q.png',
        }));
    },

    async getPlaylist(playlistId) {
        if (!accessToken) {
            accessToken = Spotify.getAccessToken();
        }
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: "GET",
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.items) {
            return [];
        }
        return jsonResponse.items.map((track) => ({
            id: track.track.id,
            name: track.track.name,
            artist: track.track.artists[0].name,
            album: track.track.album.name,
            uri: track.track.uri,
            cover: track.track.album.images[2].url,
            audio: track.track.preview_url
        }));
    }
};

export default Spotify;