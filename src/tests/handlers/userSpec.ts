import Request from 'supertest';
import client from '../../database';
import { User, UserOperation } from '../../models/user';
import app from '../../server';

const request = Request(app);
const user = new UserOperation();
describe('Test CRUD API HTTP Operations', () => {
  const u = {
    username: 'armin',
    email: 'armin@eldia.com',
    password_digest: 'annie'
  } as User;
  beforeAll(async () => {
    const userCreation = await user.create(u);
    u.id = userCreation.id;
  });
  afterAll(async () => {
    const connection = await client.connect();
    const sql =
      'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1; ';
    await connection.query(sql);
    connection.release();
  });
  it('should create new user', async () => {
    const res = await request
      .post('/api/users/create')
      .set('Content-Type', 'Application/json')
      .send({
        username: 'eren yeager',
        email: 'attacktitan@eldia.com',
        password_digest: 'rumbling'
      } as User);
    expect(res.status).toBe(200);
    expect(res.body.username).toBe('eren yeager');
    expect(res.body.email).toBe('attacktitan@eldia.com');
    expect(res.body.password_digest).toBe('rumbling');
  });
  it('should delete existing user', async () => {
    const res = await request
      .delete('/api/users/delete')
      .set('Content-Type', 'Application/json')
      .send({
        id: u.id
      } as unknown as User);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(u.id);
  });
});
