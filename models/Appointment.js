const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  professional: { type: mongoose.Schema.Types.ObjectId, ref: 'Professional', required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientEmail: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
