import React from 'react';
import { connect } from 'react-redux';

const App = (props) => (
  <p>
    {props.cardId}({props.birthDate})<br />
    {props.message}
  </p>
);

function select(state) {
  return {
    message: state.message
  }
}

export default connect(select)(App);
