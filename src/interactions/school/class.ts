import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, SelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Utils } from '../../structures/Utils';

export default new Interaction<SelectMenuInteraction>({
  name: 'class',
  execute: async ({ interaction, options, client }) => {
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

    options.messages[0].edit({ content: '자신의 반을 선택해주시기 바랍니다.', components: [selectMenu, button] });
    interaction.deferUpdate();

    options.customIds = customIds;
    
    Object.assign(options.data, { grade });
    client.interactionOptions.set(menuId, Object.assign({}, options, { cmd: 'upload' }));

    client.interactionOptions.set(cancel, Object.assign({}, options, { cmd: 'cancel' }));

    client.interactionOptions.set(back, Object.assign({}, options, { cmd: 'back' }));
  },
});