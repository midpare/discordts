import { PermissionFlagsBits } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '경고',
  category: '관리자',
  description: 'test description',
  subCommands: '/warning',
  default_member_permissions: PermissionFlagsBits.KickMembers + PermissionFlagsBits.BanMembers,
  execute: async ({ interaction, options, client }) => {
    const subCommand = options.getSubcommand();

    const event = client.subCommands.get('경고 ' + subCommand);

    if (!event)
      return;

    event.execute({ interaction, options, client });
  },
});