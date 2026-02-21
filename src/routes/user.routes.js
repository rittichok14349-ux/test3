const express = require('express');
const app = express.Router();
const controller = require('../controllers/user.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// ✅ Get all users (admin only)
app.get('/',
  authenticate,
  authorize(['admin']),
  controller.getUsers
);

// ✅ Get user by id (admin only)
app.get('/:id',
  authenticate,
  authorize(['admin']),
  controller.getUserById
);

// ⚠️ Create user (ควรเป็น admin เท่านั้น หรือเปิด public ก็ได้ตามระบบ)
// ถ้าเป็น admin เท่านั้น แนะนำแบบนี้:
app.post('/',
  authenticate,
  authorize(['admin']),
  controller.createUser
);

// ✅ Update user by admin
app.put('/:id',
  authenticate,
  authorize(['admin']),
  controller.adminUpdateUser
);

// ✅ Delete user (admin only)

app.delete('/:id',
  authenticate,
  authorize(['admin']),
  controller.deleteUser
);

module.exports = app;