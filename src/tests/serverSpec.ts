import Request from 'supertest';
import app from '../server';

// testing server endpoint
const request = Request(app);

describe('Server EndPoint response', () => {
  it('get the response for "/" home path', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
