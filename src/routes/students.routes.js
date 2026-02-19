const express = require('express');
const router = express.Router();
const controller = require('../controllers/students.controller');

router.get('/', 
    controller.getAllStudents
);
router.get('/:id',
    controller.getStudentById
);

// POST
router.post('/', 
    controller.createStudent
);

// PUT
router.put('/:id', 
    controller.updateStudent
);

// DELETE
router.delete('/:id', 
    controller.deleteStudent
);

module.exports = router;
