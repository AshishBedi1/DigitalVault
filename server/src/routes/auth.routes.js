const express = require("express");
const router = express.Router();

const {registerUser, verifyEmail} = require("../controllers/auth.controller")

router.post("/register", registerUser);
router.get("/verify/:token", verifyEmail)

module.exports = router;