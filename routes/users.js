const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/users', async (req, res) => {
  const { uid, name, email, phone } = req.body;

  try {
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const newUser = new User({ uid, name, email, phone });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
