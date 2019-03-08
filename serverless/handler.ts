import {APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult, Context} from 'aws-lambda';
import { environment } from "./environment";
import {Options, RequestPromise} from "request-promise-native";

import * as request from 'request-promise-native';
import {SpotifyAuthResponse} from "./models/spotify-auth-response";

export const hello: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {

    const authCode = JSON.parse(event.body).code;
    if (!authCode) {
        return badRequest('Authorization code required')
    }

    const base64Creds = Buffer
        .from(environment.spotify.clientId + ':' + environment.spotify.clientSecret)
        .toString('base64');

    const options: Options = {
        method: 'GET',
        uri: 'http://localhost:64099/api/v2/account/profile',
        form: {
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: environment.spotify.redirectUri
        },
        headers: {
            'Authorization': 'Basic ' + base64Creds
        },
        json: true
    };

    try {
        const result: SpotifyAuthResponse = await request.get(options);
        return ok(result);
    } catch(e) {
        console.log('Encountered an error');
        return internalError({ message: "Error authenticating with Spotify", statusCode: e.response.statusCode});
    }
};

// Handy response functions

const ok = (body = null) => respond(200, body);
const internalError = (body = null) => respond(500, body);
const badRequest = (body = null) => respond(400, body);

function respond(statusCode: number, body: any = null) {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
    };
}