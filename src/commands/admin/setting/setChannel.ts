import { ApplicationCommandOptionType, BaseGuildTextChannel, BaseGuildVoiceChannel, PermissionFlagsBits } from 'discord.js';
import { Utils } from '../../../structures/Utils';
import { Command } from '../../../managers/Command';

export default new Command({
  name: '채널등록',
  category: '관리자',
  usage: '채널등록 <채널유형> <채널>, [채널]',
  description: '서버에서 사용되는 여러 채널을 등록합니다.',
  options: [
    {
      name: '채널유형',
      description: '등록할 채널의 유형을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: '처벌내역',
          value: 'punishment',
        },
        {
          name: '도박',
          value: 'gambling',
        },
        {
          name: '명령어',
          value: 'command',
        },
        {
          name: '망언',
          value: 'slang',
        },
        {
          name: '알람',
          value: 'alarm',
        },
        {
          name: '내전',
          value: 'civilWar',
        },
        {
          name: '입장로그',
          value: 'log join',
        },
        {
          name: '채팅로그',
          value: 'log message',
        },
        {
          name: '명령어로그',
          value: 'log command',
        },
        {
          name: '음성로그',
          value: 'log voice',
        },
      ],
    },
    {
      name: '채널1',
      description: '첫번째 채널을 입력합니다.',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    },
    {
      name: '채널2',
      description: '두번째 채널을 입력합니다.',
      type: ApplicationCommandOptionType.Channel,
      required: false,
    },
  ],
  default_member_permissions: PermissionFlagsBits.Administrator,
  execute: async ({ interaction, options, client }) => {
    const { guildId: id } = interaction
    const type = options.getString('채널유형', true);
    const channel1 = options.getChannel('채널1', true);

    switch (type) {
      case 'alarm':
      case 'civilWar':
        const channel2 = options.getChannel('채널2');
        if (!(channel1 instanceof BaseGuildVoiceChannel) || !(channel2 instanceof BaseGuildVoiceChannel)) {
          Utils.reply(interaction, '정확한 음성채널 두개를 입력해주시기 바랍니다.');
          return 0
        }

        (await client.models.guild.updateOne({ id }, { $set: { [type]: [channel1.id, channel2.id] } })).matchedCount;
        break;
      default:
        if (!(channel1 instanceof BaseGuildTextChannel)) {
          Utils.reply(interaction, '정확한 채팅채널을 입력해주시기 바랍니다');
          return 0
        }
        if (type.split(' ')[0] == 'log') {
          await client.models.guild.updateOne({ id }, { $set: { [`log.${type.split(' ')[1]}`]: channel1.id } }, { upsert: true })
        } else {
          (await client.models.guild.updateOne({ id }, { $set: { [type]: channel1.id } })).matchedCount;
        }
        break;
    }

    Utils.reply(interaction, '성공적으로 채널을 등록했습니다!');
    return 1;
  },
});