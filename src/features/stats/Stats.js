import React from 'react';
import { useSelector } from 'react-redux';
import { StatsPresentation } from './StatsPresentation';
import MyStats from './MyStats';
import { Strategy } from '../strategy/Strategy';

const Stats = () => {
    // Get the list of trade tiles from the Redux store
    const tiles = useSelector((state) => state.tradeSignals.tiles);

    // Function to calculate the statistics for a given row
    function calculateRowStats(tiles, propertyName) {
        // Initialize the sums for each statistic
        let buyPriceSL = 0;
        let buyPriceT1 = 0;
        let buyPriceT1dif = 0;
        let buyPriceT2 = 0;
        let buyPriceT2dif = 0;
        let buyPriceT3 = 0;
        let buyPriceT3dif = 0;
        let buyPriceT4 = 0;
        let buyPriceT4dif = 0;
        let buyPriceT5 = 0;
        let buyPriceT5dif = 0;
        let buyPriceT6 = 0;
        let buyPriceT6dif = 0;

        // Add up the values for each statistic for each tile
        tiles.forEach((tile) => {
           
            // Initialise buyPrice based on one of 'buy' properties passed into function
            let buyPrice;
            if (propertyName === 'buyAvg') {
                buyPrice = tile.buy - (tile.buy - tile.buyMin) / 2
            } else if (propertyName === 'buy') {
                buyPrice = tile.buy;
            } else if (propertyName === 'buyMin') {
                buyPrice = tile.buyMin
            }  

            buyPriceSL += (tile.stopLoss - buyPrice) / buyPrice * 100;
            buyPriceT1 += (tile.target1.value - buyPrice) / buyPrice * 100;
            buyPriceT1dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target1.value - buyPrice) / buyPrice * 100);
            buyPriceT2 += (tile.target2.value - buyPrice) / buyPrice * 100;
            buyPriceT2dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target2.value - buyPrice) / buyPrice * 100);
            buyPriceT3 += (tile.target3.value - buyPrice) / buyPrice * 100;
            buyPriceT3dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target3.value - buyPrice) / buyPrice * 100);
            buyPriceT4 += (tile.target4.value - buyPrice) / buyPrice * 100;
            buyPriceT4dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target4.value - buyPrice) / buyPrice * 100);
            buyPriceT5 += (tile.target5.value - buyPrice) / buyPrice * 100;
            buyPriceT5dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target5.value - buyPrice) / buyPrice * 100);
            buyPriceT6 += (tile.target6.value - buyPrice) / buyPrice * 100;
            buyPriceT6dif += ((tile.stopLoss - buyPrice) / buyPrice * 100) + ((tile.target6.value - buyPrice) / buyPrice * 100);
        });

        // Divide the sum by the number of tiles to get the average
        buyPriceSL /= tiles.length;
        buyPriceT1 /= tiles.length;
        buyPriceT1dif /= tiles.length;
        buyPriceT2 /= tiles.length;
        buyPriceT2dif /= tiles.length;
        buyPriceT3 /= tiles.length;
        buyPriceT3dif /= tiles.length;
        buyPriceT4 /= tiles.length;
        buyPriceT4dif /= tiles.length;
        buyPriceT5 /= tiles.length;
        buyPriceT5dif /= tiles.length;
        buyPriceT6 /= tiles.length;
        buyPriceT6dif /= tiles.length;

        return {
            buyPriceSL,
            buyPriceT1,
            buyPriceT1dif,
            buyPriceT2,
            buyPriceT2dif,
            buyPriceT3,
            buyPriceT3dif,
            buyPriceT4,
            buyPriceT4dif,
            buyPriceT5,
            buyPriceT5dif,
            buyPriceT6,
            buyPriceT6dif,
        };
    }

    // Get the statistics for each row
    const buyStats = calculateRowStats(tiles, 'buy');
    const buyAvgStats = calculateRowStats(tiles, 'buyAvg');
    const buyMinStats = calculateRowStats(tiles, 'buyMin');

    // Calculate the percentage and number of trades that reached each target
    const totalTrades = tiles.length;
    const stopLossTrades = tiles.filter((tile) => !tile.target1.hit).length;
    const stopLossPercentage = ((stopLossTrades / totalTrades) * 100);
    const target1Trades = tiles.filter((tile) => tile.target1.hit && !tile.target2.hit).length;
    const target1Percentage = ((target1Trades / totalTrades) * 100);
    const target2Trades = tiles.filter((tile) => tile.target2.hit && !tile.target3.hit).length;
    const target2Percentage = ((target2Trades / totalTrades) * 100);
    const target3Trades = tiles.filter((tile) => tile.target3.hit && !tile.target4.hit).length;
    const target3Percentage = ((target3Trades / totalTrades) * 100);
    const target4Trades = tiles.filter((tile) => tile.target4.hit && !tile.target5.hit).length;
    const target4Percentage = ((target4Trades / totalTrades) * 100);
    const target5Trades = tiles.filter((tile) => tile.target5.hit && !tile.target6.hit).length;
    const target5Percentage = ((target5Trades / totalTrades) * 100);
    const target6Trades = tiles.filter((tile) => tile.target6.hit).length;
    const target6Percentage = ((target6Trades / totalTrades) * 100);

    return (
        <div>
            <StatsPresentation
            buyStats={buyStats}
            buyAvgStats={buyAvgStats}
            buyMinStats={buyMinStats}
            stopLossTrades={stopLossTrades}
            stopLossPercentage={stopLossPercentage}
            target1Trades={target1Trades}
            target1Percentage={target1Percentage}
            target2Trades={target2Trades}
            target2Percentage={target2Percentage}
            target3Trades={target3Trades}
            target3Percentage={target3Percentage}
            target4Trades={target4Trades}
            target4Percentage={target4Percentage}
            target5Trades={target5Trades}
            target5Percentage={target5Percentage}
            target6Trades={target6Trades}
            target6Percentage={target6Percentage}
            />
            <br /><br />
            Strategy
            <br /><br />
            <Strategy 
            stopLossPercentage={stopLossPercentage}
            target1Percentage={target1Percentage}
            target2Percentage={target2Percentage}
            target3Percentage={target3Percentage}
            target4Percentage={target4Percentage}
            target6Percentage={target6Percentage}
            buyStats={buyStats} 
            buyMinStats={buyMinStats}
            buyAvgStats={buyAvgStats} />
            <br /><br />
        </div>
    );
};

export default Stats;
