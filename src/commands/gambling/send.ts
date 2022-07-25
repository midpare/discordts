import { Command } from '../../managers/Commands';

export default new Command({
  name: '송금',
  aliases: ['이체', '돈보내기'],
  category: '도박',
  usage: '송금 <유저> <돈>',
  description: '자신의 돈을 맨션한 <유저>에게 <돈>만큼 송금합니다.',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await client.models.gambling.findOne({ id });

    const target = msg.mentions.members?.first();
    if (!target)
      return msg.reply('송금할 유저를 맨션해주시기 바랍니다.');

    const targetUser = await client.models.gambling.findOne({ id: target.id });
    if (!targetUser)
      return msg.reply('송금할 유저가 가입을 하지 않았습니다.');

    const money = parseFloat(args[1]);

    if (!Number.isInteger(money) || money <= 0)
      return msg.reply('정확한 금액을 입력해주시기 바랍니다.');

    if (user.money < money)
      return msg.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);

    (await client.models.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
    (await client.models.gambling.updateOne({ id: target.id }, { $inc: { money: money } })).matchedCount;
    msg.reply(`성공적으로 ${targetUser.name}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
  },
});