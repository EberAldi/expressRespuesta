import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js'
import * as usuarioController from './Controller/usuario.controller.js'
import * as articulosController from './Controller/articulos.controller.js'
import * as clientesController from './Controller/clientes.controller.js'
import { login } from './Controller/autenticacion.controller.js'
import { verificarToken } from './middleware/verificarToken.js'
import { verificarRol } from './middleware/verificarRol.js'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

//Cors
app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

// Usuarios
app.get('/usuarios', verificarToken, verificarRol('admin', 'invitado'), usuarioController.getAll)
app.get('/usuarios/:id', verificarToken, verificarRol('admin', 'invitado'), usuarioController.getById)
app.post('/usuarios', verificarToken, verificarRol('admin'), usuarioController.create)
app.put('/usuarios/:id', verificarToken, verificarRol('admin'), usuarioController.update)
app.delete('/usuarios/:id', verificarToken, verificarRol('admin'), usuarioController.remove)

// Articulos
app.get('/articulos', verificarToken, verificarRol('admin', 'invitado'), articulosController.getAll)
app.get('/articulos/:id', verificarToken, verificarRol('admin', 'invitado'), articulosController.getById)
app.post('/articulos', verificarToken, verificarRol('admin'), articulosController.create)
app.put('/articulos/:id', verificarToken, verificarRol('admin'), articulosController.update)
app.delete('/articulos/:id', verificarToken, verificarRol('admin'), articulosController.remove)

// Clientes
app.get('/clientes', verificarToken, verificarRol('admin', 'invitado'), clientesController.getAll)
app.get('/clientes/:id', verificarToken, verificarRol('admin', 'invitado'), clientesController.getById)
app.post('/clientes', verificarToken, verificarRol('admin'), clientesController.create)
app.put('/clientes/:id', verificarToken, verificarRol('admin'), clientesController.update)
app.delete('/clientes/:id', verificarToken, verificarRol('admin'), clientesController.remove)

//Auth
app.post('/autenticacion/login', login)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})