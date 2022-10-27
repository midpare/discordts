import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Command } from '../../managers/Command';
import { InteractionOption } from '../../structures/InteractionOptions';
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

    const money = sell[item.rank - 2];

    if (!item) {
      Utils.reply(interaction, '이 이름의 장비를 보유하고 있지 않습니다.');
      return 0;
    }

    const customIds = Utils.uuid(2)
    const [yes, no] = customIds;

    const row = <ActionRowBuilder<ButtonBuilder>>new ActionRowBuilder().setComponents(
      new ButtonBuilder()
        .setCustomId(yes)
        .setStyle(ButtonStyle.Success)
        .setLabel('예'),
      new ButtonBuilder()
        .setCustomId(no)
        .setStyle(ButtonStyle.Danger)
        .setLabel('아니오')
    )

    interaction.reply({ content: `정말 "${name}"을(를) ${money.toLocaleString()}원에 판매하시겠습니까?`, components: [row] });

    const defaultOption = {
      ids: [id],
      guildId: guildId!,
      messages: [await interaction.fetchReply()],
      customIds,
      data: {
        item,
        money,
      }
    };

    client.interactionOptions.set(yes, new InteractionOption(Object.assign({}, { cmd: 'enforce_sell' }, defaultOption)));
    client.interactionOptions.set(no, new InteractionOption(Object.assign({}, { cmd: 'cancel' }, defaultOption)));
    return 1;
  },
});