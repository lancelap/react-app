import { Record } from 'immutable';
import { SIGNIN, SIGNOUT } from '../actionTypes';

const ReducerState = Record({
  loaded: false,
  userInfo: {},
});

const defaulState = new ReducerState();

export default (authState = defaulState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNOUT:
      return authState.set('userInfo', {})
        .set('loaded', true);
    case SIGNIN:
      return authState.set('userInfo', payload.userInfo)
        .set('loaded', true);
    default:
      return authState;
  }
};
