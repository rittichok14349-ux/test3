const prisma = require("../prisma");


/**
 * GET /students
 * ดึงนักศึกษาทั้งหมด
 */
exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /students/:id
 * ดึงนักศึกษาตาม id
 */
exports.getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });

    if (!student) {
      return res.status(404).json({ message: 'ไม่พบนักศึกษา' });
    }

    res.json(student);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /students
 * เพิ่มนักศึกษาใหม่
 */
exports.createStudent = async (req, res, next) => {
  try {
    const {
      studentCode,
      firstName,
      lastName,
      email,
      phone,
      faculty,
      major,
      year,
      address,
    } = req.body;

    const student = await prisma.student.create({
      data: {
        studentCode,
        firstName,
        lastName,
        email,
        phone,
        faculty,
        major,
        year,
        address,
      },
    });

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /students/:id
 * แก้ไขข้อมูลนักศึกษา
 */
exports.updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(student);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /students/:id
 * ลบนักศึกษา
 */
exports.deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'ลบนักศึกษาเรียบร้อยแล้ว' });
  } catch (err) {
    next(err);
  }
};
