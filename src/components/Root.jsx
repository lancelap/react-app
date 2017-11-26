import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from './App';
import store from '../store';
import history from '../history';

function Root() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
}

export default Root;
