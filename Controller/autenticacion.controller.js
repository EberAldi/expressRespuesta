import * as service from '../Service/autenticacion.service.js';

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: 'Usuario y password son requeridos' })
    }

    const token = await service.login(usuario, password)
    res.json({ mensaje: 'Login exitoso', token })
  } catch (error) {
    res.status(error.status || 500).json({ mensaje: error.message || 'Error en el login' })
  }
}