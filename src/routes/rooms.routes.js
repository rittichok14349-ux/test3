const express = require("express");
const router = express.Router();
const controller = require("../controllers/rooms.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", controller.getAllRooms);

router.get("/:id", controller.getRoomById);

router.post("/", upload.single("image"), controller.createRoom);

router.put("/:id", upload.single("image"), controller.updateRoom);

router.delete("/:id", controller.deleteRoom);

module.exports = router;
