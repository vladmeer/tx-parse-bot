import { Menu } from '@grammyjs/menu';

export const botMenu = new Menu('monitorfi-bot-menu')
  .text('Get Balance', (ctx: any) => {
    ctx.session.method = 'balance';
    ctx.reply('Input the wallet address');
  })
  .text('Parse Swap', async (ctx: any) => {
    ctx.session.method = 'parse-swap';
    ctx.reply('Input the tx signature');
  });
