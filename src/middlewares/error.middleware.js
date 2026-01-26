module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'เกิดข้อผิดพลาดในระบบ',
    error: err.message
  });
};
