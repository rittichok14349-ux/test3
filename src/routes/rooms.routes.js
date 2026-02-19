const express = require("express");
const router = express.Router();
const controller = require("../controllers/rooms.controller");
const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const auth = require("../middlewares/upload.middleware");

const pisma =new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", 
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'ดึงข้อมูลห้องทั้งหมด'
    controller.getAllRooms
);

router.get("/:id",
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'ดึงข้อมูลห้องตาม id'
    controller.getRoomById
);

router.post("/", upload.single("image"),
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'เพิ่มห้องใหม่'
    controller.createRoom
);

router.put("/:id", upload.single("image"), 
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'แก้ไขข้อมูลห้อง'
    controller.updateRoom
);

router.delete("/:id", 
    // #swagger.tags = ['Rooms']
    // #swagger.summary = 'ลบนักศึกษา'
    controller.deleteRoom
);

module.exports = router;
