# umi-plugin-firebase

Umi plugin for firebase.

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

+---------------------+--------------------+--------------------------------------------+
| name                | type               | default                                    |
+---------------------+--------------------+--------------------------------------------+
| apiKey              | string (optional)  | process.env.FIREBASE_API_KEY               |
| authDomain          | string (optional)  | process.env.FIREBASE_AUTH_DOMAIN           |
| databaseURL         | string (optional)  | process.env.FIREBASE_DATABASE_URL          |
| projectId           | string (optional)  | process.env.FIREBASE_PROJECT_ID            |
| storageBucket       | string (optional)  | process.env.FIREBASE_STORAGE_BUCKET        |
| messagingSenderId   | string (optional)  | process.env.FIREBASE_MESSAGING_SENDER_ID   |
+---------------------+--------------------+--------------------------------------------+
