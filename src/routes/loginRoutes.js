const express = require('express');

const crypto = require('crypto');

const router = express.Router();

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/', (__req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});

module.exports = router;