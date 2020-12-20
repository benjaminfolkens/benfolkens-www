import 'url-polyfill';

import React from 'react';
import { render } from 'react-dom';

import './index.css';

import App from './components/app';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const runtime = require('react-refresh/runtime');
  runtime.injectIntoGlobalHook(window);
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => (type) => type;
}

const root = document.getElementById('root');

render(<App />, root);
