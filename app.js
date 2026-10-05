const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");

require("dotenv").config();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//session config
const sessionConfig = require("./config/session");
app.use(sessionConfig);

//passport config
require("./config/passport");
app.use(passport.session());

//setting global current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

//routers
const indexRouter = require("./routes/indexRouter");
const authRouter = require("./routes/authRouter");
const messagesRouter = require("./routes/messagesRouter");

//routes
app.use("/", indexRouter);
app.use("/auth", authRouter);

//error route
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

//server
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Memberships app - listening on port ${PORT}!`);
});

server.on("error", (error) => {
  console.error("server failed to start, error : ", error.message);
  throw error;
});
