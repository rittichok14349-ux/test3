const prisma = require('../prisma');
const multer = require('multer');
const bcrypt = require("bcrypt");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });


// ================= GET ALL USERS =================
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      status: 'success',
      data: users        // ✅ เอา message ออกได้ (ไม่จำเป็น)
    });

  } catch (error) {
    console.error("getUsers error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};


// ================= GET USER BY ID =================
exports.getUserById = async (req, res) => {
  const id = Number(req.params.id);   // ✅ แก้ parseInt → Number

  if (!Number.isInteger(id)) {        // ✅ เช็ค id ให้ถูกต้อง
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user ID'
    });
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with ID ${id} not found`
      });
    }

    res.status(200).json({
      status: 'success',
      data: user
    });

  } catch (error) {
    console.error("getUserById error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};


// ================= CREATE USER =================
exports.createUser = async (req, res) => {
  upload.single('profile')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        status: 'error',
        message: 'Error uploading file'
      });
    }

    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {   // ✅ เพิ่ม validation
        return res.status(400).json({
          status: 'error',
          message: 'Missing required fields'
        });
      }

      const profile = req.file ? req.file.filename : null;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.users.create({
        data: {
          username,
          email,
          profile,
          role,
          password: hashedPassword
        }
      });

      res.status(201).json({
        status: 'success',
        data: newUser
      });

    } catch (error) {
      console.error("createUser error:", error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  });
};


// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId)) {   // ✅ เช็ค id ให้ถูกต้อง
    return res.status(400).json({
      status: 'error',
      message: 'Invalid user ID'
    });
  }

  try {
    await prisma.users.delete({
      where: { id: userId }
    });

    res.status(200).json({
      status: 'success',
      message: `User with ID ${userId} has been deleted`
    });

  } catch (error) {
    console.error("deleteUser error:", error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};


// ================= ADMIN UPDATE USER =================
exports.adminUpdateUser = async (req, res) => {
  upload.single('profile')(req, res, async (err) => {
    if (err) return res.status(400).json({ status: 'error', message: 'Error uploading file' });

    const userId = Number(req.params.id);
    const { username, password, role, email } = req.body;
    const profile = req.file ? req.file.filename : null;

    if (!Number.isInteger(userId)) {   // ✅ เพิ่ม validation id
      return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
    }

    try {
      const updateData = {};

      if (username) updateData.username = username;
      if (email) updateData.email = email;
      if (role) updateData.role = role;
      if (password && password.trim().length > 0) {
        updateData.password = await bcrypt.hash(password, 10);
      }
      if (profile) updateData.profile = profile;

      const updatedUser = await prisma.users.update({
        where: { id: userId },
        data: updateData
      });

      res.status(200).json({
        status: 'success',
        data: updatedUser
      });

    } catch (error) {
      console.error("adminUpdateUser error:", error);
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  });
};