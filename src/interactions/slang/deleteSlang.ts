import { StringSelectMenuInteraction, Snowflake, Message } from 'discord.js';
import { Interaction } from '../../managers/Interaction';

export default new Interaction<StringSelectMenuInteraction, { id: Snowflake, message: Message<true> }>({
  name: 'delete slang',
  execute: async ({ interaction, options, client }) => {
    const content = interaction.values[0];
    const { data: { id, message }, message: messages } = options;
    const { guildId } = interaction;

    messages?.delete();
    interaction.fetchReply().then((m) => {
      setTimeout(() => {
        m.delete()
      }, 3000);
    });
    (await client.models.config.updateOne({ id, guildId }, { $pull: { slangs: content } })).matchedCount;
    
    const user = await client.models.config.findOne({ id, guildId });
    if (user.slangs.length < 1) {
      message.delete()
    }
    interaction.reply(`성공적으로 망언을 삭제했습니다!\n망언 내용: ${content}`);
  },
});