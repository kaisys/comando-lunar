require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectRabbitMQ = require('./config/rabbitmq');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    // Conectar a RabbitMQ
    await connectRabbitMQ();
});

// tasks
const taskRoutes = require('./routes/tasks');

app.use('/api/tasks', taskRoutes);

//resources
const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

//Events
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);


//Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//inicializar datos
(async () => {
    const resources = [
        { type: 'oxygen', level: 75, critical: false },
        { type: 'energy', level: 60, critical: false },
        { type: 'food', level: 85, critical: false }
    ];

    for (const resource of resources) {
        await prisma.resource.upsert({
            where: { type: resource.type },
            update: {},
            create: resource
        });
    }

    console.log('Recursos inicializados en la base de datos');
})();

