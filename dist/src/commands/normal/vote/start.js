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
const Client_1 = require("../../../structures/Client");
const Commands_1 = require("../../../structures/Commands");
exports.default = new Commands_1.Command({
    name: '투표 시작',
    category: '기본',
    usage: '투표 시작 <제목> <이름1>, <이름2>...',
    description: '<제목>의 투표를 시작합니다 이름들은 ","로 구분합니다.',
    execute: ({ msg, args }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!msg.guild)
            return;
        const id = msg.author.id;
        const title = args[0];
        const initialNames = args.slice(1).join(' ').split(',').map(element => element.trim());
        const row = new discord_js_1.MessageActionRow();
        const embed = new discord_js_1.MessageEmbed();
        const names = new discord_js_1.Collection();
        if (Client_1.client.vote.get(msg.channelId))
            return msg.reply('이미 이 채널에 시작한 투표가 있습니다.');
        if (!title)
            return msg.reply('투표 제목을 입력해주시기 바랍니다.');
        if (initialNames.length < 2)
            return msg.reply('두개 이상의 투표이름을 입력해주시기 바랍니다.\n이름은 ","로 구분합니다.');
        if (initialNames[initialNames.length - 1] == '')
            return msg.reply('투표 제목의 마지막은 ","이 될 수 없습니다');
        for (const name of initialNames) {
            names.set(name, { id: [], count: 0 });
            row.addComponents(new discord_js_1.MessageButton()
                .setCustomId(id + ',' + name)
                .setLabel(name)
                .setStyle('PRIMARY'));
            embed
                .addField(name, '현재 투표 인원: 0명', true);
        }
        row.addComponents(new discord_js_1.MessageButton()
            .setCustomId(id + ',' + 'cancel')
            .setLabel('투표 취소')
            .setStyle('PRIMARY'));
        embed
            .setTitle(title)
            .setDescription(`${initialNames.join(', ')} 중 투표해주시기 바랍니다.`);
        const initialMessage = yield msg.channel.send({ embeds: [embed], components: [row] });
        const collector = new discord_js_1.InteractionCollector(Client_1.client, {
            channel: msg.channel,
            componentType: 'BUTTON',
            guild: msg.guild,
            interactionType: 'MESSAGE_COMPONENT',
        });
        const vote = {
            starter: id,
            guild: msg.guild,
            collector,
            title,
            names,
        };
        Client_1.client.vote.set(msg.channelId, vote);
        collector.on('collect', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
            const interactionId = interaction.user.id;
            const vote = Client_1.client.vote.get(interaction.channelId);
            const voteName = interaction.customId.split(',')[1];
            const voteNode = vote === null || vote === void 0 ? void 0 : vote.names.get(voteName);
            if (!vote || !voteNode)
                return;
            if (voteNode.id.includes(interactionId))
                return interaction.reply({ content: '이미 이 선택지에 투표했습니다.', ephemeral: true });
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(title)
                .setDescription(`${initialNames.join(', ')} 중 투표해주시기 바랍니다.`);
            for (const [name, node] of vote.names) {
                if (node.id.includes(interactionId)) {
                    node.count -= 1;
                    node.id.splice(node.id.indexOf(interactionId), 1);
                }
                if (name == voteName) {
                    embed.addField(name, `현재 투표 인원: ${node.count + 1}명`, true);
                    voteNode.count += 1;
                    voteNode.id.push(interactionId);
                    continue;
                }
                embed.addField(name, `현재 투표 인원: ${node.count}명`, true);
            }
            initialMessage.edit({ embeds: [embed] });
            interaction.reply({ content: `성공적으로 ${voteName}에 투표했습니다!`, ephemeral: true });
        }));
        collector.on('end', () => {
        });
    }),
});
