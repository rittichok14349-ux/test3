const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ✅ ต้องส่ง "ตัวฟังก์ชัน" เข้าไป
router.post('/login', authController.login);

module.exports = router;
