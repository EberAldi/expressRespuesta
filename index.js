import 'dotenv/config'
import express from 'express'
import { connectDB } from './config/db.js'
import * as usuarioController from './Controller/usuario.controller.js'
import * as articulosController from './Controller/articulos.controller.js'
import * as clientesController from './Controller/clientes.controller.js'

const app = express()
const PORT = process.env.PORT || 3000

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

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
})