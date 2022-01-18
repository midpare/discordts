import { Channel, Collection, GuildMember, MessageMentions, Permissions, TextBasedChannel, TextChannel, User, VoiceChannel, VoiceState } from 'discord.js';
import { ExtendMessage } from '../src/typings/Command';

describe('administrator', () => {
  let msg: ExtendMessage;
  let args: Array<string>;
  let mentionUser: GuildMember;

  beforeEach(() => {
    msg = ({
      channel: {
        bulkDelete: jest.fn(),
        send: jest.fn(),
      } as unknown as TextChannel,
      reply: jest.fn(),
      member: {
        permissions: new Permissions(BigInt(0)),
      } as GuildMember,
      mentions: {
        members: new Collection(),
        channels: new Collection(),
      } as MessageMentions,
      delete: jest.fn(),
    } as unknown) as ExtendMessage;
    args = [];
    mentionUser = {
      voice: {
        setChannel: jest.fn(),
      } as unknown as VoiceState,
      permissions: new Permissions(BigInt(0)),
      kick: jest.fn(),
      ban: jest.fn(),
      user: {
        username: 'test username',
        discriminator: 'test discriminator',
      },
    } as unknown as GuildMember;
  });


  async function getCommand(name: string) {
    return (await import(`../src/commands/mainCommands/administrator/${name}`)).default;
  }

  it('kick', async () => {
    const command = await getCommand('kick');

    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenCalledWith('이 명령어를 사용할 권한이 없습니다.');

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenCalledWith('강퇴할 유저를 맨션해주시기 바랍니다.');

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenLastCalledWith('이 유저는 강퇴할 수 없습니다.');

    args = ['', 'test', 'kick', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.channel.send).toHaveBeenLastCalledWith('```' + `처벌 대상: test username#test discriminator\n가한 처벌: 강퇴\n처벌 사유: test kick reason` + '```');
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.kick).toHaveBeenCalledTimes(1);
  });

  it('ban', async () => {
    const command = await getCommand('ban');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith('이 명령어를 사용할 권한이 없습니다.');

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith('차단할 유저를 맨션해주시기 바랍니다.');

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('이 유저는 차단할 수 없습니다.');

    args = ['', 'test', 'kick', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.channel.send).toHaveBeenLastCalledWith('```' + `처벌 대상: test username#test discriminator\n가한 처벌: 차단\n처벌 사유: test kick reason` + '```');
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.ban).toHaveBeenCalledTimes(1);
  });

  it('clear', async () => {
    const command = await getCommand('clear');

    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenCalledWith('이 명령어를 사용할 권한이 없습니다.');

    args = ['string'];
    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(13)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 자연수를 입력해주시기 바랍니다.\n !clear <숫자>');

    args = ['-10'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('1에서 99사이의 수를 입력해주시기 바랍니다. \n !clear <숫자>');

    args = ['200'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('1에서 99사이의 수를 입력해주시기 바랍니다. \n !clear <숫자>');

    args = ['5'];
    command.execute({ msg, args });
    expect(msg.channel.bulkDelete).toHaveBeenCalledWith(6);
  });

  it('moveChannel', async () => {
    const command = await getCommand('moveChannel');

    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenLastCalledWith('이 명령어를 사용할 권한이 없습니다.');

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(24)) });
    command.execute({ msg, args: [] });
    expect(msg.reply).toHaveBeenLastCalledWith('유저/채널 중 선택해주시기 바랍니다.');

    args = ['유저'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('이동할 유저를 맨션해주시기 바랍니다.');


    msg.mentions.members?.set('key', mentionUser);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('음성채널을 맨션해주시기 바랍니다.');

    const mentionChannel = {
      name: 'test voiceChannel name',
      isVoice: jest.fn().mockReturnValueOnce(false),
    } as unknown as TextBasedChannel;

    msg.mentions.channels?.set('key', mentionChannel);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('음성채널을 맨션해주시기 바랍니다.');


    msg.mentions.members?.delete('key');
    Object.defineProperty(mentionChannel, 'isVoice', { value: jest.fn().mockReturnValueOnce(true) });
    for (let i = 0; i < 3; i++) {
      mentionUser = {
        voice: {
          channelId: i == 0 ? null : 'test channel id',
          setChannel: jest.fn(),
        } as unknown as VoiceState,
        user: {
          username: `test username ${i}`,
        } as User,
      } as unknown as GuildMember;
      msg.mentions.members?.set(`key ${i}`, mentionUser);
    }

    command.execute({ msg, args });
    expect(mentionUser.voice.setChannel).toHaveBeenLastCalledWith(mentionChannel);
    expect(msg.reply).toHaveBeenLastCalledWith('성공적으로 test username 1, test username 2님이 test voiceChannel name채널로 이동했습니다!');
    
    msg.mentions.members?.clear();
  });
});