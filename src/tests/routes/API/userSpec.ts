import Request from 'supertest';
import app from '../../../server';
// testing users endpoints
const request = Request(app);

describe('users create EndPoint response', () => {
  it('get the response for "/users/create" path', async () => {
    const response = await request.post('/api/users/create');
    expect(response.status).toBe(200);
  });
});
