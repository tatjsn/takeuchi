import { combineReducers } from 'redux';
import { RECEIVE_MESSAGE } from './actions';

function message(state = '', action) {
  switch (action.type) {
  case RECEIVE_MESSAGE:
    return action.message;
  default:
    return state;
  }
}

const app = combineReducers({
  message
});

export default app;
