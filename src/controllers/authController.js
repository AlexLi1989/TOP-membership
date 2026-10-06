const { body, validationResult, matchedData } = require("express-validator");
const { findEmail, createUser } = require("../models/userModel");

//validator
const nameLengthErr = "Must be between 1 and 50 characters.";
const validateUser = [
  body("first_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(nameLengthErr)
    .escape(),
  body("last_name")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(nameLengthErr)
    .escape(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Must be a valid email.")
    .isLength({ max: 254 })
    .withMessage("Must be less than 254 characters.")
    .custom(async (value) => {
      const isNotUnique = await findEmail({ email: value });
      if (isNotUnique) {
        throw new Error("Email already exists.");
      }
      return true;
    })
    .escape()
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 8, max: 72 })
    .withMessage("Must be between 8 and 72 characters.")
    .matches(/[A-Z]/)
    .withMessage("Must contain at least one uppercase letter.")
    .matches(/[a-z]/)
    .withMessage("Must contain at least one lowercase letter.")
    .matches(/\d/)
    .withMessage("Must contain at least one digit.")
    .matches(/[!@#$%^&*(),.?":{}|<>_+-=]/)
    .withMessage("Must contain at least one special character.")
    .escape(),
  body("confirm_password").custom((value, req) => {
    if (value != req.body.password) {
      throw new Error("Password does not match.");
    }
    return true;
  }),
];

//signup get
function userCreateGet(req, res, next) {
  res.render("signup", {
    TITLE: "Alex's Private Club - Sign Up",
  });
}

//signup post
const userCreatePost = [
  ...validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status;
      }
    } catch (error) {}
  },
];

//login get
function userLoginGet(req, res, next) {
  res.render("login", {
    TITLE: "Alex's Private Club - Log In",
  });
}

//login post

//logout post

//upgrade get
function userLoginGet(req, res, next) {
  res.render("upgrade", {
    TITLE: "Alex's Private Club - Upgrade",
  });
}

//upgrade post

module.exports = {};
