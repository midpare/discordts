import { EmbedBuilder } from 'discord.js';
import { Command } from '../../../managers/Commands';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언 확인',
  aliases: ['망언 목록', '망언 리스트'],
  private: true,
  execute: async ({ msg, client }) => {
    const target = msg.mentions.members?.first();
    
    if (!target) {
      Utils.reply(msg, client.messages.missingMentionUser('망언을 확인'));
      return;
    }
    
    const { id, guild: { id: guildId } } = target;
    const user = await client.models.config.findOne({ id, guildId });
    
    if (!user || user.slangs.length < 1) {
      Utils.reply(msg, '이 유저는 망언을 보유하고 있지 않습니다.');
      return;
    }
    
    for (let i = 0; i < user.slangs.length; i++) {
      user.slangs[i] = `${i + 1}. ${user.slangs[i]}`;
    } 

    const embed = new EmbedBuilder()
      .setTitle(`${user.name}님의 망언`)
      .setDescription(`${user.slangs.join('\n')}`);

    msg.channel.send({ embeds: [embed]});
    msg.delete();
  }  
})