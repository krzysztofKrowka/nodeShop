const path = require("path");

const express = require("express");

const userController = require("../controllers/user");

router.get("/user/login", userController.getLoginUser);

router.get("/user/register", userController.getLoginUser);

router.post("/user/login", userController.postLoginUser);

router.post("/user/register", userController.postLoginUser);

const router = express.Router();

module.exports = router;
