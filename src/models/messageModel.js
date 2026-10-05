const pool = require("../config/pool");

//get all messages
async function getMessages() {
  const { rows } = await pool.query(
    "SELECT CONCAT(users.first_name,' ',users.last_name) AS full_name, messages.* FROM users JOIN messages ON users.user_id = messages.user_id ORDER BY messages.date DESC",
  );
  return rows;
}

//post new message
async function createMessage(message, user_id) {
  await pool.query("INSERT INTO messages (message,user_id) VALUES ($1,$2)", [
    message,
    user_id,
  ]);
}

//delete message
async function deleteMessage(message_id) {
  await pool.query("DELETE FROM messages WHERE message_id = $1", [message_id]);
}

module.exports = {
  getMessages,
  createMessage,
  deleteMessage,
};
