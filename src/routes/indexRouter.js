const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth");

indexRouter.get("/", indexController.index);
indexRouter.post(
  "/messages",
  ensureAuthenticated,
  indexController.messageCreatePost,
);
indexRouter.post(
  "/messages/:id",
  ensureAuthenticated,
  ensureAdmin,
  indexController.messageDeletePost,
);

module.exports = indexRouter;
