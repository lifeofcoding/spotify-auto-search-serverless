import React, { Component } from 'react';
import css from './App.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SpotifyCallback from './containers/LoginWithSpotify/SpotifyCallback';
import Home from './containers/Home/Home';
import * as storage from './services/storage';
import { spotifyAuthSuccess } from './stores/actions/spotifyActions';
import { connect } from 'react-redux';
import Results from './containers/BatchSearch/Results/Results';

class App extends Component {

  componentDidMount() {
    this.checkSpotifyAuthState();
  }

  checkSpotifyAuthState() {
    const tokenDetails = storage.getSpotifyToken();
    if (tokenDetails && tokenDetails.expiresAt && tokenDetails.expiresAt > new Date()) {
      this.props.spotifyAuthSuccess(tokenDetails);
    }
  };

  render() {
    return (
      <div className={css.App}>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/results" component={Results} />
            <Route path="/spotifycallback" component={SpotifyCallback} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = {
  spotifyAuthSuccess
};


export default connect(null, mapDispatchToProps)(App);
