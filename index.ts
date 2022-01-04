import { client } from './contexts/client';

client.start();

setTimeout(() => {
  console.log(client)
}, 2000);