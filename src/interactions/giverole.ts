import { Interaction } from '../managers/Interaction';
import { ButtonInteraction, GuildMemberRoleManager, TextChannel, GuildMember } from 'discord.js';

export default new Interaction<ButtonInteraction>({
  name: 'giveRole',
  deleted: false,
  execute: async ({ interaction, client }) => {
    const { guildId, member } = interaction;

    if (!member || !(member instanceof GuildMember) || !guildId)
      return;

    const roles = member.roles;

    const guild = await client.models.guild.findOne({ id: guildId });

    const temporaryRole = guild.temporaryRole;
    const baseRole = guild.baseRole;

    if (member.guild.roles.cache.has(temporaryRole) || member.guild.roles.cache.has(baseRole))
      return;
      
    roles.add(baseRole);
    roles.remove(temporaryRole);

    interaction.channel?.send('성공적으로 역할을 지급받았습니다!').then((msg) => {
      setTimeout(() => msg.delete(), 2000);
    });

    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.join);

    if (!channel)
      return;                         

    channel?.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다!`);
  },
});