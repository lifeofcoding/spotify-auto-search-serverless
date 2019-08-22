import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { environment } from "../environment";
import { badRequest, internalError, ok } from "../utils/lambda-http-utils";
import { AuthResponse } from "../models/auth-response";
import axios from 'axios';
import { SpotifyAuthCodeResponse } from "../models/spotify-auth-code-response";

const querystring = require('querystring');

export const authorize: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
    const authCode = JSON.parse(event.body).code;
    if (!authCode) {
        return badRequest({error: 'Authorization code required'});
    }

    const base64Creds = Buffer
        .from(environment.spotify.clientId + ':' + environment.spotify.clientSecret)
        .toString('base64');

    const config = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: environment.spotify.redirectUri
        }),
        headers: {
            'Authorization': 'Basic ' + base64Creds
        },
        responseType: 'json'
    };

    try {
        const result = await axios.request<SpotifyAuthCodeResponse>(config);

        const response: AuthResponse = {
            accessToken: result.data.access_token,
            expiresIn: result.data.expires_in,
            refreshToken: result.data.refresh_token
        };
        return ok(response);
    } catch(e) {
        console.log('Error authenticating. Code: ' + authCode);
        if (e.response) {
            return internalError({ error: "Spotify returned an error when getting access token", debug: { statusCode: e.response.status, message: e.response.data }});
        } else if (e.request) {
            return internalError({ error: "Error making request to Spotify", debug: e.request });
        } else {
            return internalError({ error: "Unexpected error", debug: e.message});
        }
    }
};