import { Collection, GuildMember, Message, MessageMentions, Permissions, Role, TextChannel, VoiceChannel, VoiceState, NewsChannel, ThreadChannel} from 'discord.js';
import mongoose from 'mongoose';
import { Command } from '../src/managers/Commands';
import { warning } from '../src/models/warning';
import { ExtendClient } from '../src/structures/Client';

const client = new ExtendClient
describe('admin', () => {
  let msg: Message;
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
    await mongoose.connect(process.env.MONGO_DB_URI + '/testDB');
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
    } as unknown as Message;

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


  async function getCommand(name: string): Promise<Command> {
    return (await import(`../src/commands/admin/${name}`)).default;
  }

  it('kick', async () => {
    const command = await getCommand('kick');

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenCalledWith(client.messages.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenCalledWith(client.messages.admin.kick.missingMentionUser);

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(1)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.kick.missingPermissionTarget);

    args = ['', 'test', 'kick', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(punishChannel.send).toHaveBeenLastCalledWith(client.messages.admin.kick.success(mentionUser.user, 'test kick reason'));
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.kick).toHaveBeenCalledTimes(1);
  });

  it('ban', async () => {
    const command = await getCommand('ban');

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenCalledWith(client.messages.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenCalledWith(client.messages.admin.ban.missingMentionUser);

    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(1) << BigInt(2)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.ban.missingPermissionTarget);

    args = ['', 'test', 'ban', 'reason'];
    Object.defineProperty(mentionUser, 'permissions', { value: new Permissions(BigInt(0)) });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(punishChannel.send).toHaveBeenLastCalledWith(client.messages.admin.ban.success(mentionUser.user, 'test ban reason'));
    expect(msg.delete).toHaveBeenCalledTimes(1);
    expect(mentionUser.ban).toHaveBeenCalledTimes(1);
  });

  it('clear', async () => {
    const command = await getCommand('clear');

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenCalledWith(client.messages.missingPermissionUser);

    args = ['string'];
    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(13)) });
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.naturalNumber);

    args = ['-10'];
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.betweenNumber(1, 99));

    args = ['200'];
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.betweenNumber(1, 99));

    args = ['5'];
    command.execute({ msg, args, client });
    if (!(msg.channel instanceof NewsChannel || msg.channel instanceof TextChannel || msg.channel instanceof ThreadChannel))
      return
    expect(msg.channel.bulkDelete).toHaveBeenCalledWith(6);
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.clear.success(5))
  });

  it('alarm', async () => {
    const command = await getCommand('alarm');

    command.execute({ msg, args, client })
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.missingPermissionUser);

    Object.defineProperty(msg.member, 'permissions', { value: new Permissions(BigInt(1) << BigInt(24)) });
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.alarm.missingMentionUser);


    Object.defineProperty(mentionUser.user, 'bot', { value: true });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.alarm.bot);


    Object.defineProperty(mentionUser.user, 'bot', { value: false });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.missingVoiceChannelUser)


    Object.defineProperty(mentionUser.voice, 'channelId', { value: '929974395118694410' });
    msg.mentions.members?.set('key', mentionUser);

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.alarm.missingSelfDeaf);


    const voiceChannel = {
      id: '1',
    } as VoiceChannel;
    client.channels.cache.set('910521120770359323', voiceChannel);
    Object.defineProperty(mentionUser.voice, 'selfDeaf', { value: true });
    command.execute({ msg, args, client });
    expect(mentionUser.voice.setChannel).toHaveBeenCalledWith(voiceChannel);
  });

  it('give warning', async () => {
    const command = await getCommand('warning/give');

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.missingPermissionUser);

    const mockRole = {} as Role;
    msg.member.roles.cache?.set('910521119713394745', mockRole);
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.give.missingMentionUser);

    msg.mentions.members?.set('key', mentionUser);
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.naturalNumber);

    args = ['', '-1'];
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.naturalNumber);

    args = ['', '11'];
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.give.overNumber);

    let user = await warning.findOne({ id: 'test id' });
    expect(user).toBeNull();

    args = ['', '4', 'test', 'warning', 'reason'];
    await command.execute({ msg, args, client });

    user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 4;

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(client.messages.admin.warning.give.success(mentionUser.user, 4, 4, 'test warning reason'))


    args = ['', '3', 'test', 'warning', 'reason'];
    await command.execute({ msg, args, client });

    user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 7

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(client.messages.admin.warning.give.success(mentionUser.user, 3, 7, 'test warning reason'))
    await warning.deleteOne({ id: 'test id' });
  });

  it('deduction warning', async () => {
    const command = await getCommand('warning/deduction');

    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.missingPermissionUser);

    const mockRole = {} as Role;
    msg.member.roles.cache?.set('910521119713394745', mockRole);
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.deduction.missingMentionUser);

    msg.mentions.members?.set('key', mentionUser);
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.naturalNumber);

    args = ['', '-1'];
    command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.naturalNumber);

    args = ['', '3'];
    await command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.deduction.noneWarning);

    const newUser = new warning({ id: 'test id', name: 'test username' });
    await newUser.save();
    await command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.deduction.noneWarning);

    args = ['', '7'];
    (await warning.updateOne({ id: 'test id' }, { $inc: { warning: 5 } })).matchedCount;
    await command.execute({ msg, args, client });
    expect(msg.reply).toHaveBeenLastCalledWith(client.messages.admin.warning.deduction.overWarning);


    args = ['', '3', 'test', 'warning', 'reason'];
    await command.execute({ msg, args, client });

    let user = await warning.findOne({ id: 'test id' });
    mockUser.warning = 2;

    expect(user).toMatchObject(mockUser);
    expect(punishChannel.send).toHaveBeenLastCalledWith(client.messages.admin.warning.deduction.success(mentionUser.user, 3, 2, 'test warning reason'));
  });
});