const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener el historial de eventos
router.get('/', async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: { resource: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(events);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).json({ message: 'Error al obtener eventos', error });
    }
});

module.exports = router;
