import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './components/App';
import app from './reducers';
import thunkMiddleware from 'redux-thunk';
import { connect } from 'react-redux';
import { fetchTop, fetchInfo } from './actions';

const { id, bd } = queryString.parse(window.location.search);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch in actions
)(createStore);
const store = createStoreWithMiddleware(app);
store.dispatch(fetchTop());
if (id && bd) {
  store.dispatch(fetchInfo(id, bd));
}

const AppC = connect(({ top, info }) => ({ top, info }))(App);

ReactDOM.render((
  <Provider store={store}>
    <AppC cardId={id} birthDate={bd} />
  </Provider>
), document.getElementById('app'));
