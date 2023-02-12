import React from 'react';
import './tradeSignals.css';
import { roundUp } from '../../functions';

export const TradeSignalsPresentation = ({ handleTradeHappenedToggle, handleMyTargetChange, handleDeleteClick, 
  handleScoreClick, handleHitClickToggle, sortedTiles, tiles, myTrades, binanceData }) => {
  
   return (
    <>
    {sortedTiles.map(tile => (
      <div key={tile.id} className='tile'>
        <div className="delete-button" onClick={() => handleDeleteClick(tile.id)}>X</div>
        <div className="container">
          <div className="label" id="signals-label">
            Pair: <p className={`field ${myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'won' ? 'green'
                                       : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'lost' ? 'red'
                                       : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'in trade' ? 'amber' : ''}`} 
                     id="pair">{tile.tradingPair}</p>
          </div>
          <div className="label">
            Current price: <p className={`field ${myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'won' ? 'green'
                                       : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'lost' ? 'red'
                                       : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'in trade' ? 'amber' : ''}`} 
                           >{binanceData.find(data => data.id.startsWith(tile.id)) ? roundUp(binanceData.find(data => data.id.startsWith(tile.id)).price) : 'n/a'}</p>
          </div>
          <div className="label">
            Buy min: <p className="field">{roundUp(tile.buyMin)}</p>
          </div>
          <div className="label">
            Buy: <p className="field">{roundUp(tile.buy)}</p>
          </div>
          <div className="label">
              Target 1: <button className={`field ${tiles.find(t => t.id === tile.id).target1.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target1.value)}>{roundUp(tile.target1.value)}</button>
          </div>
          <div className="label">
              Target 2: <button className={`field ${tiles.find(t => t.id === tile.id).target2.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target2.value)}>{roundUp(tile.target2.value)}</button>
          </div>
          <div className="label">
              Target 3: <button className={`field ${tiles.find(t => t.id === tile.id).target3.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target3.value)}>{roundUp(tile.target3.value)}</button>
          </div>
          <div className="label">
              Target 4: <button className={`field ${tiles.find(t => t.id === tile.id).target4.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target4.value)}>{roundUp(tile.target4.value)}</button>
          </div>
          <div className="label">
              Target 5: <button className={`field ${tiles.find(t => t.id === tile.id).target5.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target5.value)}>{roundUp(tile.target5.value)}</button>
          </div>
          <div className="label">
              Target 6: <button className={`field ${tiles.find(t => t.id === tile.id).target6.hit ? 'green' : ''}`} 
                                onClick={() => handleHitClickToggle(tile.id, tile.target6.value)}>{roundUp(tile.target6.value)}</button>
          </div>
          <div className="label">
            Stop Loss: <p className="field red">{roundUp(tile.stopLoss)}</p>
          </div>
        </div>
        <div className="container-bottom">
          <div className="label">
            <button 
             className={`button ${myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'won' ? 'green'
             : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'lost' ? 'red'
             : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'in trade' ? 'amber' : ''}`}
             id="trade-button" 
             onClick={() => handleTradeHappenedToggle(tile.id)}>{tiles.find(t => t.id === tile.id).tradeHappened ? 'TP' : 'Trade'}</button>
            {tiles.find(t => t.id === tile.id).tradeHappened && (
              <select
              className={`button ${myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'won' ? 'green'
              : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'lost' ? 'red'
              : myTrades.find(trade => trade.id.startsWith(tile.id)) && myTrades.find(trade => trade.id.startsWith(tile.id)).score === 'in trade' ? 'amber' : ''}`} 
               id="trade-select" 
               value={myTrades.find(trade => trade.id.startsWith(tile.id)) ? myTrades.find(trade => trade.id.startsWith(tile.id)).myTarget : 1}
               onChange={(e) => handleMyTargetChange(e, myTrades.find(trade => trade.id.startsWith(tile.id)).id)}>
                {[0,1,2,3,4,5,6].map((num) => (
                  <option key={num} value={num}>{num === 0 ? 'not set' : num}</option>
                ))}
              </select>
            )}
          </div>
          {tiles.find(t => t.id === tile.id).tradeHappened && <button 
            className="button green" 
            onClick={() => handleScoreClick(myTrades.find(trade => trade.id.startsWith(tile.id)).id, 'won')}>W</button>}
          {tiles.find(t => t.id === tile.id).tradeHappened && <button 
            className="button red" 
            onClick={() => handleScoreClick(myTrades.find(trade => trade.id.startsWith(tile.id)).id, 'lost')}>L</button>}
          <div className="label" id="signals-label-time">
            <p className="field" id="signals-input-time">{new Date(tile.time).toDateString()}</p>
          </div>
        </div>
      </div>))}
    </>
  );
};


