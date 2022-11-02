import { Interaction } from '../../managers/Interaction';

export default new Interaction({
  name: 'update-count',
  execute: async ({ interaction, options, client }) => {
    const { d, buy } = options.data;
    const { count } = buy

    if (count + d < 1) {
      buy.send({ content: `개수는 반드시 1 이상이어야 합니다. 현재 개수: `})
    }
  },
});