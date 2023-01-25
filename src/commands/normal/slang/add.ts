import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, EmbedBuilder, TextChannel } from 'discord.js';
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

    const { user: { id }, guildId } = interaction;
    const { id: targetId } = target;

    if (!guildId)
      return 0;

    if (id == targetId) {
      Utils.reply(interaction, '자신의 망언을 추가할 수 없습니다.');
      return 0;
    }
    
    const guild = await client.models.guild.findOne({ id: guildId });

    const channel = <TextChannel>interaction.guild?.channels.cache.get(guild.slang);

    if (!channel) {
      Utils.reply(interaction, '망언 채널을 등록해주시기 바랍니다.');
      return 0;
    }

    const user = await client.models.config.findOne({ id: targetId, guildId });

    if (user.slangs.includes(content)) {
      Utils.reply(interaction, '이 망언은 이미 추가되어있습니다.');
      return 0;
    }

    const message = (await channel.messages.fetch()).filter(m => {
      if (m.embeds.length > 0) 
        return m.embeds[0].data.title?.split('(')[1].split(')')[0] == targetId;
    }).first();

    if (!message) {
      const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId('check slang')
          .setLabel('망언 확인')
          .setStyle(ButtonStyle.Primary)
      );

      const embed = new EmbedBuilder()
        .setTitle(`${user.name}(${user.id})님의 망언`)
        .setDescription(`아래 버튼을 눌러 '${user.name}'님의 망언을 확인할 수 있습니다.`);
      channel.send({ embeds: [embed], components: [row] });
    }

    (await client.models.config.updateOne({ id: targetId, guildId }, { $push: { slangs: content } })).matchedCount;
    Utils.reply(interaction, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
    return 1;
  },
});