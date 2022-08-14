import { TextChannel, ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js';
import { Command } from '../../../managers/Command';
import { Utils } from '../../../structures/Utils';

export default new Command({
  name: '경고차감',
  category: '관리자',
  usage: '경고차감 <유저> <횟수> [사유]',
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
  default_member_permissions: PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const { guildId } = interaction;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });  
    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.punishment);

    if (!channel) {
      Utils.reply(interaction, '처벌내역방을 등록해주시기 바랍니다.');
      return;
    }

    const target = options.getUser('유저', true);
    const count = options.getInteger('횟수', true);

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