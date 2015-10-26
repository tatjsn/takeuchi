import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import app from './reducers';
import thunkMiddleware from 'redux-thunk';

const query = queryString.parse(window.location.search);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch in actions
)(createStore);
const store = createStoreWithMiddleware(app);

ReactDOM.render((
  <Provider store={store}>
    <App cardId={query.id} birthDate={query.bd} />
  </Provider>
), document.getElementById('app'));
