const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

describe('GET /', () => {
  it('should return status 200', async () => {
    const res = await request(server).get('/');

    expect(res.status).toBe(200);
  });

  it('should return JSON', async () => {
    const res = await request(server).get('/');

    expect(res.type).toBe('application/json');
  });

  it('should return {api: "up"}', async () => {
    const res = await request(server).get('/');

    expect(res.body).toEqual({api: "up"});
  });

  describe('GET /games', () => {
    beforeEach(() => {
      return db('games').truncate();
    });

    it('should return an HTTP status of 200', async () => {
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });

    it('should return an empty array if there are no games in db', async () => {
      const res = await request(server).get('/games');

      expect(res.body).toEqual([]);
    });
  });
});
