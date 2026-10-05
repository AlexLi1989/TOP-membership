const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.index);
indexRouter.post("/messages", indexController.messageCreatePost);
indexRouter.post("/messages/:id", indexController.messageDeletePost);

module.exports = indexRouter;
