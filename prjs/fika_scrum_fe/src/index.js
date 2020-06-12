import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.js';
import store from './common/store.js';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('fika_scrum')
);

