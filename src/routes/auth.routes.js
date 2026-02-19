const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username ถูกใช้งานแล้ว" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
        role: "USER",
      },
    });

    res.json({
      message: "Register success",
      id: user.id,
      username: user.username,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: { username, password },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid login" });
    }

    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
