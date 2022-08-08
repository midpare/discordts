import { Client } from '../structures/Client';
import { BaseInteraction, CommandInteractionOptionResolver, CacheType } from 'discord.js';
import { Event } from '../managers/Event';
import { Utils } from '../structures/Utils';

export default new Event({
  name: 'interactionCreate',
  execute: async (interaction: BaseInteraction) => {
    const client = <Client>interaction.client;
    if (interaction.isChatInputCommand()) {
      const time = new Date().getTime();
      
      const gambChannel = client.channels.cache.get('1000969429158481980');
      const cmdChannel = client.channels.cache.get('1000969483462123591');
      const botTestChannel = client.channels.cache.get('910521119877005368');
      
      const { commandName, options, guildId, user: { id } } = interaction;
      const event = client.commands.get(commandName)!;

      if (!event)
        return;
      
      if (interaction.channel != botTestChannel) {
        switch (event.category) {
          case '도박':
          case '베팅':
          case '코인':
            if (interaction.channel != gambChannel) {
              Utils.reply(interaction, '이 명령어는 도박방에서만 사용할 수 있습니다.');
              return;
            }
            
            if (event.name == '가입') 
              break;
                        
            const user = await client.models.gambling.findOne({ id, guildId });
            if (event.name != '가입' && !user) {
              Utils.reply(interaction, '가입되지 않은 유저입니다 !가입 을 통해 가입해주시기 바랍니다.');
              return;
            }
  
            const leftTime = 1000 * 60 * 60 - time + user.bankruptcy;
            const leftminute = Math.floor(leftTime / (1000 * 60));
            const leftsecond = leftTime / 1000 - leftminute * 60;
  
            if (leftTime > 0) {
              Utils.reply(interaction, `파산한 유저는 한시간동안 도박을 할 수 없습니다.\n남은 시간: ${leftminute}분 ${Math.floor(leftsecond)}초`);
              return;
            }
  
            break;
          case '기본':
          case '관리자':
            break;
          default:
            if (interaction.channel != cmdChannel) {
              Utils.reply(interaction, '이 명령어는 명령어사용방에서만 사용할 수 있습니다.');
              return;
            }
            break;
        }
      }
      try {
        event.execute({ interaction, options: options as CommandInteractionOptionResolver<CacheType>,  client });
      } catch (error) {
        console.error(error);
      }
      
    } else if (interaction.isButton() || interaction.isSelectMenu()) {
      const id = interaction.user.id;
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
      if (!event || !options.ids.includes(id)) {
        interaction.reply({ content: '이 상호작용을 사용할 수 없습니다.', ephemeral: true });
        return;
      }

      try {
        event.execute({ interaction, options, client });
        for (const id of options.customIds) {
          client.interactionOptions.delete(id);
        }

        if (event.deleted) {
          for (const msg of options.messages) {
            msg.delete();
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
});