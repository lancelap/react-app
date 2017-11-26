import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import counter from './counter';
import auth from './auth';
import articles from './articles';

export default combineReducers({
  counter,
  auth,
  form,
  articles,
  routing: routerReducer,
});
