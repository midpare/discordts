import { ApplicationCommandOptionType, GuildMember, PermissionFlagsBits, VoiceChannel } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  options: [
    {
      name: '유저',
      description: '부를 유저를 맨션합니다.',
      required: true,
      type: ApplicationCommandOptionType.User,
    }
  ],
  defaultMemberPermissions: PermissionFlagsBits.MoveMembers,
  execute: async ({ interaction, options, client }) => {
    const target = options.getMember('유저');
    const channel1 = <VoiceChannel>client.channels.cache.get('910521120770359323');
    const channel2 = <VoiceChannel>client.channels.cache.get('910521120770359324');

    // cons
    // if (target.bot) {
    //   interaction.reply(client.messages.admin.alarm.bot);
    //   return;
    // }

    // if (target.voice.channelId == null) {
    //   interaction.reply(client.messages.missingVoiceChannelUser);
    //   return;
    // }

    // if (!target.voice.selfDeaf) {
    //   interaction.reply(client.messages.admin.alarm.missingSelfDeaf);
    //   return;
    // }

    // const userChannel = target.voice.channel;
    // await target.voice.setChannel(channel1);
    // client.alarmMembers.set(target.id, target);
    
    // const previousInterval = setInterval(() => {
    //   if (target.voice.channelId == null || !target.voice.selfDeaf)
    //     return;
    //   target.voice.setChannel(channel1);
    //   target.voice.setChannel(channel2);
    // }, 1000);

    // setTimeout(() => {
    //   clearInterval(previousInterval);
    //   target.voice.setChannel(userChannel);
    // }, 5000);
  },
});