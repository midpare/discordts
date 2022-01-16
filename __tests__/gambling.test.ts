import mongoose from 'mongoose';
import { CommandType, ExtendMessage } from '../src/typings/command';
import { gambling } from '../src/models/gambling';
import { Collection, GuildMember, MessageEmbed, MessageMentions } from 'discord.js';

describe('test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI + '/testDB' || '');
  });

  afterAll(async () => {
    await gambling.deleteMany({});
    await mongoose.connection.close();
  });

  const date = new Date();
  const today = '' + date.getFullYear() + date.getMonth() + date.getDate();

  const msg = ({
    channel: {
      send: jest.fn(),
    },
    reply: jest.fn(),
    author: {
      id: 'test id',
      username: 'test name',
    },
    mentions: {
      members: new Collection(),
    } as unknown as MessageMentions,
  } as unknown) as ExtendMessage;

  const mockUser = {
    _id: expect.anything(),
    id: 'test id',
    name: 'test name',
    date: 0,
    money: 0,
    debt: 0,
    principalDebt: 0,
    gamLevel: 1,
    bankruptcy: 0,
    baseMoneyCoolTime: 0,
    stock: [],
  };

  let args: Array<string>;

  afterEach(() => {
    mockUser.money = 0;
    mockUser.debt = 0;
    mockUser.principalDebt = 0;
    args = [];
  });

  async function setMoney(money: number) {
    (await gambling.updateOne({ id: 'test id' }, { $set: { money } })).matchedCount;
  }

  async function setDebt(debt: number) {
    (await gambling.updateOne({ id: 'test id' }, { $set: { principalDebt: debt, debt } })).matchedCount;
  }

  async function getCommand(name: string): Promise<CommandType> {
    return (await import(`../src/commands/mainCommands/gambling/${name}`)).default
  }

  it('join', async () => {
    const command = await getCommand('join');

    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    expect(msg.reply).toHaveBeenCalledWith('성공적으로 가입이 완료되었습니다!');
    expect(user).toMatchObject(mockUser);

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('이미 가입된 유저입니다.');
  });

  it('baseMoney', async () => {
    const command = await getCommand('baseMoney');

    setMoney(0);
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });

    mockUser.money = 25000;
    mockUser.baseMoneyCoolTime = user.baseMoneyCoolTime;
    expect(user).toMatchObject(mockUser);

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('보유하신 돈이나 코인이 있어 기초자금을 지급할 수 없습니다.');
  });

  it('daily', async () => {
    const command = await getCommand('daily');

    
    await setMoney(0);
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    
    mockUser.money = expect.any(Number);
    mockUser.date = parseFloat(today);

    expect(user).toMatchObject(mockUser);
    expect(user.money).toBeGreaterThanOrEqual(50000);
    expect(user.money).toBeLessThanOrEqual(100000);
    expect(msg.reply).toHaveBeenLastCalledWith(`${user.money.toLocaleString()}원이 지급됐습니다!\ntest name님의 현재 잔액은 0원 -> ${user.money.toLocaleString()} 원입니다.`);

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('오늘은 이미 받았습니다.');
  })

  it('balance', async () => {
    const command = await getCommand('balance');

    await setMoney(10000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('test name 님의 잔액은 10,000원입니다.');

    await setMoney(5000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('test name 님의 잔액은 5,000원입니다.');
  });

  it('gambling', async () => {
    const command = await getCommand('gambling');

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액를 입력해주시기 바랍니다.');

    args = ['-1'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액를 입력해주시기 바랍니다.');

    args = ['2000'];
    await setMoney(1000)
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: 1,000원');

    args = ['3000'];
    await setMoney(10000);
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    expect([7000, 13000]).toContain(user.money);

    if (user.money == 7000) {
      mockUser.money = 7000;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 실패하셨습니다! 3,000원이 차감되었습니다. \n현재 잔액: 10,000원 -> 7,000원');
    } else if (user.money == 13000) {
      mockUser.money = 13000;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 성공하셨습니다! 3,000원이 지급되었습니다. \n현재 잔액: 10,000원 -> 13,000원');
    }
  });

  it('allIn', async () => {
    const command = await getCommand('allIn');

    await setMoney(0);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('돈이 없을때는 도박을 할 수 없습니다.');

    await setMoney(10000);
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    expect([0, 20000]).toContain(user.money);

    if (user.money == 0) {
      mockUser.money = 0;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 실패하셨습니다! 모든 돈을 잃었습니다. \n현재 잔액 10,000원 -> 0원');
    } else if (user.money == 20000) {
      mockUser.money = 20000;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 성공하셨습니다! 10,000원이 지급되었습니다. \n현재 잔액: 10,000원 -> 20,000원');
    }
  })

  it('half', async () => {
    const command = await getCommand('half');

    await setMoney(0);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('돈이 없을때는 도박을 할 수 없습니다.');

    await setMoney(10000);
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    expect([5000, 15000]).toContain(user.money);

    if (user.money == 5000) {
      mockUser.money = 5000;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 실패하셨습니다! 5,000원이 차감되었습니다. \n현재 잔액: 10,000원 -> 5,000원');
    } else if (user.money == 15000) {
      mockUser.money = 15000;
      expect(user).toMatchObject(mockUser);
      expect(msg.reply).toHaveBeenLastCalledWith('도박에 성공하셨습니다! 5,000원이 지급되었습니다. \n현재 잔액: 10,000원 -> 15,000원');
    }
  })

  it('loan', async () => {
    const command = await getCommand('loan');

    await setMoney(10000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['-10'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['1000001'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('100만원을 초과하는 빚은 빌릴 수 없습니다.');

    args = ['900001'];
    await setDebt(100000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('100만원을 초과하는 빚은 빌릴 수 없습니다.');

    args = ['500000'];
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });

    mockUser.debt = 600000;
    mockUser.principalDebt = 600000;
    mockUser.money = 510000;
    expect(user).toMatchObject(mockUser);
  });

  it('debt', async () => {
    const command = await getCommand('debt');

    await setDebt(10000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('test name 님의 빚은 10,000원입니다.');

    await setDebt(5000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('test name 님의 빚은 5,000원입니다.');
  });

  it('payBack', async () => {
    const command = await getCommand('payBack');

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['-10'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['30000'];
    await setMoney(20000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: 20,000원');

    args = ['10000'];
    await setDebt(5000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('갚으려는 금액이 현재 빚보다 많습니다.\n현재 빚:5,000원');

    args = ['5000'];
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });

    mockUser.debt = 0;
    mockUser.principalDebt = 0;
    mockUser.money = 15000;
    expect(user).toMatchObject(mockUser);
  });

  it('rsp', async () => {
    const command = await getCommand('rsp');

    args = ['test'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('가위, 바위, 보 중 하나를 입력해주시기바랍니다.\n !rsp <가위/바위/보> <돈>');

    args = ['가위'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['가위', '-1'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['가위', '20000'];
    await setMoney(10000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: 10,000원');

    args = ['가위', '5000'];
    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });
    expect([5000, 8000, 25000]).toContain(user.money);
  });

  it('send', async () => {
    const command = await getCommand('send');

    await command.execute({ msg, args })
    expect(msg.reply).toHaveBeenLastCalledWith('송금할 유저를 맨션해주시기 바랍니다.')
    const target = {
      id: 'test send id',
    } as unknown as GuildMember;

    msg.mentions.members?.set('key', target);

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('송금할 유저가 가입을 하지 않았습니다.');

    const newUser = new gambling({ id: 'test send id', name: 'test send name' });
    await newUser.save();

    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['', '-1'];
    await setMoney(10000);
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('정확한 금액을 입력해주시기 바랍니다.');

    args = ['', '100000'];
    await command.execute({ msg, args });
    expect(msg.reply).toHaveBeenLastCalledWith('현재 잔액보다 높은 돈은 입력하실 수 없습니다. \n현재 잔액: 10,000원');

    args = ['', '10000'];
    await command.execute({ msg, args });
    const sendUser = await gambling.findOne({ id: 'test id' });
    const targetUser = await gambling.findOne({ id: 'test send id' });

    expect(sendUser).toMatchObject(mockUser);
    expect(targetUser.money).toBe(10000);
    expect(msg.reply).toHaveBeenLastCalledWith('성공적으로 test send name님에게 10,000원을 송금했습니다!');
    
    await gambling.deleteOne({ id: 'test send id' });
  });

  it('ranking', async () => {
    const command = await getCommand('ranking');

    for (let i = 0; i < 5; i++) {
      const money = Math.sin(i) < 0 ? Math.floor(Math.sin(i) * -10000) : Math.floor(Math.sin(i) * 10000);
      const newUser = new gambling({ id: `test ranking id ${i}`, name: `test ranking name ${i}`, money });
      await newUser.save();
    }

    await command.execute({ msg, args });
    const embed = {
      'author': null, 
      'color': null, 
      'title': '랭킹', 
      'description': '유저의 돈 순위를 확인합니다.', 
      'fields': [
        { 'inline': false, 'name': 'test ranking name 2', 'value': '9,092원' },
        { 'inline': false, 'name': 'test ranking name 1', 'value': '8,414원' },
        { 'inline': false, 'name': 'test ranking name 4', 'value': '7,568원' },
        { 'inline': false, 'name': 'test ranking name 3', 'value': '1,411원' },
      ], 
      'footer': null, 
      'image': null, 
      'provider': null,
      'thumbnail': null, 
      'timestamp': null, 
      'type': 'rich', 
      'url': null,
      'video': null,
    } as MessageEmbed;
    expect(msg.channel.send).toHaveBeenCalledWith({ embeds: [embed] });
  });

  it('bankruptcy', async () => {
    const command = await getCommand('bankruptcy');

    await command.execute({ msg, args });
    const user = await gambling.findOne({ id: 'test id' });

    mockUser.bankruptcy = parseFloat(today);
    
    expect(user).toMatchObject(mockUser);
    expect(msg.reply).toHaveBeenLastCalledWith('성공적으로 test name님이 파산했습니다!');
  });
});