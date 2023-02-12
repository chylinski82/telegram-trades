import React from 'react';
import TradeDuration from './TradeDuration';
import { roundUp } from '../../functions';

const MyStatsPresentation = ({
    myTrades, 
    binanceData,
    handleChangeTradeValues,
    wonCount, 
    lostCount, 
    totalTrades,
    averageTradeDuration, 
    averageWonTradeDuration, 
    averageLostTradeDuration, 
    missedTrades, 
    totalDiff
    }) => {
  return (
    <>
      <table className='tile'>
        <thead>
          <tr>
            <th>Pair</th>
            <th>Duration</th>
            <th>Score</th>
            <th>Buy</th>
            <th>SL</th>
            <th>Target</th>
            <th>Sold</th>
            <th>Current Price</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {myTrades.map(trade => {
              const targets = [trade.target1.value, trade.target2.value, trade.target3.value, 
                  trade.target4.value, trade.target5.value, trade.target6.value];
              const target = targets[trade.myTarget - 1];
              let diff = 0;
              /*if(trade.score === 'lost') {
                 diff = ((trade.stopLoss - trade.bought) / trade.bought * 100).toFixed(2)
              } else if (trade.score === 'won') {
                  diff = ((target - trade.bought) / trade.bought * 100).toFixed(2)
              }*/
              diff = trade.sold !== 0 ? ((trade.sold - trade.bought) / trade.bought * 100).toFixed(2) : 0;
              totalDiff += Number(diff);
              return (
            <tr key={trade.id}>
              <td>
                <p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                  {trade.tradingPair}
                </p>
              </td>
              <td><TradeDuration trade={trade} /></td>
              <td><p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                {trade.score}</p></td>
              <td><input className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}
                         type="number"
                         name="bought"
                         defaultValue={trade.bought}
                         onChange={(e) => handleChangeTradeValues(e, trade.id)} /></td>
              <td><p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                {trade.stopLoss}</p></td>
              <td><p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                {target}</p></td>
              <td><input className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}
                         type="number"
                         name="sold"
                         defaultValue={trade.sold}
                         onChange={(e) => handleChangeTradeValues(e, trade.id)} /></td>
              <td><p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                {binanceData.find(data => data.id === trade.id) ? roundUp(binanceData.find(data => data.id === trade.id).price) : ''}</p></td>
              <td><p className={`field ${trade.score === 'won' ? 'green' : trade.score === 'lost' ? 'red' : ''}`}>
                {diff}%</p></td>
            </tr>
          )})}
          <tr>
            <td colSpan={2}><p className='field pink'>TOTAL</p></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td colSpan={2}><p className='field pink'>{`${totalDiff.toFixed(2)}%`}</p></td>
          </tr>
          <tr><td colSpan='7'>Total Trades: </td><td>{totalTrades}</td></tr>
          <tr><td colSpan='7'>Total Missed Trades: </td><td>{missedTrades}</td></tr>
          <tr><td colSpan='7'>Total Won Trades: </td><td>{wonCount}</td></tr>
          <tr><td colSpan='7'>Total Lost Trades: </td><td>{lostCount}</td></tr>    
          <tr><td colSpan='7'>Total Trades in Trade: </td><td>{totalTrades - wonCount - lostCount}</td></tr>        
          <tr><td colSpan='7'>Avg duration: </td><td>{averageTradeDuration.toFixed(2)}</td></tr>   
          <tr><td colSpan='7'>Avg won duration: </td><td>{averageWonTradeDuration.toFixed(2)}</td></tr>   
          <tr><td colSpan='7'>Avg lost duration: </td><td>{averageLostTradeDuration.toFixed(2)}</td></tr>  
        </tbody>
      </table>
    </>
  );
};

export default MyStatsPresentation;
