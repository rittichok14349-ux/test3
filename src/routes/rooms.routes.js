const express = require('express');
const router = express.Router();
const roomController = require('../controllers/rooms.controller');

// GET
router.get('/', roomController.getAllRooms);
router.get('/:id', roomController.getRoomById);

// POST
router.post('/', roomController.createRoom);

// PUT
router.put('/:id', roomController.updateRoom);

// DELETE
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
