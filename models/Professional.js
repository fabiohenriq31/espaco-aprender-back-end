const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});


const Professional = mongoose.model('Professional', ProfessionalSchema);

module.exports = Professional;
