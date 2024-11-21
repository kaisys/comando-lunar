const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Asignar una tarea a un astronauta
exports.assignTaskToAstronaut = async (req, res) => {
  const { taskId, astronautId } = req.body;

  if (!taskId || !astronautId) {
    return res.status(400).json({ message: 'Tarea y astronauta son requeridos' });
  }

  try {
    // Crear la asignación
    const assignment = await prisma.taskAssignment.create({
      data: {
        taskId: parseInt(taskId),
        astronautId: parseInt(astronautId),
      },
    });

    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error al asignar tarea:', error);
    res.status(500).json({ message: 'Error al asignar tarea', error: error.message });
  }
};

// Obtener todas las asignaciones
exports.getTaskAssignments = async (req, res) => {
  try {
    const assignments = await prisma.taskAssignment.findMany({
      include: {
        task: true, // Incluir datos de la tarea
        astronaut: true, // Incluir datos del astronauta
      },
    });

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error al obtener asignaciones:', error);
    res.status(500).json({ message: 'Error al obtener asignaciones', error: error.message });
  }
};

// Eliminar una asignación
exports.deleteTaskAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar la asignación por ID
    await prisma.taskAssignment.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: `Asignación con ID ${id} eliminada` });
  } catch (error) {
    console.error('Error al eliminar asignación:', error);
    res.status(500).json({ message: 'Error al eliminar asignación', error: error.message });
  }
};
