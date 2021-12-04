import { Interaction, MessageActionRow, MessageEmbed, MessageSelectMenu } from 'discord.js'
import { commandType } from '../../../typings/command'

export = <commandType> {
  name: 'help' || '도움말',
  execute: ({msg, args}) => { 
    const embed = new MessageEmbed().setDescription('카테고리를 선택해주시기바랍니다.')
    const components =
      new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId('help')
          .setPlaceholder('원하는 카테고리를 선택해주세요')
          .addOptions([
            {
              label: '관리자 명령어',
              value: 'ad',
              description: '관리자 전용 명령어를 확인합니다.'
            },
            {
              label: '도박 명령어',
              value: 'gamb',
              description: '도박 관련 명령어를 확인합니다.'
            },
            {
              label: '게임 명령어',
              value: 'game',
              description: '게임 관련 명령어를 확인 합니다.'
            },
            {
              label: '베팅 명령어',
              value: 'bet',
              description: '베팅 관련 명령어들을 확인합니다.'
            }
          ])
      )
    
    const initialMessage = msg.channel.send({ embeds: [embed], components: [components] })
    

    // const filter = (Interaction: Interaction) => 
    //   Interaction.isSelectMenu() &&
    //   Interaction.user.id === msg.author.id
    

    // const collector = msg.channel.createMessageComponentCollector({
    //   filter,
    //   componentsType: 'SELECT_MENU',               
    // })

    // collector.on('collect', (interaction: any) => {
    //   const value = interaction.values[0]

    //   const categoryEmbed = new MessageEmbed()
    //   if (value == 'ad') {
    //     categoryEmbed
    //     .setTitle('관리자 전용 명령어')
    //     .setDescription('부방장 이상 권한 소유자만이 사용 할 수 있는 명령어입니다.')
    //     .addFields(
    //       {name: '!clear <숫자>', value: '<숫자>만큼의 메시지를 지웁니다.', inline: false},
    //       {name: '!kick <이름>', value: '<이름>의 사람을 강퇴합니다. 다시 초대할수있습니다. <이름>의 사람은 맨션을 하면됩니다.'},
    //       {name: '!ban <이름>', value: '<이름>의 사람을 차단합니다. 다시 초대할수없습니다. <이름>의 사람은 맨션을 하면됩니다.'},
    //       {name: '!경고 부여 <이름> <숫자> [사유]', value: '<이름>의 사람에게 <숫자>만큼의 경고를 줍니다. <이름>의 사람은 맨션을 하면됩니다.'},
    //       {name: '!경고 차감 <이름> <숫자> [사유]', value: '<이름>의 사람에게 <숫자>만큼의 경고를 차감합니다. <이름>의 사람은 맨션을 하면됩니다.'}
    //     )
    //   } else if (value == 'gamb') {
    //     categoryEmbed
    //     .setTitle('도박 관련 명령어')
    //     .setDescription('도박에 관련된 명령어들을 확인합니다.')
    //     .addFields(
    //       {name: '!가입', value: '도박 관련 명령어들을 사용할 수 있게됩니다.', inline: false},
    //       {name: '!잔액', value: '자신의 현재 돈을 확인합니다.', inline: false },
    //       {name: '!출석체크', value:'하루에 한번 50000 ~ 100000원의 돈을 지급받습니다.', inline: false },
    //       {name: '!기초자금', value: '돈 5000원을 받습니다. \n__돈이 0원일때만 작동합니다__', inline: false},
    //       {name: '!도박 <숫자(돈)>', value: '<돈>으로 50%확률의 도박을 합니다. \n성공시: 두배, 실패시: 다 잃음', inline: false},
    //       {name: '!올인', value: '모든 돈을 걸고 도박을 진행합니다.', inline: false},
    //       {name: '!하프', value: '자신의 돈의 반을 걸고 도박을 진행합니다.', inline: false},
    //       {name: '!rsp <가위/바위/보>  <돈>', value: '가위바위보를 해 도박을 진행합니다\n 이길 시: 2.5배, 비길 시: 0.6배, 질 시:잃음 ', inline: false},
    //       {name: '!랭킹', value: '유저들의 돈 순위를 확인합니다.', inline: false},
    //       {name: '!상점', value: '도박 관련 상점메뉴를 엽니다.', inline: false},
    //     )
    //   } else if (value == 'game') {
    //     categoryEmbed
    //     .setTitle('게임 관련 명령어')
    //     .setDescription('게임과 관련된 명령어들을 확인합니다.')
    //     .addFields(
    //       {name: '!팀 <이름> <이름>...', value: '<이름>을 이름으로 해 팀을 짭니다.', inline: false}
    //     )
    //   } else if (value == 'bet') {
    //     categoryEmbed
    //     .setTitle('베팅 관련 명령어')
    //     .setDescription('베팅 관련 명령어를 확인합니다.')
    //     .addFields(
    //       {name: '!베팅 시작 <제목> <이름1> <이름2>', value: '<이름1>과 <이름2>로 베팅을 시작합니다\n베팅 권한 소유자 만이 시작할 수 있습니다.', inline: false},
    //       {name: '!베팅 <이름1> <돈>', value: '<이름1>에 <돈>만큼의 돈을 베팅합니다.', inline: false},
    //       {name: '!베팅 <이름2> <돈>', value: '<이름2>에 <돈>만큼의 돈을 베팅합니다.', inline: false},
    //       {name: '!베팅 종료 <이름>', value: '<이름1>과 <이름2>중 선택해 베팅을 종료 합니다.\n선택된 팀에 베팅한 사람들은 돈을 얻고 선택되지 않은 팀은 돈을 잃습니다.\n베팅 권한 소유자 만이 종료할 수 있습니다.'}
    //     )
    //   }
      
    //   interaction.update({embeds: [categoryEmbed]})
    // })

    // collector.on('end', () => {
    //   initialMessage.edit({components: [components]})
    // })
  } 
}