import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import reduxThunk from 'redux-thunk';
import reducer from '../reducer';
import history from '../history';

let enhancer = applyMiddleware(routerMiddleware(history), reduxThunk);

// dev only
if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(enhancer);
}

const store = createStore(reducer, {}, enhancer);

if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

export default store;
