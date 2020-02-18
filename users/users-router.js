const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');

const { validateAuth } = require('../middleware/auth-middleware.js');

/*** /api/register ***/

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to register new user', err });
    });
});

/*** /api/login ***/

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        req.session.skippy = 'peanutbutter';

        console.log('Login session', req.session);

        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to login', err });
    });
});

/*** /api/users/ ***/

router.get('/users', validateAuth, (req, res) => {
  req.session.skippy = 'jelly';
  console.log('Users session', req.session);
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get list of users', err });
    });
});

/*** /api/logout ***/

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: 'you can checkout antime you like, but can never leave'
        });
      } else {
        res.status(200).json({ message: 'bye, thanks for playing' });
      }
    });
  } else {
    // res.end();
    res.status(200).json({ message: 'You were never here to begin with' });
  }
});

module.exports = router;
