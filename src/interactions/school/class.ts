import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { InteractionOption } from '../../structures/InteractionOptions';
import { Utils } from '../../structures/Utils';

export default new Interaction<SelectMenuInteraction>({
  name: 'class',
  deleted: true,
  execute: async ({ interaction, options, client }) => {
    if (!options || !options.data)
      return;

    const apiKey = process.env.SCHOOL_API_KEY || '';
    const { cityCode, schoolCode } = options.data;
    const grade = interaction.values[0];

    const apiOptions = {
      uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
      qs: {
        KEY: apiKey,
        ATPT_OFCDC_SC_CODE: cityCode,
        SD_SCHUL_CODE: schoolCode,
        AY: new Date().getFullYear().toString(),
        GRADE: grade,
      },
      method: 'GET',
      json: false,
    };

    const info = JSON.parse(await Utils.request(apiOptions));

    const customIds = Utils.uuid(3);
    const [menuId, cancel, back] = customIds;

    const menuOptions = new Array();
    for (const { CLASS_NM: i } of info.classInfo[1].row) {
      const option = {
        label: `${i}반`,
        description: `${i}반을 선택합니다.`,
        value: `${i}`,
      };
      menuOptions.push(option);
    }

    const selectMenu = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳을 눌러 선택하세요')
        .setOptions(menuOptions),
    );

    const button = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(cancel)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('취소'),
      new ButtonBuilder()
        .setCustomId(back)
        .setStyle(ButtonStyle.Secondary)
        .setLabel('뒤로가기'),
    );

    interaction.reply({ content: '자신의 반을 선택해주시기 바랍니다.', components: [selectMenu, button] });

    const message = await interaction.fetchReply();

    options.messages = [message];
    options.customIds = customIds;

    client.interactionOptions.set(menuId, InteractionOption.getNext(options, {
      cmd: 'upload',
      data: {
        grade,
      },
    }));

    client.interactionOptions.set(cancel, InteractionOption.getNext(options, {
      cmd: 'cancel',
    }));

    client.interactionOptions.set(back, InteractionOption.getNext(options, {
      cmd: 'back',
    }));
  },
});