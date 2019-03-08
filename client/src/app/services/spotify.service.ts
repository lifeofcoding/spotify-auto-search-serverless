import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { SpotifyAccessToken } from '../models/spotify-access-token.model';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  public authorized$ = new BehaviorSubject<boolean>(null);

  private localStorageKey = 'authorizedSpotify';
  private localStorageRef = sessionStorage;

  private accessToken: string;
  private expiry: Date;

  constructor(private apiService: ApiService,
              private httpClient: HttpClient) {
    this.checkAuthorization();


  }

  private checkAuthorization() {
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
    const savedState = sessionStorage.getItem('spotifyState');
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
    this.accessToken = token.accessToken;

    // Refresh 60 seconds early to prevent edge cases
    this.expiry = new Date();
    this.expiry.setSeconds(this.expiry.getSeconds() + token.expiresIn - 60);

    this.localStorageRef.setItem(this.localStorageKey, 'true');
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
    return !!(token && token.accessToken && token.expiresIn);
  }

  // Ask our server for a new Spotify access token
  private async refreshAccessToken() {
    const token = await this.apiService.get<SpotifyAccessToken>('/spotify/refresh').toPromise();

    // Check required fields are present and save
    if (!this.accessTokenIsValid(token)) {
      return;
    }

    this.saveAccessToken(token);
  }

  private uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  private async get<ReturnType>(endpoint: string): Promise<ReturnType> {
    const response = await this.httpClient.get<ReturnType>(this.getUrl(endpoint)).toPromise();
    return response;
  }

  private getUrl(endpoint: string) {
    return environment.spotify.baseApiUri + endpoint;
  }

}
