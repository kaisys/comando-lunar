require('dotenv').config(); // Cargar variables de entorno desde .env
const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectRabbitMQ } = require('./config/rabbitmq');
const startWebSocketServer = require('./services/websocketServer'); // Importa el servidor WebSocket

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

// Iniciar servidor WebSocket
startWebSocketServer(); // Inicializa el WebSocket Server

// Iniciar servidor HTTP
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

    // Conectar a RabbitMQ
    try {
        await connectRabbitMQ(); // Asegúrate de que las variables de entorno están configuradas
    } catch (error) {
        console.error('Error conectando a RabbitMQ:', error);
        process.exit(1); // Finaliza el proceso si no puede conectarse
    }
});

// Rutas de tareas
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// Rutas de recursos
const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

// Rutas de eventos
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

// Rutas de astronautas
const astronautsRoutes = require('./routes/astronauts');
app.use('/api/astronauts', astronautsRoutes);

// Rutas de asignaciones de tareas
const taskAssignmentRoutes = require('./routes/taskAssignments');
app.use('/api/assignments', taskAssignmentRoutes);

// Servir archivos estáticos desde la carpeta public
app.use('/public', express.static(path.join(__dirname, 'public')));
