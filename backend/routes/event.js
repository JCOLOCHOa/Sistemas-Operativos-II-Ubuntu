import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// GET - Obtener todos los eventos
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 }).limit(100);
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo eventos', details: error.message });
  }
});

// POST - Crear nuevo evento
router.post('/', async (req, res) => {
  try {
    const { tipo, mensaje, datos } = req.body;
    
    if (!tipo || !mensaje) {
      return res.status(400).json({ error: 'tipo y mensaje son requeridos' });
    }

    const event = new Event({ tipo, mensaje, datos });
    await event.save();
    
    res.status(201).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ error: 'Error guardando evento', details: error.message });
  }
});

export default router;