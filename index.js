import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js'
import * as usuarioController from './Controller/usuario.controller.js'
import * as articulosController from './Controller/articulos.controller.js'
import * as clientesController from './Controller/clientes.controller.js'
import { login } from './Controller/autenticacion.controller.js';
import { verificarToken } from './middleware/verificarToken.js';
import cors from 'cors';

const app = express()
const PORT = process.env.PORT || 3000

// Cors
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Sin origin = Postman, curl, servidor-a-servidor -> permitir
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS bloqueado para origin: ${origin}`));
  },
  credentials: true,
}));

app.use(express.json())


// Usuarios
app.get('/usuarios', usuarioController.getAll)
app.get('/usuarios/:id', usuarioController.getById)
app.post('/usuarios', usuarioController.create)
app.put('/usuarios/:id', usuarioController.update)
app.delete('/usuarios/:id', usuarioController.remove)

// Articulos
app.get('/articulos', articulosController.getAll)
app.get('/articulos/:id', articulosController.getById)
app.post('/articulos', articulosController.create)
app.put('/articulos/:id', articulosController.update)
app.delete('/articulos/:id', articulosController.remove)

// Clientes
app.get('/clientes', clientesController.getAll)
app.get('/clientes/:id', clientesController.getById)
app.post('/clientes', clientesController.create)
app.put('/clientes/:id', clientesController.update)
app.delete('/clientes/:id', clientesController.remove)

//Auth
app.post('/autenticacion/login', login);




connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})