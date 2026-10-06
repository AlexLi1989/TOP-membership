const {
  getMessages,
  createMessage,
  deleteMessage,
} = require("../models/messageModel");
const { body, validationResult, matchedData } = require("express-validator");

//validation
const validateMessage = [
  body("message")
    .trim()
    .isLength({ min: 1, max: 512 })
    .withMessage("Must be between 1 and 512 characters.")
    .escape(),
];

async function index(req, res, next) {
  try {
    const messages = await getMessages();
    res.render("index", {
      TITLE: "Alex's Private Club - Home",
      MESSAGES: messages,
    });
  } catch (error) {
    next(error);
  }
}

const messageCreatePost = [
  ...validateMessage,
  async (req, res, next) => {
    try {
      const messages = await getMessages();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("index", {
          TITLE: "Alex's Private Club - Home",
          MESSAGES: messages,
          ERRORS: errors.array(),
          LASTPARAMS: req.body,
        });
      }
      const { message } = matchedData(req);
      const user_id = req.user.user_id;
      await createMessage(message, user_id);
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  },
];

async function messageDeletePost(req, res, next) {
  try {
    const message_id = req.params.id;
    await deleteMessage(message_id);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  index,
  messageCreatePost,
  messageDeletePost,
};
