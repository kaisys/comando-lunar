const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET: Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// POST: Crear una nueva tarea
router.post("/", async (req, res) => {
  const { title, description, priority, assignedTo, status } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: { title, description, priority, assignedTo, status },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// PUT: Actualizar una tarea completa
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, assignedTo, status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, priority, assignedTo, status },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// DELETE: Eliminar una tarea
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// PUT: Actualizar solo el estado de una tarea
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Validar estado
  if (!["Pendiente", "Haciendo", "Hecho"].includes(status)) {
    return res.status(400).json({ error: "Estado no válido" });
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error al actualizar el estado de la tarea:", error);
    res.status(500).json({ error: "Error al actualizar el estado de la tarea" });
  }


});



// PUT: Actualizar estado de una tarea
router.put("/:id/status", async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
  
    // Validar que el ID sea un número
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido" });
    }
  
    // Validar que el estado sea válido
    if (!["Pendiente", "Haciendo", "Hecho"].includes(status)) {
      return res.status(400).json({ error: "Estado no válido" });
    }
  
    // Delegar al controlador
    try {
      await taskController.updateTaskStatus(req, res);
    } catch (error) {
      console.error("Error en la ruta PUT /:id/status:", error);
      next(error); // Pasar el error al middleware de manejo de errores
    }
  });



module.exports = router;
