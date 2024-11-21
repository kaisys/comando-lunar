const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');

// Obtener todos los astronautas
exports.getAllAstronauts = async (req, res) => {
  try {
    const astronauts = await prisma.astronaut.findMany();
    res.status(200).json(astronauts);
  } catch (error) {
    console.error('Error al obtener astronautas:', error);
    res.status(500).json({ message: 'Error al obtener astronautas', error: error.message });
  }
};

// Crear un nuevo astronauta con subida de avatar
exports.createAstronaut = async (req, res) => {
  try {
    const { name, role } = req.body;

    // Validar que req.body tenga los datos requeridos
    if (!name || !role) {
      return res.status(400).json({ message: 'El nombre y el rol son obligatorios' });
    }

    let avatarUrl = null;

    if (req.file) {
      // Generar nombre de archivo usando el nombre del astronauta
      const sanitizedFileName = name.replace(/ /g, '_');
      const fileExtension = path.extname(req.file.originalname);
      const newFileName = `${sanitizedFileName}${Date.now()}${fileExtension}`;
      const newFilePath = path.join(__dirname, '../public/avatar', newFileName);

      // Mover archivo al destino con el nuevo nombre
      fs.renameSync(req.file.path, newFilePath);
      avatarUrl = `/public/avatar/${newFileName}`;
    }

    const newAstronaut = await prisma.astronaut.create({
      data: {
        name,
        role,
        avatarUrl,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Astronauta creado exitosamente',
      astronaut: newAstronaut,
    });
  } catch (error) {
    console.error('Error al crear astronauta:', error);
    res.status(500).json({ message: 'Error al crear astronauta', error: error.message });
  }
};

// Actualizar un astronauta por ID
exports.updateAstronaut = async (req, res) => {
  const { id } = req.params;
  const { name, role } = req.body;

  try {
    let avatarUrl = null;

    if (req.file) {
      // Generar nombre de archivo usando el nombre del astronauta
      const sanitizedFileName = name.replace(/ /g, '_');
      const fileExtension = path.extname(req.file.originalname);
      const newFileName = `${sanitizedFileName}${Date.now()}${fileExtension}`;
      const newFilePath = path.join(__dirname, '../public/avatar', newFileName);

      // Mover archivo al destino con el nuevo nombre
      fs.renameSync(req.file.path, newFilePath);
      avatarUrl = `/public/avatar/${newFileName}`;
    }

    const updatedAstronaut = await prisma.astronaut.update({
      where: { id: parseInt(id) },
      data: {
        name,
        role,
        avatarUrl: avatarUrl || undefined, // Mantiene el avatar existente si no se envía uno nuevo
      },
    });

    res.status(200).json({
      success: true,
      message: 'Astronauta actualizado exitosamente',
      astronaut: updatedAstronaut,
    });
  } catch (error) {
    console.error('Error al actualizar astronauta:', error);
    res.status(500).json({ message: 'Error al actualizar astronauta', error: error.message });
  }
};

// Eliminar un astronauta por ID
exports.deleteAstronaut = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.astronaut.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      success: true,
      message: `Astronauta con ID ${id} eliminado`,
    });
  } catch (error) {
    console.error('Error al eliminar astronauta:', error);
    res.status(500).json({ message: 'Error al eliminar astronauta', error: error.message });
  }
};

// Obtener un astronauta por ID
exports.getAstronautById = async (req, res) => {
  const { id } = req.params;

  try {
    const astronaut = await prisma.astronaut.findUnique({
      where: { id: parseInt(id) },
    });

    if (!astronaut) {
      return res.status(404).json({ message: `Astronauta con ID ${id} no encontrado` });
    }

    res.status(200).json({
      success: true,
      message: 'Astronauta encontrado exitosamente',
      astronaut,
    });
  } catch (error) {
    console.error('Error al obtener astronauta:', error);
    res.status(500).json({ message: 'Error al obtener astronauta', error: error.message });
  }
};
