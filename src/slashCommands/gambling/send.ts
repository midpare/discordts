import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '송금',
  aliases: ['이체', '돈보내기'],
  category: '도박',
  usage: '송금 <유저> <돈>',
  description: '자신의 돈을 맨션한 <유저>에게 <돈>만큼 송금합니다.',
  options: [
    {
      name: '유저',
      description: '송금할 유저를 맨션합니다.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: '돈',
      description: '송금할 돈을 입력합니다.',
      required: true,
      type: ApplicationCommandOptionType.Integer,
      min_value: 1,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });

    const target = options.getMentionable('유저', true)

    if (!(target instanceof GuildMember)) {
      interaction.reply('정확한 유저를 맨션해주시기 바랍니다.');
      return;
    }

    const targetUser = await client.models.gambling.findOne({ id: target.id });
    if (!targetUser) {
      interaction.reply('송금할 유저가 가입을 하지 않았습니다.');
      return;
    }

    const money = options.getInteger('돈', true);

    if (user.money < money) {
      interaction.reply(`현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
      return;
    }

    (await client.models.gambling.updateOne({ id }, { $inc: { money: -money } })).matchedCount;
    (await client.models.gambling.updateOne({ id: target.id }, { $inc: { money: money } })).matchedCount;
    interaction.reply(`성공적으로 ${targetUser.name}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
  },
});