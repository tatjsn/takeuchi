import React from 'react';

export default ({ error, loading, reserved, resId, numInLine, timeInLine }) =>
  reserved ? (
    <p>
      受付番号：{resId} 番<br />あなたは{numInLine}人目(おおよそ{timeInLine}分後)
    </p>
  ) : (
    <p>
      あなたは予約していないようです。
    </p>
  )
