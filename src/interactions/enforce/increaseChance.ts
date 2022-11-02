import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'increaseChance',
  execute: async ({ interaction, options, client }) => {
    const { enforce } = options.data;

    enforce.increaseChance = !enforce.increaseChance

    enforce.send({ content: '확률 증가권을 사용했습니다!', embeds: [enforce.embed], components: [enforce.button] });
    interaction.deferUpdate();
  },
});