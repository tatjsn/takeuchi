import React from 'react';

export default ({ error, loading, numWait, timeWait, totalNum }) => (
  <p>
    待ち人数{numWait}人待ち(約{timeWait}分)本日{totalNum}番
  </p>
)
