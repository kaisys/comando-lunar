const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las tareas
router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { title, description, priority, assignedTo } = req.body;
    const newTask = await prisma.task.create({
        data: { title, description, priority, assignedTo }
    });
    res.status(201).json(newTask);
});

// Editar una tarea
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, assignedTo } = req.body;
    const updatedTask = await prisma.task.update({
        where: { id: parseInt(id) },
        data: { title, description, priority, assignedTo }
    });
    res.json(updatedTask);
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
});

module.exports = router;
