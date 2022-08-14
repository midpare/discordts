import { ApplicationCommandOptionType, GuildMember, VoiceChannel } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '알람',
  category: '관리자',
  usage: '알람 <유저>',
  description: '헤드셋과 마이크를 모두 끈 유저를 여러번 이동시킵니다.',
  options: [
    {
      name: '유저',
      description: '알람을 할 유저를 입력합니다.',
      type: ApplicationCommandOptionType.User,
      required: true,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const target = options.getMember('유저');
    
    const { guildId } = interaction;

    if (!guildId)
      return;

    const guild = await client.models.guild.findOne({ id: guildId });

    const channel1 = <VoiceChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.alarmChannel[0] ?? '0');
    const channel2 = <VoiceChannel>client.guilds.cache.get(guildId)?.channels.cache.get(guild.alarmChannel[1] ?? '0');

    if (!channel1 || !channel2) {
      Utils.reply(interaction, '알람채널을 등록해주시기 바랍니다.');
      return;
    }
    
    if (!(target instanceof GuildMember)) {
      Utils.reply(interaction, '정확한 유저를 입력해주시기 바랍니다.');
      return;
    }

    if (client.alarmMembers.get(target.id)) {
      Utils.reply(interaction, '이미 알람을 작동중인 유저입니다.');
      return;
    }

    if (target.user.bot) {
      Utils.reply(interaction, client.messages.admin.alarm.bot);
      return;
    }

    if (target.voice.channelId == null) {
      Utils.reply(interaction, client.messages.missingVoiceChannelUser);
      return;
    }

    if (!target.voice.selfDeaf) {
      Utils.reply(interaction, client.messages.admin.alarm.missingSelfDeaf);
      return;
    }


    const userChannel = target.voice.channel;
    await target.voice.setChannel(channel1);
    client.alarmMembers.set(target.id, target);
    
    Utils.reply(interaction, '성공적으로 알람을 작동했습니다!');

    const previousInterval = setInterval(() => {
      if (target.voice.channelId == null || !target.voice.selfDeaf)
        return;
      target.voice.setChannel(channel1);
      target.voice.setChannel(channel2);
    }, 1000);

    setTimeout(() => {
      clearInterval(previousInterval);
      target.voice.setChannel(userChannel);
      client.alarmMembers.delete(target.id);
    }, 5000);
  },
});