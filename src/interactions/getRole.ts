import { Interaction } from '../managers/Interaction';
import { ButtonInteraction, TextChannel, GuildMember } from 'discord.js';
import { Utils } from '../structures/Utils';

export default new Interaction<ButtonInteraction>({
  name: 'getRole',
  deleted: false,
  execute: async ({ interaction, client }) => {
    const { guildId, member } = interaction;

    if (!member || !(member instanceof GuildMember) || !guildId)
      return;

    const roles = member.roles;

    const guild = await client.models.guild.findOne({ id: guildId });

    const { temporaryRole, baseRole } = guild;

    if (!interaction.guild?.roles.cache.has(temporaryRole) || !interaction.guild?.roles.cache.has(baseRole)) {
      Utils.reply(interaction, '임시역할과 기본역할을 등록해주시기 바랍니다.');
      return;
    }


    roles.add(baseRole);
    roles.remove(temporaryRole);

    Utils.reply(interaction, '성공적으로 역할을 지급받았습니다!');

    const channel = <TextChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.join);

    if (!channel)
      return;

    channel?.send(`${interaction.user.username}#${interaction.user.discriminator}님이 서버에 입장하였습니다.`);
  },
});