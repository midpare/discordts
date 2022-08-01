import { TextChannel, ApplicationCommandOptionType, PermissionFlagsBits, GuildMember } from 'discord.js';
import { SlashCommand } from '../../../managers/SlashCommand';
import { Utils } from '../../../structures/Utils';

export default new SlashCommand({
  name: '경고부여',
  aliases: ['경고 주기'],
  category: '관리자',
  usage: '경고 부여 <유저> <횟수> [사유]',
  description: '유저에게 경고를 부여합니다.',
  options: [
    {
      name: '유저',
      description: '경고를 부여할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: '횟수',
      description: '경고를 차감할 횟수를 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
      max_value: 10,
    },
    {
      name: '사유',
      description: '사유를 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  defaultMemberPermissions: PermissionFlagsBits.KickMembers + PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const target = options.getUser('유저', true);
    const count = options.getInteger('횟수', true);
    const channel = <TextChannel>client.channels.cache.get('910521119713394738');

    const { id } = target;
    const user = await client.models.config.findOne({ id });
    const reason = options.getString('사유');

    channel.send(client.messages.admin.warning.give.success(target, count, user.warning + count, reason ?? ''));
    (await client.models.config.updateOne({ id }, { $inc: { warning: count } }, { upsert: true })).matchedCount;

    Utils.reply(interaction, '성공적으로 경고를 부여했습니다!');
  },
});