import axios from 'axios';
import { store } from '../stores/store';

const baseApiUrl = 'https://api.spotify.com/v1/';
const endpoints = {
  search: 'search',
  saveTrack: 'me/tracks'
};

function getAccessToken() {
  const tokenDetails = store.getState().spotifyAuth;

  if (!(tokenDetails.success && tokenDetails.accessToken && tokenDetails.expiresAt)) {
    throw Error('No Spotify access token found in store');
  }

  if (tokenDetails.expiresAt < new Date()) {
    // TODO dispatch spotify auth error state here
    throw Error('Spotify access token expired')
  }

  return tokenDetails.accessToken;
}

export async function search(searchTerm) {
  const request = {
    url: baseApiUrl + endpoints.search,
    method: 'get',
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    },
    params: {
      q: searchTerm,
      type: 'track',
      limit: 3
    },
  };

  try {
    const response = await axios.request(request);
    return processTrackSearchResponse(response.data);
  } catch {
    throw Error(`Error performing search for query "${searchTerm}"`);
  }
}

function processTrackSearchResponse(responseData) {
  // Validate data
  if (!(responseData.tracks && responseData.tracks.items)) {
    throw Error('Spotify search response format not recognised')
  }

  return responseData.tracks.items.map(x => {
    return {
      artists: x.artists.map(a => a.name),
      album: x.album.name,
      imageUrl: x.album.images.length > 0 ? x.album.images[0].url : null,
      durationMillis: x.duration_ms,
      name: x.name,
      uri: x.uri,
      id: x.id
    };
  });
}

export async function saveTrack(trackId) {
  const request = {
    url: baseApiUrl + endpoints.search,
    method: 'put',
    headers: {
      Authorization: 'Bearer ' + getAccessToken()
    },
    params: {
      ids: trackId,
    }
  };

  try {
    await axios.request(request);
  } catch {
    throw Error('Error saving track');
  }


}