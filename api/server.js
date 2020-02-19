const express = require('express');

const apiRouter = require('./api-router.js');
const apiMiddleware = require('./api-middleware.js');

const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
  name: 'badger', // sid
  secret: 'youreastoughaswoodpeckerlips',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // true in production
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false, // GDPR laws against setting cookies automatically

  // knexSessionStore
  store: new knexSessionStore({
    knex: require('../data/db-config.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

apiMiddleware(server);

server.use(session(sessionConfig));

server.use('/api', apiRouter);

module.exports = server;
