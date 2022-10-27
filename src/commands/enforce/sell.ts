import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

const sell = [
  10000,
  30000,
  80000,
  200000,
  450000,
  850000,
  2000000,
  4000000,
  10000000,
];

export default new Command({
  name: '판매',
  category: '강화',
  usage: '판매 <이름>',
  description: '현재 제작한 장비를 판매합니다.',
  options: [
    {
      name: '이름',
      description: '판매할 장비의 이름을 입력합니다.',
      type: ApplicationCommandOptionType.String,
      max_length: 15,
      required: true,
    },
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const name = options.getString('이름')

    const user = await client.models.gambling.findOne({ id, guildId })
    const item = user.items.filter((e: { name: string }) => e.name == name)[0]

    if (item.rank <= 1) {
      Utils.reply(interaction, '1강 장비는 판매할 수 없습니다.');
      return 0;
    }

    const money = sell[item.rank - 1];

    if (!item) {
      Utils.reply(interaction, '이 이름의 장비를 보유하고 있지 않습니다.');
      return 0;
    }

    (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item }, $inc: { money } })).matchedCount;
    interaction.reply(`성공적으로 "${name}" 장비를 ${money}가격에 판매했습니다!`);

    return 1;
  },
});