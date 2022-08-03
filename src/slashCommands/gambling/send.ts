import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

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
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '돈',
      description: '송금할 돈을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
    } 
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    const target = options.getMember('유저');

    if (!(target instanceof GuildMember)) {
      Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
      return;
    }
      
    const targetUser = await client.models.gambling.findOne({ id: target.id, guildId: target.guild.id });
    if (!targetUser) {
      Utils.reply(interaction, '송금할 유저가 가입을 하지 않았습니다.');
      return;
    }

    const money = options.getInteger('돈', true);

    if (user.money < money) {
      Utils.reply(interaction, `현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
      return;
    }

    (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
    (await client.models.gambling.updateOne({ id: target.id, guildId: target.guild.id }, { $inc: { money: money } })).matchedCount;
    interaction.reply(`성공적으로 ${targetUser.name}님에게 ${money.toLocaleString()}원을 송금했습니다!`);
  },
});