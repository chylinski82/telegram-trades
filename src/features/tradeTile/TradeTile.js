import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateInput } from './tradeTileSlice.js';
import { addTile } from '../tradeSignals/tradeSignalsSlice.js';
import { TradeTilePresentation } from './TradeTilePresentation';

const TradeTile = () => {
    // Retrieve the current values of the trade tile state variables from the Redux store
    const { id, tradingPair, buy, buyMin, target1,
            target2, target3, target4, target5,
            target6, stopLoss, time, tradeHappened } = useSelector(state => state.tradeTile);
  
    // Use the useDispatch hook to create a dispatch function for dispatching actions to the Redux store
    const dispatch = useDispatch();

    // Function for handling the submission of the form
    const handleFormSubmit = event => {
        // Prevent the default refresh of the page that occurs when the form is submitted
        event.preventDefault();

        // Create a new tile object with the current values from the form
        const tile = {
          id,
          tradingPair,
          buyMin: Number(buyMin),
          buy: Number(buy), 
          /*targets: targets.map(target => {
              return {
                value: Number(target.value),
                hit: target.hit
              }
          }),*/
          target1: {value: Number(target1.value), hit: false},
          target2: {value: Number(target2.value), hit: false}, 
          target3: {value: Number(target3.value), hit: false},
          target4: {value: Number(target4.value), hit: false},
          target5: {value: Number(target5.value), hit: false},
          target6: {value: Number(target6.value), hit: false},
          stopLoss: Number(stopLoss), 
          time, 
          tradeHappened
        };
        
        // Dispatch the addTile action to add the new tile to the tradeSignals state
        dispatch(addTile({ tile }));
    }

    // Function for handling input change events in form field. converts time from input into a string
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      dispatch(updateInput({ name, value }));
    };
  

    /*const handleAddTargetClick = () => {
      dispatch(addTarget());           
    }*/        

    return (
        <TradeTilePresentation
          target1={target1}
          target2={target2}
          target3={target3}
          target4={target4}
          target5={target5}
          target6={target6}
          tradingPair={tradingPair}
          buyMin={buyMin}
          buy={buy}         
          stopLoss={stopLoss}
          time={time}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          /*handleAddTargetClick={handleAddTargetClick}*/
        />
    );
      
}

export default TradeTile;
