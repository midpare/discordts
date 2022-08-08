import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '베팅',
  category: '베팅',
  usage: '베팅',
  description: '베팅을 합니다.',
  options: [
    {
      name: '이름',
      description: '베팅할 종목의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: '돈',
      description: '베팅할 돈을 입력합니다.',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId } = interaction;
    
    const name = options.getString('이름', true);
    const money = options.getInteger('돈', true);

    if (!guildId)
      return;

    const betting = client.betting.get(guildId)

    if (!betting) {
      Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
      return;
    }

    switch (name) {
      case betting.bet1.name:
        betting.bet1.addUser(interaction, money);
        break;
      case betting.bet2.name:
        betting.bet2.addUser(interaction, money);
        break;
      default:
        Utils.reply(interaction, `${betting.bet1.name}과 ${betting.bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
        return;
    }
  },
});