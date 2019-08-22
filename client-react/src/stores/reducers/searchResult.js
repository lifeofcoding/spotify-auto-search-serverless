import {
  BATCH_SEARCH_COMPLETE,
  BATCH_SEARCH_ITEM_COMPLETE,
  BATCH_SEARCH_ITEM_ERROR,
  BATCH_SEARCH_START
} from '../actions/actionTypes';
import { savedState } from '../eums/savedState';

const item = {
  query: 'coldplay paradise',
  success: true,
  error: null,
  id: '1234',
  results: [
    '6nek1Nin9q48AVZcWs9e9D'
  ],
  tracks: {
    '6nek1Nin9q48AVZcWs9e9D': {
      name: 'Paradise',
      artists: ['Coldplay'],
      durationMillis: 278719,
      album: 'Mylo Xyloto',
      imageUrl: 'https://i.scdn.co/image/e7a649b3890dc849e0f1597d6d12b4342e03ce5f',
      uri: 'spotify:track:6nek1Nin9q48AVZcWs9e9D',
      saved: {
        toLibrary: savedState.false,
        toPlaylistUris: []
      }
    }
  }
};

const initialState = {
  inProgress: false,
  complete: false,
  items: [item]
};

function addSearchItem(oldItems, query, results) {
  return oldItems.concat({
    query: query,
    success: true,
    error: null,
    results: results.map(x => ({
      ...x,
      saved: {
        toLibrary: false,
        toPlaylistUris: []
      }
    }))
  });
}

function addSearchItemError(oldItems, query, error) {
  return oldItems.concat({
    query: query,
    success: false,
    results: null,
    error: error
  });
}

export function searchResult(state = initialState, action) {
  switch(action.type) {
    case BATCH_SEARCH_START:
      return {
        ...state,
        inProgress: true,
        complete: false,
        items: []
      };
    case BATCH_SEARCH_COMPLETE:
      return {
        ...state,
        inProgress: false,
        complete: true
      };
    case BATCH_SEARCH_ITEM_COMPLETE:
      return {
        ...state,
        items: addSearchItem(state.items, action.query, action.results)
      };
    case BATCH_SEARCH_ITEM_ERROR:
      return {
        ...state,
        items: addSearchItemError(state.items, action.query, action.error)
      };
    default:
      return state;
  }
}