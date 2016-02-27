export const FETCH_MESSAGE = 'FETCH_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

const fetchOne = url =>
  fetch(url)
  .then(res => res.json())
  .catch(e => ({ msg: e }))

export function fetchMessage(cardId, birthDate) {
  return dispatch =>
    Promise.all([`/info?id=${cardId}&bd=${birthDate}`, `/top`].map(fetchOne))
    .then(values => values.reduce((prev, cur) => ({ msg: prev.msg + cur.msg })))
    .then(({ msg }) => dispatch(receiveMessage(msg)));
}

export function receiveMessage(msg) {
  return {
    type: RECEIVE_MESSAGE,
    message: msg
  }
}
