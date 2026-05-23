import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes/events.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/events', eventRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/eventlogs';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    // El servidor sigue corriendo para recibir eventos aunque no guarde
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT} (sin DB)`);
    });
  });