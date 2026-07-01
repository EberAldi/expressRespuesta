import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri)
    console.log('Conectado a MongoDB')
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message)
    process.exit(1)
  }
}