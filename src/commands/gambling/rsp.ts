import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '가위바위보',
  category: '도박',
  usage: '가위바위보 <가위/바위/보> <돈>',
  description: '<돈>을 걸고 가위바위보 도박을 진행합니다. (승리시: 2.5배, 비길시: 0.6배, 패배시: 0배)',
  options: [
    {
      name: '가위바위보',
      description: '가위, 바위, 보 중 하나를 입력힙니다.',
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: '가위',
          value: '가위',
        },
        {
          name: '바위',
          value: '바위',
        },
        {
          name: '보',
          value: '보',
        },
      ],
    },
    {
      name: '돈',
      description: '도박할 돈을 입력합니다',
      type: ApplicationCommandOptionType.Integer,
      required: true,
      min_value: 1,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    const rspArgs = ['가위', '바위', '보'];

    const random = Math.floor(Math.random() * 3);
    const human = rspArgs.indexOf(options.getString('가위바위보', true));
    const bot = random;

    const money = options.getInteger('돈', true);
    if (money > user.money) {
      Utils.reply(interaction, `현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: ${user.money.toLocaleString()}원`);
      return 0;
    }


    let winner: string | null;

    if (human === bot) winner = null;
    else if (human === 0 && bot === 2) winner = 'human';
    else if (human === 1 && bot === 0) winner = 'human';
    else if (human === 2 && bot === 1) winner = 'human';
    else winner = 'bot';


    switch (winner) {
      default:
        (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: money * -0.4 } })).matchedCount;
        interaction.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 비겼습니다.\n${(money * 0.4).toLocaleString()}원를 잃게됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money * 0.4).toLocaleString()}원`);
        break;
      case 'bot':
        (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: -money } })).matchedCount;
        interaction.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 봇이 승리했습니다.\n${money.toLocaleString()}원을 잃게 됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money - money).toLocaleString()}원`);
        break;
      case 'human':
        (await client.models.gambling.updateOne({ id, guildId }, { $inc: { money: money * 1.5 } })).matchedCount;
        interaction.reply(`사람: ${rspArgs[human]}, 봇: ${rspArgs[bot]}로 사람이 승리했습니다.\n${(money * 1.5).toLocaleString()}원을 얻게 됩니다.\n잔액: ${user.money.toLocaleString()}원 -> ${(user.money + money * 1.5).toLocaleString()}원`);
        break;
    }
    return 1;
  },
});