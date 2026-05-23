// Importación de módulos externos requeridos
import express from 'express';     // Framework para crear el servidor web y manejar rutas
import mongoose from 'mongoose';   // ODM para interactuar de forma sencilla con MongoDB
import cors from 'cors';           // Middleware para habilitar el Intercambio de Recursos de Origen Cruzado (CORS)
import dotenv from 'dotenv';       // Módulo para cargar variables de entorno desde un archivo .env
import eventRoutes from './routes/events.js'; // Rutas personalizadas de la API para la gestión de eventos

// Carga las variables de entorno definidas en el archivo .env al objeto process.env
dotenv.config();

// Inicialización de la aplicación Express
const app = express();
// Configura el puerto de escucha utilizando variables de entorno o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// =========================================================================
// Middlewares globales
// =========================================================================

// Habilita CORS para permitir que clientes en otros dominios (ej. frontend) hagan peticiones
app.use(cors());

// Permite que Express interprete cuerpos de peticiones con formato JSON de forma automática
app.use(express.json());

// =========================================================================
// Rutas de la Aplicación
// =========================================================================

// Monta las rutas de eventos bajo el prefijo '/api/events'
app.use('/api/events', eventRoutes);

// Endpoint de verificación de estado (Health check) para comprobar que la API esté respondiendo
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// =========================================================================
// Conexión a Base de Datos y Arranque del Servidor
// =========================================================================

// URI de conexión para MongoDB, usando variable de entorno o una base de datos local por defecto
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/eventlogs';

// Intenta conectar a MongoDB usando mongoose
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    // Si la conexión es exitosa, inicia el servidor escuchando en todas las interfaces de red ('0.0.0.0')
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    // En caso de fallo con MongoDB, el servidor inicia de todas formas para seguir operando
    // (por ejemplo, para responder con código de error o procesar solicitudes sin persistencia)
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT} (sin DB)`);
    });
  });