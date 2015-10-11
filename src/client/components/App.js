import React from 'react';
import { fetchMessage } from '../actions';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchMessage(this.props.cardId, this.props.birthDate));
  }

  render() {
    return (
      <p>
        {this.props.message}
      </p>
    );
  }
}

function select(state) {
  return {
    message: state.message
  }
}

export default connect(select)(App);
