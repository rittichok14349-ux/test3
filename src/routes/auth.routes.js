const express = require("express");
const authController = require("../controllers/auth.controller");
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();



// REGISTER

router.post("/register", authController.register);

// LOGIN
router.post("/login", authController.login);

module.exports = router;
