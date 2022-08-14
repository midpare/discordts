import { Interaction } from '../managers/Interaction';

export default new Interaction({
  name: 'cancel',
  deleted: true,
  execute: async ({ }) => {
    //no field
  },
});