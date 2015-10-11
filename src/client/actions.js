export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function fetchMessage(cardId, birthDate) {
  return (dispatch) => {
    return fetch('/message')
      .then(res => res.json())
      .then(json => dispatch(receiveMessage(json)));
  };
}

export function receiveMessage(json) {
  return {
    type: RECEIVE_MESSAGE,
    message: json.msg
  }
}
