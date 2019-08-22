export type SpotifySearchResult = SpotifyPagingObject<SpotifyTrack>;

interface SpotifyPagingObject<T> {
  items: T[];
}

interface SpotifyTrack {
  artists: SpotifyArtistSimplified[];
  duration_ms: number;
  uri: string;
  name: string;
  preview_url: string;
}

interface SpotifyArtistSimplified {
  name: string;
  uri: string;
}

interface SpotifyAlbumSimplified {
  name: string;
  images: SpotifyImage[];
}

interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}
