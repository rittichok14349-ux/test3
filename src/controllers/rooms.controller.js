exports.createRoom = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { roomNo, roomType, price, floor, description } = req.body || {};

    if (!roomNo || !roomType || !price || !floor) {
      return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" });
    }

    const image = req.file ? req.file.filename : null;

    const room = await prisma.room.create({
      data: {
        roomNo,
        roomType,
        price: Number(price),
        floor: Number(floor),
        description,
        image,
      },
    });

    res.json({ message: "เพิ่มห้องสำเร็จ", data: room });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
