import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: 'clear',
  aliases: ['클리어'],
  category: '관리자',
  usage: 'clear <개수>',
  description: '메시지를 보낸 채팅방에 <숫자>만큼의 채팅을 지웁니다.',
  options: [
    {
      name: '개수',
      description: '지울 메시지의 개수를 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      min_value: 1,
      max_value: 99,
      required: true,
    },
    {
      name: '유저',
      description: '어떤 유저의 메시지를 지울지 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  default_member_permissions: PermissionFlagsBits.ManageMessages,
  execute: async ({ interaction, options, client }) => {
    const count = options.getInteger('개수', true);
    const target = options.getUser('유저');

    const channel = interaction.channel;
    if (!channel || !channel.isTextBased() || channel.isVoiceBased() || channel.isDMBased())
      return 0;


    let msgs = (await channel.messages.fetch({ limit: 99 })).sort((interaction1, interaction2) => interaction2.createdTimestamp - interaction1.createdTimestamp);

    if (target) {
      msgs = msgs.filter(msg => msg.author.id == target.id);
    }

    const length = msgs.size - count;

    for (let i = 0; i < length; i++) {
      msgs.delete(msgs.keyAt(count)!);
    }

    if (msgs.size == 0)
      return 0;

    if (msgs.size == 1) {
      msgs.first()?.delete();
      return 0;
    }

    channel.bulkDelete(msgs, true);
    Utils.reply(interaction, client.messages.admin.clear.success(count));
    return 1;
  },
});
