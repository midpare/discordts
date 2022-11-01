import { ApplicationCommandOptionType } from 'discord.js';
import { Command } from '../../managers/Command';
import { Utils } from '../../structures/Utils';

export default new Command({
  name: '장비제작',
  category: '강화',
  usage: '장비제작 <이름>',
  description: '강화할 장비를 제작합니다.',
  options: [
    {
      name: '이름',
      description: '강화할 장비의 이름을 지정합니다.',
      type: ApplicationCommandOptionType.String,
      max_length: 15,
      required: true,
    }
  ],
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction 

    const name = options.getString('이름')
    const user = await client.models.gambling.findOne({ id, guildId });

    if (user.equipments.map((e: { name: string }) => e.name).includes(name)) {
      Utils.reply(interaction, '이미 그 이름의 장비를 보유 중입니다.');
      return 0;
    }

    if (user.equipments.length >= 5) {
      Utils.reply(interaction, '이미 최대개수의 장비를 보유 중 입니다.');
      return 0;
    }

    const equipment = {
      name,
      rank: 1,
    };

    (await client.models.gambling.updateOne({ id, guildId }, {$push: { equipments: equipment } })).matchedCount;
    interaction.reply(`성공적으로 "${name}"장비를 제작했습니다!`)
    return 1;
  },
}); 