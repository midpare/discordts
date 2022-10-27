import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'enforce',
  deleted: false,
  execute: async ({ interaction, options, client }) => {
    if (!options)
      return;

    const { guildId, user: { id } } = interaction;
    const user = await client.models.gambling.findOne({ id, guildId });

    const { enforce } = options.data;
    const item = user.items.filter((e: { name: string }) => e.name == enforce.itemName)[0]
    const { success, fail, money } = enforce.enforceTable[enforce.rank - 1];

    enforce.balance -= money;
    enforce.totalMoney += money;

    if (user.money < money) {
      enforce.send({ content: `강화비용이 현재 보유 중인 돈보다 많습니다.\n강화비용: ${money.toLocaleString()}원, 현재 돈:${user.money.toLocaleString()}원`, ephemeral: true });
      return;
    }

    const rand = Math.floor(Math.random() * 100);

    if (rand < success) {
      enforce.rank++;
      
      if (enforce.rank > 9) {
        options.messages[0].delete();
        interaction.channel?.send(`축하합니다! "${enforce.itemName}"을(를) 10강까지 강화했습니다!`);
      } else
        enforce.send({ content: `강화에 성공하셨습니다!\n${enforce.rank - 1}강 -> ${enforce.rank}강`, components: [enforce.button], embeds: [enforce.embed] });

      (await client.models.gambling.updateOne({ id, guildId, items: item }, { $inc: { 'items.$.rank': 1, money: -money } })).matchedCount;
    } else if (rand < success + fail && rand >= success) {
      let minus = -1
      if (item.rank < 2) 
        minus = 0

      enforce.rank += minus;
      enforce.send({ content: `강화에 실패하셨습니다!\n${enforce.rank - minus}강 -> ${enforce.rank}강`, components: [enforce.button], embeds: [enforce.embed] });
      (await client.models.gambling.updateOne({ id, guildId, items: item }, { $inc: { 'items.$.rank': minus, money: -money } })).matchedCount;
    } else {
      if (enforce.protection) {
        enforce.protection = false
        enforce.send({ content: '장비가 파괴될 뻔 했지만 파괴방지권의 효력으로 파괴되지 않았습니다!', components: [enforce.button], embeds: [enforce.embed] });
        (await client.models.gambling.updateOne({ id, guildId, items: item }, { $inc: { money: -money } })).matchedCount;
      } else {
        enforce.message.delete();
        interaction.channel?.send({ content: `<@${id}>안타깝네요! "${item.name}"장비가 파괴되었습니다.` });
        (await client.models.gambling.updateOne({ id, guildId }, { $pull: { items: item } })).matchedCount;
      }
    }
    interaction.deferUpdate();
  },
});