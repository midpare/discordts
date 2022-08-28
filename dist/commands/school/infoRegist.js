"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../managers/Command");
const cities = [
    '서울특별시', '부산광역시',
    '대구광역시', '인천광역시',
    '광주광역시', '대전광역시',
    '울산광역시', '세종특별자치시',
    '경기도', '강원도',
    '충청북도', '충청남도',
    '전라북도', '전라남도',
    '경상북도', '경상남도',
    '제주특별자치도'
];
const codes = [
    'B10', 'C10', 'D10',
    'E10', 'F10', 'G10',
    'H10', 'I10', 'J10',
    'K10', 'M10', 'N10',
    'P10', 'Q10', 'R10',
    'S10', 'T10'
];
exports.default = new Command_1.Command({
    name: '학교등록',
    category: '학교',
    usage: '학교등록',
    description: '자신의 학교정보를 등록해 학교 명령어 사용을 가능하게합니다.',
    options: [
        {
            name: '학교',
            description: '자신이 속해있는 학교를 입력합니다.',
            type: discord_js_1.ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    execute: ({ interaction, options, client }) => __awaiter(void 0, void 0, void 0, function* () {
        // const apiKey = process.env.SCHOOL_API_KEY || '';
        // const schoolName = options.getString('학교', true);
        // const { guildId, user: { id } } = interaction;
        // if (!guildId)
        //   return;
        // const customIds = Utils.uuid(2);
        // const [menuId, cancel] = customIds
        // const menuOptions = new Array();
        // for (let i = 0; i < codes.length; i++) {
        //   const name = cities[i];
        //   const code = codes[i];
        //   const apiOptions = {
        //     uri: ' https://open.neis.go.kr/hub/schoolInfo?Type=json&Size=999',
        //     qs: {
        //       KEY: apiKey,
        //       ATPT_OFCDC_SC_CODE: code,
        //       SCHUL_NM: schoolName,
        //     },
        //     method: 'GET',
        //     json: false,
        //   };
        //   const info = JSON.parse(await Utils.request(apiOptions));
        //   if (!info.RESULT) {
        //     const option = {
        //       label: name,
        //       description: `${name}를 선택합니다.`,
        //       value: JSON.stringify({
        //         cityName: name,
        //         cityCode: code,
        //         schoolCode: info.schoolInfo[1].row[0].SD_SCHUL_CODE,
        //       }),
        //     };
        //     menuOptions.push(option);
        //   }
        // }
        // if (menuOptions.length < 1) {
        //   Utils.reply(interaction, '정확한 학교명을 입력해주시기 바랍니다.');
        //   return;
        // }
        // const selectMenu = <ActionRowBuilder<SelectMenuBuilder>>new ActionRowBuilder().addComponents(
        //   new SelectMenuBuilder()
        //     .setCustomId(menuId)
        //     .setPlaceholder('이곳을 눌러 선택해주세요')
        //     .setOptions(menuOptions)
        // )
        const button = new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId('test')
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel('취소'));
        yield interaction.reply({ content: '자신이 현재 속한 지역을 선택해주시기 바랍니다.', components: [button] });
        // const message = await interaction.fetchReply();
        // client.interactionOptions.set(menuId, new InteractionOption({
        //   ids: [id],
        //   guildId,
        //   cmd: 'grade',
        //   messages: [message],
        //   customIds,
        //   data: {
        //     schoolName,
        //   },
        // }));
        // client.interactionOptions.set(cancel, new InteractionOption({
        //   ids: [id],
        //   guildId,
        //   cmd: 'cancel',
        //   messages: [message],
        //   customIds,
        // }));
    }),
});
