import React from 'react';
import Top from './Top';
import Info from './Info';
import { connect } from 'react-redux';

const App = ({ cardId, birthDate, top, info }) => (
  <div>
    <p>
      {cardId}({birthDate}){(new Date()).toLocaleTimeString()}
    </p>
    <Top {...top} />
    <Info {...info} />
  </div>
);

export default connect(({ top, info }) => ({ top, info }))(App);
