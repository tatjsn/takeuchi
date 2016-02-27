import fetch from 'node-fetch';
import FormData from 'form-data';
import cheerio from 'cheerio';
import config from 'config';
import express from 'express';

const url = config.get('url');
const cardId = config.get('cardId');
const birthDate = config.get('birthDate');

const params = {
  sn: 'sp000001',
  f: '/www/icall-r3_0_0/httpd/html/i',
  v: 'rsvcnf01',
  a: 'next'
}

function createForm(cardId, birthDate) {
  const form  = new FormData();
  Object.keys(params).forEach((key) => {
    form.append(key, params[key]);
  });
  form.append('dum', Date.now() / 1000);
  form.append('HOSID', cardId);
  form.append('b_date', birthDate);
  return form;
}

const app = express();
app.get('/test', (req, res) => {
  res.json({ msg: 'hi' });
});

const getBodyText = $ =>
  $('body').text().replace(/[\s\n]/g, '')

app.get('/top', (req, res) => {
  fetch(url + '?sp_sn=sp000001&dum=' + Date.now() / 1000)
    .then(res => res.text())
    .then(text => cheerio.load(text))
    .then(getBodyText)
    .then(body => {
      const res = /待ち人数(\d*)人待ち\(約(\d*)分\)本日(\d*)番/g.exec(body);
      if (!res) throw 'unexpected_format';
      return [res[1], res[2], res[3]];
    })
    .then(([numWait, timeWait, totalNum]) =>
      res.json({ numWait, timeWait, totalNum }))
    .catch(e => res.status(400).json({ error: e }))
});

app.get('/info', (req, res) => {
  if (!(req.query.id && req.query.bd)) {
    res.status(400).json({ error: 'Bad query' });
    return;
  }
  const form = createForm(req.query.id, req.query.bd);
  fetch(url, { method: 'POST', body: form })
    .then(res => res.text())
    .then(text => cheerio.load(text))
    .then(getBodyText)
    .then(body => {
      const res = /受付番号：(\d*)番あなたは(\d*)人目です。おおよそ(\d*)分後/g.exec(body);
      if (!res) throw 'not_reserved';
      return [res[1], res[2], res[3]];
    })
    .then(([resId, numInLine, timeInLine]) =>
      res.json({ reserved: true, resId, numInLine, timeInLine }))
    .catch(e => {
      if (e === 'not_reserved') {
        res.json({ reserved: false })
      } else {
        res.status(400).json({ error: e })
      }
    })
});
app.use('/', express.static('dist'));

const server = app.listen(8080);
export default server;
