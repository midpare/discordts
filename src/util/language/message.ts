import { User } from 'discord.js';

class Messages {
  public missingPermissionUser = '이 명령어를 사용할 권한이 없습니다.'
  public missingMentionUser = (object: string) => `${object}할 유저를 맨션해주시기 바랍니다.`;
  public missingPermissionTarget = (object: string) => `이 유저는 ${object}할 수 없습니다.`;
  public missingVoiceChannelUser = '이 유저는 음성채널에 접속해있지 않습니다.';
  public betweenNumber = (min: number, max: number) => `${min}에서 ${max}사이의 수를 입력해주시기 바랍니다.`;
  public naturalNumber = '정확한 자연수를 입력해주시기 바랍니다.';
  public punishment = (user: User, punishment: string, reason: string) => '```' + `처벌 대상: ${user.username}#${user.discriminator}\n가한 처벌: ${punishment}\n처벌 사유: ${reason}`;
  public none = '없음';
  public admin = {  
    onlyDeveloper: '개발자 전용 명령어입니다.',
    alarm: {
      missingMentionUser: this.missingMentionUser('이동'),
      bot: '봇에게는 알람기능을 사용할 수 없습니다.',
      missingSelfDeaf: '이 유저는 헤드셋을 끄고있지 않습니다.',
    },
    ban: {
      missingMentionUser: this.missingMentionUser('차단'),
      missingPermissionTarget: this.missingPermissionTarget('차단'),
      success: (user: User, reason: string) => this.punishment(user, '차단', reason) + '```'
    },
    kick: {
      missingMentionUser: this.missingMentionUser('강퇴'),
      missingPermissionTarget: this.missingPermissionTarget('강퇴'),
      success: (user: User, reason: string) => this.punishment(user, '강퇴', reason) + '```'
    },
    clear: {
      success: (count: number) => `성공적으로 ${count}개의 메시지를 삭제했습니다!`,
    },
    warning: {
      give: {
        missingMentionUser: this.missingMentionUser('경고를 부여'),
        overNumber: '10회를 초과하는 경고는 부여하실 수 없습니다.',
        success: (user: User, count: number, now: number, reason: string) => this.punishment(user, `경고 ${count}회`, reason) + `\n현재 경고 횟수: ${now}회` + '```'
      },
      deduction: {
        missingMentionUser: this.missingMentionUser('경고를 차감'),
        noneWarning: '이 유저는 차감 할 경고가 없습니다.',
        overWarning: '차감하려는 경고 수가 유저의 경고 수보다 많습니다.',
        success: (user: User, count: number, now: number, reason: string) => this.punishment(user, `경고 차감 ${count}회`, reason) + `\n현재 경고 횟수: ${now}회` + '```',
      }
    },
  };
}

export const message = new Messages();