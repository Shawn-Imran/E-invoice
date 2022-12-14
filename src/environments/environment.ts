// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.dfsa

export const environment = {
  production: false,
  // apiBaseLink: 'https://v2.api.felnatech.com',
  // ftpBaseLink: 'https://ftp.felnatech.com',
  apiBaseLink: 'http://localhost:3001',
  ftpBaseLink: 'http://localhost:3001',
  appBaseUrl: '/',
  userBaseUrl: '/account',
  userLoginUrl: '/login',
  adminLoginUrl: 'admin/login',
  adminBaseUrl: 'admin',
  storageSecret: 'SOFT_2021_AI_1998',
  adminTokenSecret: 'SI_ADMIN_1995_&&_SHAWN_dEv',
  userTokenSecret: 'SI_ADMIN_1996_&&_IMRAN_dEv',
  apiTokenSecret: 'SI_API_1998_&&_IMRAN_dEv',
  sslIpnUrl: 'https://v2.api.felnatech.com/api/payment-ssl/ipn',
  firebaseConfig: {
    apiKey: 'AIzaSyCtwO_4F74Eo6fmRA6W56dM6gRhUAGEOiU8',
    authDomain: 'felnatech-23467.firebaseapp.com',
    projectId: 'felnatech-23467',
    storageBucket: 'felnatech-23467.appspot.com',
    messagingSenderId: '91313515434',
    appId: '1:91313515423:web:7e8406f5216c6926652baaa',
    measurementId: 'G-G102PDVQQ6Q',
  },
  VERSION: 5,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
