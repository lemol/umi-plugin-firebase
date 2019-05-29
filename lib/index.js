"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = require("fs");

var _path = require("path");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(api, opts = {}) {
  const joinPath = path => (0, _path.join)(api.paths.tmpDirPath, 'firebase', path);

  const joinAbsPath = path => (0, _path.join)(api.paths.absTmpDirPath, 'firebase', path);

  const joinTemplatePath = path => (0, _path.join)(__dirname, '../template/umi/firebase', path);

  api.onGenerateFiles(() => {
    const firebasePath = joinPath('');
    const firebaseAbsPath = joinAbsPath('');

    if (!(0, _fs.existsSync)(firebasePath)) {
      (0, _fs.mkdirSync)(firebasePath);
    }

    const config = makeConfig(opts);

    if (process.env.NODE_ENV === 'production' && !config.apiKey) {
      api.log.error(`In production 'firebase apiKey option' cannot be null.`);
    }

    const indexPath = joinPath('index.js');
    const templatePath = joinTemplatePath('index.js');
    const indexTemplate = (0, _fs.readFileSync)(templatePath, 'utf-8');
    const indexContent = !config.apiKey ? '' : indexTemplate.replace('<%= Config %>', JSON.stringify(config));
    (0, _fs.writeFileSync)(indexPath, indexContent);
  });
  api.addEntryImport({
    source: './firebase/index'
  });
  const dependencies = ['firebase'];
  api.addVersionInfo(dependencies.map(pkgName => `${pkgName}@${require(`${pkgName}/package`).version}`));
}

const defaultOpts = {
  apiKey: process.env.FIREBASE_API_KEY || (process.env.NODE_ENV === 'development' ? 'qwertyuiop' : undefined),
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

function makeConfig(opts) {
  return _objectSpread({}, defaultOpts, opts);
}