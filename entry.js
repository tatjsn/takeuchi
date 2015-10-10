import fetch from 'node-fetch';
import FormData from 'form-data';
import cheerio from 'cheerio';
import config from 'config';

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

fetch(url, { method: 'POST', body: createForm(cardId, birthDate) })
        .then((res) => res.text())
        .then((text) => {
          const $ = cheerio.load(text);
          const msg = $('body').text();
          console.log(msg);
        }).catch((e) => {
          console.log(e);
        });
