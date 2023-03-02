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

    if (msg.author.id == '446068726849208341' && msg.content == 'send vote!') {
      const users = [
        '699942311215366174', '659008807963328514', '915562060631400468',
        '766274189346209823', '446068726849208341', '849997691832500244',
        '607788765624270859', '783889899359043594', '716196838973243433', 
        '917682046095216690'
      ];
  
      const row = new ActionRowBuilder<ButtonBuilder>()
      for (let i = 0; i < 5; i++) {
        row.addComponents(
          new ButtonBuilder()
            .setCustomId(`vote ${i}`)
            .setStyle(ButtonStyle.Primary)
            .setLabel(`${i + 1}점`),
        );
      }
      const guild = client.guilds.cache.get('910521119713394738')!
      for (const id of users) {
        const user = guild.members.cache.get(id)?.user!;
        const channel = await user.createDM();
        
        channel.send({ content: '놀이터 서버의 ㄱㅈ#1971님의 강퇴에 대한 투표를 시행합니다.\n원하는 점수를 선택해주세요.\n1점이 강퇴 반대, 5점이 강퇴 찬성입니다.\n재투표를 원하시는 경우 다른 점수를 선택해주세요.\n모든 투표는 익명으로 진행됩니다.', components: [row] });
      }
    }
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