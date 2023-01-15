import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { School } from '../../structures/interactions/school';
import { Utils } from '../../structures/Utils';

export default new Interaction<StringSelectMenuInteraction, School>({
  name: 'class',
  execute: async ({ interaction, options, client }) => {
    const apiKey = process.env.SCHOOL_API_KEY || '';
    const { cityCode, schoolCode } = options.data;
    const grade = interaction.values[0];
    const date = new Date();
    const apiOptions = {
      uri: 'https://open.neis.go.kr/hub/classInfo?Type=json&Size=999',
      qs: {
        KEY: apiKey,
        ATPT_OFCDC_SC_CODE: cityCode,
        SD_SCHUL_CODE: schoolCode,
        AY: date.getMonth() < 2 ? date.getFullYear().toString() : (date.getFullYear() - 1).toString(),
        GRADE: grade,
      },
      method: 'GET',
      json: false,
    };

    const info = JSON.parse(await Utils.request(apiOptions));
    if (info.RESULT != undefined) {
      Utils.reply(interaction, '해당되는 데이터가 없습니다. 방학기간일 수 있습니다..');
    }

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

    const selectMenu = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(menuId)
        .setPlaceholder('이곳을 눌러 선택하세요')
        .setOptions(menuOptions),
    );

    const button = <ActionRowBuilder<StringSelectMenuBuilder>>new ActionRowBuilder().addComponents(
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