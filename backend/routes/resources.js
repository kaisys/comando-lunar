const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const connectRabbitMQ = require('../config/rabbitmq');

router.put('/:type', async (req, res) => {
    const { type } = req.params;
    const { level } = req.body;

    try {
        const resource = await prisma.resource.findUnique({ where: { type } });
        if (!resource) {
            return res.status(404).json({ message: `Recurso ${type} no encontrado` });
        }

        const updatedResource = await prisma.resource.update({
            where: { type },
            data: {
                level,
                critical: level < 30
            }
        });

        // Publicar evento crítico en RabbitMQ
        if (updatedResource.critical) {
            const { channel } = await connectRabbitMQ();
            const queue = 'critical-events';
            const message = `${type} está en nivel crítico (${level}%)`;
            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`Mensaje publicado: ${message}`);
        }

        res.json(updatedResource);
    } catch (error) {
        console.error('Error al actualizar recurso:', error);
        res.status(500).json({ message: 'Error al actualizar recurso', error });
    }
});

module.exports = router;
