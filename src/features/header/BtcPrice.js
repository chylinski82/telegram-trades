import React from 'react';
import { useSelector } from 'react-redux';

const BtcPrice = () => {
  const data = useSelector(state => state.tradeSignals.binanceData.find(el => el.id === 'BTCUSDT'));
  const price = data ? data.price : 0;

  return (
    <div className='header-field'>BTC / USDT: {Number(price).toFixed(2)}</div>
  )
}

export default BtcPrice