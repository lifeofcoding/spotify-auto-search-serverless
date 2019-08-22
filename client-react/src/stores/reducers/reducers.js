import { spotifyAuth } from './spotifyAuth';
import { searchResult } from './searchResult';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  spotifyAuth,
  searchResult
});

export default reducer;