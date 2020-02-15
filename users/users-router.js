const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('./users-model.js');

const { validateAuth } = require('../middleware/auth-middleware.js');

/*** /api/users/register ***/

router.post('/register', (req, res) => {
  let user = req.body;
  console.log('User', user);

  const hash = bcrypt.hashSync(user.password, 12);
  console.log('Hash', hash);
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

/*** /api/users/login ***/

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      console.log('user', user);
      user && bcrypt.compareSync(password, user.password)
        ? res.status(200).json({ message: `Welcome ${user.username}!` })
        : res.status(401).json({ message: 'Invalid Credentials' });
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to login', err });
    });
});

/*** /api/users/login ***/

router.get('/users', validateAuth, (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get list of users', err });
    });
});

// middleware login authentication

// function validateAuth(req, res, next) {
//   const { username, password } = req.headers;

//   username && password
//     ? Users.findBy({ username })
//         .first()
//         .then(user => {
//           user && bcrypt.compareSync(password, user.password)
//             ? next()
//             : res.status(401).json({ message: 'Invalid Credentials' });
//         })
//         .catch(err => {
//           res.status(500).json({ error: 'Failed to authenticate', err });
//         })
//     : res.status(400).json({ message: 'No credentials provided' });
// }

module.exports = router;
