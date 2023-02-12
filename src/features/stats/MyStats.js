import { useSelector, useDispatch } from 'react-redux';
import MyStatsPresentation from './MyStatsPresentation';

import { setBought, setSold } from './statsSlice';

const MyStats = () => {
    const myTrades = useSelector(state => state.stats.myTrades);
    const allTrades = useSelector(state => state.tradeSignals.tiles);
    let binanceData = useSelector(state => state.tradeSignals.binanceData);
    const dispatch = useDispatch();

  // handler function to set prices of 'bought' and 'sold' for the trade
  function handleChangeTradeValues(e, id) {
    const { name, value } = e.target;
    if (name === 'bought') {
      dispatch(setBought({ id, value }));
    } else if (name === 'sold') {
      dispatch(setSold({ id, value }));
    }
  }

  let wonCount = 0;
  let lostCount = 0;
  let totalDiff = 0;
  let totalTrades = myTrades.length;
  let totalWonTradeDuration = 0;
  let totalLostTradeDuration = 0;
  let totalTradeDuration = 0;

  //myTrades.forEach(t => console.log(t.startDate, 'test'))
  const myTradesCopy = myTrades.slice();
  const myTradesSortedByDate = myTradesCopy.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const firstTradeDate = myTradesSortedByDate.length && myTradesSortedByDate[0].startDate;
  const missedTrades = allTrades.filter(trade => !trade.tradeHappened && trade.time >= firstTradeDate).length;
//console.log(myTrades.length, 'length', myTrades.map(t => new Date(t.startDate)))

  myTrades.forEach(trade => {
    if (trade.score === 'won') {
      wonCount++;
      totalWonTradeDuration += (new Date(trade.endDate) - new Date(trade.startDate)) / (1000 * 3600 * 24);
    } else if (trade.score === 'lost') {
      lostCount++;
      totalLostTradeDuration += (new Date(trade.endDate) - new Date(trade.startDate)) / (1000 * 3600 * 24);
    } 
    totalTradeDuration += trade.endDate ? (new Date(trade.endDate) - new Date(trade.startDate)) / (1000 * 3600 * 24)
                                        : (new Date() - new Date(trade.startDate)) / (1000 * 3600 * 24);
  });
  let averageTradeDuration = totalTradeDuration / totalTrades;
  let averageWonTradeDuration = totalWonTradeDuration / wonCount;
  let averageLostTradeDuration = totalLostTradeDuration / lostCount;

  //rendering the table
  return (
    <MyStatsPresentation 
      myTrades={myTrades}
      binanceData={binanceData}
      wonCount={wonCount}
      lostCount={lostCount}
      totalTrades={totalTrades}
      totalDiff={totalDiff}
      averageTradeDuration={averageTradeDuration}
      averageWonTradeDuration={averageWonTradeDuration}
      averageLostTradeDuration={averageLostTradeDuration} 
      missedTrades={missedTrades}
      handleChangeTradeValues={handleChangeTradeValues}
    />
  );
}

export default MyStats;