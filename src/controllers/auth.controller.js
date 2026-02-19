const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // 👈 ต้องมีบรรทัดนี้

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return res.status(401).json({
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      token
    });

  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // ตรวจสอบข้อมูล
    if (!username || !password) {
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูลให้ครบ'
      });
    }

    // เช็ค username ซ้ำ
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username นี้ถูกใช้แล้ว'
      });
    }

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกลงฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword
      }
    });

    res.status(201).json({
      message: 'สมัครสมาชิกสำเร็จ',
      user: {
        id: newUser.id,
        username: newUser.username
      }
    });

  } catch (err) {
    next(err);
  }
};