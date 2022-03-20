import { ButtonInteraction, InteractionCollector, MessageActionRow, MessageButton } from "discord.js";
import { Command } from "../../structures/Commands";
import { client } from "../../structures/Client";
import { attendance } from "../../models/attendance";

export default new Command({
  name: '잠수확인',
  category: '관리자',
  usage: '잠수확인',
  description: '잠수 확인',
  execute: ({msg, args}) => {
    if (msg.author.id != "446068726849208341") 
      return console.log(1)
    
    let row = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("출석")
        .setCustomId("day")
        .setStyle("PRIMARY")
    );
    msg.channel.send({ content: "이 버튼을 눌러 출석을 완료해주시기 바랍니다.", components: [row] })

    const collector = new InteractionCollector(client, {
      channel: msg.channel,
      componentType: 'BUTTON',
      guild: msg.guild,
      interactionType: 'MESSAGE_COMPONENT',
    });

    collector.on("collect", async (interaction: ButtonInteraction) => {
      let id = interaction.user.id;
      let user = await attendance.findOne({ id });
      
      if (user) 
        return interaction.reply({ content: "이미 출석을 완료한 유저입니다.", ephemeral: true });

      let newUser = new attendance({ id });

      await newUser.save()
      interaction.reply({ content: "성공적으로 출석을 완료했습니다!", ephemeral: true })
    })
  }
});