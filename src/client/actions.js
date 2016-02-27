export const RECEIVE_TOP = 'RECEIVE_TOP';
export const RECEIVE_INFO = 'RECEIVE_INFO';

const fetchOne = url =>
  fetch(url)
  .then(res => res.json())
  .catch(e => ({ msg: e }));

export const fetchTop = () =>
  dispatch =>
    fetch(`/top`)
    .then(res => res.json())
    .then(data => dispatch(receiveTop(data)))
    .catch(error => dispatch(receiveTop({ error })));

export const fetchInfo = (cardId, birthDate) =>
  dispatch =>
    fetch(`/info?id=${cardId}&bd=${birthDate}`)
    .then(res => res.json())
    .then(data => dispatch(receiveInfo(data)))
    .catch(error => dispatch(receiveInfo({ error })));


export const receiveTop = payload => ({ type: RECEIVE_TOP, payload })
export const receiveInfo = payload => ({ type: RECEIVE_INFO, payload })
