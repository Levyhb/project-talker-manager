const express = require('express');

const crypto = require('crypto');

const router = express.Router();

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/.test(email);
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailRegex) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;