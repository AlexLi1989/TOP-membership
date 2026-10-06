const { body, validationResult, matchedData } = require("express-validator");
const {
  findEmail,
  createUser,
  upgradeUserMember,
  upgradeUserAdmin,
} = require("../models/userModel");
const passport = require("passport");
const bcrypt = require("bcryptjs");

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
  body("confirm_password").custom((value, { req }) => {
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
        return res.status(400).render("signup", {
          TITLE: "Alex's Private Club - Sign Up",
          ERRORS: errors.array(),
          LASTPARAMS: req.body,
        });
      }
      const newUser = matchedData(req);
      newUser.password = await bcrypt.hash(req.body.password, 10);
      delete newUser.confirm_password;
      await createUser(newUser);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

//login get
function userLoginGet(req, res, next) {
  res.render("login", {
    TITLE: "Alex's Private Club - Log In",
  });
}

//login post
const userLoginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureMessage: true,
});

//logout post
function userLogoutPost(req, res, next) {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
}
//upgrade get
function userUpgradeGet(req, res, next) {
  res.render("upgrade", {
    TITLE: "Alex's Private Club - Upgrade",
  });
}

//upgrade post
async function userUpgradePost(req, res, next) {
  try {
    if (req.body.passphrase === process.env.MEMBER_SECRET_PASSWORD) {
      await upgradeUserMember(req.user.user_id);
      res.redirect("/");
    } else if (req.body.passphrase === process.env.ADMIN_SECRET_PASSWORD) {
      await upgradeUserAdmin(req.user.user_id);
      res.redirect("/");
    } else {
      return res.status(400).render("upgrade", {
        TITLE: "Alex's Private Club - Upgrade",
        ERRORS: [{ msg: "Invalid passphrase." }],
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  userCreateGet,
  userCreatePost,
  userLoginGet,
  userLoginPost,
  userLogoutPost,
  userUpgradeGet,
  userUpgradePost,
};
