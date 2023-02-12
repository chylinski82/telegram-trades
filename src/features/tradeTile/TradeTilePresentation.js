import React from 'react';
import './tradeTile.css';

export const TradeTilePresentation = ({ target1, target2, target3, target4, target5,
                                        target6, tradingPair, buyMin, buy, stopLoss, 
                                        time, handleInputChange, handleFormSubmit }) => (
  <div>
    {/* Form for entering trade details */}
    <form className='tile' onSubmit={handleFormSubmit}>
      <div className="container">       
        <label className="label">
          Pair: 
          <input
            className="field"
            type="text"
            name="tradingPair"
            value={tradingPair}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Stop Loss: 
          <input
            className="field"
            type="number"
            name="stopLoss"
            value={stopLoss}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Buy min: 
          <input
            className="field"
            type="number"
            name="buyMin"
            value={buyMin}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Buy: 
          <input
            className="field"
            type="number"
            name="buy"
            value={buy}
            onChange={handleInputChange}
          />
        </label>        
        <label className="label">
          Target 1: 
          <input
            className="field"
            type="number"
            name="target1"
            value={target1.value}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Target 2: 
          <input
            className="field"
            type="number"
            name="target2"
            value={target2.value}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Target 3: 
          <input
            className="field"
            type="number"
            name="target3"
            value={target3.value}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Target 4: 
          <input
            className="field"
            type="number"
            name="target4"
            value={target4.value}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Target 5: 
          <input
            className="field"
            type="number"
            name="target5"
            value={target5.value}
            onChange={handleInputChange}
          />
        </label>
        <label className="label">
          Target 6: 
          <input
            className="field"
            type="number"
            name="target6"
            value={target6.value}
            onChange={handleInputChange}
          />
        </label>                        
      </div>
      <div className="container-bottom">
        <label className="label" id="label-time">
            Time: 
            <input
              className="field"
              id="input-time"
              type="datetime-local"
              name="time"
              value={time}
              onChange={handleInputChange}
            />
        </label>      
        <button type="submit" className='button'>Add trade</button>     
      </div>      
    </form>
  </div>
);
