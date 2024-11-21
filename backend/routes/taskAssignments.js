const express = require('express');
const router = express.Router();
const taskAssignmentController = require('../controllers/taskAssignmentController');

// Rutas para las asignaciones
router.post('/assign', taskAssignmentController.assignTaskToAstronaut); // Asignar tarea a un astronauta
router.get('/', taskAssignmentController.getTaskAssignments); // Obtener todas las asignaciones
router.delete('/:id', taskAssignmentController.deleteTaskAssignment); // Eliminar una asignación

module.exports = router;
