const express = require('express');
const router = express.Router();
const controller = require('../controllers/students.controller');

router.get('/', 
    // #swagger.tags = ['Students']
    // #swagger.summary = 'ดึงข้อมูลนักศึกษาทั้งหมด'
    controller.getAllStudents
);
router.get('/:id',
    // #swagger.tags = ['Students']
    // #swagger.summary = 'ดึงข้อมูลนักศึกษาตาม id'
    controller.getStudentById
);

router.post('/', 
    // #swagger.tags = ['Students']
    // #swagger.summary = 'เพิ่มนักศึกษาใหม่'
    controller.createStudent
);

router.put('/:id', 
    // #swagger.tags = ['Students']
    // #swagger.summary = 'แก้ไขข้อมูลนักศึกษา'
    controller.updateStudent
);

router.delete('/:id', 
    // #swagger.tags = ['Students']
    // #swagger.summary = 'ลบนักศึกษา'
    controller.deleteStudent
);

module.exports = router;
