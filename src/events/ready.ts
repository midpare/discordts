import { Event } from '../managers/Event';

export default new Event({
  name: 'ready',
  execute: async () => {
    console.log(`Success to login!`);
  },
});