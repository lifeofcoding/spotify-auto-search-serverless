import axios from 'axios';
import * as Actions from './actionTypes';
import * as Storage from '../../services/storage';
import * as Spotify from '../../services/spotify';

export const spotifyAuthSuccess = tokenDetails => {
  return {
    type: Actions.SPOTIFY_AUTH_SUCCESS,
    tokenDetails
  }
};

const spotifyAuthError = error => {
  return {
    type: Actions.SPOTIFY_AUTH_ERROR,
    error
  }
};

export const spotifyRequestAuth = code => {
  return (dispatch) => {
    const body = {
      code: code
    };
    axios.post('http://localhost:3001/spotify/authorize', body)
      .then(
        response => {
          const tokenDetails = response.data;
          const savedToken = Storage.saveSpotifyToken(tokenDetails);
          if (savedToken) {
            dispatch(spotifyAuthSuccess(savedToken))
          } else {
            dispatch(spotifyAuthError('Unexpected server response. Please notify admin.'));
          }
        },
        error => dispatch(spotifyAuthError('Something went wrong authorizing with Spotify. Please try again.'))
      );
  }
};

const batchSearchItemComplete = (query, results) => {
  return {
    type: Actions.BATCH_SEARCH_ITEM_COMPLETE,
    results: results,
    query: query
  };
};

const batchSearchItemError = (query, err) => {
  return {
    type: Actions.BATCH_SEARCH_ITEM_ERROR,
    error: err,
    query: query
  }
};

const batchSearchComplete = () => {
  return {
    type: Actions.BATCH_SEARCH_COMPLETE
  }
};

export const spotifyDoSearch = (queries) => {
  return (dispatch) => {
    dispatch({type: Actions.BATCH_SEARCH_START, queries: queries});

    const promises = queries.map(q =>
      Spotify.search(q)
        .then(
          results => {
            console.log(results);
            dispatch(batchSearchItemComplete(q, results));
          },
          error => dispatch(batchSearchItemError(q, error))
        )
    );

    Promise.all(promises).then(
      () => dispatch(batchSearchComplete())
    );

  };
};

export const saveTrack = (trackId) => {
  return (dispatch) => {
    dispatch({type: Actions.TRACK_SAVE_START, trackId: trackId});

    Spotify.saveTrack(trackId).then(
      success => {
        console.log('Successfully saved track');
        dispatch({
          type: Actions.TRACK_SAVE_COMPLETE,
          trackId: trackId
        });
      },
      error => {
        console.error('Problem saving track');
        dispatch({
          type: Actions.TRACK_SAVE_ERROR,
          trackId: trackId
        });
      }
    );
  }
};






















