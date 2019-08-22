// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUri: 'http://localhost:3000',
  spotify: {
    clientId: 'a628992500f54598855e50e9af18f12c',
    baseApiUri: 'https://api.spotify.com/v1',
    authUri: 'https://accounts.spotify.com/authorize',
    redirectUri: 'http://localhost:4200/spotifycallback',
    scopes: [
      'playlist-read-private',
      'user-library-read'
    ]
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
