import { ApplicationCommandOptionType, TextChannel, EmbedBuilder } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언삭제',
  category: '기본',
  usage: '망언삭제 <유저> <망언>',
  description: '유저의 망언을 삭제합니다.',
  options: [
    {
      name: '유저',
      description: '망언을 삭제할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '내용',
      description: '삭제할 망언의 내용을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true);
    const content = options.getString('내용', true);

    const { guildId } = interaction;
    const { id } = target;

    if (!guildId)
      return 0;

    const guild = await client.models.guild.findOne({ id: guildId });
    const channel = <TextChannel>interaction.guild?.channels.cache.get(guild.slang);

    if (!channel) {
      Utils.reply(interaction, '망언 채널을 등록해주시기 바랍니다.');
      return 0;
    }

    const user = await client.models.config.findOne({ id, guildId });

    if (!user.slangs.includes(content)) {
      Utils.reply(interaction, '이 유저는 이 망언을 보유하고 있지 않습니다.');
      return 0;
    } 
    
    const messages = await channel.messages.fetch();

    for (const [_, message] of messages) {
      if (message.embeds.length < 1)
        continue;

      const id = message.embeds[0].data.title?.split('(')[1].split(')')[0]

      if (id == target.id) {    
        if (user.slangs.length == 1) {
          message.delete();
          break;
        }

        const index = user.slangs.indexOf(content);

        user.slangs.splice(index, 1);

        for (let i = 0; i < user.slangs.length; i++) {
          user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
        }

        const embed = new EmbedBuilder()
          .setTitle(`${user.name}(${user.id})님의 망언`)
          .setDescription(user.slangs.join('\n'));
        
        message.edit({ embeds: [embed] });
        break;
      }
    }

    (await client.models.config.updateOne({ id, guildId }, { $pull: { slangs: content }})).matchedCount;
    Utils.reply(interaction, `성공적으로 망언을 삭제했습니다!\n망언 내용: ${content}`);
    return 1;
  },  
});