import React, { Component } from 'react';
import css from './Home.module.css';
import LoginWithSpotifyButton from '../LoginWithSpotify/LoginWithSpotifyButton';
import { connect } from 'react-redux';
import BatchSearch from '../BatchSearch/BatchSearch';

class Home extends Component {
  render() {
    return (
      <div className={css.App}>
        { this.props.spotifyAuth.success ? <BatchSearch /> : <LoginWithSpotifyButton/> }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spotifyAuth: state.spotifyAuth
  }
};

export default connect(mapStateToProps)(Home);
