import { createSlice } from '@reduxjs/toolkit';

import { updateMyTarget, updateScore, updateBought, updateSold,
    updateStartDate, updateEndDate } from '../../firestore';

const initialState = {
    myTrades: [],
}
  
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setMyTrades: (state, action) => {
        state.myTrades = action.payload;
    },
    setMyTarget: (state, action) => {
        const { id, target } = action.payload;
        console.log('id', id, 'target', target);
        const tileIndex = state.myTrades.findIndex(tile => tile.id === id);
        state.myTrades[tileIndex].myTarget = target;
        updateMyTarget(state.myTrades[tileIndex]);
    },
    setScore: (state, action) => {
        const { id, value } = action.payload;
        const tileIndex= state.myTrades.findIndex(tile => tile.id === id);

        if(value === state.myTrades[tileIndex].score) {
            state.myTrades[tileIndex].score = 'in trade';
            state.myTrades[tileIndex].endDate = '';
        } else {
        state.myTrades[tileIndex].score = value;
        }  

        // update sold to either value of target user aimed for or SL, depending on outcome of the trade
        const targets = [state.myTrades[tileIndex].target1.value, state.myTrades[tileIndex].target2.value, state.myTrades[tileIndex].target3.value,
            state.myTrades[tileIndex].target4.value, state.myTrades[tileIndex].target5.value, state.myTrades[tileIndex].target6.value,]
        const target = targets[state.myTrades[tileIndex].myTarget - 1]
        value === 'won' ? state.myTrades[tileIndex].sold = target : state.myTrades[tileIndex].sold = state.myTrades[tileIndex].stopLoss;
        updateSold(state.myTrades[tileIndex]);
    
        // If score is being set to 'won' or 'lost', update the 'endDate' with current date
        if (value === 'won' || value === 'lost') {
            const currentDate = new Date().toISOString().slice(0, 16);
            state.myTrades[tileIndex].endDate = currentDate;
        }

        // update score in Firestore doc to either 'won' or 'lost'
        updateScore(state.myTrades[tileIndex]);
    },
    
    setBought: (state, action) => {
        const { id, value } = action.payload;
        const tileIndex= state.myTrades.findIndex(tile => tile.id === id);
        state.myTrades[tileIndex].bought = Number(value);
        updateBought(state.myTrades[tileIndex]);
    },
    setSold: (state, action) => {
        const { id, value } = action.payload;
        const tileIndex= state.myTrades.findIndex(tile => tile.id === id);
        state.myTrades[tileIndex].sold = Number(value);
        updateSold(state.myTrades[tileIndex]);
    },
    setStartDate: (state, action) => {
        const { id, value } = action.payload;
        const tileIndex= state.myTrades.findIndex(tile => tile.id === id);
        let date;
        try {
        date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid Date");
        }
        state.myTrades[tileIndex].startDate = value.slice(0, 16);
        } catch (err) {
            console.log("Invalid Date");
        }  
        updateStartDate(state.myTrades[tileIndex]);     
    },
    setEndDate: (state, action) => {
        const { id, value } = action.payload;
        const tileIndex= state.myTrades.findIndex(tile => tile.id === id);
        let date;
        try {
        date = new Date(value);
        if (isNaN(date.getTime())) {
            throw new Error("Invalid Date");
        }
        state.myTrades[tileIndex].endDate = value.slice(0, 16);
        } catch (err) {
            console.log("Invalid Date");
        }  
        updateEndDate(state.myTrades[tileIndex]);     
    },
  }
});

export const { setMyTrades, setMyTarget, setScore, setBought, setSold, setStartDate, setEndDate } = statsSlice.actions;

export default statsSlice.reducer;
