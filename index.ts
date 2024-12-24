import { chatMembers } from '@grammyjs/chat-members';
import dotenv from 'dotenv';
import { Bot, Context, MemorySessionStorage, session } from 'grammy';
import { type ChatMember } from 'grammy/types';

import { getWalletBalance, parseRaydiumSwap } from './src/lib';
import { Session, SessionContext } from './src/contexts';
import { botMenu } from './src/menu';
import {
  getWalletBalanceError,
  parseSwapError,
  validatePublicKey,
  validateTransactionSignature,
} from './src/utils';

dotenv.config();

const token = process.env.BOT_TOKEN;
console.log("🚀 ~ token:", token)
if (!token) {
  throw new Error(
    'You have to provide the bot-token from @BotFather via environment variable (BOT_TOKEN)'
  );
}
function getSessionKey(ctx: Context): string | undefined {
  return ctx.from?.id.toString();
}

const adapter = new MemorySessionStorage<ChatMember>();
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot<SessionContext>(token); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
bot.use(
  session({
    initial: (): Session => ({ method: '' }),
    getSessionKey,
  })
);
bot.use(chatMembers(adapter));
bot.use(botMenu);

// Handle the /start command.
bot.command('start', (ctx) =>
  ctx.reply('Welcome to MonitorFi Bot!', {
    reply_markup: botMenu,
  })
);

// Handle other messages.
bot.on('message', async (ctx) => {
  switch (ctx.session.method) {
    case 'balance': {
      const address = ctx.message.text || '';

      if (!validatePublicKey(address)) {
        ctx.reply(getWalletBalanceError('Invalid wallet address'));
      } else {
        try {
          const balance = await getWalletBalance(address);
          ctx.reply(`${balance.solAmount} SOL | ${balance.solValue} USD`);
        } catch (e) {
          console.error(e);
          ctx.reply(getWalletBalanceError(JSON.stringify(e)));
          break;
        }
      }
      ctx.session.method = '';
      break;
    }
    case 'parse-swap': {
      const signature = ctx.message.text || '';

      if (!validateTransactionSignature(signature)) {
        ctx.reply(parseSwapError('Invalid transaction signature'));
      } else {
        try {
          const info = await parseRaydiumSwap(signature);
          ctx.reply(JSON.stringify(info, null, 2));
        } catch (e) {
          console.error(e);
          ctx.reply(parseSwapError(JSON.stringify(e)));
        }
      }
      ctx.session.method = '';
      break;
    }
    default: {
      ctx.reply('Trigger the menu', {
        reply_markup: botMenu,
      });
    }
  }
});

bot.catch((error) => {
  console.error('[BOT HANDLER ERROR]:', error);
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start({
  onStart(botInfo) {
    console.log(new Date(), 'Bot starts as', botInfo.username);
  },
});
