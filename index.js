const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Bienvenido a Express')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
