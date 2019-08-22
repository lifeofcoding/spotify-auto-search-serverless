import React, { Component } from 'react';
import css from './LoginWithSpotify.module.css';
import Button from '../../components/UI/Button';
import * as storage from '../../services/storage'
import { withRouter } from 'react-router-dom';


const uuid = require('uuid/v4');

class LoginWithSpotifyButton extends Component {

  clientId = 'a628992500f54598855e50e9af18f12c';
  redirectUri = 'http://localhost:3000/spotifycallback';

  authUri = 'https://accounts.spotify.com/authorize';
  scopes = [
    'playlist-read-private',
    'user-library-read'
  ];

  loginWithSpotify = (event) => {
    const state = uuid();
    storage.set(storage.keys.spotifyState, state);

    // Redirect to Spotify auth URL
    window.location.href = this.getAuthorizationUri(state);
  };

  getAuthorizationUri = (state) => {
    const queryParams = [
      'client_id=' + this.clientId,
      'response_type=code',
      'redirect_uri=' + this.redirectUri,
      'state=' + state,
      'scope=' + this.scopes.join(' '),
      'show_dialog=true'
    ];
    return encodeURI(this.authUri + '?' + queryParams.join('&'));
  };

  render() {
    return (
      <Button
        large
        className={css.LoginWithSpotifyButton}
        click={this.loginWithSpotify}>
        Login with Spotify
      </Button>
    )
  }
}

export default withRouter(LoginWithSpotifyButton);