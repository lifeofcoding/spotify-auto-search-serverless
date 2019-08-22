import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { SpotifyAccessToken } from '../dtos/spotify-access-token.model';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { AccessToken } from '../models/access-token.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  public authorized$ = new BehaviorSubject<boolean>(null);

  private tokenStorageKey = 'spotifyToken';
  private stateStorageKey = 'spotifyState';

  constructor(private apiService: ApiService,
              private storageService: StorageService,
              private httpClient: HttpClient) {
    this.checkAuthorization();
  }

  private checkAuthorization() {
    console.log('Check authorization');
    const accessToken: AccessToken = this.storageService.get(this.tokenStorageKey);
    accessToken.expiry = new Date(accessToken.expiry);
    const authorized = accessToken && accessToken.accessToken && accessToken.expiry && accessToken.expiry > new Date();
    this.authorized$.next(authorized);
  }


  /**
   * Opens the Spotify authorization page to allow the user to connect their Spotify account
   */
  public triggerAuthorizationFlow() {
    window.location.href = this.getAuthorizationUri();
  }


  /**
   * Compare received state from spotify callback with state stored in session storage
   * @param newState State value to compare with stored state
   */
  public validateState(newState: string): boolean {
    const savedState = sessionStorage.getItem(this.stateStorageKey);
    return savedState === newState;
  }

  /**
   * Validate authorization code with server and exchange for an Access Token
   * @param code Authorization code provided by Spotify during the auth flow
   */
  public async authorizeWithCode(code: string) {
    const token = await this.authorizeSpotifyWithServer(code);
    this.saveAccessToken(token);
  }


  private async authorizeSpotifyWithServer(authCode: string): Promise<SpotifyAccessToken> {
    const response = await this.apiService.post<SpotifyAccessToken>('/spotify/authorize', {code: authCode}).toPromise();

    // Check required fields are present and save
    if (!this.accessTokenIsValid(response)) {
      return null;
    }

    return response;
  }

  private saveAccessToken(token: SpotifyAccessToken) {
    // Refresh 60 seconds early to prevent edge cases
    const expiry = new Date();
    expiry.setSeconds(expiry.getSeconds() + token.expiresIn - 60);

    const tokenToSave: AccessToken = {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      expiry: expiry
    };

    this.storageService.set(this.tokenStorageKey, tokenToSave);
    this.authorized$.next(true);
  }

  private getAuthorizationUri() {
    const env = environment.spotify;
    const queryParams = [
      'client_id=' + env.clientId,
      'response_type=code',
      'redirect_uri=' + env.redirectUri,
      'state=' + this.generateAndSaveState(),
      'scope=' + env.scopes.join(' '),
      'show_dialog=true'
    ];
    return encodeURI(env.authUri + '?' + queryParams.join('&'));
  }

  private generateAndSaveState() {
    const state = this.uuid();
    sessionStorage.setItem('spotifyState', state);
    return state;
  }

  private accessTokenIsValid(token: SpotifyAccessToken): boolean {
    return !!(token && token.accessToken && token.expiresIn && token.refreshToken);
  }

  // Ask our server for a new Spotify access token
  // private async refreshAccessToken() {
  //   const token = await this.apiService.get<SpotifyAccessToken>('/spotify/refresh').toPromise();
  //
  //   // Check required fields are present and save
  //   if (!this.accessTokenIsValid(token)) {
  //     return;
  //   }
  //
  //   this.saveAccessToken(token);
  // }

  private uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private async get<ReturnType>(endpoint: string, queryStringParams: any = {}): Promise<ReturnType> {
    let queryString = '';
    Object.keys(queryStringParams).forEach(key => {
      queryString += (!!queryString.length ? '&' : '') + key + '=' + encodeURI(queryStringParams[key]);
    });
    const response = await this.httpClient.get<ReturnType>(this.getUrl(endpoint + queryString)).toPromise();
    return response;
  }

  private getUrl(endpoint: string) {
    return environment.spotify.baseApiUri + endpoint;
  }

}
