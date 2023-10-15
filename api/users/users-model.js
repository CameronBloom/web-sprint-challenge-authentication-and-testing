const db = require('../../data/dbConfig')

/**
  resolves to the user { user_id, username, password } with the given user_id
 */
function findById(id) {
  return db('users as u').select(
    'u.id',
    'u.username',
    'u.password',
  ).where('u.id', id).first()
}

/**
  resolves to the newly inserted user { user_id, username, password }
 */
async function add(user) {
  const [id] = await db('users').insert(user)
  return findById(id)
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
  function findBy(filter) {
    return db('users').where(filter)
  }

module.exports = {
  add,
  findById,
  findBy,
};

