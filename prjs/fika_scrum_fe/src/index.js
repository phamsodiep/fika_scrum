import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.js';
import stateManager from './controller.js';


ReactDOM.render(
  <Provider store={stateManager.store}>
    <App />
  </Provider>,
  document.getElementById('fika_scrum')
);

