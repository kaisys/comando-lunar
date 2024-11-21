const WebSocket = require('ws');
const { connectRabbitMQ } = require('../config/rabbitmq');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function startWebSocketServer() {
  const wss = new WebSocket.Server({ port: 8080 }); // Puerto WebSocket
  const { channel } = await connectRabbitMQ(); // Conectar a RabbitMQ
  const queue = 'critical-events'; // Cola de RabbitMQ

  console.log('Servidor WebSocket listo en el puerto 8080');

  // Consumir mensajes de RabbitMQ
  channel.consume(queue, async (message) => {
    if (message) {
      const content = message.content.toString();
      console.log(`Mensaje recibido: ${content}`);

      try {
        // Procesar el mensaje directamente como texto
        const [resourceName, levelInfo] = content.split(" en nivel crítico "); // Dividir la cadena
        const resourceLevel = parseInt(levelInfo.replace(/[^\d]/g, ""), 10); // Extraer el número del nivel

        // Buscar el recurso en la base de datos
        const resource = await prisma.resource.findUnique({
          where: { type: resourceName.trim() },
        });

        if (resource) {
          console.log(`Recurso encontrado: ${resourceName}`);
          // Registrar el evento en la base de datos
          await prisma.event.create({
            data: {
              resourceId: resource.id,
              message: content,
            },
          });
          console.log(`Evento crítico registrado: ${content}`);
        } else {
          console.error(`Recurso ${resourceName} no encontrado en la base de datos`);
        }

        // Enviar mensaje a todos los clientes WebSocket conectados
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(content);
            console.log(`Mensaje enviado al cliente WebSocket: ${content}`);
          }
        });
      } catch (error) {
        console.error('Error al procesar el mensaje:', error);
      }

      // Confirmar procesamiento del mensaje
      channel.ack(message);
    }
  });
}

module.exports = startWebSocketServer;
