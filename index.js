import express, { json } from 'express'
const app = express()
const PORT = 3000
 
import controller from './pruebas.controller.js'
 
app.use(json())
 
// GET sin parámetros — todos los usuarios
app.get('/usuarios', controller.getAll)
 
// GET con parámetro — usuario por id
app.get('/usuarios/:id', controller.getById)
 
// POST sin parámetros — crear usuario (datos en body)
app.post('/usuarios', controller.create)
 
// PUT con parámetro — actualizar usuario por id
app.put('/usuarios/:id', controller.update)
 
// DELETE con parámetro — eliminar usuario por id
app.delete('/usuarios/:id', controller.remove)
 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
 
