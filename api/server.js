const express = require('express');

const apiRouter = require('./api-router.js');
const apiMiddleware = require('./api-middleware.js');

const server = express();

apiMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;
