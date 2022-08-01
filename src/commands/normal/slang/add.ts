import { Command } from '../../../managers/Commands';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '망언 추가',
  private: true,
  execute: async ({ msg, args, client }) => {
    const target = msg.mentions.members?.first();
    if (!target) {
      Utils.reply(msg, client.messages.missingMentionUser('망언을 추가'))
      return;
    }
    
    const { id, guild: { id: guildId } } = target;

    if (!args[1]) {
      Utils.reply(msg, '망언 내용을 작성해주시기 바랍니다.');
      return;
    }

    const content = args.slice(1).join(' ');

    const slang = await client.models.config.findOne({ id, guildId, slangs: { $all: [content] } });

    if (slang) {
      Utils.reply(msg, '이 망언은 이미 추가되어있습니다.');
      return;
    }
    
    (await client.models.config.updateOne({ id, guildId }, { $push: { slangs: content }})).matchedCount;
    Utils.reply(msg, `성공적으로 망언을 추가했습니다!\n망언 내용: ${content}`);
  }  
})