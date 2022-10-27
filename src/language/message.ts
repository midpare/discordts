import { User } from 'discord.js';

export class Messages {
  public readonly yes = '예';

  public readonly no = '아니오';

  public readonly none = '없음';

  public readonly missingPermissionUser = '이 명령어를 사용할 권한이 없습니다.'

  public readonly missingMentionUser = (object: string) => `${object}할 유저를 맨션해주시기 바랍니다.`;

  public readonly missingPermissionTarget = (object: string) => `이 유저는 ${object}할 수 없습니다.`;

  public readonly missingVoiceChannelUser = '이 유저는 음성채널에 접속해있지 않습니다.';

  public readonly betweenNumber = (min: number, max: number) => `${min}에서 ${max}사이의 수를 입력해주시기 바랍니다.`;

  public readonly naturalNumber = '정확한 자연수를 입력해주시기 바랍니다.';

  public readonly noneMoney = '돈이 없을때는 도박을 할 수 없습니다.';

  public readonly overMoney = (money: number) => `현재 잔액보다 높은 돈은 입력하실 수 없습니다.\n현재 잔액: ${money.toLocaleString()}원`;

  public readonly punishment = (user: User, punishment: string, reason: string, time?: string) => '```' + `처벌 대상: ${user.username}#${user.discriminator}\n가한 처벌: ${punishment}\n` + (time ? `처벌 기간: ${time}` : '') +  `\n처벌 사유: ${reason}`;

  public readonly coolTime = (second: number) => `명령어의 쿨타임이 ${second}초 남았습니다.`;

  public readonly admin = {  
    onlyDeveloper: '개발자 전용 명령어입니다.',

    alarm: {
      missingMentionUser: this.missingMentionUser('이동'),

      bot: '봇에게는 알람기능을 사용할 수 없습니다.',

      missingSelfDeaf: '이 유저는 헤드셋을 끄고있지 않습니다.',
    },

    ban: {
      missingMentionUser: this.missingMentionUser('차단'),

      missingPermissionTarget: this.missingPermissionTarget('차단'),

      success: (user: User, time: string, reason: string) => this.punishment(user, '차단', reason, time) + '```',
    },

    kick: {
      missingMentionUser: this.missingMentionUser('강퇴'),

      missingPermissionTarget: this.missingPermissionTarget('강퇴'),

      success: (user: User, reason: string) => this.punishment(user, '강퇴', reason) + '```',
    },

    clear: {
      success: (count: number) => `성공적으로 ${count}개의 메시지를 삭제했습니다!`,
    },

    warning: {
      give: {
        missingMentionUser: this.missingMentionUser('경고를 부여'),

        overNumber: '10회를 초과하는 경고는 부여하실 수 없습니다.',

        success: (user: User, count: number, now: number, reason: string) => this.punishment(user, `경고 ${count}회`, reason) + `\n현재 경고 횟수: ${now}회` + '```',
      },

      deduction: {
        missingMentionUser: this.missingMentionUser('경고를 차감'),

        noneWarning: '이 유저는 차감 할 경고가 없습니다.',

        overWarning: '차감하려는 경고 수가 유저의 경고 수보다 많습니다.',

        success: (user: User, count: number, now: number, reason: string) => this.punishment(user, `경고 차감 ${count}회`, reason) + `\n현재 경고 횟수: ${now}회` + '```',
      },
    },
  };

  public readonly gambling = {
    balance: (name: string, money: number) => `${name}님의 현재 잔액은 ${money.toLocaleString()}원입니다.`,

    debt:  (name: string, debt: number) => `${name}님의 현재 빚은 ${debt.toLocaleString()}원입니다.`,

    successGamb: (balance: number, money: number) => `도박에 성공하셨습니다! ${money.toLocaleString()}원이 지급되었습니다.\n현재 잔액: ${balance.toLocaleString()}원 -> ${(balance + money).toLocaleString()}원`,

    failureGamb: (balance: number, money: number) => `도박에 실패하셨습니다! ${money.toLocaleString()}원이 차감되었습니다.\n현재 잔액: ${balance.toLocaleString()}원 -> ${(balance - money).toLocaleString()}원`,

    baseMoney: {
      haveMoney: '보유하신 돈이나 코인이 있어 기초자금을 지급할 수 없습니다.',

      success: (money: number) => `기초자금 ${money.toLocaleString()}원이 지급되었습니다!`,
    },

    daily: {
      today: '오늘은 이미 받았습니다.',

      success: (balance: number, money: number) => `${money.toLocaleString()}원이 지급되었습니다!\n현재 잔액: ${balance.toLocaleString()}원 -> ${(balance + money).toLocaleString()}원`
    },

    join: {
      alreadyJoin: '이미 가입된 유저입니다.',

      success: '성공적으로 가입이 완료되었습니다!'
    },

    loan: {
      overMoney: '100만원을 초과하는 빚은 빌릴 수 없습니다.',

      success: (now: number, debt: number) => `성공적으로 ${debt.toLocaleString()}원을 대출했습니다!\n현재 대출금액: ${now.toLocaleString()}원 -> ${(now + debt).toLocaleString()}원`
    },

    payBack: {
      overMoney: (debt: number) => `갚으려는 금액이 현재 빚보다 많습니다.\n현재 빚: ${debt.toLocaleString()}원`,

      success: (now: number, money: number) => `성공적으로 빚을 ${money.toLocaleString()}원 갚았습니다!\n현재 빚: ${now.toLocaleString()}원 -> ${(now - money).toLocaleString()}원`
    }
  };
}