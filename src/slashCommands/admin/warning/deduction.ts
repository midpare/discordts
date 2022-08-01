import { TextChannel, ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { SlashCommand } from '../../../managers/SlashCommand';
import { Utils } from '../../../structures/Utils';

export default new SlashCommand({
  name: '경고차감',
  category: '관리자',
  usage: '경고 차감 <유저> <횟수> [사유]',
  description: '유저의 경고를 차감합니다.',
  options: [
    {
      name: '유저',
      description: '경고를 차감할 유저를 입력합니다.',
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
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  defaultMemberPermissions: PermissionFlagsBits.KickMembers + PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const { guildId } = interaction
    const target = options.getUser('유저', true);
    const count = options.getInteger('횟수', true);

    const channel = <TextChannel>client.channels.cache.get('910521119713394738');

    const id = target.id;
    const user = await client.models.config.findOne({ id, guildId });
    const reason = options.getString('사유');
    if (user.warning <= 0) {
      Utils.reply(interaction, client.messages.admin.warning.deduction.noneWarning);
      return;
    }

    if (user.warning - count < 0) {
      Utils.reply(interaction, client.messages.admin.warning.deduction.overWarning);
      return;
    }

    (await client.models.config.updateOne({ id, guildId }, { $inc: { warning: -count } })).matchedCount;
    channel.send(client.messages.admin.warning.deduction.success(target, count, user.warning - count, reason ?? ''));

    Utils.reply(interaction, '성공적으로 경고를 차감했습니다!');
  },
});