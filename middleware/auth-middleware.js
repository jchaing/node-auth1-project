const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');

function validateAuth(req, res, next) {
  const { username, password } = req.headers;

  username && password
    ? Users.findBy({ username })
        .first()
        .then(user => {
          user && bcrypt.compareSync(password, user.password)
            ? next()
            : res.status(401).json({ message: 'Invalid Credentials' });
        })
        .catch(err => {
          res.status(500).json({ error: 'Failed to authenticate', err });
        })
    : res.status(400).json({ message: 'No credentials provided' });
}

module.exports = {
  validateAuth
}
