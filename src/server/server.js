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
app.get('/api', (req, res) => {
  console.log(req.query);
  if (!(req.query.id && req.query.bd)) {
    res.status(400).json({ error: 'Bad query' });
    return;
  }
  const form = createForm(req.query.id, req.query.bd);
  fetch(url, { method: 'POST', body: form })
    .then((res) => res.text())
    .then((text) => {
      const $ = cheerio.load(text);
      res.json({ msg: $('body').text() });
    }).catch((e) => {
      res.status(400).json({ error: e });
    });
});
app.use('/', express.static('dist'));

const server = app.listen(8080);
export default server;
