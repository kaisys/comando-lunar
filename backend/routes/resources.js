const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');

// Rutas para recursos
router.get('/', resourceController.getAllResources); // Obtener todos los recursos
router.put('/:type', resourceController.updateResource); // Actualizar un recurso por tipo

module.exports = router;
