# TOP-membership

- This project is a backend practice for building private club membership app.
- Nav bar should contain logo directing to index, links to log in and sign up which should change to log out when logged in.
- Index page should render all messages in database,messages will show names and dates only if user has membership status, logged in users will be able to leave new message on the right side, admin will be able to delete messages. Under index title when logged in, there should be a link to upgrade page.
- Upgrade page should contain a form for passphrase input to upgrade user status, to member or admin.
- log in page should contain a form with fields of: email, password and submit button.There should be a cta encouraging registration.
- sign up page should have fields of user first name, last name, email, password, confirm password and submit button.

## Data base schema

- **Messages:** `message_id` integer primary key, `date` timestamp, `message` varchar 512, `user_id` integer foreign key
- **Users:** `user_id` integer primary key, `first_name` varchar 50, `last_name` varchar 50, `email` CITEXT, `password` varchar 255, `member_status` boolean (default:false), `admin_status` boolean (default:false)

## Routes

- Authentication (/auth):
  • GET /auth/signup
  • POST /auth/signup
  • GET /auth/login
  • POST /auth/login
  • POST /auth/logout
  • POST /auth/upgrade
- Messages:
  • GET /
  • POST /messages
  • POST /messages/:id

## Tech Stack & Ecosystem

- **Framework:** Express (v5.2.1)
- **View Engine:** EJS (v6.0.1)
- **Database:** PostgreSQL (via `pg` driver)
- **Data Validation:** `express-validator` (v7.3.2)
- **Configuration:** `dotenv` (v18.0.1)
- **Authentication:** passport, passport-local
- **Encryption:** bcryptjs
- **Session Management:** `express-session`
