const express = require('express');
const router = express.Router();
const astronautController = require('../controllers/astronautController');
const upload = require('../config/multerConfig'); // Importar configuración de Multer

// Rutas para astronautas
router.get('/', astronautController.getAllAstronauts);
router.get('/:id', astronautController.getAstronautById);

// Usar Multer para manejar la subida de archivos en las rutas POST y PUT
router.post('/', upload.single('avatar'), astronautController.createAstronaut);
router.put('/:id', upload.single('avatar'), astronautController.updateAstronaut);

router.delete('/:id', astronautController.deleteAstronaut);

module.exports = router;
