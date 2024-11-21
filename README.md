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


¡Ah! Ahora entiendo lo que estás buscando. El problema radica en el formato de la estructura del proyecto que se ve como texto plano en lugar de estar bien formateada.

La sección Estructura del proyecto debería estar en un bloque de código adecuado para que se vea como un bloque de texto dentro del README.md, pero al parecer, se está mostrando como texto normal.

A continuación, te doy el formato correcto para que puedas copiar y pegar y se vea bien cuando lo pongas en tu README.md. La clave es asegurarse de que la sección "Estructura del proyecto" esté entre tres tildes invertidas (```````), lo que hace que se muestre como un bloque de código.

Aquí te dejo el texto que necesitas para que se vea bien:
markdown
Copiar código
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
Construir y ejecutar el contenedor de Docker para el backend y el frontend:

bash
Copiar código
docker-compose up --build
Acceder al backend y frontend:

Backend: http://localhost:3000
Frontend: http://localhost:3001
## Estructura del proyecto
centro-comando-lunar/
├── backend/
│   ├── config/               # Archivos de configuración (ej., RabbitMQ)
│   ├── controllers/          # Controladores para gestionar la lógica de las rutas
│   ├── prisma/               # Definición del esquema de la base de datos (Prisma)
│   ├── routes/               # Rutas y APIs para interactuar con el backend
│   ├── services/             # Servicios auxiliares (por ejemplo, RabbitMQ, notificaciones)
│   └── server.js             # Punto de entrada del backend
├── frontend/
│   ├── components/           # Componentes reutilizables del frontend
│   ├── pages/                # Páginas y vistas principales del frontend
│   ├── public/               # Archivos estáticos accesibles (imágenes, fuentes, etc.)
│   ├── styles/               # Archivos de estilos globales (CSS, SCSS)
│   └── next.config.js        # Configuración específica de Next.js
├── .gitignore                # Archivos y carpetas a ignorar por Git
├── docker-compose.yml        # Configuración de servicios Docker
├── Dockerfile                # Dockerfile para el backend
└── README.md                 # Este archivo

## Uso
Docker:

El proyecto está configurado con Docker para contenerizar tanto el backend como el frontend, y RabbitMQ. El archivo docker-compose.yml maneja los servicios, incluyendo:
backend: El servicio que ejecuta el servidor Express.
frontend: El servicio que ejecuta la aplicación Next.js.
rabbitmq: El servicio para la cola de mensajes.
RabbitMQ:

RabbitMQ se utiliza para gestionar las colas de mensajes, facilitando la comunicación entre distintos servicios del sistema, como la gestión de tareas y recursos. El contenedor de RabbitMQ está configurado para ejecutar en el puerto 5672.
Prisma y Base de datos:

Prisma se utiliza como ORM para interactuar con la base de datos PostgreSQL. El archivo prisma/schema.prisma define el esquema de la base de datos.
## Endpoints del backend
GET /api/tasks: Obtener todas las tareas.

POST /api/tasks: Crear una nueva tarea.

PUT /api/tasks/{id}: Editar una tarea específica.

DELETE /api/tasks/{id}: Eliminar una tarea específica.

GET /api/resources: Obtener todos los recursos.

POST /api/resources/oxygen: Agregar oxígeno al sistema.

GET /api/events: Obtener todos los eventos.

## Contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Agregada nueva funcionalidad').
Haz push a tu rama (git push origin feature/nueva-funcionalidad).
Crea un pull request.
## Licencia
Este proyecto está licenciado bajo la MIT License.
