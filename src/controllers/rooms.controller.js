const prisma = require("../prisma");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: { id: "desc" }
    });

    res.json(rooms); // ต้องส่ง array ตรง
  } catch (error) {
    console.error("GET ROOMS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.findUnique({
      where: { id: Number(id) }
    });

    if (!room) {
      return res.status(404).json({ message: "ไม่พบห้อง" });
    }

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { roomNo, roomType, price, floor, description, status, dormId } = req.body;

    if (!roomNo || !roomType || !price || !floor || !dormId) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "กรุณาอัปโหลดรูปภาพ" });
    }

    const room = await prisma.room.create({
      data: {
        roomNo,
        roomType,
        price: Number(price),
        floor: Number(floor),
        description,
        status: status || "AVAILABLE",
        dormId: Number(dormId),
        image: req.file.filename,
      },
    });

    res.json({ message: "เพิ่มห้องสำเร็จ", data: room });
  } catch (error) {
    console.error("CREATE ROOM ERROR:", error);

    if (error.code === "P2002") {
      return res.status(400).json({ message: "เลขห้องนี้มีอยู่แล้ว" });
    }

    if (error.code === "P2003") {
      return res.status(400).json({ message: "dormId ไม่มีอยู่ในระบบ" });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { roomNo, roomType, price, floor, description, status } = req.body;

    const existing = await prisma.room.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "ไม่พบห้อง" });
    }

    let image = existing.image;
    if (req.file) image = req.file.filename;

    const room = await prisma.room.update({
      where: { id: Number(id) },
      data: {
        roomNo,
        roomType,
        price: price ? Number(price) : undefined,
        floor: floor ? Number(floor) : undefined,
        description,
        status,
        image,
      },
    });

    res.json({ message: "อัปเดตห้องสำเร็จ", data: room });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(400).json({ message: "เลขห้องซ้ำ" });
    }

    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await prisma.room.findUnique({
      where: { id: Number(id) },
    });

    if (!existing) {
      return res.status(404).json({ message: "ไม่พบห้อง" });
    }

    await prisma.room.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "ลบห้องสำเร็จ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
