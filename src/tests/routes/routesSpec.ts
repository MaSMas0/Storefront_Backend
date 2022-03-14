import Request from 'supertest';
import app from '../../server';
// testing models endpoints
const request = Request(app);

describe('users EndPoint response', () => {
  it('get the response for "/users" path', async () => {
    const response = await request.get('/api/users');
    expect(response.status).toBe(200);
  });
});
