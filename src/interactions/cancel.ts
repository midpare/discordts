import { Interaction } from '../managers/Interaction';

export default new Interaction({
  name: 'cancel',
  execute: async ({ options }) => {
    options.messages[0].delete();
  },
});