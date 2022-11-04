const express = require('express');

const { readAllFiles } = require('../readFile');

const router = express.Router();

router.get('/', async (_req, res) => {
  const response = await readAllFiles();
  return res.status(200).json(response);
});

module.exports = router;