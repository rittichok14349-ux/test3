const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controller');

// GET
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);

// POST
router.post('/', studentController.createStudent);

// PUT
router.put('/:id', studentController.updateStudent);

// DELETE
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
