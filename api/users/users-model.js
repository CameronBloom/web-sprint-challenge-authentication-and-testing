const db = require('../../data/dbConfig')

/**
  resolves to the user { user_id, username, password } with the given user_id
 */
function findById(user_id) {
  return db('users as u').select(
    'u.user_id',
    'u.username',
    'u.password',
  ).where('u.user_id', user_id).first()
}


/**
  resolves to the newly inserted user { user_id, username, password }
 */
async function add(user) {
  const [user_id] = await db('users').insert(user)
  return findById(user_id)
}

module.exports = {
  add,
  findById,
};