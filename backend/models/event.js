import mongoose from 'mongoose'; // Importa mongoose para usar MongoDB
const eventSchema = new mongoose.Schema({ // Crea la estructura de los datos
  tipo: { type: String, required: true }, // Tipo de evento (INFO, ERROR, etc.)
  mensaje: { type: String, required: true }, // Mensaje del evento
  datos: { type: mongoose.Schema.Types.Mixed, default: {} }, // Datos adicionales
  timestamp: { type: Date, default: Date.now } // Guarda fecha y hora automática
});

const Event = mongoose.model('Event', eventSchema); // Crea el modelo Event
export default Event; // Exporta el modelo para usarlo en otros archivos