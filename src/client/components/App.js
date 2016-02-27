import React from 'react';
import Top from './Top';
import Info from './Info';

export default ({ cardId, birthDate, top, info }) => (
  <div>
    <p>
      {cardId}({birthDate}){(new Date()).toLocaleTimeString()}
    </p>
    <Top {...top} />
    { (cardId && birthDate) ? <Info {...info} /> : '番号と誕生日を入力すると待ち順番がみれます。' }
  </div>
)
