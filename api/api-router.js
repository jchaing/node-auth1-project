const router = require('express').Router();

const usersRouter = require('../users/users-router.js');

router.use('/', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: 'We are live!' });
});

module.exports = router;
