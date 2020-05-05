const express = require("express");
const router = express.Router();
const { validateJsonContent } = require("../utils/common");
const {
  userSignIn,
  userSignOut,
  createUser,
} = require("../controllers/user.controller");

router.post("/login", validateJsonContent, userSignIn);
router.post("/logout", userSignOut);
router.post("/", validateJsonContent, createUser);

module.exports = router;
