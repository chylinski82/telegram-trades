const { Telegraf } = require('telegraf');
const API_TOKEN = '5760515336:AAGqdiV-RtHDe3ifGg8cfWcfrxKkf0zC9AE'
const bot = new Telegraf(API_TOKEN);

bot.use((ctx, next) => {
    ctx.session = ctx.session || {}
    ctx.session.counter = ctx.session.counter || 0;
    ctx.session.counter++;
    return next();
});

bot.on('message', (ctx) => {
    if (ctx.message.from.username === 'VIP - Trading Nation') {
      // do something with the message
      console.log('vip', ctx.message.text);
    }
    console.log('other', ctx.message.text)
  });
 
bot.command('stop', (ctx) => {
  bot.stop();
});


bot.telegram.getMe().then((botInfo) => {
    console.log(`Connected as ${botInfo.username}`, botInfo);
}).catch(err => console.log('bot info error', err))

bot.telegram.getUpdates().then(updates => {
  updates.forEach(update => {
      console.log(update.message.chat.id);
  });
}).catch(error => {
  console.log(error);
});


/*bot.telegram.getHistory(chatId, {limit: 10}).then(result => {
  console.log(result);
}).catch(error => {
  console.log(error);
});*/


bot.startPolling().catch(err => console.log('start polling error', err));


