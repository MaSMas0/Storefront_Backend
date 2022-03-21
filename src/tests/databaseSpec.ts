import { client } from '../database';

describe('connection to database', () => {
  it('checks that API connected successfully to database', async () => {
    client.connect().then((Client) => {
      return Client.query('SELECT NOW()').then((res) => {
        Client.release();
        expect(res.rows).toBeDefined();
      });
    });
  });
});
