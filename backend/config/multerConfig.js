const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/avatar")); // Ruta de destino
  },
  filename: (req, file, cb) => {
    // Generar el nombre del archivo usando el nombre del astronauta
    const astronautName = req.body.name ? req.body.name.replace(/ /g, "_") : "unknown";
    const fileExtension = path.extname(file.originalname); // Extensión del archivo
    const uniqueName = `${astronautName}${Date.now()}${fileExtension}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
