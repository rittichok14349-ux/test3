const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  const { name, email, password, tel } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        tel,
        role: "USER", // ใช้ตัวใหญ่ให้ตรงกัน
      },
    });

    res.json({
      status: "success",
      message: "Register successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tel: user.tel,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // ใส่ role ลง token ด้วย
    const token = authService.generateToken({
      userId: user.id,
      role: user.role,
    });

    res.json({
      status: "success",
      message: "Login successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tel: user.tel,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
