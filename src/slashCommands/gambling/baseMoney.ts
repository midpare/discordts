import { SlashCommand } from '../../managers/SlashCommand';

export default new SlashCommand({
  name: '기초자금',
  aliases: ['초기자금', '돈', 'ㄷ', '기본자금'],
  category: '도박',
  description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 30초',
  execute: async ({ interaction, client }) => {
    const id = interaction.user.id;
    const user = await client.models.gambling.findOne({ id });
    if (!user)
      return;

    if (user.money != 0 || user.stock[0]) {
      interaction.reply(client.messages.gambling.baseMoney.haveMoney);
      return;
    }

    const time = new Date().getTime();
    const coolTime = 30 * 1000;
    const userCoolTime = user.baseMoneyCoolTime;
    
    if (time - userCoolTime < coolTime) {
      interaction.reply(client.messages.coolTime(Math.ceil(coolTime - (time - userCoolTime) / 1000)));
      return;
    }

    const baseMoney = 25000;

    (await client.models.gambling.updateOne({ id }, { $set: { money: baseMoney, baseMoneyCoolTime: time } })).matchedCount;
    interaction.reply(client.messages.gambling.baseMoney.success(baseMoney));
  },
});