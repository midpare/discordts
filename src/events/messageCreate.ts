import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, MessageCreateOptions, PermissionFlagsBits, StringSelectMenuBuilder, TextChannel, TextInputBuilder, TextInputStyle } from 'discord.js';
import { Event } from '../managers/Event';
import { Utils } from '../structures/Utils';
import { search } from 'play-dl'
import { InteractionOption } from '../structures/interactions/InteractionOptions';

export default new Event({
  name: 'messageCreate',
  execute: async (client, msg) => {
    if (!msg.guildId || msg.author.bot)
      return;
    const { guildId } = msg

    const guild = await client.models.guild.findOne({ id: guildId });
    const logChannel = <TextChannel>msg.guild?.channels.cache.get(guild.log.message);
    const msgChannel = <TextChannel>msg.channel;

    if (msg.channelId == guild.music.channel) {
      const searchTitle = msg.content;
      const result = await search(searchTitle, { limit: 5 });
      const customIds = Utils.uuid(5);
      const data: Record<string, string>[] = new Array();
      const selectMenuOptions = result.map((e, i) => {
        const { url, title, durationRaw: duration } = e;

        data.push({
          url,
          title: title!,
          search: searchTitle,
          duration
        });

        return {
          label: `(${duration}) ${title?.slice(0, 100 - duration.length - 3)}`,
          description: '위 노래를 재생합니다.',
          value: customIds[i],
        };
      });
      const menu = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
        new StringSelectMenuBuilder()
          .setCustomId('play music')
          .setOptions(selectMenuOptions)
          .setPlaceholder('이곳을 눌러 선택해주세요.')
      );

      const button = new ActionRowBuilder<ButtonBuilder>().setComponents(
        new ButtonBuilder()
          .setCustomId('cancel')
          .setLabel('취소')
          .setStyle(ButtonStyle.Secondary),
      );
      if (msg.channel.type != ChannelType.GuildText) 
        return; 
      const message = await msg.channel?.send({ content: `<@${msg.author.id}>검색결과 5개 중 원하는 노래를 선택해주세요.`, components: [menu, button] });
      if (msg.guild?.members.cache.get(client.user?.id!)?.permissions.has(PermissionFlagsBits.ManageMessages)) {
        msg.delete();
      }
      for (const i in customIds) {
        client.interactionOptions.set(customIds[i], new InteractionOption({
          ids: [msg.author.id],
          guildId: msg.guildId!,
          cmd: '',
          customIds,
          message,
          data: data[i],
        }));
      }
    }
    if (logChannel) {
      if (msg.content.includes('http')) {
        msg.content = msg.content.replace('http', '<http') + '>'
      }
      if (msg.mentions.members?.first()) {
        msg.content
      }
      const messageOption: MessageCreateOptions = {}
      messageOption.content = `<t:${msg.createdTimestamp.toString().substring(0, 10)}>\n-${msgChannel.name}-\n${msg.member?.displayName}#${msg.author.discriminator}: ${msg.content}`
      messageOption.files = Array.from(msg.attachments.values());
      logChannel.send(messageOption);
    }
  },
});