// import { Client } from '../structures/Client';
// import { Utils } from '../structures/Utils';

// export default async function (client: Client) {
//   const slashCommandFiles = new Array();
//   Utils.getPath(__dirname + '/../slashCommands', slashCommandFiles);

//   //Wait for bot to login 
//   setTimeout(async () => {
//     console.log(client.guilds.cache);
//     for (const path of slashCommandFiles) {
//       const file = (await import(path)).default;

//       for (const [_, guild] of client.guilds.cache) {
//         guild.commands.create(file);
//       }
//       client.slashCommand.set(file.name, file);
//     }
//   }, 2000);
// }