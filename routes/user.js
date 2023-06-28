const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/login", userController.getLoginUser);

router.get("/login-error", userController.getLoginUserError);

router.get("/register", userController.getRegisterUser);

router.post("/login", userController.postLoginUser);

router.post("/register", userController.postRegisterUser);

module.exports = router;
