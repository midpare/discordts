import { ApplicationCommandOptionType, EmbedBuilder, TextChannel } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언추가',
  category: '기본',
  usage: '망언추가 <유저> <망언>',
  description: '유저의 망언을 추가합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 추가할 유저를 맨션합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '내용',
      description: '추가할 내용을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true)
    const content = options.getString('내용', true);

    const { guildId } = interaction;
    const { id } = target;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });

    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.slang);

    if (!channel) {
      Utils.reply(interaction, '망언 채널을 등록해주시기 바랍니다.');
      return;
    }

    const user = await client.models.config.findOne({ id, guildId });

    if (user.slangs.includes(content)) {
      Utils.reply(interaction, '이 망언은 이미 추가되어있습니다.');
      return;
    }

    const messages = await channel.messages.fetch();

    let flag = 0;

    for (const [_, message] of messages) {
      if (message.embeds.length < 1)
        continue;
      const id = message.embeds[0].data.title?.split('(')[1].split(')')[0]

      if (id == target.id) {
        for (let i = 0; i < user.slangs.length; i++) {
          user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
        }

        user.slangs.push(`${user.slangs.length + 1}. ${content}`);

        const embed = new EmbedBuilder()
          .setTitle(`${user.name}(${user.id})님의 망언`)
          .setDescription(user.slangs.join('\n'));
        
        message.edit({ embeds: [embed] });
        flag = 1;
        break;
      }
    }
    
    if (flag == 0) {
      const embed = new EmbedBuilder()
        .setTitle(`${user.name}(${user.id})님의 망언`)
        .setDescription(`1. ${content}`);
      
      channel.send({ embeds: [embed] });
    }

    (await client.models.config.updateOne({ id, guildId }, { $push: { slangs: content } })).matchedCount;
    Utils.reply(interaction, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
  }
});