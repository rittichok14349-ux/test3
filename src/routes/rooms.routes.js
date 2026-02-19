const express = require("express");
const router = express.Router();
const controller = require("../controllers/rooms.controller");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// สร้าง uploads ถ้าไม่มี
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all rooms
router.get("/", controller.getAllRooms);

// GET room by id
router.get("/:id", controller.getRoomById);

// CREATE room
router.post("/", upload.single("image"), controller.createRoom);

// UPDATE room
router.put("/:id", upload.single("image"), controller.updateRoom);

// DELETE room
router.delete("/:id", controller.deleteRoom);

module.exports = router;
