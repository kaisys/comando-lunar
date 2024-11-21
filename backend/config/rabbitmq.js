const amqp = require('amqplib');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let connection;
let channel;

async function connectRabbitMQ() {
    try {
        if (!connection) {
            connection = await amqp.connect(process.env.RABBITMQ_URL);
            console.log('Conexión a RabbitMQ establecida');
        }

        if (!channel) {
            channel = await connection.createChannel();
            const queue = 'critical-events';
            await channel.assertQueue(queue, { durable: true });
            console.log(`Cola "${queue}" lista`);

            // Configurar el consumidor
            channel.consume(queue, async (message) => {
                if (message) {
                    const content = message.content.toString();
                    console.log(`Mensaje recibido: ${content}`);

                    try {
                        const [resourceType] = content.split(' ');
                        const resource = await prisma.resource.findUnique({
                            where: { type: resourceType }
                        });

                        if (resource) {
                            await prisma.event.create({
                                data: {
                                    resourceId: resource.id,
                                    message: content
                                }
                            });
                            console.log(`Evento crítico registrado: ${content}`);
                        } else {
                            console.error(`Recurso ${resourceType} no encontrado en la base de datos`);
                        }
                    } catch (error) {
                        console.error('Error al registrar el evento:', error);
                    }

                    channel.ack(message); // Confirmar que el mensaje fue procesado
                }
            });

            console.log('Consumidor configurado y esperando mensajes...');
        }

        return { connection, channel };
    } catch (error) {
        console.error('Error conectando a RabbitMQ:', error);
        process.exit(1); // Finaliza el proceso si la conexión falla
    }
}

async function sendCriticalEvent(resource) {
    try {
        const { channel } = await connectRabbitMQ(); // Asegurar la conexión
        const queue = 'critical-events';
        const message = `${resource.type} en nivel crítico (${resource.level}%)`;

        await channel.assertQueue(queue, { durable: true }); // Asegurar la cola antes de enviar
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

        console.log(`Evento crítico enviado a RabbitMQ: ${message}`); // Agrega este log
    } catch (error) {
        console.error('Error enviando mensaje a RabbitMQ:', error);
    }
}


module.exports = { connectRabbitMQ, sendCriticalEvent };
