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
const Commands_1 = require("../../structures/Commands");
const Client_1 = require("../../structures/Client");
const attendance_1 = require("../../models/attendance");
exports.default = new Commands_1.Command({
    name: '잠수확인',
    category: '관리자',
    usage: '잠수확인',
    description: '잠수 확인',
    execute: ({ msg, args }) => {
        if (msg.author.id != "446068726849208341")
            return console.log(1);
        let row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setLabel("출석")
            .setCustomId("day")
            .setStyle("PRIMARY"));
        msg.channel.send({ content: "이 버튼을 눌러 출석을 완료해주시기 바랍니다.", components: [row] });
        const collector = new discord_js_1.InteractionCollector(Client_1.client, {
            channel: msg.channel,
            componentType: 'BUTTON',
            guild: msg.guild,
            interactionType: 'MESSAGE_COMPONENT',
        });
        collector.on("collect", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
            let id = interaction.user.id;
            let user = yield attendance_1.attendance.findOne({ id });
            if (user)
                return interaction.reply({ content: "이미 출석을 완료한 유저입니다.", ephemeral: true });
            let newUser = new attendance_1.attendance({ id });
            yield newUser.save();
            interaction.reply({ content: "성공적으로 출석을 완료했습니다!", ephemeral: true });
        }));
    }
});
