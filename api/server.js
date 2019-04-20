const express = require('express');

const games = require('../games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
  const allTheGames = await games.getAll();

  res.status(200).json(allTheGames);
});

// server.post('/games', async (req, res) => {
// });

module.exports = server;
