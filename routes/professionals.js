const express = require('express');
const router = express.Router();
const Professional = require('../models/Professional');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const newProfessional = new Professional({ name, email });
    await newProfessional.save();
    res.status(201).json(newProfessional);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao adicionar profissional' });
  }
});

router.get('/', async (req, res) => {
  try {
    const professionals = await Professional.find();
    res.status(200).json(professionals);

  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar profissionais' });
  }
});

module.exports = router;
