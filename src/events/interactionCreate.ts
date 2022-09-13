import { Client } from '../structures/Client';
import { BaseInteraction, CommandInteractionOptionResolver, CacheType, TextChannel, GuildMember, CommandInteractionOption, User, ApplicationCommandOptionType } from 'discord.js';
import { Event } from '../managers/Event';
import { Utils } from '../structures/Utils';

export default new Event({
  name: 'interactionCreate',
  execute: async (client: Client, interaction: BaseInteraction) => {
    const { guildId, user: { id } } = interaction;
    if (!guildId)
      return;
      
    const user = await client.models.config.findOne({ id, guildId });

    if (user && !user.activity) {
      (await client.models.config.updateOne({ id, guildId }, { $set: { activity: true } })).matchedCount;
    }

    if (interaction.isChatInputCommand()) {
      const time = new Date().getTime();

      const { commandName, options } = interaction;

      const guild = await client.models.guild.findOne({ id: guildId });

      const gambChannel = interaction.guild?.channels.cache.get(guild.gambling);
      const cmdChannel = interaction.guild?.channels.cache.get(guild.command);
      const event = client.commands.get(commandName)!;

      if (!event)
        return;

      switch (event.category) {
        case '도박':
        case '베팅':
        case '코인':
          if (event.name == '가입')
            break;

          const gambUser = await client.models.gambling.findOne({ id, guildId });
          if (event.name != '가입' && !gambUser) {
            Utils.reply(interaction, '가입되지 않은 유저입니다 /가입 을 통해 가입해주시기 바랍니다.');
            return;
          }

          const leftTime = 1000 * 60 * 60 - time + gambUser.bankruptcyTime;
          const leftminute = Math.floor(leftTime / (1000 * 60));
          const leftsecond = leftTime / 1000 - leftminute * 60;

          if (leftTime > 0) {
            Utils.reply(interaction, `파산한 유저는 한시간동안 도박을 할 수 없습니다.\n남은 시간: ${leftminute}분 ${Math.floor(leftsecond)}초`);
            return;
          }

          if (!gambChannel)
            break;

          if (interaction.channel != gambChannel) {
            Utils.reply(interaction, '이 명령어는 도박방에서만 사용할 수 있습니다.');
            return;
          }
          break;
        case '기본':
        case '관리자':
          break;
        default:
          if (!cmdChannel)
            break;

          if (interaction.channel != cmdChannel) {
            Utils.reply(interaction, '이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
            return;
          }
          break;
      }

      const result = await event.execute({ interaction, options: options as CommandInteractionOptionResolver<CacheType>, client });
      if (result == 0)
        return;

      const logChannel = <TextChannel>interaction.guild?.channels.cache.get(guild.log.command);
      if (!logChannel)
        return;

      const member = <GuildMember>interaction.member
      const getOptions = (e: CommandInteractionOption) => {
        switch(e.name) {
          case '돈':
            return `${e.name}: ${e.value}원`
          case '수량' ||'개수':
            return `${e.name}: ${e.value}개`   
        }
        switch(e.type) {
          case ApplicationCommandOptionType.String:
            return `${e.name}: "${e.value}"`
          case ApplicationCommandOptionType.User:
            return `${e.name}: ${e.user?.username}`
          case ApplicationCommandOptionType.Channel:
            return `${e.name}: ${e.channel?.name}`
          case ApplicationCommandOptionType.Role:
            return `${e.name}: ${e.role?.name}`
        }
        return `${e.name}: ${e.value}`
      } 
      console.log(options.data);
      logChannel.send(`${member.displayName}님이 ${commandName}(${options.data.map(getOptions)})를 사용했습니다.`)
    } else if (interaction.isButton() || interaction.isSelectMenu()) {
      const options = client.interactionOptions.get(interaction.customId);
      let event = client.interactions.get(interaction.customId);

      if (!options && event) {
        event.execute({ interaction, options, client });
        return;
      }

      if (!options) {
        interaction.reply({ content: '사용되지 않거나 종료된 상호작용입니다.', ephemeral: true });
        return;
      }

      event = client.interactions.get(options.cmd);
      if (!event || (!options.ids.includes(id) && options.guildId != guildId)) {
        interaction.reply({ content: '이 상호작용을 사용할 수 없습니다.', ephemeral: true });
        return;
      }

      event.execute({ interaction, options, client });
      for (const id of options.customIds) {
        client.interactionOptions.delete(id);
      }

      if (event.deleted) {
        for (const msg of options.messages) {
          msg.delete();
        }
      }
    }
  },
});