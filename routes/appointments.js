const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { professional, patientName, patientPhone, patientEmail, date, time } = req.body;
    const newAppointment = new Appointment({ professional, patientName, patientPhone, patientEmail, date, time });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao agendar' });
  }
});

router.get('/:professionalId', authMiddleware, async (req, res) => {
  try {
    const appointments = await Appointment.find({ professional: req.params.professionalId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar agendamentos' });
  }
});

module.exports = router;
