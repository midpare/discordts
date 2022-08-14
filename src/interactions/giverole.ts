import { Interaction } from '../managers/Interaction';
import { ButtonInteraction, GuildMemberRoleManager, TextChannel } from 'discord.js';

export default new Interaction<ButtonInteraction>({
  name: 'giveRole',
  deleted: false,
  execute: async ({ interaction, client }) => {
    const roles = <GuildMemberRoleManager>interaction.member?.roles;
    const { guildId } = interaction;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });

    const temporaryRole = guild.temporaryRole;
    const baseRole = guild.baseRole;

    if (temporaryRole == '0' || baseRole == '0')
      return;
      
    roles.add(baseRole);
    roles.remove(temporaryRole);

    interaction.channel?.send('성공적으로 역할을 지급받았습니다!').then((msg) => {
      setTimeout(() => msg.delete(), 2000);
    });

    const join = guild.join;

    if (join == '0')
      return;

    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(join);

    channel?.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다!`);
  },
});