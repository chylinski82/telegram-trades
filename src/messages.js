const allMessages = require('./result.json');

const searchForKeyword = (data, keyword) => {
    // function to search for a specific keyword in the 'data' object
    return data.messages.filter(message => {
        // filter through each message
        if (typeof message.text === "string") {
            // if the message text is a string
            return message.text.includes(keyword);
            // check if the text includes the keyword
        } else if (Array.isArray(message.text)) {
            // if the message text is an array
            return message.text.some(text => typeof text === "string" && text.includes(keyword));
            // check if any element in the array is a string and includes the keyword
        }
    });
};

const cryptoTrades = searchForKeyword(allMessages, "BTC");
// search for crypto trades by looking for the keyword "BTC"

const hits = searchForKeyword(allMessages, "HIT");
// search for hits by looking for the keyword "HIT"

const formattedHits = hits.map(hit => {
    let order, hitValue;

    const hitString = Object.values(hit)[6][1];
    // extract the hit value from the hit string
    const match = typeof(hitString) === 'string' && hitString.match(/HIT (\d+(\.\d+)?)/);
    hitValue = match? Number(match[1]) : undefined;
   
    const entities = hit.text_entities[hit.text_entities.length - 2];
    const orderRegex = /#ORDER(\d+)/;
    let matchOrder;
    // extract the order number from the entities object
    if (hit && hit.text_entities && entities && hit.text_entities && entities.text.match(orderRegex))  {
        matchOrder = hit.text_entities && entities.text
    }
    if (matchOrder) {
        order = matchOrder
    }

    return { order, hitValue }

})

  const formattedTrades = cryptoTrades.map(trade => {
    const pair = `${trade.text[0].text}/BTC`;
    let order, buyMin, buy, stopLoss, target1, target2, target3, target4, target5, target6;
    const text = `${trade.text[1]}.`;
    const entities = trade.text_entities[trade.text_entities.length - 2];

    const orderRegex = /#ORDER(\d+)/;
    let matchOrder;
    if(typeof(entities) === "object" && entities !== null) {
        matchOrder = Object.values(entities)[1].match(orderRegex);
    }
    if (matchOrder) {
        order = matchOrder
    }

    const buyRegex = /Buy✅: (\d+) - (\d+)/;
    const matchBuy = text.match(buyRegex);
    if (matchBuy) {
        buyMin = Number(matchBuy[1]);
        buy = Number(matchBuy[2]);
    }

    const stoplossRegex = /Stoploss🛑(-?\d+(\.\d+)?)\n/;
    const matchSL = text.match(stoplossRegex);
    if (matchSL) {
        stopLoss = Number(`${matchSL}.`.slice(10, `${matchSL}.`.indexOf('\n')))
    }

    const t1Regex = /1⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT1 = text.match(t1Regex);
    if (matchT1) {
        target1 = Number(`${matchT1}.`.slice(2, `${matchT1}.`.indexOf('\n')))
    }

    const t2Regex = /2⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT2 = text.match(t2Regex);
    if (matchT2) {
        target2 = Number(`${matchT2}.`.slice(2, `${matchT2}.`.indexOf('\n')))
    }

    const t3Regex = /3⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT3 = text.match(t3Regex);
    if (matchT3) {
        target3 = Number(`${matchT3}.`.slice(2, `${matchT3}.`.indexOf('\n')))
    }

    const t4Regex = /4⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT4 = text.match(t4Regex);
    if (matchT4) {
        target4 = Number(`${matchT4}.`.slice(2, `${matchT4}.`.indexOf('\n')))
    }

    const t5Regex = /5⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT5 = text.match(t5Regex);
    if (matchT5) {
        target5 = Number(`${matchT5}.`.slice(2, `${matchT5}.`.indexOf('\n')))
    }

    const t6Regex = /6⃣(-?\d+(\.\d+)?)\s+\n/;
    const matchT6 = text.match(t6Regex);
    if (matchT6) {
        target6 =Number(`${matchT6}.`.slice(2, `${matchT6}.`.indexOf('\n')))
    }

    return {
        tradingPair: pair.slice(1),
        time: trade.date.toString(),
        buyMin,
        buy,
        stopLoss,
        target1: { value: target1 - 1, hit: false}, 
        target2: { value: target2 - 1, hit: false}, 
        target3: { value: target3 - 1, hit: false}, 
        target4: { value: target4 - 1, hit: false},
        target5: { value: target5 - 1, hit: false},
        target6: { value: target6 - 1, hit: false},
        order: (orderRegex.test(order) ? order[0] : undefined),
        id: (orderRegex.test(order) ? order[0].substring(1) : undefined)
    }
    
});

const filteredTrades = formattedTrades.filter((trade, index, self) => {
  //checking for the repeated trades, similar trades and empty trades
  for (let i = index + 1; i < self.length; i++) {
      if (trade.id === self[i].id ||
          (trade.tradingPair === self[i].tradingPair &&
              Math.abs(trade.buy - self[i].buy) <= 10 &&
              Math.abs(trade.buyMin - self[i].buyMin) <= 10 &&
              checkTargets(trade, self[i]) &&
              isWithin24hours(trade.time, self[i].time))) {
          return false;
      }
  }
  //checking for consecutive targets
  let previousValue = trade.buy;
  for (let i = 1; i <= 6; i++) {
      let target = `target${i}`;
      if (trade[target] && trade[target].value < previousValue) {
          return false;
      }
      previousValue = trade[target].value;
  }
  return true;
});

// helper function for filteredTrades (incorrect / targets)
function checkTargets(trade1, trade2) {
  for (let i = 1; i <= 6; i++) {
      let target1 = `target${i}`;
      let target2 = `target${i}`;
      if (trade1[target1] && trade2[target2] && Math.abs(trade1[target1].value - trade2[target2].value) > 10) {
          return false;
      }
  }
  return true;
}

// helper function for filteredTrades (similar/ same trades)
function isWithin24hours(time1, time2) {
  let date1 = new Date(time1);
  let date2 = new Date(time2);
  let timeDiff = Math.abs(date2 - date1);
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays <= 1;
}


// final array for the Firestore database
const telegramArr = filteredTrades.filter(obj => 
    Object.values(obj).every(val => val !== undefined)
); 
// final array of 'hits' for telegramArr
const hitsArr = formattedHits.filter(obj => 
    Object.values(obj).every(val => val !== undefined)
);

// applying hitsArr to telegramArr
for (let i = 0; i < telegramArr.length; i++) {
  for (let j = 0; j < hitsArr.length; j++) {
      if (telegramArr[i].order === hitsArr[j].order) {
          for (let k = 1; k <= 6; k++) {
              let target = `target${k}`;
              if (telegramArr[i][target] && telegramArr[i][target].value === hitsArr[j].hitValue) {
                  telegramArr[i][target].hit = true;
              }
          }
      }
  }
}

const updatedTelegramArr = telegramArr.filter(el => el.buy !== 0 || el.buyMin !== 0 || el.stopLoss !== 0);

 module.exports = updatedTelegramArr;
