const prisma = require('../prisma/client');

/**
 * GET /rooms
 * ดึงห้องทั้งหมด
 */
exports.getAllRooms = async (req, res, next) => {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        dorm: true,
      },
    });
    res.json(rooms);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /rooms/:id
 * ดึงห้องตาม id
 */
exports.getRoomById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.findUnique({
      where: { id: Number(id) },
      include: {
        dorm: true,
        requests: true,
      },
    });

    if (!room) {
      return res.status(404).json({ message: 'ไม่พบห้อง' });
    }

    res.json(room);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /rooms
 * สร้างห้องใหม่
 */
exports.createRoom = async (req, res, next) => {
  try {
    const { roomNo, floor, price, roomType, dormId } = req.body;

    const room = await prisma.room.create({
      data: {
        roomNo,
        floor,
        price,
        roomType,
        dormId,
      },
    });

    res.status(201).json(room);
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /rooms/:id
 * แก้ไขข้อมูลห้อง
 */
exports.updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.json(room);
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /rooms/:id
 * ลบห้อง
 */
exports.deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.room.delete({
      where: { id: Number(id) },
    });

    res.json({ message: 'ลบห้องเรียบร้อยแล้ว' });
  } catch (err) {
    next(err);
  }
};
