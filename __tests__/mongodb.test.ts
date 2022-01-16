import { MongoClient } from 'mongodb'

const collectionName = 'test';

let connection: any;
let db: any;

describe('test', () => {
  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.DB_URI || '');
    db = await connection.db('myfirstdb');
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await db.collection(collectionName).deleteMany({});
  });

  it('test mongodb', async () => {
    const users = db.collection(collectionName);

    const mockUser = {
      _id: 'some-user-id4',
      name: 'John4',
      email: 'test4@naver.com',
    };
    await users.insertOne(mockUser);

    const insertedUser = await users.findOne({_id: 'some-user-id4'});
    expect(insertedUser).toEqual(mockUser);
  });
});