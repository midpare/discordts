import { Collection, GuildMember, MessageMentions, Permissions, Role, TextChannel, VoiceChannel, VoiceState } from 'discord.js';
import mongoose from 'mongoose';
import { warning } from '../src/models/warning';
import { client } from '../src/structures/Client';
import { message } from '../src/util/language/message';
import { CommandType, ExtendMessage } from '../src/util/types/command';

describe('admin', () => {
  let msg: ExtendMessage;
  let args: Array<string>;
  let mentionUser: GuildMember;
  const mockUser = {
    _id: expect.anything(),
    id: 'test id',
    name: 'test username',
    warning: 0,
  };
  const punishChannel = {
    id: 'textChannel',
    send: jest.fn(),
  } as unknown as TextChannel;

  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI + '/testDB');
    client.channels.cache.set('910521119877005363', punishChannel);
  });

  afterAll(async () => {
    await warning.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(() => {
    msg = {
      channel: {
        bulkDelete: jest.fn(),
        send: jest.fn(),
      } as unknown as TextChannel,
      reply: jest.fn(() => msg),
      member: {
        permissions: new Permissions(BigInt(0)),
        roles: {
          cache: new Collection(),
        },
      } as GuildMember,
      mentions: {
        members: new Collection(),
        channels: new Collection(),
      } as MessageMentions,
      delete: jest.fn(),
    } as unknown as ExtendMessage;

    args = [];

    mentionUser = {
      id: 'test id',
      voice: {
        setChannel: jest.fn(),
        selfDeaf: false,
        channel: {
          id: '2'
        } as unknown as VoiceChannel
      } as unknown as VoiceState,
      permissions: new Permissions(BigInt(0)),
      kick: jest.fn(),
      ban: jest.fn(),
      user: {
        username: 'test username',
        discriminator: 'test discriminator',
        bot: false,
      },
    } as unknown as GuildMember;
  });


  async function getCommand(name: string): Promise<CommandType> {
    return (await import(`../src/commands/admin/${name}`)).default;
  }

  it('kick', async () => {
    const command = await getCommand('kick');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith(message.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith(message.admin.kick.missingMentionUser);

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.kick.missingPermissionTarget);

    args = ['', 'test', 'kick', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(punishChannel.send).toHaveBeenLastCalledWith(message.admin.kick.success(mentionUser.user, 'test kick reason'));
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.kick).toHaveBeenCalledTimes(1);
  });

  it('ban', async () => {
    const command = await getCommand('ban');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith(message.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith(message.admin.ban.missingMentionUser);

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.ban.missingPermissionTarget);

    args = ['', 'test', 'ban', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(punishChannel.send).toHaveBeenLastCalledWith(message.admin.ban.success(mentionUser.user, 'test ban reason'));
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.ban).toHaveBeenCalledTimes(1);
  });

  it('clear', async () => {
    const command = await getCommand('clear');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenCalledWith(message.missingPermissionUser);

    args = ['string'];
    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(13)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.naturalNumber);

    args = ['-10'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.betweenNumber(1, 99));

    args = ['200'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.betweenNumber(1, 99));

    args = ['5'];
    command.execute({ msg, args });
    expect(msg.channel.bulkDelete).toHaveBeenCalledWith(6);
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.clear.success(5))
  });

  it('alarm', async () => {
    const command = await getCommand('alarm');

    command.execute({ msg, args })
    expect(msg.reply).toHaveBeenLastCalledWith(message.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(24)) });
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.alarm.missingMentionUser);


    Object.defineProperty(mentionUser.user, 'bot', { value: true });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.alarm.bot);


    Object.defineProperty(mentionUser.user, 'bot', { value: false });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.missingVoiceChannelUser)


    Object.defineProperty(mentionUser.voice, 'channelId', { value: '929974395118694410' });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.alarm.missingSelfDeaf);


    const voiceChannel = {
      id: '1',
    } as VoiceChannel;
    client.channels.cache.set('910521120770359323', voiceChannel);
    Object.defineProperty(mentionUser.voice, 'selfDeaf', { value: true });
    command.execute({ msg, args });
    expect(mentionUser.voice.setChannel).toHaveBeenCalledWith(voiceChannel);
  });

  it('give warning', async () => {
    const command = await getCommand('warning/give');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.missingPermissionUser);

    const mockRole = {} as Role;
    msg.member.roles.cache?.set('910521119713394745', mockRole);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.give.missingMentionUser);

    msg.mentions.members?.set('key', mentionUser);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.naturalNumber);

    args = ['', '-1'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.naturalNumber);

    args = ['', '11'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.give.overNumber);

    let user = await warning.findOne({ id: 'test id' });
    expect(user).toBeNull();

    args = ['', '4', 'test', 'warning', 'reason'];
    await command.execute({ msg, args });

    user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 4;

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(message.admin.warning.give.success(mentionUser.user, 4, 4, 'test warning reason'))


    args = ['', '3', 'test', 'warning', 'reason'];
    await command.execute({ msg, args });

    user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 7

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(message.admin.warning.give.success(mentionUser.user, 3, 7, 'test warning reason'))
    await warning.deleteOne({ id: 'test id' });
  });

  it('deduction warning', async () => {
    const command = await getCommand('warning/deduction');

    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.missingPermissionUser);

    const mockRole = {} as Role;
    msg.member.roles.cache?.set('910521119713394745', mockRole);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.deduction.missingMentionUser);

    msg.mentions.members?.set('key', mentionUser);
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.naturalNumber);

    args = ['', '-1'];
    command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.naturalNumber);

    args = ['', '3'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.deduction.noneWarning);

    const newUser = new warning({ id: 'test id', name: 'test username' });
    await newUser.save();
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.deduction.noneWarning);

    args = ['', '7'];
    (await warning.updateOne({ id: 'test id' }, { $inc: { warning: 5 } })).matchedCount;
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith(message.admin.warning.deduction.overWarning);


    args = ['', '3', 'test', 'warning', 'reason'];
    await command.execute({ msg, args });

    let user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 2;

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(message.admin.warning.deduction.success(mentionUser.user, 3, 2, 'test warning reason'));
  });
});