import { Command } from '../../../managers/Commands';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언 삭제',
  private: true,
  execute: async ({ msg, args, client }) => {
    const target = msg.mentions.members?.first();
    if (!target) {
      Utils.reply(msg, client.messages.missingMentionUser('망언을 삭제'))
      return;
    }
    
    const { id, guild: { id: guildId } } = target;

    if (!args[1]) {
      Utils.reply(msg, '지울 망언의 내용을 작성해주시기 바랍니다.');
      return;
    }

    const content = args.slice(1).join(' ');

    const user = await client.models.config.findOne({ id, guildId });

    if (!user.slangs.includes(content)) {
      Utils.reply(msg, '이 유저는 이 망언을 보유하고 있지 않습니다.');
      return;
    } 
    
    (await client.models.config.updateOne({ id, guildId }, { $pull: { slangs: content }})).matchedCount;
    Utils.reply(msg, `성공적으로 망언을 삭제했습니다!\n망언 내용: ${content}`);
  }  
})