import React from 'react';

export const Strategy = (props) => {
  // Get the data from Stats
  const { stopLossPercentage,
          target1Percentage,
          target2Percentage,
          target3Percentage,
          target4Percentage,
          target6Percentage,
          buyStats, buyMinStats, buyAvgStats } = props;

  function calculateProfitability(buyLevel, target) {
    // Calculate the likelihood of reaching the target
    let targetLikelihood;
    switch (target) {
      case 1:
        targetLikelihood = 100 - stopLossPercentage;
        break;
      case 2:
        targetLikelihood = 100 - stopLossPercentage - target1Percentage;
        break;
      case 3:
        targetLikelihood = 100 - stopLossPercentage - target1Percentage - target2Percentage;
        break;
      case 4:
        targetLikelihood = 100 - stopLossPercentage - target1Percentage - target2Percentage - target3Percentage;
        break;
      case 5:
        targetLikelihood = 100 - stopLossPercentage - target1Percentage - target2Percentage - target3Percentage - target4Percentage;
        break;
      case 6:
        targetLikelihood = target6Percentage;
        break;
      default:
        targetLikelihood = 0;
    }

    // Get the percentage of traded amount that reaching the target will entail
    let targetPercentage;
    switch (buyLevel) {
      case 'buy':
        targetPercentage = buyStats[`buyPriceT${target}`];
        break;
      case 'buyAvg':
        targetPercentage = buyAvgStats[`buyPriceT${target}`];
        break;
      case 'buyMin':
        targetPercentage = buyMinStats[`buyPriceT${target}`];
        break;
      default:
        targetPercentage = 0;
    }

    // Get the percentage of traded amount that reaching the stop loss will entail
    let stopLossPercentageForBuyLevel;
    switch (buyLevel) {
      case 'buy':
        stopLossPercentageForBuyLevel = buyStats.buyPriceSL;
        break;
      case 'buyAvg':
        stopLossPercentageForBuyLevel = buyAvgStats.buyPriceSL;
        break;
      case 'buyMin':
        stopLossPercentageForBuyLevel = buyMinStats.buyPriceSL;
        break;
      default:
        stopLossPercentageForBuyLevel = 0;
    }

    // Calculate the expected return of the strategy
    //const expectedReturn = (targetLikelihood * targetPercentage) - (stopLossPercentageForBuyLevel * (100 - targetLikelihood));

    //console.log('likelihood', targetLikelihood, 'stoploss', stopLossPercentageForBuyLevel, 'target %', targetPercentage, 'expected return', expectedReturn)
    return { likelihood: targetLikelihood,
            percentage:  targetPercentage, 
            stopLossPercentageForBuyLevel };
  }

    const strategies = [
        {
          label: 'Buy at Buy, Target 1',
          buyLevel: 'buy',
          target: 1,
          likelihood: calculateProfitability('buy', 1).likelihood,
          percentage: calculateProfitability('buy', 1).percentage,
          stopLossPercentageForBuyLevel: calculateProfitability('buy', 1).stopLossPercentageForBuyLevel,
        },
        {
          label: 'Buy at Buy, Target 2',
          buyLevel: 'buy',
          target: 2,
          likelihood: calculateProfitability('buy', 2).likelihood,
          percentage: calculateProfitability('buy', 2).percentage,
          stopLossPercentageForBuyLevel: calculateProfitability('buy', 2).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at Buy, Target 3',
            buyLevel: 'buy',
            target: 3,
            likelihood: calculateProfitability('buy', 3).likelihood,
            percentage: calculateProfitability('buy', 3).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buy', 3).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at Buy, Target 4',
            buyLevel: 'buy',
            target: 4,
            likelihood: calculateProfitability('buy', 4).likelihood,
            percentage: calculateProfitability('buy', 4).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buy', 4).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at Buy, Target 5',
            buyLevel: 'buy',
            target: 5,
            likelihood: calculateProfitability('buy', 5).likelihood,
            percentage: calculateProfitability('buy', 5).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buy', 5).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at Buy, Target 6',
            buyLevel: 'buy',
            target: 6,
            likelihood: calculateProfitability('buy', 6).likelihood,
            percentage: calculateProfitability('buy', 6).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buy', 6).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 1',
            buyLevel: 'buyAvg',
            target: 1,
            likelihood: calculateProfitability('buyAvg', 1).likelihood,
            percentage: calculateProfitability('buyAvg', 1).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 1).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 2',
            buyLevel: 'buyAvg',
            target: 2,
            likelihood: calculateProfitability('buyAvg', 2).likelihood,
            percentage: calculateProfitability('buyAvg', 2).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 2).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 3',
            buyLevel: 'buyAvg',
            target: 3,
            likelihood: calculateProfitability('buyAvg', 3).likelihood,
            percentage: calculateProfitability('buyAvg', 3).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 3).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 4',
            buyLevel: 'buyAvg',
            target: 4,
            likelihood: calculateProfitability('buyAvg', 4).likelihood,
            percentage: calculateProfitability('buyAvg', 4).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 4).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 5',
            buyLevel: 'buyAvg',
            target: 5,
            likelihood: calculateProfitability('buyAvg', 5).likelihood,
            percentage: calculateProfitability('buyAvg', 5).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 5).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyAvg, Target 6',
            buyLevel: 'buyAvg',
            target: 6,
            likelihood: calculateProfitability('buyAvg', 6).likelihood,
            percentage: calculateProfitability('buyAvg', 6).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyAvg', 6).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 1',
            buyLevel: 'buyMin',
            target: 1,
            likelihood: calculateProfitability('buyMin', 1).likelihood,
            percentage: calculateProfitability('buyMin', 1).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 1).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 2',
            buyLevel: 'buyMin',
            target: 2,
            likelihood: calculateProfitability('buyMin', 2).likelihood,
            percentage: calculateProfitability('buyMin', 2).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 2).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 3',
            buyLevel: 'buyMin',
            target: 3,
            likelihood: calculateProfitability('buyMin', 3).likelihood,
            percentage: calculateProfitability('buyMin', 3).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 3).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 4',
            buyLevel: 'buyMin',
            target: 4,
            likelihood: calculateProfitability('buyMin', 4).likelihood,
            percentage: calculateProfitability('buyMin', 4).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 4).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 5',
            buyLevel: 'buyMin',
            target: 5,
            likelihood: calculateProfitability('buyMin', 5).likelihood,
            percentage: calculateProfitability('buyMin', 5).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 5).stopLossPercentageForBuyLevel,
        },
        {
            label: 'Buy at BuyMin, Target 6',
            buyLevel: 'buyMin',
            target: 6,
            likelihood: calculateProfitability('buyMin', 6).likelihood,
            percentage: calculateProfitability('buyMin', 6).percentage,
            stopLossPercentageForBuyLevel: calculateProfitability('buyMin', 6).stopLossPercentageForBuyLevel,
        }
      ];
         
  return (
    <table className='tile fit-width'>
      <thead>
        <tr>
          <th className='first-column'></th>
          <th>Buy</th>
          <th>BuyAvg</th>
          <th>BuyMin</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map(target => (
          <tr key={target}>
            <th className='first-column'>Target {target}</th>
            <td>
              <p className='field'>
                {((calculateProfitability('buy', target).likelihood * calculateProfitability('buy', target).percentage) - calculateProfitability('buy', target).stopLossPercentageForBuyLevel).toFixed(1)}
              </p>
            </td>
            <td>
              <p className='field'>
                {((calculateProfitability('buyAvg', target).likelihood * calculateProfitability('buyAvg', target).percentage) - calculateProfitability('buyAvg', target).stopLossPercentageForBuyLevel).toFixed(1)}
              </p>
            </td>
            <td>
              <p className='field'>
                {((calculateProfitability('buyMin', target).likelihood * calculateProfitability('buyMin', target).percentage) - calculateProfitability('buyMin', target).stopLossPercentageForBuyLevel).toFixed(1)}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );   
}      

