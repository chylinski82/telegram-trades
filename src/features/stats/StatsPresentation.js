import React from 'react';
import './stats.css';

export const StatsPresentation = (props) => {

    //  Destructure values from Stats.js
    const { buyStats, buyAvgStats, buyMinStats,
            stopLossTrades, stopLossPercentage,
            target1Trades, target1Percentage,
            target2Trades, target2Percentage,
            target3Trades, target3Percentage,
            target4Trades, target4Percentage,
            target5Trades, target6Trades, target6Percentage  } = props;

    return (
        <table className='tile fit-width'>
        <thead>
            <tr>
                <th className='first-column'></th>
                <th>Buy</th>
                <th>BuyAvg</th>
                <th>BuyMin</th>
                <th>Trades / %</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className='first-column'>Stop Loss</td>
                <td><p className='field'>{buyStats.buyPriceSL.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceSL.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceSL.toFixed(1)} %</p></td>
                <td><p className='field'>{`${stopLossTrades} / ${stopLossPercentage.toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 1</td>
                <td><p className='field'>{buyStats.buyPriceT1.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT1.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT1.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target1Trades} / ${(100 - stopLossPercentage).toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T1-dif</td>
                <td><p className='field'>{buyStats.buyPriceT1dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT1dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT1dif.toFixed(1)} %</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 2</td>
                <td><p className='field'>{buyStats.buyPriceT2.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT2.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT2.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target2Trades} / ${(100 - stopLossPercentage - target1Percentage).toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T2-dif</td>
                <td><p className='field'>{buyStats.buyPriceT2dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT2dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT2dif.toFixed(1)} %</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 3</td>
                <td><p className='field'>{buyStats.buyPriceT3.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT3.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT3.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target3Trades} / ${(100 - stopLossPercentage - target1Percentage - target2Percentage).toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T3-dif</td>
                <td><p className='field'>{buyStats.buyPriceT3dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT3dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT3dif.toFixed(1)} %</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 4</td>
                <td><p className='field'>{buyStats.buyPriceT4.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT4.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT4.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target4Trades} / ${(100 - stopLossPercentage - target1Percentage - target2Percentage - target3Percentage).toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T4-dif</td>
                <td><p className='field'>{buyStats.buyPriceT4dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT4dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT4dif.toFixed(1)} %</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 5</td>
                <td><p className='field'>{buyStats.buyPriceT5.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT5.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT5.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target5Trades} / ${(100 - stopLossPercentage - target1Percentage - target2Percentage - target3Percentage - target4Percentage).toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T5-dif</td>
                <td><p className='field'>{buyStats.buyPriceT5dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT5dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT5dif.toFixed(1)} %</p></td>
            </tr>
            <tr>
                <td className='first-column'>Target 6</td>
                <td><p className='field'>{buyStats.buyPriceT6.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT6.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT6.toFixed(1)} %</p></td>
                <td rowSpan={2}><p className='field'>{`${target6Trades} / ${target6Percentage.toFixed(1)}%`}</p></td>
            </tr>
            <tr>
                <td className='first-column'>T6-dif</td>
                <td><p className='field'>{buyStats.buyPriceT6dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyAvgStats.buyPriceT6dif.toFixed(1)} %</p></td>
                <td><p className='field'>{buyMinStats.buyPriceT6dif.toFixed(1)} %</p></td>
            </tr>
        </tbody>
    </table>
    );
}