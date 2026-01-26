const { verifyToken } = require('../utils/jwt');

module.exports = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ message: 'ไม่ได้ส่ง token มา' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึง' });
      }

      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token ไม่ถูกต้องหรือหมดอายุ' });
    }
  };
};
