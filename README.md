# Centro de Comando Lunar

Este proyecto es una aplicación que gestiona recursos, tareas y eventos para un sistema inspirado en un centro de comando lunar. Está compuesto por un backend basado en Node.js y un frontend desarrollado con **Next.js**. El proyecto también utiliza Docker para contenerización, RabbitMQ para la gestión de colas de mensajes, y Prisma para la gestión de la base de datos.

## Tecnologías utilizadas

- **Backend**:
  - **Node.js**: Entorno de ejecución para el backend.
  - **Express.js**: Framework para crear las APIs RESTful.
  - **RabbitMQ**: Sistema de mensajería para la gestión de tareas y recursos.
  - **Prisma**: ORM para interactuar con la base de datos.
  - **Docker**: Contenerización del backend y los servicios.

- **Frontend**:
  - **Next.js**: Framework para crear la interfaz de usuario con renderizado del lado del servidor y la generación de sitios estáticos.

- **Base de datos**:
  - **PostgreSQL**: Base de datos utilizada con Prisma.
  - **Prisma**: ORM para gestionar la base de datos.

## Requisitos previos

- Tener **Docker** instalado en tu máquina.
- Tener **Node.js** y **Yarn** instalados.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TU_USUARIO/centro-comando-lunar.git
   cd centro-comando-lunar
2. Construir y ejecutar el contenedor de Docker para el backend y el frontend:

bash
Copiar código
docker-compose up --build

3. Acceder al backend y frontend:

Backend: http://localhost:3000
Frontend: http://localhost:3001

centro-comando-lunar/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   └── next.config.js
├── .gitignore
├── docker-compose.yml
├── Dockerfile
└── README.md
Estructura del proyecto
bash
Copiar código
centro-comando-lunar/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── prisma/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   └── next.config.js
├── .gitignore
├── docker-compose.yml
├── Dockerfile
└── README.md
Uso
Docker:

El proyecto está configurado con Docker para contenerizar tanto el backend como el frontend, y RabbitMQ. El archivo docker-compose.yml maneja los servicios, incluyendo:
backend: El servicio que ejecuta el servidor Express.
frontend: El servicio que ejecuta la aplicación Next.js.
rabbitmq: El servicio para la cola de mensajes.
RabbitMQ:

RabbitMQ se utiliza para gestionar las colas de mensajes, facilitando la comunicación entre distintos servicios del sistema, como la gestión de tareas y recursos. El contenedor de RabbitMQ está configurado para ejecutar en el puerto 5672.
Prisma y Base de datos:

Prisma se utiliza como ORM para interactuar con la base de datos PostgreSQL. El archivo prisma/schema.prisma define el esquema de la base de datos.
Endpoints del backend
GET /api/tasks: Obtener todas las tareas.

POST /api/tasks: Crear una nueva tarea.

PUT /api/tasks/{id}: Editar una tarea específica.

DELETE /api/tasks/{id}: Eliminar una tarea específica.

GET /api/resources: Obtener todos los recursos.

POST /api/resources/oxygen: Agregar oxígeno al sistema.

GET /api/events: Obtener todos los eventos.

Contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Agregada nueva funcionalidad').
Haz push a tu rama (git push origin feature/nueva-funcionalidad).
Crea un pull request.
Licencia
Este proyecto está licenciado bajo la MIT License.

markdown
Copiar código

### ¿Cómo usarlo?
1. **Crear el archivo README.md**:
   - Abre tu editor de texto y crea un archivo nuevo llamado `README.md`.
   - Copia y pega el contenido que te proporcioné en ese archivo.
   
2. **Subir el archivo a tu repositorio**:
   - Luego de pegar el contenido en el archivo `README.md`, usa los comandos de Git para agregarlo, hacer commit y empujarlo al repositorio:

   ```bash
   git add README.md
   git commit -m "Añadir archivo README.md"
   git push origin main
