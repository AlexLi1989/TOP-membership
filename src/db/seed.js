const { Client } = require("pg");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS users;

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS users(
  user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email CITEXT NOT NULL UNIQUE,
  CONSTRAINT chk_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  password VARCHAR(255) NOT NULL,
  member_status BOOLEAN NOT NULL DEFAULT false,
  admin_status BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages(
  message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  message VARCHAR(512) NOT NULL,
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  try {
    await client.connect();
    console.log("connected");
    await client.query(SQL);
    console.log("seeded");
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
