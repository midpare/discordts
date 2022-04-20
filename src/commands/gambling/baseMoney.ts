import { gambling } from '../../models/gambling';
import { Command } from '../../structures/Commands';
import { messages } from '../../util/language/message';

export default new Command({
  name: '기초자금',
  aliases: ['초기자금', '돈', 'ㄷ'],
  category: '도박',
  usage: '기초자금',
  description: '기초자금 25,000원을 획득합니다. 돈이 0원일때만 명령어 사용이 가능합니다. 쿨타임: 30초',
  execute: async ({ msg, args, client }) => {
    const id = msg.author.id;
    const user = await gambling.findOne({ id });
    if (user.money != 0 || user.stock[0])
      return msg.reply(messages.gambling.baseMoney.haveMoney);

    const second = new Date().getTime();
    const coolTime = 30;
    if (user.baseMoneyCoolTime) {
      const userCoolTime = user.baseMoneyCoolTime;
      if ((second - userCoolTime) / 1000 < coolTime)
        return msg.reply(messages.coolTime(Math.ceil(coolTime - (second - userCoolTime) / 1000)));
    }
    const baseMoney = 25000;

    (await gambling.updateOne({ id }, { $set: { money: baseMoney, baseMoneyCoolTime: second } })).matchedCount;
    msg.reply(messages.gambling.baseMoney.success(baseMoney));  
  },
});