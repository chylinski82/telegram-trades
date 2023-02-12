import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: "id-" + Math.random().toString(36),
  tradingPair: '',
  buyMin: 0,
  buy: 0,
  //targets: [{ value: 0, hit: false}],
  target1: { value: 0, hit: false},
  target2: { value: 0, hit: false},
  target3: { value: 0, hit: false},
  target4: { value: 0, hit: false},
  target5: { value: 0, hit: false},
  target6: { value: 0, hit: false},
  stopLoss: 0,
  time: new Date().getTime(),
  tradeHappened: false
}

//let index;

const tradeTileSlice = createSlice({
  name: 'tradeTile',
  initialState,
  reducers: {
    updateInput: (state, action) => {
      // Check if the input field is for a target value
      if (action.payload.name.startsWith('target')) {
        state[action.payload.name].value = action.payload.value;

      } else if (action.payload.name === 'tradingPair') {
        // Update the value for the input field in the state object, convert it to uppercase
        state[action.payload.name] = action.payload.value.toUpperCase();

      } else {
        // Update the value for the input field in the state object
        state[action.payload.name] = action.payload.value;
        
      }

    },   
  },
});

export const { updateInput } = tradeTileSlice.actions;

export default tradeTileSlice.reducer;
