import { SPOTIFY_AUTH_ERROR, SPOTIFY_AUTH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  success: false,
  error: null,
  accessToken: null,
  expiresIn: null,
  refreshToken: null
};

export const spotifyAuth = (state = initialState, action) => {
  switch(action.type) {
    case SPOTIFY_AUTH_SUCCESS:
      return state = {
        ...state,
        success: true,
        accessToken: action.tokenDetails.accessToken,
        refreshToken: action.tokenDetails.refreshToken,
        expiresIn: action.tokenDetails.expiresIn,
        expiresAt: action.tokenDetails.expiresAt
      };
    case SPOTIFY_AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        success: false,
        accessToken: null,
        expiresIn: null,
        refreshToken: null,
        expiresAt: null
      };
    default:
      return state;
  }
};