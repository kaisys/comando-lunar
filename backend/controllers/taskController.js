const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las tareas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
  const { title, description, priority, assignedTo } = req.body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        assignedTo: assignedTo || null, // Permitir valores vacíos o null
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error al crear tarea:', error);
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

// Editar una tarea
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, assignedTo } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
        priority,
        assignedTo: assignedTo || null, // Permitir valores vacíos o null
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error('Error al actualizar tarea:', error);
    res.status(500).json({ message: 'Error al actualizar tarea', error: error.message });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar tarea:', error);
    res.status(500).json({ message: 'Error al eliminar tarea', error: error.message });
  }
};

//Actualizar Estado
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Actualizar el estado de la tarea
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { status },
    });

    // Devolver la tarea actualizada
    return res.status(200).json(updatedTask);
  } catch (error) {
    // Manejo de errores específicos de Prisma
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    console.error("Error al actualizar el estado:", error);
    return res.status(500).json({ error: "Error al actualizar el estado de la tarea" });
  }
};
