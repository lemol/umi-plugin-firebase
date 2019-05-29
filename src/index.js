import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join, relative } from 'path';

export default function (api, opts = {}) {
  const joinPath = path => join(api.paths.tmpDirPath, 'firebase', path);
  const joinAbsPath = path => join(api.paths.absTmpDirPath, 'firebase', path);
  const joinTemplatePath = path => join(__dirname, '../template/umi/firebase', path);

  api.onGenerateFiles(() => {
    const firebasePath = joinPath('');
    const firebaseAbsPath = joinAbsPath('');
    if (!existsSync(firebasePath)) {
      mkdirSync(firebasePath);
    }

    const config = makeConfig(opts);

    if (process.env.NODE_ENV === 'production' && !config.apiKey) {
      api.log.error(`In production 'firebase apiKey option' cannot be null.`);
    }

    const indexPath = joinPath('index.js');
    const templatePath = joinTemplatePath('index.js');

    const indexTemplate = readFileSync(templatePath, 'utf-8');
    const indexContent = !config.apiKey ? '' : indexTemplate
      .replace('<%= Config %>', JSON.stringify(config));

    writeFileSync(indexPath, indexContent);
  });

  api.addEntryImport({
    source: './firebase/index',
  });
}

const defaultOpts = {
  apiKey: process.env.FIREBASE_API_KEY || (process.env.NODE_ENV==='development' ? 'qwertyuiop' : undefined),
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

function makeConfig(opts) {
  return {
    ...defaultOpts,
    ...opts,
  };
}
