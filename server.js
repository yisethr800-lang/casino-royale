const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // para servir tus archivos HTML y CSS

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // <-- usuario por defecto
  password: '',       // <-- deja vacío si no tiene
  database: 'casino_db'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Registro
app.post('/registro', (req, res) => {
  const { nombre, correo, password } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)';
  db.query(sql, [nombre, correo, password], (err) => {
    if (err) {
      console.error(err);
      res.send('Error al registrar usuario');
    } else {
      res.send(`
        <script>
          sessionStorage.setItem('nombreJugador', '${nombre}');
          window.location.href = '/index.html';
        </script>
      `);
    }
  });
});

// Login
app.post('/login', (req, res) => {
  const { correo, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND password = ?';
  db.query(sql, [correo, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      const nombreJugador = results[0].nombre;
      res.send(`
        <script>
          sessionStorage.setItem('nombreJugador', '${nombreJugador}');
          window.location.href = '/index.html';
        </script>
      `);
    } else {
      res.send('<script>alert("Correo o contraseña incorrectos"); window.location.href = "/login.html";</script>');
    }
  });
});



app.listen(3000, () => console.log('🌐 Servidor en http://localhost:3000'));

