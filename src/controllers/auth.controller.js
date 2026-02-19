const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const authService = require("../services/auth.service");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json({
      status: "success",
      message: "Register successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = authService.generateToken({ userId: user.id });

    res.json({
      status: "success",
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
