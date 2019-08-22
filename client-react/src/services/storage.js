export const keys = {
  spotifyState: 'SpotifyState',
  spotifyToken: 'SpotifyToken'
};

export function set(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

export function get(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function getSpotifyToken() {
  const token = get(keys.spotifyToken);
  if (token && token.expiresAt) {
    token.expiresAt = new Date(token.expiresAt);
  }
  return token;
}

export function saveSpotifyToken(tokenDetails) {
  if (tokenDetails.accessToken && tokenDetails.expiresIn && tokenDetails.refreshToken) {
    let expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + parseInt(tokenDetails.expiresIn *1000));
    tokenDetails.expiresAt = expiresAt;
    set(keys.spotifyToken, tokenDetails);
    return tokenDetails;
  }
  return null;
}