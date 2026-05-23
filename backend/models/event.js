import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  mensaje: { type: String, required: true },
  datos: { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;