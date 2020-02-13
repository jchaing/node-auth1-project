const db = require('../data/db-config.js');

function find() {
  return db('users').select('id', 'username').orderBy('id');
}

function findBy(username) {
  return db('users')
    .select('id', 'username', 'password')
    .where(username);
}

function findById(id) {
  return db('users')
  .select('id', 'username')
    .where({ id })
    .first();
  }
  
  function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
  }
  
  module.exports = {
    add,
    find,
    findBy,
    findById
  };
