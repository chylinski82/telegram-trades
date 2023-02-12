import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { TradeSignalsPresentation } from './TradeSignalsPresentation';
import { updatePrice, toggleTradeHappened, toggleTargetHit, deleteTile } from './tradeSignalsSlice';
import { setMyTarget, setScore } from '../stats/statsSlice';

const TradeSignals = () => {
    const tiles = useSelector(state => state.tradeSignals.tiles);
    const filteredTiles = useSelector(state => state.tradeSignals.filteredTiles.length ? 
      state.tradeSignals.filteredTiles : tiles
    );    
    
    let binanceData = useSelector(state => state.tradeSignals.binanceData);
    
    const dispatch = useDispatch();

    const myTrades = useSelector(state => state.stats.myTrades);

    // Fetch data from Binance
    const fetchData = async (tile) => {
      let binancePair = binanceData.find(pair => pair.symbol === tile.tradingPair);
      if (!binancePair) {
          const formattedPair = tile.tradingPair.slice(0, tile.tradingPair.indexOf('/')) + 'BTC';
          const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${formattedPair}`);
    
          if (!response.data) {
            console.error(`Binance pair not found for symbol: ${tile.tradingPair}`);
            return;
          }
          binancePair = { symbol: response.data.symbol, price: response.data.price, id: tile.id };    
      }
      dispatch(updatePrice(binancePair));
    };
      
    useEffect(() => {
      const fetchBTC = async () => {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`);
    
        if (!response.data) {
          console.error(`Binance pair not found for symbol: BTCUSDT`);
          return;
        }
        const binancePair = { symbol: response.data.symbol, price: response.data.price, id: 'BTCUSDT' };
        dispatch(updatePrice(binancePair));
      };
      
      myTrades.forEach(tile => {
        fetchData(tile);
      });
      
      // Fetch BTCUSDT data
      fetchBTC();
      
      // Set an interval to update the price every minute
      const intervalId = setInterval(() => {
        myTrades.forEach(tile => {
          fetchData(tile);
        });
        
        // Fetch BTCUSDT data
        fetchBTC();
      }, 60000);
      
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [myTrades]);
    
        
    // Function for toggling the tradeHappened boolean (when price dropped to 'buy' range)
    const handleTradeHappenedToggle = id => {
        dispatch(toggleTradeHappened({ id }));
    };

    // Function for setting my target for the trade
    const handleMyTargetChange = (e, id) => {
        const target = e.target.value;
        dispatch(setMyTarget({ id, target }));
    };

    const handleScoreClick = (id, value) => {
        dispatch(setScore({id, value}));
    };    

    // Function for deleting a trade tile from the list
    const handleDeleteClick = (id) => {
        // Dispatch the deleteTile action with the id of the tile to be deleted
        dispatch(deleteTile({ id }));
    };
    
    // Function for toggling the hit boolean of a target
    const handleHitClickToggle = (tileId, targetValue) => {
        // Dispatch an action to update the hit boolean of the target
        console.log(tileId, targetValue)
        dispatch(toggleTargetHit({ tileId, targetValue }));
    };

    // Sorts trades by time for rendering in TradeSignalsPresentation
    const sortedTiles = [...filteredTiles].sort((a, b) => new Date(b.time) - new Date(a.time));

    /*const sortedTiles = filteredTiles.length ?
     [...filteredTiles].sort((a, b) => new Date(b.time) - new Date(a.time)) :
     [...tiles].sort((a, b) => new Date(b.time) - new Date(a.time));*/

    /*const sortedTiles = [...tiles].filter(tile => filteredTiles.includes(item => item === tile))
    .sort((a, b) => new Date(b.time) - new Date(a.time));*/
    
              
    return (
        <TradeSignalsPresentation
            myTrades={myTrades}
            binanceData={binanceData}
            handleTradeHappenedToggle={handleTradeHappenedToggle}
            handleMyTargetChange={handleMyTargetChange}
            handleScoreClick={handleScoreClick}
            handleDeleteClick={handleDeleteClick}
            handleHitClickToggle={handleHitClickToggle}
            sortedTiles={sortedTiles}
            tiles={tiles}
        />
    );
};

export default TradeSignals;
