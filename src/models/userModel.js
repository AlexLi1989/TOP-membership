const pool = require("../config/pool");

//find email
async function findEmail({ email }) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows.length > 0;
}

//create user
async function createUser(newUser) {
  const { first_name, last_name, email, password } = newUser;
  const { rows } = await pool.query(
    "INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [first_name, last_name, email, password],
  );
  return rows[0];
}

//upgrade user member
async function upgradeUserMember(user_id) {
  await pool.query("UPDATE users SET member_status = $1 WHERE user_id = $2", [
    true,
    user_id,
  ]);
}

//upgrade user admin
async function upgradeUserAdmin(user_id) {
  await pool.query("UPDATE users SET admin_status = $1 WHERE user_id = $2", [
    true,
    user_id,
  ]);
}

module.exports = {
  findEmail,
  createUser,
  upgradeUserMember,
  upgradeUserAdmin,
};
