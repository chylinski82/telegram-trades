import { createSlice, current } from '@reduxjs/toolkit';

import { addTradeTile, updateTradeHappened, updateTargetHits, updateScore, 
   deleteTradeTile } from '../../firestore.js';

const initialState = {
  tiles: [],
  allTiles: [],
  filteredTiles: [],
  binanceData: [],
};

const tradeSignalsSlice = createSlice({
  name: 'tradeSignals',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const binancePair = action.payload;
      return {
        ...state,
        binanceData: state.binanceData
          ? [
              ...state.binanceData.filter(data => data.id !== binancePair.id),
              binancePair,
            ]
          : [binancePair],
      };
    },  
    // Reducer to filter trade tiles based on search term
    updateSearchTerm: (state, action) => {
      const { searchTerm } = action.payload;
      console.log('len', state.tiles.length, searchTerm.toUpperCase())

      if (searchTerm) {
        state.filteredTiles = state.tiles.filter(
          tile => tile.tradingPair.toLowerCase().includes(searchTerm.toLowerCase())
        )
      } else {
        state.filteredTiles = state.tiles;
      } 
    },
  
    // Reducer to select trades based on period of time, those trades will be rendered and 
    // calculations will be made based on those trades only
    updatePeriod: (state, action) => {

      // Destructure the period value and start/end dates from the action payload
      const { period, startDate, endDate } = action.payload;

      // Check the period value and update the state.tiles array accordingly
      switch (period) {
        case '1m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setMonth(new Date().getMonth() - 1)
            );
          });
          break;
        case '3m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setMonth(new Date().getMonth() - 3)
            );
          });
          break;
        case '6m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setMonth(new Date().getMonth() - 6)
            );
          });
          break;
        case '12m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setFullYear(new Date().getFullYear() - 1)
            );
          });
          break;
        case '18m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setMonth(new Date().getMonth() - 18)
            );
          });
          break;  
        case '24m':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setFullYear(new Date().getFullYear() - 2)
            );
          });
          break;
        case 'all':
          state.tiles = state.allTiles;
          break;
        case 'custom':
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) >= new Date(startDate) &&
              new Date(tile.time) <= new Date(endDate)
            );
          });
          break;
        default:
          state.tiles = state.allTiles.filter(tile => {
            return (
              new Date(tile.time) > new Date().setMonth(new Date().getMonth() - 6)
            );
          });
      }
    },

    // Reducer for adding a new trade tile to the list of saved trade tiles
    addTile: (state, action) => {
      
      // Destructure the trade tile from the action payload
      const { tile } = action.payload;
      console.log('tile added', tile)
      //console.log('buy', tile.buy, tile.targets.every(target => target.value > 0), tile.targets, Math.min(...tile.targets) > tile.buy);
      const buy = isNaN(Number(tile.buy)) ? 0 : Number(tile.buy);
      const targets = [Number(tile.target1.value), Number(tile.target2.value), Number(tile.target3.value),
                       Number(tile.target4.value), Number(tile.target5.value), Number(tile.target6.value),];
      const stopLoss = isNaN(Number(tile.stopLoss)) ? 0 : Number(tile.stopLoss);
      //console.log('buy', buy, 'targets', targets, 'stoploss', stopLoss);
      // Check that the tile meets the conditions for being added to the list
      if (buy > 0 && targets.every(target => target > 0) &&
      Math.min(...targets) > buy && stopLoss < buy) {
            console.log('test')
        // If the conditions are met, push a new object to the tiles array in the state
        // The new object includes the original trade tile, as well as a targets array
        // The targets array includes an object for each target, with the target value and a hit boolean               
        console.log(current(state).tiles, '1');
        
        state.tiles.push(tile);

        //Add updated tile to firestore as a new doc
        addTradeTile(tile, 'trades');
      }
    },

    // Reducer for deleting a trade tile from the list of saved trade tiles
    deleteTile: (state, action) => {

      // Destructure the id of the trade tile to be deleted from the action payload
      const { id } = action.payload;

      // Filter the tiles array in the state to exclude the tile with the matching id
      state.tiles = state.tiles.filter(tile => tile.id !== id);

      // Delete tile from Firestore
      deleteTradeTile(id, 'trades');
    },

    // Reducer for toggling the tradeHappened boolean of a trade tile
    toggleTradeHappened: (state, action) => {
      
      // Destructure the id of the trade tile from the action payload
      const { id } = action.payload;
      
      // Find the index of the trade tile in the tiles array
      const tileIndex = state.tiles.findIndex(tile => tile.id === id);
      //const tileIndexFiltered = state.filteredTiles(tile => tile.id === id);
      
      // Save the original value of tradeHappened
      const originalTradeHappened = state.tiles[tileIndex].tradeHappened;

      // Toggle the tradeHappened boolean of the tile at the found index
      state.tiles[tileIndex].tradeHappened = !state.tiles[tileIndex].tradeHappened;

      // If tradeHappened is true, create a property 'myTarget' with a value of 1 and add to Firestore 'my trades'
      if (state.tiles[tileIndex].tradeHappened) {
        addTradeTile(state.tiles[tileIndex], 'my trades')
      } else {
        // If tradeHappened is false, remove the 'myTarget' and 'score' property
        deleteTradeTile(`${id}-user1`, 'my trades')
      }

      //console.log(state.tiles[tileIndex].tradingPair, state.tiles[tileIndex].tradeHappened, 'testing', state.filteredTiles[tileIndexFiltered].tradingPair, state.filteredTiles[tileIndexFiltered].tradeHappened)
      // Pass the original value of tradeHappened to the updateTradeHappened function
      updateTradeHappened({ id: state.tiles[tileIndex].id, tradeHappened: originalTradeHappened });

      // other firestore functions
      updateScore(state.tiles[tileIndex]);
    },   

    toggleTargetHit: (state, action) => {

      // Destructure the id of the trade tile and the value of the target from the action payload
      const { tileId, targetValue } = action.payload;

      // Find the index of the tile in the state by its id
      const tileIndex = state.tiles.findIndex(tile => tile.id === tileId);
      
      // Bundle individual targets in an array
      const targets = [state.tiles[tileIndex].target1, state.tiles[tileIndex].target2, state.tiles[tileIndex].target3,
                        state.tiles[tileIndex].target4, state.tiles[tileIndex].target5, state.tiles[tileIndex].target6]

      // Find the index of the target within the targets array of the tile by its value
      const targetIndex = targets.findIndex(target => target.value === targetValue);
      
      // Toggle the hit boolean of the target
      targets[targetIndex].hit = !targets[targetIndex].hit;

      // Create a copy of the targets array with the updated hit value
      
      const updatedTargets = targets;
      
      // Update the hit values of the targets with lower or higher values
      updatedTargets.forEach((target, index) => {
        if (target.value <= targetValue && targets[targetIndex].hit) {
          updatedTargets[index].hit = true;
        }
        if (target.value >= targetValue && !targets[targetIndex].hit) {
          updatedTargets[index].hit = false;
        }
      });

      // update targets in firestore
      const updatedTile = { 
          ...state.tiles[tileIndex],
          target1: targets[0],
          target2: targets[1],
          target3: targets[2],
          target4: targets[3],
          target5: targets[4],
          target6: targets[5],
        }     

      updateTargetHits(updatedTile);

      // Update the state with the updated tile
      state.tiles[tileIndex] = updatedTile;

    },

    // Reducer for forwarding tiles from db to the
    updateTradeTiles: (state, action) => {
      state.allTiles = action.payload
    },   
  },
});

export const { updatePrice, updatePeriod, updateSearchTerm, addTile, deleteTile, toggleTradeHappened,
  toggleTargetHit, updateTradeTiles } = tradeSignalsSlice.actions;

export default tradeSignalsSlice.reducer;
