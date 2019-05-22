# umi-plugin-firebase

[![NPM version](https://img.shields.io/npm/v/umi-plugin-firebase.svg?style=flat)](https://npmjs.org/package/umi-plugin-firebase)

Umi plugin for firebase.

## Install

```bash
yarn add --dev umi-plugin-firebase # OR npm install --save-dev umi-plugin-firebase
```

## Use

Just setup the plugin on `.umirc.js`

```js
export default {
  plugins: [
    // ...
    ['umi-plugin-firebase', {
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
    }],
    // ...
  ],
}
```

## Options

| name                | type                             | default                                      |
|---------------------|----------------------------------|----------------------------------------------|
| apiKey              | string (required in production)  | `process.env.FIREBASE_API_KEY`               |
| authDomain          | string (optional)                | `process.env.FIREBASE_AUTH_DOMAIN`           |
| databaseURL         | string (optional)                | `process.env.FIREBASE_DATABASE_URL`          |
| projectId           | string (optional)                | `process.env.FIREBASE_PROJECT_ID`            |
| storageBucket       | string (optional)                | `process.env.FIREBASE_STORAGE_BUCKET`        |
| messagingSenderId   | string (optional)                | `process.env.FIREBASE_MESSAGING_SENDER_ID`   |

### How to use

After you configure the plugin, you are able to use `firebase app` as usual. But this time you don't need to `initializeApp` your app:

```js
import app from 'firebase/app';

auth = app.auth();
```
