const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendCriticalEvent } = require('../config/rabbitmq');

// Obtener todos los recursos
exports.getAllResources = async (req, res) => {
  try {
    const resources = await prisma.resource.findMany();
    res.json(resources);
  } catch (error) {
    console.error('Error al obtener recursos:', error);
    res.status(500).json({ message: 'Error al obtener recursos', error: error.message });
  }
};

// Actualizar un recurso por tipo
exports.updateResource = async (req, res) => {
  const { type } = req.params;
  const { level } = req.body;

  if (typeof level !== 'number') {
    return res.status(400).json({ message: 'El nivel debe ser un número válido' });
  }

  try {
    // Buscar el recurso por tipo
    const resource = await prisma.resource.findUnique({ where: { type } });
    if (!resource) {
      return res.status(404).json({ message: `Recurso ${type} no encontrado` });
    }

    // Determinar si es crítico
    const isCritical = level < 30;

    // Actualizar el recurso
    const updatedResource = await prisma.resource.update({
      where: { type },
      data: {
        level,
        critical: isCritical,
      },
    });

    // Registrar en ResourceHistory
    await prisma.resourceHistory.create({
      data: {
        resourceId: updatedResource.id,
        level: updatedResource.level,
        isCritical: updatedResource.critical,
        timestamp: new Date(),
      },
    });

    // Publicar evento crítico si corresponde
    if (updatedResource.critical) {
      await sendCriticalEvent(updatedResource);
    }

    res.json(updatedResource);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(500).json({ message: 'Error al actualizar recurso', error: error.message });
  }
};

// Obtener historial completo de recursos
exports.getHistory = async (req, res) => {
  try {
    const history = await prisma.resourceHistory.findMany({
      include: {
        resource: true, // Incluye los detalles del recurso relacionado
      },
      orderBy: {
        timestamp: 'desc', // Ordenar por fecha, más reciente primero
      },
    });

    res.status(200).json(history);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial', error: error.message });
  }
};

// Editar un registro histórico
exports.updateResourceHistory = async (req, res) => {
  const { id } = req.params;
  const { level, timestamp, isCritical } = req.body;

  try {
    const updatedHistory = await prisma.resourceHistory.update({
      where: { id: parseInt(id) },
      data: {
        level,
        timestamp,
        isCritical,
      },
    });

    res.json(updatedHistory);
  } catch (error) {
    console.error('Error al actualizar registro histórico:', error);
    res.status(500).json({ message: 'Error al actualizar registro histórico' });
  }
};
