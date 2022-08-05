import { ApplicationCommandOptionType } from 'discord.js';
import { SlashCommand } from '../../managers/SlashCommand';
import { Utils } from '../../structures/Utils';

export default new SlashCommand({
  name: '베팅종료',
  category: '베팅',
  usage: '베팅종료 <팀>',
  description: '베팅을 종료합니다.',
  options: [
    {
      name: '팀',
      description: '승리한 팀을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const guildId = interaction.guildId ?? ''
    const betting = client.betting.get(guildId);

    if (!betting) {
      Utils.reply(interaction, '아직 베팅을 시작하지 않았습니다.');
      return;
    }

    if (betting.starter != interaction.user.id) {
      Utils.reply(interaction, '베팅을 종료할 권한이 없습니다.');
      return;
    }

    const bet1 = betting.bet1;
    const bet2 = betting.bet2;
    const winner = options.getString('팀', true);
    let times = 0;
    switch (winner) {
      case bet1.name:
        betting.end('bet1');
        times = betting.times.bet1;
        break;
      case bet2.name:
        betting.end('bet2');
        times = betting.times.bet2;
        break;
      default:
        Utils.reply(interaction, `${bet1.name}과 ${bet2.name}중 승리팀을 선택해주시기 바랍니다.`);
        return;
    }

    interaction.reply(`${winner}팀이 승리했습니다!\n배율: ${times}`);
    client.betting.delete(guildId);
  },
});