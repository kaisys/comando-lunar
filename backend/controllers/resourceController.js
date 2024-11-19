const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const connectRabbitMQ = require('../config/rabbitmq');

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
    const resource = await prisma.resource.findUnique({ where: { type } });
    if (!resource) {
      return res.status(404).json({ message: `Recurso ${type} no encontrado` });
    }

    const updatedResource = await prisma.resource.update({
      where: { type },
      data: {
        level,
        critical: level < 30,
      },
    });

    // Publicar evento crítico en RabbitMQ si es necesario
    if (updatedResource.critical) {
      const { channel } = await connectRabbitMQ();
      const queue = 'critical-events';
      const message = `${type} está en nivel crítico (${level}%)`;
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Mensaje publicado en RabbitMQ: ${message}`);
    }

    res.json(updatedResource);
  } catch (error) {
    console.error('Error al actualizar recurso:', error);
    res.status(500).json({ message: 'Error al actualizar recurso', error: error.message });
  }
};
