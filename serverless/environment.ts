import { secrets } from "./secrets";

export const environment = {
    spotify: {
        clientId: 'a628992500f54598855e50e9af18f12c',
        clientSecret: secrets.spotifyClientSecret,
        redirectUri: 'http://localhost:4200/spotifycallback',
        tokenUri: 'https://accounts.spotify.com/api/token'
    }
}