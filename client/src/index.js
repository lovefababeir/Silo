import React from 'react';
import ReactDOM from 'react-dom';
// import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);

serviceWorker.unregister();