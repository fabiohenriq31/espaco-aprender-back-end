const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
});

module.exports = mongoose.model('User', userSchema);