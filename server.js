const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    // Validar el tipo de archivo permitido
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se permiten archivos JPEG o PNG.'));
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2048 KB = 2MB
  },
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No se seleccionó ningún archivo.');
  }

  const fileInfos = req.files.map((file) => ({
    filename: file.filename,
    originalname: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
  }));

  res.send(fileInfos);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
})