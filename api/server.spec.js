const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

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

  it('should return all the games in the db', async () => {
    await db('games').insert([
      {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      },
      {
        title: 'Pong',
        genre: 'Arcade',
        releaseYear: '1971'
      }
    ]);

    const res = await request(server).get('/games');
    const data = res.body;

    expect(res.status).toBe(200);
    expect(data.length).toEqual(2);
    expect(data[0].id).toBe(1);
    expect(data[0].title).toBe('Pacman');
    expect(data[0].releaseYear).toBe(1980);
  });
});

describe('POST /games', () => {
  beforeEach(() => {
    return db('games').truncate();
  });

  it('should return HTTP status of 422, if missing title or genre', async () => {
    const res = await request(server).post('/games');
    expect(res.status).toBe(422);
  });

  it('should return HTTP status of 201, if games are inserted successfuly', async () => {
    const res = await request(server).post('/games').send({
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    });

    const data = res.body;

    expect(res.status).toBe(201);
    expect(data.id).toBe(1);
    expect(data.title).toBe('Pacman');
    expect(data.releaseYear).toBe(1980);
  });
});
