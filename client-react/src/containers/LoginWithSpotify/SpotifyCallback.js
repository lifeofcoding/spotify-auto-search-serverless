import React, { PureComponent } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { spotifyRequestAuth } from '../../stores/actions/spotifyActions';
import * as queryString from 'query-string';
import * as storage from '../../services/storage';
import { connect } from 'react-redux';


class SpotifyCallback extends PureComponent {

  componentDidMount() {
    // Check for code in props
    const {code, state} = queryString.parse(this.props.location.search);
    if (!code || !state || !this.stateIsValid(state)) {
      console.log('Missing code or invalid state');
      return;
    }

    this.props.spotifyRequestAuth(code);
  }

  stateIsValid = (state) => {
    const storedState = storage.get(storage.keys.spotifyState);
    return storedState === state;
  };

  render() {
    const result = this.props.spotifyAuth;
    if (result.success) {
      return <Redirect to="/"/>
    } else if (result.error) {
      return <p>{result.error}</p>
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyAuth: state.spotifyAuth
  }
};

const mapDispatchToProps = {
  spotifyRequestAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SpotifyCallback));