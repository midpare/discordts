import { client } from '../structures/Client';

export = {
  name: 'ready',
  event : async () => {
    client.user.setActivity('개발');
    console.log(`Logged in as ${client.user.tag}!`);
  },
}