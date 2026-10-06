const { Router } = require("express");
const authRouter = Router();
const authController = require("../controllers/authController");

authRouter.get("/signup", authController.userCreateGet);
authRouter.post("/signup", authController.userCreatePost);
authRouter.get("/login", authController.userLoginGet);
authRouter.post("/login", authController.userLoginPost);
authRouter.post("/logout", authController.userLogoutPost);
authRouter.get("/upgrade", authController.userUpgradeGet);
authRouter.post("/upgrade", authController.userUpgradePost);

module.exports = authRouter;
