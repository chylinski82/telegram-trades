const allMessages = require('./result.json');

const searchForKeyword = (data, keyword) => {
    return data.messages.filter(message => {
        if (typeof message.text === "string") {
            return message.text.includes(keyword);
        } else if (Array.isArray(message.text)) {
            return message.text.some(text => typeof text === "string" && text.includes(keyword));
        }
    });
};

const extractOrderNumber = (textEntities) => {
    const orderRegex = /#ORDER(\d+)/;
    const entities = textEntities[textEntities.length - 2];
    if (entities && typeof entities.text === "string") {
        const match = entities.text.match(orderRegex);
        if (match) {
            return match[1];
        }
    }
    return undefined;
};

const extractHitValue = (text) => {
    const hitRegex = /HIT (\d+(\.\d+)?)/;
    if (typeof text === "string") {
        const match = text.match(hitRegex);
        if (match) {
            return Number(match[1]);
        }
    }
    return undefined;
};

const extractTradeData = (text) => {
    const pairRegex = /(.+)\/BTC/;
    const buyRegex = /Buy✅: (\d+) - (\d+)/;
    const stoplossRegex = /Stoploss🛑(-?\d+(\.\d+)?)\n/;
    const targetRegex = /([1-6]⃣)(-?\d+(\.\d+)?)\s+\n/g;
    const data = {};
    if (Array.isArray(text) && text.length >= 2) {
        const pairMatch = text[0].text.match(pairRegex);
        if (pairMatch) {
            data.pair = pairMatch[1];
        }
        const buyMatch = text[1].text.match(buyRegex);
        if (buyMatch) {
            data.buyMin = Number(buyMatch[1]);
            data.buy = Number(buyMatch[2]);
        }
        const stopLossMatch = text[1].text.match(stoplossRegex);
        if (stopLossMatch) {
            data.stopLoss = Number(stopLossMatch[1]);
        }
        let targetMatch = text[1].text.match(targetRegex);
        while (targetMatch) {
            data[`target${targetMatch[1]}`] = Number(targetMatch[2]);
            targetMatch = text[1].text.match(targetRegex);
        }
    }
    return data;
};

const cryptoTrades = searchForKeyword(allMessages, "BTC");
const formattedTrades = cryptoTrades.map(trade => {
    const order = extractOrderNumber(trade.text_entities);
    const tradeData = extractTradeData(trade.text);
    return { ...tradeData, order };
});

const telegramArr = formattedTrades.filter(obj => 
    Object.values(obj).every(val => val !== undefined)
);

const targetHits = searchForKeyword(allMessages, "HIT");
const formattedHits = targetHits.map(hit => {
    const order = extractOrderNumber(hit.text_entities);
    const hitValue = extractHitValue(hit.text);
    return { order, hitValue };
});

for (let i = 0; i < telegramArr.length; i++) {
    for (let j = 0; j < hitsArr.length; j++) {
      if (telegramArr[i].order === hitsArr[j].order) {
        if (telegramArr[i].target1.value === hitsArr[j].hitValue) {
          telegramArr[i].target1.hit = true;
        } else if (telegramArr[i].target2.value === hitsArr[j].hitValue) {
          telegramArr[i].target2.hit = true;
        } else if (telegramArr[i].target3.value === hitsArr[j].hitValue) {
          telegramArr[i].target3.hit = true;
        } else if (telegramArr[i].target4.value === hitsArr[j].hitValue) {
          telegramArr[i].target4.hit = true;
        } else if (telegramArr[i].target5.value === hitsArr[j].hitValue) {
          telegramArr[i].target5.hit = true;
        } else if (telegramArr[i].target6.value === hitsArr[j].hitValue) {
          telegramArr[i].target6.hit = true;
        }
      }
    }
  }

console.log(telegramArr);
