import { Record, OrderedMap } from 'immutable';
import { START, SUCCESS, FAIL, LOAD_ARTICLES, DELITE_ARTICLE } from '../actionTypes';
import { fromJSOrdered } from '../helpers';


const ReducerState = Record({
  loading: false,
  loaded: false,
  entities: new OrderedMap({}),
});

const defaulState = new ReducerState();

export default (state = defaulState, action) => {
  const { type, response } = action;
  switch (type) {
    case LOAD_ARTICLES + SUCCESS:
      return state
        .set('entities', fromJSOrdered(response))
        .set('loading', false)
        .set('loaded', true);
    case LOAD_ARTICLES + START:
      return state.set('loading', true);
    case LOAD_ARTICLES + FAIL:
      return state
        .set('loading', false)
        .set('loaded', false);
    case DELITE_ARTICLE:
      return state
        .set('loading', false)
        .set('loaded', false);
    default:
      return state;
  }
};
