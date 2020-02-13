const router = require('express').Router();

const usersRouter = require('../users/users-router.js');

const { validateAuth } = require('../middleware/auth-middleware.js');

router.use('/', usersRouter);

router.use('/restricted', validateAuth, (req, res) => {
  res.json({ api: 'Congrats! Your authentication to restricted' });
});

router.get('/', (req, res) => {
  res.json({ api: 'We are live!' });
});

module.exports = router;
