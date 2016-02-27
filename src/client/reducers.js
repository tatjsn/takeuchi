import { combineReducers } from 'redux';
import { RECEIVE_TOP, RECEIVE_INFO } from './actions';

function top(state = { loading: true }, action) {
  switch (action.type) {
  case RECEIVE_TOP:
    return action.payload;
  default:
    return state;
  }
}

function info(state = { loading: true }, action) {
  switch (action.type) {
    case RECEIVE_INFO:
      return action.payload;
    default:
      return state;
  }
}

const app = combineReducers({
  top,
  info
});

export default app;
