const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // เก็บ user ไว้ใช้ต่อ
    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ authorize ต้อง return function
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: no permission" });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
