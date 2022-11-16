import { ButtonInteraction } from 'discord.js';
import { Interaction } from '../../managers/Interaction';
import { Enforce } from '../../structures/interactions/enforce';

export default new Interaction<ButtonInteraction, Enforce>({
  name: 'enforce',
  execute: async ({ interaction, options, client }) => {
    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    const enforce = options.data;
    const equipment = user.equipments.filter((e: { name: string }) => e.name == enforce.equipment.name)[0];

    if (!equipment) {
      enforce.send({ content: `이미 판매한 장비입니다.` });
      return;
    }

    const { success, fail, money } = enforce.enforceTable[enforce.equipment.rank - 1];

    enforce.money = user.money - money;

    if (user.money < money) {
      enforce.send({ content: `강화비용이 현재 보유 중인 돈보다 많습니다.\n강화비용: ${money.toLocaleString()}원, 현재 돈:${user.money.toLocaleString()}원`, embeds: [enforce.embed], components: [enforce.button] });
      return;
    }

    const rand = Math.floor(Math.random() * 100);

    if (rand < success) {
      enforce.equipment.rank++;
      
      if (enforce.equipment.rank > 9) {
        options.messages[0].delete();
        interaction.channel?.send(`<@${id}>축하합니다! "${enforce.equipment.name}"을(를) 10강까지 강화했습니다!`);
      } else
        enforce.send({ content: `강화에 성공하셨습니다!\n${enforce.equipment.rank - 1}강 -> ${enforce.equipment.rank}강`, components: [enforce.button], embeds: [enforce.embed] });

      (await client.models.gambling.updateOne({ id, guildId, equipments: equipment }, { $inc: { 'equipments.$.rank': 1, money: -money } })).matchedCount;
    } else if (rand < success + fail && rand >= success) {
      let minus = -1
      if (equipment.rank < 2) 
        minus = 0

      enforce.equipment.rank += minus;
      enforce.send({ content: `강화에 실패하셨습니다!\n${enforce.equipment.rank - minus}강 -> ${enforce.equipment.rank}강`, components: [enforce.button], embeds: [enforce.embed] });
      (await client.models.gambling.updateOne({ id, guildId, equipments: equipment }, { $inc: { 'equipments.$.rank': minus, money: -money } })).matchedCount;
    } else {
      if (enforce.protection) {
        enforce.protection = false
        enforce.send({ content: '장비가 파괴될 뻔 했지만 파괴방지권의 효력으로 파괴되지 않았습니다!', components: [enforce.button], embeds: [enforce.embed] });
        (await client.models.gambling.updateOne({ id, guildId, equipments: equipment }, { $inc: { money: -money } })).matchedCount;
      } else {
        enforce.message.delete();
        interaction.channel?.send({ content: `<@${id}>안타깝네요! "${equipment.name}"장비가 파괴되었습니다.` });
        (await client.models.gambling.updateOne({ id, guildId }, { $pull: { equipments: equipment } })).matchedCount;
      }
    }
    interaction.deferUpdate();
  },
});